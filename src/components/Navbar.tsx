import { Button } from "@/components/ui/button";
import heliosmeds_logo from "@/assets/gettrim_logo.webp";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left - Logo and Navigation Links */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center bg-gray-900 px-4 py-2 shadow-md hover:bg-black transition-colors">
              <img
                src={heliosmeds_logo}
                alt="heliosmeds Logo"
                className="h-6 md:h-6 object-contain"
              />
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#how-it-works"
                className="text-sm md:text-base font-medium text-gray-800 hover:text-black transition-colors"
              >
                How it works
              </a>
              <a
                href="#pricing"
                className="text-sm md:text-base font-medium text-gray-800 hover:text-black transition-colors"
              >
                Pricing
              </a>
            </div>
          </div>

          {/* Right - Buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                window.open("https://member.heliosmeds.com/", "_blank")
              }
              className="text-xs md:text-sm px-2 md:px-4 text-gray-800 hover:text-black hover:bg-gray-100"
            >
              Sign In
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={() => navigate("/questionnaire")}
              className="text-xs md:text-sm px-3 md:px-5 text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-black hover:to-gray-800 font-semibold shadow-lg"
            >
              Get Started
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
