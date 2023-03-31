import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Alert } from 'react-native';
import type { BarCodeScannerResult } from 'expo-barcode-scanner';

import AppLayout from './AppLayout';
import { BACKEND_URL, EVENTS } from './configuration';
import type {
  ConnectionError,
  MessageData,
  Views,
} from './types';

export default function App(): React.ReactElement {
  const [connectionId, setConnectionId] = useState<string>('');
  const [connectionTime, setConnectionTime] = useState<number>(0);
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
    if (errorEvent.message && errorEvent.message.includes('Socket is not connected')) {
      return setError('Server connection has been closed!');
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
        Alert.alert('Your device has been authenticated!');
        return setView('main');
      }
      if (messageData.event === EVENTS.invalidTarget) {
        return Alert.alert(
          'Authentication failed!',
          'Device that you are authenticating is disconnected or has a connection issue!',
        );
      }
      if (messageData.event === EVENTS.ping) {
        return connection.send(JSON.stringify({ event: EVENTS.pingResponse }));
      }
      if (messageData.event === EVENTS.registerConnection) {
        setConnectionId(messageData.data || '');
        return setLoading(false);
      }
      if (messageData.event === EVENTS.serverDisconnect) {
        connection.close(0, EVENTS.serverDisconnect);
        setConnectionId('');
        setIsRegistered(false);
        setName('');
        setShowReconnect(true);
        return setError('Server connection has been closed!');
      }
      if (messageData.event === EVENTS.unauthorized) {
        return Alert.alert(
          'Authorization failed!',
          'You are not authorized to perform this operation!',
        );
      }
      return null;
    } catch {
      return Alert.alert(
        'Parsing error!',
        'Incoming message is invalid!',
      );
    }
  };

  const handleReconnect = (): void => {
    setConnectionId('');
    setConnectionTime(Date.now());
    setError('');
    setIsRegistered(false);
    setLoading(true);
    setName('');
    return setShowReconnect(false);
  };

  const handleScanned = (result: BarCodeScannerResult): void => {
    if (!(connectionRef && connectionRef.current
      && connectionRef.current.readyState === 1)) {
      return null;
    }
    const targetId = result.data;
    const { current: connection } = connectionRef;
    connection.send(JSON.stringify({
      data: targetId,
      event: EVENTS.authenticateTarget,
    }));
    Alert.alert(
      'Device authenticated!',
      `Device ${targetId} has been authenticated!`,
    );
    return setView('main');
  };

  const handleSignOut = (): null | void => {
    setIsRegistered(false);
    setName('');
    if (!(connectionRef && connectionRef.current
      && connectionRef.current.readyState === 1)) {
      return null;
    }
    const { current: connection } = connectionRef;
    return connection.send(JSON.stringify({
      event: EVENTS.signOut,
    }));
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
      return setView('main');
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
    [connectionTime],
  );

  return (
    <AppLayout
      connectionId={connectionId}
      error={error}
      handleInput={setName}
      handleNavigation={setView}
      handleReconnect={handleReconnect}
      handleScanned={handleScanned}
      handleSignOut={handleSignOut}
      handleSubmitSignUp={handleSubmitSignUp}
      isRegistered={isRegistered}
      loading={loading}
      name={name}
      showReconnect={showReconnect}
      view={view}
    />
  );
}
