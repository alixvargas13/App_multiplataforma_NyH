// Configuración base de la API
const API_BASE_URL = 'http://localhost:5262'; // URL HTTP para desarrollo local

// 🎭 Modo temporal - simular login exitoso mientras arreglan la API
const BYPASS_API_ERROR = true;

// Tipos de datos según la especificación de tu API .NET
export interface LoginRequest {
  usuario: string;
  contrasena: string;
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
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      console.log(` ***Haciendo petición a: ${url} ***`);
      const response = await fetch(url, finalOptions);
      
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
    } catch (error) {
      console.error('Error en petición:', error);
      throw error;
    }
  }

  // Endpoint de login
  async login(usuario: string, contrasena: string): Promise<LoginResponse> {
    // 🎭 SIMULACIÓN TEMPORAL - Login exitoso sin API
    if (BYPASS_API_ERROR) {
      console.log('Login exitoso! (modo temporal)');
      
      // Simular un pequeño delay como si fuera una petición real
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Verificar credenciales básicas
      if (usuario.trim() && contrasena.trim()) {
        return {
          estatusEjecucion: 1,
          mensajeCiudadano: `¡Bienvenido ${usuario}! Login simulado exitosamente`,
          mensajeTecnico: 'Simulación temporal mientras se arregla la API'
        };
      } else {
        return {
          estatusEjecucion: 0,
          mensajeCiudadano: 'Por favor completa todos los campos',
          mensajeTecnico: 'Campos vacíos detectados'
        };
      }
    }
    
    // Código original para cuando la API funcione
    const loginData: LoginRequest = { usuario, contrasena };
    
    return this.makeRequest<LoginResponse>('/General/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  }

  // Endpoint de nómina
  async getNomina(): Promise<ApiResponse> {
    // 🎭 SIMULACIÓN TEMPORAL - Datos de nómina
    if (BYPASS_API_ERROR) {
      console.log('Simulando datos de nómina (modo temporal)');
      
      // Simular delay de petición
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return {
        estatusEjecucion: 1,
        mensajeCiudadano: 'Datos de nómina obtenidos exitosamente',
        mensajeTecnico: 'Salario: $25,000 MXN | Último pago: 15/Oct/2025 | Estado: Activo'
      };
    }
    
    return this.makeRequest<ApiResponse>('/General/nomina', {
      method: 'GET',
    });
  }

  // Endpoint de hospedaje
  async getHospedaje(): Promise<ApiResponse> {
    // 🎭 SIMULACIÓN TEMPORAL - Datos de hospedaje
    if (BYPASS_API_ERROR) {
      console.log('🏨 Simulando datos de hospedaje (modo temporal)');
      
      // Simular delay de petición
      await new Promise(resolve => setTimeout(resolve, 700));
      
      return {
        estatusEjecucion: 1,
        mensajeCiudadano: 'Información de hospedaje disponible',
        mensajeTecnico: '3 hoteles disponibles | Hotel Plaza: $1,200/noche | Hotel Centro: $800/noche'
      };
    }
    
    return this.makeRequest<ApiResponse>('/General/hospedaje', {
      method: 'GET',
    });
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