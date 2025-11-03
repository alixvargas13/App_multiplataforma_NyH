// Estilos para LoginView - Diseño basado en Figma
import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  // Contenedor principal con fondo
  backgroundImage: {
    flex: 1,
    padding: 16,
  },
  backgroundImageWeb: {
    backgroundSize: '25% 25%',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Tarjeta de login
  loginCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
    elevation: 20,
  },

  // Header con logo
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#5F1B2D', // Color vino del diseño
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    elevation: 8,
  },
  logoInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5F1B2D',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#484747', // Gris del diseño
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Formulario
  formContainer: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputIconContainer: {
    padding: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 2,
    backgroundColor: '#fef2f2',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
    fontWeight: '600',
  },
  errorBanner: {
    marginBottom: 16,
    padding: 14,
    backgroundColor: '#fee2e2',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.15)',
    elevation: 3,
  },
  errorBannerText: {
    color: '#991b1b',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Opciones (Recordarme y Olvidaste contraseña)
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#5F1B2D',
    borderColor: '#5F1B2D',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#5F1B2D',
    fontWeight: '500',
  },

  // Botón de login
  loginButton: {
    backgroundColor: '#5F1B2D', // Color vino del diseño
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Información de credenciales
  infoContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 11,
    color: '#92400e',
    textAlign: 'center',
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
