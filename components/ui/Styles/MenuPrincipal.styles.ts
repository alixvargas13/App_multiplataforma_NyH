/**
 * MenuPrincipal.styles.ts
 * 
 * 🎨 ESTILOS DEL MENÚ PRINCIPAL
 * 
 * Este archivo contiene todos los estilos del componente MenuPrincipal
 * separados para mejor organización y mantenimiento.
 * 
 * 📱 CATEGORÍAS DE ESTILOS:
 * - Fondo y contenedor principal
 * - Header y botón hamburguesa  
 * - Tarjetas de servicios
 * - Vistas de datos (nómina, hospedaje)
 * - Estados de carga y contenedores vacíos
 * - Responsive design para web y móvil
 * 
 * 💡 BENEFICIOS DE SEPARAR ESTILOS:
 * ✅ Mejor organización del código
 * ✅ Fácil mantenimiento
 * ✅ Reutilización en otros componentes
 * ✅ Archivo principal más limpio y legible
 */

import { StyleSheet } from 'react-native';

export const menuPrincipalStyles = StyleSheet.create({
  // 🎨 FONDO Y CONTENEDOR PRINCIPAL
  menuPrincipalBackgroundImage: {
    flex: 1,
  },
  menuPrincipalBackgroundImageWeb: {
    backgroundSize: '15% 15%',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center',
  },
  menuPrincipalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
  },

  // 📱 HEADER Y BOTÓN HAMBURGUESA
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(95,27,45)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  hamburgerButton: {
    padding: 8,
    marginRight: 16,
  },
  hamburgerLine: {
    width: 24,
    height: 3,
    backgroundColor: '#ffffff',
    marginVertical: 2,
    borderRadius: 2,
  },
  topBarTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  topBarSpacer: {
    width: 40,
  },

  // 📄 CONTENIDO PRINCIPAL
  mainContent: {
    flex: 1,
    padding: 20,
  },

  // 🏠 TARJETAS DE SERVICIOS
  servicesContainer: {
    flex: 1,
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 8,
  },
  serviceIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgb(72,71,71)',
    textAlign: 'center',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },

  // 💰🏨 VISTAS DE DATOS (NÓMINA Y HOSPEDAJE)
  dataContainer: {
    flex: 1,
    padding: 20,
  },
  dataHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dataTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(95,27,45)',
    marginLeft: 12,
  },
  dataContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(95,27,45)',
    marginTop: 15,
    marginBottom: 5,
  },
  dataValue: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
    lineHeight: 24,
  },
  dataValueSmall: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
    lineHeight: 20,
    fontStyle: 'italic',
  },

  // ⏳ ESTADOS DE CARGA Y CONTENEDORES VACÍOS
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 24,
  },
});