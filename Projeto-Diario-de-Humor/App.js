import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/routes/AppNavigation';

export default function App() {
  return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}
