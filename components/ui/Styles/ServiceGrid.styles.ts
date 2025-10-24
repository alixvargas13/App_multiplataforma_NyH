/**
 * 🏠 ESTILOS PARA SERVICE GRID
 * 
 * Estilos específicos para el grid de servicios en la vista de inicio.
 * Organización responsiva y espaciado consistente.
 * 
 * @author Tu equipo de desarrollo ❤️
 */

import { StyleSheet } from 'react-native';

export const serviceGridStyles = StyleSheet.create({
  // 🏠 CONTENEDOR PRINCIPAL DE SERVICIOS
  servicesContainer: {
    flex: 1,
    // El espaciado entre elementos se maneja en ServiceCard
    // Este contenedor solo organiza el layout general
  },
});

/**
 * 💡 NOTAS DE DISEÑO:
 * 
 * 🎯 Simplicidad intencional:
 * - El contenedor es minimalista por diseño
 * - El espaciado se maneja individualmente en ServiceCard
 * - Flex: 1 permite que ocupe todo el espacio disponible
 * - Fácil expansión para agregar más tarjetas
 * 
 * 📱 Responsive:
 * - Se adapta automáticamente al contenido
 * - Compatible con scroll si hay muchos servicios
 * - Flexible para diferentes orientaciones
 * 
 * ♻️ Extensibilidad:
 * - Fácil agregar propiedades de layout futuras
 * - Compatible con diferentes tipos de grids
 * - Mantenible y escalable
 */