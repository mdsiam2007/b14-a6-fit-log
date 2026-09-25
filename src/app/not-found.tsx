import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-lg w-full text-center bg-[#15171d] border border-[#232732] rounded-3xl p-8 md:p-12 space-y-6 shadow-2xl">

                {/* 404 Neon Display Badge */}
                <div className="inline-block">
                    <span className="font-oswald text-7xl md:text-9xl font-black text-[#ccff00] tracking-tight block">
                        404
                    </span>
                </div>

                {/* Heading & Details */}
                <div className="space-y-2">
                    <h2 className="font-oswald text-2xl md:text-3xl font-black uppercase text-white tracking-wide">
                        PAGE NOT FOUND
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Looks like you dropped the weights! The page or workout you are looking for doesn&apos;t exist in our gym library.
                    </p>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                    <Link
                        href="/"
                        className="btn bg-[#ccff00] hover:bg-[#b5e600] text-black font-extrabold uppercase px-6 py-3 rounded-lg border-none text-sm inline-flex items-center gap-2 transition duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Workouts
                    </Link>
                </div>

            </div>
        </div>
    );
}

