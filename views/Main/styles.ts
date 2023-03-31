import { StyleSheet } from 'react-native';

import { COLORS, SPACER } from '../../configuration';
import getElementSize from '../../utilities/get-element-size';

export default StyleSheet.create({
  connectionId: {
    color: COLORS.muted,
    fontSize: SPACER - 4,
    marginTop: SPACER / 2,
  },
  mainWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: getElementSize({ widthPercent: 100 }).width,
  },
  registered: {
    color: COLORS.text,
    fontSize: SPACER + SPACER / 2 + SPACER / 4,
    fontWeight: '200',
    marginTop: SPACER * 1.5,
    textAlign: 'center',
    width: getElementSize({ widthPercent: 80 }).width,
  },
  title: {
    color: COLORS.accent,
    fontSize: SPACER * 2,
    fontWeight: '200',
  },
});
