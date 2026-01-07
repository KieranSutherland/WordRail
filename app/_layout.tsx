import { Stack } from 'expo-router';
import { colours } from '../theme/colours';
import '../global.css';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={ {
                headerShown: false,
                contentStyle: { backgroundColor: colours.background },
                animation: 'slide_from_right',
            } }
        >
            <Stack.Screen name="index" />
            <Stack.Screen name="preview" />
            <Stack.Screen name="reader" />
            <Stack.Screen
                name="settings"
                options={ {
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                } }
            />
        </Stack>
    );
}