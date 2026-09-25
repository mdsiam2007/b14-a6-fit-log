"use client";

import React, { useState } from "react";
import { Workout } from "@/app/types/all_types";
import WorkoutCard from "./WorkoutCard";
import { Search, X } from "lucide-react";

interface Props {
    initialWorkouts: Workout[];
}

export default function WorkoutLibrary({ initialWorkouts }: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"default" | "duration" | "calories" | "rating">("default");

    const filteredWorkouts = initialWorkouts
        .filter((workout) => {
            const q = searchQuery.toLowerCase();
            const matchName = workout.name.toLowerCase().includes(q);
            const matchEquipment = workout.equipment.toLowerCase().includes(q);
            const matchMuscle = workout.muscleGroups.some((m) => m.toLowerCase().includes(q));
            return matchName || matchEquipment || matchMuscle;
        })
        .sort((a, b) => {
            if (sortBy === "duration") return b.duration - a.duration;
            if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
            if (sortBy === "rating") return b.rating - a.rating;
            return 0;
        });

    return (
        <div className="space-y-6">
            {/* Search & Sort Controls Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Search Input Box */}
                <div className="relative w-full md:max-w-md">
                    <input
                        type="text"
                        placeholder="Search workouts by name or muscle (e.g. Chest, Bicep)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input w-full bg-[#14171e] border border-[#232732] focus:border-[#ccff00] text-white placeholder:text-gray-500 pl-10 pr-9 rounded-xl text-sm focus:outline-none"
                    />
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Sort By Dropdown (Challenge Requirement C1) */}
                <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
                    <span className="text-xs text-gray-400 uppercase font-semibold whitespace-nowrap shrink-0">
                        Sort By:
                    </span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="select select-sm bg-[#14171e] border border-[#232732] focus:border-[#ccff00] text-white text-xs rounded-lg focus:outline-none cursor-pointer"
                    >
                        <option value="default">Default</option>
                        <option value="duration">Duration (High to Low)</option>
                        <option value="calories">Calories (High to Low)</option>
                        <option value="rating">Rating (High to Low)</option>
                    </select>
                </div>

            </div>

            {/* Workout Cards Grid */}
            {filteredWorkouts.length === 0 ? (
                <div className="bg-[#14171e] border border-[#232732] rounded-3xl p-12 text-center space-y-2">
                    <p className="font-oswald text-xl text-white uppercase">No workouts found</p>
                    <p className="text-gray-400 text-sm">
                        No exercises match &ldquo;{searchQuery}&rdquo;. Try another keyword.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWorkouts.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} />
                    ))}
                </div>
            )}
        </div>
    );
}

