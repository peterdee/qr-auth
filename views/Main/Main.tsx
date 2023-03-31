import React, { memo } from 'react';
import { Text, View } from 'react-native';

import Button from '../../components/Button';
import { SPACER } from '../../configuration';
import styles from './styles';
import type { Views } from '../../types';

interface MainProps {
  connectionId: string;
  handleNavigation: (value: Views) => void;
  handleSignOut: () => void;
  isRegistered: boolean;
  name: string;
}

function Main(props: MainProps): React.ReactElement {
  const {
    connectionId,
    handleNavigation,
    handleSignOut,
    isRegistered,
    name,
  } = props;

  return (
    <View style={styles.mainWrap}>
      <Text style={styles.title}>
        QR Auth Demo
      </Text>
      <Text style={styles.connectionId}>
        { `Connection ID: ${connectionId}` }
      </Text>
      { !isRegistered && (
        <>
          <Button
            customStyles={{
              marginTop: SPACER * 1.5,
            }}
            onPress={(): void => handleNavigation('sign-in')}
            text="Sign in"
          />
          <Button
            customStyles={{
              marginTop: SPACER * 1.5,
            }}
            onPress={(): void => handleNavigation('sign-up')}
            text="Sign up"
          />
        </>
      ) }
      { isRegistered && (
        <>
          <Text style={styles.registered}>
            { `Hello, ${name}!` }
          </Text>
          <Button
            customStyles={{
              marginTop: SPACER * 1.5,
            }}
            onPress={(): void => handleNavigation('scanner')}
            text="Authenticate another device"
          />
          <Button
            customStyles={{
              marginTop: SPACER * 1.5,
            }}
            onPress={handleSignOut}
            text="Sign out"
          />
        </>
      ) }
    </View>
  );
}

export default memo(Main);
