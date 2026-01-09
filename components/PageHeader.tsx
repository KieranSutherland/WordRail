import React from "react";
import { View, Text } from "react-native";
import { useAppTheme } from "./ThemeProvider";

interface PageHeaderProps {
    title: string;
    subtitle: string;
    children?: React.ReactNode
}

export default function PageHeader(props: PageHeaderProps) {
    const { title, subtitle, children } = props;
    const { colors } = useAppTheme();

    return (
        <View className="gap-3">
            <Text style={ { fontSize: 28, fontWeight: 'bold', color: colors.text } }>
                { title }
            </Text>
            <Text style={ { color: colors.textSecondary } }>
                { subtitle }
            </Text>
            { children }
        </View>
    )
}