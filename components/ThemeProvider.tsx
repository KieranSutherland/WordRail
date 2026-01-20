import { ThemeProvider as ReactThemeProvider, DefaultTheme, useTheme } from '@react-navigation/native';

interface AppTheme extends ReactNavigation.Theme {
    colors: ReactNavigation.Theme[ 'colors' ] & {
        secondary: string;
        textSecondary: string;
        cardHover: string;
    };
}

export function useAppTheme(): AppTheme {
    return useTheme() as AppTheme;
}

const theme: AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#3A86FF',
        secondary: '#2A6FDB',
        background: '#0F1115',
        card: '#1A1C20',
        cardHover: '#27292e',
        text: '#EDEDED',
        textSecondary: '#8E8E93',
    },
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactThemeProvider value={ theme }>
            { children }
        </ReactThemeProvider>
    );
}