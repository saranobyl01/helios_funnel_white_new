import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroCoverImage from "@/assets/hero_cover_image.png";
import productCard from "@/assets/products.png";
import heroCoverMobile from "@/assets/hero_cover_image_mobile.png";
import productCardMobile from "@/assets/products_mobile.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-16 pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-20 overflow-hidden relative bg-white">
      <div className="container mx-auto px-0 md:px-4 lg:px-8">
        {/* Mobile layout */}
        <div className="grid md:hidden gap-6 items-start px-4">
          <div className="space-y-3 pt-6">
            <h1 className="text-2xl font-bold leading-tight text-gray-700">
              <span className="whitespace-nowrap">START YOUR <span className="font-extrabold text-black">WEIGHT LOSS</span></span>
              <br />
              <span className="whitespace-nowrap">JOURNEY WITH <span className="font-extrabold text-black">GLP-1</span> TODAY</span>
            </h1>
            <p className="text-sm text-gray-800">
              Experience breakthrough <span className="font-bold text-black">weight</span> management with our <span className="font-bold text-black">cutting-edge treatments:</span>
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex justify-start">
                <Button
                  variant="hero"
                  size="lg"
                  className="text-sm text-white font-semibold h-11 px-5 w-auto bg-gradient-to-r from-gray-900 to-gray-700 hover:from-black hover:to-gray-800 shadow-lg"
                  onClick={() => navigate("/questionnaire")}
                >
                  GET STARTED
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              {/* <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors italic">Important Safety Information</a> */}
            </div>
            <div className="w-full flex justify-center">
              <img src={productCardMobile} alt="Product card mobile" className="w-full max-w-sm h-auto rounded-lg shadow-sm" />
            </div>
            <div className="w-full flex justify-center">
              <img src={heroCoverMobile} alt="Hero mobile" className="w-full max-w-md h-auto object-contain" />
            </div>
          </div>
        </div>

        {/* Desktop/tablet layout */}
        <div className="hidden md:grid lg:grid-cols-2 mb-12 gap-8 md:gap-12 lg:gap-16 items-center px-4 md:px-0">
          {/* Left Content */}
          <div className="space-y-3 md:space-y-4 pt-4 md:pt-6 lg:pt-8">

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-700">
              <span className="whitespace-nowrap">START YOUR <span className="font-extrabold text-black">WEIGHT LOSS</span></span> <span className="whitespace-nowrap">JOURNEY WITH <span className="font-extrabold text-black">GLP-1</span> TODAY</span>
            </h1>

            <p className="text-sm md:text-base lg:text-lg text-gray-800 max-w-2xl whitespace-nowrap">
              Experience breakthrough <span className="font-bold text-black">weight</span> management with our <span className="font-bold text-black">cutting-edge treatments:</span>
            </p>

            <div className="flex flex-col gap-2 md:gap-3 pt-1 md:pt-2">
              <div className="flex justify-start">
                <Button
                  variant="hero"
                  size="lg"
                  className="text-sm md:text-base text-white font-semibold h-12 md:h-14 px-6 md:px-8 w-auto bg-gradient-to-r from-gray-900 to-gray-700 hover:from-black hover:to-gray-800 shadow-lg"
                  onClick={() => navigate("/questionnaire")}
                >
                  GET STARTED
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
              {/* <a 
                href="#" 
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors italic"
              >
                Important Safety Information
              </a> */}

            </div>

            {/* Product Card Image */}
            <div className="flex justify-start mt-4 max-w-2xl">
              <img
                src={productCard}
                alt="Product Card"
                className="w-full max-w-lg h-auto rounded-lg shadow-sm"
              />
            </div>


          </div>

          {/* Right Content - Composite Hero Image */}
          <div className="flex justify-end items-center h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] relative">
            <div className="relative w-full h-full max-w-3xl">
              {/* Composite Hero Image */}
              <img
                src={heroCoverImage}
                alt="Hero Cover"
                className="w-full h-41 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
