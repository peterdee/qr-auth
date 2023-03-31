import { StyleSheet } from 'react-native';

import getElementSize from '../../utilities/get-element-size';

export default StyleSheet.create({
  scannerWindow: {
    ...getElementSize({ heightPercent: 100, widthPercent: 100 }),
  },
  wrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: getElementSize({ widthPercent: 100 }).width,
  },
});
