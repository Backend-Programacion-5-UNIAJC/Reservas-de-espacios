import express from 'express';
import courseRoutes from './routes/course.routes';
import instructorRoutes from './routes/instructor.routes';
import spaceRoutes from './routes/space.routes';
import reservationRoutes from './routes/reservation.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// 1. El parser de JSON SIEMPRE debe ir primero
app.use(express.json());

// 2. Ruta raíz y de salud
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'El servidor esta funcionando correctamente'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

// 3. Tus rutas de entidades (Courses, Instructors, Spaces y Reservations)
app.use('/courses', courseRoutes);
app.use('/instructors', instructorRoutes);
app.use('/spaces', spaceRoutes);
app.use('/reservations', reservationRoutes); // <-- ¡Aquí está integrada la ruta de reservas!

// Ruta adicional de alumnos si la quieres conservar
app.get('/alumnos', (req, res) => {
  res.status(200).json([
    { id: 1, nombre: 'Juan', apellido: 'Perez', edad: 20 },
    { id: 2, nombre: 'Maria', apellido: 'Gomez', edad: 22 },
    { id: 3, nombre: 'Pedro', apellido: 'Lopez', edad: 21 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});