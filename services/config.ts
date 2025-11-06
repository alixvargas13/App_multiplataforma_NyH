// Configuración de URLs del API
// Centraliza las URLs para cambiar fácilmente entre desarrollo y producción

import { Platform } from 'react-native';

// 🔧 CONFIGURACIÓN DE RED - cambiar aqui SI LA IP CAMBIA en consulta a nmp run get-ip!
const NETWORK_CONFIG = {
  LOCAL_IP: '192.168.137.1',  // la ip cambiará al ejecutar npm start!
  PORT: '44306',
  PROTOCOL: 'http',
};

export const API_CONFIG = {
  // URL base del API (detecta automáticamente web vs móvil)
  BASE_URL: Platform.OS === 'web' 
    ? `${NETWORK_CONFIG.PROTOCOL}://localhost:${NETWORK_CONFIG.PORT}`
    : `${NETWORK_CONFIG.PROTOCOL}://${NETWORK_CONFIG.LOCAL_IP}:${NETWORK_CONFIG.PORT}`,
  
  // Endpoints
  ENDPOINTS: {
    LOGIN: '/api/general/login',
    CONSULTA_RFC: '/api/general/consultarfc',
    NOMINA: '/api/general/nomina',
    HOSPEDAJE: '/api/general/hospedaje',
  },
  
  // Configuración de autenticación
  AUTH: {
    TOKEN_KEY: 'jwt_token',
    TOKEN_EXPIRATION_MINUTES: 60, // El token dura 60 minutos
  },
  
  // Configuración para desarrollo
  DEV: {
    // Si estás en desarrollo y tienes problemas con certificados HTTPS
    // puedes usar HTTP en lugar de HTTPS (solo para desarrollo local)
    USE_HTTP: false, // Cambiar a true si tienes problemas con HTTPS
    HTTP_URL: 'http://localhost:5262',
  }
};

// Helper para obtener la URL base según configuración
export const getBaseUrl = (): string => {
  if (API_CONFIG.DEV.USE_HTTP) {
    console.warn('⚠️ Usando HTTP en lugar de HTTPS (solo desarrollo)');
    return API_CONFIG.DEV.HTTP_URL;
  }
  return API_CONFIG.BASE_URL;
};

// Helper para construir URLs completas
export const getApiUrl = (endpoint: string): string => {
  return `${getBaseUrl()}${endpoint}`;
};
