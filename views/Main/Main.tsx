import React, { memo } from 'react';
import { Pressable, Text } from 'react-native';

import { Views } from '../../types';

interface MainProps {
  connectionId: string;
  handleNavigation: (value: Views) => void;
  isRegistered: boolean;
  name: string;
}

function Main(props: MainProps): React.ReactElement {
  const {
    connectionId,
    handleNavigation,
    isRegistered,
    name,
  } = props;

  return (
    <>
      <Text>
        { `Connection ID: ${connectionId}` }
      </Text>
      { !isRegistered && (
        <>
          <Pressable onPress={(): void => handleNavigation('sign-in')}>
            <Text>
              Sign in
            </Text>
          </Pressable>
          <Pressable onPress={(): void => handleNavigation('sign-up')}>
            <Text>
              Sign up
            </Text>
          </Pressable>
        </>
      ) }
      { isRegistered && (
        <>
          <Text>
            { `Hello, ${name}` }
          </Text>
          <Pressable onPress={(): void => handleNavigation('scanner')}>
            <Text>
              Authenticate another device
            </Text>
          </Pressable>
        </>
      ) }
    </>
  );
}

export default memo(Main);
