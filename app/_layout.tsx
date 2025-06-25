import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        // Load only the working fonts
        await Font.loadAsync({
          'TESCOBL_1': require('../assets/fonts/TESCOBL_1.ttf'),
          'TESCOB_1': require('../assets/fonts/TESCOB_1.ttf'),
          'TESCOI_0': require('../assets/fonts/TESCOI_0.ttf'),
          'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          // Use TESCOB_1 as the Tesco font
          'Tesco': require('../assets/fonts/TESCOB_1.ttf'),
          'TescoSpecial': require('../assets/fonts/TESCOB_1.ttf'), // Use TESCOB_1 for TescoSpecial as well
        });
        
      } catch (e) {
        console.warn('Error loading main fonts:', e);
      } finally {
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Still loading fonts
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
