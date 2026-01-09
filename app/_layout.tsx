import { Stack } from 'expo-router';

import { useAppTheme } from '../components/ThemeProvider';
import '../global.css';
import ThemeProvider from '../components/ThemeProvider';

export default function RootLayout() {
    const { colors } = useAppTheme();
    
    return (
        <ThemeProvider>
            <Stack
                screenOptions={ {
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.background },
                    animation: 'slide_from_right',
                } }
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="preview" />
                <Stack.Screen name="reader" />
                <Stack.Screen name="recents" />
                <Stack.Screen
                    name="settings"
                    options={ {
                        presentation: 'modal',
                        animation: 'slide_from_bottom',
                    } }
                />
                <Stack.Screen
                    name="info"
                    options={ {
                        presentation: 'modal',
                        animation: 'slide_from_bottom',
                    } }
                />
            </Stack>
        </ThemeProvider>
    );
}