// Servicio para consultas de RFC y verificación de datos
// Integración con ASP.NET Framework 4.8 API
import { Platform } from 'react-native';
import { authService } from './servicioAutentificacion';

// Configuración de la API de consultas
const CONSULTA_API_BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:44306'
  : 'http://192.168.137.1:44306';

// Interfaces para la consulta de RFC
export interface ConsultaRfcRequest {
  rfc: string;
  nombre?: string;
  nombreComercial?: string;
}

export interface ConsultaRfcResponse {
  idProceso: number;
  rfc: string;
  nombre: string;
  nombreComercial: string;
  controlPersona: number;
  controlMateria: number;
  sistema: string;
  tipoSucursal: string;
  situacion: string;
  mensajeTecnico: string;
}

// Respuesta estándar de la API
export interface ConsultaApiResponse {
  success: boolean;
  data: ConsultaRfcResponse[];
  message: string;
  error?: string;
}

// Clase para manejar las consultas RFC
class ConsultaService {
  private baseUrl: string;

  constructor(baseUrl: string = CONSULTA_API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Método genérico para hacer peticiones
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    requiresAuth: boolean = true
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Obtener headers con autenticación si es necesario
    let headers: HeadersInit;

    if (requiresAuth) {
      headers = await authService.getAuthHeaders();
      console.log('Headers con autenticación obtenidos');
    } else {
      headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
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

    try {
      console.log(`Haciendo consulta a: ${url}`);
      console.log(`Parámetros:`, finalOptions.body);
      console.log(`Headers enviados:`, finalOptions.headers);
      
      const response = await fetch(url, finalOptions);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        
        switch (response.status) {
          case 400:
            throw new Error('Parámetros de búsqueda inválidos');
          case 404:
            throw new Error('No se encontraron resultados');
          case 500:
            throw new Error('Error interno del servidor');
          default:
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      }

      const data = await response.json();
      console.log('Resultados obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error en consulta:', error);
      throw error;
    }
  }

  // Consulta por RFC (funcionalidad principal)
  async consultarPorRfc(rfc: string): Promise<ConsultaRfcResponse[]> {
    // Validación básica del RFC
    if (!rfc || rfc.trim().length === 0) {
      throw new Error('El RFC es obligatorio');
    }

    // Normalizar RFC (mayúsculas, sin espacios)
    const rfcNormalizado = rfc.trim().toUpperCase();

    console.log(`Consultando RFC: ${rfcNormalizado}`);

    // Construir query string
    const queryParams = new URLSearchParams({
      rfc: rfcNormalizado,
    });

    try {
      // Usar makeRequest con autenticación JWT
      return await this.makeRequest<ConsultaRfcResponse[]>(
        `/api/general/consultarfc?${queryParams.toString()}`,
        {
          method: 'POST',
        },
        true // Requiere autenticación
      );
    } catch (error) {
      console.error('Error en consultarPorRfc:', error);
      throw error;
    }
  }

  // Consulta completa (RFC + nombre + nombre comercial)
  async consultarCompleta(params: ConsultaRfcRequest): Promise<ConsultaRfcResponse[]> {
    // Validaciones
    if (!params.rfc || params.rfc.trim().length === 0) {
      throw new Error('El RFC es obligatorio');
    }
    if (!params.nombre || params.nombre.trim().length === 0) {
      throw new Error('El nombre es obligatorio');
    }

    console.log(`🔍 Consulta completa RFC: ${params.rfc}`);

    // Construir query string
    const queryParams = new URLSearchParams({
      rfc: params.rfc.trim(),
      nombre: params.nombre.trim(),
    });
    
    if (params.nombreComercial) {
      queryParams.append('nombreComercial', params.nombreComercial.trim());
    }

    try {
      // Usar makeRequest con autenticación JWT
      return await this.makeRequest<ConsultaRfcResponse[]>(
        `/api/general/consultarfc?${queryParams.toString()}`,
        {
          method: 'POST',
        },
        true // Requiere autenticación
      );
    } catch (error) {
      console.error('❌ Error en consultarCompleta:', error);
      throw error;
    }
  }

  // Validar formato de RFC (básico)
  static validarRfc(rfc: string): boolean {
    if (!rfc) return false;
    
    // RFC personas físicas: 4 letras + 6 números + 3 caracteres
    // RFC personas morales: 3 letras + 6 números + 3 caracteres
    const rfcPattern = /^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
    
    return rfcPattern.test(rfc.trim().toUpperCase());
  }

  // Cambiar URL base (útil para desarrollo/producción)
  setBaseUrl(url: string): void {
    this.baseUrl = url;
    console.log(`🔧 URL de consultas actualizada: ${url}`);
  }
}

// Instancia singleton del servicio
export const consultaService = new ConsultaService();

// Funciones helper
export const validarRfc = ConsultaService.validarRfc;

export const formatearRfc = (rfc: string): string => {
  return rfc.trim().toUpperCase();
};