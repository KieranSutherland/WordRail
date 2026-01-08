import { useAppStore } from "../store";
import { View, Text } from 'react-native';
import { getORPIndex } from "../utils/orpCalculator";
import { useAppTheme } from "./ThemeProvider";

export default function CurrentWord() {
    const words = useAppStore((state) => state.words);
    const currentIndex = useAppStore((state) => state.currentIndex);
    const { colors } = useAppTheme();

    if (words.length === 0 || currentIndex >= words.length) {
        return (
            <Text style={ { fontSize: 32, color: colors.textSecondary, textAlign: 'center' } }>
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
                            style={ { fontSize: 56, fontWeight: 'bold', color: colors.text } }
                        >
                            { char }
                        </Text>
                    )) }
                </View>

                <Text style={ { fontSize: 56, fontWeight: 'bold', color: colors.text } }>
                    { orpLetter }
                </Text>

                <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: 144 } }>
                    { afterORP.map((char, index) => (
                        <Text
                            key={ `after-${index}-${char}` }
                            style={ { fontSize: 56, fontWeight: 'bold', color: colors.text } }
                        >
                            { char }
                        </Text>
                    )) }
                </View>
            </View>
        </View>
    );
}