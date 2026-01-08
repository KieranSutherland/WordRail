import { View } from "react-native";
import { useAppTheme } from '../components/ThemeProvider';

export function Screen({ children }: { children: React.ReactNode }) {
    const { colors } = useAppTheme();
    return (
        <View
            style={ { flex: 1, backgroundColor: colors.background } }
        >
            { children }
        </View>
    );
}