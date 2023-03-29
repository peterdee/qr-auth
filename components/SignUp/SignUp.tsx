import React, { memo } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

interface SignUpProps {
  handleInput: (value: string) => void;
  handleSubmit: () => void;
  name: string;
}

function SignUp(props: SignUpProps): React.ReactElement {
  const {
    handleInput,
    handleSubmit,
    name,
  } = props;

  return (
    <View>
      <Text>
        Sign Up
      </Text>
      <TextInput
        onChangeText={handleInput}
        value={name}
      />
      <Pressable onPress={handleSubmit}>
        <Text>
          Submit
        </Text>
      </Pressable>
    </View>
  );
}

export default memo(SignUp);
