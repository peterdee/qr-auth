import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';

import styles from './styles';

interface ButtonProps {
  customStyles?: object;
  onPress: () => void;
  text: string;
}

function Button(props: ButtonProps): React.ReactElement {
  const {
    customStyles,
    onPress,
    text,
  } = props;

  return (
    <Pressable
      style={{
        ...styles.button,
        ...customStyles,
      }}
      onPress={onPress}
    >
      <Text style={styles.text}>
        { text.toUpperCase() }
      </Text>
    </Pressable>
  );
}

Button.defaultProps = {
  customStyles: {},
};

export default memo(Button);
