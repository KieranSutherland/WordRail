import { useRouter } from "expo-router";
import React from "react";
import { GestureResponderEvent } from 'react-native';
import IconButton, { IconButtonProps } from "./IconButton";
import { back } from "../../utils/navigation";

export default function BackButton(props: IconButtonProps) {
    const router = useRouter();

    const onPress = (event: GestureResponderEvent) => {
        event.preventDefault();
        if (props.onPress) {
            props.onPress(event);
        }
        back(router);
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