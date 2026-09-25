import React, { Suspense } from "react";
import Image from "next/image";
import banner from "@/assets/banner.png";
import WorkoutCard from "./component/WorkoutCard";
import WorkoutCardSkeleton from "./component/WorkoutCardSkeleton";
import { getAllWorkouts } from "./lib/api";
import WorkoutLibrary from "./component/WorkoutLibrary";
import { ArrowDown } from "lucide-react";



const WorkoutListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <WorkoutCardSkeleton key={index} />
      ))}
    </div>
  );
};


async function WorkoutList() {
  const workouts = await getAllWorkouts();
  return <WorkoutLibrary initialWorkouts={workouts} />;
}

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-16">

      {/* 1. HERO BANNER SECTION */}
      <section className="bg-[#15171d] border border-[#232732] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-4">
          <span className="text-[#ccff00] text-xs font-bold tracking-widest uppercase">
            WORKOUT LIBRARY
          </span>
          <h1 className="font-oswald text-4xl md:text-6xl font-black uppercase text-white leading-tight">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <div className="pt-2">
            <a
              href="#library"
              className="btn bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold uppercase px-6 py-3 rounded-lg border-none text-sm transition inline-flex items-center gap-2"
            >
              BROWSE WORKOUTS <ArrowDown className="w-4 h-4 stroke-[3]" />
            </a>
          </div>
        </div>

        <div className="w-full md:w-auto flex justify-center">
          <Image
            src={banner}
            alt="Workout Equipment Banner"
            width={380}
            height={380}
            priority
            className="object-contain max-h-72 md:max-h-80 w-auto"
          />
        </div>
      </section>

      {/* 2. THE LIBRARY SECTION WITH SUSPENSE */}
      <section id="library" className="space-y-6">
        <div>
          <h2 className="font-oswald text-3xl font-black uppercase text-white tracking-wide">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <Suspense fallback={<WorkoutListSkeleton />}>
          <WorkoutList />
        </Suspense>
      </section>

    </div>
  );
}
