import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { RestTimer } from './RestTimer';
import { workoutData, WorkoutDay, Exercise, getTodayWorkout } from '@shared/workoutData';
import { 
  Calendar, 
  Trophy, 
  Target, 
  CheckCircle2, 
  Clock,
  Dumbbell,
  Flame
} from 'lucide-react';

export const WorkoutApp: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    const today = getTodayWorkout();
    if (today) {
      setSelectedDay(today);
    } else {
      setSelectedDay(workoutData[0]);
    }
  }, []);

  const toggleExercise = (exerciseId: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
    } else {
      newCompleted.add(exerciseId);
    }
    setCompletedExercises(newCompleted);
  };

  const getDayIcon = (dayId: string) => {
    switch (dayId) {
      case 'friday':
        return <Flame className="w-5 h-5" />;
      default:
        return <Dumbbell className="w-5 h-5" />;
    }
  };

  const getCompletionStats = () => {
    if (!selectedDay || selectedDay.exercises.length === 0) return { completed: 0, total: 0, percentage: 0 };
    
    const total = selectedDay.exercises.length;
    const completed = selectedDay.exercises.filter(ex => completedExercises.has(ex.id)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, percentage };
  };

  const stats = getCompletionStats();

  if (!selectedDay) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            FitHome
          </h1>
          <p className="text-muted-foreground">Seu treino em casa personalizado</p>
        </div>

        {/* Day Selection */}
        <Card className="mb-6 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Selecione o Dia
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1'>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {workoutData.map((day) => (
                <Button
                  key={day.id}
                  onClick={() => setSelectedDay(day)}
                  variant={selectedDay?.id === day.id ? "default" : "outline"}
                  className="flex flex-col items-center p-3 h-auto"
                >
                  {getDayIcon(day.id)}
                  <span className="text-xs mt-1">{day.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Workout Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Workout */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getDayIcon(selectedDay.id)}
                      {selectedDay.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedDay.title}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {stats.completed}/{stats.total} completos
                  </Badge>
                </div>
                
                {stats.total > 0 && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                )}
              </CardHeader>
              
              <CardContent>
                {selectedDay.exercises.length === 0 ? (
                  <div className="text-center py-8">
                    <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum exercício disponível</h3>
                    <p className="text-muted-foreground">
                      Este dia não possui exercícios definidos.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDay.exercises.map((exercise, index) => (
                      <div key={exercise.id}>
                        <div 
                          className={`flex items-center space-x-3 p-4 rounded-lg border transition-all ${
                            completedExercises.has(exercise.id) 
                              ? 'bg-primary/10 border-primary/30' 
                              : 'bg-muted/30 border-border'
                          }`}
                        >
                          <Checkbox
                            id={exercise.id}
                            checked={completedExercises.has(exercise.id)}
                            onCheckedChange={() => toggleExercise(exercise.id)}
                            className="w-5 h-5"
                          />
                          
                          <div className="flex-1">
                            <label 
                              htmlFor={exercise.id} 
                              className={`font-medium cursor-pointer ${
                                completedExercises.has(exercise.id) 
                                  ? 'line-through text-muted-foreground' 
                                  : 'text-foreground'
                              }`}
                            >
                              {exercise.name}
                            </label>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-muted-foreground">
                                <strong>{exercise.sets}</strong> séries
                              </span>
                              <span className="text-sm text-muted-foreground">
                                <strong>{exercise.reps}</strong> repetições
                              </span>
                            </div>
                          </div>

                          {completedExercises.has(exercise.id) && (
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        
                        {index < selectedDay.exercises.length - 1 && (
                          <Separator className="my-2" />
                        )}
                      </div>
                    ))}

                    {stats.percentage === 100 && (
                      <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
                        <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h3 className="font-semibold text-primary">Parabéns!</h3>
                        <p className="text-sm text-muted-foreground">
                          Você completou todos os exercícios de hoje!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Rest Timer Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-6">
              <RestTimer />
              
              {/* Quick Actions */}
              <Card className="mt-4 bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    onClick={() => setCompletedExercises(new Set())}
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                  >
                    Resetar Progresso
                  </Button>
                  <Button 
                    onClick={() => {
                      const allIds = selectedDay?.exercises.map(ex => ex.id) || [];
                      setCompletedExercises(new Set(allIds));
                    }}
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                  >
                    Marcar Tudo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
