import { apiService, getErrorMessage, isApiSuccess } from '@/services/api';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { IconSymbol } from './ui/icon-symbol';
import { loginStyles } from './ui/Styles/LoginView.styles';

/**
 * Componente atómico para el formulario de Login
 * Diseño basado en Figma con colores y estilos del Gobierno de Puebla
 * Conectado a la API .NET con autenticación JWT
 * 
 * @param onLoginSuccess - Callback ejecutado cuando el login es exitoso
 * @param onLoginError - Callback ejecutado cuando hay un error en el login
 */

interface LoginViewProps {
  onLoginSuccess?: (data: any) => void;
  onLoginError?: (error: string) => void;
}

export default function LoginView({ onLoginSuccess, onLoginError }: LoginViewProps) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [recordarme, setRecordarme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorField, setErrorField] = useState<'usuario' | 'password' | null>(null);

  const handleSubmit = async () => {
    // Limpiar errores previos
    setErrorMessage('');
    setErrorField(null);

    // Validación de campos vacíos
    if (!usuario.trim() || !password.trim()) {
      const mensaje = 'Por favor completa todos los campos';
      setErrorMessage(mensaje);
      
      if (!usuario.trim()) setErrorField('usuario');
      else if (!password.trim()) setErrorField('password');
      
      // NO mostrar alert, solo mensaje visual en pantalla
      
      if (onLoginError) {
        onLoginError(mensaje);
      }
      return;
    }

    setIsLoading(true);

    try {
      console.log('🔐 Intentando login para usuario:', usuario);
      
      // Llamada a la API real
      const response = await apiService.login(usuario, password);
      
      console.log('📡 Respuesta de la API:', response);
      
      // Verificar si el login fue exitoso
      if (isApiSuccess(response)) {
        console.log('✅ Login exitoso');
        
        // Limpiar errores
        setErrorMessage('');
        setErrorField(null);
        
        const mensajeBienvenida = response.mensajeCiudadano || `¡Bienvenido ${usuario}!`;
        
        // No mostrar alert, solo ejecutar el callback de éxito
        // El usuario verá la transición a la siguiente pantalla
        
        // Ejecutar callback de éxito
        if (onLoginSuccess) {
          onLoginSuccess({ usuario, response });
        }
      } else {
        console.log('❌ Login fallido');
        
        // Obtener mensaje de error desde la API
        const mensajeError = getErrorMessage(response);
        
        // Determinar qué campo está mal basado en el mensaje de la API
        if (mensajeError.toLowerCase().includes('usuario')) {
          setErrorMessage(mensajeError);
          setErrorField('usuario');
          setUsuario('');
        } else if (mensajeError.toLowerCase().includes('contraseña') || mensajeError.toLowerCase().includes('password')) {
          setErrorMessage(mensajeError);
          setErrorField('password');
          setPassword('');
        } else {
          // Error genérico o ambos incorrectos
          setErrorMessage(mensajeError);
          setErrorField(null);
          
          // Si el mensaje indica que ambos están mal, limpiar ambos campos
          if (mensajeError.toLowerCase().includes('ambos') || 
              (mensajeError.toLowerCase().includes('usuario') && mensajeError.toLowerCase().includes('contraseña'))) {
            setUsuario('');
            setPassword('');
          }
        }
        
        // NO mostrar window.alert, solo el mensaje visual en pantalla
        
        if (onLoginError) {
          onLoginError(mensajeError);
        }
      }
    } catch (error) {
      console.error('💥 Error durante el login:', error);
      
      const mensajeError = error instanceof Error ? error.message : 'No se pudo conectar con el servidor';
      setErrorMessage(mensajeError);
      setErrorField(null);
      
      // NO mostrar alert, solo mensaje visual en pantalla

      if (onLoginError) {
        onLoginError(mensajeError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/Texturas_1A-Tláloc_rojo.png')}
      style={[loginStyles.backgroundImage, Platform.OS === 'web' && loginStyles.backgroundImageWeb]}
      resizeMode="repeat"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={loginStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={loginStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={loginStyles.loginCard}>
            {/* Logo / Header */}
            <View style={loginStyles.headerContainer}>
              <View style={loginStyles.logoContainer}>
                <View style={loginStyles.logoCircle}>
                  <View style={loginStyles.logoInner}>
                    <Text style={loginStyles.logoText}>P</Text>
                  </View>
                </View>
              </View>
              <Text style={loginStyles.mainTitle}>Sistema de Consultas</Text>
              <Text style={loginStyles.subtitle}>
                Secretaría de Planeación, Finanzas y Administración
              </Text>
            </View>

            {/* Formulario */}
            <View style={loginStyles.formContainer}>
              {/* Campo Usuario */}
              <View style={loginStyles.inputGroup}>
                <Text style={loginStyles.label}>Usuario</Text>
                <View style={[
                  loginStyles.inputContainer,
                  (errorField === 'usuario' || (errorMessage && errorField === null)) && loginStyles.inputError
                ]}>
                  <View style={loginStyles.inputIconContainer}>
                    <IconSymbol 
                      size={20} 
                      name="person.fill" 
                      color={errorField === 'usuario' ? '#ef4444' : '#6b7280'} 
                    />
                  </View>
                  <TextInput
                    style={loginStyles.input}
                    placeholder="Ingresa tu usuario"
                    placeholderTextColor="#9ca3af"
                    value={usuario}
                    onChangeText={(text) => {
                      setUsuario(text);
                      setErrorMessage('');
                      setErrorField(null);
                    }}
                    autoCapitalize="none"
                    editable={!isLoading}
                  />
                </View>
                {errorField === 'usuario' && errorMessage && (
                  <Text style={loginStyles.errorText}>{errorMessage}</Text>
                )}
              </View>

              {/* Campo Contraseña */}
              <View style={loginStyles.inputGroup}>
                <Text style={loginStyles.label}>Contraseña</Text>
                <View style={[
                  loginStyles.inputContainer,
                  (errorField === 'password' || (errorMessage && errorField === null)) && loginStyles.inputError
                ]}>
                  <View style={loginStyles.inputIconContainer}>
                    <IconSymbol 
                      size={20} 
                      name="lock.fill" 
                      color={errorField === 'password' ? '#ef4444' : '#6b7280'} 
                    />
                  </View>
                  <TextInput
                    style={loginStyles.input}
                    placeholder="Ingresa tu contraseña"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setErrorMessage('');
                      setErrorField(null);
                    }}
                    secureTextEntry
                    editable={!isLoading}
                  />
                </View>
                {errorField === 'password' && errorMessage && (
                  <Text style={loginStyles.errorText}>{errorMessage}</Text>
                )}
              </View>

              {/* Mensaje de error general (cuando ambos son incorrectos o error de conexión) */}
              {errorMessage && errorField === null && (
                <View style={loginStyles.errorBanner}>
                  <Text style={loginStyles.errorBannerText}>
                    {errorMessage}
                  </Text>
                </View>
              )}

              {/* Opciones: Recordarme y Olvidaste contraseña */}
              <View style={loginStyles.optionsContainer}>
                <TouchableOpacity
                  style={loginStyles.checkboxContainer}
                  onPress={() => setRecordarme(!recordarme)}
                  disabled={isLoading}
                >
                  <View style={[loginStyles.checkbox, recordarme && loginStyles.checkboxChecked]}>
                    {recordarme && <Text style={loginStyles.checkmark}>✓</Text>}
                  </View>
                  <Text style={loginStyles.checkboxLabel}>Recordarme</Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={isLoading}>
                  <Text style={loginStyles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
              </View>

              {/* Botón Iniciar Sesión */}
              <TouchableOpacity
                style={[loginStyles.loginButton, isLoading && loginStyles.loginButtonDisabled]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={loginStyles.loginButtonText}>Iniciar Sesión</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Información de credenciales de prueba */}
            <View style={loginStyles.infoContainer}>
              <Text style={loginStyles.infoTitle}>Conectando con API .NET</Text>
              <Text style={loginStyles.infoText}>
                Usuario: usser-admin | Contraseña: admin123-
              </Text>
            </View>

            {/* Footer */}
            <View style={loginStyles.footer}>
              <Text style={loginStyles.footerText}>Gobierno de Puebla © 2025</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
