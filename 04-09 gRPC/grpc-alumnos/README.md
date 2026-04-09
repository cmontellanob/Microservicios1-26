# gRPC – Servicio de Alumnos (Node.js)

Proyecto de ejemplo basado en la presentación **"gRPC para Comunicación de Alto Rendimiento"**.

---

## Estructura del proyecto

```
grpc-alumnos/
├── proto/
│   └── alumno.proto        ← Contrato del servicio (fuente de verdad)
├── server/
│   ├── package.json
│   └── server.js           ← Servidor gRPC (puerto 50051)
└── client/
    ├── package.json
    └── client.js           ← Cliente gRPC con ejemplos Unary y Streaming
```

---

## Instalación

### 1. Instalar dependencias del servidor

```bash
cd server
npm install
```

### 2. Instalar dependencias del cliente

```bash
cd ../client
npm install
```

---

## Ejecución

### Terminal 1 – Iniciar el servidor

```bash
cd server
node server.js
```

Salida esperada:
```
[Server] Servidor gRPC escuchando en puerto 50051
```

### Terminal 2 – Ejecutar el cliente

**Obtener un alumno por ID (Unary RPC):**

```bash
cd client

# Alumno con id=1 (por defecto)
node client.js

# Alumno con id específico
node client.js --id=3
```

**Listar todos los alumnos (Server Streaming RPC):**

```bash
node client.js --listar
```

---

## Métodos RPC implementados

| Método          | Tipo              | Descripción                          |
|-----------------|-------------------|--------------------------------------|
| `ObtenerAlumno` | Unary RPC         | Retorna un alumno por su `id`        |
| `ListarAlumnos` | Server Streaming  | Envía todos los alumnos en un stream |

---

## Datos de prueba (en memoria)

| id | nombre        | edad | carrera                    |
|----|---------------|------|----------------------------|
| 1  | Carlos Pérez  | 21   | Ingeniería en Computación  |
| 2  | María López   | 22   | Derecho                    |
| 3  | Juan Mamani   | 20   | Medicina                   |
| 4  | Ana Quispe    | 23   | Contabilidad               |
| 5  | Luis Torrez   | 21   | Arquitectura               |

---

## Dependencias

- [`@grpc/grpc-js`](https://www.npmjs.com/package/@grpc/grpc-js) — Runtime gRPC para Node.js
- [`@grpc/proto-loader`](https://www.npmjs.com/package/@grpc/proto-loader) — Carga dinámica de archivos `.proto`

> **Node.js recomendado:** v18 o superior
