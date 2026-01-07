import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingsButton() {
  const router = useRouter();
  
  return (
    <TouchableOpacity
      className="absolute top-2 right-6 z-10 w-10 h-10 items-center justify-center"
      onPress={() => router.push('/settings')}
    >
      <Text className="text-2xl">⚙️</Text>
    </TouchableOpacity>
  );
}