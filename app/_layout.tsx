import { Stack } from 'expo-router';
import * as Font from "expo-font";
import { useAppTheme } from '../components/ThemeProvider';
import '../global.css';
import ThemeProvider from '../components/ThemeProvider';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

export default function RootLayout() {
    const { colors } = useAppTheme();
    const [ fontsLoaded, setFontsLoaded ] = useState(false);

    useEffect(() => {
        Font.loadAsync(Ionicons.font).then(() => {
            setFontsLoaded(true);
        });
    }, []);

    if (!fontsLoaded) {
        return null; // or a splash/loading screen
    }

    return (
        <ThemeProvider>
            <Analytics />
            <SpeedInsights />
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