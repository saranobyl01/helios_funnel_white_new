import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const TermsOfService = () => {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>
      <Navbar />
      <div className="mx-auto pt-[80.8px] mb-8">
        {/* HEADER SECTION */}
        <div className="py-6 px-4 bg-[#eaebf5] mb-8">
          <h2 className="text-3xl lg:text-6xl sm:text-4xl md:text-3xl font-bold text-primary container mx-auto text-center md:text-left">
            Terms of Service
          </h2>
        </div>

        {/* CONTENT SECTION */}
        <div className="container px-3 sm:px-3 md:px-4 lg:px-8 mx-auto">
          <p className="text-lg leading-relaxed mb-6">
            <span className="font-bold">Last Updated:</span> October 10, 2025
          </p>

          <p className="text-lg leading-relaxed mb-6">
            These Terms of Service (“<b>Terms</b>”) are an agreement between you and <b>Helios Meds d/b/a FMMeds</b>, a Delaware limited liability company (“<b>Company</b>” or “<b>we</b>” or “<b>our</b>”) and govern your access to, and use of, our website and content{" "}
            <a href="https://www.fmmeds.com" className="text-blue-600 hover:underline underline">
              www.fmmeds.com
            </a>{" "}
            and any web-based and/or mobile application that require you to create an account in order to use the Services (as such term is hereinafter defined) (collectively, the “<b>Site</b>”) or any products for which the Company provides you access to purchase (collectively, “<b>Products</b>”). The Site and Products may collectively be referred to as the “Services” throughout these Terms.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            <b>Please read these Terms carefully before accessing and/or using the Site and/or Products.</b>
            <br /><br />
            <b>THESE TERMS CONTAIN A BINDING ARBITRATION AGREEMENT AND CLASS ACTION WAIVER THAT REQUIRE YOU TO ARBITRATE ALL DISPUTES YOU HAVE WITH COMPANY ON AN INDIVIDUAL BASIS. PLEASE SEE SECTION 12 FOR MORE INFORMATION ABOUT THE ARBITRATION AGREEMENT AND CLASS ACTION WAIVER. YOU EXPRESSLY AGREE THAT DISPUTES BETWEEN YOU AND THE COMPANY WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION, AND YOU HEREBY WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS WIDE ARBITRATION.</b>
          </p>

          {/* SECTION 1 */}
          <h3 className="text-lg font-bold mt-10 mb-4">1. GENERAL</h3>
            <ol className="list-decimal pl-6 space-y-4 text-lg leading-relaxed text-gray-800">
            <li>
                <span className="font-bold">Acceptance of Terms:</span> By accessing
                and/or using the Site and/or Products, or clicking any button to indicate
                your consent, you accept and agree to be bound by these Terms, just as if
                you had agreed to these Terms in writing. If you do not agree to these
                Terms, do not use the Site or any Products.
            </li>

            <li>
                <span className="font-bold">Amendment of Terms:</span> The Company may amend the Terms from time to time. Unless we provide a delayed effective date, all amendments will be effective upon posting of such updated Terms. Your continued access to or use of the Site or Products after such posting constitutes your consent to be bound by the Terms, as amended. Company may also terminate the Services entirely. Company is not liable for any such modification, suspension, or termination of the Services.
            </li>

            <li>
                <span className="font-bold">Additional Terms:</span> In addition to these Terms, certain products or services may be subject to additional terms, conditions, guidelines or rules which may be posted, communicated or modified by us. Your use of any such products or services is subject to those additional terms and conditions, which are hereby incorporated by reference into these Terms.
            </li>

            <li>
                <span className="font-bold">Privacy:</span> For information related to our privacy practices, please review our Privacy Policy which can be found at{" "}
                <Link to={"/privacypolicy"}
                className="text-blue-600 hover:underline underline">
                https://www.fmmeds.com/privacy/
                </Link>
                .
            </li>

            <li>
                <span className="font-bold">Availability:</span> The Services are available in all fifty (50) states plus the District of Columbia. The Company is based in the United States. The Services are provided for use only by persons located in the United States.
            </li>

            <li>
                <span className="font-bold">Eligibility:</span>You may only use the Services and purchase Products if you are at least eighteen (18) years of age. By accessing, using and/or submitting information to or through the Services, you represent that you are not younger than age 18.
            </li>
            </ol>


          {/* SECTION 2 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            2. Your Relationship with the Company
          </h3>
          <p className="text-lg leading-relaxed mb-6">
           <b>a</b>. The Company, on its own behalf and on behalf of one or more professional corporations incorporated, formed or authorized in one or more states and for which Company provides administrative services, including but not limited to White Label MD, LLC, WLMD Network, and M & D Integrations, Inc. DBA MD Integrations (MDI), MDI Medical Group P.C., and MD Integrations & Wellness Provider Group, P.A. (collectively, the “<b>Professional Entities</b>”), makes certain information available to you regarding remote weight loss treatment programs and facilitates your access to telemedicine and expert medical services provided by the Professional Entities. Our Privacy Policy, which may be found at <Link to={"/privacypolicy"}
                className="text-blue-600 hover:underline underline">
                https://www.fmmeds.com/privacy/
                </Link>,  details how we may use, share and maintain any information that you provide to us or to the Professional Entities. Please note that the Company is not a medical group and is not a “covered entity” as defined by the Health Insurance Portability and Accountability Act of 1996, Public Law 104-191, and its implementing regulations (collectively, “<b>HIPAA</b>”). The Company’s role is limited to making information available to you and/or facilitate you access to the Services provided by the Professional Entities. The Company is independent from the Professional Entities and the healthcare providers that may provide you with telehealth services through the Professional Entities. The Company is not responsible for the Professional Entities’ acts, omissions or for any content of the communications made by them to you. The Company does not engage in the practice of medicine or provide any other health services.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            <b>b</b>. The Company itself does not offer any diagnosis or treatment. ALL INFORMATION PROVIDED ON THIS SITE OR IN CONNECTION WITH ANY COMMUNICATIONS SUPPORTED BY THE COMPANY IS INTENDED TO BE FOR GENERAL INFORMATION PURPOSES ONLY AND IS IN NO WAY INTENDED TO CREATE A PROVIDER-PATIENT RELATIONSHIP OR SUPPLANT OR REPLACE YOUR EXISTING PROVIDER-PATIENT RELATIONSHIP AS DEFINED BY STATE AND FEDERAL LAW. USE OF THE SITE IS NOT A SUBSTITUTE FOR PROFESSIONAL DIAGNOSIS OR TREATMENT AND RELIANCE ON ANY INFORMATION PROVIDED BY THE COMPANY IS SOLELY AT YOUR OWN RISK.
          </p>

          {/* SECTION 3 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            3. Consent to Telehealth Services
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            <b>a</b>. Telehealth allows healthcare providers to assess and treat patients remotely using technology. Healthcare services via telehealth may offer potential benefits, but there are also potential risks. To use the Services you must consent to treatment via telehealth. Please see the Telehealth Consent  {" "}
            <Link to={"/telehealthconsent"}
                className="text-blue-600 hover:underline underline">
                 here
                </Link>. The Telehealth Consent is hereby incorporated into these Terms and Conditions by reference and constitute a part of these Terms and Conditions.
          </p>

          {/* SECTION 4 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            4. Use of Services
          </h3>
            <ol className="list-decimal pl-6 space-y-4 text-lg leading-relaxed text-gray-800">
                <li>
                    <span className="font-bold">Our Content.</span> The Services are owned and operated by Company and its licensors. The content, recordings, visual interfaces, graphics, design, compilation, information, computer code, products, software (including any downloadable software), or any music, images, video, text, services, and all other material or elements of or available through the Site (“<b>Content</b>”) are protected by the copyright, trade dress, patent, and trademark laws of the United States and other countries, international conventions, and all other relevant intellectual property and proprietary rights, and applicable laws. All Content contained on the Site is the copyrighted property of Company or its third-party licensors. All trademarks, service marks, and trade names are proprietary to Company or its third-party licensors whether registered or unregistered and may not be used in connection with any product or service or in any manner that is likely to cause confusion as to our endorsement, affiliation or sponsorship of any person, product or service. Except as expressly authorized by Company, you agree not to sell, license, distribute, copy, modify, download, record, publicly perform or display, transmit, publish, edit, adapt, create derivative works from, or otherwise make unauthorized use of the Content and may only access the Content for your personal, non-commercial use. In the event that Content is downloaded to your computer or mobile phone, you do not obtain any ownership interest in such Content. All rights not expressly granted in these Terms are reserved by Company.
                </li>

                <li>
                    <span className="font-bold">Electronic Communications.</span>  You expressly consent to receipt of electronic communications from Company through posts on the Services and via the phone number and email you provided. All agreements, notices, disclosures, authorizations, verifications, confirmations, or other electronic communications Company provides according to this paragraph satisfy any legal requirement for written communication.
                </li>  
            </ol> 

       
          {/* SECTION 5 */}
            <h3 className="text-lg font-bold mt-10 mb-4">
            5. FM Med’s Weight Loss Membership Program and Cancellation
            </h3>

            <ol className="list-decimal pl-6 space-y-6 text-lg leading-relaxed ">
            <li>
                <span className="font-bold">The Program / Program Membership:</span><br /> 
                Your membership in FM Med’s Weight Loss Program Membership (“<b>Program Membership</b>”), 
                including your ability to access the Services, will commence when you have completed 
                the Company’s intake form, at which time you will be charged for the first month of 
                the Program Membership Fee (as defined and explained in Section 5(b) below). 
                The Program includes a consultation with a licensed clinician and a prescription for 
                a three-month supply of a GLP-1 medication (if deemed eligible by a clinician) (the “<b>Program</b>”).
                <br /><br />
                The Company is cash pay only and does not accept insurance.
                <br /><br />
                In certain cases, you or your healthcare provider associated with the Professional Entities 
                may request that you complete services (e.g., medical consults or laboratory testing) 
                that are not covered by the Program Membership. You are responsible for paying for any 
                additional services you or your healthcare provider deem necessary to participate in the Program.
                <br /><br />
                The Program Membership Fee may change from time to time. You will be given thirty (30) days’ 
                notice of any such change. You may accept the revised Program Membership by continuing 
                in the Program or reject them by terminating your Program Membership.
            </li>

            <li>
                <span className="font-bold">Payment of Program Membership Fee:</span><br /> 
                You will have an opportunity to review and agree to the monthly cost of the Program 
                Membership (the “<b>Program Membership Fee</b>”) during the enrollment process. 
                Once you begin participation in the Program, your Program Membership Fee will be charged 
                to your Payment Method (as defined in Section 4(e) below) on file with the Company every 
                three (3) calendar months. The initial payment must be made the day you enroll in the Program.
                <br /><br />
                You will be automatically billed for the Program Membership Fee on a recurring basis every 
                twenty-eight (28) days, until your Program Membership is canceled. 
                Once paid, your Program Membership Fee is non-refundable.
            </li>

            <li>
                <span className="font-bold">Canceling Your Program Membership:</span> <br />
                You may cancel your participation in the Membership at any time. To cancel your Program 
                Membership, please email the Company at{" "}
                <a
                href="mailto:support@heliosmeds.com"
                className="text-blue-600 underline"
                >
                support@heliosmeds.com
                </a>{" "}
                or access our  <a
                href="https://www.fmmeds.com/contact-us/"
                className="text-blue-600 underline"
                >web form</a>.
                <br />
                Once you request cancellation of your participation in the Program, you will incur no further charges to your Payment Method. However, payments already charged to your Payment Method are not eligible for refund. For the avoidance of doubt, once a prescription for a given month is written and in the process of fulfillment by a pharmacy, the Company WILL NOT issue a refund for that month.
                <br />
                For the avoidance of doubt, once a prescription for a given month is written and in 
                the process of fulfillment by a pharmacy, the Company WILL NOT 
                issue a refund for that month.
                <br />
                You may elect to reinstate your Program Membership by emailing our customer service team at{" "}
                <a
                href="mailto:support@heliosmeds.com"
                className="text-blue-600 underline"
                >
                support@heliosmeds.com
                </a>.
            </li>

            <li>
                <span className="font-bold">Effect of Program Membership Cancellation</span> <br />
                When you cancel, you will not be charged any additional monthly Program Membership Fees. You will receive the Services through the last day of the monthly billing cycle for which you have paid the Program Membership Fee. Thereafter, you will not be eligible to receive any Services, including prescriptions from your provider associated with the Professional Entities.
            </li>

            <li>
                <span className="font-bold">Payment for Services and Program Membership Fees</span> <br />
                When being charged for the Program Membership Fees, you will need to provide a credit card or other payment method accepted by the Company (“<b>Payment Method</b>”). You are expressly agreeing that the Company is authorized to charge to the Payment Method any Program Membership Fees, together with any applicable taxes.
                <br /><br />
                You agree that authorization to charge your Payment Method remains in effect until you cancel in accordance with these Terms, and you agree to notify the Company of any changes to your Payment Method. All payments are processed by a third party processor. You certify that you are an authorized user of the Payment Method and will not dispute charges made by the Company. You acknowledge that the origination of ACH transactions to your account must comply with applicable provisions of U.S. law. In the case of an ACH transaction rejected for insufficient funds, the Company may at its discretion attempt to process the charge again at any time within 30 days. The terms and conditions and privacy notice of our third-party payment processor will govern with regard to any financial transaction.
            </li>

            <li>
                <span className="font-bold">Product Orders</span> <br />
                While we will use our best efforts to fulfill all orders through our contractual relationship, Company cannot guarantee the availability of any Product displayed on this Site. Company reserves the right to discontinue the sale of any Product listed 6 on this Site at any time without notice. We reserve the right to limit quantities to the amount reasonable for our regular customers. The prices displayed on this Site are quoted in U.S. dollars and are valid and effective only within the United States, and such prices do not include shipping and handling or sales taxes, if applicable, which will be added to your total invoice price. You are responsible for the payment of any shipping and handling charges and state and local sales or use taxes that may apply to your orders. 
            </li>

            <li>
                <span className="font-bold">Termination for Non-Payment:</span> <br />
                Your Membership will be terminated by the Company if we are unable to bill your selected method of payment and you fail to provide an alternative Payment Method.
            </li>
            </ol>


          {/* SECTION 6 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            6. Accuracy and Security Obligations
          </h3>
          <ol className="list-decimal pl-6 space-y-6 text-lg leading-relaxed">
           <li>
                <span className="font-bold">Security. </span>
                 You are responsible for your access to and use of the Services, including all financial transactions. You agree to immediately notify Company of any breach of security that may occur through your access or use of the Services and to prevent its further occurrence. If you become aware that someone may be impersonating or attempting to impersonate you in using the Services or processing any financial transactions through the Services, you should contact us immediately.
            </li>

            <li>
                <span className="font-bold">Accuracy of Personal Information. </span>
                You represent and warrant that all information provided to Company through the Site is current, accurate, complete and truthful, including all initial or updated registration information, such as the legal name, street address, email address, telephone number, and financial transaction account information. You further represent and warrant that you are an authorized account holder of any financial transaction account which you provide to Company through the Site.
            </li>
           </ol>

          {/* SECTION 7 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            7. Prohibited Conduct
          </h3>
          <p className="text-lg leading-relaxed mb-6">Without limiting the prohibitions and restrictions found elsewhere throughout the Terms, you agree not to:</p>
          <ol className="list-decimal pl-6 space-y-6 text-lg leading-relaxed">
           <li>
                Harass, threaten, stalk, disrupt or defraud users, members or staff of Company or any other person, or otherwise create or contribute to an unsafe, harassing, threatening or disruptive environment;
            </li>

            <li>
                Act in a deceptive or fraudulent manner by, among other things, impersonating another person;
            </li>
            <li>
                Reproduce, modify, prepare derivative works based upon, distribute, license, lease, sell, resell, transfer,
                publicly display, publicly perform, transmit, stream, broadcast, use for commercial purposes or otherwise
                exploit any portion of the Services;
            </li>
            <li>
                Misrepresent the source, identity, or content of information transmitted via the Site, including deleting the
                copyright or other proprietary rights or notices from any portion of the Site;
            </li>
            <li>
                Upload material (i.e., virus) that is damaging to computer systems or data of Company or users of the Site or
                otherwise use the Site in any manner that could damage, disable, overburden, or impair it or interfere with any
                other party’s use and enjoyment of the Site;
            </li>
            <li>
                Upload copyrighted material that is not your own or that you do not have the legal right to distribute, display,
                and otherwise make available to others;
            </li>
            <li>
                Upload or send to Site users pornographic, threatening, embarrassing, hateful, racially or ethnically insulting,
                libelous, or otherwise inappropriate content;
            </li>
            <li>
                Decompile, reverse engineer or disassemble the Site, in whole or in part, except as may be permitted by applicable
                law;
            </li>
            <li>
                Link to, mirror or frame any portion of the Site;
            </li>
            <li>
                Cause or launch any programs or scripts for the purpose of scraping, indexing, surveying, or otherwise data mining
                any portion of the Site or unduly burdening or hindering the operation and/or functionality of any aspect of the
                Site;
            </li>
            <li>
                Attempt to gain unauthorized access to or impair any aspect of the Site or its related systems or networks or
                interfere or attempt to interfere with the proper working of the Site or any activities conducted on the Site;
            </li>
            <li>
                Make unsolicited offers, advertisements, proposals, or send junk mail or “spam” to users;
            </li>
            <li>
                Remove, circumvent, disable, damage or otherwise interfere with security-related features of the Site, any
                features that prevent or restrict use or copying of any content accessible through the Site, or any features that
                enforce limitations on the use of the Site or the content therein;
            </li>
            <li>
                Obtain or attempt to obtain any materials or information through any means not intentionally made available through
                the Site;
            </li>
            <li>
                Modify the Site in any manner or form, or use modified versions of the Site, including (without limitation) for the
                purpose of obtaining unauthorized access to the Site;
            </li>
            <li>
                Use any robot, spider, scraper, or other automated means to access the Site for any purpose without our express
                written permission or bypass our robot exclusion headers or other measures we may use to prevent or restrict access
                to the Site; or
            </li>
            <li>
                Use the Site for or in connection with any purpose that is unlawful or prohibited by these Terms.
            </li>
           </ol><br />
            <p className="text-lg leading-relaxed mb-6">The Company reserves the right to refuse service, remove or edit content, or cancel orders in its sole discretion.</p>
          {/* SECTION 8 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            8. Third-Party Sites
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            The Site may include links or access to other web sites or services (“<b>Linked Sites</b>”) solely as a convenience to users. Company does not endorse any such Linked Sites, or the information, material, products, or services contained on other linked sites or accessible through other Linked Sites. Furthermore, Company makes no express or implied warranties with regard to the information, material, products, or services that are contained on or accessible through Linked Sites. ACCESS AND USE OF LINKED SITES, INCLUDING THE INFORMATION,MATERIAL, CONTENT, PRODUCTS, AND SERVICES ON LINKED SITES OR AVAILABLE THROUGH LINKED SITES, IS SOLELY AT YOUR OWN RISK. We strongly encourage you to review any separate terms of use and privacy notices governing use of these Linked Sites.
          </p>

          {/* SECTION 9 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            9. Data Retention
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            The Company may retain your information for (1) as long as it believes necessary; (2) as long as necessary to comply with its legal obligations, resolve disputes, and/or enforce agreements; or (3) as long as needed to provide its users with the Services. The Company may dispose of or delete any such information at any time, except as set forth in any other agreement or document executed by the Company or as required by law. Please see the Privacy Policy for additional information about how your data will be handled by the Company.
          </p>
                    {/* SECTION 10 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            10. INDEMNIFICATION 
          </h3>
          <p className="text-lg leading-relaxed mb-6">
           YOU AGREE TO INDEMNIFY AND HOLD HARMLESS COMPANY AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, PARTNERS AND LICENSORS, FROM <br /><br />

            AND AGAINST ANY AND ALL LOSS, EXPENSES, DAMAGES, AND COSTS, INCLUDING WITHOUT LIMITATION REASONABLE ATTORNEYS’ FEES, RESULTING, WHETHER DIRECTLY OR INDIRECTLY, FROM YOUR VIOLATION OF THESE TERMS. YOU ALSO AGREE TO INDEMNIFY AND HOLD HARMLESS COMPANY AND ITS OFFICERS, EMPLOYEES, AGENTS, PARTNERS AND LICENSORS, FROM AND AGAINST ANY AND ALL CLAIMS BROUGHT BY THIRD PARTIES ARISING OUT OF YOUR USE OF THE SERVICES IN BREACH OF THESE TERMS.


          </p>

          {/* SECTION 10 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            10. DISCLAIMER OF WARRANTIES
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            <b>
                COMPANY IS NOT A PROVIDER OF MEDICAL TREATMENT, AND THE SERVICES ARE NOT INTENDED TO BE A SUBSTITUTE FOR PROFESSIONAL MEDICAL OR NURSING ADVICE, DIAGNOSIS, OR TREATMENT. BY ACCEPTING THESE TERMS, YOU ACKNOWLEDGE AND AGREE THAT: (A) THE SERVICES DO NOT CONSTITUTE, AND SHOULD NOT BE INTERPRETED AS, MEDICAL ADVICE, DIAGNOSES, OR OPINIONS; AND (B) THE SERVICES ARE NOT INTENDED TO REPLACE OR BE A SUBSTITUTE FOR PROFESSIONAL MEDICAL OR NURSING ADVICE. ALWAYS SEEK THE ADVICE OF YOUR PHYSICIAN OR OTHER QUALIFIED HEALTH PROVIDER WITH ANY QUESTIONS REGARDING YOUR MEDICAL OR OTHER HEALTH CONDITION.
            </b>
            <br /><br />
            YOU ARE ACCESSING THE SERVICES ON AN “AS IS, WHERE IS, AND AS AVAILABLE” BASIS. COMPANY IS NOT RESPONSIBLE FOR PROBLEMS ARISING FROM, OR INADEQUACIES IN THE CONTENT OF THE SERVICES OR ANY PARTICULAR FEATURES OR SERVICES OFFERED. COMPANY DOES NOT REPRESENT OR WARRANT THE ACCURACY, ADEQUACY, OR COMPLETENESS OF THE INFORMATION, MATERIALS, AND SERVICES ON THE SERVICES OR THE ERROR-FREE USE OF THE SERVICES. COMPANY IS NOT RESPONSIBLE FOR ANY PROBLEMS OR TECHNICAL MALFUNCTION OF ANY NETWORK OR LINES, COMPUTER ONLINE SYSTEMS, SERVERS OR PROVIDERS, COMPUTER EQUIPMENT, SOFTWARE, PROBLEMS OR TRAFFIC CONGESTION ON THE INTERNET, INCLUDING INJURY OR DAMAGE TO USERS OR TO ANY OTHER PERSON’S COMPUTER RELATED TO OR RESULTING FROM ACCESS TO OR USE OF THE SERVICES. COMPANY IS PROVIDING THE SERVICES WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND FREEDOM FROM A COMPUTER VIRUS. CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.
          </p>

          {/* SECTION 11 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            11. LIMITATION OF LIABILITY
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            UNDER NO CIRCUMSTANCES WILL COMPANY OR ITS AFFILIATES, CONTRACTORS, EMPLOYEES, AGENTS, OR THIRD-PARTY PARTNERS OR SUPPLIERS BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES UNDER ANY THEORY OF LIABILITY, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE AND PRODUCT LIABILITY), OR OTHERWISE, EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. APPLICABLE LAW MAY NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY OR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU. IN SUCH CASES, COMPANY’S LIABILITY WILL BE LIMITED TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW. <br /><br />
            COMPANY’S LIABILITY TO YOU IS LIMITED TO $50 OR THE AMOUNTS, IF ANY, PAID BY YOU TO COMPANY UNDER THESE TERMS IN THE SIX (6) MONTH PERIOD PRECEDING THE EVENT GIVING RISE TO THE CLAIM, WHICHEVER IS MORE. THE FOREGOING LIMITATIONS WILL APPLY TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, REGARDLESS OF WHETHER COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF WHETHER ANY REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
          </p>

          {/* SECTION 12 */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            12. ARBITRATION AGREEMENT WITH CLASS ACTION WAIVER
          </h3>
          <p className="text-lg leading-relaxed mb-6">
            <b>PLEASE READ THE FOLLOWING CAREFULLY:</b><br />
           PLEASE READ THIS PROVISION CAREFULLY IT REQUIRES YOU TO ARBITRATE ANY DISPUTE OR CLAIM BETWEEN YOU AND COMPANY ON AN INDIVIDUAL BASIS . <br /><br />
           YOU AGREE THAT ANY DISPUTE OR CLAIM ARISING FROM OR RELATING TO THIS ARBITRATION PROVISION, COMPANY’S PRIVACY POLICY OR TERMS, COMPANY’S ADVERTISING OR MARKETING PRACTICES, OR COMPANY’S PRODUCTS OR SERVICES SHALL BE SUBMITTED TO BINDING, FINAL, AND CONFIDENTIAL ARBITRATION BEFORE A SINGLE ARBITRATOR ADMINISTERED BY THE AMERICAN ARBITRATION ASSOCIATION (“AAA”) UNDER ITS CONSUMER ARBITRATION RULES. THIS ARBITRATION PROVISION SHALL BE GOVERNED BY THE FEDERAL ARBITRATION ACT (“FAA”), 9 U.S.C. §§ 1-16, AND THE ARBITRATOR SHALL BE BOUND BY THE TERMS OF THIS ARBITRATION PROVISION. THE ARBITRATOR SHALL HAVE THE EXCLUSIVE AND SOLE AUTHORITY FOR DETERMINING WHETHER A DISPUTE OR CLAIM IS ARBITRABLE. THE ARBITRATOR SHALL FOLLOW APPLICABLE SUBSTANTIVE LAW OF THE STATE OF NEVADA TO THE EXTENT CONSISTENT WITH THE FAA, AND SHALL BE AUTHORIZED TO AWARD ALL REMEDIES AVAILABLE IN AN INDIVIDUAL LAWSUIT UNDER SUBSTANTIVE LAW, INCLUDING, WITHOUT LIMITATION, COMPENSATORY, STATUTORY AND PUNITIVE DAMAGES, DECLARATIVE, INJUNCTIVE AND OTHER EQUITABLE RELIEF, INCLUDING PUBLIC INJUNCTIVE RELIEF, AND ATTORNEYS’ FEES AND COSTS WHERE AVAILABLE UNDER APPLICABLE SUBSTANTIVE LAW. THE ARBITRATOR MAY ONLY RESOLVE DISPUTES OR CLAIMS BETWEEN YOU AND COMPANY AND MAY NOT CONSOLIDATE CLAIMS OR PROCEEDINGS WITHOUT COMPANY’S CONSENT. THE ARBITRATOR MAY NOT HEAR CLASS OR REPRESENTATIVE CLAIMS OR REQUESTS FOR RELIEF ON BEHALF OF OTHER INDIVIDUALS. IF A COURT OR ARBITRATOR DECIDES THAT ANY PART OF THIS AGREEMENT TO ARBITRATE CANNOT BE ENFORCED AS TO A PARTICULAR CLAIM FOR RELIEF OR REMEDY, THEN THAT CLAIM OR REMEDY (AND ONLY THAT CLAIM OR REMEDY) MUST BE BROUGHT IN COURT AND ANY OTHER CLAIMS MUST BE ARBITRATED. <br /><br />

            NOTWITHSTANDING ANYTHING TO THE CONTRARY HEREIN, YOU AGREE THAT COMPANY HAS THE RIGHT TO BRING A CLAIM AGAINST YOU IN THE STATE OR FEDERAL COURTS OF Delaware FOR INJUNCTIVE RELIEF, EQUITABLE RELIEF, OR OTHERWISE ARISING FROM ANY POTENTIAL OR ACTUAL MISAPPROPRIATION OR INFRINGEMENT OF COMPANY’S INTELLECTUAL PROPERTY RIGHTS AND YOU AGREE THAT VENUE IS PROPER AND THAT YOU ARE SUBJECT TO PERSONAL JURISDICTION IN SUCH FORUM.
            <br /><br />
            UNLESS YOU TIMELY OPT-OUT, YOU WILL NOT HAVE THE RIGHT TO: (A) HAVE A COURT OR JURY DECIDE YOUR DISPUTE OR CLAIM; (B) OBTAIN INFORMATION PRIOR TO THE HEARING TO THE SAME EXTENT THAT YOU WOULD HAVE IN COURT; (C) PARTICIPATE IN A CLASS ACTION IN COURT OR IN ARBITRATION, EITHER AS A CLASS REPRESENTATIVE, CLASS MEMBER, OR CLASS OPPONENT; (D) ACT AS A PRIVATE ATTORNEY GENERAL IN COURT OR IN ARBITRATION; OR (E) JOIN OR CONSOLIDATE YOUR DISPUTE OR CLAIM WITH THE DISPUTE OR CLAIM OF ANY OTHER PERSON. OTHER RIGHTS THAT YOU WOULD HAVE HAD IF YOU WENT TO COURT MAY ALSO NOT BE AVAILABLE IN ARBITRATION.
            <br /><br />
            YOU MAY OPT OUT OF ARBITRATION WITHIN 30 DAYS OF THE DATE THAT YOU PURCHASED A PRODUCT OR SERVICE THROUGH COMPANY’S WEBSITE BY SENDING A LETTER TO: Helios Meds D/B/A FMMEDS, ATTN. LEGAL DEPARTMENT, 1530 11th ST Manhattan Beach, CA 90266, STATING YOUR NAME, THE PRODUCT YOU PURCHASED, AND YOUR INTENT TO OPT OUT OF ARBITRATION.

          </p>

          {/* CONTACT */}
          <h3 className="text-lg font-bold  mt-10 mb-4">
            14. Digital Millennium Copyright Notice
          </h3>
          <p className="text-lg leading-relaxed mb-10">
            This Site maintains specific contact information provided below, including an email address, for notifications of claimed infringement regarding materials posted to this Site. All notices should be addressed to the following contact person: <br /><br />
            Notification of Claimed Infringement: 
            <br /><br />
            Helios Meds d/b/a FMMeds <br /><br />
            Attn: DMCA/Copyright Agent <br /><br />
            1530 11th ST Manhattan Beach, CA 90266  <br /><br />
            <a href="tel:8889968639" className="text-blue-600 hover:underline">
              +1 866 575 9247
            </a><br /><br />
            Email:
            <a
              href="mailto:support@heliosmeds.com"
              className="text-blue-600 hover:underline"
            >
              support@heliosmeds.com
            </a>{" "}
            <br /><br />
            You may contact our agent for notice of claimed infringement specified above with complaints regarding allegedly infringing posted material and we will investigate those complaints. If the posted material is believed in good faith by us to violate any applicable law, we will remove or disable access to any such material, and we will notify the posting party that the material has been blocked or removed. 
            <br /><br />
            In notifying us of alleged copyright infringement, the Digital Millennium Copyright Act requires that you include the following information: (i) description of the copyrighted work that is the subject of claimed infringement; (ii) description of the infringing material and information sufficient to permit us to locate the alleged material; (iii) contact information for you, including your address, telephone number and/or email address; (iv) a statement by you that you have a good faith belief that the material in the manner complained of is not authorized by the copyright owner, or its agent, or by the operation of any law; (v) a statement by you, signed under penalty of perjury, that the information in the notification is accurate and that you have the authority to enforce the copyrights that are claimed to be infringed; and (vi) a physical or electronic signature of the copyright owner or a person authorized to act on the copyright owner’s behalf. Failure to include all of the above-listed information may result in a delay in the processing of your complaint.
          </p>
           <h3 className="text-lg font-bold  mt-10 mb-4">
            15. Miscellaneous 
          </h3>
          <ol className="list-decimal pl-6 space-y-6 text-lg leading-relaxed">
                <li>
                    <span className="font-bold">Waiver and Severability. </span>
                    To the extent that a court of competent jurisdiction determines any part of the terms and conditions in these Terms to be invalid or unenforceable, that part will be modified by the court solely to the extent necessary to cause that part to be enforceable, and the remainder of these Terms will remain in full force and effect. Company’s failure to exercise or enforce a legal right, remedy or benefit which is contained in these Terms or any applicable law does not constitute waiver of its right to do so later.
                </li>
                 <li>
                    <span className="font-bold">Choice of Law; Forum. </span>
                    These Terms shall be governed in all respects by the laws of the State of Delaware, without regard to conflict of law provisions, consistent with the Federal Arbitration Act (to the extent permitted by applicable law). If for any reason a claim proceeds in court rather than in arbitration (including any claims brought by parties outside the United States), the dispute shall be exclusively brought in state or federal court located in New Castle County, Delaware.
                </li>
                 <li>
                    <span className="font-bold">Assignment. </span>
                    We may assign our rights and obligations under these Terms. These Terms will inure to the benefit of our successors, assigns, and licensees. You may not assign, transfer, or sell (voluntarily or by operation of law) your rights or obligations under these Terms, nor delegate your duties hereunder to any other person, without our prior written consent. Any purported assignment without our consent will be void and will constitute a breach of these Terms.
                </li>
            </ol>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
