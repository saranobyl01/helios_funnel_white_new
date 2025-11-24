import { Star } from "lucide-react";
import AmyImage from "@/assets/AmyS.jpg";
import LizImage from "@/assets/LizSheridan.jpg";  

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-[#212121]">
      <div className="container mx-auto px]-4 md:px-8">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Trusted by many, your health is our priority.
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Testimonial Card 1 */}
            <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Supportive, effective, and truly life-changing
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                Helios Meds has been absolutely incredible! The setup was quick and easy,
                the communication has been great, and I feel like I have real support
                throughout this journey. I'm feeling confident and excited about my
                progress. Highly recommend for anyone looking for real change.
              </p>

              {/* Customer Info */}
              <div className="flex items-center space-x-3 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center text-amber-800 font-bold text-lg">
                    <img src={AmyImage} alt="Amy" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-bold text-gray-900">Amy S</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#908d8d] text-[#908d8d]" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-[#908d8d] text-sm">✓</span>
                    <span className="text-[#908d8d] text-sm font-medium">Verified Customer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Helios Meds exceeded my expectations
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed flex-1">
                After years of failed diets and weight loss attempts, Helios Meds has been
                a game-changer. The team is so kind and responsive, and the process
                has been smooth from start to finish. I'm feeling better, eating better,
                and I'm super motivated to continue this journey.
              </p>

              {/* Customer Info */}
              <div className="flex items-center space-x-3 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center text-blue-800 font-bold text-lg">
                    <img src={LizImage} alt="Liz" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-bold text-gray-900">Liz Sheridan</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#908d8d] text-[#908d8d]" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-[#908d8d] text-sm">✓</span>
                    <span className="text-[#908d8d] text-sm font-medium">Verified Customer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
