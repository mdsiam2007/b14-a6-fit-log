import React from 'react';

const WorkoutCardSkeleton = () => {
    return (
        <div className="bg-[#14171e] border border-[#232732] rounded-2xl p-4 flex flex-col justify-between">
            <div>
                {/*Image Skeleton */}
                <div className="skeleton w-full h-48 rounded-xl mb-4 bg-gray-800/60" />

                {/* Tags Skeleton */}
                <div className="flex gap-2 mb-3">
                    <div className="skeleton w-16 h-5 rounded-full bg-gray-800/60" />
                    <div className="skeleton w-12 h-5 rounded-full bg-gray-800/60" />
                </div>

                {/* Title Skeleton */}
                <div className="skeleton w-3/4 h-6 rounded mb-2 bg-gray-800/60" />

                {/* Equipment Skeleton */}
                <div className="skeleton w-1/2 h-4 rounded mb-4 bg-gray-800/60" />
            </div>

            {/* Stats Row Skeleton */}
            <div className="border-t border-[#232732] pt-3 flex justify-between">
                <div className="skeleton w-16 h-4 rounded bg-gray-800/60" />
                <div className="skeleton w-16 h-4 rounded bg-gray-800/60" />
                <div className="skeleton w-12 h-4 rounded bg-gray-800/60" />
            </div>
        </div>
    );
};

export default WorkoutCardSkeleton;
