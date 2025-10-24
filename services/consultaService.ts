// Servicio para consultas de RFC y verificación de datos
// Integración con ASP.NET Framework 4.8 API

// Configuración de la API de consultas
const CONSULTA_API_BASE_URL = 'http://localhost:5262'; // Ajustar según tu API

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
      console.log(`🔍 Haciendo consulta a: ${url}`);
      console.log(`📤 Parámetros:`, finalOptions.body);
      
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

    // Por ahora, simulamos la respuesta hasta que conectes tu API real
    console.log(`Consultando RFC: ${rfcNormalizado}`);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Datos simulados basados en tu ejemplo
    const resultadoSimulado: ConsultaRfcResponse[] = [
      {
        idProceso: 1,
        rfc: rfcNormalizado,
        nombre: "EJEMPLO PERSONA FISICA",
        nombreComercial: "COMERCIAL EJEMPLO",
        controlPersona: 1035591,
        controlMateria: 1195398,
        sistema: "NOMINA",
        tipoSucursal: "MATRIZ",
        situacion: "ACTIVA",
        mensajeTecnico: "Consulta realizada exitosamente (simulado)"
      }
    ];

    return resultadoSimulado;

    // TODO: Reemplazar con la llamada real a tu API
    /*
    return this.makeRequest<ConsultaRfcResponse[]>('/api/consulta-rfc', {
      method: 'POST',
      body: JSON.stringify({
        pc_rfc: rfcNormalizado,
        pc_nombre: '', // Opcional por ahora
        pc_nomcom: ''  // Opcional por ahora
      }),
    });
    */
  }

  // Consulta completa (RFC + nombre + nombre comercial)
  async consultarCompleta(params: ConsultaRfcRequest): Promise<ConsultaRfcResponse[]> {
    // Validaciones
    if (!params.rfc || params.rfc.trim().length === 0) {
      throw new Error('El RFC es obligatorio');
    }

    const parametros = {
      pc_rfc: params.rfc.trim().toUpperCase(),
      pc_nombre: params.nombre?.trim() || '',
      pc_nomcom: params.nombreComercial?.trim() || ''
    };

    // TODO: Implementar cuando tengas el endpoint completo
    console.log('🔍 Consulta completa:', parametros);
    
    // Por ahora, usar la misma lógica que consultarPorRfc
    return this.consultarPorRfc(params.rfc);
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