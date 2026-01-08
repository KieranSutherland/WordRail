import React from 'react';
import { useRouter } from 'expo-router';
import IconButton from './IconButton';

export default function SettingsButton() {
    const router = useRouter();

    return (
        <IconButton
            iconName="settings-outline"
            onPress={ () => router.push('/settings') }
            style={ {
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 10
            } }
        />
    );
}