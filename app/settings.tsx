import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store';
import IconButton from '../components/buttons/IconButton';
import { useAppTheme } from '../components/ThemeProvider';

export interface SpeedPreset {
    label: string;
    value: number;
}

export default function Settings() {
    const router = useRouter();
    const { colors } = useAppTheme();
    const baseSpeed = useAppStore((state) => state.baseSpeed);
    const updateSpeed = useAppStore((state) => state.updateSpeed);

    const speedPresets: SpeedPreset[] = [
        { label: 'Very Slow', value: 500 },
        { label: 'Slow', value: 350 },
        { label: 'Medium', value: 250 },
        { label: 'Fast', value: 180 },
        { label: 'Very Fast', value: 120 },
    ];

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: colors.background } }>
            <ScrollView className="flex-1">
                <View className="p-6">
                    <View>
                        <IconButton
                            iconName="close"
                            onPress={ () => router.back() }
                            style={ {
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: 10
                            } }
                        />
                    </View>

                    <Text className="w-fit" style={ { fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 8 } }>Settings</Text>
                    <Text style={ { color: colors.textSecondary, marginBottom: 32 } }>
                        Customize your reading experience
                    </Text>

                    <Text style={ { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 } }>
                        Reading Speed (Base)
                    </Text>
                    <Text style={ { fontSize: 12, color: colors.textSecondary, marginBottom: 16 } }>
                        Current: { baseSpeed }ms per word ({ Math.round(60000 / baseSpeed) } WPM)
                    </Text>

                    <View className="gap-3 mb-6">
                        { speedPresets.map((preset) => (
                            <TouchableOpacity
                                key={ preset.value }
                                style={ {
                                    backgroundColor: baseSpeed === preset.value ? colors.primary : colors.card,
                                    borderRadius: 16,
                                    paddingVertical: 16,
                                    paddingHorizontal: 20
                                } }
                                onPress={ () => updateSpeed(preset.value) }
                            >
                                <View style={ { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } }>
                                    <Text style={ {
                                        fontWeight: '600',
                                        fontSize: 16,
                                        color: baseSpeed === preset.value ? colors.text : colors.text
                                    } }>
                                        { preset.label }
                                    </Text>
                                    <Text style={ {
                                        fontSize: 14,
                                        color: baseSpeed === preset.value ? colors.text : colors.textSecondary
                                    } }>
                                        { Math.round(60000 / preset.value) } WPM
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )) }
                    </View>

                    <View style={ { backgroundColor: colors.card, borderRadius: 16, padding: 20, marginBottom: 24 } }>
                        <Text style={ { fontSize: 12, fontWeight: '600', color: '#FFD60A', marginBottom: 8 } }>
                            ⚡ Speed Adjustments
                        </Text>
                        <Text style={ { fontSize: 12, color: colors.textSecondary, lineHeight: 20 } }>
                            Longer words automatically display for more time. The base speed affects
                            short words, while long words get proportionally more time.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}