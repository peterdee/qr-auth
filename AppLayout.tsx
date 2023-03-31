import React, { memo } from 'react';
import { View } from 'react-native';

import { Views } from './types';

interface AppLayoutProps {
  handleNavigation: (value: Views) => void;
  isRegistered: boolean;
  loading: boolean;
  name: string;
}

function AppLayout(props: AppLayoutProps): React.ReactElement {
  const {
    handleNavigation,
    isRegistered,
    loading,
    name,
  } = props;

  return (
    <View />
  );
}

export default memo(AppLayout);
