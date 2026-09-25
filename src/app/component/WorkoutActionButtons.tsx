"use client";

import React from "react";
import { Workout } from "@/app/types/all_types";
import { usePlan } from "@/app/context/PlanContext";
import { Plus, Bookmark, Check } from "lucide-react";

interface Props {
    workout: Workout;
}

const WorkoutActionButtons = ({ workout }: Props) => {
    const { addToPlan, saveForLater, todayPlan, savedWorkouts } = usePlan();

    const isAlreadyInPlan = todayPlan.some((w) => w.id === workout.id);
    const isPlanFull = todayPlan.length >= 5;
    const isAlreadySaved = savedWorkouts.some((w) => w.id === workout.id);

    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
            {/* Primary Button */}
            <button
                onClick={() => addToPlan(workout)}
                disabled={isAlreadyInPlan || isPlanFull}
                className={`btn uppercase px-6 py-3 rounded-xl border-none text-sm flex items-center justify-center gap-2 transition duration-200 shadow-sm ${isAlreadyInPlan
                        ? "bg-[#222630] text-[#ccff00] cursor-not-allowed opacity-90 font-bold"
                        : isPlanFull
                            ? "bg-gray-800 text-gray-400 cursor-not-allowed opacity-60 font-bold"
                            : "bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold"
                    }`}
            >
                {isAlreadyInPlan ? (
                    <>
                        <Check className="w-4 h-4 stroke-[3]" /> In Today&apos;s Plan
                    </>
                ) : isPlanFull ? (
                    <>
                        <Plus className="w-4 h-4 stroke-[3]" /> Plan Full (5/5 Lifts)
                    </>
                ) : (
                    <>
                        <Plus className="w-4 h-4 stroke-[3]" /> Add to today&apos;s plan
                    </>
                )}
            </button>

            {/* Secondary Button */}
            <button
                onClick={() => saveForLater(workout)}
                disabled={isAlreadySaved}
                className={`btn uppercase px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition duration-200 ${isAlreadySaved
                        ? "bg-[#1c1f26] border border-[#232732] text-gray-400 cursor-not-allowed font-medium"
                        : "btn-outline border-[#232732] hover:border-[#ccff00] hover:bg-[#ccff00]/10 text-white font-bold"
                    }`}
            >
                {isAlreadySaved ? (
                    <>
                        <Check className="w-4 h-4" /> Saved
                    </>
                ) : (
                    <>
                        <Bookmark className="w-4 h-4" /> Save for later
                    </>
                )}
            </button>
        </div>
    );
};

export default WorkoutActionButtons;

