// Componente de protección de rutas - requiere autenticación
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../hooks/use-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rutas requiriendo autenticación
 * Si el usuario no está autenticado, redirige al login
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si no está autenticado y ya terminó de cargar, redirigir al login
    if (!isLoading && !isAuthenticated) {
      console.log('⚠️ Usuario no autenticado, redirigiendo al login...');
      router.replace('/(tabs)'); // Redirigir a la pantalla de tabs donde está el login
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostrar loading mientras verifica autenticación
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Verificando sesión...</Text>
      </View>
    );
  }

  // Si no está autenticado, no mostrar nada (se redirigirá)
  if (!isAuthenticated) {
    return null;
  }

  // Si está autenticado, mostrar el contenido protegido
  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});
