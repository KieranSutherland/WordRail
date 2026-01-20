import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';
import { useAppTheme } from './ThemeProvider';
import { useRouter } from 'expo-router';
import { BaseButton } from './buttons/BaseButton';

export interface InputOption {
    id: 'text' | 'file' | 'image' | 'recents';
    title: string;
    iconName: React.ComponentProps<typeof Ionicons>[ 'name' ];
    description: string;
    pathname: string;
    onPress?: () => void;
}

interface HomeScreenButtonProps {
    option: InputOption;
}

export default function HomeScreenButton(props: HomeScreenButtonProps) {
    const { option } = props;
    const router = useRouter();
    const { colors } = useAppTheme();

    const handleOptionPress = (optionId: string) => {
        if (option.onPress) {
            option.onPress();
        }
        router.push({
            pathname: option.pathname,
            params: { inputType: optionId }
        });
    };

    return (
        <BaseButton
            key={ option.id }
            style={ {
                borderRadius: 16,
                padding: 24,
                display: 'flex'
            } }
            bgColor={ colors.card }
            onPress={ () => handleOptionPress(option.id) }
        >
            <View className="flex-1 flex-row items-center">
                <View className="flex-col">
                    <Ionicons name={ option.iconName } size={ 30 } color={ colors.primary } />
                    <Text style={ { fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: 4 } }>
                        { option.title }
                    </Text>
                    <Text style={ { fontSize: 14, color: colors.textSecondary } }>{ option.description }</Text>
                </View>
                <Ionicons className="ml-auto" name="arrow-forward" size={ 30 } color={ colors.text } />
            </View>
        </BaseButton>
    );
}