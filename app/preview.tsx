import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SettingsButton from '../components/SettingsButton';
import { useAppStore } from '../store';
import { processText } from '../utils/textProcessor';

export default function Preview() {
  const router = useRouter();
  const { inputType } = useLocalSearchParams<{ inputType: string }>();
  const [localText, setLocalText] = useState('');
  
  const setText = useAppStore((state) => state.setText);
  const setWords = useAppStore((state) => state.setWords);
  const resetReading = useAppStore((state) => state.resetReading);

  const handleStartReading = () => {
    const trimmedText = localText.trim();
    
    if (!trimmedText) {
      Alert.alert('No Text', 'Please enter some text to read.');
      return;
    }

    const words = processText(trimmedText);
    
    if (words.length === 0) {
      Alert.alert('No Words', 'No valid words found in the text.');
      return;
    }

    setText(trimmedText);
    setWords(words);
    resetReading();
    router.push('/reader');
  };

  const getPlaceholder = () => {
    switch (inputType) {
      case 'file':
        return 'File content will appear here...';
      case 'image':
        return 'Extracted text will appear here...';
      default:
        return 'Paste or type your text here...';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0f0f1a]">
      <ScrollView className="flex-1">
        <View className="pt-8 px-6">
          <SettingsButton />
          
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-purple-400 font-semibold mb-4">← Back</Text>
          </TouchableOpacity>

          <Text className="text-3xl font-bold text-slate-100 mb-2">
            Preview & Edit
          </Text>
          <Text className="text-slate-400 mb-6">
            Review and adjust your text before reading
          </Text>

          {inputType !== 'text' && (
            <View className="mb-4 bg-[#2a2a1e] rounded-2xl p-4">
              <Text className="text-sm text-yellow-300">
                📌 {inputType === 'file' ? 'File upload' : 'Image OCR'} coming soon! 
                For now, please paste your text manually.
              </Text>
            </View>
          )}

          <Text className="text-sm font-semibold text-slate-300 mb-2">
            Your Text
          </Text>
          <TextInput
            className="bg-[#1a1a2e] rounded-2xl p-4 min-h-64 text-base text-slate-100"
            multiline
            placeholder={getPlaceholder()}
            placeholderTextColor="#64748b"
            value={localText}
            onChangeText={setLocalText}
            textAlignVertical="top"
          />

          <View className="mt-4 mb-4 bg-[#1a1a2e] rounded-2xl p-3">
            <Text className="text-sm text-slate-400">
              Word count: <Text className="text-purple-300 font-semibold">{processText(localText).length}</Text>
            </Text>
          </View>

          <TouchableOpacity
            className={`rounded-2xl py-4 items-center mb-6 ${
              localText.trim() ? 'bg-purple-500' : 'bg-[#2a2a3e]'
            }`}
            onPress={handleStartReading}
            disabled={localText.trim().length === 0}
          >
            <Text className={`font-bold text-lg ${
              localText.trim() ? 'text-white' : 'text-slate-600'
            }`}>
              Start Reading →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}