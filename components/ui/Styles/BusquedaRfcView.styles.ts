/**
 * ESTILOS PARA BUSQUEDA RFC VIEW
 * 
 * Archivo separado que contiene todos los estilos para el componente BusquedaRfcView.
 * Esta separación mejora la organización del código y facilita el mantenimiento.
 * 
 * Estructura de estilos:
 * - Estilos del contenedor y header
 * - Estilos del formulario de búsqueda
 * - Estilos de inputs y botones
 * -  Estilos de resultados y tarjetas
 * - Estilos de tabla para información detallada
 * - Estilos de estados (loading, empty, error)
 *
 * Patrones de diseño utilizados:
 * - Colores consistentes con el tema corporativo
 * - Spacing uniforme (8px, 12px, 16px, 20px)
 * - Sombras sutiles para profundidad
 * - Tipografía jerárquica clara
 */

import { StyleSheet } from 'react-native';

export const busquedaRfcStyles = StyleSheet.create({
  // CONTENEDOR PRINCIPAL
  busquedaContainer: {
    flex: 1,
    padding: 12, // Reducido de 20 para aprovechar más espacio en móvil
  },

  // 📋 HEADER DE LA BÚSQUEDA
  busquedaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  busquedaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(95,27,45)', // Color corporativo principal
    marginLeft: 12,
  },

  // FORMULARIO DE BÚSQUEDA
  busquedaForm: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para Android
  },

  // INPUTS Y ETIQUETAS
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(72,71,71)', // Color de texto secundario
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  inputIconContainer: {
    paddingLeft: 12,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
    fontSize: 16,
    color: '#1f2937',
  },

  // MENSAJES DE ERROR
  errorText: {
    fontSize: 12,
    color: '#ef4444', // Rojo para errores
    marginTop: 5,
    fontStyle: 'italic',
  },

  // BOTÓN DE BÚSQUEDA
  buscarButton: {
    backgroundColor: 'rgb(95,27,45)', // Color corporativo
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Para Android
  },
  buscarButtonDisabled: {
    opacity: 0.6, // Estado deshabilitado
  },
  buscarButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // ESTADO DE CARGA
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

  // CONTENEDOR DE RESULTADOS
  resultadosContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20, // Espacio extra al final para mejor UX
  },
  resultadosTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgb(95,27,45)', // Color corporativo
    marginBottom: 15,
  },

  // TARJETA DE RESULTADO CON SOMBRAS MEJORADAS
  resultadoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16, // Bordes más redondeados para elegancia
    padding: 20,
    marginBottom: 20, // Más espacio entre tarjetas
    borderWidth: 1,
    borderColor: '#e5e7eb', // Borde muy sutil
    // SOMBRAS PROFESIONALES MEJORADAS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4, // Sombra más prominente
    },
    shadowOpacity: 0.08, // Más sutil pero visible
    shadowRadius: 12, // Más difusa y elegante
    elevation: 6, // Para Android - más elevación
  },

  // 📋 HEADER DEL RESULTADO
  resultadoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultadoRfc: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(95,27,45)', // Color corporativo
  },

  // BADGES DE ESTADO
  estadoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoActivo: {
    backgroundColor: '#dcfce7', // Verde claro para activo
  },
  estadoInactivo: {
    backgroundColor: '#fee2e2', // Rojo claro para inactivo
  },
  estadoText: {
    fontSize: 12,
    fontWeight: '600',
    // El color se define dinámicamente en el componente
  },
  estadoInactivoText: {
    color: '#dc2626', // Rojo para texto de estado inactivo
  },

  // INFORMACIÓN DEL RESULTADO
  resultadoNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151', // Gris oscuro
    marginBottom: 5,
  },
  resultadoComercial: {
    fontSize: 14,
    color: '#6b7280', // Gris medio
    marginBottom: 15,
    fontStyle: 'italic',
  },

  // DETALLES DEL RESULTADO
  resultadoDetalles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6', // Borde muy sutil
  },
  detalleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(95,27,45)', // Color corporativo
  },
  detalleValue: {
    fontSize: 14,
    color: '#374151', // Gris oscuro
  },

  // MENSAJE TÉCNICO
  mensajeTecnico: {
    fontSize: 12,
    color: '#6b7280', // Gris medio
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8fafc', // Fondo gris muy claro
    borderRadius: 6,
    fontStyle: 'italic',
  },

  // Estilo de resultado de consulta RFC - ESTADO VACÍO
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold', // Texto en negrita
    color: '#5F1B2D', // Rojo oscuro para mejor contraste
    textAlign: 'center',
    lineHeight: 24,
    backgroundColor: '#ffffff', // Fondo blanco
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16, // Bordes redondeados
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },

  // ESTILOS DE TABLA PARA RESULTADOS CON MEJORAS PROFESIONALES
  tablaContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#d1d5db', // Borde gris claro
    borderRadius: 12, // Bordes más redondeados
    backgroundColor: '#ffffff',
    // SOMBRA SUTIL PARA LA TABLA
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05, // Muy sutil
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden', // Para que los bordes redondeados funcionen bien
  },
  
  // FILAS DE LA TABLA CON COLORES ALTERNADOS
  tablaFila: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#ffffff', // Fila blanca (par)
  },
  tablaFilaAlterna: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#3CB35062',
    backgroundColor: '#6798C9AD', // Fila gris claro (impar)
  },
  tablaFilaCompleta: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    paddingVertical: 10, // Más espacio vertical
    paddingHorizontal: 12,
    backgroundColor: '#ffffff', // Fila blanca
  },
  tablaFilaCompletaAlterna: {
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBEFF', // Fila de en medio
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#BEBEBEFF', 
  },
  tablaFilaQuadruple: {
    flexDirection: 'row',
    borderBottomWidth: 0, // Última fila sin borde inferior
    backgroundColor: '#ffffff', // Fila blanca
  },
  tablaFilaQuadrupleAlterna: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    backgroundColor: '#ffffff', // Verde locochón más suave para variedad 
  },

  // COLUMNAS DE LA TABLA CON MEJORAS PROFESIONALES
  tablaColumna: {
    flex: 1,
    padding: 14, // Más padding para comodidad
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  tablaColumnaEstrecha: {
    flex: 1,
    padding: 10, // Padding más generoso
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },

  // HEADERS Y CELDAS CON TIPOGRAFÍA MEJORADA
  tablaHeader: {
    fontSize: 11, // Ligeramente más pequeño para elegancia
    fontWeight: '700', // Más bold para mejor contraste
    color: '#6b7280', // Gris medio para headers
    marginBottom: 6, // Más espacio
    textTransform: 'uppercase',
    letterSpacing: 0.5, // Espaciado de letras para elegancia
  },
  tablaCelda: {
    fontSize: 14,
    color: '#1f2937', // Gris más oscuro para mejor legibilidad
    lineHeight: 20, // Mejor interlineado
    fontWeight: '500', // Ligeramente más bold
  },

  // BOTÓN VER MÁS - ESQUINA INFERIOR DERECHA
  botonContainer: {
    alignItems: 'flex-end', // Alinea el botón a la derecha
    marginTop: 15,
    marginBottom: 5,
  },
  botonVerMas: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Fondo gris claro elegante
    paddingHorizontal: 22, // Más ancho (era 16)
    paddingVertical: 14, // Más alto (era 10)
    borderRadius: 26, // Bordes más redondos para compensar el tamaño
    borderWidth: 1.5, // Borde más prominente
    borderColor: '#17302D',
    shadowColor: '#17302D', // Sombra del color corporativo
    shadowOffset: {
      width: 0,
      height: 3, // Sombra más prominente
    },
    shadowOpacity: 0.15, // Sombra más visible
    shadowRadius: 6,
    elevation: 4, // Más elevación para Android
  },
  botonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonVerMasPressed: {
    backgroundColor: '#f0f1f2', // Fondo ligeramente más oscuro cuando se presiona
    borderColor: '#17302D', // Borde con el tono más claro del color corporativo
    shadowOpacity: 0.12, // Sombra un poco más prominente
    shadowRadius: 6,
    elevation: 4, // Más elevación en Android
  },
  botonVerMasText: {
    fontSize: 15, // Un poquito más grande (era 14)
    fontWeight: '700', // Más bold para destacar
    color: '#17302D', // Color corporativo
    marginRight: 8, // Más espacio con el ícono (era 6)
    letterSpacing: 0.4, // Más espaciado para elegancia
  },
  botonVerMasTextPressed: {
    color: '#C79B66', // Color más claro cuando está presionado
  },
  botonIcon: {
    marginLeft: 2,
  },
});

/**
 * NOTAS DE DESARROLLO:
 * 
 * Paleta de colores:
 * - Principal: rgb(95,27,45) - Vino corporativo
 * - Secundario: rgb(72,71,71) - Gris oscuro
 * - Texto: #374151, #6b7280, #9ca3af - Escala de grises
 * - Error: #ef4444, #dc2626 - Rojos para errores
 * - Éxito: #dcfce7, #059669 - Verdes para éxito
 *
 * Espaciado:
 * - Micro: 4px, 5px
 * - Pequeño: 8px, 10px, 12px
 * - Medio: 15px, 16px, 20px
 * - Grande: 24px, 40px
 *
 * Jerarquía tipográfica:
 * - Título principal: 24px, bold
 * - Título sección: 18px, semibold
 * - Texto normal: 16px, regular
 * - Texto pequeño: 14px, regular
 * - Texto auxiliar: 12px, regular
 *
 * Consideraciones responsive:
 * - Padding consistente de 20px en contenedores principales
 * - Bordes redondeados de 8px y 12px para suavidad
 * - Sombras sutiles para profundidad visual
 * - Elevation para compatibilidad con Android
 */