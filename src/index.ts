import  express  from 'express'

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000

interface Course {
  id: number;
  title: string;
  capacity: number;
}

const courses: Course[] = [
  { id: 1, title: 'Programacion V', capacity: 17 },
  { id: 2, title: 'Calculo', capacity: 40 },
  { id: 3, title: 'Computacion en la nube', capacity: 25 },
  { id: 4, title: 'Ingles', capacity: 60 }
];

app.get('/',(req, res) => {
  res.status(200).json({ status: 'El servidor esta funcionando correctamente' })
});

app.get('/health',(req, res) => {
  res.status(200).json({ status: 'ok' })
});

app.get('/objetos',(req, res) => {
  res.status(200).json([
    {id:1, nombre: 'Computador', cantidad: 5},
    {id:2, nombre: 'Proyector', cantidad: 2},
    {id:3, nombre: 'Silla', cantidad: 20},
  ])
});
  
app.get('/courses/:id', (req, res) => {
  const id = Number(req.params.id);
  const course = courses.find(c => c.id === id);

  if (!course){
    return res.status(404).json({error: 'Curso no encontrado'});
  }

  res.status(200).json(course);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
});
