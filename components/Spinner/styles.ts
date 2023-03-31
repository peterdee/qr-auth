import { StyleSheet } from 'react-native';

import { COLORS } from '../../configuration';
import getElementSize from '../../utilities/get-element-size';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: getElementSize({ heightPercent: 100 }).height,
  },
  ring: {
    borderColor: COLORS.accent,
    borderRadius: 40,
    borderWidth: 10,
    height: 80,
    position: 'absolute',
    width: 80,
  },
});
