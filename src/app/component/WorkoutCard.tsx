import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/app/types/all_types";
import { Clock, Flame, Star } from "lucide-react";

interface Props {
    workout: Workout;
}

const WorkoutCard = ({ workout }: Props) => {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="group bg-[#14171e] border border-[#232732] hover:border-gray-500 transition duration-300 rounded-2xl p-4 flex flex-col justify-between cursor-pointer"
        >
            <div>
                {/* Workout Thumbnail */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-black/40">
                    <Image
                        src={workout.image}
                        alt={workout.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Muscle Category Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {workout.muscleGroups.map((group, index) => (
                        <span
                            key={index}
                            className="bg-[#ccff00] text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full"
                        >
                            {group}
                        </span>
                    ))}
                </div>

                {/* Workout Title */}
                <h3 className="font-oswald text-xl font-bold uppercase text-white tracking-wide mb-1 group-hover:text-[#ccff00] transition-colors">
                    {workout.name}
                </h3>

                {/* Equipment */}
                <p className="text-xs text-gray-400 mb-4">{workout.equipment}</p>
            </div>

            {/* Stats Row with Vector Icons */}
            <div className="border-t border-[#232732] pt-3 flex items-center justify-between text-xs text-gray-300 font-medium">
                <span className="flex items-center gap-1.5 text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-[#ccff00]" /> {workout.duration} min
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                    <Flame className="w-3.5 h-3.5 text-orange-400" /> {workout.caloriesBurned} kcal
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {workout.rating}
                </span>
            </div>
        </Link>
    );
};

export default WorkoutCard;

