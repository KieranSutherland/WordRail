import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../components/ThemeProvider';
import RightSideTopBar from '../components/RightSideTopBar';
import HomeScreenButton, { InputOption } from '../components/HomeScreenButton';
import Divider from '../components/Divider';
import { useAppStore } from '../store';

export default function Home() {
    const { colors } = useAppTheme();
    const resetPreview = useAppStore((state) => state.resetPreview);

    const inputOptions: InputOption[] = [
        {
            id: 'text',
            title: 'Raw Text',
            iconName: 'text-outline',
            description: 'Type or paste text directly',
            pathname: '/preview',
            onPress: resetPreview
        },
        {
            id: 'file',
            title: 'File Upload',
            iconName: 'document-text-outline',
            description: 'Upload a text document (.txt, .pdf)',
            pathname: '/preview',
            onPress: resetPreview
        },
        {
            id: 'image',
            title: 'Image / Screenshot',
            iconName: 'image-outline',
            description: 'Extract text from an image',
            pathname: '/preview',
            onPress: resetPreview
        },
    ];

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: colors.background } }>
            <View className="flex-1 p-6">
                <View>
                    <RightSideTopBar />
                </View>

                <View className="w-fit mb-7">
                    <View style={ { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 } }>
                        <Text style={ { fontSize: 32, fontWeight: 'bold', color: colors.text } }>
                            Word
                        </Text>
                        <Text style={ { fontSize: 32, fontWeight: 'bold', color: colors.primary } }>
                            Rail
                        </Text>
                    </View>
                    <Text style={ { fontSize: 16, color: colors.textSecondary } }>
                        One-word focus reading
                    </Text>
                </View>

                <View className="gap-4">
                    {
                        inputOptions.map((option) => (
                            <HomeScreenButton key={ option.id } option={ option } />
                        ))
                    }
                </View>

                <Divider />

                <HomeScreenButton
                    option={ {
                        title: 'Recents',
                        description: 'Go back to your previous reads',
                        iconName: 'time-outline',
                        id: 'recents',
                        pathname: '/recents'
                    } }
                />
            </View>
        </SafeAreaView>
    );
}