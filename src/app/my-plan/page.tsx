"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePlan } from "@/app/context/PlanContext";
import MyPlanSkeleton from "@/app/component/MyPlanSkeleton";
import { Search, X, Check, Clock, Flame, Star } from "lucide-react";

function MyPlanContent() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");
    const [activeTab, setActiveTab] = useState<"today" | "saved">(
        tabParam === "saved" ? "saved" : "today"
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

    useEffect(() => {
        if (tabParam === "saved") {
            setActiveTab("saved");
        } else if (tabParam === "today") {
            setActiveTab("today");
        }
    }, [tabParam]);

    const {
        todayPlan,
        savedWorkouts,
        doneWorkoutIds,
        isLoaded,
        removeFromPlan,
        removeFromSaved,
        toggleMarkAsDone,
    } = usePlan();

    if (!isLoaded) {
        return <MyPlanSkeleton />;
    }

    const displayList = activeTab === "today" ? todayPlan : savedWorkouts;

    const filteredList = displayList
        .filter((workout) => {
            const q = searchQuery.toLowerCase();
            return (
                workout.name.toLowerCase().includes(q) ||
                workout.equipment.toLowerCase().includes(q) ||
                workout.muscleGroups.some((m) => m.toLowerCase().includes(q))
            );
        })
        .sort((a, b) => {
            if (sortBy === "duration") return b.duration - a.duration;
            if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
            if (sortBy === "rating") return b.rating - a.rating;
            return 0;
        });

    const totalExercises = displayList.length;
    const totalMinutes = displayList.reduce((acc, curr) => acc + curr.duration, 0);
    const totalCalories = displayList.reduce((acc, curr) => acc + curr.caloriesBurned, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 space-y-8">

            {/* 1. Header Section */}
            <div className="space-y-1">
                <h1 className="font-oswald text-4xl md:text-5xl font-black uppercase text-white tracking-wide">
                    MY PLAN
                </h1>
                <p className="text-gray-400 text-sm">
                    Cap of five lifts for today. Finish them, then load more.
                </p>
            </div>

            {/* 2. Unified Metrics Summary Row */}
            <div className="bg-[#14171e] border border-[#232732] rounded-2xl p-6 md:p-8 grid grid-cols-3 divide-x divide-[#232732]/70 text-left">
                <div className="pr-4 md:pr-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Exercises</span>
                    <div className="font-oswald text-4xl md:text-5xl font-black text-[#ccff00] mt-1.5">{totalExercises}</div>
                </div>
                <div className="px-4 md:px-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Minutes</span>
                    <div className="font-oswald text-4xl md:text-5xl font-black text-white mt-1.5">{totalMinutes}</div>
                </div>
                <div className="pl-4 md:pl-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Calories</span>
                    <div className="font-oswald text-4xl md:text-5xl font-black text-white mt-1.5">{totalCalories}</div>
                </div>
            </div>

            {/* 3. Controls Row: Pill Tabs & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Pill-styled Segmented Tabs */}
                <div className="bg-[#14171e] border border-[#232732] rounded-xl p-1 inline-flex w-fit text-xs font-semibold">
                    <button
                        onClick={() => {
                            setActiveTab("today");
                            setSearchQuery("");
                        }}
                        className={`px-4 py-2 rounded-lg transition-all ${
                            activeTab === "today"
                                ? "bg-[#222630] text-white shadow-sm"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Today&apos;s Plan
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("saved");
                            setSearchQuery("");
                        }}
                        className={`px-4 py-2 rounded-lg transition-all ${
                            activeTab === "saved"
                                ? "bg-[#222630] text-white shadow-sm"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        Saved
                    </button>
                </div>

                {/* Right: Search Input + Sort Dropdown */}
                <div className="flex items-center gap-3">
                    {displayList.length > 0 && (
                        <div className="relative w-full sm:w-44">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input input-sm w-full bg-[#14171e] border border-[#232732] focus:border-[#ccff00] text-white placeholder:text-gray-500 pl-8 pr-7 rounded-xl text-xs focus:outline-none"
                            />
                            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-2.5">
                        <span className="text-xs text-gray-400 font-medium whitespace-nowrap shrink-0">Sort By</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="bg-[#14171e] border border-[#232732] text-white text-xs px-3 py-1.5 rounded-xl focus:outline-none focus:border-[#ccff00] cursor-pointer"
                        >
                            <option value="duration">Duration</option>
                            <option value="calories">Calories</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 4. Workout List / Empty State */}
            {displayList.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                    <h3 className="font-oswald text-2xl font-black text-white uppercase tracking-wide">
                        NOTHING HERE YET
                    </h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">
                        Browse the library and add a lift to get today moving.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/"
                            className="btn bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold uppercase px-6 py-2.5 rounded-full border-none text-xs transition"
                        >
                            Go to workouts
                        </Link>
                    </div>
                </div>
            ) : filteredList.length === 0 ? (
                <div className="bg-[#14171e] border border-[#232732] rounded-2xl p-12 text-center space-y-2">
                    <p className="font-oswald text-xl text-white uppercase">No workouts found</p>
                    <p className="text-gray-400 text-sm">
                        No items match &ldquo;{searchQuery}&rdquo; in this tab.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredList.map((workout) => {
                        const isDone = doneWorkoutIds.includes(workout.id);

                        return (
                            <div
                                key={workout.id}
                                className={`bg-[#14171e] border transition duration-200 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 ${
                                    isDone ? "border-[#ccff00]/40 bg-[#14171e]/70 opacity-80" : "border-[#232732]"
                                }`}
                            >
                                {/* Left: Thumbnail & Info */}
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-black/40 flex-shrink-0">
                                        <Image
                                            src={workout.image}
                                            alt={workout.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className={`font-oswald text-lg md:text-xl font-bold uppercase text-white ${isDone ? "line-through text-gray-400" : ""}`}>
                                            {workout.name}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-0.5">{workout.equipment}</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mt-2">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" /> {workout.duration} min
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Flame className="w-3.5 h-3.5" /> {workout.caloriesBurned} kcal
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {workout.rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Action Buttons */}
                                <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end border-t border-[#232732]/50 md:border-t-0 pt-3 md:pt-0">
                                    <Link
                                        href={`/workout/${workout.id}`}
                                        className="btn btn-sm btn-ghost text-gray-300 hover:text-white text-xs font-semibold px-2 sm:px-3"
                                    >
                                        View Details
                                    </Link>

                                    <div className="flex items-center gap-2">
                                        {activeTab === "today" && (
                                            <button
                                                onClick={() => toggleMarkAsDone(workout)}
                                                className={`btn btn-sm text-xs font-extrabold uppercase gap-1.5 transition rounded-lg ${
                                                    isDone
                                                        ? "bg-[#ccff00] text-black border-none"
                                                        : "bg-[#ccff00] hover:bg-[#b5e600] text-black border-none"
                                                }`}
                                            >
                                                <Check className="w-3.5 h-3.5 stroke-[3]" /> {isDone ? "Done" : "Mark as Done"}
                                            </button>
                                        )}

                                        <button
                                            onClick={() =>
                                                activeTab === "today"
                                                ? removeFromPlan(workout.id)
                                                : removeFromSaved(workout.id)
                                            }
                                            className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-red-400"
                                            title="Remove"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}

export default function MyPlanPage() {
    return (
        <Suspense fallback={<MyPlanSkeleton />}>
            <MyPlanContent />
        </Suspense>
    );
}


