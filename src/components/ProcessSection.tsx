import { useNavigate } from "react-router-dom";
import questionnaireMobile1 from "@/assets/questionnaire-mobile1.jpg";
import questionnaireMobile2 from "@/assets/questionnaire-mobile2.jpg";
import questionnaireMobile3 from "@/assets/questionnaire-mobile3.jpg";

const ProcessSection = () => {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-0 md:px-4 lg:px-8">
        <div className="text-center mb-8 md:mb-12 px-4 md:px-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-gray-700"></span>
            <span className="text-gray-800">
              YOUR JOURNEY STARTS HERE
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 text-gray-800">
            <span className="text-black">
              Simple
            </span>{' '}
            Steps to{' '}
            <span className="text-black">
              Success
            </span>
          </h2>

          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Transform your health in just three easy steps. Our streamlined process makes weight loss accessible and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-10 mt-8 md:mt-16 max-w-6xl mx-auto px-4 md:px-0">
          {/* Step 01 */}
          <div className="relative flex flex-col gap-4">
            <div className="absolute -top-2 -left-1 w-10 h-10 rounded-lg bg-gray-700 text-white flex items-center justify-center text-sm font-extrabold shadow-md z-10">01</div>
            <div className="text-left pr-6 pt-10">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Complete Questionnaire</h3>
              <p className="text-gray-600 text-sm md:text-base">Complete a quick online questionnaire evaluated by licensed physicians</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span className="h-1 w-10 bg-gradient-to-r from-gray-700 to-gray-200 rounded-full"></span>
                ~5 minutes
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-xl border border-gray-100 p-4">
              <div className="w-full h-[180px] md:h-[200px] overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                <img src={questionnaireMobile1} alt="Questionnaire" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Step 02 */}
          <div className="relative flex flex-col gap-4">
            <div className="rounded-2xl bg-white shadow-xl border border-gray-100 p-4 order-2 md:order-1">
              <div className="w-full h-[180px] md:h-[200px] overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                <img src={questionnaireMobile2} alt="Doctor Approval" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="text-left pl-6 order-1 md:order-2">
              <div className="flex justify-start mb-2">
                <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center text-sm font-extrabold shadow-md">02</div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Get Doctor Approval</h3>
              <p className="text-gray-600 text-sm md:text-base">Your personalized treatment plan is reviewed and approved by board-certified physicians</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span className="h-1 w-10 bg-gradient-to-r from-black to-gray-200 rounded-full"></span>
                ~24 hours
              </div>
            </div>
          </div>

          {/* Step 03 */}
          <div className="relative flex flex-col gap-4">
            <div className="absolute -top-2 -left-1 w-10 h-10 rounded-lg bg-gray-700 text-white flex items-center justify-center text-sm font-extrabold shadow-md z-10">03</div>
            <div className="text-left pr-6 pt-10">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Receive Treatment</h3>
              <p className="text-gray-600 text-sm md:text-base">Your medication is delivered to your door within 48 hours, with continuous support</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <span className="h-1 w-10 bg-gradient-to-r from-gray-700 to-gray-200 rounded-full"></span>
                ~72 hours
              </div>
            </div>
            <div className="rounded-2xl bg-white shadow-xl border border-gray-100 p-4">
              <div className="w-full h-[180px] md:h-[200px] overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center">
                <img src={questionnaireMobile3} alt="Delivery" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Gradient Button Wrapper */}
        <div className="flex justify-center mt-12 md:mt-16 px-4 md:px-0">
          <div className="flex flex-nowrap justify-center gap-3 pt-2 md:pt-4 pb-2 md:pb-4 bg-gradient-to-r from-gray-900 to-gray-700 px-2 md:px-3 rounded-lg shadow-lg">

            {/* Ready to Start? Button - TRANSLUCENT */}
            <button
              onClick={() => navigate("/questionnaire")}
              className="text-white font-semibold h-12 md:h-14 px-6 md:px-8 text-sm md:text-base bg-white/20 backdrop-blur-sm rounded-lg transition-all hover:bg-white/30"
            >
              Ready to Start?
            </button>

            {/* Begin Your Journey → Button - SOLID WHITE */}
            <button
              onClick={() => navigate("/questionnaire")}
              className="text-gray-900 font-semibold h-12 md:h-14 px-6 md:px-8 text-sm md:text-base bg-white hover:bg-gray-50 rounded-lg transition-all"
            >
              Begin Your Journey →
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
