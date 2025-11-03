// Servicio de autenticación con JWT
// Maneja login, logout y almacenamiento del token

import { Platform } from 'react-native';

// Configuración base de la API (detecta automáticamente web vs móvil)
const API_BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:44306'  // Web: localhost con HTTP
  : 'http://192.168.137.1:44306';  // Móvil: IP local con HTTP

// Interfaces para el login (según tu API .NET)
export interface LoginRequest {
  Usuario: string;     // Con mayúscula inicial según tu API
  Contraseña: string;  // Con mayúscula inicial según tu API
}

export interface LoginResponse {
  token?: string;
  message?: string;
  error?: string;
}

// Clase para manejar la autenticación
class AuthService {
  private baseUrl: string;
  private tokenKey: string = 'jwt_token';

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Método para autenticar un usuario
   * @param usuario - Nombre de usuario
   * @param contrasena - Contraseña del usuario
   * @returns Promise con el resultado del login
   */
  async login(usuario: string, contrasena: string): Promise<LoginResponse> {
    const endpoint = '/api/general/login';
    const url = `${this.baseUrl}${endpoint}`;

    // Formato esperado por el API .NET (con mayúsculas)
    const loginData: LoginRequest = {
      Usuario: usuario,
      Contraseña: contrasena,
    };

    try {
      console.log(`Intentando login en: ${url}`);
      console.log(`Datos a enviar:`, loginData);
      console.log(`JSON stringified:`, JSON.stringify(loginData));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      console.log(`Response status:`, response.status);
      console.log(`Response ok:`, response.ok);
      console.log(`Response headers:`, [...response.headers.entries()]);

      if (!response.ok) {
        // Si la respuesta no es exitosa (401, 403, etc.)
        const errorText = await response.text();
        console.error(`Error en login: ${response.status}`);
        console.error(`Respuesta del servidor:`, errorText);
        console.error(`Es probable que sea un problema de CORS si la respuesta está vacía`);
        
        // Intentar parsear el error como JSON por si el backend envía {"mensaje":"..."}
        try {
          const errorData = JSON.parse(errorText);
          const mensajeError = errorData.mensaje || errorData.message || errorText;
          
          return {
            error: `Error de autenticación: ${response.statusText}`,
            message: mensajeError,
          };
        } catch {
          // Si no es JSON válido, usar el texto directo
          return {
            error: `Error de autenticación: ${response.statusText}`,
            message: errorText || 'Usuario y contraseña incorrectos.',
          };
        }
      }

      // Intentar parsear la respuesta como JSON
      const data = await response.json();
      
      // Si el login es exitoso y tenemos un token
      if (data.token) {
        // Guardar el token
        await this.saveToken(data.token);
        console.log('✅ Login exitoso, token guardado');
        
        return {
          token: data.token,
          message: 'Login exitoso',
        };
      } else {
        console.warn('⚠️ Login sin token en respuesta');
        return {
          error: 'No se recibió token de autenticación',
          message: 'Error en la respuesta del servidor',
        };
      }
      
    } catch (error) {
      console.error('❌ Error en la petición de login:', error);
      
      return {
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'No se pudo conectar con el servidor',
      };
    }
  }

  /**
   * Guardar el token JWT
   * En React Native usa AsyncStorage, en web usa localStorage
   */
  async saveToken(token: string): Promise<void> {
    try {
      // Para React Native
      const AsyncStorage = await import('@react-native-async-storage/async-storage');
      await AsyncStorage.default.setItem(this.tokenKey, token);
    } catch (error) {
      // Fallback para web
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.tokenKey, token);
      }
    }
  }

  /**
   * Obtener el token JWT guardado
   */
  async getToken(): Promise<string | null> {
    try {
      // Para React Native
      const AsyncStorage = await import('@react-native-async-storage/async-storage');
      return await AsyncStorage.default.getItem(this.tokenKey);
    } catch (error) {
      // Fallback para web
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(this.tokenKey);
      }
      return null;
    }
  }

  /**
   * Eliminar el token (logout)
   */
  async logout(): Promise<void> {
    try {
      // Para React Native
      const AsyncStorage = await import('@react-native-async-storage/async-storage');
      await AsyncStorage.default.removeItem(this.tokenKey);
      console.log('👋 Sesión cerrada, token eliminado');
    } catch (error) {
      // Fallback para web
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(this.tokenKey);
      }
    }
  }

  /**
   * Verificar si hay un token guardado (usuario está logueado)
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null && token !== '';
  }

  /**
   * Obtener headers con el token JWT para peticiones autenticadas
   */
  async getAuthHeaders(): Promise<HeadersInit> {
    const token = await this.getToken();
    
    if (!token) {
      console.warn('⚠️ No hay token disponible');
      return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
    }

    console.log('🔑 Token encontrado, agregando Authorization header');
    
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }
}

// Exportar instancia única del servicio (Singleton)
export const authService = new AuthService();
