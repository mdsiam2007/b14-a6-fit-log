"use client";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/app/context/PlanContext";


const Header = () => {
    const pathname = usePathname();
    const { todayPlan, savedWorkouts } = usePlan();

    return (
        <header className="sticky top-0 z-50 bg-[#0c0d10] border-b border-[#232732] px-3 sm:px-6 md:px-12 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
                
                {/* Logo */}
                <div className="shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src={logo} alt="FitLog Logo" width={26} height={26} className="w-6 h-6 sm:w-7 sm:h-7" />
                        <span className="font-oswald text-lg sm:text-xl font-black tracking-wider text-white">FITLOG</span>
                    </Link>
                </div>

                {/* Nav Links */}
                <nav className="flex items-center">
                    <ul className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold">
                        <li>
                            <Link
                                href="/"
                                className={`transition-colors ${
                                    pathname === "/"
                                        ? "text-[#ccff00] font-bold"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                Workouts
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/my-plan"
                                className={`transition-colors ${
                                    pathname === "/my-plan"
                                        ? "text-[#ccff00] font-bold"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                My Plan
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Badges */}
                <div className="shrink-0 flex items-center gap-2.5 sm:gap-4">
                    {/* Plan Badge */}
                    <Link
                        href="/my-plan?tab=today"
                        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-300 hover:text-white transition"
                    >
                        <span className="text-[11px] sm:text-xs font-medium">Plan</span>
                        <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black font-extrabold text-[10px] sm:text-[11px] flex items-center justify-center">
                            {todayPlan.length}
                        </span>
                    </Link>

                    {/* Saved Badge */}
                    <Link
                        href="/my-plan?tab=saved"
                        className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-300 hover:text-white transition"
                    >
                        <span className="text-[11px] sm:text-xs font-medium">Saved</span>
                        <span className="w-5 h-5 rounded-full border border-[#232732] text-xs text-gray-300 font-bold flex items-center justify-center">
                            {savedWorkouts.length}
                        </span>
                    </Link>
                </div>

            </div>
        </header>
    );
};


export default Header;