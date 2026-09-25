import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-[#0c0d10] border-t border-[#232732] px-4 md:px-12 py-6">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-2">
                    <Image src={logo} alt="FitLog Logo" width={26} height={26} />
                    <p className="font-oswald text-base font-black tracking-wider text-white">FITLOG</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">
                        © 2026 FitLog — Workout Library. Train hard, log honest.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
