/**
 * 🎴 ESTILOS PARA SERVICE CARD
 * 
 * Estilos específicos para las tarjetas de servicios del sistema.
 * Diseño tipo Material Design con sombras y espaciado consistente.
 * 
 * @author Tu equipo de desarrollo ❤️
 */

import { StyleSheet } from 'react-native';

export const serviceCardStyles = StyleSheet.create({
  // 🎴 TARJETA PRINCIPAL
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Fondo blanco semitransparente
    borderRadius: 12, // Bordes redondeados modernos
    padding: 20,
    marginBottom: 16, // Espaciado entre tarjetas
    borderWidth: 1,
    borderColor: '#e2e8f0', // Borde sutil
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8, // Sombra para Android (Material Design)
  },

  // 🎨 CONTENEDOR DEL ICONO
  serviceIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12, // Separación del título
  },

  // 📝 TÍTULO DEL SERVICIO
  serviceTitle: {
    fontSize: 20,
    fontWeight: '600', // Semi-bold para jerarquía visual
    color: 'rgb(72,71,71)', // Gris corporativo
    textAlign: 'center',
    marginBottom: 8, // Separación de la descripción
  },

  // 📄 DESCRIPCIÓN DEL SERVICIO
  serviceDescription: {
    fontSize: 14,
    color: '#6b7280', // Gris medio para texto secundario
    textAlign: 'center',
    lineHeight: 20, // Interlineado para legibilidad
  },
});

/**
 * 💡 NOTAS DE DISEÑO:
 * 
 * 🎨 Colores:
 * - Fondo: rgba(255, 255, 255, 0.95) - Blanco semitransparente
 * - Borde: #e2e8f0 - Gris muy claro para definición sutil
 * - Título: rgb(72,71,71) - Gris corporativo
 * - Descripción: #6b7280 - Gris medio para jerarquía
 * 
 * 📐 Espaciado:
 * - Padding interno: 20px - Generoso para comodidad visual
 * - Margin bottom: 16px - Separación entre tarjetas
 * - Border radius: 12px - Modernidad sin exceso
 * - Line height: 20px - Legibilidad optimal
 * 
 * 🎯 Interacción:
 * - Shadow/Elevation para profundidad
 * - activeOpacity en TouchableOpacity para feedback
 * - Bordes redondeados para suavidad
 * 
 * 📱 Responsive:
 * - Diseño centrado para diferentes tamaños
 * - Padding y margin escalables
 * - Compatible con grids y listas
 */