import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BACKEND_URL, EVENTS } from './configuration';
import type { ConnectionError, MessageData } from './types';
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
  const [showReconnect, setShowReconnect] = useState<boolean>(false);

  const handleConnectionError = (event: Event) => {
    const errorEvent = event as ConnectionError;
    setLoading(false);
    setShowReconnect(true);
    if (errorEvent.message && errorEvent.message.includes('Connection refused')) {
      return setError('Could not connect to the server!');
    }
    return setError('Something went wrong!');
  };

  const handleIncomingMessage = (message: MessageEvent<string>) => {
    try {
      const messageData: MessageData = JSON.parse(message.data);
      if (messageData.event === EVENTS.ping) {
        connection.send(JSON.stringify({ event: EVENTS.pingResponse }));
      }
    } catch (parsingError) {
      console.log(parsingError);
    }
  };

  const handleReconnect = (): void => {
    console.log('reconnect');
  };

  const handleViews = (view: string): void => {
    console.log('navigate to', view);
  };

  useEffect(
    (): (() => void) => {
      const socketConnection = new WebSocket(BACKEND_URL);
      socketConnection.onopen = (): void => {
        setConnection(socketConnection);
        setLoading(false);
        console.log('CONNECTED');
      };
      socketConnection.onerror = handleConnectionError;
      socketConnection.onmessage = handleIncomingMessage;

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
              <Pressable onPress={(): void => handleViews('sign-in')}>
                <Text>
                  Sign in
                </Text>
              </Pressable>
              <Pressable onPress={(): void => handleViews('sign-up')}>
                <Text>
                  Sign up
                </Text>
              </Pressable>
            </>
          ) }
        </View>
      ) }
      <StatusBar />
    </View>
  );
}
