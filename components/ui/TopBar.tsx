/**
 *  TOP BAR COMPONENT
 * 
 * Componente atómico para la barra superior del sistema.
 * Contiene el botón hamburguesa y el título principal.
 * 
 *  Características:
 * - Diseño consistente con branding corporativo
 * - Botón hamburguesa animado (3 líneas)
 * - Título centrado con espaciador
 * - Colores oficiales del Gobierno de Puebla
 * 
 */

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { topBarStyles as styles } from './Styles/TopBar.styles';

interface TopBarProps {
  title: string;                              // 📝 Título a mostrar en la barra
  onMenuPress: () => void;                   // 🍔 Función para abrir/cerrar menú
}

export function TopBar({ title, onMenuPress }: TopBarProps) {
  return (
    <View style={styles.topBar}>
      {/* 🍔 BOTÓN HAMBURGUESA */}
      <TouchableOpacity 
        style={styles.hamburgerButton}
        onPress={onMenuPress}
      >
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
      </TouchableOpacity>
      
      {/* 📝 TÍTULO PRINCIPAL */}
      <Text style={styles.topBarTitle}>{title}</Text>
      
      {/* ↔️ ESPACIADOR PARA CENTRAR EL TÍTULO */}
      <View style={styles.topBarSpacer} />
    </View>
  );
}

/**
 * 💡 NOTAS DE USO:
 * 
 * 🔧 Implementación:
 * ```tsx
 * <TopBar 
 *   title="Sistema de Consultas"
 *   onMenuPress={() => setMenuVisible(!menuVisible)}
 * />
 * ```
 * 
 * 🎨 Personalización:
 * - El título se puede cambiar dinámicamente
 * - Los estilos están en TopBar.styles.ts
 * - El botón mantiene el estado visual consistente
 * 
 * ♻️ Reutilización:
 * - Puede usarse en cualquier pantalla que necesite header
 * - Diseño responsive y adaptable
 * - Compatible con diferentes longitudes de título
 */