import React from "react";
import { View, Text } from 'react-native';
import { useAppTheme } from '../components/ThemeProvider';
import TopBar from '../components/TopBar';
import { PreviousRead, useAppStore } from "../store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PageHeader from "../components/PageHeader";
import BaseWrapper from "../components/BaseWrapper";
import { BaseButton } from "../components/buttons/BaseButton";

interface RecentReadItemProps {
    previousRead: PreviousRead;
}

function RecentReadItem({ previousRead: previous }: RecentReadItemProps) {
    const router = useRouter();
    const { colors } = useAppTheme();
    const setPreviewText = useAppStore((state) => state.setPreviewText);
    const setWords = useAppStore((state) => state.setWords);
    const setCurrentIndex = useAppStore((state) => state.setCurrentIndex);

    const progress = Math.round((previous.currentIndex / previous.words.length) * 100);

    const onPress = () => {
        setPreviewText(previous.previewText);
        setWords(previous.words);
        setCurrentIndex(previous.currentIndex);
        router.push({
            pathname: '/preview',
            params: { inputType: 'text' }
        });
    }

    return (
        <BaseButton
            bgColor={ colors.card }
            style={ { borderRadius: 16, padding: 24, display: 'flex' } }
            onPress={ onPress }
        >
            <View className="flex-1 flex-row items-center">
                <View className="flex-col">
                    <Text style={ { fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: 4 } }>
                        { previous.words.slice(0, 5).join(' ') }...
                    </Text>
                    <Text style={ { fontSize: 14, color: colors.textSecondary } }>
                        Progress: { progress }%  |  { previous.date.toDateString() }
                    </Text>
                </View>
                <Ionicons className="ml-auto" name="arrow-forward" size={ 30 } color={ colors.text } />
            </View>
        </BaseButton>
    )
}

export default function Recents() {
    const { colors } = useAppTheme();
    const previousReads = useAppStore((state) => state.previousReads);

    return (
        <BaseWrapper>
            <View className="flex-1 p-6 gap-6">
                <TopBar disableRightSide />
                <PageHeader
                    title="Recents"
                    subtitle="Re-visit your previously read texts here"
                />
                <View className="flex-1 gap-4">
                    { previousReads.size === 0 ? (
                        <Text style={ { color: colors.text, marginTop: 20 } }>
                            No recent reads found.
                        </Text>
                    ) : (
                        Array.from(previousReads.values()).sort((read_1, read_2) => {
                            return read_2.date.getMilliseconds() - read_1.date.getMilliseconds()
                        }).map((read, index) => (
                            <RecentReadItem key={ index } previousRead={ read } />
                        ))
                    ) }
                </View>
            </View>
        </BaseWrapper>
    )
}