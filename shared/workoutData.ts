export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  completed: boolean;
}

export interface WorkoutDay {
  id: string;
  name: string;
  title: string;
  exercises: Exercise[];
}

export const workoutData: WorkoutDay[] = [
  {
    id: 'monday',
    name: 'Segunda',
    title: 'Peito + Tríceps + Abdômen',
    exercises: [
      { id: 'mon-1', name: 'Flexão de braço', sets: '4x', reps: 'até a falha', completed: false },
      { id: 'mon-2', name: 'Supino com halteres', sets: '3x', reps: '12', completed: false },
      { id: 'mon-3', name: 'Crucifixo com halteres', sets: '3x', reps: '12', completed: false },
      { id: 'mon-4', name: 'Tríceps testa com barra', sets: '3x', reps: '12', completed: false },
      { id: 'mon-5', name: 'Tríceps francês com um halter', sets: '3x', reps: '12', completed: false },
      { id: 'mon-6', name: 'Prancha abdominal', sets: '3x', reps: '30-60s', completed: false },
      { id: 'mon-7', name: 'Abdominal com peso nos braços estendidos', sets: '3x', reps: '15', completed: false }
    ]
  },
  {
    id: 'tuesday',
    name: 'Terça',
    title: 'Costas + Bíceps',
    exercises: [
      { id: 'tue-1', name: 'Remada curvada com barra montada', sets: '4x', reps: '12', completed: false },
      { id: 'tue-2', name: 'Remada unilateral com halter', sets: '3x', reps: '12 cada lado', completed: false },
      { id: 'tue-3', name: 'Pullover com halter deitado', sets: '3x', reps: '15', completed: false },
      { id: 'tue-4', name: 'Rosca direta com barra', sets: '3x', reps: '12', completed: false },
      { id: 'tue-5', name: 'Rosca alternada com halteres', sets: '3x', reps: '12', completed: false },
      { id: 'tue-6', name: 'Rosca martelo com halteres', sets: '3x', reps: '12', completed: false }
    ]
  },
  {
    id: 'wednesday',
    name: 'Quarta',
    title: 'Pernas + Glúteos + Abdômen',
    exercises: [
      { id: 'wed-1', name: 'Agachamento com barra', sets: '4x', reps: '12', completed: false },
      { id: 'wed-2', name: 'Afundo com halteres', sets: '3x', reps: '10 cada perna', completed: false },
      { id: 'wed-3', name: 'Stiff com barra ou halteres', sets: '3x', reps: '12', completed: false },
      { id: 'wed-4', name: 'Elevação de quadril com peso', sets: '3x', reps: '15', completed: false },
      { id: 'wed-5', name: 'Panturrilha em pé com halteres', sets: '3x', reps: '20', completed: false },
      { id: 'wed-6', name: 'Abdominal bicicleta', sets: '3x', reps: '20', completed: false },
      { id: 'wed-7', name: 'Prancha lateral', sets: '3x', reps: '30s cada lado', completed: false }
    ]
  },
  {
    id: 'thursday',
    name: 'Quinta',
    title: 'Ombros + Trapézio + Core',
    exercises: [
      { id: 'thu-1', name: 'Desenvolvimento com halteres ou barra', sets: '3x', reps: '12', completed: false },
      { id: 'thu-2', name: 'Elevação lateral com halteres', sets: '3x', reps: '15', completed: false },
      { id: 'thu-3', name: 'Elevação frontal', sets: '3x', reps: '12', completed: false },
      { id: 'thu-4', name: 'Encolhimento de ombros (trapézio)', sets: '3x', reps: '20', completed: false },
      { id: 'thu-5', name: 'Arnold Press', sets: '3x', reps: '10', completed: false },
      { id: 'thu-6', name: 'Prancha com toques nos ombros', sets: '3x', reps: '20', completed: false },
      { id: 'thu-7', name: 'Abdominal canivete com halter', sets: '3x', reps: '15', completed: false }
    ]
  },
  {
    id: 'friday',
    name: 'Sexta',
    title: 'Full Body HIIT + Queima de Gordura',
    exercises: [
      { id: 'fri-1', name: 'Agachamento com halteres', sets: '4 rodadas', reps: '45s', completed: false },
      { id: 'fri-2', name: 'Flexão de braço', sets: '4 rodadas', reps: '45s', completed: false },
      { id: 'fri-3', name: 'Remada com barra', sets: '4 rodadas', reps: '45s', completed: false },
      { id: 'fri-4', name: 'Desenvolvimento de ombros', sets: '4 rodadas', reps: '45s', completed: false },
      { id: 'fri-5', name: 'Burpees', sets: '4 rodadas', reps: '45s', completed: false },
      { id: 'fri-6', name: 'Prancha', sets: '4 rodadas', reps: '45s', completed: false }
    ]
  },
];

export const getTodayWorkout = (): WorkoutDay | null => {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Map Sunday=6, Monday=0, etc.
  return workoutData[dayMap[today]] || null;
};
