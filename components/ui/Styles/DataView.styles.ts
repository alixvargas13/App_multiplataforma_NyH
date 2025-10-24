/**
 * 📊 ESTILOS PARA DATA VIEW
 * 
 * Estilos específicos para la visualización de datos estructurados.
 * Diseño limpio y organizacional para diferentes tipos de información.
 * 
 * @author Tu equipo de desarrollo ❤️
 */

import { StyleSheet } from 'react-native';

export const dataViewStyles = StyleSheet.create({
  // 📊 CONTENEDOR PRINCIPAL DE DATOS
  dataContainer: {
    flex: 1,
    padding: 20,
  },

  // 📋 HEADER CON ICONO Y TÍTULO
  dataHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb', // Separador sutil
  },
  dataTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(95,27,45)', // Color corporativo
    marginLeft: 12, // Separación del icono
  },

  // ⏳ ESTADO DE CARGA
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280', // Gris medio
    textAlign: 'center',
  },

  // 📊 CONTENIDO CON DATOS
  dataContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },

  // 🏷️ ETIQUETAS DE DATOS
  dataLabel: {
    fontSize: 14,
    fontWeight: '600', // Semi-bold para jerarquía
    color: 'rgb(95,27,45)', // Color corporativo
    marginTop: 15,
    marginBottom: 5,
  },

  // 📝 VALORES DE DATOS
  dataValue: {
    fontSize: 16,
    color: '#374151', // Gris oscuro para contenido principal
    marginBottom: 10,
    lineHeight: 24, // Interlineado para legibilidad
  },
  dataValueSmall: {
    fontSize: 14,
    color: '#6b7280', // Gris medio para información secundaria
    marginBottom: 10,
    lineHeight: 20,
    fontStyle: 'italic', // Énfasis en información técnica
  },

  // 📭 ESTADO VACÍO
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af', // Gris claro para estado vacío
    textAlign: 'center',
    lineHeight: 24,
  },
});

/**
 * 💡 NOTAS DE DISEÑO:
 * 
 * 🎨 Jerarquía de colores:
 * - Títulos: rgb(95,27,45) - Color corporativo para títulos
 * - Etiquetas: rgb(95,27,45) - Misma jerarquía que títulos
 * - Contenido principal: #374151 - Gris oscuro para lectura
 * - Contenido secundario: #6b7280 - Gris medio para información auxiliar
 * - Estado vacío: #9ca3af - Gris claro para estados pasivos
 * 
 * 📐 Espaciado progresivo:
 * - Contenedor: 20px padding - Respiración general
 * - Header bottom: 15px - Separación clara de secciones
 * - Labels top: 15px - Agrupación visual de información
 * - Labels bottom: 5px - Proximidad con su valor
 * 
 * 🎯 Interacción visual:
 * - Border bottom en header para separación clara
 * - Shadow en dataContent para elevar información importante
 * - Line height optimizado para legibilidad
 * - Font style italic para información técnica
 * 
 * 📱 Estados responsivos:
 * - Flex containers para adaptabilidad
 * - Padding generoso para diferentes pantallas
 * - Centrado automático para estados loading/empty
 */