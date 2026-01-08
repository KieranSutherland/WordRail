import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import SettingsButton from '../components/buttons/SettingsButton';
import { InputOption } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../components/ThemeProvider';

export default function Home() {
    const router = useRouter();
    const { colors } = useAppTheme();

    const inputOptions: InputOption[] = [
        {
            id: 'text',
            title: 'Raw Text',
            iconName: 'text-outline',
            description: 'Type or paste text directly'
        },
        {
            id: 'file',
            title: 'File Upload',
            iconName: 'document-text-outline',
            description: 'Upload a text document (.txt, .pdf)'
        },
        {
            id: 'image',
            title: 'Image / Screenshot',
            iconName: 'image-outline',
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
        <SafeAreaView style={ { flex: 1, backgroundColor: colors.background } }>
            <View className="flex-1 p-6">
                <View>
                    <SettingsButton />
                </View>

                <View className="w-fit mb-7">
                    <View style={ { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 } }>
                        <Text style={ { fontSize: 32, fontWeight: 'bold', color: colors.text } }>
                            Word
                        </Text>
                        <Text style={ { fontSize: 32, fontWeight: 'bold', color: colors.primary } }>
                            Rail
                        </Text>
                    </View>
                    <Text style={ { fontSize: 16, color: colors.textSecondary } }>
                        One-word focus reading
                    </Text>
                </View>

                <View className="gap-4">
                    { inputOptions.map((option) => (
                        <TouchableOpacity
                            key={ option.id }
                            style={ { backgroundColor: colors.card, borderRadius: 16, padding: 24, display: 'flex' } }
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
                        </TouchableOpacity>
                    )) }
                </View>

                <View style={ { marginTop: 32, backgroundColor: colors.card, borderRadius: 16, padding: 20 } }>
                    <Text style={ { fontSize: 14, fontWeight: '600', color: colors.primary, marginBottom: 12 } }>
                        💡 How does it work?
                    </Text>
                    <Text style={ { fontSize: 12, color: colors.textSecondary, lineHeight: 20, marginBottom: 8 } }>
                        <Text style={ { fontWeight: '600' } }>Rapid Serial Visual Presentation (RSVP)</Text> helps you read faster by displaying one word at a time,
                        reducing eye movement and increasing focus.
                    </Text>
                    <Text style={ { fontSize: 12, color: colors.textSecondary, lineHeight: 20 } }>
                        <Text style={ { fontWeight: '600' } }>Optimal Recognition Point (ORP)</Text> helps you comprehend each word
                        faster by positioning the optimal letter in the center of the screen, further reducing cognitive load.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}