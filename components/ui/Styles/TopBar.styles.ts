/**
 * ESTILOS PARA TOP BAR
 * 
 * Estilos específicos para la barra superior del sistema.
 * Diseño consistente con el branding corporativo.
 * 
 */

import { StyleSheet } from 'react-native';

export const topBarStyles = StyleSheet.create({
  // CONTENEDOR PRINCIPAL DE LA BARRA
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(95,27,45)', // Color corporativo oficial
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  // BOTÓN HAMBURGUESA
  hamburgerButton: {
    padding: 8,
    marginRight: 16,
  },
  hamburgerLine: {
    width: 24,
    height: 3,
    backgroundColor: '#ffffff',
    marginVertical: 2,
    borderRadius: 2, // Bordes redondeados para suavidad
  },

  // TÍTULO PRINCIPAL
  topBarTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600', // Semi-bold para legibilidad
    color: '#ffffff',
    textAlign: 'center', // Centrado gracias al spacer
  },

  //  ESPACIADOR PARA BALANCE VISUAL
  topBarSpacer: {
    width: 40, // Mismo ancho que hamburgerButton + margin
  },
});

/**
 * NOTAS DE DISEÑO:
 * 
 * 🎨Colores:
 * - Fondo: rgb(95,27,45) - Vino corporativo oficial
 * - Texto: #ffffff - Blanco para contraste máximo
 * - Líneas hamburguesa: #ffffff - Consistente con texto
 * 
 * Dimensiones:
 * - Padding horizontal: 16px - Zona de toque cómoda
 * - Padding vertical: 12px - Altura optimal para mobile
 * - Líneas hamburguesa: 24x3px - Tamaño estándar
 * - Espaciador: 40px - Balance visual perfecto
 * 
 * Interacción:
 * - Elevation/Shadow para profundidad visual
 * - Padding generoso en botón para facilidad de toque
 * - Título centrado para simetría
 * 
 *  Responsividad:
 * - FlexDirection row para distribución horizontal
 * - Flex: 1 en título para ocupar espacio disponible
 * - Compatible con diferentes tamaños de pantalla
 */