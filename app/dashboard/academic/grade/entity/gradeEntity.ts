export interface Grade {
  id: string; 
  courseRegistrationId: string;

  assignmentScore: number;
  midtermScore: number;
  finalScore: number;
  finalGrade: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
