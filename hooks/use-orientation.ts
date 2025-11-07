// Hook para detectar cambios de orientación
// Detecta si está en portrait (vertical) o landscape (horizontal)

import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export type OrientationType = 'portrait' | 'landscape';

export interface UseOrientationReturn {
  orientation: OrientationType;
  isPortrait: boolean;
  isLandscape: boolean;
  screenWidth: number;
  screenHeight: number;
}

/**
 * Hook personalizado para detectar la orientación de la pantalla
 * @returns Información sobre la orientación actual y dimensiones
 */
export function useOrientation(): UseOrientationReturn {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  // Determinar orientación basada en dimensiones
  const orientation: OrientationType = dimensions.width > dimensions.height ? 'landscape' : 'portrait';
  const isPortrait = orientation === 'portrait';
  const isLandscape = orientation === 'landscape';

  useEffect(() => {
    console.log('🔄 Hook de orientación iniciado');
    
    // Función que se ejecuta cuando cambian las dimensiones
    const handleDimensionsChange = ({ window }: { window: { width: number; height: number } }) => {
      console.log(`📱 Orientación cambió: ${window.width}x${window.height}`);
      setDimensions({ width: window.width, height: window.height });
    };

    // Suscribirse a cambios de dimensiones
    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);

    // Cleanup: remover listener cuando el componente se desmonte
    return () => {
      console.log('🧹 Limpiando listener de orientación');
      subscription?.remove();
    };
  }, []);

  return {
    orientation,
    isPortrait,
    isLandscape,
    screenWidth: dimensions.width,
    screenHeight: dimensions.height,
  };
}

/**
 * Hook simplificado que solo retorna si está en landscape
 * Útil para componentes que solo necesitan saber esto
 */
export function useIsLandscape(): boolean {
  const { isLandscape } = useOrientation();
  return isLandscape;
}

/**
 * Hook que retorna el factor de aspecto de la pantalla
 * Útil para cálculos más precisos de layout
 */
export function useAspectRatio(): number {
  const { screenWidth, screenHeight } = useOrientation();
  return screenWidth / screenHeight;
}