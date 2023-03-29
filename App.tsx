import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BACKEND_URL, EVENTS } from './configuration';
import type { ConnectionError, MessageData } from './types';
import SignUp from './components/SignUp';
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
  const [connection, setConnection] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [showReconnect, setShowReconnect] = useState<boolean>(false);
  const [view, setView] = useState<string>('main');

  const handleConnectionError = (event: Event) => {
    const errorEvent = event as ConnectionError;
    setLoading(false);
    setShowReconnect(true);
    if (errorEvent.message && errorEvent.message.includes('Connection refused')) {
      return setError('Could not connect to the server!');
    }
    return setError('Something went wrong!');
  };

  const handleIncomingMessage = useCallback(
    (message: MessageEvent<string>) => {
      try {
        console.log(connection);
        if (connection && connection.readyState === 1) {
          const messageData: MessageData = JSON.parse(message.data);
          if (messageData.event === EVENTS.ping) {
            console.log('ping inc');
            connection.send(JSON.stringify({ event: EVENTS.pingResponse }));
          }
        }
      } catch (parsingError) {
        console.log(parsingError);
      }
    },
    [connection],
  );

  const handleInput = (value: string) => {
    setName(value);
  };

  const handleNavigation = (destination: string): void => {
    console.log('navigate to', destination);
    if (destination === 'sign-up') {
      setView('sign-up');
    }
  };

  const handleReconnect = (): void => {
    console.log('reconnect');
  };

  const handleSubmitSignUp = (): void => {
    connection.send(JSON.stringify({
      data: name,
      event: EVENTS.registerUser,
    }));
  };

  useEffect(
    (): (() => void) => {
      const socketConnection = new WebSocket(BACKEND_URL);
      socketConnection.onopen = (): void => {
        socketConnection.onerror = (event) => handleConnectionError(event);
        socketConnection.onmessage = (message) => handleIncomingMessage(message);
        setConnection(socketConnection);
        setLoading(false);
        console.log('CONNECTED');
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
      { !loading && (
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
                <>
                  <Pressable onPress={(): void => handleNavigation('sign-in')}>
                    <Text>
                      Sign in
                    </Text>
                  </Pressable>
                  <Pressable onPress={(): void => handleNavigation('sign-up')}>
                    <Text>
                      Sign up
                    </Text>
                  </Pressable>
                </>
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
