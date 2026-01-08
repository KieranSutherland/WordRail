import { useRouter } from "expo-router";
import React from "react";
import {
    GestureResponderEvent,
    TouchableOpacityProps,
} from 'react-native';
import IconButton from "./IconButton";

export default function BackButton(props: TouchableOpacityProps) {
    const router = useRouter();

    const onPress = (event: GestureResponderEvent) => {
        event.preventDefault();
        if (props.onPress) {
            props.onPress(event);
        }
        router.back();
    }

    return (
        <IconButton
            iconName="arrow-back"
            onPress={ onPress }
            style={ {
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10
            } }
        />
    );
}