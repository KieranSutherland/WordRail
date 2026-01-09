import React from 'react';
import { useRouter } from 'expo-router';
import IconButton from './IconButton';

export type InfoButtonProps = Omit<React.ComponentProps<typeof IconButton>, 'iconName' | 'onPress'>;

export default function InfoButton(props: InfoButtonProps) {
    const router = useRouter();

    return (
        <IconButton
            { ...props }
            iconName="information-circle-outline"
            onPress={ () => router.push('/info') }
        />
    );
}