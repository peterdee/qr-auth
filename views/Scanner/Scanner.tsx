import React, { memo, useEffect } from 'react';
import {
  BarCodeScanner,
  type BarCodeScannerResult,
} from 'expo-barcode-scanner';
import { Alert, Pressable, Text } from 'react-native';

import { Views } from '../../types';

interface ScannerProps {
  handleNavigation: (value: Views) => void;
  handleScanned: (value: BarCodeScannerResult) => void;
}

function Scanner(props: ScannerProps): React.ReactElement {
  const {
    handleNavigation,
    handleScanned,
  } = props;

  useEffect(
    (): void => {
      BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
        if (status !== 'granted') {
          Alert.alert(
            'Camera access denied!',
            'Could not scan the code!',
          );
        }
      });
    },
    [],
  );

  return (
    <>
      <BarCodeScanner onBarCodeScanned={handleScanned} />
      <Pressable onPress={(): void => handleNavigation('main')}>
        <Text>
          Cancel
        </Text>
      </Pressable>
    </>
  );
}

export default memo(Scanner);
