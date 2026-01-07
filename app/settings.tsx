import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
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
    <SafeAreaView className="flex-1 bg-[#0f0f1a]">
      <ScrollView className="flex-1">
        <View className="pt-8 px-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-purple-400 font-semibold mb-6">✕ Close</Text>
          </TouchableOpacity>

          <Text className="text-3xl font-bold text-slate-100 mb-2">Settings</Text>
          <Text className="text-slate-400 mb-8">
            Customize your reading experience
          </Text>

          <Text className="text-sm font-semibold text-slate-300 mb-2">
            Reading Speed (Base)
          </Text>
          <Text className="text-xs text-slate-500 mb-4">
            Current: {baseSpeed}ms per word ({Math.round(60000 / baseSpeed)} WPM)
          </Text>
          
          <View className="gap-3 mb-6">
            {speedPresets.map((preset) => (
              <TouchableOpacity
                key={preset.value}
                className={`rounded-2xl py-4 px-5 ${
                  baseSpeed === preset.value
                    ? 'bg-purple-500'
                    : 'bg-[#1a1a2e]'
                }`}
                onPress={() => updateSpeed(preset.value)}
              >
                <View className="flex-row justify-between items-center">
                  <Text
                    className={`font-semibold text-base ${
                      baseSpeed === preset.value ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {preset.label}
                  </Text>
                  <Text
                    className={`text-sm ${
                      baseSpeed === preset.value ? 'text-purple-100' : 'text-slate-500'
                    }`}
                  >
                    {Math.round(60000 / preset.value)} WPM
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="bg-[#2a2a1e] rounded-2xl p-5 mb-6">
            <Text className="text-xs font-semibold text-yellow-300 mb-2">
              ⚡ Speed Adjustments
            </Text>
            <Text className="text-xs text-slate-400 leading-5">
              Longer words automatically display for more time. The base speed affects 
              short words most, while long words get proportionally more time.
            </Text>
          </View>

          <View className="bg-[#1a1a2e] rounded-2xl p-5">
            <Text className="text-xs font-semibold text-purple-300 mb-3">
              💡 Reading Tips
            </Text>
            <Text className="text-xs text-slate-400 leading-5 mb-2">
              • Start with a slower speed and gradually increase
            </Text>
            <Text className="text-xs text-slate-400 leading-5 mb-2">
              • Focus on the pink letter (ORP) in each word
            </Text>
            <Text className="text-xs text-slate-400 leading-5">
              • Take breaks every 15-20 minutes
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}