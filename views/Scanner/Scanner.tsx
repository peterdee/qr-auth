import React, { memo, useEffect } from 'react';
import { Alert, View } from 'react-native';
import {
  BarCodeScanner,
  type BarCodeScannerResult,
} from 'expo-barcode-scanner';

import Button from '../../components/Button';
import { SPACER } from '../../configuration';
import styles from './styles';
import type { Views } from '../../types';

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
            'Please allow access to the camera!',
          );
        }
      });
    },
    [],
  );

  return (
    <View style={styles.wrap}>
      <BarCodeScanner
        onBarCodeScanned={handleScanned}
        style={styles.scannerWindow}
      />
      <Button
        customStyles={{
          bottom: SPACER * 3,
          position: 'absolute',
        }}
        onPress={(): void => handleNavigation('main')}
        text="Cancel"
      />
    </View>
  );
}

export default memo(Scanner);
