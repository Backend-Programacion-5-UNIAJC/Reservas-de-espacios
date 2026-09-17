import express from 'express';
import courseRoutes from './routes/course.routes';

const app = express();

app.use(express.json());

app.use('/courses', courseRoutes);

const PORT = process.env.PORT || 3000;

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