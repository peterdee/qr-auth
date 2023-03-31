import { StyleSheet } from 'react-native';

import { COLORS, SPACER } from '../../configuration';
import getElementSize from '../../utilities/get-element-size';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: SPACER / 4,
    display: 'flex',
    height: SPACER * 2.5,
    justifyContent: 'center',
    width: getElementSize({ widthPercent: 80 }).width,
  },
  text: {
    color: COLORS.textInverted,
  },
});
