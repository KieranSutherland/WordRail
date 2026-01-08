import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import SettingsButton from '../components/SettingsButton';
import { colours } from '../theme/colours';
import { useAppStore } from '../store';
import { getORPIndex, getWordDelay } from '../utils/orpCalculator';
import BackButton from '../components/BackButton';

export default function Reader() {
    const router = useRouter();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const words = useAppStore((state) => state.words);
    const currentIndex = useAppStore((state) => state.currentIndex);
    const isPlaying = useAppStore((state) => state.isPlaying);
    const baseSpeed = useAppStore((state) => state.baseSpeed);
    const setIsPlaying = useAppStore((state) => state.setIsPlaying);
    const setCurrentIndex = useAppStore((state) => state.setCurrentIndex);
    const nextWord = useAppStore((state) => state.nextWord);
    const resetReading = useAppStore((state) => state.resetReading);
    const resetAll = useAppStore((state) => state.resetAll);

    useEffect(() => {
        if (words.length === 0) {
            Alert.alert(
                'No Text',
                'Please go back and enter some text to read.',
                [ { text: 'OK', onPress: () => router.back() } ]
            );
        }
    }, []);

    useEffect(() => {
        if (isPlaying && words.length > 0 && currentIndex < words.length) {
            const currentWord = words[ currentIndex ];
            const delay = getWordDelay(currentWord, baseSpeed);

            intervalRef.current = setTimeout(() => {
                nextWord();
            }, delay);
        } else if (currentIndex >= words.length && words.length > 0) {
            setIsPlaying(false);
        }

        return () => {
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
            }
        };
    }, [ isPlaying, currentIndex, words, baseSpeed, nextWord, setIsPlaying ]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleReset = () => {
        resetReading();
    };

    const handleExit = () => {
        if (isPlaying) {
            setIsPlaying(false);
        }
        resetAll();
    };

    const renderWord = () => {
        if (words.length === 0 || currentIndex >= words.length) {
            return (
                <Text style={ { fontSize: 32, color: colours.textSecondary, textAlign: 'center' } }>
                    { words.length > 0 ? '🎉 Finished!' : 'No text loaded' }
                </Text>
            );
        }

        const word = words[ currentIndex ];
        const orpIndex = getORPIndex(word);
        const letters = word.split('');

        const beforeORP = letters.slice(0, orpIndex);
        const orpLetter = letters[ orpIndex ];
        const afterORP = letters.slice(orpIndex + 1);

        return (
            <View style={ { alignItems: 'center', justifyContent: 'center', width: '100%' } }>
                <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                    <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: 144 } }>
                        { beforeORP.map((char, index) => (
                            <Text
                                key={ `before-${index}-${char}` }
                                style={ { fontSize: 56, fontWeight: 'bold', color: colours.textPrimary } }
                            >
                                { char }
                            </Text>
                        )) }
                    </View>

                    <Text style={ { fontSize: 56, fontWeight: 'bold', color: colours.textPrimary } }>
                        { orpLetter }
                    </Text>

                    <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: 144 } }>
                        { afterORP.map((char, index) => (
                            <Text
                                key={ `after-${index}-${char}` }
                                style={ { fontSize: 56, fontWeight: 'bold', color: colours.textPrimary } }
                            >
                                { char }
                            </Text>
                        )) }
                    </View>
                </View>
            </View>
        );
    };

    const progress = words.length > 0
        ? Math.min(((currentIndex + 1) / words.length) * 100, 100)
        : 0;

    const displayableIndex = words.length <= currentIndex ? words.length : currentIndex + 1

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: colours.background } }>
            <View className="flex-1 gap-6 p-6">
                <View className="h-10">
                    <SettingsButton />
                    <BackButton onPress={ handleExit } />
                </View>

                <View style={ { marginTop: -8 } }>
                    <View style={ { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 } }>
                        <Text style={ { fontSize: 14, fontWeight: '600', color: colours.textPrimary } }>
                            { displayableIndex } / { words.length }
                        </Text>
                        <Text style={ { fontSize: 14, color: colours.textSecondary } }>
                            { Math.round(60000 / baseSpeed) } WPM
                        </Text>
                    </View>
                    <View style={ { height: 6, backgroundColor: colours.surface, borderRadius: 999, overflow: 'hidden' } }>
                        <View
                            style={ {
                                height: '100%',
                                backgroundColor: colours.accent,
                                borderRadius: 999,
                                width: `${progress}%`
                            } }
                        />
                    </View>
                </View>

                <View style={ {
                    flex: 1,
                    backgroundColor: colours.surface,
                    borderRadius: 24,
                    padding: 32,
                    alignItems: 'center',
                    justifyContent: 'center'
                } }>
                    { renderWord() }
                </View>

                <View className="flex-row gap-4">
                    <TouchableOpacity
                        style={ {
                            flex: 1,
                            backgroundColor: colours.accent,
                            borderRadius: 16,
                            paddingVertical: 16,
                            alignItems: 'center'
                        } }
                        onPress={ handlePlayPause }
                        disabled={ words.length === 0 }
                    >
                        <Text style={ { color: colours.textPrimary, fontWeight: 'bold', fontSize: 18 } }>
                            { isPlaying ? 'Pause' : currentIndex > 0 ? 'Resume' : 'Start' }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={ {
                            flex: 1,
                            backgroundColor: (words.length === 0 || currentIndex === 0) ? colours.surface : colours.accentMuted,
                            borderRadius: 16,
                            paddingVertical: 16,
                            alignItems: 'center'
                        } }
                        onPress={ handleReset }
                        disabled={ words.length === 0 || currentIndex === 0 }
                    >
                        <Text style={ {
                            color: (words.length === 0 || currentIndex === 0) ? colours.textSecondary : colours.textPrimary,
                            fontWeight: 'bold',
                            fontSize: 18
                        } }>
                            Reset
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}