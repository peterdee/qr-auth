import { StyleSheet } from 'react-native';

import { COLORS, SPACER } from '../../configuration';
import getElementSize from '../../utilities/get-element-size';

export default StyleSheet.create({
  subtitle: {
    fontSize: SPACER + SPACER / 2,
    marginBottom: SPACER * 1.5,
    textAlign: 'center',
  },
  title: {
    color: COLORS.accent,
    fontSize: SPACER * 2,
    fontWeight: '200',
    marginBottom: SPACER,
    textAlign: 'center',
  },
  wrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: getElementSize({ widthPercent: 80 }).width,
  },
});
