import React, { useEffect, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store';
import { getWordDelay } from '../utils/orpCalculator';
import { Ionicons } from '@expo/vector-icons';
import CurrentWord from '../components/CurrentWord';
import { useAppTheme } from '../components/ThemeProvider';
import TopBar from '../components/TopBar';
import BaseWrapper from '../components/BaseWrapper';
import { BaseButton } from '../components/buttons/BaseButton';

export default function Reader() {
    const router = useRouter();
    const { colors } = useAppTheme();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const words = useAppStore((state) => state.words);
    const currentIndex = useAppStore((state) => state.currentIndex);
    const isPlaying = useAppStore((state) => state.isPlaying);
    const baseSpeed = useAppStore((state) => state.baseSpeed);
    const rewind = useAppStore((state) => state.rewind);
    const forward = useAppStore((state) => state.forward);
    const setIsPlaying = useAppStore((state) => state.setIsPlaying);
    const nextWord = useAppStore((state) => state.nextWord);
    const resetReading = useAppStore((state) => state.resetReading);
    const addPreviousRead = useAppStore((state) => state.addPreviousRead);

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

    const handleEdit = () => {
        router.push({
            pathname: '/preview',
            params: { inputType: 'text' }
        });
    };

    const handleExit = () => {
        if (isPlaying) {
            setIsPlaying(false);
        }
        addPreviousRead();
        resetReading();
    };

    const progress = words.length > 0
        ? Math.min(((currentIndex + 1) / words.length) * 100, 100)
        : 0;

    const displayableIndex = words.length <= currentIndex ? words.length : currentIndex + 1

    return (
        <BaseWrapper>
            <View className="flex-1 gap-6 p-6">
                <TopBar onBack={ handleExit } />

                <View>
                    <View style={ { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 } }>
                        <Text style={ { fontSize: 14, fontWeight: '600', color: colors.text } }>
                            { displayableIndex } / { words.length }
                        </Text>
                        <Text style={ { fontSize: 14, color: colors.textSecondary } }>
                            { Math.round(60000 / baseSpeed) } WPM
                        </Text>
                    </View>
                    <View style={ { height: 6, backgroundColor: colors.card, borderRadius: 999, overflow: 'hidden' } }>
                        <View
                            style={ {
                                height: '100%',
                                backgroundColor: colors.primary,
                                borderRadius: 999,
                                width: `${progress}%`
                            } }
                        />
                    </View>
                </View>

                <View style={ {
                    flex: 1,
                    backgroundColor: colors.card,
                    borderRadius: 24,
                    padding: 32,
                    alignItems: 'center',
                    justifyContent: 'center'
                } }>
                    <CurrentWord />
                </View>

                <View className="flex-row gap-4">
                    <BaseButton
                        bgColor={ colors.primary }
                        disabledColor={ colors.card }
                        style={ {
                            flex: 1,
                            borderRadius: 16,
                            paddingVertical: 16,
                            alignItems: 'center'
                        } }
                        onPress={ rewind }
                        disabled={ words.length === 0 }
                    >
                        <Ionicons name={ 'play-back' } size={ 30 } color={ colors.text } />
                    </BaseButton>
                    <BaseButton
                        bgColor={ colors.primary }
                        disabledColor={ colors.card }
                        style={ {
                            flex: 1,
                            borderRadius: 16,
                            paddingVertical: 16,
                            alignItems: 'center'
                        } }
                        onPress={ () => setIsPlaying(!isPlaying) }
                        disabled={ words.length === 0 }
                    >
                        <Ionicons name={ isPlaying ? 'pause' : 'play' } size={ 30 } color={ colors.text } />
                    </BaseButton>
                    <BaseButton
                        bgColor={ colors.primary }
                        disabledColor={ colors.card }
                        style={ {
                            flex: 1,
                            borderRadius: 16,
                            paddingVertical: 16,
                            alignItems: 'center'
                        } }
                        onPress={ forward }
                        disabled={ words.length === 0 }
                    >
                        <Ionicons name={ 'play-forward' } size={ 30 } color={ colors.text } />
                    </BaseButton>

                    {/* <BaseButton
                        bgColor={ colors.primary }
                        disabledColor={ colors.card }
                        style={ {
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 15,
                            borderRadius: 16,
                            paddingVertical: 16,
                            alignItems: 'center'
                        } }
                        onPress={ handleEdit }
                    >
                        <Text style={ {
                            color: colors.text,
                            fontWeight: 'bold',
                            fontSize: 18
                        } }>
                            Edit
                        </Text>
                        <Ionicons name="pencil-outline" size={ 20 } color={ colors.text } />
                    </BaseButton> */}
                </View>
            </View>
        </BaseWrapper>
    );
}