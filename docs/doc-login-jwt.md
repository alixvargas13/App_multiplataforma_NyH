# Implementación de Login con JWT

## Archivos Creados

### 1. **`services/authService.ts`**
Servicio principal para manejar la autenticación con JWT.

**Funcionalidades:**
- ✅ Login con usuario y contraseña
- ✅ Almacenamiento seguro del token JWT
- ✅ Obtención del token para peticiones autenticadas
- ✅ Logout (eliminar token)
- ✅ Verificar si el usuario está autenticado
- ✅ Obtener headers con Authorization Bearer Token

**Métodos principales:**
```typescript
await authService.login(usuario, contrasena) // Retorna { token, message, error }
await authService.getToken()                  // Obtiene el token guardado
await authService.logout()                    // Cierra sesión
await authService.isAuthenticated()           // Verifica si hay sesión activa
await authService.getAuthHeaders()            // Headers con token JWT
```

---

### 2. **`components/LoginView.tsx`**
Componente de UI para el formulario de login.

**Características:**
- Formulario con campos de usuario y contraseña
- Validaciones de campos vacíos
- Indicador de carga durante el login
- Alertas de éxito/error
- Callbacks personalizables (`onLoginSuccess`, `onLoginError`)
- Diseño responsivo y moderno

**Uso:**
```tsx
import LoginView from '../components/LoginView';

<LoginView
  onLoginSuccess={(token) => {
    console.log('Token recibido:', token);
    // Navegar a la pantalla principal
  }}
  onLoginError={(error) => {
    console.error('Error:', error);
  }}
/>
```

---

### 3. **`hooks/use-auth.ts`**
Hook personalizado de React para manejar el estado de autenticación.

**Retorna:**
```typescript
{
  isAuthenticated: boolean,  // Si el usuario está logueado
  isLoading: boolean,        // Si está verificando autenticación
  token: string | null,      // Token JWT actual
  login: (usuario, contrasena) => Promise<boolean>,
  logout: () => Promise<void>,
  checkAuth: () => Promise<void>
}
```

**Uso en componente:**
```tsx
import { useAuth } from '../hooks/use-auth';

function App() {
  const { isAuthenticated, login, logout, isLoading } = useAuth();
  
  if (isLoading) return <Text>Cargando...</Text>;
  
  if (!isAuthenticated) {
    return <LoginView onLoginSuccess={() => {}} />;
  }
  
  return <MenuPrincipal />;
}
```

---

### 4. **`services/api.ts` (Actualizado)**
Servicio de API actualizado para incluir el token JWT en todas las peticiones.

**Cambios:**
- Import de `authService`
- Método `makeRequest` acepta parámetro `requiresAuth`
- Headers automáticos con `Authorization: Bearer <token>`
- Métodos `getNomina()` y `getHospedaje()` requieren autenticación

**Ejemplo de uso:**
```typescript
// Esta petición incluye el token JWT automáticamente
const nomina = await apiService.getNomina();
```

---

## Flujo de Autenticación

### 1. **Login**
```
Usuario ingresa credenciales
    ↓
LoginView → authService.login(usuario, contrasena)
    ↓
POST /api/general/login
    ↓
Servidor valida y retorna JWT token
    ↓
Token guardado en AsyncStorage
    ↓
onLoginSuccess() callback ejecutado
```

### 2. **Peticiones Autenticadas**
```
Usuario hace una petición (ej: getNomina)
    ↓
apiService.makeRequest() con requiresAuth=true
    ↓
authService.getAuthHeaders() obtiene el token
    ↓
Headers: { Authorization: "Bearer <token>" }
    ↓
Petición enviada al servidor con token
    ↓
Servidor valida JWT y retorna datos
```

### 3. **Logout**
```
Usuario cierra sesión
    ↓
authService.logout()
    ↓
Token eliminado de AsyncStorage
    ↓
Usuario redirigido a LoginView
```

---

## Ejemplo de Implementación Completa

### En tu archivo principal (ej: `app/_layout.tsx`):

```tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../hooks/use-auth';
import LoginView from '../components/LoginView';
import MenuPrincipal from '../components/MenuPrincipal';

export default function App() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  // Mostrar pantalla de carga mientras verifica autenticación
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Verificando sesión...</Text>
      </View>
    );
  }

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <LoginView />;
  }

  // Si está autenticado, mostrar la app
  return (
    <View style={{ flex: 1 }}>
      <MenuPrincipal />
      <Button title="Cerrar Sesión" onPress={logout} />
    </View>
  );
}
```

---

## Seguridad

### Token JWT
- ✅ El token se almacena de forma segura en AsyncStorage
- ✅ Se envía en cada petición con el header `Authorization: Bearer <token>`
- ✅ El servidor debe validar el token en cada petición
- ✅ Si el token expira, el servidor retornará 401 Unauthorized

### Recomendaciones:
- El token JWT debe tener un tiempo de expiración razonable (ej: 24 horas)
- Implementar refresh tokens para renovar sesiones
- Nunca exponer el token en URLs o logs públicos
- Usar HTTPS en producción

---

## Testing del Login

### Credenciales de prueba:
```typescript
Usuario: "admin"
Contraseña: "12345"
```

### Verificar en consola:
```typescript
// Ver headers enviados
console.log(await authService.getAuthHeaders());
// Output: { "Content-Type": "application/json", "Authorization": "Bearer <token>" }

// Verificar token guardado
console.log(await authService.getToken());
// Output: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Dependencias Instaladas

- `@react-native-async-storage/async-storage` - Para almacenar el token de forma persistente

---

## Próximos Pasos

1. Integrar `LoginView` en la navegación de la app
2. Usar el hook `useAuth` para proteger rutas
3. Manejar expiración de tokens (401 errors)
4. Implementar refresh tokens si es necesario
5. Añadir pantalla de "Olvidé mi contraseña" si aplica

---

## Troubleshooting

### Error: "No se recibió token"
- Verificar que el servidor retorne `{ token: "..." }` en la respuesta
- Revisar la URL del API en `authService.ts`

### Error: "Cannot find module AsyncStorage"
- Ejecutar: `npm install @react-native-async-storage/async-storage`

### Token no se envía en peticiones
- Verificar que `requiresAuth: true` en `makeRequest()`
- Revisar que el token esté guardado: `await authService.getToken()`

---
