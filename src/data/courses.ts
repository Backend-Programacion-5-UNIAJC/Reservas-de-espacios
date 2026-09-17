export interface Course {
  id: number;
  title: string;
  capacity: number;
}

export const courses: Course[] = [
  { id: 1, title: 'Programacion V', capacity: 17 },
  { id: 2, title: 'Calculo', capacity: 40 },
  { id: 3, title: 'Computacion en la nube', capacity: 25 },
  { id: 4, title: 'Ingles', capacity: 60 }
];