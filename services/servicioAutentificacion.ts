// Servicio de autenticación con JWT
// Maneja login, logout y almacenamiento del token

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from './config';

// Configuración base de la API (ahora centralizada en config.ts)
const API_BASE_URL = API_CONFIG.BASE_URL;

// Interfaces para el login (según el API .NET)
export interface LoginRequest {
  Usuario: string;     // Con mayúscula inicial según el API
  Contraseña: string;  // Con mayúscula inicial según el API
}

export interface LoginResponse {
  token?: string;
  message?: string;
  error?: string;
}

// Clase para manejar la autenticación
class ServicioAutentificacion {
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

    // Crear AbortController para timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // Timeout de 60 segundos (1 minuto para debugging)

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
        signal: controller.signal, // Agregar signal para timeout
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
      console.log('Respuesta de la API:', data);
      
      // Verificar si el API devuelve el token directamente
      if (data.token) {
        // Formato: { token: "..." }
        await this.saveToken(data.token);
        console.log('✅ Login exitoso, token guardado');
        
        return {
          token: data.token,
          message: 'Login exitoso',
        };
      }
      
      // Verificar si el API devuelve formato con estatusEjecucion
      if (data.estatusEjecucion === 1) {
        // Formato: { estatusEjecucion: 1, mensajeCiudadano: "...", mensajeTecnico: "..." }
        // El token podría estar en mensajeTecnico o debemos buscarlo en headers
        
        // Intentar extraer el token del header Authorization de la respuesta
        const authHeader = response.headers.get('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7); // Quitar "Bearer "
          await this.saveToken(token);
          console.log('✅ Login exitoso, token guardado desde header');
          
          return {
            token: token,
            message: data.mensajeCiudadano || 'Login exitoso',
          };
        }
        
        // Si no está en el header, buscar en otros campos posibles
        const possibleToken = data.token || data.jwt || data.accessToken;
        if (possibleToken) {
          await this.saveToken(possibleToken);
          console.log('✅ Login exitoso, token guardado');
          
          return {
            token: possibleToken,
            message: data.mensajeCiudadano || 'Login exitoso',
          };
        }
        
        console.warn('⚠️ Login exitoso pero no se encontró el token en la respuesta');
        console.warn('Headers de respuesta:', [...response.headers.entries()]);
        console.warn('Body de respuesta:', data);
        
        return {
          error: 'No se recibió token de autenticación',
          message: 'El servidor no devolvió un token válido',
        };
      }
      
      // Si llegamos aquí, el login falló
      console.warn('⚠️ Login sin token en respuesta');
      return {
        error: 'No se recibió token de autenticación',
        message: data.mensajeCiudadano || data.mensaje || 'Error en la respuesta del servidor',
      };
      
    } catch (error: any) {
      // Detectar si fue timeout
      if (error.name === 'AbortError') {
        console.error('Timeout: La petición de login tardó demasiado');
        return {
          error: 'Timeout',
          message: 'La petición tardó demasiado. Revisa tu conexión.',
        };
      }
      
      console.error('❌ Error en la petición de login:', error);
      
      return {
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'No se pudo conectar con el servidor',
      };
    } finally {
      clearTimeout(timeoutId); // Limpiar timeout
    }
  }

  /**
   * Guardar el token JWT
   * En React Native usa AsyncStorage, en web usa localStorage
   */
  async saveToken(token: string): Promise<void> {
    console.log('💾 Guardando token:', token.substring(0, 20) + '...');
    try {
      // Para React Native
      await AsyncStorage.setItem(this.tokenKey, token);
      console.log('✅ Token guardado exitosamente en AsyncStorage');
    } catch (error) {
      console.log('❌ Error guardando token en AsyncStorage:', error);
      // Fallback para web
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.tokenKey, token);
        console.log('✅ Token guardado en localStorage (fallback)');
      } else {
        console.log('❌ No se pudo guardar el token en ningún lugar');
      }
    }
  }

  /**
   * Obtener el token JWT guardado
   */
  async getToken(): Promise<string | null> {
    console.log('🔍 Buscando token guardado...');
    try {
      // Para React Native
      const token = await AsyncStorage.getItem(this.tokenKey);
      if (token) {
        console.log('✅ Token encontrado en AsyncStorage:', token.substring(0, 20) + '...');
      } else {
        console.log('❌ No se encontró token en AsyncStorage');
      }
      return token;
    } catch (error) {
      console.log('❌ Error obteniendo token de AsyncStorage:', error);
      // Fallback para web
      if (typeof window !== 'undefined' && window.localStorage) {
        const token = localStorage.getItem(this.tokenKey);
        if (token) {
          console.log('✅ Token encontrado en localStorage (fallback)');
        } else {
          console.log('❌ No se encontró token en localStorage (fallback)');
        }
        return token;
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
      await AsyncStorage.removeItem(this.tokenKey);
      console.log('Sesión cerrada, token eliminado');
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
    console.log('🔍 Obteniendo headers de autenticación...');
    const token = await this.getToken();
    
    if (!token) {
      console.warn('⚠️ No hay token disponible para headers');
      return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
    }

    console.log('🔑 Token encontrado para headers:', token.substring(0, 20) + '...');
    
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }
}

// Exportar instancia única del servicio (Singleton)
export const servicioAutentificacion = new ServicioAutentificacion();


