import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import SettingsButton from '../components/SettingsButton';
import { InputOption } from '../types';

export default function Home() {
  const router = useRouter();

  const inputOptions: InputOption[] = [
    { 
      id: 'text', 
      title: 'Raw Text', 
      icon: '📝', 
      description: 'Type or paste text directly' 
    },
    { 
      id: 'file', 
      title: 'File Upload', 
      icon: '📄', 
      description: 'Upload a text document' 
    },
    { 
      id: 'image', 
      title: 'Image/Screenshot', 
      icon: '📸', 
      description: 'Extract text from an image' 
    },
  ];

  const handleOptionPress = (optionId: string) => {
    router.push({
      pathname: '/preview',
      params: { inputType: optionId }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0f0f1a]">
      <View className="flex-1 pt-8 px-6">
        <SettingsButton />
        
        <Text className="text-4xl font-bold text-slate-100 mb-2">
          WordRail
        </Text>
        <Text className="text-slate-400 mb-8 text-base">
          One-word focus reading
        </Text>

        <View className="gap-4">
          {inputOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              className="bg-[#1a1a2e] rounded-2xl p-6 active:bg-[#24243e]"
              onPress={() => handleOptionPress(option.id)}
            >
              <Text className="text-4xl mb-3">{option.icon}</Text>
              <Text className="text-xl font-semibold text-slate-100 mb-1">
                {option.title}
              </Text>
              <Text className="text-slate-400 text-sm">{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-8 bg-[#1a1a2e] rounded-2xl p-5">
          <Text className="text-sm font-semibold text-purple-300 mb-2">
            💡 About RSVP Reading
          </Text>
          <Text className="text-xs text-slate-400 leading-5">
            Rapid Serial Visual Presentation helps you read faster by displaying one word at a time, 
            reducing eye movement and increasing focus.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}