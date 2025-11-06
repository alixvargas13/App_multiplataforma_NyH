import { API_CONFIG } from './config';
import { servicioAutentificacion } from './servicioAutentificacion';

// Configuración base de la API (ahora centralizada en config.ts)
const API_BASE_URL = API_CONFIG.BASE_URL;

// Tipos de datos según la especificación de tu API .NET
export interface LoginRequest {
  Usuario: string;     // Con mayúscula según el API
  Contraseña: string;  // Con mayúscula según el API y con ñ
}

export interface ApiResponse {
  estatusEjecucion: number; // 1 si éxito, 0 o -1 si error
  mensajeCiudadano: string;
  mensajeTecnico: string;
}

export interface LoginResponse extends ApiResponse {
  // Aquí puedes agregar campos adicionales que devuelva tu API de login
  // como tokens, datos del usuario, etc.
}

// Clase para manejar todas las llamadas a la API
class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Método genérico para hacer peticiones HTTP
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    requiresAuth: boolean = true
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Obtener headers con autenticación si es necesario
    let headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      headers = await servicioAutentificacion.getAuthHeaders();
    }

    const defaultOptions: RequestInit = {
      headers,
    };

    const finalOptions = { 
      ...defaultOptions, 
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      }
    };

    const controller = new AbortController();// Crear un AbortController antes del fetch
    const timeoutId = setTimeout(() => controller.abort(), 60000); // Timeout de 60 segundos (1 minuto para debugging)

    try {
      console.log(` ***Haciendo petición a: ${url} ***`);
      const response = await fetch(url, {
        ...finalOptions,
        signal: controller.signal  // spread operator ( "..." "Desempaca" o "expande" todas las propiedades del objeto finalOptions dentro del nuevo objeto.)
      });
      
      // Manejo de códigos de estado HTTP
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`ERROR ${response.status}: ${errorText}`);
        
        switch (response.status) {
          case 401:
            throw new Error('ERROR Credenciales incorrectas');
          case 500:
            throw new Error('ERROR interno del servidor');
          default:
            throw new Error(`ERROR ${response.status}: ${response.statusText}`);
        }
      }

      const data = await response.json();
      console.log('Respuesta recibida:', data);
      return data;
    } catch (error: any) 
      {
        // Detectar si fue timeout
        if (error.name === 'AbortError') {
          console.error('Timeout: La petición tardó demasiado');
          throw new Error('La petición tardó demasiado. Revisa tu conexión.');
        }
        console.error('Error en petición:', error);
        throw error;
      }
    finally {
      clearTimeout(timeoutId);  // Limpiar el timeout en finally
    }
  }

  // Endpoint de login - Ahora usa servicioAutentificacion con JWT
  async login(usuario: string, contrasena: string): Promise<LoginResponse> {
    console.log('Llamando al login con JWT...');
    
    try {
      // Usar el servicio de autenticación con JWT
      const response = await servicioAutentificacion.login(usuario, contrasena);
      
      if (response.token) {
        // Login exitoso - retornar en formato compatible
        return {
          estatusEjecucion: 1,
          mensajeCiudadano: response.message || `¡Bienvenido ${usuario}!`,
          mensajeTecnico: 'Login exitoso con JWT'
        };
      } else {
        // Login fallido
        return {
          estatusEjecucion: 0,
          mensajeCiudadano: response.message || 'Usuario o contraseña incorrectos',
          mensajeTecnico: response.error || 'Error en autenticación'
        };
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      return {
        estatusEjecucion: 0,
        mensajeCiudadano: 'Error al conectar con el servidor',
        mensajeTecnico: error instanceof Error ? error.message : 'Error desconocido'
      };
    }
  }

  // Endpoint de nómina (requiere autenticación)
  async getNomina(): Promise<ApiResponse> {
    console.log('Obteniendo datos de nómina...');
    return this.makeRequest<ApiResponse>('/General/nomina', {
      method: 'GET',
    }, true); // true = requiere autenticación JWT
  }

  // Endpoint de hospedaje (requiere autenticación)
  async getHospedaje(): Promise<ApiResponse> {
    console.log('Obteniendo datos de hospedaje...');
    return this.makeRequest<ApiResponse>('/General/hospedaje', {
      method: 'GET',
    }, true); // true = requiere autenticación JWT
  }

  // Método para cambiar la URL base (útil para desarrollo/producción)
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }
}

// Instancia singleton del servicio API
export const apiService = new ApiService();

// Función helper para verificar si la respuesta fue exitosa
export const isApiSuccess = (response: ApiResponse): boolean => {
  return response.estatusEjecucion === 1;
};

// Función helper para obtener el mensaje de error apropiado
export const getErrorMessage = (response: ApiResponse): string => {
  return response.mensajeCiudadano || response.mensajeTecnico || 'Error desconocido';
};