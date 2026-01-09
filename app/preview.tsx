import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAppStore } from '../store';
import { processText } from '../utils/textProcessor';
import { useAppTheme } from '../components/ThemeProvider';
import TopBar from '../components/TopBar';
import { InputOption } from '../components/HomeScreenButton';
import PageHeader from '../components/PageHeader';

export default function Preview() {
    const router = useRouter();
    const { colors } = useAppTheme();
    const { inputType } = useLocalSearchParams<{ inputType: InputOption[ 'id' ] }>();
    const [ localText, setLocalText ] = useState('');

    const setText = useAppStore((state) => state.setText);
    const setId = useAppStore((state) => state.setId);
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
        setId(Math.random().toString(36).substring(2, 9));
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
        <SafeAreaView style={ { flex: 1, backgroundColor: colors.background } }>
            <View className="flex-1 p-6 gap-6">
                <TopBar />
                <PageHeader
                    title="Preview & Edit"
                    subtitle="Review and adjust your text before reading"
                >
                    { inputType !== 'text' && (
                        <View style={ { backgroundColor: colors.card, borderRadius: 16, padding: 16 } }>
                            <Text style={ { fontSize: 14, color: colors.primary } }>
                                📌 { inputType === 'file' ? 'File upload' : 'Image OCR' } coming soon!
                                For now, please paste your text manually.
                            </Text>
                        </View>
                    ) }
                </PageHeader>

                {/* TextInput with flex: 1 to fill remaining space */ }
                <View className="flex-1">
                    <TextInput
                        style={ {
                            flex: 1,
                            backgroundColor: colors.card,
                            borderRadius: 16,
                            padding: 16,
                            fontSize: 16,
                            color: colors.text,
                        } }
                        multiline
                        placeholder={ getPlaceholder() }
                        placeholderTextColor={ colors.textSecondary }
                        value={ localText }
                        onChangeText={ setLocalText }
                        textAlignVertical="top"
                    />
                </View>

                {/* Bottom section */ }
                <View className="gap-6">
                    <View style={ { backgroundColor: colors.card, borderRadius: 16, padding: 16 } }>
                        <Text style={ { fontSize: 14, color: colors.textSecondary } }>
                            Word count: <Text style={ { color: colors.primary, fontWeight: '600' } }>{ processText(localText).length }</Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={ {
                            backgroundColor: localText.trim() ? colors.primary : colors.card,
                            borderRadius: 16,
                            paddingVertical: 16,
                            alignItems: 'center',
                        } }
                        onPress={ handleStartReading }
                        disabled={ !localText.trim() }
                    >
                        <Text style={ {
                            color: localText.trim() ? colors.text : colors.textSecondary,
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