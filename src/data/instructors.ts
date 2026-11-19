export interface Instructor {
  id: number;
  name: string;
  email: string;
}

export const instructors: Instructor[] = [
  { id: 1, name: 'Ana Garcia', email: 'ana.garcia@academia.com' },
  { id: 2, name: 'Carlos Martinez', email: 'carlos.martinez@academia.com' },
  { id: 3, name: 'Laura Rodriguez', email: 'laura.rodriguez@academia.com' }
];