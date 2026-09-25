import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/app/lib/api";
import WorkoutActionButtons from "@/app/component/WorkoutActionButtons";
import { ArrowLeft, Clock, Flame, Star } from "lucide-react";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function WorkoutDetailPage({ params }: Props) {
    const { id } = await params;
    const workout = await getWorkoutById(id);

    if (!workout) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

            {/* Back to Workouts Link */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#ccff00] transition-colors font-medium"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Workouts
            </Link>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* 5-Column Layout Image Section */}
                <div className="lg:col-span-5 bg-[#14171e] border border-[#232732] rounded-3xl p-6 flex items-center justify-center overflow-hidden">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40">
                        <Image
                            src={workout.image}
                            alt={workout.name}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* 7-Column Layout */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-2">
                        {workout.muscleGroups.map((group, index) => (
                            <span
                                key={index}
                                className="bg-[#ccff00] text-black text-xs font-black uppercase px-3 py-1 rounded-full"
                            >
                                {group}
                            </span>
                        ))}
                    </div>

                    {/* Title & Description */}
                    <div>
                        <h1 className="font-oswald text-4xl md:text-5xl font-black uppercase text-white tracking-wide">
                            {workout.name}
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base mt-2 leading-relaxed">
                            {workout.description}
                        </p>
                    </div>

                    {/* Key Specs Table Panel */}
                    <div className="bg-[#14171e] border border-[#232732] rounded-2xl p-6 divide-y divide-[#232732]/70 text-xs">
                        <div className="flex items-center justify-between py-2.5">
                            <span className="text-gray-400 font-semibold tracking-wider uppercase text-[11px]">EQUIPMENT</span>
                            <span className="text-white font-medium">{workout.equipment}</span>
                        </div>
                        <div className="flex items-center justify-between py-2.5">
                            <span className="text-gray-400 font-semibold tracking-wider uppercase text-[11px]">DIFFICULTY</span>
                            <span className="text-white font-medium">{workout.difficulty}</span>
                        </div>
                        <div className="flex items-center justify-between py-2.5">
                            <span className="text-gray-400 font-semibold tracking-wider uppercase text-[11px]">SETS</span>
                            <span className="text-white font-medium">{workout.sets}</span>
                        </div>
                        <div className="flex items-center justify-between py-2.5">
                            <span className="text-gray-400 font-semibold tracking-wider uppercase text-[11px]">REPS</span>
                            <span className="text-white font-medium">{workout.reps}</span>
                        </div>
                        <div className="flex items-center justify-between py-2.5">
                            <span className="text-gray-400 font-semibold tracking-wider uppercase text-[11px]">DURATION</span>
                            <span className="text-white font-medium">{workout.duration} min</span>
                        </div>
                        <div className="flex items-center justify-between py-2.5">
                            <span className="text-gray-400 font-semibold tracking-wider uppercase text-[11px]">CALORIES</span>
                            <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
                        </div>
                        <div className="flex items-center justify-between py-2.5">
                            <span className="text-gray-400 font-semibold tracking-wider uppercase text-[11px]">RATING</span>
                            <span className="text-white font-medium">{workout.rating}</span>
                        </div>
                    </div>

                    {/* Instructions Section */}
                    <div className="space-y-3 pt-2">
                        <h3 className="font-oswald text-lg font-bold uppercase text-white tracking-wide">
                            INSTRUCTIONS
                        </h3>
                        <ol className="space-y-2.5 text-sm text-gray-300 list-decimal list-inside leading-relaxed">
                            {workout.instructions.map((step, idx) => (
                                <li key={idx} className="pl-1 text-gray-400">
                                    <span className="text-gray-300 font-normal">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Action Buttons */}
                    <WorkoutActionButtons workout={workout} />

                </div>

            </div>

        </div>
    );
}

