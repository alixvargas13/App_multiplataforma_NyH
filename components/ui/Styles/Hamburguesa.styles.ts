/**
 * ESTILOS PARA COMPONENTE HAMBURGUESA
 * 
 * Archivo separado que contiene todos los estilos para el menú lateral (hamburguesa).
 * Esta separación mejora la organización del código y facilita el mantenimiento.
 * 
 * Estructura de estilos:
 * - Overlay y fondo del menú lateral
 * - Header del usuario y avatar
 * - Opciones y elementos del menú
 * - Estados activos e inactivos
 * - Botones de navegación
 * - Imagen personalizada de búsqueda
 *
 * Características de diseño:
 * - Diseño deslizante desde la derecha
 * - Overlay semitransparente de fondo
 * - Header corporativo con información del usuario
 * - Iconografía consistente con SF Symbols
 * - Estados visuales claros para navegación
 * 
 */

import { StyleSheet } from 'react-native';

export const hamburguesaStyles = StyleSheet.create({
  // OVERLAY Y CONTENEDOR PRINCIPAL
  sideMenuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, // Asegura que esté por encima de todo
    flexDirection: 'row-reverse', // Menú desde la derecha
  },
  sideMenuBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Overlay semitransparente
  },

  // CONTENEDOR DEL MENÚ LATERAL
  sideMenu: {
    width: 280, // Ancho fijo del menú
    backgroundColor: '#FFFDED',
    elevation: 8, // Sombra para Android
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.3)', // Sombra para web
  },

  // HEADER DEL USUARIO
  userHeader: {
    backgroundColor: 'rgb(95,27,45)', // Color corporativo principal
    paddingTop: 40, // Espacio para status bar
    paddingBottom: 20,
    paddingHorizontal: 16,
    position: 'relative', // Para posicionar el botón de regreso
  },

  // BOTÓN DE REGRESO
  backButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    padding: 8,
    zIndex: 1, // Por encima del header
  },
  backButtonText: {
    fontSize: 32,
    color: '#FFFDED',
    fontWeight: '300', // Flecha delgada y elegante
  },

  // INFORMACIÓN DEL USUARIO
  userInfo: {
    alignItems: 'center',
    marginTop: 20, // Espacio para el botón de regreso
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30, // Círculo perfecto
    backgroundColor: '#FFFDED',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(95,27,45)', // Color corporativo en avatar
  },
  userName: {
    fontSize: 18,
    fontWeight: '600', // Semi-bold para el nombre
    color: '#FFFDED',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)', // Blanco semitransparente
  },

  // OPCIONES DEL MENÚ
  menuOptions: {
    paddingTop: 20, // Separación del header
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Separador sutil
  },

  // ESTADO ACTIVO DEL MENÚ
  menuItemActive: {
    backgroundColor: '#f8f9fa', // Fondo claro para item activo
    borderRightWidth: 4, // Indicador visual lateral
    borderRightColor: 'rgb(95,27,45)', // Color corporativo
  },

  // TEXTO DE LOS ITEMS DEL MENÚ
  menuItemText: {
    fontSize: 16,
    color: '#333333', // Gris oscuro para texto normal
    marginLeft: 16, // Separación del icono
    fontWeight: '500', // Peso medio
  },
  menuItemTextActive: {
    color: 'rgb(95,27,45)', // Color corporativo para texto activo
    fontWeight: '600', // Más peso para texto activo
  },

  // IMAGEN PERSONALIZADA DE BÚSQUEDA
  searchIcon: {
    width: 24,
    height: 24,
  },
  searchIconActive: {
    width: 24,
    height: 24,
  },
});

/**
 * NOTAS DE DESARROLLO:
 * 
 * Paleta de colores:
 * - Principal: rgb(95,27,45) - Vino corporativo para elementos activos
 * - Blanco: #FFFDED - Fondo del menú y avatar
 * - Gris oscuro: #333333 - Texto normal de los items
 * - Gris claro: #f0f0f0, #f8f9fa - Separadores y fondos de estados
 * - Overlay: rgba(0,0,0,0.5) - Fondo semitransparente
 * 
 * Dimensiones y espaciado:
 * - Ancho del menú: 280px - Optimal para móvil
 * - Avatar: 60x60px - Tamaño estándar para fotos de perfil
 * - Padding items: 24px horizontal, 16px vertical - Zona de toque cómoda
 * - Z-index: 1000 - Asegura superposición correcta
 * 
 * Interacciones:
 * - Overlay táctil para cerrar menú
 * - Indicador visual de item activo (borde derecho + fondo)
 * - Transiciones suaves entre estados
 * - Iconografía SF Symbols consistente
 * 
 * Consideraciones de UX:
 * - Menú desliza desde la derecha (flexDirection: 'row-reverse')
 * - Header con información del usuario siempre visible
 * - Estados activos claramente diferenciados
 * - Zona de toque optimizada para dedos
 * - Sombras para dar sensación de profundidad
 * 
 * Compatibilidad:
 * - Elevation para Android (Material Design)
 * - Shadow properties para iOS (Human Interface Guidelines)
 * - Padding top dinámico para diferentes status bars
 * - Responsive design para diferentes tamaños de pantalla
 */