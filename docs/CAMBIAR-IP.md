# 🔧 Guía Rápida: IP Automática 

**Cuando ejecutes cualquiera de estos comandos:**
- `npm start` 
- `npm run android`
- `npm run ios` 
- `npm run web`
- `npm run get-ip` (manual)

**El sistema automáticamente:**
1. **Detecta tu IP actual**
2. **Actualiza `config.ts`**  
3. **Te confirma los cambios**
4. **Inicia la app con la IP correcta**

### **Ejemplo de lo que verás:**
```
 Buscando tu IP local...

Adaptador: Ethernet
IP: 192.168.137.1
Esta es tu IP correcta: 192.168.137.1

config.ts actualizado automáticamente!

📝 Cambios realizados:
   ❌ IP anterior: 172.21.3.51
   ✅ IP nueva: 192.168.137.1

Ya puedes reiniciar tu app con la nueva IP
```
## 📱 Si quieres forzar una actualización manual

```bash
npm run get-ip
```

## ⚠️ RECORDATORIO (sigue igual)

**IIS Express necesita permisos de administrador:**

1. **⚠️ IMPORTANTE:** Ejecuta Visual Studio **COMO ADMINISTRADOR**
2. Abre tu proyecto y presiona F5
3. El resto es automático 
