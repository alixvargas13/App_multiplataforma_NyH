/**
 * 🎴 SERVICE CARD COMPONENT
 * 
 * Componente atómico para las tarjetas de servicios del sistema.
 * Tarjeta reutilizable para mostrar diferentes servicios disponibles.
 * 
 * 🎨 Características:
 * - Diseño tipo Material Design con sombras
 * - Icono, título y descripción organizados
 * - Interacción táctil con feedback visual
 * - Estilo consistente con branding corporativo
 * 
 * @author Tu equipo de desarrollo ❤️
 */

import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { serviceCardStyles as styles } from './Styles/ServiceCard.styles';

interface ServiceCardProps {
  icon: any;                                  // 🎨 Nombre del icono (SF Symbols)
  title: string;                              // 📝 Título del servicio
  description: string;                        // 📄 Descripción del servicio
  onPress: () => void;                        // 🎯 Función a ejecutar al presionar
}

export function ServiceCard({ icon, title, description, onPress }: ServiceCardProps) {
  return (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={onPress}
      activeOpacity={0.7} // Feedback visual al presionar
    >
      {/* 🎨 CONTENEDOR DEL ICONO */}
      <View style={styles.serviceIconContainer}>
        <IconSymbol 
          size={48} 
          name={icon} 
          color="rgb(95,27,45)" // Color corporativo
        />
      </View>
      
      {/* 📝 TÍTULO DEL SERVICIO */}
      <Text style={styles.serviceTitle}>{title}</Text>
      
      {/* 📄 DESCRIPCIÓN DEL SERVICIO */}
      <Text style={styles.serviceDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

/**
 * 💡 NOTAS DE USO:
 * 
 * 🔧 Implementación:
 * ```tsx
 * <ServiceCard 
 *   icon="dollarsign.circle.fill"
 *   title="Consultas de Nómina"
 *   description="Revisa tu información salarial, descuentos y bonificaciones"
 *   onPress={() => handleGetNomina()}
 * />
 * ```
 * 
 * 🎨 Iconos disponibles:
 * - "dollarsign.circle.fill" - Para nómina
 * - "building.2.fill" - Para hospedaje
 * - "magnifyingglass" - Para búsquedas
 * - "person.fill" - Para usuarios
 * - Y muchos más de SF Symbols
 * 
 * ♻️ Reutilización:
 * - Perfecto para grids de servicios
 * - Fácil personalización de contenido
 * - Diseño responsive y adaptable
 * - Feedback táctil consistente
 */