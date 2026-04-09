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

// ─── Crear stub del cliente ────────────────────────────────────────────────
const client = new alumnoPackage.AlumnoService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// ─── Unary RPC: ObtenerAlumno ──────────────────────────────────────────────
function obtenerAlumno(id) {
  console.log(`\n[Cliente] Solicitando alumno con id: ${id}`);

  client.ObtenerAlumno({ id }, (error, response) => {
    if (error) {
      console.error('[Cliente] Error:', error.message);
    } else {
      console.log('[Cliente] Alumno recibido:');
      console.table(response);
    }
  });
}

// ─── Server Streaming RPC: ListarAlumnos ──────────────────────────────────
function listarAlumnos() {
  console.log('\n[Cliente] Solicitando lista completa de alumnos (streaming)...\n');

  const stream = client.ListarAlumnos({});
  const todos = [];

  stream.on('data', (alumno) => {
    todos.push(alumno);
  });

  stream.on('end', () => {
    console.log('[Cliente] Stream completado. Alumnos recibidos:');
    console.table(todos);
  });

  stream.on('error', (err) => {
    console.error('[Cliente] Error en stream:', err.message);
  });
}

// ─── Punto de entrada ──────────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.includes('--listar')) {
  listarAlumnos();
} else {
  // Por defecto busca el alumno con id=1; puede pasarse otro con --id=N
  const idArg = args.find(a => a.startsWith('--id='));
  const id = idArg ? parseInt(idArg.split('=')[1]) : 1;
  obtenerAlumno(id);
}
