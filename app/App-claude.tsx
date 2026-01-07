import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function RSVPReader() {
  const [inputText, setInputText] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [baseSpeed, setBaseSpeed] = useState(250); // ms per word
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef(null);

  // Calculate ORP (Optimal Recognition Point)
  const getORPIndex = (word: string) => {
    const len = word.length;
    if (len === 1) return 0;
    if (len === 2) return 0;
    if (len === 3) return 1;
    if (len <= 5) return 1;
    if (len <= 9) return 2;
    if (len <= 13) return 3;
    return 4;
  };

  // Calculate delay based on word length
  const getWordDelay = (word: string) => {
    const len = word.length;
    if (len <= 3) return baseSpeed * 0.8;
    if (len <= 6) return baseSpeed;
    if (len <= 9) return baseSpeed * 1.3;
    if (len <= 12) return baseSpeed * 1.5;
    return baseSpeed * 1.8;
  };

  const startReading = () => {
    if (words.length === 0) {
      const wordArray = inputText
        .trim()
        .split(/\s+/)
        .filter(w => w.length > 0) as string[];
      setWords(wordArray);
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  };

  const pauseReading = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  const resetReading = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  const clearAll = () => {
    setInputText('');
    setWords([]);
    setCurrentIndex(0);
    setIsPlaying(false);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isPlaying && words.length > 0 && currentIndex < words.length) {
      const currentWord = words[currentIndex];
      const delay = getWordDelay(currentWord);
      
      intervalRef.current = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, delay) as any;
    } else if (currentIndex >= words.length && words.length > 0) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isPlaying, currentIndex, words, baseSpeed]);

  const renderWord = () => {
    if (words.length === 0 || currentIndex >= words.length) {
      return (
        <Text className="text-4xl text-gray-400">
          {words.length > 0 ? 'Finished!' : 'Enter text to begin'}
        </Text>
      );
    }

    const word = words[currentIndex];
    const orpIndex = getORPIndex(word);
    
    return (
      <View className="flex-row items-center justify-center">
        {word.split('').map((char, index) => (
          <Text
            key={index}
            className={`text-5xl font-bold ${
              index === orpIndex ? 'text-red-500' : 'text-gray-800'
            }`}
          >
            {char}
          </Text>
        ))}
      </View>
    );
  };

  const speedPresets = [
    { label: 'Very Slow', value: 500 },
    { label: 'Slow', value: 350 },
    { label: 'Medium', value: 250 },
    { label: 'Fast', value: 180 },
    { label: 'Very Fast', value: 120 },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 p-6 pt-16">
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          RSVP Speed Reader
        </Text>
        <Text className="text-sm text-gray-600 mb-6">
          Read faster with Optimal Recognition Point highlighting
        </Text>

        {words.length === 0 ? (
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Paste your text:
            </Text>
            <TextInput
              className="border-2 border-gray-300 rounded-lg p-4 min-h-32 text-base"
              multiline
              placeholder="Enter or paste the text you want to read..."
              value={inputText}
              onChangeText={setInputText}
              textAlignVertical="top"
            />
          </View>
        ) : (
          <View className="mb-6 bg-gray-50 rounded-lg p-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-semibold text-gray-700">
                Progress: {currentIndex + 1} / {words.length}
              </Text>
              <TouchableOpacity onPress={clearAll}>
                <Text className="text-sm text-blue-600 font-semibold">
                  New Text
                </Text>
              </TouchableOpacity>
            </View>
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View 
                className="h-full bg-blue-500"
                style={{ width: `${(currentIndex / words.length) * 100}%` }}
              />
            </View>
          </View>
        )}

        <View className="bg-gray-100 rounded-xl p-8 mb-6 min-h-48 items-center justify-center">
          {renderWord()}
        </View>

        <View className="flex-row gap-3 mb-6">
          {!isPlaying ? (
            <TouchableOpacity
              className="flex-1 bg-blue-600 rounded-lg py-4 items-center"
              onPress={startReading}
              disabled={inputText.trim().length === 0 && words.length === 0}
            >
              <Text className="text-white font-bold text-lg">
                {words.length > 0 && currentIndex > 0 ? 'Resume' : 'Start'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="flex-1 bg-yellow-500 rounded-lg py-4 items-center"
              onPress={pauseReading}
            >
              <Text className="text-white font-bold text-lg">Pause</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            className="flex-1 bg-gray-600 rounded-lg py-4 items-center"
            onPress={resetReading}
            disabled={words.length === 0}
          >
            <Text className="text-white font-bold text-lg">Reset</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-white border-2 border-gray-300 rounded-lg py-3 items-center mb-4"
          onPress={() => setShowSettings(!showSettings)}
        >
          <Text className="text-gray-700 font-semibold">
            {showSettings ? '▼' : '▶'} Speed Settings
          </Text>
        </TouchableOpacity>

        {showSettings && (
          <View className="bg-gray-50 rounded-lg p-4 mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-3">
              Reading Speed (base): {baseSpeed}ms per word
            </Text>
            <View className="gap-2">
              {speedPresets.map((preset) => (
                <TouchableOpacity
                  key={preset.value}
                  className={`rounded-lg py-3 px-4 ${
                    baseSpeed === preset.value
                      ? 'bg-blue-600'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                  onPress={() => setBaseSpeed(preset.value)}
                >
                  <Text
                    className={`font-semibold ${
                      baseSpeed === preset.value ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {preset.label} ({Math.round(60000 / preset.value)} WPM)
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text className="text-xs text-gray-500 mt-3">
              Note: Longer words automatically display for more time
            </Text>
          </View>
        )}

        <View className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <Text className="text-xs font-semibold text-blue-900 mb-1">
            💡 How it works:
          </Text>
          <Text className="text-xs text-blue-800">
            The red letter marks the Optimal Recognition Point (ORP), helping your eyes focus on the most important part of each word for faster recognition.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}