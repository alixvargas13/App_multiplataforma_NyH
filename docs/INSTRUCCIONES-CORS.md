<!-- ============================= -->
<!-- INSTRUCCIONES PARA HABILITAR CORS -->
<!-- ============================= -->

PASO 1: Agrega esta sección dentro de <system.webServer>, después de <handlers>:

```xml
<!-- Configuración de CORS para permitir peticiones desde la app móvil -->
<httpProtocol>
  <customHeaders>
    <add name="Access-Control-Allow-Origin" value="*" />
    <add name="Access-Control-Allow-Headers" value="Content-Type, Accept, Authorization" />
    <add name="Access-Control-Allow-Methods" value="GET, POST, PUT, DELETE, OPTIONS" />
    <add name="Access-Control-Max-Age" value="1728000" />
  </customHeaders>
</httpProtocol>
```

PASO 2: Tu sección <system.webServer> debe quedar así:

```xml
<system.webServer>

  <!-- Archivos estáticos (como HTML, CSS, JS) -->
  <staticContent>
    <!-- se puede agregar mimeMap aquí si necesitas nuevos tipos de archivo! -->
  </staticContent>
  
  <!-- Documento por defecto (inicio) -->
  <defaultDocument>
    <files>
      <add value="index.html" />
    </files>
  </defaultDocument>

  <!-- Manejadores HTTP -->
  <handlers>
    <remove name="ExtensionlessUrlHandler-Integrated-4.0" />
    <remove name="OPTIONSVerbHandler" />
    <remove name="TRACEVerbHandler" />
    <add name="ExtensionlessUrlHandler-Integrated-4.0" path="*." verb="*" type="System.Web.Handlers.TransferRequestHandler" preCondition="integratedMode,runtimeVersionv4.0" />
  </handlers>

  <!-- ⭐ AGREGAR ESTA SECCIÓN NUEVA ⭐ -->
  <httpProtocol>
    <customHeaders>
      <add name="Access-Control-Allow-Origin" value="*" />
      <add name="Access-Control-Allow-Headers" value="Content-Type, Accept, Authorization" />
      <add name="Access-Control-Allow-Methods" value="GET, POST, PUT, DELETE, OPTIONS" />
      <add name="Access-Control-Max-Age" value="1728000" />
    </customHeaders>
  </httpProtocol>

</system.webServer>
```

PASO 3 (ALTERNATIVO - Más seguro para producción):

Si quieres restringir CORS solo a tu app en desarrollo, cambia el asterisco por la URL específica:

```xml
<add name="Access-Control-Allow-Origin" value="http://localhost:8081" />
```

O para múltiples orígenes, necesitarás hacerlo desde código C# (ver más abajo).

---

OPCIÓN ALTERNATIVA: Configurar CORS desde código C# (Global.asax.cs)

Si el Web.config no funciona, agrega esto en tu archivo Global.asax.cs:

```csharp
using System;
using System.Web;
using System.Web.Http;

namespace TuNamespace
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            // Permitir CORS
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");

            // Manejar peticiones OPTIONS (preflight)
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.StatusCode = 200;
                HttpContext.Current.Response.End();
            }
        }
    }
}
```

---

DESPUÉS DE HACER LOS CAMBIOS:

1. Guarda el Web.config
2. Reinicia IIS o tu servidor de desarrollo
3. Prueba de nuevo el login desde tu app

El error 401 vacío debería desaparecer y ahora verás el mensaje real del servidor.

---

PARA PRODUCCIÓN (MÁS SEGURO):

En lugar de "*", especifica los orígenes permitidos:

```xml
<add name="Access-Control-Allow-Origin" value="https://tu-dominio.com,http://localhost:8081" />
```

O mejor aún, instala el paquete NuGet de CORS:
```powershell
Install-Package Microsoft.AspNet.WebApi.Cors
```

Y configúralo en WebApiConfig.cs:
```csharp
using System.Web.Http;
using System.Web.Http.Cors;

public static class WebApiConfig
{
    public static void Register(HttpConfiguration config)
    {
        // Habilitar CORS
        var cors = new EnableCorsAttribute("*", "*", "*");
        config.EnableCors(cors);
        
        // Rutas de la API
        config.MapHttpAttributeRoutes();
        
        config.Routes.MapHttpRoute(
            name: "DefaultApi",
            routeTemplate: "api/{controller}/{id}",
            defaults: new { id = RouteParameter.Optional }
        );
    }
}
```
