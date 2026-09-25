import React from "react";

const MyPlanSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 space-y-8 animate-pulse">
            {/* 1. Header Skeleton */}
            <div className="space-y-2">
                <div className="skeleton w-48 h-10 rounded bg-gray-800/60" />
                <div className="skeleton w-80 h-4 rounded bg-gray-800/60" />
            </div>

            {/* 2. Unified Metrics Card Skeleton */}
            <div className="bg-[#14171e] border border-[#232732] rounded-2xl p-6 md:p-8 grid grid-cols-3 divide-x divide-[#232732]/70">
                <div className="pr-4 md:pr-8 space-y-2">
                    <div className="skeleton w-16 h-3 rounded bg-gray-800/60" />
                    <div className="skeleton w-12 h-10 rounded bg-gray-800/60" />
                </div>
                <div className="px-4 md:px-8 space-y-2">
                    <div className="skeleton w-16 h-3 rounded bg-gray-800/60" />
                    <div className="skeleton w-12 h-10 rounded bg-gray-800/60" />
                </div>
                <div className="pl-4 md:pl-8 space-y-2">
                    <div className="skeleton w-16 h-3 rounded bg-gray-800/60" />
                    <div className="skeleton w-12 h-10 rounded bg-gray-800/60" />
                </div>
            </div>

            {/* 3. Controls Row Skeleton */}
            <div className="flex justify-between items-center">
                <div className="skeleton w-48 h-9 rounded-xl bg-gray-800/60" />
                <div className="skeleton w-32 h-9 rounded-xl bg-gray-800/60" />
            </div>

            {/* 4. List items Skeleton */}
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="skeleton w-full h-24 rounded-2xl bg-gray-800/60" />
                ))}
            </div>
        </div>
    );
};

export default MyPlanSkeleton;

