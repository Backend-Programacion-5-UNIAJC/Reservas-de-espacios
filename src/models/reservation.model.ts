export interface Reservation {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  spaceId: number;
  courseId: number;
}

export interface ReservationInput {
  date: string | Date;
  startTime: string;
  endTime: string;
  spaceId: number;
  courseId: number;
}