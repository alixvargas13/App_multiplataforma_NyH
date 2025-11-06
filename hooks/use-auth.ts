// Hook personalizado para manejar la autenticación
import { useEffect, useState } from 'react';
import { servicioAutentificacion } from '../services/servicioAutentificacion';

export interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (usuario: string, contrasena: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

/**
 * Hook personalizado para manejar la autenticación con JWT
 * Proporciona estado de autenticación y métodos para login/logout
 */
export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  /**
   * Verificar si el usuario está autenticado al cargar el componente
   */
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const authenticated = await servicioAutentificacion.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        const currentToken = await servicioAutentificacion.getToken();
        setToken(currentToken);
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      setIsAuthenticated(false);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Realizar login
   */
  const login = async (usuario: string, contrasena: string): Promise<boolean> => {
    try {
      const response = await servicioAutentificacion.login(usuario, contrasena);
      
      if (response.token) {
        setIsAuthenticated(true);
        setToken(response.token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  /**
   * Realizar logout
   */
  const logout = async () => {
    try {
      await servicioAutentificacion.logout();
      setIsAuthenticated(false);
      setToken(null);
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    token,
    login,
    logout,
    checkAuth,
  };
}
