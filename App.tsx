import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { BarCodeScannerResult } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BACKEND_URL, EVENTS } from './configuration';
import type { ConnectionError, MessageData, Views } from './types';
import Main from './views/Main';
import Scanner from './views/Scanner';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Spinner from './components/Spinner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App(): React.ReactElement {
  const [connectionId, setConnectionId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [showReconnect, setShowReconnect] = useState<boolean>(false);
  const [view, setView] = useState<Views>('main');

  const connectionRef = useRef<WebSocket>();

  const handleConnectionError = (event: Event) => {
    const errorEvent = event as ConnectionError;
    setLoading(false);
    setShowReconnect(true);
    if (errorEvent.message && errorEvent.message.includes('Connection refused')) {
      return setError('Could not connect to the server!');
    }
    return setError('Something went wrong!');
  };

  const handleIncomingMessage = (message: MessageEvent<string>): null | void => {
    if (!(connectionRef && connectionRef.current
      && connectionRef.current.readyState === 1)) {
      return null;
    }
    const { current: connection } = connectionRef;
    try {
      const messageData: MessageData = JSON.parse(message.data);
      if (messageData.event === EVENTS.authenticateTarget) {
        setIsRegistered(true);
        setName(messageData.data || '');
        return setView('main');
      }
      if (messageData.event === EVENTS.ping) {
        return connection.send(JSON.stringify({ event: EVENTS.pingResponse }));
      }
      if (messageData.event === EVENTS.registerConnection) {
        setConnectionId(messageData.data || '');
        return setLoading(false);
      }
      return null;
    } catch (parsingError) {
      return console.log('parsing error', parsingError);
    }
  };

  const handleInput = (value: string) => {
    setName(value);
  };

  const handleNavigation = (destination: Views): void => setView(destination);

  const handleReconnect = (): void => {
    console.log('reconnect');
  };

  const handleScanned = (result: BarCodeScannerResult): void => {
    if (!(connectionRef && connectionRef.current
      && connectionRef.current.readyState === 1)) {
      return null;
    }
    // setLoading(true);
    const targetId = result.data;
    const { current: connection } = connectionRef;
    connection.send(JSON.stringify({
      data: targetId,
      event: EVENTS.authenticateTarget,
    }));
    return handleNavigation('main');
  };

  const handleSubmitSignUp = useCallback(
    (): null | void => {
      if (!(connectionRef && connectionRef.current
        && connectionRef.current.readyState === 1)) {
        return null;
      }
      const { current: connection } = connectionRef;
      connection.send(JSON.stringify({
        data: name,
        event: EVENTS.registerUser,
      }));
      setIsRegistered(true);
      return handleNavigation('main');
    },
    [name],
  );

  useEffect(
    (): (() => void) => {
      const socketConnection = new WebSocket(BACKEND_URL);
      socketConnection.onopen = (): void => {
        socketConnection.onerror = handleConnectionError;
        socketConnection.onmessage = handleIncomingMessage;
        connectionRef.current = socketConnection;
      };

      return (): void => {
        socketConnection.send(JSON.stringify({
          event: EVENTS.clientDisconnect,
        }));
        return socketConnection.close(0, EVENTS.clientDisconnect);
      };
    },
    [],
  );

  return (
    <View style={styles.container}>
      { loading && (<Spinner />) }
      { !loading && connectionId && (
        <View>
          { !!error && (
            <>
              <Text>
                { error }
              </Text>
              { showReconnect && (
                <Pressable onPress={handleReconnect}>
                  <Text>
                    Reconnect
                  </Text>
                </Pressable>
              ) }
            </>
          ) }
          { !error && (
            <>
              { view === 'main' && (
                <Main
                  connectionId={connectionId}
                  handleNavigation={handleNavigation}
                  isRegistered={isRegistered}
                  name={name}
                />
              ) }
              { view === 'scanner' && (
                <Scanner
                  handleNavigation={handleNavigation}
                  handleScanned={handleScanned}
                />
              ) }
              { view === 'sign-in' && (
                <SignIn
                  connectionId={connectionId}
                  handleNavigation={handleNavigation}
                />
              ) }
              { view === 'sign-up' && (
                <SignUp
                  handleInput={handleInput}
                  handleSubmit={handleSubmitSignUp}
                  name={name}
                />
              ) }
            </>
          ) }
        </View>
      ) }
      <StatusBar />
    </View>
  );
}
