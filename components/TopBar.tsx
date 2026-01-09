import React from "react";
import { GestureResponderEvent, View } from 'react-native';
import BackButton from "./buttons/BackButton";
import RightSideTopBar from "./RightSideTopBar";

interface TopBarProps {
    onBack?: ((event: GestureResponderEvent) => void);
    disableRightSide?: boolean;
}

export default function TopBar(props: TopBarProps) {
    return (
        <View className="h-11" style={ { marginBottom: -8 } }>
            <BackButton onPress={ props.onBack } />
            { props.disableRightSide ? null : <RightSideTopBar /> }
        </View>
    );
}