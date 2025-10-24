import { IconSymbol } from '@/components/ui/icon-symbol';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { hamburguesaStyles as styles } from './ui/Styles/Hamburguesa.styles';

interface HamburguesaProps {
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  usuario: string;
  onNominaPress: () => void;
  onHospedajePress: () => void;
  onBusquedaPress: () => void;
  onLogout: () => void;
}

export function Hamburguesa({
  menuVisible,
  setMenuVisible,
  currentView,
  setCurrentView,
  usuario,
  onNominaPress,
  onHospedajePress,
  onBusquedaPress,
  onLogout
}: HamburguesaProps) {
  if (!menuVisible) return null;

  return (
    <View style={styles.sideMenuOverlay}>
      <TouchableOpacity 
        style={styles.sideMenuBackground}
        onPress={() => setMenuVisible(false)}
      />
      <View style={styles.sideMenu}>
        {/* Header del usuario */}
        <View style={styles.userHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setMenuVisible(false)}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>
                {usuario.substring(0, 2).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.userName}>{usuario}</Text>
            <Text style={styles.userRole}>Administrador</Text>
          </View>
        </View>

        {/* Opciones del menú */}
        <View style={styles.menuOptions}>
          <TouchableOpacity 
            style={[styles.menuItem, currentView === 'inicio' && styles.menuItemActive]}
            onPress={() => {
              setCurrentView('inicio');
              setMenuVisible(false);
            }}
          >
            <IconSymbol 
              size={24} 
              name="house.fill" 
              color={currentView === 'inicio' ? "rgb(95,27,45)" : "#6b7280"} 
            />
            <Text style={[styles.menuItemText, currentView === 'inicio' && styles.menuItemTextActive]}>
              Inicio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, currentView === 'nomina' && styles.menuItemActive]}
            onPress={() => {
              onNominaPress();
              setMenuVisible(false);
            }}
          >
            <IconSymbol 
              size={24} 
              name="dollarsign.circle.fill" 
              color={currentView === 'nomina' ? "rgb(95,27,45)" : "#6b7280"} 
            />
            <Text style={[styles.menuItemText, currentView === 'nomina' && styles.menuItemTextActive]}>
              Nómina
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, currentView === 'hospedaje' && styles.menuItemActive]}
            onPress={() => {
              onHospedajePress();
              setMenuVisible(false);
            }}
          >
            <IconSymbol 
              size={24} 
              name="building.2.fill" 
              color={currentView === 'hospedaje' ? "rgb(95,27,45)" : "#6b7280"} 
            />
            <Text style={[styles.menuItemText, currentView === 'hospedaje' && styles.menuItemTextActive]}>
              Hospedaje
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, currentView === 'busqueda' && styles.menuItemActive]}
            onPress={() => {
              onBusquedaPress();
              setMenuVisible(false);
            }}
          >
            <Image 
              source={require('@/assets/images/search-icon.png')} 
              style={currentView === 'busqueda' ? styles.searchIconActive : styles.searchIcon}
            />
            <Text style={[styles.menuItemText, currentView === 'busqueda' && styles.menuItemTextActive]}>
              Búsqueda
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol size={24} name="chevron.right" color="#6b7280" />
            <Text style={styles.menuItemText}>Catálogos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol size={24} name="person.fill" color="#6b7280" />
            <Text style={styles.menuItemText}>Usuarios</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <IconSymbol size={24} name="chevron.right" color="#6b7280" />
            <Text style={styles.menuItemText}>Ayuda</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={onLogout}
          >
            <IconSymbol size={24} name="power" color="#6b7280" />
            <Text style={styles.menuItemText}>Salir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/**
 * 🎨 NOTA: Los estilos han sido movidos a Hamburguesa.styles.ts
 * 
 * Esto es una buena práctica porque:
 * - ✅ Separa la lógica de la presentación
 * - ✅ Hace el componente más limpio y fácil de leer
 * - ✅ Permite reutilizar estilos en otros componentes
 * - ✅ Facilita el mantenimiento del código
 * - ✅ Mejora la organización del proyecto
 * - ✅ Proporciona mejor documentación del menú lateral
 * - 🍔 Mantiene el componente hamburguesa modular y escalable
 */