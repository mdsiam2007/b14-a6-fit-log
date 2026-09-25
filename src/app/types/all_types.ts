import React from "react";

export interface MyPlanLayoutProps {
    children: React.ReactNode;
}

export interface HomePageLayoutProps {
    children: React.ReactNode;
}

export interface Workout {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    difficulty: string;
    duration: number;
    caloriesBurned: number;
    sets: number;
    reps: string;
    rating: number;
    description: string;
    instructions: string[];
}

export interface PlanContextType {
    todayPlan: Workout[];
    savedWorkouts: Workout[];
    doneWorkoutIds: number[];
    isLoaded: boolean;
    addToPlan: (workout: Workout) => void;
    removeFromPlan: (id: number) => void;
    saveForLater: (workout: Workout) => void;
    removeFromSaved: (id: number) => void;
    toggleMarkAsDone: (workout: Workout) => void;
}
