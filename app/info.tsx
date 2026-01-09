import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import IconButton from '../components/buttons/IconButton';
import { useAppTheme } from '../components/ThemeProvider';

export default function Info() {
    const router = useRouter();
    const { colors } = useAppTheme();

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

                    <Text className="w-fit" style={ { fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 8 } }>Information</Text>
                    <Text style={ { color: colors.textSecondary, marginBottom: 32 } }>
                        How does WordRail work?
                    </Text>

                    <View className="gap-6">
                        <View style={ { marginTop: 32, backgroundColor: colors.card, borderRadius: 16, padding: 20 } }>
                            <Text style={ { fontSize: 14, fontWeight: '600', color: colors.primary, marginBottom: 12 } }>
                                💡 How does it work?
                            </Text>
                            <Text style={ { fontSize: 12, color: colors.textSecondary, lineHeight: 20, marginBottom: 8 } }>
                                <Text style={ { fontWeight: '600' } }>Rapid Serial Visual Presentation (RSVP)</Text> helps you read faster by displaying one word at a time,
                                reducing eye movement and increasing focus.
                            </Text>
                            <Text style={ { fontSize: 12, color: colors.textSecondary, lineHeight: 20 } }>
                                <Text style={ { fontWeight: '600' } }>Optimal Recognition Point (ORP)</Text> helps you comprehend each word
                                faster by positioning the optimal letter in the center of the screen, further reducing cognitive load.
                            </Text>
                        </View>

                        <View style={ { backgroundColor: colors.card, borderRadius: 16, padding: 20 } }>
                            <Text style={ { fontSize: 14, fontWeight: '600', color: colors.primary, marginBottom: 12 } }>
                                💡 Reading Tips
                            </Text>
                            <Text style={ { fontSize: 12, color: colors.textSecondary, lineHeight: 20, marginBottom: 8 } }>
                                • Start with a slower speed and gradually increase
                            </Text>
                            <Text style={ { fontSize: 12, color: colors.textSecondary, lineHeight: 20, marginBottom: 8 } }>
                                • Focus on the center of the screen where words appear
                            </Text>
                            <Text style={ { fontSize: 12, color: colors.textSecondary, lineHeight: 20 } }>
                                • Take regular breaks
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}