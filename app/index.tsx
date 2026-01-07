import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import SettingsButton from '../components/SettingsButton';
import { colours } from '../theme/colours';
import { InputOption } from '../types';

export default function Home() {
    const router = useRouter();

    const inputOptions: InputOption[] = [
        {
            id: 'text',
            title: 'Raw Text',
            icon: '📝',
            description: 'Type or paste text directly'
        },
        {
            id: 'file',
            title: 'File Upload',
            icon: '📄',
            description: 'Upload a text document'
        },
        {
            id: 'image',
            title: 'Image/Screenshot',
            icon: '📸',
            description: 'Extract text from an image'
        },
    ];

    const handleOptionPress = (optionId: string) => {
        router.push({
            pathname: '/preview',
            params: { inputType: optionId }
        });
    };

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: colours.background } }>
            <View className="flex-1 pt-8 px-6">
                <SettingsButton />

                <Text style={ { fontSize: 32, fontWeight: 'bold', color: colours.textPrimary, marginBottom: 8 } }>
                    WordRail
                </Text>
                <Text style={ { fontSize: 16, color: colours.textSecondary, marginBottom: 32 } }>
                    One-word focus reading
                </Text>

                <View className="gap-4">
                    { inputOptions.map((option) => (
                        <TouchableOpacity
                            key={ option.id }
                            style={ { backgroundColor: colours.surface, borderRadius: 16, padding: 24 } }
                            onPress={ () => handleOptionPress(option.id) }
                        >
                            <Text style={ { fontSize: 32, marginBottom: 12 } }>{ option.icon }</Text>
                            <Text style={ { fontSize: 20, fontWeight: '600', color: colours.textPrimary, marginBottom: 4 } }>
                                { option.title }
                            </Text>
                            <Text style={ { fontSize: 14, color: colours.textSecondary } }>{ option.description }</Text>
                        </TouchableOpacity>
                    )) }
                </View>

                <View style={ { marginTop: 32, backgroundColor: colours.surface, borderRadius: 16, padding: 20 } }>
                    <Text style={ { fontSize: 14, fontWeight: '600', color: colours.accent, marginBottom: 8 } }>
                        💡 About RSVP Reading
                    </Text>
                    <Text style={ { fontSize: 12, color: colours.textSecondary, lineHeight: 20 } }>
                        Rapid Serial Visual Presentation helps you read faster by displaying one word at a time,
                        reducing eye movement and increasing focus.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}