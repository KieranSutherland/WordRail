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
            <View className="flex-1 p-6 gap-6">
                <View className="h-10">
                    <SettingsButton />
                    <BackButton />
                </View>
                <View className="gap-6" style={ { marginTop: -8 } }>

                    <Text style={ { fontSize: 28, fontWeight: 'bold', color: colours.textPrimary } }>
                        Preview & Edit
                    </Text>
                    <Text style={ { color: colours.textSecondary } }>
                        Review and adjust your text before reading
                    </Text>

                    { inputType !== 'text' && (
                        <View style={ { backgroundColor: colours.surface, borderRadius: 16, padding: 16 } }>
                            <Text style={ { fontSize: 14, color: colours.accent } }>
                                📌 { inputType === 'file' ? 'File upload' : 'Image OCR' } coming soon!
                                For now, please paste your text manually.
                            </Text>
                        </View>
                    ) }
                </View>

                {/* TextInput with flex: 1 to fill remaining space */ }
                <View className="flex-1">
                    <TextInput
                        style={ {
                            flex: 1,
                            backgroundColor: colours.surface,
                            borderRadius: 16,
                            padding: 16,
                            fontSize: 16,
                            color: colours.textPrimary,
                        } }
                        multiline
                        placeholder={ getPlaceholder() }
                        placeholderTextColor={ colours.textSecondary }
                        value={ localText }
                        onChangeText={ setLocalText }
                        textAlignVertical="top"
                    />
                </View>

                {/* Bottom section */ }
                <View className="gap-6">
                    <View style={ { backgroundColor: colours.surface, borderRadius: 16, padding: 16 } }>
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
                        } }
                        onPress={ handleStartReading }
                        disabled={ !localText.trim() }
                    >
                        <Text style={ {
                            color: localText.trim() ? colours.textPrimary : colours.textSecondary,
                            fontWeight: 'bold',
                            fontSize: 18
                        } }>
                            Start Reading
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}