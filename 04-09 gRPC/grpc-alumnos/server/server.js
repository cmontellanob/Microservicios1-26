const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// ─── Cargar el contrato .proto ─────────────────────────────────────────────
const PROTO_PATH = path.join(__dirname, '../proto/alumno.proto');

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDef);
const alumnoPackage = grpcObject.alumnoPackage;

// ─── Base de datos en memoria ──────────────────────────────────────────────
const alumnos = {
  1: { id: 1, nombre: 'Carlos Pérez',   edad: 21, carrera: 'Ingeniería en Computación' },
  2: { id: 2, nombre: 'María López',    edad: 22, carrera: 'Derecho' },
  3: { id: 3, nombre: 'Juan Mamani',    edad: 20, carrera: 'Medicina' },
  4: { id: 4, nombre: 'Ana Quispe',     edad: 23, carrera: 'Contabilidad' },
  5: { id: 5, nombre: 'Luis Torrez',    edad: 21, carrera: 'Arquitectura' },
};

// ─── Implementación de métodos RPC ─────────────────────────────────────────

/**
 * Unary RPC: retorna un alumno por ID
 */
function obtenerAlumno(call, callback) {
  const id = call.request.id;
  console.log(`[Server] ObtenerAlumno solicitado → id: ${id}`);

  const alumno = alumnos[id];
  if (alumno) {
    callback(null, alumno);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      message: `Alumno con id ${id} no encontrado`,
    });
  }
}

/**
 * Server Streaming RPC: envía todos los alumnos uno a uno
 */
function listarAlumnos(call) {
  console.log('[Server] ListarAlumnos solicitado — enviando stream...');
  for (const alumno of Object.values(alumnos)) {
    call.write(alumno);
  }
  call.end();
  console.log('[Server] Stream finalizado');
}

// ─── Iniciar servidor ──────────────────────────────────────────────────────
const server = new grpc.Server();

server.addService(alumnoPackage.AlumnoService.service, {
  ObtenerAlumno: obtenerAlumno,
  ListarAlumnos: listarAlumnos,
});

const ADDRESS = '0.0.0.0:50051';

server.bindAsync(ADDRESS, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('[Server] Error al iniciar:', err.message);
    process.exit(1);
  }
  console.log(`[Server] Servidor gRPC escuchando en puerto ${port}`);
});
