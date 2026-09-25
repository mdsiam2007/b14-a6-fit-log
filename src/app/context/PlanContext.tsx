"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Workout, PlanContextType } from "@/app/types/all_types";
import toast from "react-hot-toast";


const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
    const [todayPlan, setTodayPlan] = useState<Workout[]>([]);
    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
    const [doneWorkoutIds, setDoneWorkoutIds] = useState<number[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const savedP = localStorage.getItem("fitlog_today_plan");
            const savedS = localStorage.getItem("fitlog_saved");
            const savedD = localStorage.getItem("fitlog_done");
            if (savedP) setTodayPlan(JSON.parse(savedP));
            if (savedS) setSavedWorkouts(JSON.parse(savedS));
            if (savedD) setDoneWorkoutIds(JSON.parse(savedD));
        } catch (e) {
            console.error(e);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
        localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
        localStorage.setItem("fitlog_done", JSON.stringify(doneWorkoutIds));
    }, [todayPlan, savedWorkouts, doneWorkoutIds, isLoaded]);

    const addToPlan = (workout: Workout) => {
        if (todayPlan.some((w) => w.id === workout.id)) {
            toast.error(`"${workout.name}" is already in today's plan!`, {
                style: { background: "#1c1f26", color: "#fff", border: "1px solid #374151" },
            });
            return;
        }
        if (todayPlan.length >= 5) {
            toast.error("Cap of 5 lifts reached for today! Finish them first.", {
                style: { background: "#1c1f26", color: "#fff", border: "1px solid #374151" },
            });
            return;
        }
        setTodayPlan((prev) => [...prev, workout]);
        toast.success(`"${workout.name}" added to Today's Plan!`, {
            style: { background: "#1c1f26", color: "#ccff00", border: "1px solid #222630" },
            iconTheme: { primary: "#ccff00", secondary: "#000" },
        });
    };

    const removeFromPlan = (id: number) => {
        setTodayPlan((prev) => prev.filter((w) => w.id !== id));
        setDoneWorkoutIds((prev) => prev.filter((wId) => wId !== id));
        toast("Removed from Today's Plan", {
            icon: "🗑️",
            style: { background: "#1c1f26", color: "#fff", border: "1px solid #374151" },
        });
    };

    const saveForLater = (workout: Workout) => {
        if (savedWorkouts.some((w) => w.id === workout.id)) {
            toast.error(`"${workout.name}" is already saved!`, {
                style: { background: "#1c1f26", color: "#fff", border: "1px solid #374151" },
            });
            return;
        }
        setSavedWorkouts((prev) => [...prev, workout]);
        toast.success(`"${workout.name}" saved for later!`, {
            style: { background: "#1c1f26", color: "#ccff00", border: "1px solid #222630" },
            iconTheme: { primary: "#ccff00", secondary: "#000" },
        });
    };

    const removeFromSaved = (id: number) => {
        setSavedWorkouts((prev) => prev.filter((w) => w.id !== id));
        toast("Removed from Saved list", {
            icon: "🗑️",
            style: { background: "#1c1f26", color: "#fff", border: "1px solid #374151" },
        });
    };

    const toggleMarkAsDone = (workout: Workout) => {
        const isDone = doneWorkoutIds.includes(workout.id);
        if (isDone) {
            setDoneWorkoutIds((prev) => prev.filter((id) => id !== workout.id));
            toast(`Marked "${workout.name}" as pending`, {
                icon: "⏳",
                style: { background: "#1c1f26", color: "#fff", border: "1px solid #374151" },
            });
        } else {
            setDoneWorkoutIds((prev) => [...prev, workout.id]);
            toast.success(`Completed "${workout.name}"! Great work! 💪`, {
                style: { background: "#1c1f26", color: "#ccff00", border: "1px solid #222630" },
                iconTheme: { primary: "#ccff00", secondary: "#000" },
            });
        }
    };

    return (
        <PlanContext.Provider
            value={{
                todayPlan,
                savedWorkouts,
                doneWorkoutIds,
                isLoaded,
                addToPlan,
                removeFromPlan,
                saveForLater,
                removeFromSaved,
                toggleMarkAsDone,
            }}
        >
            {children}
        </PlanContext.Provider>
    );
}

export function usePlan() {
    const context = useContext(PlanContext);
    if (!context) {
        throw new Error("usePlan must be used within a PlanProvider");
    }
    return context;
}
