export interface Space {
  id: number;
  name: string;
  capacity: number;
  location: string;
}

export interface SpaceInput {
  name: string;
  capacity: number;
  location: string;
}