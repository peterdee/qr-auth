import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';

import styles from './styles';

interface ButtonProps {
  customStyles?: object;
  disabled?: boolean;
  onPress: () => void;
  text: string;
}

function Button(props: ButtonProps): React.ReactElement {
  const {
    customStyles,
    disabled,
    onPress,
    text,
  } = props;

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        ...styles.button,
        ...customStyles,
      }}
    >
      <Text style={styles.text}>
        { text.toUpperCase() }
      </Text>
    </Pressable>
  );
}

Button.defaultProps = {
  customStyles: {},
  disabled: false,
};

export default memo(Button);
