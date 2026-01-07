import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { colours } from '../theme/colours';
import { useAppStore } from '../store';
import { SpeedPreset } from '../types';

export default function Settings() {
    const router = useRouter();
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
        <SafeAreaView style={ { flex: 1, backgroundColor: colours.background } }>
            <ScrollView className="flex-1">
                <View className="pt-8 px-6">
                    <TouchableOpacity onPress={ () => router.back() }>
                        <Text style={ { color: colours.accent, fontWeight: '600', marginBottom: 24 } }>✕ Close</Text>
                    </TouchableOpacity>

                    <Text style={ { fontSize: 28, fontWeight: 'bold', color: colours.textPrimary, marginBottom: 8 } }>Settings</Text>
                    <Text style={ { color: colours.textSecondary, marginBottom: 32 } }>
                        Customize your reading experience
                    </Text>

                    <Text style={ { fontSize: 14, fontWeight: '600', color: colours.textPrimary, marginBottom: 8 } }>
                        Reading Speed (Base)
                    </Text>
                    <Text style={ { fontSize: 12, color: colours.textSecondary, marginBottom: 16 } }>
                        Current: { baseSpeed }ms per word ({ Math.round(60000 / baseSpeed) } WPM)
                    </Text>

                    <View className="gap-3 mb-6">
                        { speedPresets.map((preset) => (
                            <TouchableOpacity
                                key={ preset.value }
                                style={ {
                                    backgroundColor: baseSpeed === preset.value ? colours.accent : colours.surface,
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
                                        color: baseSpeed === preset.value ? colours.textPrimary : colours.textPrimary
                                    } }>
                                        { preset.label }
                                    </Text>
                                    <Text style={ {
                                        fontSize: 14,
                                        color: baseSpeed === preset.value ? colours.textPrimary : colours.textSecondary
                                    } }>
                                        { Math.round(60000 / preset.value) } WPM
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )) }
                    </View>

                    <View style={ { backgroundColor: colours.surface, borderRadius: 16, padding: 20, marginBottom: 24 } }>
                        <Text style={ { fontSize: 12, fontWeight: '600', color: '#FFD60A', marginBottom: 8 } }>
                            ⚡ Speed Adjustments
                        </Text>
                        <Text style={ { fontSize: 12, color: colours.textSecondary, lineHeight: 20 } }>
                            Longer words automatically display for more time. The base speed affects
                            short words most, while long words get proportionally more time.
                        </Text>
                    </View>

                    <View style={ { backgroundColor: colours.surface, borderRadius: 16, padding: 20 } }>
                        <Text style={ { fontSize: 12, fontWeight: '600', color: colours.accent, marginBottom: 12 } }>
                            💡 Reading Tips
                        </Text>
                        <Text style={ { fontSize: 12, color: colours.textSecondary, lineHeight: 20, marginBottom: 8 } }>
                            • Start with a slower speed and gradually increase
                        </Text>
                        <Text style={ { fontSize: 12, color: colours.textSecondary, lineHeight: 20, marginBottom: 8 } }>
                            • Focus on the center of the screen where words appear
                        </Text>
                        <Text style={ { fontSize: 12, color: colours.textSecondary, lineHeight: 20 } }>
                            • Take breaks every 15-20 minutes
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}