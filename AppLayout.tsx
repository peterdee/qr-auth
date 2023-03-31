import React, { memo } from 'react';
import type { BarCodeScannerResult } from 'expo-barcode-scanner';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Main from './views/Main';
import Scanner from './views/Scanner';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Spinner from './components/Spinner';
import type { Views } from './types';

interface AppLayoutProps {
  connectionId: string;
  error: string;
  handleInput: (value: string) => void;
  handleNavigation: (value: Views) => void;
  handleReconnect: () => void;
  handleScanned: (value: BarCodeScannerResult) => void;
  handleSubmitSignUp: () => void;
  handleSignOut: () => void;
  isRegistered: boolean;
  loading: boolean;
  name: string;
  showReconnect: boolean;
  view: Views;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

function AppLayout(props: AppLayoutProps): React.ReactElement {
  const {
    connectionId,
    error,
    handleInput,
    handleNavigation,
    handleReconnect,
    handleScanned,
    handleSignOut,
    handleSubmitSignUp,
    isRegistered,
    loading,
    name,
    showReconnect,
    view,
  } = props;

  return (
    <View style={styles.container}>
      <StatusBar />
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
                  handleSignOut={handleSignOut}
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
    </View>
  );
}

export default memo(AppLayout);
