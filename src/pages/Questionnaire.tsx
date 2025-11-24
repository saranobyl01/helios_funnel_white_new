import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { captureTrackingParams, getTrackingParams, generateTransactionId, getTransactionIdFromCookie, getAllCookies } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  UserCheck,
  ArrowRight,
  ClipboardList,
  Stethoscope,
  Truck,
} from "lucide-react";
import doctorsGroup from "@/assets/doctors-group.svg";
import heliosmedsLogo from "@/assets/helios_black_bg.png";
import productImage from "@/assets/product_image.png";
import doctorimg from "@/assets/doctor.png";
import semaglutideBottleDesktop from "@/assets/semaglutide_bottle_desktop.png";
import semaglutideBottleMobile from "@/assets/semaglutide_bottle_mobile.png";
import trizepatideBottleDesktop from "@/assets/trizepatide-_bottle_desktop.png";
import trizepatideBottleMobile from "@/assets/trizepatide-_bottle_mobile.png";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [step]);

  // Trigger start_visit GTM event when component mounts
  useEffect(() => {
    console.log("=== Start Visit Event Trigger ===");
    console.log('=== Questionnaire Page Loaded ===');
    console.log('All cookies on page load:', getAllCookies());
    const tidFromCookie = getTransactionIdFromCookie();
    console.log('Transaction ID from cookie on Questionnaire load:', tidFromCookie);
    
    // GTM Event
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "start_visit",
        page_title: "Questionnaire - Start Visit",
        page_location: window.location.href,
        event_category: "Engagement",
        event_action: "Start Visit",
        event_label: "User began intake questionnaire",
      });
      console.log("Start visit event pushed to GTM!");
      console.log("Event data:", {
        event: "start_visit",
        page_title: "Questionnaire - Start Visit",
        page_location: window.location.href,
        event_category: "Engagement",
        event_action: "Start Visit",
        event_label: "User began intake questionnaire",
      });
    }
  }, []);

  // Step 1 state
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Step 2 state
  const [state, setState] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobDay, setDobDay] = useState("");
  const [dobYear, setDobYear] = useState("");
  const [email, setEmail] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState("");
  const [smsTermsConsent, setSmsTermsConsent] = useState(false);

  // Step 3 state
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");

  // Step 4 state
  const [goalWeight, setGoalWeight] = useState("");
  const [goalWeightError, setGoalWeightError] = useState("");

  // Step 5 state
  const [currentlyTakesMedication, setCurrentlyTakesMedication] = useState("");

  // Step 6 state - First medication selection
  const [selectedMedicationType, setSelectedMedicationType] = useState("");

  // Step 7 state
  const [selectedDosage, setSelectedDosage] = useState("");

  // Step 8 state - Final medication selection for payment
  const [selectedFinalMedication, setSelectedFinalMedication] = useState("");

  // API data state
  const [semaglutideProducts, setSemaglutideProducts] = useState<any[]>([]);
  const [tirzepatideProducts, setTirzepatideProducts] = useState<any[]>([]);
  const [loadingSema, setLoadingSema] = useState(false);
  const [loadingTirz, setLoadingTirz] = useState(false);

  // Webhook state
  const [webhookFired, setWebhookFired] = useState(false);

  // Fetch products based on selected medication type
  useEffect(() => {
    if (
      selectedMedicationType === "semaglutide" &&
      semaglutideProducts.length === 0
    ) {
      fetchSemaglutideProducts();
    } else if (
      selectedMedicationType === "tirzepatide" &&
      tirzepatideProducts.length === 0
    ) {
      fetchTirzepatideProducts();
    }
  }, [selectedMedicationType]);

  // Fetch both products when Step 10 loads (Product selection page)
  useEffect(() => {
    if (step === 10) {
      if (semaglutideProducts.length === 0) {
        fetchSemaglutideProducts();
      }
      if (tirzepatideProducts.length === 0) {
        fetchTirzepatideProducts();
      }
    }
  }, [step]);

  const fetchSemaglutideProducts = async () => {
    setLoadingSema(true);
    try {
      const response = await axios.get(
        "https://panel.ravinimavat.com/heliosmeds_vitalmedsrx/api/get_all_sema"
      );
      if (response.data.status === 1) {
        setSemaglutideProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching semaglutide products:", error);
    } finally {
      setLoadingSema(false);
    }
  };

  const fetchTirzepatideProducts = async () => {
    setLoadingTirz(true);
    try {
      const response = await axios.get(
        "https://panel.ravinimavat.com/heliosmeds_vitalmedsrx/api/get_all_tirz"
      );
      if (response.data.status === 1) {
        setTirzepatideProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tirzepatide products:", error);
    } finally {
      setLoadingTirz(false);
    }
  };

  // Using imported utility functions from @/lib/utils
  // getTrackingParams, generateTransactionId, getTransactionIdFromCookie are already imported

  const fireLeadWebhook = async (email: string) => {
    if (webhookFired) return; // Only fire once
    
    const trackingParams = getTrackingParams();
    // Get transaction_id from cookie first, fallback to generating one
    const transactionId = getTransactionIdFromCookie() || generateTransactionId();
    const token = trackingParams.sub1 || Math.random().toString(36).substr(2, 15);
    
    try {
      const webhookUrl = `https://www.vkkzmo8trk.com/?nid=3299&aid=1&email=${encodeURIComponent(email)}&amount=0&event_id=27&offer_id=1&transaction_id=${transactionId}&sub1=${encodeURIComponent(token)}&sub2=${encodeURIComponent(trackingParams.sub2)}&sub3=${encodeURIComponent(trackingParams.sub3)}&sub4=${encodeURIComponent(trackingParams.sub4)}&sub5=${encodeURIComponent(trackingParams.sub5)}`;
      
      fetch(webhookUrl, { method: 'GET', mode: 'no-cors' }).catch(() => {});
      setWebhookFired(true);
    } catch (error) {
      console.log('Webhook error:', error);
    }
  };

  // Validate email and fire webhook
  const handleEmailValidation = () => {
    const emailValue = email.trim();
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(emailValue) && !webhookFired) {
      fireLeadWebhook(emailValue);
    }
  };

  const handleStep1Continue = () => {
    if (!agreedToTerms) return;
    setStep(2);
  };

  const handleStep2Continue = () => {
    // Validate all required fields
    if (
      !state ||
      !firstName ||
      !lastName ||
      !gender ||
      !email ||
      !emailConsent ||
      !phone ||
      !smsConsent ||
      !smsTermsConsent
    ) {
      return;
    }
    setStep(3);
  };

  const handleStep3Continue = () => {
    // Validate date of birth
    if (!dobMonth || !dobDay || !dobYear) {
      return;
    }
    setStep(4);
  };

  const handleStep4Continue = () => {
    // Validate height and weight
    if (!heightFeet || !heightInches || !weight) {
      return;
    }
    setStep(5);
  };

  const handleStep5Continue = () => {
    // Validate goal weight
    if (!goalWeight) {
      setGoalWeightError("Please enter your goal weight");
      return;
    }

    const currentWeightNum = parseFloat(weight);
    const goalWeightNum = parseFloat(goalWeight);

    // Validate that goal weight is less than current weight
    if (goalWeightNum >= currentWeightNum) {
      setGoalWeightError(
        `Your goal weight must be less than your current weight (${currentWeightNum} lbs). Please enter a lower goal weight.`
      );
      return;
    }

    // Clear error and proceed
    setGoalWeightError("");
    setStep(6);
  };

  const handleStep6Continue = () => {
    setStep(7);
  };

  const handleStep7Continue = () => {
    // Validate currently takes medication
    if (!currentlyTakesMedication) {
      return;
    }
    // If user is taking medication, go to step 8 (medication selection)
    // If user is not taking medication, skip to step 9 (final selection)
    if (currentlyTakesMedication === "yes") {
      setStep(8);
    } else {
      setStep(10);
    }
  };

  const handleStep8Selection = (medicationType: string) => {
    setSelectedMedicationType(medicationType);
    // Automatically continue to dosage selection
    setTimeout(() => {
      setStep(9);
    }, 300);
  };

  const handleStep9Continue = () => {
    if (!selectedDosage) {
      return;
    }
    // Go to both medication dosage selection
    setStep(10);
  };

  const handleStep10Selection = (medicationType: string) => {
    setSelectedFinalMedication(medicationType);
    
    // Fire "initiate checkout" GTM event when user selects product and proceeds to payment
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "initiate_checkout",
        page_title: "Questionnaire - Product Selection",
        page_location: window.location.href,
        event_category: "E-commerce",
        event_action: "Initiate Checkout",
        event_label: `User selected ${medicationType} and proceeding to payment`,
        medication_type: medicationType,
        user_data: {
          email: email,
          first_name: firstName,
          last_name: lastName,
          state: state
        }
      });
      console.log('📊 GTM Event: initiate_checkout fired for', medicationType);
      console.log("Event data:", {
        event: "initiate_checkout",
        medication_type: medicationType,
        user: `${firstName} ${lastName}`
      });
    }
    
    // Automatically navigate to payment after selection
    setTimeout(() => {
      navigate("/payment", {
        state: {
          medicationType: medicationType,
          selectedDosage: selectedDosage,
          semaglutideProducts: semaglutideProducts,
          tirzepatideProducts: tirzepatideProducts,
          // Pass user details for pre-population
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          state: state,
        },
      });
    }, 300);
  };

  const calculateWeightLoss = () => {
    const currentWeight = parseFloat(weight);
    const target = parseFloat(goalWeight);
    const loss = currentWeight - target;
    // Return positive value only (weight loss should always be positive)
    return loss > 0 ? loss : 0;
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "");
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6)
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-white py-6 md:py-8 px-0 md:px-4">
        <div className="container mx-auto max-w-4xl px-0 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-4 md:mb-6 px-4 md:px-0">
            <img
              src={heliosmedsLogo}
              alt="Helios Meds"
              className="h-7 md:h-7 lg:h-7"
            />
          </div>

          {/* Doctors Image */}
          <div className="flex justify-center mb-6 md:mb-8 px-4 md:px-0">
            <img
              src={doctorimg}
              alt="Medical Professionals"
              className="w-[400px] sm:w-[480px] md:w-[571px]"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-6 md:mb-10 px-4 md:px-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              Welcome to Helios Meds!
            </h1>
            <div className="space-y-2 md:space-y-3 text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              <p>
                The following questions will be used by a board certified
                physician licensed in your state to help create a treatment plan
                for you.
              </p>
              <p className="font-semibold text-gray-900">
                Please answer all questions accurately.
              </p>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="bg-gray-50 rounded-none md:rounded-xl p-4 md:p-6 lg:p-8 mb-6 md:mb-10 max-w-3xl mx-auto border-y md:border border-gray-200">
            <div className="flex items-start gap-3 md:gap-4 justify-center">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) =>
                  setAgreedToTerms(checked as boolean)
                }
                className="mt-0.5 md:mt-1"
              />
              <label
                htmlFor="terms"
                className="text-sm md:text-base lg:text-lg leading-relaxed cursor-pointer text-gray-900"
              >
                I Agree to Helios Meds's{" "}
                <a
                  href="https://heliosmeds.com/pages/terms-of-use"
                  target="_blank"
                  className="text-gray-900 font-semibold underline hover:no-underline"
                >
                  Terms
                </a>
                ,{" "}
                <a
                  href="https://heliosmeds.com/pages/privacy-policy"
                  target="_blank"
                  className="text-gray-900 font-semibold underline hover:no-underline"
                >
                  Privacy Policy
                </a>{" "}
                and consent to{" "}
                <a
                  href="#"
                  target="_blank"
                  className="text-gray-900 font-semibold underline hover:no-underline"
                >
                  Telehealth
                </a>
              </label>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-0 md:gap-4 mb-6 md:mb-10 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center gap-3 p-4 md:p-5 bg-gray-50 border-b-2 md:border-2 border-gray-200 rounded-none md:rounded-xl hover:shadow-xl transition-all duration-300 hover:border-gray-300">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 border-gray-200 flex items-center justify-center bg-gray-100">
                <ClipboardList className="w-7 h-7 md:w-8 md:h-8 text-gray-900" />
              </div>
              <p className="font-semibold text-sm md:text-base text-gray-900">
                Free online medical evaluation
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-4 md:p-5 bg-gray-50 border-b-2 md:border-2 border-gray-200 rounded-none md:rounded-xl hover:shadow-xl transition-all duration-300 hover:border-gray-300">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 border-gray-200 flex items-center justify-center bg-gray-100">
                <Stethoscope className="w-7 h-7 md:w-8 md:h-8 text-gray-900" />
              </div>
              <p className="font-semibold text-sm md:text-base text-gray-900">
                Board-certified physicians
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-4 md:p-5 bg-gray-50 border-b-2 md:border-2 border-gray-200 rounded-none md:rounded-xl hover:shadow-xl transition-all duration-300 hover:border-gray-300">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 border-gray-200 flex items-center justify-center bg-gray-100">
                <Truck className="w-7 h-7 md:w-8 md:h-8 text-gray-900" />
              </div>
              <p className="font-semibold text-sm md:text-base text-gray-900">
                Fast free shipping
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center px-4 md:px-2">
            <Button
              variant="hero"
              size="lg"
              onClick={handleStep1Continue}
              disabled={!agreedToTerms}
              className="w-full max-w-2xl px-6 sm:px-12 md:px-16 py-5 md:py-6 lg:py-7 text-base md:text-lg lg:text-xl font-bold"
            >
              Start my FREE visit →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2
  if (step === 2) {
    return (
      <div className="min-h-screen bg-white py-6 md:py-12 px-0 md:px-4">
        <div className="container mx-auto max-w-4xl px-0 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8">
            <img src={heliosmedsLogo} alt="Helios Meds" className="h-7 md:h-7" />
          </div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              Let's start with the Basics
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-black-300">
              Let's make sure we are licensed in your state
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-50 border-y-2 md:border-2 border-gray-200 rounded-none md:rounded-2xl p-4 md:p-10 lg:p-12 space-y-6 md:space-y-10 shadow-none md:shadow-lg">
            {/* State */}
            <div className="space-y-2 md:space-y-3">
              <Label
                htmlFor="state"
                className="text-base md:text-lg font-semibold"
              >
                State
              </Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger
                  id="state"
                  className="h-12 md:h-14 text-base md:text-lg"
                >
                  <SelectValue placeholder="Select your state..." />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((stateName) => (
                    <SelectItem
                      key={stateName}
                      value={stateName}
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      {stateName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Name Section */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="font-semibold text-lg md:text-xl lg:text-2xl text-gray-900">
                Who do I have the pleasure of talking to?
              </h3>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2 md:space-y-3">
                  <Label
                    htmlFor="firstName"
                    className="text-base md:text-lg font-medium"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="h-12 md:h-14 text-base md:text-lg"
                  />
                </div>
                <div className="space-y-2 md:space-y-3">
                  <Label
                    htmlFor="lastName"
                    className="text-base md:text-lg font-medium"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="h-12 md:h-14 text-base md:text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-3 md:space-y-4">
              <Label className="text-base md:text-lg font-semibold">
                What was your gender at birth?
              </Label>
              <RadioGroup
                value={gender}
                onValueChange={setGender}
                className="space-y-2 md:space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 md:p-4 border-2 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all cursor-pointer">
                  <RadioGroupItem
                    value="male"
                    id="male"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                  <Label
                    htmlFor="male"
                    className="font-medium text-base md:text-lg cursor-pointer flex-1"
                  >
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 md:p-4 border-2 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all cursor-pointer">
                  <RadioGroupItem
                    value="female"
                    id="female"
                    className="h-4 w-4 md:h-5 md:w-5"
                  />
                  <Label
                    htmlFor="female"
                    className="font-medium text-base md:text-lg cursor-pointer flex-1"
                  >
                    Female
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Email */}
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-2 md:space-y-3">
              <Label
                htmlFor="email"
                className="text-base md:text-lg font-semibold"
              >
                Please enter your email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                 // setTimeout(handleEmailValidation, 300);
                }}
                onBlur={handleEmailValidation}
                placeholder="Enter your email"
                className="h-12 md:h-14 text-base md:text-lg"
              />
              </div>
              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-100 rounded-xl border border-gray-200">
                <Checkbox
                  id="emailConsent"
                  checked={emailConsent}
                  onCheckedChange={(checked) =>
                    setEmailConsent(checked as boolean)
                  }
                  className="mt-1 h-4 w-4 md:h-5 md:w-5"
                />
                <label
                  htmlFor="emailConsent"
                  className="text-sm md:text-base leading-relaxed cursor-pointer"
                >
                  I agree to receive doctor correspondence, transactional and/or
                  marketing messaging from Helios Meds to the email address that I
                  provided above.
                </label>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-2 md:space-y-3">
                <Label
                  htmlFor="phone"
                  className="text-base md:text-lg font-semibold"
                >
                  Please enter your mobile number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(000) 000-0000"
                  maxLength={14}
                  className="h-12 md:h-14 text-base md:text-lg"
                />
              </div>

              <div className="space-y-3 md:space-y-4">
                <Label className="text-base md:text-lg font-semibold">
                  Can we send you text messages about your prescription?
                </Label>
                <p className="text-sm md:text-base text-muted-foreground">
                  (including tracking information and refill information)
                </p>
                <RadioGroup
                  value={smsConsent}
                  onValueChange={setSmsConsent}
                  className="space-y-2 md:space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 md:p-4 border-2 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all cursor-pointer">
                    <RadioGroupItem
                      value="yes"
                      id="sms-yes"
                      className="h-4 w-4 md:h-5 md:w-5"
                    />
                    <Label
                      htmlFor="sms-yes"
                      className="font-medium text-base md:text-lg cursor-pointer flex-1"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 md:p-4 border-2 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all cursor-pointer">
                    <RadioGroupItem
                      value="no"
                      id="sms-no"
                      className="h-4 w-4 md:h-5 md:w-5"
                    />
                    <Label
                      htmlFor="sms-no"
                      className="font-medium text-base md:text-lg cursor-pointer flex-1"
                    >
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-gray-100 rounded-xl border border-gray-200">
                <Checkbox
                  id="smsTerms"
                  checked={smsTermsConsent}
                  onCheckedChange={(checked) =>
                    setSmsTermsConsent(checked as boolean)
                  }
                  className="mt-1 h-4 w-4 md:h-5 md:w-5"
                />
                <label
                  htmlFor="smsTerms"
                  className="text-sm md:text-base leading-relaxed cursor-pointer"
                >
                  By checking this box, I also consent by electronic signature
                  to receive phone calls and/or SMS text messages at the phone
                  number(s) below, including my wireless number if provided. I
                  understand these calls may be generated using an automated
                  technology, pre-recorded voices and that data rates may apply.
                  I understand that my consent is not required to buy
                  goods/services and I may opt out at any time to avoid
                  receiving calls or SMS text messages.
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 md:gap-6 mt-6 md:mt-10 px-4 md:px-0">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(1)}
              className="flex-1 text-base md:text-lg py-6 md:py-8"
            >
              Back
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={handleStep2Continue}
              disabled={
                !state ||
                !firstName ||
                !lastName ||
                !gender ||
                !email ||
                !emailConsent ||
                !phone ||
                !smsConsent ||
                !smsTermsConsent
              }
              className="flex-1 text-xl py-8"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3 - Date of Birth
  if (step === 3) {
    return (
      <div className="min-h-screen bg-white py-6 md:py-12 px-0 md:px-4">
        <div className="container mx-auto max-w-4xl px-0 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8 px-4 md:px-0">
            <img
              src={heliosmedsLogo}
              alt="Helios Meds"
              className="h-7 md:h-7 lg:h-7"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12 px-4 md:px-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              What is your date of birth?
            </h1>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-black-300">
              Based on your date of birth our doctors can prescribe the proper
              prescription.
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-50 border-y-2 md:border-2 border-gray-200 rounded-none md:rounded-2xl p-5 md:p-10 lg:p-12 shadow-none md:shadow-lg">
            <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto">
              <div className="space-y-2 md:space-y-3">
                <Label
                  htmlFor="dobMonth"
                  className="text-sm md:text-base lg:text-lg font-semibold"
                >
                  Month
                </Label>
                <Select value={dobMonth} onValueChange={setDobMonth}>
                  <SelectTrigger
                    id="dobMonth"
                    className="h-12 md:h-14 text-base md:text-lg"
                  >
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="01"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      January
                    </SelectItem>
                    <SelectItem
                      value="02"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      February
                    </SelectItem>
                    <SelectItem
                      value="03"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      March
                    </SelectItem>
                    <SelectItem
                      value="04"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      April
                    </SelectItem>
                    <SelectItem
                      value="05"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      May
                    </SelectItem>
                    <SelectItem
                      value="06"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      June
                    </SelectItem>
                    <SelectItem
                      value="07"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      July
                    </SelectItem>
                    <SelectItem
                      value="08"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      August
                    </SelectItem>
                    <SelectItem
                      value="09"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      September
                    </SelectItem>
                    <SelectItem
                      value="10"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      October
                    </SelectItem>
                    <SelectItem
                      value="11"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      November
                    </SelectItem>
                    <SelectItem
                      value="12"
                      className="text-base md:text-lg py-2 md:py-3"
                    >
                      December
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:space-y-3">
                <Label
                  htmlFor="dobDay"
                  className="text-sm md:text-base lg:text-lg font-semibold"
                >
                  Day
                </Label>
                <Select value={dobDay} onValueChange={setDobDay}>
                  <SelectTrigger
                    id="dobDay"
                    className="h-12 md:h-14 text-base md:text-lg"
                  >
                    <SelectValue placeholder="DD" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <SelectItem
                        key={day}
                        value={day.toString().padStart(2, "0")}
                        className="text-base md:text-lg py-2 md:py-3"
                      >
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:space-y-3">
                <Label
                  htmlFor="dobYear"
                  className="text-sm md:text-base lg:text-lg font-semibold"
                >
                  Year
                </Label>
                <Select value={dobYear} onValueChange={setDobYear}>
                  <SelectTrigger
                    id="dobYear"
                    className="h-12 md:h-14 text-base md:text-lg"
                  >
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from(
                      { length: 100 },
                      (_, i) => new Date().getFullYear() - 18 - i
                    ).map((year) => (
                      <SelectItem
                        key={year}
                        value={year.toString()}
                        className="text-base md:text-lg py-2 md:py-3"
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 md:gap-6 mt-6 md:mt-10 px-4 md:px-0">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(2)}
              className="flex-1 text-base md:text-lg py-6 md:py-8"
            >
              &lt; Go Back
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={handleStep3Continue}
              disabled={!dobMonth || !dobDay || !dobYear}
              className="flex-1 text-base md:text-lg py-6 md:py-8"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 4 - Height and Weight
  if (step === 4) {
    return (
      <div className="min-h-screen bg-white py-6 md:py-12 px-0 md:px-4">
        <div className="container mx-auto max-w-4xl px-0 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8 px-4 md:px-0">
            <img
              src={heliosmedsLogo}
              alt="Helios Meds"
              className="h-7 md:h-7 lg:h-7"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12 px-4 md:px-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              What is your height and weight?
            </h1>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-black-300 max-w-3xl mx-auto">
              We'll use this to determine your Body Mass Index (BMI) for
              diagnosis. Remember, BMI is a measure of size - not health
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-50 border-y-2 md:border-2 border-gray-200 rounded-none md:rounded-2xl p-5 md:p-10 lg:p-12 shadow-none md:shadow-lg">
            <div className="space-y-6 md:space-y-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2 md:space-y-3">
                  <Label
                    htmlFor="heightFeet"
                    className="text-base md:text-lg font-semibold"
                  >
                    Feet
                  </Label>
                  <div className="relative">
                    <Input
                      id="heightFeet"
                      type="number"
                      min="3"
                      max="8"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      placeholder="0"
                      className="pr-12 md:pr-16 h-12 md:h-14 text-base md:text-lg"
                    />
                    <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-base md:text-lg">
                      ft.
                    </span>
                  </div>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <Label
                    htmlFor="heightInches"
                    className="text-base md:text-lg font-semibold"
                  >
                    Inches
                  </Label>
                  <div className="relative">
                    <Input
                      id="heightInches"
                      type="number"
                      min="0"
                      max="11"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      placeholder="0"
                      className="pr-12 md:pr-16 h-12 md:h-14 text-base md:text-lg"
                    />
                    <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-base md:text-lg">
                      in.
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3">
                <Label
                  htmlFor="weight"
                  className="text-base md:text-lg font-semibold"
                >
                  Weight in pounds
                </Label>
                <div className="relative">
                  <Input
                    id="weight"
                    type="number"
                    min="50"
                    max="800"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0"
                    className="pr-16 md:pr-20 h-12 md:h-14 text-base md:text-lg"
                  />
                  <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-base md:text-lg">
                    lbs.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 md:gap-6 mt-6 md:mt-10 px-4 md:px-0">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(3)}
              className="flex-1 text-base md:text-lg py-6 md:py-8"
            >
              &lt; Go Back
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={handleStep4Continue}
              disabled={!heightFeet || !heightInches || !weight}
              className="flex-1 text-base md:text-lg py-6 md:py-8"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 5 - Goal Weight
  if (step === 5) {
    return (
      <div className="min-h-screen bg-white py-6 md:py-12 px-0 md:px-4">
        <div className="container mx-auto max-w-4xl px-0 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8 px-4 md:px-0">
            <img
              src={heliosmedsLogo}
              alt="Helios Meds"
              className="h-7 md:h-7 lg:h-7"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12 px-4 md:px-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              What is your desired weight?
            </h1>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-black-300">
              What is your goal weight in pounds?
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-50 border-y-2 md:border-2 border-gray-200 rounded-none md:rounded-2xl p-5 md:p-10 lg:p-12 shadow-none md:shadow-lg">
            <div className="max-w-2xl mx-auto">
              <div className="space-y-2 md:space-y-3">
                <Label
                  htmlFor="goalWeight"
                  className="text-lg md:text-xl font-semibold"
                >
                  Goal Weight
                </Label>
                <div className="relative">
                  <Input
                    id="goalWeight"
                    type="number"
                    min="50"
                    max={weight ? parseFloat(weight) - 1 : 800}
                    value={goalWeight}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setGoalWeight(newValue);
                      
                      // Real-time validation
                      if (newValue && weight) {
                        const currentWeightNum = parseFloat(weight);
                        const goalWeightNum = parseFloat(newValue);
                        
                        if (goalWeightNum >= currentWeightNum) {
                          setGoalWeightError(
                            `Your goal weight must be less than your current weight (${currentWeightNum} lbs). Please enter a lower goal weight.`
                          );
                        } else {
                          setGoalWeightError("");
                        }
                      } else {
                        setGoalWeightError("");
                      }
                    }}
                    placeholder="0"
                    className={`pr-16 md:pr-20 h-14 md:h-16 text-xl md:text-2xl font-medium border-2 focus:border-gray-900 ${
                      goalWeightError
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                  />
                  <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg md:text-xl">
                    lbs.
                  </span>
                </div>
                {weight && (
                  <p className="text-sm md:text-base text-muted-foreground mt-1">
                    Your current weight is <strong>{weight} lbs</strong>. Goal weight must be less than {weight} lbs.
                  </p>
                )}
                {goalWeightError && (
                  <p className="text-sm md:text-base text-red-500 mt-1">
                    {goalWeightError}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 md:gap-6 mt-6 md:mt-10 px-4 md:px-0">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(4)}
              className="flex-1 text-sm md:text-lg py-5 md:py-8"
            >
              &lt; Go Back
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={handleStep5Continue}
              disabled={!goalWeight || !!goalWeightError}
              className="flex-1 text-sm md:text-lg py-5 md:py-8"
            >
              Start my FREE visit
              <ArrowRight className="w-4 h-4 md:w-6 md:h-6 ml-1 md:ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 6 - Results
  if (step === 6) {
    return (
      <div className="min-h-screen bg-white py-6 md:py-12 px-0 md:px-4">
        <div className="container mx-auto max-w-5xl px-0 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8 px-4 md:px-0">
            <img
              src={heliosmedsLogo}
              alt="Helios Meds"
              className="h-7 md:h-7 lg:h-7"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-6 md:mb-12 px-4 md:px-0">
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-6 text-gray-900">
              Congrats {firstName}!
            </h1>
            <p className="text-base md:text-xl lg:text-2xl xl:text-3xl text-black-300 mb-2 md:mb-4">
              You meet the initial pre-qualifications.
            </p>
            <p className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">
              You are all set to lose {calculateWeightLoss()} Pounds!
            </p>
          </div>

          {/* Medical Weight Loss Plan */}
          <div className="bg-gray-50 border-y-2 md:border-2 border-gray-200 rounded-none md:rounded-2xl p-4 md:p-10 lg:p-12 mb-6 md:mb-10 shadow-none md:shadow-lg">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-12 text-gray-900 px-2">
              {firstName}'s Medical Weight Loss Plan
            </h2>

            {/* Flowchart - Simplified for Mobile */}
            <div className="flex items-center justify-center mb-6 md:mb-12 px-2 md:px-0">
              <div className="flex items-center gap-2 md:gap-4 w-full justify-between max-w-lg">
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-100 flex items-center justify-center border-3 border-gray-900">
                    <span className="text-gray-900 font-bold text-center text-[10px] md:text-xs lg:text-sm leading-tight px-1">
                      Medication
                      <br />
                      Delivery
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 md:w-8 md:h-8 text-gray-900 flex-shrink-0" />
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-100 flex items-center justify-center border-3 border-gray-900">
                    <span className="text-gray-900 font-bold text-center text-[10px] md:text-xs lg:text-sm leading-tight px-1">
                      Ongoing
                      <br />
                      Support
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 md:w-8 md:h-8 text-gray-900 flex-shrink-0" />
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-900 flex items-center justify-center border-3 border-gray-900">
                    <span className="text-white font-bold text-center text-[10px] md:text-xs lg:text-sm leading-tight px-1">
                      Goal
                      <br />
                      Achieved!
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weight Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 text-center border-2 border-gray-200 shadow-md">
                <p className="text-sm md:text-base lg:text-lg text-black-300 mb-2 md:mb-3">
                  Your Current Weight
                </p>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  {weight} lbs
                </p>
              </div>
              <div className="bg-gray-100 rounded-xl md:rounded-2xl p-5 md:p-8 text-center border-2 border-gray-300 shadow-md">
                <p className="text-sm md:text-base lg:text-lg text-black-300 mb-2 md:mb-3">
                  Your Target Weight is
                </p>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  {goalWeight} lbs
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs md:text-sm lg:text-base text-gray-400 text-center leading-relaxed px-4 md:px-0 mb-6 md:mb-10">
            <p>
              These figures are for informational purposes only and not a
              guarantee of results. Your weight loss will depend on your
              exercise, diet, and medication adherence. Data is based on studies
              from the New England Journal of Medicine and research by Louis J.
              Aronne, MD; Naveed Sattar, MD; and Deborah B. Horn, MD.
            </p>
          </div>

          {/* Action */}
          <div className="flex justify-center px-4 md:px-0">
            <Button
              variant="hero"
              size="lg"
              onClick={handleStep6Continue}
              className="w-full md:min-w-[400px] text-sm md:text-lg px-4 md:px-8 py-5 md:py-8"
            >
              Click here to start your medical weight loss journey
              <ArrowRight className="w-4 h-4 md:w-6 md:h-6 ml-1 md:ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 7 - Current Medication Question
  if (step === 7) {
    return (
      <div className="min-h-screen bg-white py-6 md:py-12 px-0 md:px-4">
        <div className="container mx-auto max-w-4xl px-0 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8 px-4 md:px-0">
            <img
              src={heliosmedsLogo}
              alt="Helios Meds"
              className="h-7 md:h-7 lg:h-7"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12 px-4 md:px-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              Are you currently taking any weight loss drugs?
            </h1>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-black-300">
              This helps our doctors understand your current medication status
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-50 border-y-2 md:border-2 border-gray-200 rounded-none md:rounded-2xl p-5 md:p-10 lg:p-12 shadow-none md:shadow-lg">
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4 md:space-y-6">
                <RadioGroup
                  value={currentlyTakesMedication}
                  onValueChange={setCurrentlyTakesMedication}
                  className="space-y-3 md:space-y-4"
                >
                  <div className="flex items-center space-x-4 p-4 md:p-6 border-2 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all cursor-pointer">
                    <RadioGroupItem
                      value="yes"
                      id="current-med-yes"
                      className="h-5 w-5 md:h-6 md:w-6"
                    />
                    <Label
                      htmlFor="current-med-yes"
                      className="font-medium text-lg md:text-xl cursor-pointer flex-1"
                    >
                      Yes, I am currently taking weight loss medication
                    </Label>
                  </div>
                  <div className="flex items-center space-x-4 p-4 md:p-6 border-2 rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all cursor-pointer">
                    <RadioGroupItem
                      value="no"
                      id="current-med-no"
                      className="h-5 w-5 md:h-6 md:w-6"
                    />
                    <Label
                      htmlFor="current-med-no"
                      className="font-medium text-lg md:text-xl cursor-pointer flex-1"
                    >
                      No, I am not currently taking any weight loss medication
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 md:gap-6 mt-6 md:mt-10 px-4 md:px-0">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(6)}
              className="flex-1 text-base md:text-lg py-6 md:py-8"
            >
              &lt; Go Back
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={handleStep7Continue}
              disabled={!currentlyTakesMedication}
              className="flex-1 text-base md:text-lg py-6 md:py-8"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 8 - Medication Type Selection
  if (step === 8) {
    return (
      <div className="min-h-screen bg-white py-6 md:py-12 px-0 md:px-4">
        <div className="container mx-auto max-w-4xl px-0 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8 px-4 md:px-0">
            <img
              src={heliosmedsLogo}
              alt="Helios Meds"
              className="h-7 md:h-7 lg:h-7"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12 px-4 md:px-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              What weight loss drugs are you currently prescribed?
            </h1>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-black-300">
              Include drugs you have taken in the last 2 weeks only.
            </p>
          </div>

          {/* Selection Cards */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10 px-4 md:px-0">
            {/* Semaglutide Card */}
            <div
              onClick={() => handleStep8Selection("semaglutide")}
              className={`cursor-pointer p-6 md:p-8 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${selectedMedicationType === "semaglutide"
                ? "bg-gray-100 border-gray-900 shadow-lg"
                : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                }`}
            >
              <div className="text-center space-y-3 md:space-y-4">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Semaglutide
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-black-300">
                  (Compound, Ozempic, or Wegovy)
                </p>
                {selectedMedicationType === "semaglutide" && (
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-gray-900" />
                  </div>
                )}
              </div>
            </div>

            {/* Tirzepatide Card */}
            <div
              onClick={() => handleStep8Selection("tirzepatide")}
              className={`cursor-pointer p-6 md:p-8 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${selectedMedicationType === "tirzepatide"
                ? "bg-gray-100 border-gray-900 shadow-lg"
                : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                }`}
            >
              <div className="text-center space-y-3 md:space-y-4">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Tirzepatide
                </h3>
                <p className="text-sm md:text-base lg:text-lg text-black-300">
                  (Compound, Mounjaro, Zepbound)
                </p>
                {selectedMedicationType === "tirzepatide" && (
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-gray-900" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center px-4 md:px-0">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(7)}
              className="max-w-xs text-base md:text-lg py-6 md:py-8"
            >
              &lt; Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 9 - Dosage Selection
  if (step === 9) {
    // Define static dosage options
    const semaglutideDosages = [
      "0.25 mg",
      "0.5 mg",
      "1 mg",
      "1.5 mg",
      "2 mg",
      "2.5 mg",
    ];

    const tirzepatideDosages = [
      "2.5 mg",
      "5 mg",
      "7.5 mg",
      "10 mg",
      "12.5 mg",
      "15 mg",
    ];

    const dosageOptions =
      selectedMedicationType === "semaglutide"
        ? semaglutideDosages
        : tirzepatideDosages;

    const medicationName =
      selectedMedicationType === "semaglutide" ? "Semaglutide" : "Tirzepatide";

    return (
      <div className="min-h-screen bg-white py-6 md:py-12 px-0 md:px-4">
        <div className="container mx-auto max-w-4xl px-0 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8 px-4 md:px-0">
            <img
              src={heliosmedsLogo}
              alt="Helios Meds"
              className="h-7 md:h-7 lg:h-7"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12 px-4 md:px-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 text-gray-900">
              Select your previous medication
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-black-300">
              Choose your {medicationName} dosage
            </p>
          </div>

          {/* Warning Alert */}
          <div className="bg-destructive/10 border-y-2 md:border-2 border-destructive/30 rounded-none md:rounded-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-10 mx-0 md:mx-4">
            <p className="text-sm md:text-base lg:text-lg leading-relaxed text-gray-900">
              ❗To be approved for higher dosages, you must upload a clear photo
              of your current medication or past prescription showing your name
              and dosage. Without this, our doctors cannot legally prescribe an
              increased dose, and you must begin at the initial starter dosage
              schedule❗
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-50 border-y-2 md:border-2 border-gray-200 rounded-none md:rounded-2xl p-5 md:p-10 lg:p-12 mb-6 md:mb-10 shadow-none md:shadow-lg">
            <div className="space-y-3">
              <Label
                htmlFor="dosage"
                className="text-xl font-semibold text-gray-900"
              >
                Select {medicationName} Dosage
              </Label>
              <Select value={selectedDosage} onValueChange={setSelectedDosage}>
                <SelectTrigger id="dosage" className="h-16 text-xl">
                  <SelectValue placeholder="Select your dosage..." />
                </SelectTrigger>
                <SelectContent>
                  {dosageOptions.map((dosage, index) => (
                    <SelectItem
                      key={index}
                      value={dosage}
                      className="text-lg py-3"
                    >
                      {dosage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-10 md:p-12 mb-10 shadow-lg">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-7 h-7 text-gray-900 flex-shrink-0" />
                <span className="font-medium text-xl text-gray-900">
                  Same Price. All Dosage Levels.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-7 h-7 text-gray-900 flex-shrink-0" />
                <span className="font-medium text-xl text-gray-900">
                  No Hidden Fees. Everything Included.
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-7 h-7 text-gray-900 flex-shrink-0" />
                <span className="font-medium text-xl text-gray-900">
                  Initial Telehealth Visit
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-7 h-7 text-gray-900 flex-shrink-0" />
                <span className="font-medium text-xl text-gray-900">
                  Prescription + Medication
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-7 h-7 text-gray-900 flex-shrink-0" />
                <span className="font-medium text-xl text-gray-900">
                  24/7 Support
                </span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-7 h-7 text-gray-900 flex-shrink-0" />
                <span className="font-medium text-xl text-gray-900">
                  Monthly check-in
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 md:gap-6 px-4 md:px-0">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(8)}
              className="flex-1 text-base md:text-lg py-6 md:py-8"
            >
              &lt; Go Back
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={handleStep9Continue}
              disabled={!selectedDosage}
              className="flex-1 text-base md:text-lg py-6 md:py-8"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 10 - Final Medication Type Selection (Before Payment)
  if (step === 10) {
    const isLoadingProducts = loadingSema || loadingTirz;

    return (
      <div className="min-h-screen bg-white py-6 md:py-12 px-0 md:px-4">
        <div className="container mx-auto max-w-4xl px-0 md:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8 px-4 md:px-0">
            <img
              src={heliosmedsLogo}
              alt="Helios Meds"
              className="h-7 md:h-7 lg:h-7"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12 px-4 md:px-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              Start Your Weight Loss Journey — Select Your Product
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-black-300">
              Choose your weight loss medication
            </p>
            {isLoadingProducts && (
              <p className="text-base md:text-lg text-gray-900 animate-pulse mt-2">
                Loading products...
              </p>
            )}
          </div>

          {/* Selection Cards */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10 px-4 md:px-0">
            {/* Semaglutide Card */}
            <div
              onClick={() => handleStep10Selection("semaglutide")}
              className={`cursor-pointer p-6 md:p-8 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${selectedFinalMedication === "semaglutide"
                ? "bg-gray-100 border-gray-900 shadow-lg"
                : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                }`}
            >
              <div className="text-center space-y-3 md:space-y-4">
                {/* Semaglutide Bottle */}
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                  {/* Mobile Image */}
                  <img
                    src={semaglutideBottleMobile}
                    alt="Semaglutide + B12"
                    className="w-full pt-4 h-full object-contain drop-shadow-2xl md:hidden"
                  />
                  {/* Desktop Image */}
                  <img
                    src={semaglutideBottleDesktop}
                    alt="Semaglutide + B12"
                    className="hidden md:block w-full pt-4 h-full object-contain drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-transparent to-transparent rounded-full blur-xl"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Semaglutide + B12
                </h3>
                {/* <p className="text-sm md:text-base lg:text-lg text-black-300">
                  (Compound, Ozempic, or Wegovy)
                </p> */}
                {selectedFinalMedication === "semaglutide" && (
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-gray-900" />
                  </div>
                )}
              </div>
              <ul className="text-sm md:text-base lg:text-lg text-gray-600 pt-4">
                <li className="list-disc list-inside">Compounded formulation for enhanced metabolic support
                </li>
                <li className="list-disc list-inside">Works on 1 GLP Receptor

                </li>
                <li className="list-disc list-inside">Most Prescribed
                </li>
              </ul>
            </div>

            {/* Tirzepatide Card */}
            <div
              onClick={() => handleStep10Selection("tirzepatide")}
              className={`cursor-pointer p-6 md:p-8 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${selectedFinalMedication === "tirzepatide"
                ? "bg-gray-100 border-gray-900 shadow-lg"
                : "bg-gray-50 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                }`}
            >
              <div className="text-center space-y-3 md:space-y-4">
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                  {/* Tirzepatide Bottle */}
                  {/* Mobile Image */}
                  <img
                    src={trizepatideBottleMobile}
                    alt="Tirzepatide + B12"
                    className="w-full pt-4 h-full object-contain drop-shadow-2xl md:hidden"
                  />
                  {/* Desktop Image */}
                  <img
                    src={trizepatideBottleDesktop}
                    alt="Tirzepatide + B12"
                    className="hidden md:block w-full pt-4 h-full object-contain drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-transparent to-transparent rounded-full blur-xl"></div>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Tirzepatide + B12
                </h3>
                {/* <p className="text-sm md:text-base lg:text-lg text-black-300">
                  (Compound, Mounjaro, Zepbound)
                </p> */}
                {selectedFinalMedication === "tirzepatide" && (
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-gray-900" />
                  </div>
                )}
              </div>
            <ul className="text-sm md:text-base lg:text-lg text-gray-600 pt-4">
                <li className="list-disc list-inside">Compounded formulation designed to support weight management
                </li>
                <li className="list-disc list-inside">Works on 2 GLP Receptors
                </li>
                <li className="list-disc list-inside">Most Effective
                </li>
              </ul>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center px-4 md:px-0">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(9)}
              className="max-w-xs text-base md:text-lg py-6 md:py-8"
            >
              &lt; Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If we reach here, return null (shouldn't happen)
  return null;
};

export default Questionnaire;
