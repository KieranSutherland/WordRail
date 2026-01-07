import { View, Text, TextInput, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { useEffect, useRef, useState } from "react";
import { getORPIndex } from "../utils/orpCalculator";

const FONT_SIZE = 48;
const LINE_HEIGHT = 60;
const SIDE_WIDTH = 160;

export default function ReaderScreen() {
    const [ text, setText ] = useState("");
    const [ words, setWords ] = useState<string[]>([]);
    const [ index, setIndex ] = useState(0);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ wpm, setWpm ] = useState(300);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Split text into words
    useEffect(() => {
        const cleaned = text
            .replace(/\n+/g, " ")
            .trim()
            .split(/\s+/);
        setWords(cleaned);
        setIndex(0);
    }, [ text ]);

    // Playback loop 
    useEffect(() => {
        if (!isPlaying || words.length === 0) return;

        const word = words[ index ];
        if (!word) {
            setIsPlaying(false);
            return;
        }

        const baseMs = 60000 / wpm;
        const lengthPenalty = Math.max(0, word.length - 5) * 15;

        let punctuationBonus = 0;
        if (/[.,;:]/.test(word)) punctuationBonus = 120;
        if (/[!?]/.test(word)) punctuationBonus = 250;

        const delay = baseMs + lengthPenalty + punctuationBonus;

        timerRef.current = setTimeout(() => {
            setIndex((i) => i + 1);
        }, delay);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [ isPlaying, index, words, wpm ]);

    const currentWord = words[ index ] ?? "";

    const orpIndex = getORPIndex(currentWord);
    const before = currentWord.slice(0, orpIndex);
    const focus = currentWord[ orpIndex ];
    const after = currentWord.slice(orpIndex + 1);

    return (
        <View className="flex-1 bg-black px-6 py-10">

            {/* Text input */ }
            { !isPlaying && (
                <TextInput
                    multiline
                    placeholder="Paste text here…"
                    placeholderTextColor="#666"
                    value={ text }
                    onChangeText={ setText }
                    className="bg-neutral-900 text-white rounded-xl p-4 text-base mb-6"
                />
            ) }

            {/* Word display */ }
            <View className="flex-1 justify-center">
                <View className="flex-row items-center justify-center">

                    {/* Left */ }
                    <Text
                        numberOfLines={ 1 }
                        className="text-white text-right"
                        style={ {
                            width: SIDE_WIDTH,
                            fontSize: FONT_SIZE,
                            lineHeight: LINE_HEIGHT,
                            includeFontPadding: false,
                            paddingVertical: 4,
                            fontWeight: "600",
                        } }
                    >
                        { before }
                    </Text>

                    {/* ORP */ }
                    <Text
                        className="text-white mx-1"
                        style={ {
                            fontSize: FONT_SIZE,
                            lineHeight: LINE_HEIGHT,
                            includeFontPadding: false,
                            paddingVertical: 4,
                            fontWeight: "600",
                        } }
                    >
                        { focus }
                    </Text>

                    {/* Right */ }
                    <Text
                        numberOfLines={ 1 }
                        className="text-white text-left"
                        style={ {
                            width: SIDE_WIDTH,
                            fontSize: FONT_SIZE,
                            lineHeight: LINE_HEIGHT,
                            includeFontPadding: false,
                            paddingVertical: 4,
                            fontWeight: "600",
                        } }
                    >
                        { after }
                    </Text>

                </View>
            </View>



            {/* Controls */ }
            <View className="space-y-6">

                {/* Speed slider */ }
                <View>
                    <Text className="text-gray-400 text-sm mb-2">
                        Speed: { wpm } WPM
                    </Text>
                    {/* <Slider
                        minimumValue={ 150 }
                        maximumValue={ 500 }
                        value={ wpm }
                        step={ 20 }
                        onValueChange={ (v) => setWpm(Math.round(v)) }
                        minimumTrackTintColor="#ffffff"
                        maximumTrackTintColor="#333333"
                        thumbTintColor="#ffffff"
                    /> */}
                    <View className="flex-row space-x-2">
                        <Pressable
                            onPress={ () => {
                                setWpm(200)
                            } }
                            className="bg-neutral-800 px-6 py-4 rounded-2xl items-center"
                        >
                            <Text className="text-white text-lg">Slow</Text>
                        </Pressable>
                        <Pressable
                            onPress={ () => {
                                setWpm(300)
                            } }
                            className="bg-neutral-800 px-6 py-4 rounded-2xl items-center"
                        >
                            <Text className="text-white text-lg">Normal</Text>
                        </Pressable>
                        <Pressable
                            onPress={ () => {
                                setWpm(400)
                            } }
                            className="bg-neutral-800 px-6 py-4 rounded-2xl items-center"
                        >
                            <Text className="text-white text-lg">High</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Buttons */ }
                <View className="flex-row space-x-4">
                    <Pressable
                        onPress={ () => {
                            setIsPlaying(!isPlaying);
                        } }
                        className="flex-1 bg-white py-4 rounded-2xl items-center"
                    >
                        <Text className="text-black text-lg font-semibold">
                            { isPlaying ? "Pause" : "Play" }
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={ () => {
                            setIndex(0);
                            setIsPlaying(false);
                        } }
                        className="bg-neutral-800 px-6 py-4 rounded-2xl items-center"
                    >
                        <Text className="text-white text-lg">↺</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
