import { Ionicons } from "@expo/vector-icons";

export interface InputOption {
    id: 'text' | 'file' | 'image';
    title: string;
    iconName: React.ComponentProps<typeof Ionicons>[ 'name' ];
    description: string;
}

export interface SpeedPreset {
    label: string;
    value: number;
}