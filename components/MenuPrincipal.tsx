/**
 * MenuPrincipal.tsx
 * 
 * COMPONENTE PRINCIPAL DEL SISTEMA 
 * 
 * Este es el corazón de la aplicación después del login. Se encarga de:
 * 
 *  Mostrar el panel principal con fondo de textura Tláloc
 * Manejar la navegación entre diferentes secciones (Inicio, Nómina, Hospedaje, Búsqueda)
 * Integrar el menú hamburguesa lateral (Hamburguesa.tsx)
 * Mostrar las diferentes vistas según la selección del usuario
 * Coordinar la comunicación entre componentes
 * 
 * 📱 VISTAS QUE MANEJA:
 * - 'inicio': Tarjetas de servicios principales
 * - 'nomina': Datos de nómina del usuario
 * - 'hospedaje': Información de hospedaje
 * - 'busqueda': Búsqueda de RFC (usa BusquedaRfcView.tsx)
 * 
 * 🎨 CARACTERÍSTICAS VISUALES:
 * - Fondo con textura del gobierno de Puebla (Tláloc)
 * - Header superior con botón hamburguesa
 * - Contenido responsivo y adaptable
 * - Estilos consistentes con el branding oficial
 */

import React from 'react';
import { ImageBackground, Platform, ScrollView, View } from 'react-native';
import { BusquedaRfcView } from './BusquedaRfcView';
import { Hamburguesa } from './Hamburguesa';
import { InfoView } from './ui/DataView';
import { ServiceGrid } from './ui/ServiceGrid';
import { menuPrincipalStyles as styles } from './ui/Styles/MenuPrincipal.styles';
import { TopBar } from './ui/TopBar';

/**
 * PROPIEDADES DEL COMPONENTE
 * Define todas las props necesarias para el funcionamiento del menú principal
 */
interface MenuPrincipalProps {
  usuario: string;                                         // Nombre del usuario logueado
  menuVisible: boolean;                               // Estado del menú hamburguesa (abierto/cerrado)
  setMenuVisible: (visible: boolean) => void; // Función para mostrar/ocultar menú
  currentView: string;                                  // Vista actual ('inicio', 'nomina', 'hospedaje', 'busqueda')
  setCurrentView: (view: string) => void;      // Función para cambiar de vista
  nominaData: any;                                   // Datos de nómina del usuario
  hospedajeData: any;                              // Datos de hospedaje
  busquedaData: any;                               // Resultados de búsqueda RFC
  setBusquedaData: (data: any) => void;    // Función para actualizar resultados de búsqueda
  loadingData: boolean;                            // Estado de carga de datos
  handleGetNomina: () => void;                // Función para obtener datos de nómina
  handleGetHospedaje: () => void;           // Función para obtener datos de hospedaje
  handleBusquedaRfc: (rfc: string) => void; // Función para buscar RFC
  handleLogout: () => void;                       // Función para cerrar sesión
}

export function MenuPrincipal({
  usuario,
  menuVisible,
  setMenuVisible,
  currentView,
  setCurrentView,
  nominaData,
  hospedajeData,
  busquedaData,
  setBusquedaData,
  loadingData,
  handleGetNomina,
  handleGetHospedaje,
  handleBusquedaRfc,
  handleLogout
}: MenuPrincipalProps) {
  return (
    // FONDO PRINCIPAL - Textura oficial del Gobierno de Puebla
    <ImageBackground
      source={require('@/assets/images/Texturas_1A-Tláloc_blanco.png')}
      style={[styles.menuPrincipalBackgroundImage, Platform.OS === 'web' && styles.menuPrincipalBackgroundImageWeb]}
      resizeMode="repeat"
    >
      <View style={styles.menuPrincipalContainer}>
        
        {/* HEADER SUPERIOR - Componente TopBar atomico */}
        <TopBar 
          title="Sistema de Consultas"
          onMenuPress={() => setMenuVisible(!menuVisible)}
        />

        {/* MENÚ LATERAL - Componente Hamburguesa */}
        <Hamburguesa
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          currentView={currentView}
          setCurrentView={setCurrentView}
          usuario={usuario}
          onNominaPress={handleGetNomina}
          onHospedajePress={handleGetHospedaje}
          onBusquedaPress={() => {
            setCurrentView('busqueda');
            setBusquedaData(null); // Limpiar resultados anteriores
          }}
          onLogout={handleLogout}
        />

        {/* CONTENIDO PRINCIPAL - Aquí se muestran las diferentes vistas */}
        <ScrollView 
          style={styles.mainContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          
          {/* VISTA DE INICIO - Componente ServiceGrid atomico */}
          {currentView === 'inicio' && (
            <ServiceGrid 
              onNominaPress={handleGetNomina}
              onHospedajePress={handleGetHospedaje}
            />
          )}

          {/* VISTA DE NÓMINA - Componente DataView atomico */}
          {currentView === 'nomina' && (
            <InfoView 
              icon="dollarsign.circle.fill"
              title="Datos de Nómina"
              data={nominaData}
              loading={loadingData}
              loadingText="Cargando datos de nómina..."
              emptyText="No hay datos de nómina disponibles"
            />
          )}

          {/* VISTA DE HOSPEDAJE - Componente InfoView atomico */}
          {currentView === 'hospedaje' && (
            <InfoView 
              icon="building.2.fill"
              title="Datos de Hospedaje"
              data={hospedajeData}
              loading={loadingData}
              loadingText="Cargando datos de hospedaje..."
              emptyText="No hay datos de hospedaje disponibles"
            />
          )}

          {/* VISTA DE BÚSQUEDA RFC - Componente especializado para consultar RFC */}
          {currentView === 'busqueda' && (
            <BusquedaRfcView 
              onBuscar={handleBusquedaRfc}
              resultados={busquedaData}
              loading={loadingData}
            />
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

/**
 * 🎨 NOTA: Los estilos han sido movidos a MenuPrincipal.styles.ts
 * 
 * Esto es una buena práctica porque:
 * - ✅ Separa la lógica de la presentación
 * - ✅ Hace el componente más limpio y fácil de leer
 * - ✅ Permite reutilizar estilos en otros componentes
 * - ✅ Facilita el mantenimiento del código
 * - ✅ Mejora la organización del proyecto
 */