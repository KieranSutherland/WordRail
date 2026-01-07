import { useRouter } from "expo-router";
import React from "react";
import {
    GestureResponderEvent,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
} from 'react-native';
import { colours } from "../theme/colours";

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
        <TouchableOpacity {...props} onPress={onPress}>
            <Text style={ { color: colours.accent, fontWeight: '600', marginBottom: 16 } }>{ `< Back` }</Text>
        </TouchableOpacity>
    );
}