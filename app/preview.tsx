import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SettingsButton from '../components/SettingsButton';
import { colours } from '../theme/colours';
import { useAppStore } from '../store';
import { processText } from '../utils/textProcessor';
import BackButton from '../components/BackButton';

export default function Preview() {
    const router = useRouter();
    const { inputType } = useLocalSearchParams<{ inputType: string }>();
    const [ localText, setLocalText ] = useState('');

    const setText = useAppStore((state) => state.setText);
    const setWords = useAppStore((state) => state.setWords);
    const resetReading = useAppStore((state) => state.resetReading);

    const handleStartReading = () => {
        const trimmedText = localText.trim();

        if (!trimmedText) {
            Alert.alert('No Text', 'Please enter some text to read.');
            return;
        }

        const words = processText(trimmedText);

        if (words.length === 0) {
            Alert.alert('No Words', 'No valid words found in the text.');
            return;
        }

        setText(trimmedText);
        setWords(words);
        resetReading();
        router.push('/reader');
    };

    const getPlaceholder = () => {
        switch (inputType) {
            case 'file':
                return 'File content will appear here...';
            case 'image':
                return 'Extracted text will appear here...';
            default:
                return 'Paste or type your text here...';
        }
    };

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: colours.background } }>
            <ScrollView className="flex-1">
                <View className="pt-8 px-6">
                    <SettingsButton />

                    <BackButton />

                    <Text style={ { fontSize: 28, fontWeight: 'bold', color: colours.textPrimary, marginBottom: 8 } }>
                        Preview & Edit
                    </Text>
                    <Text style={ { color: colours.textSecondary, marginBottom: 24 } }>
                        Review and adjust your text before reading
                    </Text>

                    { inputType !== 'text' && (
                        <View style={ { marginBottom: 16, backgroundColor: colours.surface, borderRadius: 16, padding: 16 } }>
                            <Text style={ { fontSize: 14, color: colours.accent } }>
                                📌 { inputType === 'file' ? 'File upload' : 'Image OCR' } coming soon!
                                For now, please paste your text manually.
                            </Text>
                        </View>
                    ) }

                    <Text style={ { fontSize: 14, fontWeight: '600', color: colours.textPrimary, marginBottom: 8 } }>
                        Your Text
                    </Text>
                    <TextInput
                        style={ {
                            backgroundColor: colours.surface,
                            borderRadius: 16,
                            padding: 16,
                            minHeight: 256,
                            fontSize: 16,
                            color: colours.textPrimary
                        } }
                        multiline
                        placeholder={ getPlaceholder() }
                        placeholderTextColor={ colours.textSecondary }
                        value={ localText }
                        onChangeText={ setLocalText }
                        textAlignVertical="top"
                    />

                    <View style={ { marginTop: 16, marginBottom: 16, backgroundColor: colours.surface, borderRadius: 16, padding: 12 } }>
                        <Text style={ { fontSize: 14, color: colours.textSecondary } }>
                            Word count: <Text style={ { color: colours.accent, fontWeight: '600' } }>{ processText(localText).length }</Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={ {
                            backgroundColor: localText.trim() ? colours.accent : colours.surface,
                            borderRadius: 16,
                            paddingVertical: 16,
                            alignItems: 'center',
                            marginBottom: 24
                        } }
                        onPress={ handleStartReading }
                        disabled={ !localText.trim() }
                    >
                        <Text style={ {
                            color: localText.trim() ? colours.textPrimary : colours.textSecondary,
                            fontWeight: 'bold',
                            fontSize: 18
                        } }>
                            Start Reading →
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}