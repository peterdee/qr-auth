import React, { memo } from 'react';
import QR from 'react-native-qrcode-svg';
import { Text, View } from 'react-native';

import Button from '../../components/Button';
import getElementSize from '../../utilities/get-element-size';
import { SPACER } from '../../configuration';
import styles from './styles';
import type { Views } from '../../types';

interface SignInProps {
  connectionId: string;
  handleNavigation: (value: Views) => void;
}

function SignIn(props: SignInProps): React.ReactElement {
  const {
    connectionId,
    handleNavigation,
  } = props;

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>
        Sign In
      </Text>
      <Text style={styles.subtitle}>
        Scan this QR on another device to sign in
      </Text>
      <QR
        size={getElementSize({ widthPercent: 80 }).width}
        value={connectionId}
      />
      <Button
        customStyles={{
          marginTop: SPACER * 1.5,
        }}
        onPress={(): void => handleNavigation('main')}
        text="Cancel"
      />
    </View>
  );
}

export default memo(SignIn);
