import React from "react";
import { GestureResponderEvent, View } from 'react-native';
import SettingsButton from "./buttons/SettingsButton";
import BackButton from "./buttons/BackButton";

interface TopBarProps {
    onBack?: ((event: GestureResponderEvent) => void);
}

export default function TopBar(props: TopBarProps) {
    return (
        <View className="h-11">
            <SettingsButton />
            <BackButton onPress={ props.onBack } />
        </View>
    );
}