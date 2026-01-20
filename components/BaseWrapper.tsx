import { SafeAreaView } from "react-native-safe-area-context"
import { useAppTheme } from "./ThemeProvider";
import { View } from 'react-native';
import React from "react";


interface BaseWrapperProps {
    children?: React.ReactNode
}

export default function BaseWrapper(props: BaseWrapperProps) {
    const { colors } = useAppTheme();

    return (
        <SafeAreaView style={ { flex: 1, alignItems: 'center', backgroundColor: colors.background } }>
            <View style={ { flex: 1, maxWidth: 1000, width: '100%' } }>
                { props.children }
            </View>
        </SafeAreaView>
    )
}