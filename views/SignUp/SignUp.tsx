import React, { memo, useMemo } from 'react';
import { Text, TextInput, View } from 'react-native';

import Button from '../../components/Button';
import { COLORS, SPACER } from '../../configuration';
import styles from './styles';
import type { Views } from '../../types';

interface SignUpProps {
  handleInput: (value: string) => void;
  handleNavigation: (value: Views) => void;
  handleSubmit: () => void;
  name: string;
}

function SignUp(props: SignUpProps): React.ReactElement {
  const {
    handleInput,
    handleNavigation,
    handleSubmit,
    name,
  } = props;

  const submitActive = useMemo(
    (): boolean => name.length > 0 && name.trim().length > 0,
    [name],
  );

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>
        Sign Up
      </Text>
      <TextInput
        onChangeText={handleInput}
        placeholder="Please enter your name"
        style={styles.input}
        value={name}
      />
      <Button
        customStyles={{
          backgroundColor: submitActive ? COLORS.accent : COLORS.muted,
          marginTop: SPACER * 1.5,
        }}
        disabled={!submitActive}
        onPress={handleSubmit}
        text="Submit"
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

export default memo(SignUp);
