import React, { memo } from 'react';
import { Text } from 'react-native';

function Spinner(): React.ReactElement {
  return (
    <Text>
      Loading...
    </Text>
  );
}

export default memo(Spinner);
