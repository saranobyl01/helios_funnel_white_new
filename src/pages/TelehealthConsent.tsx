import Navbar from "@/components/Navbar";
import React, { useEffect } from "react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const TelehealthConsent = () => {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>
      <Navbar />
      <div className="mx-auto pt-[80.8px]">
        <div className="py-6 px-4 bg-[#eaebf5] mb-8">
          <h2 className="text-3xl lg:text-6xl sm:text-4xl md:text-3xl font-bold text-primary container mx-auto text-center md:text-left">
            Telehealth Consent
          </h2>
        </div>

        <div className="container px-3 sm:px-3 md:px-4 lg:px-8 mx-auto">
          <p className="text-lg mb-6 leading-relaxed">
            <span className="font-bold">Last Updated: 9/15/2025</span>
          </p>

          <p className="text-lg mb-6 leading-relaxed">
            This Telehealth Consent (“<b>Consent</b>”) applies to services obtained from the Professional Entities set forth in
            the <Link to={"/termsofservice"} className="text-blue-600 hover:underline underline"> FMmed’s Terms of Service</Link>.
          </p>

          <p className="text-lg mb-6 leading-relaxed">
            Telehealth allows healthcare providers to assess and treat patients remotely using technology. This may
            involve transmitting medical records, photos, and other personal and health information or data through
            various methods, including dynamic intake forms, live 2-way video, and audio. The electronic systems used in
            the Services incorporate network and software security protocols to protect the privacy and security of your
            personal information.
          </p>

          <p className="text-lg mb-6 leading-relaxed">
            <span className="text-lg font-bold mt-8">Possible benefits of telehealth: </span>
            Telehealth allows you to interact with your provider at times and locations that are convenient for you,
            without the need for an in-office appointment.
          </p>

          <p className="text-lg mb-6 leading-relaxed">
            <span className="text-lg font-bold mt-8"> Possible risks of telehealth: </span>
           Telehealth services are not a substitute for ongoing, in-person care from your local physician. Due to the limitations of remote consultations, including the absence of complete medical records and the inability to conduct physical examinations, certain risks are associated with telehealth.
          </p>

          <p className="text-lg mb-6 leading-relaxed">
            To ensure accurate diagnosis and appropriate treatment, you must provide a comprehensive medical history, including all diagnoses, treatments, medications, and supplements. Failure to disclose complete information may result in misdiagnosis, inappropriate treatment, or adverse outcomes.
          </p>

          <p className="text-lg mb-6 leading-relaxed">
           Your provider may recommend alternative care or an in-person consultation with your local physician and may decline to provide a prescription or other treatment based on the limitations of telehealth.
          </p>

          <p className="text-lg mb-6 leading-relaxed">
            Technical or internet disruptions, such as poor video and audio quality or service interruptions, may cause delays in evaluation, consultation, diagnosis, or treatment. If you experience technical difficulties during a telehealth session, please contact your provider immediately.
          </p>

          <p className="text-lg mb-6 leading-relaxed">
            Telehealth is not suitable for all medical situations, particularly emergencies or allergic/adverse reactions. In such cases, contact your local physician or proceed to an emergency room. For medical emergencies, dial 911.
          </p>

          <p className="text-lg mb-6 leading-relaxed">
            While security protocols are in place, there is a potential risk of privacy breaches and unauthorized disclosure of your health information.
          </p>

          <p className="text-lg mb-6 leading-relaxed">
           Please be aware that state laws may restrict or prohibit telehealth services, including the prescribing of medications, in your area.
          </p>

          <h3 className="text-lg font-bold mt-8 mb-3">
            Your consent to telehealth:
          </h3>
          <p className="text-lg mb-6 leading-relaxed">
            By using the Services, you acknowledge and agree to the following regarding telehealth services provided by
            the Professional Entities.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-2">
            Provider Qualifications and Service Limitations:
          </h3>
          <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed space-y-2">
            <li>Healthcare services are delivered via telehealth.</li>
            <li>Your provider may be a nurse practitioner or physician assistant, not a physician.</li>
            <li>You consent to treatment by these non-physician providers.</li>
            <li>Telehealth is an evolving field, and technology used may differ from or exceed what is described here.</li>
            <li>No specific outcomes, including from laboratory testing, are guaranteed. Your condition may not improve, or may worsen.</li>
            <li>Telehealth is not suitable for all conditions.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">
            Your Understanding and Responsibilities:
          </h3>
          <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed space-y-2">
            <li>You have discussed the benefits and risks of telehealth with your provider(s) and understand the alternatives.</li>
            <li>Online treatment sessions will not be recorded.</li>
            <li>Your provider(s) will assess your condition and determine, in their sole discretion, if telehealth is appropriate.</li>
            <li>By using the Services, you agree with your provider’s assessment and consent to telehealth treatment.</li>
            <li>You agree to provide accurate and complete medical information, including information from other healthcare providers, and emergency contact information.</li>
            <li>You understand that failure to provide accurate information could negatively impact your treatment.</li>
            <li>Your provider may determine that your condition requires in person treatment.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">Consent and Withdrawal:</h3>
          <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed space-y-2">
            <li>You may withdraw this consent at any time by providing written notice to your provider.</li>
            <li>Withdrawal will not affect actions taken prior to receipt of your notice, nor will it affect other provisions of this consent.</li>
            <li>Your ongoing use of the Services means that you agree to receive treatment via telehealth.</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2">
            Electronic Communication and Privacy:
          </h3>
          <p className="text-lg mb-6 leading-relaxed">
            <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed space-y-2">
                <li>
                    The Services involve electronic communication of your personal medical information.
                </li>
                <li>
                    Your information will be handled in accordance with applicable privacy policies.
                </li>
            </ul>
             
          </p>

          <h3 className="text-lg font-bold mt-6 mb-2">Financial Considerations:</h3>
          <ul className="list-disc pl-8 mb-6 text-lg leading-relaxed space-y-2">
            <li>You may obtain medical examinations from other healthcare providers.</li>
            <li>Prescriptions will be fulfilled by the Professional Entities’ pharmacy partners and shipped to you.</li>
            <li>You are responsible for all costs associated with the Service, including prescriptions, and will not seek reimbursement from Medicare.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TelehealthConsent;
