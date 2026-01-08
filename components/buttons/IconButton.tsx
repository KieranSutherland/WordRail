import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../ThemeProvider';

interface IconButtonProps extends TouchableOpacityProps {
    iconName: React.ComponentProps<typeof Ionicons>[ 'name' ];
    iconProps?: Partial<React.ComponentProps<typeof Ionicons>>;
}

export default function IconButton(props: IconButtonProps) {
    const { iconName, iconProps, style, ...rest } = props;
    const { colors } = useAppTheme();
    return (
        <TouchableOpacity
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
        </TouchableOpacity>
    );
}