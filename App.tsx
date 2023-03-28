import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { BACKEND_URL } from './configuration';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const [connection, setConnection] = useState<WebSocket | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(
    (): (() => void) => {
      const socketConnection = new WebSocket(BACKEND_URL);
      socketConnection.onopen = (): void => {
        setConnection(socketConnection);
        setLoading(false);
        console.log('CONNECTED');
      };
      socketConnection.onerror = (event: Event) => {
        console.log('error', event);
      };
      socketConnection.onmessage = (event: MessageEvent<string>) => {
        console.log('incoming message', event);
        const eventData = JSON.parse(event.data);
        console.log(eventData.data, eventData.event);
        if (eventData.event === 'ping') {
          socketConnection.send(JSON.stringify({
            event: 'pong',
          }));
        }
      };

      return (): void => {
        console.log('disconnecting in useEffect');
        socketConnection.close(0, 'Client disconnecting');
      };
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Text>
        { loading ? 'Loading' : 'Connected' }
      </Text>
      <StatusBar />
    </View>
  );
}
