# Solución al Challenge Sr. Developer CI/CD

Este repositorio contiene la solución completa para el challenge de Sr. Developer CI/CD. El objetivo principal fue diseñar e implementar un pipeline de CI/CD robusto y de principio a fin para una aplicación mínima de Node.js.

---
## 1. Análisis y Refactorización Inicial

El proyecto inicial requirió algunas mejoras clave para establecer una base limpia y escalable.

### Estructura y Limpieza del Código
- **Eliminación de Archivos Duplicados:** El estado inicial tenía un `server.js` y un directorio `__tests__` duplicados en la raíz. Estos fueron eliminados para centralizar la lógica de la aplicación dentro de la carpeta `/backend`.
- **Separación de Responsabilidades:** La aplicación fue refactorizada para separar responsabilidades, mejorando la mantenibilidad y la capacidad de testeo:
  - `handlers/`: Contiene funciones responsables de manejar las peticiones y respuestas HTTP.
  - `validators/`: Contiene funciones de lógica de negocio pura, completamente desacopladas del servidor web.

---
## 2. Nueva Funcionalidad: Validador de CUIT

Para crear un escenario de testing más realista, se añadió una nueva funcionalidad relevante para el negocio:
- **Endpoint:** `POST /cuit/validate`
- **Funcionalidad:** Valida un CUIT argentino basándose en su algoritmo de suma de verificación (checksum).
- **Request Body:** `{ "cuit": "20111111112" }`
- **Respuesta:** `{ "isValid": true, "cuit": "20111111112" }` o un `400 Bad Request` para formatos inválidos.

---
## 3. Estrategia de Testing

Se implementó una estrategia de testing de múltiples capas para asegurar la calidad y fiabilidad del código.

- **Tests Unitarios:** Prueban piezas individuales de lógica pura de forma aislada. El algoritmo de validación de CUIT en `validators/cuit.js` se testea de esta manera en `__tests__/cuit.logic.test.js`, asegurando que la lógica de negocio principal es correcta.
- **Tests de Integración:** Verifican que las diferentes partes de la aplicación funcionan juntas correctamente. El archivo `__tests__/app.test.js` utiliza `supertest` para realizar peticiones HTTP reales a los endpoints de la aplicación (`/health` y `/cuit/validate`) y afirmar que las respuestas (códigos de estado, cuerpos JSON) son correctas.

---
## 4. Dockerización

La aplicación está completamente containerizada usando Docker para asegurar un entorno de ejecución consistente y portable.

- **`Dockerfile`:** El Dockerfile está optimizado para producción, incluyendo:
  - Un enfoque de múltiples etapas para aprovechar el caché de Docker.
  - Una imagen base ligera y segura (`node:18-alpine`).
  - Instalación de dependencias solo de producción (`npm ci --omit=dev`).
  - Ejecución como un usuario no-root (`USER node`) como una práctica de seguridad crítica.
- **`docker-compose.yml`:** Se provee un archivo de Docker Compose para una experiencia de desarrollo local fluida. Reconstruye automáticamente la imagen ante cambios y utiliza una estrategia de volúmenes inteligente para sincronizar el código local mientras protege la carpeta `node_modules` del contenedor.

---
## 5. Pipeline de CI/CD

Se construyó un pipeline de CI/CD completo usando GitHub Actions (`.github/workflows/main.yml`). Automatiza todo el proceso desde el testing hasta el despliegue en producción.

### Diagrama de Flujo del Pipeline
```mermaid
graph TD
    A[Push a cualquier Rama] --> B{Ejecutar CI};
    B --> C[Build & Test];

    subgraph "Pipeline de CD (en merge a main)"
        D[Merge a main] --> E[Preparar Variables];
        E --> F[Build & Push de Imagen a GHCR];
        F --> G[Deploy a Staging];
        G --> H[Ejecutar Tests E2E en Staging];
        H --> I{¿Tests Pasan?};
        I -- Si --> J[Esperar Aprobación Manual 🛡️];
        J -- Aprobado --> K[Deploy a Producción];
        I -- No --> L[Detener Pipeline 🛑];
    end