import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import SettingsButton from '../components/SettingsButton';
import { useAppStore } from '../store';
import { getORPIndex, getWordDelay } from '../utils/orpCalculator';

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
    }, [ isPlaying, currentIndex, words, baseSpeed ]);

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

        Alert.alert(
            'Exit Reader',
            'Do you want to exit? Your progress will be lost.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Exit',
                    onPress: () => {
                        resetAll();
                        router.back();
                    }
                }
            ]
        );
    };

    const renderWord = () => {
        if (words.length === 0 || currentIndex >= words.length) {
            return (
                <Text className="text-4xl text-slate-500 text-center">
                    { words.length > 0 ? '🎉 Finished!' : 'No text loaded' }
                </Text>
            );
        }

        const word = words[ currentIndex ];
        const orpIndex = getORPIndex(word);
        const letters = word.split('');

        // Split word into before and after ORP
        const beforeORP = letters.slice(0, orpIndex);
        const orpLetter = letters[ orpIndex ];
        const afterORP = letters.slice(orpIndex + 1);

        return (
            <View className="items-center justify-center">
                <View className="flex-row items-center">
                    {/* Left part - right aligned */ }
                    <View className="flex-row items-center justify-end w-36">
                        { beforeORP.map((char, index) => (
                            <Text
                                key={ `before-${index}-${char}` }
                                className="text-6xl font-bold text-slate-100"
                            >
                                { char }
                            </Text>
                        )) }
                    </View>

                    {/* ORP letter - centered */ }
                    <Text className="text-6xl font-bold text-slate-100">
                        { orpLetter }
                    </Text>

                    {/* Right part - left aligned */ }
                    <View className="flex-row items-center justify-start w-36">
                        { afterORP.map((char, index) => (
                            <Text
                                key={ `after-${index}-${char}` }
                                className="text-6xl font-bold text-slate-100"
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
        ? Math.min((currentIndex / words.length) * 100, 100)
        : 0;

    return (
        <SafeAreaView className="flex-1 bg-[#0f0f1a]">
            <View className="flex-1 pt-8 px-6">
                <SettingsButton />

                <TouchableOpacity onPress={ handleExit } className="mb-4">
                    <Text className="text-purple-400 font-semibold">← Exit</Text>
                </TouchableOpacity>

                <View className="mb-6">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-sm font-semibold text-slate-300">
                            { currentIndex + 1 } / { words.length }
                        </Text>
                        <Text className="text-sm text-slate-400">
                            { Math.round(60000 / baseSpeed) } WPM
                        </Text>
                    </View>
                    <View className="h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                        <View
                            className="h-full bg-purple-500 rounded-full"
                            style={ { width: `${progress}%` as any } }
                        />
                    </View>
                </View>

                <View className="flex-1 bg-[#1a1a2e] rounded-3xl p-8 mb-6 items-center justify-center">
                    { renderWord() }
                </View>

                <View className="flex-row gap-3 mb-4">
                    <TouchableOpacity
                        className={ `flex-1 rounded-2xl py-4 items-center ${isPlaying ? 'bg-yellow-400' : 'bg-purple-500'
                            }` }
                        onPress={ handlePlayPause }
                        disabled={ words.length === 0 }
                    >
                        <Text className="text-slate-900 font-bold text-lg">
                            { isPlaying ? '⏸ Pause' : currentIndex > 0 ? '▶️ Resume' : '▶️ Start' }
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="flex-1 bg-[#2a2a3e] rounded-2xl py-4 items-center"
                        onPress={ handleReset }
                        disabled={ words.length === 0 || currentIndex === 0 }
                    >
                        <Text className={ `font-bold text-lg ${words.length === 0 || currentIndex === 0 ? 'text-slate-600' : 'text-slate-300'
                            }` }>
                            ↺ Reset
                        </Text>
                    </TouchableOpacity>
                </View>

                { currentIndex >= words.length && words.length > 0 && (
                    <TouchableOpacity
                        className="bg-green-400 rounded-2xl py-4 items-center mb-4"
                        onPress={ () => {
                            resetAll();
                            router.push('/');
                        } }
                    >
                        <Text className="text-slate-900 font-bold text-lg">
                            ✓ Done - Read Another
                        </Text>
                    </TouchableOpacity>
                ) }

                <View className="bg-[#1a1a2e] rounded-2xl p-4">
                    <Text className="text-xs text-slate-400 leading-5">
                        Words are centered at their <Text className="font-semibold text-purple-300">Optimal Recognition Point (ORP)</Text> to
                        keep your eyes in one place for faster reading
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}