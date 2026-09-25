import WorkoutCardSkeleton from "./component/WorkoutCardSkeleton";

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-16">
            {/* Hero Skeleton */}
            <div className="skeleton w-full h-80 rounded-3xl bg-gray-800/40" />

            {/* Cards Skeleton Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                    <WorkoutCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
