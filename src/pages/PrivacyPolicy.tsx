import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useEffect } from "react";

const PrivacyPolicy = () => {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>
    <Navbar />
    <div className="mx-auto pt-[80.8px] mb-8">
        <div className="py-6 px-4 bg-[#eaebf5] mb-8">
          <h2 className="text-3xl lg:text-6xl sm:text-4xl md:text-3xl font-bold text-primary container mx-auto text-center md:text-left">
            Privacy Policy
          </h2>
        </div>
              {/* CONTENT SECTION */}
        <div className="container px-3 sm:px-3 md:px-4 lg:px-8 mx-auto">
          <p className="text-lg leading-relaxed mb-6">
            <span className="font-bold">Last Updated: September 15, 2025</span>
          </p>


      <h2 className="text-lg font-bold mb-4">Introduction</h2>
      <p className="mb-4 text-lg leading-relaxed">
        Helios Meds d/b/a FMMeds (the “Company,” “we,” “our,” or “us”) respects your privacy, and we are
        committed to protecting it through our compliance with this Privacy Policy.
      </p>
      <p className="mb-4 text-lg leading-relaxed">
        This Privacy Policy (our “Privacy Policy”) describes the types of information we may collect from you or that you
        may provide when you visit the website  <a href="https://www.fmmeds.com" className="text-blue-600 hover:underline underline">
              www.fmmeds.com
            </a>{" "} (our “Site”), and our practices for collecting, using,
        maintaining, protecting, and disclosing that information.
      </p>
      <p className="mb-4 text-lg leading-relaxed">This Privacy Policy applies to information we collect:</p>

      <ul className="list-disc pl-6 mb-4 space-y-2 text-lg leading-relaxed">
        <li>on our Site;</li>
        <li>in email, text, and other electronic messages between you and our Site; and</li>
        <li>
          through our advertising and applications on third-party websites and services, if those applications or
          advertising include links to this Privacy Policy.
        </li>
      </ul>

      <p className="mb-4 text-lg leading-relaxed">It does not apply to information collected by:</p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-lg leading-relaxed">
        <li>
          us offline or through any other means, including on any other website operated by the Company or any third
          party; or
        </li>
        <li>
          any third party, including through any application or content (including advertising) that may link to or be
          accessible from or on the Site, or any third-party website or application that may redirect you to our Site.
        </li>
      </ul>

      <h2 className="text-lg font-bold mb-4">Relationship to Professional Entities / HIPAA</h2>
      <p className="mb-4 text-lg leading-relaxed">
        The Company is not a medical group and is not a “covered entity” as defined by the Health Insurance Portability and
        Accountability Act of 1996 and its implementing regulations (collectively, “HIPAA”). Any telemedicine consults
        obtained through our Site are provided by independent medical practitioners, including, but not limited to, White
        Label MD, LLC, WLMD Network, M & D Integrations, Inc. d/b/a MD Integrations (MDI), MDI Medical Group P.C., and MD
        Integrations & Wellness Provider Group, P.A. (collectively, the “Professional Entities” and each, a “Provider”).
      </p>
      <p className="mb-4 text-lg leading-relaxed">
        The Professional Entities, not the Company, are responsible for HIPAA compliance, including providing you with a
        Notice of Privacy Practices describing their collection and use of your health information. If any Professional
        Entity or other covered entity deems the Company to be a business associate, the Company will handle protected
        health information (“PHI”) in accordance with applicable laws and any relevant business associate agreement. If you
        do not agree to be bound by those terms, you are not authorized to access or use our Site, and you must promptly
        exit our Site.
      </p>
      <p className="mb-4 text-lg leading-relaxed">
        Please read this Privacy Policy carefully to understand our policies and practices regarding your information and
        how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Site. By
        accessing or using our Site, you agree to this Privacy Policy. This Privacy Policy may change from time to time
        (see Changes to Our Privacy Policy). Your continued use of our Site after we make changes is deemed to be
        acceptance of those changes, so please check this Privacy Policy periodically for updates.
      </p>

      <h2 className="text-lg font-bold mb-4">Children Under the Age of 18</h2>
      <p className="mb-4 text-lg leading-relaxed">
        Our Site is not intended for children under 18 years of age. No one under the age of 18 may provide any information
        to or through the Site. We do not knowingly collect Personal Data from children under 18. If you are under 18, do
        not use or provide any information on our Site or on or through any of its features, including your name, address,
        telephone number, email address, or any screen name or user name you may use. If we learn we have collected or
        received Personal Data from a child under 18 without verification of parental consent, we will delete that
        information. If you believe we might have any information from a child under 18, please contact us.
      </p>

      <h2 className="text-lg font-bold mb-4">Information We Collect About You and How We Collect It</h2>
      <p className="mb-4 text-lg leading-relaxed">
        We collect several types of information from and about users of our Site, specifically information:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-lg leading-relaxed">
        <li>
          by which you may be personally identified, such as name, postal address, billing address, shipping address,
          e-mail address, mobile telephone numbers, driver’s license number (or other government identification number),
          date of birth, financial account numbers, bank account numbers, credit or debit card numbers (collected for
          payment purposes only), your medical history, biometrics (including fingerprints), and health information
          (“Personal Data”);
        </li>
        <li>
          that is about you but individually does not identify you, such as traffic data, location data, logs,
          referring/exit pages, date and time of your visit to our Site, error information, clickstream data, and other
          communication data and the resources that you access and use on the Site; or
        </li>
        <li>about your Internet connection, the equipment you use to access our Site, and usage details.</li>
      </ul>

      <p className="mb-4 text-lg leading-relaxed">We collect this information:</p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-lg leading-relaxed">
        <li>directly from you when you provide it to us;</li>
        <li>automatically as you navigate through the Site (including usage details, IP addresses, and information collected through cookies and other tracking technologies); and</li>
        <li>from third parties, for example, from the Professional Entities or other Providers.</li>
      </ul>

      <h2 className="text-lg font-bold mb-4">Information You Provide to Us</h2>
      <p className="mb-4 text-lg leading-relaxed">
        The information we collect on or through our Site includes:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-lg leading-relaxed">
        <li>
          information that you provide by filling in forms on our Site. This includes information provided at the time of
          registering to use our Site, using physician consultation services, purchasing products, or requesting further
          services. We may also ask you for information when you report a problem with our Site;
        </li>
        <li>records and copies of your correspondence (including email addresses), if you contact us or a Provider.</li>
      </ul>

      <h2 className="text-lg font-bold mb-4">Information We Collect Through Automatic Data Collection Technologies</h2>
      <p className="mb-4 text-lg leading-relaxed">
        As you navigate through and interact with our Site, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions, and patterns, specifically:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-lg leading-relaxed">
        <li>
          details of your visits to our Site, such as traffic data, location data, logs, referring/exit pages, date and time of your visit, error information, clickstream data, and other communication data and the resources that you access and use on the Site; and
        </li>
        <li>information about your computer, mobile device, and Internet connection, specifically your IP address, operating system, and browser type.</li>
      </ul>
      <p className="mb-4 text-lg leading-relaxed">
        The information we collect automatically may include Personal Data or we may maintain it or associate it with Personal Data we collect in other ways or receive from third parties. It helps us to improve our Site and to deliver a better and more personalized service by enabling us to:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-lg leading-relaxed">
        <li>
          estimate our audience size and usage patterns;
        </li>
        <li>store information about your preferences, allowing us to customize our Site according to your individual interests; and</li>
        <li>recognize you when you return to our Site.</li>
      </ul>

      <h2 className="text-lg font-bold mb-4">Cookies and Other Similar Technologies Used on Our Site</h2>
      <p className="mb-4 text-lg leading-relaxed">
        The technologies we use for automatic data collection may include cookies, Flash cookies, web beacons, and third-party cookies. We may also use Google Analytics. For more details, please review the full Privacy Policy on our Site.
      </p>

      <h2 className="text-lg font-bold mb-4">How We Use Your Information</h2>
        <p className="mb-4 text-lg leading-relaxed">We use information that we collect about you or that you provide to us, including any Personal Data:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-lg leading-relaxed">
            <li>to present our Site and its contents to you;</li>
            <li>to provide you with information, products, or services that you request from us;</li>
            <li>to process, fulfill, and administer transactions and orders for products and services ordered by you;</li>
            <li>to provide you with notices about your account;</li>
            <li>to contact you in response to a request;</li>
            <li>to administer quizzes, surveys, sweepstakes, promotions, and contests;</li>
            <li>to fulfill any other purpose for which you provide it;</li>
            <li>to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection;</li>
            <li>to notify you about changes to our Site or any products or services we offer or provide through them;</li>
            <li>for internal testing, research, analysis, and product development; and</li>
            <li>for any other purpose with your consent.</li>
        </ul>

      <h2 className="text-lg font-bold mb-4">Disclosure of Your Information</h2>
        <p className="mb-4 text-lg leading-relaxed">We may disclose aggregated information about our users, and information that does not identify any individual, without restriction. We may disclose Personal Data that we collect or you provide as described in this Privacy Policy:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-lg leading-relaxed">
            <li>in connection with a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets;</li>
            <li>to fulfill the purpose for which you provide it;</li>
            <li>for any other purpose disclosed by us when you provide the information; and</li>
            <li>with your consent.</li>
        </ul>
        <h2 className="text-lg font-bold mb-4">We may also disclose your Personal Data:</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-lg leading-relaxed">
            <li>to comply with any court order, law, or legal process;</li>
            <li>to enforce or apply our Terms of Service and other agreements, including for billing and collection purposes; and</li>
            <li>if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of the Company, our customers, or others.</li>
        </ul>

        <h2 className="text-lg font-bold mb-4">Choices About How We Use and Disclose Your Information</h2>
        <p className="mb-4 text-lg leading-relaxed">We do not control the collection and use of your information by the third parties described above in Disclosure of Your Information. These third parties may aggregate the information they collect with information from their other customers for their own purposes.
            <br /><br />
            In addition, we strive to provide you with choices regarding the Personal Data you provide to us. We have created mechanisms to provide you with control over your Personal Data.
            <br /><br />
            Tracking Technologies and Advertising. You can set your browser or operating system to refuse all or some cookies, or to alert you when cookies are being sent. If you disable or refuse cookies, some parts of our Site may be inaccessible or not function properly.
            <br /><br />
            Promotional Offers from the Company. If you do not wish to have your email address used by the Company to promote our own products and services, you can opt out at any time by clicking the unsubscribe link at the bottom of any email or other marketing communications you receive from us. This opt out does not apply to information provided to the Company as a result of a product purchase or your use of our services.
            <br /><br />

            Targeted Advertising. To learn more about interest-based advertisements and your opt-out rights and options, visit the Digital Advertising Alliance and the Network Advertising Initiative websites (<a href="https://youradchoices.com/" className="text-blue-600 hover:underline underline">www.aboutads.info</a> and <a href="https://thenai.org/" className="text-blue-600 hover:underline underline">www.networkadvertising.org</a> ).
        </p>
        <h2 className="text-lg font-bold mb-4">Your Choices</h2>
        <p  className="mb-4 text-lg leading-relaxed">We respect your right to make choices about the ways we collect, use, and disclose the information you provide on or through our Site. For example, if you don’t want information about your visit to our Site sent to Google Analytics, you may download an Opt-out Browser Add-on.</p>

        <h2 className="text-lg font-bold mb-4">Your Rights Regarding Your Information and Accessing and Correcting Your Information</h2>
        <p  className="mb-4 text-lg leading-relaxed">You can review and change your Personal Data by logging into our Site and visiting the profile section. You may also notify us of any changes or errors to ensure that it is complete, accurate, and current or to delete your profile.</p>

        <h2 className="text-lg font-bold mb-4">Do Not Track Signals</h2>
        <p  className="mb-4 text-lg leading-relaxed">Some web browsers permit you to broadcast a signal to websites and online services indicating a preference that they “do not track” your online activities. At this time, we do not honor such signals.</p>

        <h2 className="text-lg font-bold mb-4">Data Security</h2>
        <p  className="mb-4 text-lg leading-relaxed">We have implemented measures designed to secure your Personal Data. Unfortunately, the transmission of information via the Internet is not completely secure. Any transmission of Personal Data is at your own risk.</p>

        <h2 className="text-lg font-bold mb-4">California’s Shine the Light Law</h2>
        <p  className="mb-4 text-lg leading-relaxed">California Civil Code Section 1798.83 permits users of our Site and/or our services who are California residents to request certain information regarding our disclosure of Personal Information to third parties for their own direct marketing purposes.</p>

        <h2 className="text-lg font-bold mb-4">Changes to Our Privacy Policy</h2>
        <p  className="mb-4 text-lg leading-relaxed">We may change this Privacy Policy at any time. It is our policy to post any changes we make to this Privacy Policy on this page with a notice on the Site’s home page.</p>


      {/* Continue same structure for remaining sections */}

      <h2 className="text-lg font-bold mt-8 mb-4">Contact Information</h2>
      <p className="mb-4 text-lg leading-relaxed">
        If you have any questions, concerns, complaints, or suggestions regarding this Privacy Policy or otherwise need to
        contact us, you may contact us at the contact information below or through the contact information displayed on
        our Site.
      </p>
      <p>
            Helios Meds d/b/a FMMeds
        <br />
        Address: 1530 11th ST Manhattan Beach, CA 90266
        <br />
        Email: <a
          href="mailto:support@heliosmeds.com"
          className="text-blue-600 hover:underline underline"
        >
          support@heliosmeds.com
        </a>
        <br />
        Tel: <a href="tel:8889968639" className="text-blue-600 hover:underline underline">
          +1 866 575 9247
        </a>{" "}
      </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default PrivacyPolicy;
