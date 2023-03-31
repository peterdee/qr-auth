import { StyleSheet } from 'react-native';

import { COLORS, SPACER } from '../../configuration';
import getElementSize from '../../utilities/get-element-size';

export default StyleSheet.create({
  input: {
    borderColor: COLORS.accent,
    borderRadius: SPACER / 4,
    borderWidth: 1,
    fontSize: SPACER,
    marginTop: SPACER * 1.5,
    padding: SPACER / 2,
    width: getElementSize({ widthPercent: 80 }).width,
  },
  title: {
    color: COLORS.accent,
    fontSize: SPACER * 2,
    fontWeight: '200',
  },
  wrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: getElementSize({ widthPercent: 100 }).width,
  },
});
