/**
 * 🏠 SERVICE GRID COMPONENT
 * 
 * Componente atómico para organizar las tarjetas de servicios en la vista de inicio.
 * Grid responsivo que muestra los servicios principales del sistema.
 * 
 * 🎨 Características:
 * - Grid responsivo para diferentes pantallas
 * - Organización clara de servicios disponibles
 * - Reutilización del componente ServiceCard
 * - Fácil agregación de nuevos servicios
 * 
 * @author Tu equipo de desarrollo ❤️
 */

import React from 'react';
import { View } from 'react-native';
import { ServiceCard } from './ServiceCard';
import { serviceGridStyles as styles } from './Styles/ServiceGrid.styles';

interface ServiceGridProps {
  onNominaPress: () => void;                  // 🎯 Función para abrir nómina
  onHospedajePress: () => void;               // 🎯 Función para abrir hospedaje
}

export function ServiceGrid({ onNominaPress, onHospedajePress }: ServiceGridProps) {
  return (
    <View style={styles.servicesContainer}>
      {/* 💰 TARJETA DE NÓMINA */}
      <ServiceCard 
        icon="dollarsign.circle.fill"
        title="Consultas de Nómina"
        description="Revisa tu información salarial, descuentos y bonificaciones"
        onPress={onNominaPress}
      />

      {/* 🏨 TARJETA DE HOSPEDAJE */}
      <ServiceCard 
        icon="building.2.fill"
        title="Servicios de Hospedaje"
        description="Encuentra y consulta información sobre alojamientos"
        onPress={onHospedajePress}
      />
    </View>
  );
}

/**
 * 💡 NOTAS DE USO:
 * 
 * 🔧 Implementación:
 * ```tsx
 * <ServiceGrid 
 *   onNominaPress={handleGetNomina}
 *   onHospedajePress={handleGetHospedaje}
 * />
 * ```
 * 
 * ➕ Agregar nuevos servicios:
 * Para agregar una nueva tarjeta, simplemente añade otro ServiceCard:
 * ```tsx
 * <ServiceCard 
 *   icon="person.fill"
 *   title="Gestión de Usuarios"
 *   description="Administra usuarios y permisos del sistema"
 *   onPress={onUsuariosPress}
 * />
 * ```
 * 
 * ♻️ Ventajas:
 * - Fácil mantenimiento y expansión
 * - Reutilización consistente de ServiceCard
 * - Organización clara en vista de inicio
 * - Grid responsive automático
 */