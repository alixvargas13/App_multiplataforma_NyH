/**
 * Script para obtener tu IP local actual Y actualizar config.ts automáticamente
 * Úsalo cuando tu IP cambie y necesites actualizar la configuración
 * 
 * Ejecutar: npm run get-ip
 */

const os = require('os');
const fs = require('fs');
const path = require('path');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  console.log('\n Buscando tu IP local...\n');
  console.log('═══════════════════════════════════════════════════\n');
  
  let detectedIP = null;
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Ignorar direcciones internas y IPv6
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(` Adaptador: ${name}`);
        console.log(` IP: ${iface.address}`);
        console.log(` Máscara: ${iface.netmask}`);
        console.log('─────────────────────────────────────────────────');
        
        // Si es una IP de red local típica (192.168.x.x o 10.x.x.x)
        if (iface.address.startsWith('192.168') || iface.address.startsWith('10.')) {
          console.log(`\n✅ Esta es tu IP correcta: ${iface.address}\n`);
          detectedIP = iface.address;
        }
      }
    }
  }
  
  if (detectedIP) {
    updateConfigFile(detectedIP);
  } else {
    console.log('❌ No se pudo detectar una IP local válida');
    console.log('💡 Asegúrate de estar conectado a una red local\n');
  }
  
  console.log('═══════════════════════════════════════════════════\n');
}

function updateConfigFile(newIP) {
  try {
    const configPath = path.join(__dirname, '..', 'services', 'config.ts');// Ruta al archivo config.ts
    
    // Leer el archivo actual
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Buscar la línea LOCAL_IP actual
    const ipRegex = /LOCAL_IP:\s*'([^']*)',/;
    const match = configContent.match(ipRegex);
    
    if (match) {
      const currentIP = match[1];
      
      if (currentIP === newIP) {
        console.log(`La IP ya está actualizada: ${currentIP}`);
        console.log(`No es necesario hacer cambios\n`);
        return;
      }
      
      // Actualizar la IP
      const updatedContent = configContent.replace(ipRegex, `LOCAL_IP: '${newIP}',`);
      
      // Escribir el archivo actualizado
      fs.writeFileSync(configPath, updatedContent, 'utf8');
      
      console.log('¡config.ts actualizado automáticamente!\n');
      console.log(`Cambios realizados:`);
      console.log(`IP anterior: ${currentIP}`);
      console.log(`IP nueva: ${newIP}\n`);
      console.log(`Ya puedes reiniciar tu app con la nueva IP\n`);
      
    } else {
      console.log('⚠️ No se pudo encontrar la línea LOCAL_IP en config.ts');
      console.log(`📝 Agrega manualmente esta línea:`);
      console.log(`   LOCAL_IP: '${newIP}',\n`);
    }
    
  } catch (error) {
    console.log(`❌ Error al actualizar config.ts: ${error.message}`);
    console.log(`📝 Actualiza manualmente:`);
    console.log(`   LOCAL_IP: '${newIP}',\n`);
  }
}

getLocalIP();
