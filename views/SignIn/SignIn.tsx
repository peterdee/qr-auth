import React, { memo } from 'react';
import {
  Dimensions,
  Pressable,
  Text,
  View,
} from 'react-native';
import QR from 'react-native-qrcode-svg';

import { Views } from '../../types';

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
    <View>
      <Text>
        Scan this QR on another device to sign in
      </Text>
      <QR
        size={Math.floor(Dimensions.get('screen').width * 0.8)}
        value={connectionId}
      />
      <Pressable onPress={(): void => handleNavigation('main')}>
        <Text>
          Cancel
        </Text>
      </Pressable>
    </View>
  );
}

export default memo(SignIn);
