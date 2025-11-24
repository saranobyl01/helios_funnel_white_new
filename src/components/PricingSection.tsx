import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, DollarSign, Gift, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import semaglutideBottleDesktop from "@/assets/semaglutide_bottle_desktop.png";
import semaglutideBottleMobile from "@/assets/semaglutide_bottle_mobile.png";
import trizepatideBottleDesktop from "@/assets/trizepatide-_bottle_desktop.png";
import trizepatideBottleMobile from "@/assets/trizepatide-_bottle_mobile.png";

const PlanRow = ({ label, price, total, accent }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between py-2 border-b border-gray-200 last:border-none">
    <span className="font-medium text-gray-900">{label}</span>
    <span className={`text-xl font-bold ${accent}`}>{price}</span>
    <span className="ml-0 md:ml-3 text-gray-500 text-md">{total}</span>
  </div>
);

// UPDATED DetailRow with CIRCULAR BACKGROUND
const DetailRow = ({ icon: Icon, text, isGreen = false }) => (
  <div className="flex items-center gap-3 text-sm text-gray-700 py-1">
    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isGreen ? 'bg-gray-700' : 'bg-black'
      }`}>
      <Icon className="w-4 h-4 text-white" />
    </div>
    <span className="w-[89%]">{text}</span>
  </div>
);

const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="pricing"
      className="py-8 md:py-12 bg-white"
    >
      <div className="container mx-auto px-0 md:px-4 lg:px-8">
        <div className="text-center mb-12 px-4 md:px-0">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold mb-3">
            <span className="text-gray-800">
              PRICING PLANS
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 text-gray-900">
            Proven Weight Loss backed by <span className="text-black">science</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the treatment that's right for you. Both options include clinical support and proven results.
          </p>
          {/* GRADIENT LINE UNDER HEADING */}
          <div className="flex justify-center mt-4">
            <span className="h-1 w-10 bg-gradient-to-r from-gray-900 to-gray-400 rounded-full"></span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-0">
          <div className="grid md:grid-cols-2 gap-8">
            {/* GLP-1RM Card */}
            <Card className="p-8 border-2 border-gray-900 shadow-2xl rounded-3xl bg-white hover:scale-[1.025] transition-transform relative">
              {/* MOST POPULAR Badge - Top Border */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg">
                  <span className="text-white text-xs font-bold">
                    Most Popular
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Content Section */}
                <div className="text-center pt-4">
                  <h3 className="text-2xl font-black mb-2 text-black">
                    Semaglutide + B12
                  </h3>

                  {/* Most Prescribed Line */}
                  <div className="flex items-center justify-center mb-4 gap-1">
                    <Star className="w-4 h-4 text-gray-700 fill-gray-700" />
                    <span className="text-sm font-semibold text-gray-700">
                      Most Prescribed
                    </span>
                  </div>

                  {/* Price Section - /month BESIDE price */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <p className="text-3xl md:text-4xl font-black text-gray-900">
                        $199.97
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        /month
                      </p>
                    </div>
                  </div>

                  {/* Description section - GREEN */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-3">
                    <DetailRow
                      icon={Check}
                      text="Same active ingredient as Ozempic® & Wegovy®"
                      isGreen={true}
                    />
                    <DetailRow
                      icon={Check}
                      text="+ 15-20% Weight Loss*"
                      isGreen={true}
                    />
                    <DetailRow
                      icon={Check}
                      text="+ Works on 1 GLP Receptor"
                      isGreen={true}
                    />
                  </div>

                  {/* Image section semaglutide + b12 */}
                  <div className="flex justify-center items-center mb-6">
                    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                      {/* Mobile Image */}
                      <img
                        src={semaglutideBottleMobile}
                        alt="Semaglutide + B12 Product"
                        className="w-full h-full object-contain drop-shadow-2xl md:hidden"
                      />
                      {/* Desktop Image */}
                      <img
                        src={semaglutideBottleDesktop}
                        alt="Semaglutide + B12 Product"
                        className="hidden md:block w-full h-full object-contain drop-shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-xl"></div>
                    </div>
                  </div>
                </div>

                {/* Get Started Button */}
                <Button
                  variant="hero"
                  className="w-full text-white font-bold text-lg py-3 rounded-xl shadow-lg bg-gradient-to-r from-gray-900 to-gray-700 hover:from-black hover:to-gray-800"
                  size="lg"
                  onClick={() => navigate("/questionnaire")}
                >
                  Get Started
                </Button>
              </div>
            </Card>

            {/* GLP-1 GIPR Card */}
            <Card className="p-8 border-2 border-gray-900 shadow-2xl rounded-3xl bg-white hover:scale-[1.025] transition-transform relative">
              {/* PREMIUM CHOICE Badge - Top Border */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg">
                  <span className="text-white text-xs font-bold">
                    Premium Choice
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Content Section */}
                <div className="text-center pt-4">
                  <h3 className="text-2xl font-black mb-2 text-black">
                    Tirzepatide + B12
                  </h3>

                  {/* Most Effective Line */}
                  <div className="flex items-center justify-center mb-4 gap-1">
                    <Star className="w-4 h-4 text-gray-700 fill-gray-700" />
                    <span className="text-sm font-semibold text-gray-700">
                      Most Effective
                    </span>
                  </div>

                  {/* Price Section - /month BESIDE price */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <p className="text-3xl md:text-4xl font-black text-gray-900">
                        $399.97
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        /month
                      </p>
                    </div>
                  </div>

                  {/* Description section - BLUE */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left space-y-3">
                    <DetailRow
                      icon={Check}
                      text="Same active ingredient as Mounjaro® & Zepbound®"
                    />
                    <DetailRow
                      icon={Check}
                      text="+ 20%-25% Weight Loss*"
                    />
                    <DetailRow
                      icon={Check}
                      text="+ Works on 2 GLP Receptors"
                    />
                  </div>
                  {/* Image section tirzepatide + b12 */}
                  <div className="flex justify-center items-center mb-6">
                    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                      {/* Mobile Image */}
                      <img
                        src={trizepatideBottleMobile}
                        alt="Tirzepatide + B12 Product"
                        className="w-full h-full object-contain drop-shadow-2xl md:hidden"
                      />
                      {/* Desktop Image */}
                      <img
                        src={trizepatideBottleDesktop}
                        alt="Tirzepatide + B12 Product"
                        className="hidden md:block w-full h-full object-contain drop-shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-xl"></div>
                    </div>
                  </div>
                </div>

                {/* Get Started Button */}
                <Button
                  variant="hero"
                  className="w-full text-white font-bold text-lg py-3 rounded-xl shadow-lg bg-gradient-to-r from-gray-900 to-gray-700 hover:from-black hover:to-gray-800"
                  size="lg"
                  onClick={() => navigate("/questionnaire")}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto px-4 md:px-0 mt-8">
          <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
            <p className="text-xs text-gray-600 leading-relaxed">
              {/* <strong>Disclaimer:</strong> */}
               Compounded tirzepatide and semaglutide contain the same active ingredients as FDA-approved products like Mounjaro®, Zepbound®, Ozempic®, and Wegovy®, but compounded medications are not FDA-approved and have not been reviewed for safety, effectiveness, or quality. They are prescribed and prepared only for individual patients by a licensed compounding pharmacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;