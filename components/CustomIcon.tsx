import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

interface CustomIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ImageStyle>;
}

const iconMap = {
  'search': require('@/assets/icons/busqueda-icon.png'),
  // Agregar más íconos aquí según los necesites
};

export function CustomIcon({ name, size = 24, color, style }: CustomIconProps) {
  const iconSource = iconMap[name as keyof typeof iconMap];
  
  if (!iconSource) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <Image
      source={iconSource}
      style={[
        {
          width: size,
          height: size,
          tintColor: color,
        },
        style,
      ]}
      resizeMode="contain"
    />
  );
}