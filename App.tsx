/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type {ReactNode} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { Routes } from './src/router/Routes';
import { NavigationContainer } from '@react-navigation/native';
import { CameraFontId } from './src/screen/CameraFontId';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { PermissionsPage } from './src/screen/PermissionPage';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator<Routes>();

const App: () => ReactNode = () => {
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  if (cameraPermission == null) {
    // still loading
    return null;
  }
  const showPermissionsPage = cameraPermission !== 'authorized';
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarStyle: 'dark',
          animationTypeForReplace: 'push',
        }}
        initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'CameraFontId'}>
        <Stack.Screen name="PermissionsPage" component={PermissionsPage} />
        <Stack.Screen name="CameraFontId" component={gestureHandlerRootHOC(CameraFontId)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;