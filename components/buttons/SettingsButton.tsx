import React from 'react';
import { useRouter } from 'expo-router';
import IconButton from './IconButton';

export type SettingsButtonProps = Omit<React.ComponentProps<typeof IconButton>, 'iconName' | 'onPress'>;

export default function SettingsButton(props: SettingsButtonProps) {
    const router = useRouter();

    return (
        <IconButton
            { ...props }
            iconName="settings-outline"
            onPress={ () => router.push('/settings') }
        />
    );
}