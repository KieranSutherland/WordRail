import React from "react";
import { View } from "react-native";
import { useAppTheme } from "./ThemeProvider";

export default function Divider() {
    const { colors } = useAppTheme();
    return (
        <View
            className="h-[1px] w-full my-8"
            style={ { backgroundColor: colors.textSecondary, opacity: 0.2 } }
        />
    );
}