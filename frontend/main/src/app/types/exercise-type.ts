export interface ExerciseDto{
    id: number;
    name: string;
    imgUrl: string;
    muscle: string;
}

export interface ExerciseDataDto{
    name: string;
    muscle: string;
    gifUrl: string;
    description: number;
}

export interface ExerciseResponse{
    hasNext: boolean;
    exercises: ExerciseDto[];
}