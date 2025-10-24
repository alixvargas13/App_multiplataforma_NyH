/**
 * 📊 DATA VIEW COMPONENT
 * 
 * Componente atómico para mostrar datos estructurados del sistema.
 * Reutilizable para nómina, hospedaje y otros tipos de información.
 * 
 * 🎨 Características:
 * - Header con icono y título personalizable
 * - Estados de carga, datos y vacío
 * - Diseño consistente para diferentes tipos de datos
 * - Estilo corporativo unificado
 * 
 * @author Tu equipo de desarrollo ❤️
 */

import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { Text, View } from 'react-native';
import { dataViewStyles as styles } from './Styles/DataView.styles';

interface DataViewProps {
  icon: any;                                  // 🎨 Icono del header
  title: string;                              // 📝 Título del tipo de datos
  data: any;                                  // 📊 Datos a mostrar
  loading: boolean;                           // ⏳ Estado de carga
  loadingText: string;                        // 📝 Texto durante la carga
  emptyText: string;                          // 📝 Texto cuando no hay datos
}

export function InfoView({ 
  icon, 
  title, 
  data, 
  loading, 
  loadingText, 
  emptyText 
}: DataViewProps) {
  return (
    <View style={styles.dataContainer}>
      {/* 📋 HEADER CON ICONO Y TÍTULO */}
      <View style={styles.dataHeader}>
        <IconSymbol size={32} name={icon} color="rgb(95,27,45)" />
        <Text style={styles.dataTitle}>{title}</Text>
      </View>
      
      {/* ⏳ ESTADO DE CARGA */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
      ) : data ? (
        /* 📊 CONTENIDO CON DATOS */
        <View style={styles.dataContent}>
          <Text style={styles.dataLabel}>Estado:</Text>
          <Text style={styles.dataValue}>
            {data.mensajeCiudadano || 'Datos cargados correctamente'}
          </Text>
          
          <Text style={styles.dataLabel}>Información técnica:</Text>
          <Text style={styles.dataValueSmall}>
            {data.mensajeTecnico || 'Sin información adicional'}
          </Text>
        </View>
      ) : (
        /* 📭 ESTADO VACÍO */
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
      )}
    </View>
  );
}

/**
 * 💡 NOTAS DE USO:
 * 
 * 🔧 Implementación para nómina:
 * ```tsx
 * <DataView 
 *   icon="dollarsign.circle.fill"
 *   title="Datos de Nómina"
 *   data={nominaData}
 *   loading={loadingData}
 *   loadingText="Cargando datos de nómina..."
 *   emptyText="No hay datos de nómina disponibles"
 * />
 * ```
 * 
 * 🔧 Implementación para hospedaje:
 * ```tsx
 * <DataView 
 *   icon="building.2.fill"
 *   title="Datos de Hospedaje"
 *   data={hospedajeData}
 *   loading={loadingData}
 *   loadingText="Cargando datos de hospedaje..."
 *   emptyText="No hay datos de hospedaje disponibles"
 * />
 * ```
 * 
 * ♻️ Ventajas:
 * - Un solo componente para múltiples tipos de datos
 * - Estados bien definidos (loading, data, empty)
 * - Fácil personalización de textos e iconos
 * - Diseño consistente en toda la app
 */