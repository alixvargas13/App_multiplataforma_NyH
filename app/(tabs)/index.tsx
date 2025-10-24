import { MenuPrincipal } from '@/components/MenuPrincipal';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { apiService, getErrorMessage, isApiSuccess } from '@/services/api';
import { consultaService } from '@/services/consultaService';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [recordarme, setRecordarme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState('inicio'); // 'inicio', 'nomina', 'hospedaje', 'busqueda'
  const [nominaData, setNominaData] = useState<any>(null);
  const [hospedajeData, setHospedajeData] = useState<any>(null);
  const [busquedaData, setBusquedaData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);

  const handleSubmit = async () => {
    console.log('Intentando login para usuario:', usuario);
    
    // Validación de campos vacíos
    if (!usuario || !password) {
      console.log('Campos vacíos, mostrando alerta');
      const mensaje = 'Por favor completa todos los campos';
      
      if (Platform.OS === 'web') {
        window.alert(`Error: ${mensaje}`);
      } else {
        Alert.alert('Error', mensaje);
      }
      return;
    }
    
    // Mostrar estado de carga
    setIsLoading(true);
    
    try {
      // Llamada a la API de login
      console.log(' Enviando credenciales a la API...');
      const response = await apiService.login(usuario, password);
      
      console.log(' Respuesta de la API:', response);
      
      // Verificar si el login fue exitoso según tu API
      if (isApiSuccess(response)) {
        console.log('OK Login exitoso');
        setIsLoggedIn(true);
        
        // Mensaje de bienvenida
        const mensajeBienvenida = response.mensajeCiudadano || `¡Bienvenido ${usuario}!`;
        
        if (Platform.OS === 'web') {
          window.alert(`${mensajeBienvenida}`);
        } else {
          Alert.alert('¡Bienvenido!', mensajeBienvenida);
        }
      } else {
        // Login fallido según la respuesta de la API
        console.log('Login fallido');
        const mensajeError = getErrorMessage(response);
        
        if (Platform.OS === 'web') {
          window.alert(`Acceso Denegado: ${mensajeError}`);
        } else {
          Alert.alert('Acceso Denegado', mensajeError);
        }
        
        // Limpiar campos después del error
        setUsuario('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      
      // Manejar errores de red o del servidor
      const mensajeError = error instanceof Error ? error.message : 'Error de conexión con el servidor';
      
      if (Platform.OS === 'web') {
        window.alert(`Error de conexión: ${mensajeError}`);
      } else {
        Alert.alert('Error de conexión', mensajeError);
      }
    } finally {
      // Ocultar estado de carga
      setIsLoading(false);
    }
  };

  // Función para obtener datos de nómina
  const handleGetNomina = async () => {
    setLoadingData(true);
    setCurrentView('nomina');
    
    try {
      console.log('Obteniendo datos de nómina...');
      const response = await apiService.getNomina();
      
      if (isApiSuccess(response)) {
        setNominaData(response);
        console.log('Datos de nómina obtenidos:', response);
      } else {
        const error = getErrorMessage(response);
        Alert.alert('Error', `No se pudieron obtener los datos de nómina: ${error}`);
      }
    } catch (error) {
      console.error('Error obteniendo nómina:', error);
      const mensaje = error instanceof Error ? error.message : 'Error de conexión';
      Alert.alert('Error de conexión', mensaje);
    } finally {
      setLoadingData(false);
    }
  };

  // Función para obtener datos de hospedaje
  const handleGetHospedaje = async () => {
    setLoadingData(true);
    setCurrentView('hospedaje');
    
    try {
      console.log('Obteniendo datos de hospedaje...');
      const response = await apiService.getHospedaje();
      
      if (isApiSuccess(response)) {
        setHospedajeData(response);
        console.log('Datos de hospedaje obtenidos:', response);
      } else {
        const error = getErrorMessage(response);
        Alert.alert('Error', `No se pudieron obtener los datos de hospedaje: ${error}`);
      }
    } catch (error) {
      console.error('Error obteniendo hospedaje:', error);
      const mensaje = error instanceof Error ? error.message : 'Error de conexión';
      Alert.alert('Error de conexión', mensaje);
    } finally {
      setLoadingData(false);
    }
  };

  // Función para realizar búsqueda por RFC
  const handleBusquedaRfc = async (rfc: string) => {
    setLoadingData(true);
    setCurrentView('busqueda');
    
    try {
      console.log('Realizando búsqueda por RFC:', rfc);
      const resultados = await consultaService.consultarPorRfc(rfc);
      
      setBusquedaData(resultados);
      console.log('Resultados de búsqueda obtenidos:', resultados);
    } catch (error) {
      console.error('Error en búsqueda:', error);
      const mensaje = error instanceof Error ? error.message : 'Error de conexión';
      Alert.alert('Error en búsqueda', mensaje);
      setBusquedaData(null);
    } finally {
      setLoadingData(false);
    }
  };

  // Función para manejar logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsuario('');
    setPassword('');
    setMenuVisible(false);
  };

  if (isLoggedIn) {
    return (
      <MenuPrincipal
        usuario={usuario}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        currentView={currentView}
        setCurrentView={setCurrentView}
        nominaData={nominaData}
        hospedajeData={hospedajeData}
        busquedaData={busquedaData}
        setBusquedaData={setBusquedaData}
        loadingData={loadingData}
        handleGetNomina={handleGetNomina}
        handleGetHospedaje={handleGetHospedaje}
        handleBusquedaRfc={handleBusquedaRfc}
        handleLogout={handleLogout}
      />
    );
  }

  return (
    <ImageBackground
      source={require('@/assets/images/Texturas_1A-Tláloc_rojo.png')}
      style={[styles.backgroundImage, Platform.OS === 'web' && styles.backgroundImageWeb]}
      resizeMode="repeat"
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.loginCard}>
            {/* Logo / Header */}
            <View style={styles.headerContainer}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  <View style={styles.logoInner}>
                    <Text style={styles.logoText}>P</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.mainTitle}>Sistema de Consultas</Text>
              <Text style={styles.subtitle}>Secretaría de Planeación, Finanzas y Administración</Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Usuario</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputIconContainer}>
                    <IconSymbol size={20} name="person.fill" color="#6b7280" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu usuario"
                    placeholderTextColor="#9ca3af"
                    value={usuario}
                    onChangeText={setUsuario}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputIconContainer}>
                    <IconSymbol size={20} name="lock.fill" color="#6b7280" />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              <View style={styles.optionsContainer}>
                <TouchableOpacity 
                  style={styles.checkboxContainer}
                  onPress={() => setRecordarme(!recordarme)}
                >
                  <View style={[styles.checkbox, recordarme && styles.checkboxChecked]}>
                    {recordarme && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>Recordarme</Text>
                </TouchableOpacity>
                
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Información de conexión */}
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Conectando con API .NET</Text>
              <Text style={styles.infoText}>
                usuario = "admin"  contraseña = "admin123"
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Gobierno de Puebla © 2025</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Pantalla de login
  backgroundImage: {
    flex: 1,
    padding: 16,
  },
  backgroundImageWeb: {
    backgroundSize: '25% 25%',          // Imagen al 25% del tamaño original
    backgroundRepeat: 'repeat',         // Asegurar que se repita
    backgroundPosition: 'center',      // Mover hacia la izquierda
  },
  
  // Background del dashboard
  dashboardBackgroundImage: {
    flex: 1,
  },
  dashboardBackgroundImageWeb: {
    backgroundSize: '15% 15%',          // Imagen más pequeña para el dashboard
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center',
  },
  
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },

  // Header del login
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgb(95,27,45)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  logoInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgb(95,27,45)',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(72,71,71)',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Formulario
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(72,71,71)',
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
  inputIcon: {
    fontSize: 20,
    paddingLeft: 12,
    paddingRight: 8,
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

  // Opciones
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'rgb(95,27,45)',
    borderColor: 'rgb(95,27,45)',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: 'rgb(72,71,71)',
  },
  forgotPassword: {
    fontSize: 14,
    color: 'rgb(95,27,45)',
    fontWeight: '500',
  },

  // Botón de login
  loginButton: {
    backgroundColor: 'rgb(95,27,45)',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Credenciales demo
  demoContainer: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: '#b45309',
    marginBottom: 2,
  },
  demoBold: {
    fontWeight: '600',
  },

  // Footer
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },

  // Dashboard después del login
  dashboardContainer: {
    flex: 1,
    backgroundColor: 'transparent', // Cambiar a transparente para ver el fondo
    padding: 20,
  },
  dashboardHeader: {
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgb(72,71,71)',
    marginBottom: 8,
    textAlign: 'center',
  },
  dashboardSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Servicios
  servicesContainer: {
    flex: 1,
  },
  serviceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Hacer ligeramente transparente
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  serviceIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 12,
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

  // Botón logout
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Estilos del menú hamburguesa
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(95,27,45)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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

  // Menú lateral
  sideMenuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    flexDirection: 'row-reverse',
  },
  sideMenuBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sideMenu: {
    width: 280,
    backgroundColor: '#ffffff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  userHeader: {
    backgroundColor: 'rgb(95,27,45)',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    padding: 8,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: '300',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgb(95,27,45)',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },

  // Opciones del menú
  menuOptions: {
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemActive: {
    backgroundColor: '#f8f9fa',
    borderRightWidth: 4,
    borderRightColor: 'rgb(95,27,45)',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 16,
    fontWeight: '500',
  },
  menuItemTextActive: {
    color: 'rgb(95,27,45)',
    fontWeight: '600',
  },

  // Contenido principal con menú
  mainContent: {
    flex: 1,
    padding: 20,
  },

  // Estilos para el estado de carga del botón
  loginButtonDisabled: {
    opacity: 0.6,
  },

  // Estilos para la información de conexión
  infoContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: 'rgb(95,27,45)',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(95,27,45)',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },

  // Estilos para las vistas de datos
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
  dataContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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

  // Estilos para la vista de búsqueda RFC
  busquedaContainer: {
    flex: 1,
    padding: 20,
  },
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
    color: 'rgb(95,27,45)',
    marginLeft: 12,
  },
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
    elevation: 3,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 5,
    fontStyle: 'italic',
  },
  buscarButton: {
    backgroundColor: 'rgb(95,27,45)',
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
    elevation: 4,
  },
  buscarButtonDisabled: {
    opacity: 0.6,
  },
  buscarButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultadosContainer: {
    flex: 1,
  },
  resultadosTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgb(95,27,45)',
    marginBottom: 15,
  },
  resultadoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultadoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultadoRfc: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(95,27,45)',
  },
  estadoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  estadoActivo: {
    backgroundColor: '#dcfce7',
  },
  estadoInactivo: {
    backgroundColor: '#fee2e2',
  },
  estadoInactivoText: {
    color: '#dc2626',
  },
  estadoText: {
    fontSize: 12,
    fontWeight: '600',
  },
  resultadoNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 5,
  },
  resultadoComercial: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  resultadoDetalles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detalleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(95,27,45)',
  },
  detalleValue: {
    fontSize: 14,
    color: '#374151',
  },
  mensajeTecnico: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    fontStyle: 'italic',
  },
});
