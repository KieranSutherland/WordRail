import React from "react";
import { View } from 'react-native';
import SettingsButton from "./buttons/SettingsButton";
import InfoButton from "./buttons/InfoButton";

export default function RightSideTopBar() {
    return (
        <View style={ {
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 10
        } }>
            <View className="flex-row gap-4">
                <InfoButton />
                <SettingsButton />
            </View>
        </View>
    );
}