import React from 'react';
import { PressableProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../ThemeProvider';
import { BaseButton } from './BaseButton';

export interface IconButtonProps extends PressableProps {
    iconName: React.ComponentProps<typeof Ionicons>[ 'name' ];
    iconProps?: Partial<React.ComponentProps<typeof Ionicons>>;
}

export default function IconButton(props: IconButtonProps) {
    const { iconName, iconProps, style, ...rest } = props;
    const { colors } = useAppTheme();
    return (
        <BaseButton
            bgColor={ colors.background }
            style={ {
                width: 44,
                height: 44,
                borderRadius: 22,
                borderWidth: 2,
                borderColor: colors.textSecondary,
                alignItems: 'center',
                justifyContent: 'center',
                ...style as any
            } }
            { ...rest }
        >
            <Ionicons name={ iconName } size={ 22 } color={ colors.text } { ...iconProps } />
        </BaseButton>
    );
}