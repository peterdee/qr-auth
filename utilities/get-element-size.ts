import { Dimensions } from 'react-native';

interface GetElementSizeData {
  heightPercent?: number;
  widthPercent?: number;
}

interface GetElementSizeDataResult {
  height?: number;
  width?: number;
}

export default function getElementSize(
  size: GetElementSizeData,
): GetElementSizeDataResult {
  const { heightPercent, widthPercent } = size;
  const { height, width } = Dimensions.get('window');
  const result: GetElementSizeDataResult = {};
  if (heightPercent) {
    result.height = Math.round((height / 100) * heightPercent);
  }
  if (widthPercent) {
    result.width = Math.round((width / 100) * widthPercent);
  }
  return result;
}
