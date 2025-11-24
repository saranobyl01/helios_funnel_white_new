import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreditCard, Sparkles, TrendingDown, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getTrackingParams, generateTransactionId, getTransactionIdFromCookie, getAllCookies } from "@/lib/utils";
import heliosmedsLogo from "@/assets/helios_black_bg.png";
import usStates from "../data/usStates.json";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get medication data from navigation state
  const medicationData = location.state as {
    medicationType?: string;
    dosage?: string;
    products?: any[];
    semaglutideDosage?: string;
    tirzepatideDosage?: string;
    semaglutideProducts?: any[];
    tirzepatideProducts?: any[];
    // User details from questionnaire
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    state?: string;
  } | null;

  const [selectedPlan, setSelectedPlan] = useState("6-month");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [differentBilling, setDifferentBilling] = useState(false);
  const [billingAddressLine1, setBillingAddressLine1] = useState("");
  const [billingAddressLine2, setBillingAddressLine2] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [showSavingsModal, setShowSavingsModal] = useState(false);
  const [modalSelectedPlan, setModalSelectedPlan] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cardHolderName, setCardHolderName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [statesList, setStatesList] = useState<
    Array<{ name: string; state_code: string }>
  >([]);
  const [medicationProducts, setMedicationProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [memberPrice, setMemberPrice] = useState<string | null>(null);
  const [checkingMemberPrice, setCheckingMemberPrice] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [checkingCoupon, setCheckingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  // Refs for Google Maps Autocomplete
  const shippingAddressRef = useRef<HTMLInputElement>(null);
  const billingAddressRef = useRef<HTMLInputElement>(null);
  
  // Store autocomplete instances to prevent duplicates
  const shippingAutocompleteRef = useRef<any>(null);
  const billingAutocompleteRef = useRef<any>(null);

  // Helper function to convert full state name to state code
  const getStateCode = (stateName: string): string => {
    if (!stateName) return "";
    
    // If it's already a 2-letter code, return it as is
    if (stateName.length === 2) return stateName.toUpperCase();
    
    const stateMap: { [key: string]: string } = {
      'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
      'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
      'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
      'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
      'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
      'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
      'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
      'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
      'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
      'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
      'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
      'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
      'Wisconsin': 'WI', 'Wyoming': 'WY'
    };
    
    return stateMap[stateName] || stateName;
  };

  // Populate form fields from questionnaire data
  useEffect(() => {
    if (medicationData) {
      console.log("Medication Data Received:", medicationData);
      
      // Pre-populate personal information fields
      if (medicationData.firstName) setFirstName(medicationData.firstName);
      if (medicationData.lastName) setLastName(medicationData.lastName);
      if (medicationData.phone) setPhone(medicationData.phone);
      if (medicationData.email) {
        setEmail(medicationData.email);
        // Validate the email immediately
        if (validateEmail(medicationData.email)) {
          setIsEmailValid(true);
        }
      }
      // State will be set in another useEffect after statesList loads
      
      // Fetch medication products based on type
      if (medicationData.medicationType === "tirzepatide") {
        fetchTirzepatideProducts();
      } else if (medicationData.medicationType === "semaglutide") {
        fetchSemaglutideProducts();
      }
    }
  }, [medicationData]);

  // Scroll to top when component mounts and fetch states
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStates();
    // Track start checkout event when component mounts
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'start_checkout',
      page_title: 'Payment - Start Checkout',
      page_location: window.location.href,
      event_category: 'Ecommerce',
      event_action: 'Start Checkout',
      event_label: 'User began checkout process'
    });
    
    // Debug: Check for transaction_id cookie on page load
    console.log('\n=== Payment Page Loaded ===');
    console.log('All cookies on page load:', getAllCookies());
    const tidFromCookie = getTransactionIdFromCookie();
    console.log('Transaction ID from cookie on Payment load:', tidFromCookie);
    
    
  }, []);

  // Convert full state name to state code when statesList is loaded
  useEffect(() => {
    if (medicationData?.state && !state) {
      const stateCode = getStateCode(medicationData.state);
      if (stateCode) {
        console.log("Converting state:", medicationData.state, "to:", stateCode);
        setState(stateCode);
      }
    }
  }, [medicationData, state]);

  // Check member price when email changes or plan changes to monthly
  useEffect(() => {
    // Reset member price when plan changes away from monthly
    if (selectedPlan !== "monthly") {
      setMemberPrice(null);
      return;
    }

    // Check member price when email is valid and monthly plan is selected
    if (
      email.trim() &&
      validateEmail(email) &&
      selectedProductId &&
      selectedPlan === "monthly"
    ) {
      // Small delay to ensure product is fully selected
      const timer = setTimeout(() => {
        checkMemberPrice(email);
      }, 500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, selectedProductId, selectedPlan]);

  // Auto-select product when medicationProducts are loaded
  useEffect(() => {
    if (medicationProducts.length > 0 && !selectedProductId) {
      const product = getProductByPlan(selectedPlan);
      if (product) {
        setSelectedProductId(product.product_id);
        console.log("Auto-selected Product ID:", product.product_id);
        console.log("Auto-selected Plan:", selectedPlan);
        console.log("Product Details:", product);
      }
    }
  }, [medicationProducts]);

  // Load Google Maps API script
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      // Check if script is already loaded
      if (window.google && window.google.maps && window.google.maps.places) {
        setIsGoogleMapsLoaded(true);
        initializeAutocomplete();
        return;
      }

      // Check if script tag already exists
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com/maps/api/js"]'
      );

      if (existingScript) {
        // Script exists but may not be loaded yet
        existingScript.addEventListener("load", () => {
          setIsGoogleMapsLoaded(true);
          initializeAutocomplete();
        });
        return;
      }

      // Create and load script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDqypMXRxstlMdPZ-LUGWb4w36I0ENsu9U&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsGoogleMapsLoaded(true);
        initializeAutocomplete();
      };
      script.onerror = () => {
        console.error("Google Maps script failed to load.");
      };
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  // Initialize autocomplete when Google Maps is loaded and refs are ready
  useEffect(() => {
    if (isGoogleMapsLoaded && shippingAddressRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initializeAutocomplete();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isGoogleMapsLoaded]);

  // Re-initialize autocomplete when billing address section is toggled
  useEffect(() => {
    if (isGoogleMapsLoaded) {
      const timer = setTimeout(() => {
        initializeAutocomplete();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [differentBilling, isGoogleMapsLoaded]);

  // Using imported utility functions from @/lib/utils
  // getTrackingParams, generateTransactionId, getTransactionIdFromCookie are already imported

  const fetchStates = async () => {
    try {
      // Use local JSON data instead of API call
      setStatesList(usStates);
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  const fetchSemaglutideProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await axios.get(
        "https://panel.ravinimavat.com/heliosmeds_vitalmedsrx/api/get_all_sema"
      );
      if (response.data.status === 1) {
        setMedicationProducts(response.data.data);
        console.log("Semaglutide Products:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching semaglutide products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchTirzepatideProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await axios.get(
        "https://panel.ravinimavat.com/heliosmeds_vitalmedsrx/api/get_all_tirz"
      );
      if (response.data.status === 1) {
        setMedicationProducts(response.data.data);
        console.log("Tirzepatide Products:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tirzepatide products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkCouponCode = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    if (!selectedProductId) {
      setCouponError("Please select a plan first");
      return;
    }

    setCheckingCoupon(true);
    setCouponError("");

    try {
      const product = getProductByPlan(selectedPlan);
      if (!product) {
        throw new Error("Product not found");
      }

      const response = await axios.post(
        "https://panel.ravinimavat.com/heliosmeds_vitalmedsrx/api/check_coupons",
        {
          amount: parseFloat(product.price),
          campaign_id: null,
          promo_codes: couponCode.trim(),
        }
      );

      console.log("Coupon Response:", response.data);

      if (response.data.status === 1) {
        setAppliedCoupon(response.data);
        toast({
          title: "Coupon Applied!",
          description: `Your coupon has been successfully applied.`,
        });
      } else {
        setCouponError(response.data.message || "Invalid coupon code");
        setAppliedCoupon(null);
      }
    } catch (error) {
      console.error("Error checking coupon:", error);
      setCouponError("Failed to apply coupon. Please try again.");
      setAppliedCoupon(null);
    } finally {
      setCheckingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponError("");
    toast({
      title: "Coupon Removed",
      description: "The coupon has been removed from your order.",
    });
  };

  // Parse address components from Google Places
  const parseAddressComponents = (place: any) => {
    let stateName = "";
    let stateCode = "";
    let city = "";
    let postalCode = "";

    if (place && place.address_components) {
      place.address_components.forEach((component: any) => {
        const types = component.types;
        if (types.includes("administrative_area_level_1")) {
          stateName = component.long_name;
          stateCode = component.short_name;
        }
        if (types.includes("locality")) {
          city = component.long_name;
        }
        if (types.includes("postal_code")) {
          postalCode = component.long_name;
        }
      });
    }

    return { stateName, stateCode, city, postalCode };
  };

  // Clean address to get only street address
  const cleanAddress = (formattedAddress: string) => {
    const addressParts = formattedAddress.split(",");
    return addressParts[0].trim();
  };

  // Initialize Google Maps Autocomplete
  const initializeAutocomplete = () => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API not available.");
      return;
    }

    // Initialize Autocomplete for shipping address
    if (shippingAddressRef.current && !shippingAutocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        shippingAddressRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: "us" },
        }
      );

      shippingAutocompleteRef.current = autocomplete;

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Place details (shipping):", place);

        if (place) {
          const { stateName, stateCode, city, postalCode } =
            parseAddressComponents(place);
          const cleanedAddress = cleanAddress(place.formatted_address || "");

          // Set address
          setAddressLine1(cleanedAddress);

          // Set city
          if (city) {
            setCity(city);
          }

          // Set state code if available
          if (stateCode) {
            setState(stateCode);
          }

          // Set zip code
          if (postalCode) {
            setZipCode(postalCode);
          }

          // Clear errors
          setErrors((prev) => ({
            ...prev,
            addressLine1: "",
            city: "",
            state: "",
            zipCode: "",
          }));
        }
      });
    }

    // Initialize Autocomplete for billing address
    if (billingAddressRef.current && differentBilling && !billingAutocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        billingAddressRef.current,
        {
          types: ["address"],
          componentRestrictions: { country: "us" },
        }
      );

      billingAutocompleteRef.current = autocomplete;

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Place details (billing):", place);

        if (place) {
          const { stateName, stateCode, city, postalCode } =
            parseAddressComponents(place);
          const cleanedAddress = cleanAddress(place.formatted_address || "");

          // Set address
          setBillingAddressLine1(cleanedAddress);

          // Set city
          if (city) {
            setBillingCity(city);
          }

          // Set state code if available
          if (stateCode) {
            setBillingState(stateCode);
          }

          // Set zip code
          if (postalCode) {
            setBillingZipCode(postalCode);
          }

          // Clear errors
          setErrors((prev) => ({
            ...prev,
            billingAddressLine1: "",
            billingCity: "",
            billingState: "",
            billingZipCode: "",
          }));
        }
      });
    }

    // Clean up billing autocomplete when different billing is disabled
    if (!differentBilling && billingAutocompleteRef.current) {
      billingAutocompleteRef.current = null;
    }
  };

  const checkMemberPrice = async (userEmail: string) => {
    // Only check for monthly plan with semaglutide or tirzepatide
    if (
      selectedPlan !== "monthly" ||
      !selectedProductId ||
      !medicationData ||
      (medicationData.medicationType !== "semaglutide" &&
        medicationData.medicationType !== "tirzepatide")
    ) {
      console.log("Skipping member price check:", {
        selectedPlan,
        selectedProductId,
        medicationType: medicationData?.medicationType
      });
      return;
    }

    if (!validateEmail(userEmail)) {
      console.log("Invalid email, skipping member price check");
      return;
    }

    console.log("=== Checking Member Price ===");
    console.log("Email:", userEmail);
    console.log("Product ID:", selectedProductId);
    console.log("Medication Type:", medicationData.medicationType);

    setCheckingMemberPrice(true);
    try {
      const response = await axios.post(
        "https://panel.ravinimavat.com/heliosmeds_vitalmedsrx/api/member_view",
        {
          email: userEmail,
          product_id: selectedProductId,
        }
      );

      console.log("Member View API Response:", response.data);

      if (response.data.status === 1 && response.data.m_price) {
        setMemberPrice(response.data.m_price);
        console.log("✅ Member Price Set:", response.data.m_price);
      } else {
        setMemberPrice(null);
        console.log("❌ No member price available - using default pricing");
      }
    } catch (error) {
      console.error("Error checking member price:", error);
      setMemberPrice(null);
    } finally {
      setCheckingMemberPrice(false);
    }
  };

  // Helper function to get product price by plan type
  const getProductByPlan = (planType: string) => {
    if (!medicationProducts || medicationProducts.length === 0) {
      return null;
    }

    // Find product based on plan type
    const product = medicationProducts.find((p) => {
      const productName = p.product_name.toLowerCase();
      const sku = p.sku.toLowerCase();

      switch (planType) {
        case "monthly":
          // Monthly products typically have CR1 in SKU and don't mention months in the name
          return (
            (sku.includes("cr1") && !productName.includes("1 month")) ||
            (sku.includes("-cr1") && !productName.includes("1-"))
          );

        case "3-month":
          // 3 month products
          return productName.includes("3 month") || sku.includes("3-");

        case "6-month":
          // 6 month products
          return (
            productName.includes("6 month") ||
            sku.includes("6m") ||
            sku.includes("-6")
          );

        case "12-month":
          // 12 month products
          return (
            productName.includes("12 month") ||
            sku.includes("12m") ||
            sku.includes("-12")
          );

        default:
          return false;
      }
    });

    return product || null;
  };

  // Helper function to calculate final price with discount
  const calculateFinalPrice = (): { subtotal: string; discount: string; total: string } => {
    const product = getProductByPlan(selectedPlan);
    if (!product) return { subtotal: "0.00", discount: "0.00", total: "0.00" };

    let subtotal = memberPrice && selectedPlan === "monthly"
      ? parseFloat(memberPrice)
      : parseFloat(product.price);

    let discount = 0;

    if (appliedCoupon) {
      if (appliedCoupon.discount_percent && parseFloat(appliedCoupon.discount_percent) > 0) {
        // Percentage discount
        discount = (subtotal * parseFloat(appliedCoupon.discount_percent)) / 100;
      } else if (appliedCoupon.discount_amount && parseFloat(appliedCoupon.discount_amount) > 0) {
        // Fixed amount discount
        discount = parseFloat(appliedCoupon.discount_amount);
      }
    }

    const total = Math.max(0, subtotal - discount); // Ensure total is not negative

    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phone.replace(/\D/g, "").length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Card validation
    if (!cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (cardNumber.replace(/\s/g, "").length < 13) {
      newErrors.cardNumber = "Please enter a valid card number";
    }

    if (!expiry.trim()) {
      newErrors.expiry = "Expiry date is required";
    } else if (expiry.length < 5) {
      newErrors.expiry = "Please enter a valid expiry date (MM/YY)";
    }

    if (!cvc.trim()) {
      newErrors.cvc = "CVV is required";
    } else if (cvc.length < 3) {
      newErrors.cvc = "CVV must be at least 3 digits";
    }

    // Shipping address validation
    if (!addressLine1.trim()) {
      newErrors.addressLine1 = "Street address is required";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    }

    if (!state) {
      newErrors.state = "State is required";
    }

    if (!zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (zipCode.length !== 5) {
      newErrors.zipCode = "ZIP code must be 5 digits";
    }

    // Billing address validation (if different billing address is selected)
    if (differentBilling) {
      if (!billingAddressLine1.trim()) {
        newErrors.billingAddressLine1 = "Billing street address is required";
      }

      if (!billingCity.trim()) {
        newErrors.billingCity = "Billing city is required";
      }

      if (!billingState) {
        newErrors.billingState = "Billing state is required";
      }

      if (!billingZipCode.trim()) {
        newErrors.billingZipCode = "Billing ZIP code is required";
      } else if (billingZipCode.length !== 5) {
        newErrors.billingZipCode = "Billing ZIP code must be 5 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitOrder = async (planToSubmit?: string) => {
    setIsSubmitting(true);

    try {
      // Use the provided plan or fall back to selectedPlan
      const planType = planToSubmit || selectedPlan;

      // Get the selected product
      const product = getProductByPlan(planType);

      if (!product) {
        throw new Error("Please select a product first");
      }

      // Detect card type from card number
      const cardNo = cardNumber.replace(/\s/g, "");
      let cardType = "visa"; // default
      if (cardNo.startsWith("4")) {
        cardType = "visa";
      } else if (cardNo.startsWith("5")) {
        cardType = "mastercard";
      } else if (cardNo.startsWith("3")) {
        cardType = "amex";
      }

      // Split expiry into month and year
      const [exMonth, exYear] = expiry.split("/");

      // Calculate final price with discount
      let subtotal = memberPrice && planType === "monthly"
        ? parseFloat(memberPrice)
        : parseFloat(product.price);

      let discount = 0;

      if (appliedCoupon) {
        if (appliedCoupon.discount_percent && parseFloat(appliedCoupon.discount_percent) > 0) {
          // Percentage discount
          discount = (subtotal * parseFloat(appliedCoupon.discount_percent)) / 100;
        } else if (appliedCoupon.discount_amount && parseFloat(appliedCoupon.discount_amount) > 0) {
          // Fixed amount discount
          discount = parseFloat(appliedCoupon.discount_amount);
        }
      }

      const finalPrice = Math.max(0, subtotal - discount); // Ensure total is not negative
      const originalPrice = parseFloat(product.price);

      // Prepare order data
      const orderData: any = {
        billingSameAsShipping: differentBilling ? "NO" : "YES",
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: phone.replace(/\D/g, ""),
        address: addressLine1,
        city_name: city,
        state_name: state,
        zip_code: zipCode,
        card_type: cardType,
        card_no: cardNo,
        ex_month: exMonth,
        ex_year: exYear,
        cvv_no: cvc,
        card_holder_name: cardHolderName || `${firstName} ${lastName}`,
        start_url: window.location.origin + "/?id=" + product.product_id,
        contact_details_id: "undefined",
        promo_codes: appliedCoupon ? couponCode : null,
        campaign_id: null,
        product_id: [product.product_id],
        "product_price[]": [finalPrice],
        "original_price[]": [originalPrice],
        "gateway_id[]": [1],
        "billing_model_id[]": [3],
        "promoCodes[]": [appliedCoupon ? couponCode : 0],
      };

      // Add address2 if provided
      if (addressLine2) {
        orderData.address2 = addressLine2;
      }

      // Add billing address only if different from shipping
      if (differentBilling) {
        orderData.billing_address = billingAddressLine1;
        if (billingAddressLine2) {
          orderData.billing_address2 = billingAddressLine2;
        }
        orderData.billing_city_name = billingCity;
        orderData.billing_state_name = billingState;
        orderData.billing_zip_code = billingZipCode;
      }

      console.log("Order Data:", orderData);

      // Call API
      const response = await axios.post(
        "https://panel.ravinimavat.com/heliosmeds_vitalmedsrx/api/createOrder_test",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order Response:", response.data);

      // Handle both object and array responses
      const responseData = Array.isArray(response.data) 
        ? response.data[0] 
        : response.data;

      if (responseData && responseData.status === 1) {
        const orderId = responseData.order_id;

        // ✅ Call LeadConnector order webhook
        try {
          const orderWebhookPayload = {
            order_id: orderId,
            price: finalPrice.toString(),
            email: email,
            product_name: product.product_name,
          };

          console.log("🚀 Sending order to LeadConnector:", orderWebhookPayload);

          await axios.post(
            "https://services.leadconnectorhq.com/hooks/B5EHDsG7FvoDwVq0QTeJ/webhook-trigger/60624355-b282-42b3-8055-2322dbd93fa7",
            orderWebhookPayload,
            { headers: { "Content-Type": "application/json" } }
          );

          console.log("✅ Order webhook sent successfully!");
        } catch (webhookError) {
          console.error("❌ Failed to send order to LeadConnector:", webhookError);
        }



        // Fire conversion webhook with transaction_id from cookie
        const trackingParams = getTrackingParams();
        // Get transaction_id from cookie first, then fallback to other sources
        const transactionId = getTransactionIdFromCookie() || trackingParams.transactionId || orderId || `tid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const token = trackingParams.sub1 || Math.random().toString(36).substr(2, 15);
        const orderAmount = finalPrice;
        
        try {
          const webhookUrl = `https://www.vkkzmo8trk.com/?nid=3299&aid=1&email=${encodeURIComponent(email)}&amount=${orderAmount}&event_id=1&offer_id=1&transaction_id=${transactionId}&sub1=${encodeURIComponent(token)}&sub2=${encodeURIComponent(trackingParams.sub2)}&sub3=${encodeURIComponent(trackingParams.sub3)}&sub4=${encodeURIComponent(trackingParams.sub4)}&sub5=${encodeURIComponent(trackingParams.sub5)}`;
          
          // Fire webhook (no-cors mode as this is a tracking pixel style request)
          fetch(webhookUrl, { method: 'GET', mode: 'no-cors' }).catch(() => {
            // Silently fail - don't block user flow for tracking
          });
        } catch (error) {
          console.log('Conversion webhook error:', error);
          // Continue with user flow even if webhook fails
        }

        // Success - navigate to thank you page
        toast({
          title: "Payment Successful!",
          description: "Your order has been confirmed.",
        });

        // Track purchase event for GTM
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: "purchase",
          transaction_id: orderId,
          value: parseFloat(finalPrice.toString()),
          currency: "USD",
          items: [
            {
              item_id: product.product_id,
              item_name: product.product_name,
              item_category: product.category || product.product_category || medicationData?.medicationType || "Weight Loss",
              quantity: 1,
              price: parseFloat(finalPrice.toString())
            }
          ]
        });
        console.log('Purchase event tracked:', {
          transaction_id: orderId,
          value: parseFloat(finalPrice.toString()),
          item_id: product.product_id,
          item_name: product.product_name,
          item_category: product.category || product.product_category || medicationData?.medicationType || "Weight Loss"
        });

        navigate("/thank-you", { state: { email, orderId } });
      } else {
        throw new Error(
          responseData?.message || "Payment processing failed"
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setShowSavingsModal(false);
    }
  };

  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    // Show savings modal if monthly plan is selected
    if (selectedPlan === "monthly") {
      setModalSelectedPlan(null);
      setShowSavingsModal(true);
      return;
    }

    // Submit order for non-monthly plans
    await submitOrder();
  };

  const proceedWithMonthly = async () => {
    setShowSavingsModal(false);

    // Get the monthly product and set the product_id
    const product = getProductByPlan("monthly");
    if (product) {
      setSelectedProductId(product.product_id);
      setSelectedPlan("monthly");
      console.log("Selected Product ID (Monthly):", product.product_id);
      console.log("Selected Plan: monthly");
      console.log("Product Details:", product);

      toast({
        title: "Plan Selected!",
        description: `You've selected the monthly plan - ${product.product_name}`,
      });
    }
  };

  const proceedWithSelectedPlan = async () => {
    const finalPlan = modalSelectedPlan || selectedPlan;

    // Get the product for the selected plan
    const product = getProductByPlan(finalPlan);
    if (!product) {
      toast({
        title: "Error",
        description: "Product not found for selected plan",
        variant: "destructive",
      });
      return;
    }

    console.log("Selected Product ID:", product.product_id);
    console.log("Selected Plan:", finalPlan);
    console.log("Product Details:", product);

    // Update the selected plan and product ID in state
    setSelectedProductId(product.product_id);
    setSelectedPlan(finalPlan);
    setShowSavingsModal(false);

    // Submit order with the selected plan
    await submitOrder(finalPlan);
  };

  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case "3-month":
        return {
          price: "$299.97",
          perMonth: "$100/month",
          savings: "$150",
          discount: "33% OFF",
          regular: "$449.91",
        };
      case "6-month":
        return {
          price: "$549.97",
          perMonth: "$91.67/month",
          savings: "$350",
          discount: "39% OFF",
          regular: "$899.82",
        };
      default:
        return null;
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(" ") : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // GTM Tracking - Purchase Event
  const trackPurchase = (
    orderId: string | number,
    value: number,
    currency: string,
    items: any[]
  ) => {
    // Ensure dataLayer exists
    if (typeof window !== "undefined" && window.dataLayer) {
      const purchaseData = {
        event: "purchase",
        page_title: "Payment - Purchase Complete",
        page_location: window.location.href,
        event_category: "Ecommerce",
        event_action: "Purchase",
        event_label: `User completed purchase - Order ${orderId.toString()}`,
        transaction_id: orderId.toString(),
        value: value,
        currency: currency,
        items: items,
      };
      
      // Duplicate diagnostics (does not block pushing)
      try {
        const purchaseSessionKey = `purchase_fired_${orderId}`;
        const alreadyFired =
          sessionStorage.getItem(purchaseSessionKey) === "1";
        const beforeLen = Array.isArray(window.dataLayer)
          ? window.dataLayer.length
          : undefined;
        const beforeCount = Array.isArray(window.dataLayer)
          ? window.dataLayer.filter?.((e: any) => e?.event === "purchase")
              ?.length ?? undefined
          : undefined;

        console.log("Purchase debug (before push):", {
          orderId: orderId.toString(),
          alreadyFired,
          dataLayerLength: beforeLen,
          purchaseEventsInDataLayer: beforeCount,
        });

        console.log("Pushing to dataLayer:", purchaseData);
        window.dataLayer.push(purchaseData);

        const afterLen = Array.isArray(window.dataLayer)
          ? window.dataLayer.length
          : undefined;
        const afterCount = Array.isArray(window.dataLayer)
          ? window.dataLayer.filter?.((e: any) => e?.event === "purchase")
              ?.length ?? undefined
          : undefined;

        console.log("Purchase debug (after push):", {
          orderId: orderId.toString(),
          dataLayerLength: afterLen,
          purchaseEventsInDataLayer: afterCount,
        });

        // Mark this order as pushed in this browser session
        sessionStorage.setItem(purchaseSessionKey, "1");
      } catch (diagErr) {
        console.warn("Purchase debug logging failed:", diagErr);
        console.log("Pushing to dataLayer:", purchaseData);
        window.dataLayer.push(purchaseData);
      }
      console.log("Purchase event pushed to GTM!");
    }
  };

  // Handle plan selection and set product_id
  const handlePlanSelection = (planType: string) => {
    setSelectedPlan(planType);
    const product = getProductByPlan(planType);
    if (product) {
      setSelectedProductId(product.product_id);
      console.log("Selected Plan:", planType);
      console.log("Selected Product ID:", product.product_id);
      console.log("Product Details:", product);
      
      // GTM Add to Cart Event
      if (typeof window !== "undefined" && window.dataLayer) {
        const productPrice = parseFloat(product.price);
        const addToCartData = {
          event: "add_to_cart",
          page_title: "Payment - Add to Cart",
          page_location: window.location.href,
          event_category: "Ecommerce",
          event_action: "Add to Cart",
          event_label: `User added ${product.product_name} to cart`,
          ecommerce: {
            currency: "USD",
            value: productPrice,
            items: [
              {
                item_id: product.product_id.toString(),
                item_name: product.product_name,
                item_category: medicationData?.medicationType || "unknown",
                price: productPrice,
                quantity: 1,
              },
            ],
          },
        };
        try {
          const addToCartSessionKey = `add_to_cart_fired_${product.product_id}`;
          const alreadyFired =
            sessionStorage.getItem(addToCartSessionKey) === "1";
          const beforeLen = Array.isArray(window.dataLayer)
            ? window.dataLayer.length
            : undefined;
          const beforeCount = Array.isArray(window.dataLayer)
            ? window.dataLayer.filter?.((e: any) => e?.event === "add_to_cart")
                ?.length ?? undefined
            : undefined;

          console.log("Add to Cart debug (before push):", {
            productId: product.product_id.toString(),
            alreadyFired,
            dataLayerLength: beforeLen,
            addToCartEventsInDataLayer: beforeCount,
          });

          window.dataLayer.push(addToCartData);

          const afterLen = Array.isArray(window.dataLayer)
            ? window.dataLayer.length
            : undefined;
          const afterCount = Array.isArray(window.dataLayer)
            ? window.dataLayer.filter?.((e: any) => e?.event === "add_to_cart")
                ?.length ?? undefined
            : undefined;

          console.log("Add to Cart debug (after push):", {
            productId: product.product_id.toString(),
            dataLayerLength: afterLen,
            addToCartEventsInDataLayer: afterCount,
          });

          sessionStorage.setItem(addToCartSessionKey, "1");
        } catch (diagErr) {
          console.warn("Add to Cart debug logging failed:", diagErr);
          window.dataLayer.push(addToCartData);
        }
        console.log("Add to Cart event pushed to GTM!");
        console.log("Event data:", addToCartData);
      }
    }

    // Reset member price if switching away from monthly or if email is entered, re-check
    if (planType !== "monthly") {
      setMemberPrice(null);
    } else if (email.trim() && validateEmail(email)) {
      // Re-check member price for monthly plan when switching back to it
      setTimeout(() => {
        checkMemberPrice(email);
      }, 100);
    }

    // Reset coupon when changing plans
    if (appliedCoupon) {
      setAppliedCoupon(null);
      setCouponCode("");
      setCouponError("");
    }
  };

// after put firstname lastname email phone
const sendLeadToWebhook = async () => {
  try {
    if (!firstName || !lastName || !email || !phone) return;

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
    };

    console.log("🚀 Sending lead to webhook:", payload);

    const response = await axios.post(
      "https://services.leadconnectorhq.com/hooks/B5EHDsG7FvoDwVq0QTeJ/webhook-trigger/246b7152-a0c9-407c-ae1f-0332b949d532",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ Webhook response:", response);
  } catch (error) {
    console.error("❌ Error sending lead to webhook:", error);
  }
};


useEffect(() => {
  if (firstName && lastName && email && phone) {
    sendLeadToWebhook();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [firstName, lastName, email, phone]);



  return (
    <div className="min-h-screen bg-white py-4 md:py-6 px-0 md:px-3 lg:px-4">
      <div className="container mx-auto max-w-7xl px-0 md:px-4">
        {/* Logo */}
        <div className="flex justify-center mb-6 md:mb-12 px-4 md:px-0">
          <img src={heliosmedsLogo} alt="heliosmeds" className="h-8 md:h-8" />
        </div>

        <div className="grid lg:grid-cols-[1fr,1.1fr] gap-4 md:gap-6 items-start px-4 md:px-0">
          {/* Left Column - Payment Form */}
          <div className="order-2 lg:order-1 lg:border-r lg:border-gray-200 lg:pr-6">
            <Card className="p-4 md:p-6 shadow-lg border-2 md:border-2 border-y-2 border-x-0 md:border-x-2 border-gray-200 backdrop-blur-sm bg-gray-50 rounded-none md:rounded-xl">
              {/* Header */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                  Payment Details
                </h1>
                <p className="text-sm md:text-base text-gray-900">
                  Secure checkout • SSL encrypted
                </p>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    Contact Information
                  </h3>

                  <div className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className="text-lg font-medium mb-2 block"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            if (errors.firstName) {
                              setErrors((prev) => ({ ...prev, firstName: "" }));
                            }
                          }}
                          className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.firstName ? "border-red-500" : ""
                            }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="lastName"
                          className="text-lg font-medium mb-2 block"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            if (errors.lastName) {
                              setErrors((prev) => ({ ...prev, lastName: "" }));
                            }
                          }}
                          className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.lastName ? "border-red-500" : ""
                            }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-lg font-medium mb-2 block"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 555-5555"
                        value={phone}
                        onChange={(e) => {
                          const cleaned = e.target.value.replace(/\D/g, "");
                          if (cleaned.length <= 10) {
                            setPhone(e.target.value);
                          }
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: "" }));
                          }
                        }}
                        maxLength={14}
                        className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.phone ? "border-red-500" : ""
                          }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-lg font-medium mb-2 block"
                      >
                        Email Address{" "}
                        {!selectedProductId && (
                          <span className="text-xs text-muted-foreground">
                            (Select a plan first)
                          </span>
                        )}
                      </Label>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder={
                            selectedProductId
                              ? "your@email.com"
                              : "Select a plan first"
                          }
                          value={email}
                          disabled={!selectedProductId}
                          onChange={(e) => {
                            const newEmail = e.target.value;
                            setEmail(newEmail);

                            // Real-time validation
                            if (newEmail.trim()) {
                              const isValid = validateEmail(newEmail);
                              setIsEmailValid(isValid);

                              if (isValid && errors.email) {
                                setErrors((prev) => ({ ...prev, email: "" }));
                              }
                            } else {
                              setIsEmailValid(false);
                            }

                            if (errors.email) {
                              setErrors((prev) => ({ ...prev, email: "" }));
                            }

                            // Reset member price when email changes
                            if (memberPrice) {
                              setMemberPrice(null);
                            }
                          }}
                          onBlur={() => {
                            // Validate on blur as well
                            if (email.trim() && !validateEmail(email)) {
                              setErrors((prev) => ({
                                ...prev,
                                email: "Please enter a valid email address",
                              }));
                            }

                            // Check member price for monthly plans
                            if (
                              email.trim() &&
                              validateEmail(email) &&
                              selectedProductId
                            ) {
                              checkMemberPrice(email);
                            }
                          }}
                          className={`h-14 text-lg pr-12 focus:ring-2 focus:ring-gray-200 ${errors.email
                            ? "border-red-500"
                            : email.trim() && isEmailValid
                              ? "border-green-500"
                              : ""
                            } ${!selectedProductId
                              ? "cursor-not-allowed opacity-60"
                              : ""
                            }`}
                        />
                        {/* Validation Icon */}
                        {email.trim() && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {isEmailValid ? (
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                <Check className="w-4 h-4 text-gray-900 stroke-[3]" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                <X className="w-4 h-4 text-gray-900 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                      {email.trim() &&
                        isEmailValid &&
                        !errors.email &&
                        !checkingMemberPrice &&
                        !memberPrice && (
                          <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Email is valid
                          </p>
                        )}
                      {checkingMemberPrice && (
                        <p className="text-blue-600 text-sm mt-1 flex items-center gap-1">
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Checking member price...
                        </p>
                      )}
                      {/* {memberPrice && selectedPlan === "monthly" && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm font-semibold text-green-800 flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Member Price Available!
                          </p>
                          <p className="text-lg font-bold text-green-700 mt-1">
                            Your Price: ${memberPrice}
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Special member pricing applied for first month
                          </p>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">
                    Card Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="cardHolderName"
                        className="text-lg font-medium mb-2 block"
                      >
                        Cardholder Name
                      </Label>
                      <Input
                        id="cardHolderName"
                        placeholder="John Doe"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        className="h-14 text-lg focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="cardNumber"
                        className="text-lg font-medium mb-2 block"
                      >
                        Card Number
                      </Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => {
                            setCardNumber(formatCardNumber(e.target.value));
                            if (errors.cardNumber) {
                              setErrors((prev) => ({
                                ...prev,
                                cardNumber: "",
                              }));
                            }
                          }}
                          maxLength={19}
                          className={`h-14 text-lg pl-12 focus:ring-2 focus:ring-gray-200 ${errors.cardNumber ? "border-red-500" : ""
                            }`}
                        />
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      </div>
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="expiry"
                          className="text-lg font-medium mb-2 block"
                        >
                          Expiry
                        </Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => {
                            setExpiry(formatExpiry(e.target.value));
                            if (errors.expiry) {
                              setErrors((prev) => ({ ...prev, expiry: "" }));
                            }
                          }}
                          maxLength={5}
                          className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.expiry ? "border-red-500" : ""
                            }`}
                        />
                        {errors.expiry && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.expiry}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="cvc"
                          className="text-lg font-medium mb-2 block"
                        >
                          CVV
                        </Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          value={cvc}
                          onChange={(e) => {
                            setCvc(e.target.value.replace(/\D/g, ""));
                            if (errors.cvc) {
                              setErrors((prev) => ({ ...prev, cvc: "" }));
                            }
                          }}
                          maxLength={4}
                          className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.cvc ? "border-red-500" : ""
                            }`}
                        />
                        {errors.cvc && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cvc}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="pt-2 space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Shipping Address
                  </h3>
                  <div>
                    <Label
                      htmlFor="addressLine1"
                      className="text-lg font-medium mb-2 block"
                    >
                      Street Address
                    </Label>
                    <Input
                      ref={shippingAddressRef}
                      id="addressLine1"
                      placeholder="Enter your address"
                      value={addressLine1}
                      onChange={(e) => {
                        setAddressLine1(e.target.value);
                        if (errors.addressLine1) {
                          setErrors((prev) => ({ ...prev, addressLine1: "" }));
                        }
                      }}
                      className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.addressLine1 ? "border-red-500" : ""
                        }`}
                    />
                    {errors.addressLine1 && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.addressLine1}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="addressLine2"
                      className="text-lg font-medium mb-2 block"
                    >
                      Apartment, Suite, etc. (Optional)
                    </Label>
                    <Input
                      id="addressLine2"
                      placeholder="Apt 4B"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      className="h-14 text-lg focus:ring-2 focus:ring-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="city"
                        className="text-lg font-medium mb-2 block"
                      >
                        City
                      </Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          if (errors.city) {
                            setErrors((prev) => ({ ...prev, city: "" }));
                          }
                        }}
                        className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.city ? "border-red-500" : ""
                          }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label
                        htmlFor="state"
                        className="text-lg font-medium mb-2 block"
                      >
                        State
                      </Label>
                      <Select
                        value={state}
                        onValueChange={(value) => {
                          setState(value);
                          if (errors.state) {
                            setErrors((prev) => ({ ...prev, state: "" }));
                          }
                        }}
                      >
                        <SelectTrigger
                          className={`h-14 text-lg ${errors.state ? "border-red-500" : ""
                            }`}
                        >
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {statesList.map((usState) => (
                            <SelectItem
                              key={usState.state_code}
                              value={usState.state_code}
                              className="text-lg py-2"
                            >
                              {usState.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="zipCode"
                      className="text-lg font-medium mb-2 block"
                    >
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={zipCode}
                      onChange={(e) => {
                        setZipCode(e.target.value.replace(/\D/g, ""));
                        if (errors.zipCode) {
                          setErrors((prev) => ({ ...prev, zipCode: "" }));
                        }
                      }}
                      maxLength={5}
                      className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.zipCode ? "border-red-500" : ""
                        }`}
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>

                {/* Different Billing Address Checkbox */}
                <div className="pt-2 flex items-center space-x-3">
                  <Checkbox
                    id="differentBilling"
                    checked={differentBilling}
                    onCheckedChange={(checked) =>
                      setDifferentBilling(checked as boolean)
                    }
                    className="h-5 w-5"
                  />
                  <Label
                    htmlFor="differentBilling"
                    className="text-lg font-medium cursor-pointer"
                  >
                    Use different billing address
                  </Label>
                </div>

                {/* Billing Address (conditional) */}
                {differentBilling && (
                  <div className="pt-2 space-y-4">
                    <h3 className="text-xl font-semibold pt-2 text-gray-900">
                      Billing Address
                    </h3>

                    <div>
                      <Label
                        htmlFor="billingAddressLine1"
                        className="text-lg font-medium mb-2 block"
                      >
                        Street Address
                      </Label>
                      <Input
                        ref={billingAddressRef}
                        id="billingAddressLine1"
                        placeholder="Enter your address"
                        value={billingAddressLine1}
                        onChange={(e) => {
                          setBillingAddressLine1(e.target.value);
                          if (errors.billingAddressLine1) {
                            setErrors((prev) => ({
                              ...prev,
                              billingAddressLine1: "",
                            }));
                          }
                        }}
                        className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.billingAddressLine1 ? "border-red-500" : ""
                          }`}
                      />
                      {errors.billingAddressLine1 && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.billingAddressLine1}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label
                        htmlFor="billingAddressLine2"
                        className="text-lg font-medium mb-2 block"
                      >
                        Apartment, Suite, etc. (Optional)
                      </Label>
                      <Input
                        id="billingAddressLine2"
                        placeholder="Apt 4B"
                        value={billingAddressLine2}
                        onChange={(e) => setBillingAddressLine2(e.target.value)}
                        className="h-14 text-lg focus:ring-2 focus:ring-gray-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="billingCity"
                          className="text-lg font-medium mb-2 block"
                        >
                          City
                        </Label>
                        <Input
                          id="billingCity"
                          placeholder="New York"
                          value={billingCity}
                          onChange={(e) => {
                            setBillingCity(e.target.value);
                            if (errors.billingCity) {
                              setErrors((prev) => ({
                                ...prev,
                                billingCity: "",
                              }));
                            }
                          }}
                          className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.billingCity ? "border-red-500" : ""
                            }`}
                        />
                        {errors.billingCity && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.billingCity}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label
                          htmlFor="billingState"
                          className="text-lg font-medium mb-2 block"
                        >
                          State
                        </Label>
                        <Select
                          value={billingState}
                          onValueChange={(value) => {
                            setBillingState(value);
                            if (errors.billingState) {
                              setErrors((prev) => ({
                                ...prev,
                                billingState: "",
                              }));
                            }
                          }}
                        >
                          <SelectTrigger
                            className={`h-14 text-lg ${errors.billingState ? "border-red-500" : ""
                              }`}
                          >
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {statesList.map((usState) => (
                              <SelectItem
                                key={usState.state_code}
                                value={usState.state_code}
                                className="text-lg py-2"
                              >
                                {usState.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.billingState && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.billingState}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="billingZipCode"
                        className="text-lg font-medium mb-2 block"
                      >
                        ZIP Code
                      </Label>
                      <Input
                        id="billingZipCode"
                        placeholder="10001"
                        value={billingZipCode}
                        onChange={(e) => {
                          setBillingZipCode(e.target.value.replace(/\D/g, ""));
                          if (errors.billingZipCode) {
                            setErrors((prev) => ({
                              ...prev,
                              billingZipCode: "",
                            }));
                          }
                        }}
                        maxLength={5}
                        className={`h-14 text-lg focus:ring-2 focus:ring-gray-200 ${errors.billingZipCode ? "border-red-500" : ""
                          }`}
                      />
                      {errors.billingZipCode && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.billingZipCode}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full py-6 text-lg font-bold shadow-lg md:hover:shadow-xl transition-shadow active:scale-[0.98]"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Processing..."
                      : "Complete Secure Checkout"}
                  </Button>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2 md:pt-3">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">
                    Secured by 256-bit SSL encryption
                  </span>
                </div>

                {/* Terms */}
                <p className="text-[10px] md:text-xs text-gray-400 text-center leading-relaxed pt-2 opacity-80 px-2">
                  By completing checkout, you agree to our terms and authorize
                  recurring payments according to your selected plan.
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column - Plan Selection */}
          <div className="order-1 lg:order-2">
            <div className="mb-4 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
                ✨ Choose Your Plan
              </h2>
              <p className="text-sm md:text-base text-gray-900">
                {medicationData?.medicationType === "tirzepatide"
                  ? "All plans include free shipping and automatic refills. Cancel or change anytime."
                  : "All plans include free shipping, automatic refills, and the flexibility to cancel or change anytime."
                }
              </p>

              {/* Selected Product Info */}
              {/* {selectedProductId && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-green-800">
                    ✓ Selected Product ID: {selectedProductId}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Plan: {selectedPlan}
                  </p>
                </div>
              )} */}
            </div>

            <div className="space-y-3">
              {/* Monthly Plan */}
              <Card
                className={`p-4 md:p-5 rounded-xl cursor-pointer transition-colors duration-200 ${selectedPlan === "monthly"
                  ? "border-2 border-gray-900 bg-gray-900 text-white shadow-xl ring-2 ring-gray-300"
                  : "border-[4px] border-border md:hover:border-gray-300 md:hover:shadow-lg bg-card"
                  }`}
                onClick={() => handlePlanSelection("monthly")}
              >
                <div className="text-center space-y-1.5 md:space-y-2">
                  <h3 className="text-base md:text-lg font-bold">
                    {/* monthly price after email */}
                    🩵 Monthly Plan — {memberPrice ? `$${memberPrice}/month` : (medicationData?.medicationType === "tirzepatide" ? "$399.97/month" : "$199.97/month")}
                  </h3>
                  {loadingProducts ? (
                    <p className="text-xl md:text-2xl font-bold">
                      Loading...
                    </p>
                  ) : (
                    <>
                      {(() => {
                        const product = getProductByPlan("monthly");
                        return product ? (
                          <>
                            <p className="text-xs opacity-90">
                              {product.product_name}
                            </p>
                            
                            {memberPrice ? (
                              // When member price is available, show clean price display
                              <div className="bg-gray-100 rounded-lg p-3 mt-2 text-left border border-gray-600/30">
                                <p className="text-lg text-gray-900 font-bold mb-1">
                                  ${memberPrice}/month
                                </p>
                                <p className="text-xs text-green-600 font-semibold">
                                  🎉 Member Price Applied
                                </p>
                              </div>
                            ) : (
                              // When no member price, show default pricing structure
                              <div className="bg-gray-100 rounded-lg p-3 mt-2 text-left border border-gray-600/30">
                                {/* first month price titel*/}
                                <p className="text-xs text-gray-900 mb-1">
                                  First month: $
                                  {medicationData.medicationType == "semaglutide" ? "199.97" : "399.97"}
                                </p>
                                <p className="text-xs text-gray-900 mb-1">
                                  Thereafter: $
                                  {medicationData.medicationType ==
                                    "semaglutide"
                                    ? "249.97"
                                    : "399.97"}
                                  /month
                                </p>
                                <p className="text-xs text-green-400 font-semibold">
                                  Industry Low Pricing
                                </p>
                              </div>
                            )}
                            <div className="mt-2 text-center space-y-1">
                              <div className={`text-xs space-y-0.5 ${selectedPlan === "monthly" ? "text-white" : "text-gray-600"}`}>
                                <p>📦 1-month supply delivered monthly</p>
                                {medicationData?.medicationType === "tirzepatide" ? (
                                  <>
                                    <p>❌ No savings — pay as you go</p>
                                    <p>✅ Perfect if you're trying it for the first time</p>
                                  </>
                                ) : (
                                  <>
                                    <p>💸 Pay as you go — no long-term commitment</p>
                                    <p>✅ Great if you're trying it for the first time</p>
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {memberPrice ? (
                              // When member price is available, show clean price display
                              <div className="bg-gray-100 rounded-lg p-3 mt-2 text-left border border-gray-600/30">
                                <p className="text-lg text-gray-900 font-bold mb-1">
                                  ${memberPrice}/month
                                </p>
                                <p className="text-xs text-green-600 font-semibold">
                                  🎉 Member Price Applied
                                </p>
                              </div>
                            ) : (
                              // When no member price, show default pricing structure
                              <div
                                className={`rounded-lg p-3 mt-2 text-left ${selectedPlan === "monthly"
                                  ? "bg-gray-100 border border-gray-600/30"
                                  : "bg-gray-100 border border-gray-600/30"
                                  }`}
                              >
                                <p
                                  className={`text-xs mb-1 ${selectedPlan === "monthly"
                                    ? "text-gray-900"
                                    : "text-gray-900"
                                    }`}
                                >
                                  First month: $
                                  {medicationData.medicationType == "semaglutide" ? "199.97" : "399.97"}
                                </p>
                                <p
                                  className={`text-xs mb-1 ${selectedPlan === "monthly"
                                    ? "text-gray-900"
                                    : "text-gray-900"
                                    }`}
                                >
                                  Thereafter: $
                                  {medicationData.medicationType ==
                                    "semaglutide"
                                    ? "249.97"
                                    : "399.97"}
                                  /month
                                </p>
                                <p
                                  className={`text-xs font-semibold ${selectedPlan === "monthly"
                                    ? "text-yellow-400"
                                    : "text-yellow-400"
                                    }`}
                                >
                                  Industry Low Pricing
                                </p>
                              </div>
                            )}
                            <div className="mt-2 text-center space-y-1">
                              <div className={`text-xs space-y-0.5 ${selectedPlan === "monthly" ? "text-white" : "text-gray-600"}`}>
                                <p>📦 1-month supply delivered monthly</p>
                                {medicationData?.medicationType === "tirzepatide" ? (
                                  <>
                                    <p>❌ No savings — pay as you go</p>
                                    <p>✅ Perfect if you're trying it for the first time</p>
                                  </>
                                ) : (
                                  <>
                                    <p>💸 Pay as you go — no long-term commitment</p>
                                    <p>✅ Great if you're trying it for the first time</p>
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </>
                  )}
                </div>
              </Card>

              {/* 3-Month Plan */}
              <Card
                className={`p-4 md:p-5 rounded-xl cursor-pointer transition-colors duration-200 ${selectedPlan === "3-month"
                  ? "border-2 border-gray-900 bg-gray-900 text-white shadow-xl ring-2 ring-gray-300"
                  : "border-[4px] border-border md:hover:border-gray-300 md:hover:shadow-lg bg-card"
                  }`}
                onClick={() => handlePlanSelection("3-month")}
              >
                <div className="text-center space-y-1.5 md:space-y-2">
                  <h3 className="text-base md:text-lg font-bold">
                    💎 3-Month Plan — {medicationData?.medicationType === "tirzepatide" ? "$349.97/month" : "$199.97/month"}
                  </h3>
                  {loadingProducts ? (
                    <p className="text-xl md:text-2xl font-bold">
                      Loading...
                    </p>
                  ) : (
                    <>
                      {(() => {
                        const product = getProductByPlan("3-month");
                        return product ? (
                          <>
                            {/* <p className="text-xl md:text-2xl font-bold">
                                ${(parseFloat(product.price) / 3).toFixed(2)} a
                                Month
                              </p> */}
                            <div
                              className={`rounded-lg p-3 mt-2 text-left ${selectedPlan === "3-month"
                                ? "bg-gray-100 border border-gray-600/30"
                                : "bg-gray-100 border border-gray-600/30"
                                }`}
                            >
                              <p
                                className={`text-xs mb-1 ${selectedPlan === "3-month"
                                  ? "text-gray-900"
                                  : "text-gray-900"
                                  }`}
                              >
                                ${product.price} Total 3 Months
                              </p>
                              <p
                                className={`text-xs font-semibold ${selectedPlan === "3-month"
                                  ? "text-green-400"
                                  : "text-green-400"
                                  }`}
                              >
                                {medicationData?.medicationType === "tirzepatide" ? "$649.94 Total Savings" : "$100 Total Savings"}
                              </p>
                            </div>
                            <div className="mt-2 text-center space-y-1">
                              <div className={`text-xs space-y-0.5 ${selectedPlan === "3-month" ? "text-white" : "text-gray-600"}`}>
                                <p>📦 3-month supply shipped quarterly</p>
                                <p>💰 {medicationData?.medicationType === "tirzepatide" ? "Save $649.94 vs. monthly" : "Save $100 compared to monthly"}</p>
                                <p>⭐ {medicationData?.medicationType === "tirzepatide" ? "Most popular for new subscribers" : "Most popular for new members"}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* <p className="text-xl md:text-2xl font-bold">
                                $149.99
                                <span className="text-base"> a Month</span>
                              </p> */}
                            <div
                              className={`rounded-lg p-3 mt-2 text-left ${selectedPlan === "3-month"
                                ? "bg-gray-100 border border-gray-600/30"
                                : "bg-gray-100 border border-gray-600/30"
                                }`}
                            >
                              <p
                                className={`text-xs mb-1 ${selectedPlan === "3-month"
                                  ? "text-gray-900"
                                  : "text-gray-900"
                                  }`}
                              >
                                $449.97 Total 3 Months
                              </p>
                              <p
                                className={`text-xs font-semibold ${selectedPlan === "3-month"
                                  ? "text-green-400"
                                  : "text-green-400"
                                  }`}
                              >
                                {medicationData?.medicationType === "tirzepatide" ? "$649.94 Total Savings" : "$100 Total Savings"}
                              </p>
                            </div>
                            <div className="mt-2 text-center space-y-1">
                              <div className={`text-xs space-y-0.5 ${selectedPlan === "3-month" ? "text-white" : "text-gray-600"}`}>
                                <p>📦 3-month supply shipped quarterly</p>
                                <p>💰 {medicationData?.medicationType === "tirzepatide" ? "Save $649.94 vs. monthly" : "Save $100 compared to monthly"}</p>
                                <p>⭐ {medicationData?.medicationType === "tirzepatide" ? "Most popular for new subscribers" : "Most popular for new members"}</p>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </>
                  )}
                </div>
              </Card>

              {/* 6-Month Plan */}
              <Card
                className={`p-4 md:p-5 rounded-xl cursor-pointer transition-colors duration-200 ${selectedPlan === "6-month"
                  ? "border-2 border-gray-900 bg-gray-900 text-white shadow-xl ring-2 ring-gray-300"
                  : "border-[4px] border-border md:hover:border-gray-300 md:hover:shadow-lg bg-card"
                  }`}
                onClick={() => handlePlanSelection("6-month")}
              >
                <div className="text-center space-y-1.5 md:space-y-2">
                  <h3 className="text-base md:text-lg lg:text-xl font-bold">
                    ⚡ 6-Month Plan — {medicationData?.medicationType === "tirzepatide" ? "$299.97/month" : "$159.97/month"}
                  </h3>
                  {loadingProducts ? (
                    <p className="text-xl md:text-2xl font-bold">Loading...</p>
                  ) : (
                    <>
                      {(() => {
                        const product = getProductByPlan("6-month");
                        return product ? (
                          <>
                            {/* <p className="text-xl md:text-2xl font-bold">
                                ${(parseFloat(product.price) / 6).toFixed(2)} a
                                Month
                              </p> */}
                            <div
                              className={`rounded-lg p-3 mt-2 text-left ${selectedPlan === "6-month"
                                ? "bg-gray-100 border border-gray-600/30"
                                : "bg-gray-100 border border-gray-600/30"
                                }`}
                            >
                              <p
                                className={`text-xs mb-1 ${selectedPlan === "6-month"
                                  ? "text-gray-900"
                                  : "text-gray-900"
                                  }`}
                              >
                                ${product.price} Total 6 Months
                              </p>
                              <p
                                className={`text-xs font-semibold mb-1 ${selectedPlan === "6-month"
                                  ? "text-green-400"
                                  : "text-green-400"
                                  }`}
                              >
                                {medicationData?.medicationType === "tirzepatide" ? "$749.91 Total Savings" : "$900 Total Savings"}
                              </p>
                              <p
                                className={`text-xs ${selectedPlan === "6-month"
                                  ? "text-gray-900"
                                  : "text-gray-900"
                                  }`}
                              >
                                3 month Supply today & 3 more in 90 Days
                              </p>
                            </div>
                            <div className="mt-2 text-center space-y-1">
                              <div className={`text-xs space-y-0.5 ${selectedPlan === "6-month" ? "text-white" : "text-gray-600"}`}>
                                <p>📦 Two 3-month shipments (90 days apart)</p>
                                <p>💰 {medicationData?.medicationType === "tirzepatide" ? "Save $749.91 vs. monthly" : "Save $900 compared to monthly"}</p>
                                <p>{medicationData?.medicationType === "tirzepatide" ? "✅ Great balance of savings & flexibility" : "🏆 Best value for consistent results"}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* <p className="text-xl md:text-2xl font-bold">
                              $134.99<span className="text-base"> a Month</span>
                            </p> */}
                            <div
                              className={`rounded-lg p-3 mt-2 text-left ${selectedPlan === "6-month"
                                ? "bg-gray-100 border border-gray-600/30"
                                : "bg-gray-100 border border-gray-600/30"
                                }`}
                            >
                              <p
                                className={`text-xs mb-1 ${selectedPlan === "6-month"
                                  ? "text-gray-900"
                                  : "text-gray-900"
                                  }`}
                              >
                                $809.95 Total 6 Months
                              </p>
                              <p
                                className={`text-xs font-semibold mb-1 ${selectedPlan === "6-month"
                                  ? "text-green-400"
                                  : "text-green-400"
                                  }`}
                              >
                                {medicationData?.medicationType === "tirzepatide" ? "$749.91 Total Savings" : "$900 Total Savings"}
                              </p>
                              <p
                                className={`text-xs ${selectedPlan === "6-month"
                                  ? "text-gray-900"
                                  : "text-gray-900"
                                  }`}
                              >
                                3 month Supply today & 3 more in 90 Days
                              </p>
                            </div>
                            <div className="mt-2 text-center space-y-1">
                              <div className={`text-xs space-y-0.5 ${selectedPlan === "6-month" ? "text-white" : "text-gray-600"}`}>
                                <p>📦 Two 3-month shipments (90 days apart)</p>
                                <p>💰 {medicationData?.medicationType === "tirzepatide" ? "Save $749.91 vs. monthly" : "Save $900 compared to monthly"}</p>
                                <p>{medicationData?.medicationType === "tirzepatide" ? "✅ Great balance of savings & flexibility" : "🏆 Best value for consistent results"}</p>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </>
                  )}
                </div>
              </Card>

              {/* 12-Month Plan */}
              <Card
                className={`p-4 md:p-5 rounded-xl cursor-pointer transition-colors duration-200 ${selectedPlan === "12-month"
                  ? "border-2 border-gray-900 bg-gray-900 text-white shadow-xl ring-2 ring-gray-300"
                  : "border-[4px] border-border md:hover:border-gray-300 md:hover:shadow-lg bg-card"
                  }`}
                onClick={() => handlePlanSelection("12-month")}
              >
                <div className="text-center space-y-1.5 md:space-y-2">
                  <h3 className="text-base md:text-lg lg:text-xl font-bold">
                    🏆 12-Month Plan — {medicationData?.medicationType === "tirzepatide" ? "$249.99/month" : "$149.97/month"}
                  </h3>
                  {loadingProducts ? (
                    <p className="text-xl md:text-2xl font-bold">Loading...</p>
                  ) : (
                    <>
                      {(() => {
                        const product = getProductByPlan("12-month");
                        return product ? (
                          <>
                            <div
                              className={`rounded-lg p-3 mt-2 text-left ${selectedPlan === "12-month"
                                ? "bg-gray-100 border border-gray-600/30"
                                : "bg-gray-100 border border-gray-600/30"
                                }`}
                            >
                              <p
                                className={`text-xs mb-1 ${selectedPlan === "12-month"
                                  ? "text-gray-900"
                                  : "text-gray-900"
                                  }`}
                              >
                                ${product.price} Total 12 Months
                              </p>
                              <p
                                className={`text-xs font-semibold mb-1 ${selectedPlan === "12-month"
                                  ? "text-green-400"
                                  : "text-green-400"
                                  }`}
                              >
                                {medicationData?.medicationType === "tirzepatide" ? "$2,599.91 Total Savings" : "$1,500 Total Savings"}
                              </p>
                              <p
                                className={`text-xs ${selectedPlan === "12-month"
                                  ? "text-gray-900"
                                  : "text-gray-900"
                                  }`}
                              >
                                Four 3-month shipments (every 90 days)
                              </p>
                            </div>
                            <div className="mt-2 text-center space-y-1">
                              <div className={`text-xs space-y-0.5 ${selectedPlan === "12-month" ? "text-white" : "text-gray-600"}`}>
                                <p>📦 Four 3-month shipments (every 90 days)</p>
                                <p>💰 {medicationData?.medicationType === "tirzepatide" ? "Save $2,599.91 vs. monthly" : "Save $1,500 compared to monthly"}</p>
                                <p>🏆 {medicationData?.medicationType === "tirzepatide" ? "Maximum savings — best long-term value" : "Ultimate value for committed members"}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className={`rounded-lg p-3 mt-2 text-left ${selectedPlan === "12-month"
                                ? "bg-gray-100 border border-gray-600/30"
                                : "bg-gray-100 border border-gray-600/30"
                                }`}
                            >
                              <p
                                className={`text-xs mb-1 ${selectedPlan === "12-month"
                                  ? "text-gray-900"
                                  : "text-gray-900"
                                  }`}
                              >
                                ${medicationData?.medicationType === "tirzepatide" ? "2,399.88" : "1,439.88"} Total 12 Months
                              </p>
                              <p
                                className={`text-xs font-semibold mb-1 ${selectedPlan === "12-month"
                                  ? "text-green-400"
                                  : "text-green-400"
                                  }`}
                              >
                                {medicationData?.medicationType === "tirzepatide" ? "$2,599.91 Total Savings" : "$1,500 Total Savings"}
                              </p>
                              <p
                                className={`text-xs ${selectedPlan === "12-month"
                                  ? "text-gray-900"
                                  : "text-gray-900"
                                  }`}
                              >
                                Four 3-month shipments (every 90 days)
                              </p>
                            </div>
                            <div className="mt-2 text-center space-y-1">
                              <div className={`text-xs space-y-0.5 ${selectedPlan === "12-month" ? "text-white" : "text-gray-600"}`}>
                                <p>📦 Four 3-month shipments (every 90 days)</p>
                                <p>💰 {medicationData?.medicationType === "tirzepatide" ? "Save $2,599.91 vs. monthly" : "Save $1,500 compared to monthly"}</p>
                                <p>🏆 {medicationData?.medicationType === "tirzepatide" ? "Maximum savings — best long-term value" : "Ultimate value for committed members"}</p>
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </>
                  )}
                </div>
              </Card>

              {/* Coupon Code Section */}
              <Card className="p-4 md:p-5 bg-gray-50 border border-gray-200 shadow-md">
                <h3 className="text-base md:text-lg font-bold mb-3 text-gray-900">
                  Have a Coupon Code?
                </h3>
                {!appliedCoupon ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value.toUpperCase());
                          setCouponError("");
                        }}
                        className="h-12 text-base flex-1"
                        disabled={checkingCoupon || !selectedProductId}
                      />
                      <Button
                        onClick={checkCouponCode}
                        disabled={checkingCoupon || !couponCode.trim() || !selectedProductId}
                        className="h-12 px-6 font-semibold whitespace-nowrap"
                        variant="default"
                      >
                        {checkingCoupon ? "Checking..." : "Apply"}
                      </Button>
                    </div>
                    {couponError && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {couponError}
                      </p>
                    )}
                    {!selectedProductId && (
                      <p className="text-amber-600 text-sm">
                        Please select a plan first to apply coupon
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-green-800 flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          Coupon Applied: {couponCode}
                        </p>
                        {appliedCoupon.discount_percent && parseFloat(appliedCoupon.discount_percent) > 0 && (
                          <p className="text-lg font-bold text-green-700 mt-1">
                            {appliedCoupon.discount_percent}% OFF
                          </p>
                        )}
                        {appliedCoupon.discount_amount && parseFloat(appliedCoupon.discount_amount) > 0 && (
                          <p className="text-lg font-bold text-green-700 mt-1">
                            ${appliedCoupon.discount_amount} OFF
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeCoupon}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </Card>

              {/* Order Summary */}
              {selectedProductId && (
                <Card className="p-4 md:p-5 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 shadow-lg">
                  <h3 className="text-base md:text-lg font-bold mb-4 text-center text-gray-900">
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                      <span className="text-sm md:text-base text-gray-900">Subtotal:</span>
                      <span className="text-base md:text-lg font-semibold text-gray-900">
                        ${calculateFinalPrice().subtotal}
                      </span>
                    </div>
                    {appliedCoupon && parseFloat(calculateFinalPrice().discount) > 0 && (
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-sm md:text-base text-green-700 font-medium">
                          Discount:
                        </span>
                        <span className="text-base md:text-lg font-bold text-green-700">
                          -${calculateFinalPrice().discount}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-base md:text-lg font-bold text-gray-900">Total:</span>
                      <span className="text-xl md:text-2xl font-bold text-gray-900">
                        ${calculateFinalPrice().total}
                      </span>
                    </div>
                  </div>
                </Card>
              )}

              {/* What's Included */}
              <Card className="p-4 md:p-5 bg-gray-50 border border-gray-200 shadow-md">
                <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-center text-gray-900">
                  Everything Included
                </h3>
                <div className="space-y-3">
                  {/* <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">💉</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-900">
                        {selectedPlan === "monthly" &&
                          "1-month supply delivered"}
                        {selectedPlan === "3-month" &&
                          "3-month supply delivered"}
                        {selectedPlan === "6-month" &&
                          "6-month supply delivered"}
                      </p>
                    </div>
                  </div> */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-gray-900">All Dosage Levels</span>
                      <span className="font-bold text-gray-900 text-xs">
                      Included
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-gray-900">
                        Telehealth Consultation
                      </span>
                      <span className="font-bold text-gray-900 text-xs">
                      Included
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-gray-900">24/7 Clinical Support</span>
                      <span className="font-bold text-gray-900 text-xs">
                      Included
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <span className="text-gray-900">Express Cold Shipping</span>
                      <span className="font-bold text-gray-900 text-xs">
                      Included
                      </span>
                    </div>
                    {selectedPlan === "6-month" && (
                      <div className="flex items-center justify-between text-xs md:text-sm pt-1.5 border-t border-gray-200">
                        <span className="text-gray-900">Priority Support</span>
                        <span className="font-bold text-gray-900 text-xs">
                        Included
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Savings Modal */}
        <Dialog open={showSavingsModal} onOpenChange={setShowSavingsModal}>
          <DialogContent className="max-w-xl p-0 overflow-hidden border-2 border-gray-200">
            {/* Header with gradient */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-5 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
              </div>
              <div className="relative">
                <div className="flex justify-center mb-3">
                  <div className="bg-gray-100 border border-gray-600/30 p-3 rounded-full backdrop-blur-sm">
                    <Sparkles className="w-8 h-8" />
                  </div>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-bold mb-2">
                  Wait! Unlock Huge Savings 💰
                </DialogTitle>
                <p className="text-base md:text-lg text-gray-900-foreground/90">
                  Switch to a multi-month plan and save big on your weight loss
                  journey
                </p>
              </div>
            </div>

            {/* Savings Cards */}
            <div className="p-5 space-y-3 bg-gradient-to-b from-background to-gray-50">
              {!modalSelectedPlan ? (
                <>
                  {/* 3 Month Plan */}
                  {(() => {
                    const product = getProductByPlan("3-month");
                    return product ? (
                      <Card
                        className="p-4 border-2 border-gray-200 hover:border-gray-300 transition-all cursor-pointer hover:shadow-lg bg-white"
                        onClick={() => setModalSelectedPlan("3-month")}
                      >
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex-1 min-w-[160px]">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold">
                                💎 3-Month Plan
                              </h3>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              ${product.price} total
                            </p>
                            <div className="text-xs text-gray-600 space-y-0.5 mt-2">
                              <p>📦 3-month supply shipped quarterly</p>
                              <p>💰 {medicationData?.medicationType === "tirzepatide" ? "Save $649.94 vs. monthly" : "Save $100 compared to monthly"}</p>
                              <p>⭐ {medicationData?.medicationType === "tirzepatide" ? "Most popular for new subscribers" : "Most popular for new members"}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-green-600 font-bold text-base mb-1">
                              <TrendingDown className="w-4 h-4" />
                              Great Value
                            </div>
                          </div>
                        </div>
                      </Card>
                    ) : null;
                  })()}

                  {/* 6 Month Plan */}
                  {(() => {
                    const product = getProductByPlan("6-month");
                    return product ? (
                      <Card
                        className="p-4 border-2 border-gray-200 hover:border-gray-300 transition-all cursor-pointer hover:shadow-lg bg-white"
                        onClick={() => setModalSelectedPlan("6-month")}
                      >
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex-1 min-w-[160px]">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold">
                                ⚡ 6-Month Plan
                              </h3>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              ${product.price} total
                            </p>
                            <div className="text-xs text-gray-600 space-y-0.5 mt-2">
                              <p>📦 Two 3-month shipments (90 days apart)</p>
                              <p>💰 {medicationData?.medicationType === "tirzepatide" ? "Save $749.91 vs. monthly" : "Save $900 compared to monthly"}</p>
                              <p>{medicationData?.medicationType === "tirzepatide" ? "✅ Great balance of savings & flexibility" : "🏆 Best value for consistent results"}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-green-600 font-bold text-base mb-1">
                              <TrendingDown className="w-4 h-4" />
                              Better Value
                            </div>
                          </div>
                        </div>
                      </Card>
                    ) : null;
                  })()}

                  {/* 12 Month Plan */}
                  {(() => {
                    const product = getProductByPlan("12-month");
                    return product ? (
                      <Card
                        className="p-4 border-2 border-green-200 hover:border-green-300 transition-all cursor-pointer hover:shadow-lg bg-gradient-to-br from-green-50 to-white"
                        onClick={() => setModalSelectedPlan("12-month")}
                      >
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div className="flex-1 min-w-[160px]">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold">
                                🏆 12-Month Plan
                              </h3>
                            </div>
                            <p className="text-muted-foreground text-sm">
                              ${product.price} total
                            </p>
                            <div className="text-xs text-gray-600 space-y-0.5 mt-2">
                              <p>📦 Four 3-month shipments (every 90 days)</p>
                              <p>💰 {medicationData?.medicationType === "tirzepatide" ? "Save $2,599.91 vs. monthly" : "Save $1,500 compared to monthly"}</p>
                              <p>🏆 {medicationData?.medicationType === "tirzepatide" ? "Maximum savings — best long-term value" : "Ultimate value for committed members"}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-green-600 font-bold text-base mb-1">
                              <TrendingDown className="w-4 h-4" />
                              Best Value
                            </div>
                          </div>
                        </div>
                      </Card>
                    ) : null;
                  })()}

                  {/* Continue with Monthly Button */}
                  <div className="pt-3 space-y-2">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={async () => {
                        setShowSavingsModal(false);
                        await submitOrder("monthly");
                      }}
                      disabled={isSubmitting}
                      className="w-full text-base py-5 border-2 font-semibold hover:bg-accent/50"
                    >
                      {isSubmitting
                        ? "Processing..."
                        : "No thanks, continue with monthly plan"}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground font-medium">
                      {(() => {
                        const monthlyProduct = getProductByPlan("monthly");
                        if (!monthlyProduct) return "You'll pay $149.97/month without any savings";

                        let monthlyPrice = memberPrice && selectedPlan === "monthly"
                          ? parseFloat(memberPrice)
                          : parseFloat(monthlyProduct.price);

                        let monthlyDiscount = 0;

                        if (appliedCoupon) {
                          if (appliedCoupon.discount_percent && parseFloat(appliedCoupon.discount_percent) > 0) {
                            monthlyDiscount = (monthlyPrice * parseFloat(appliedCoupon.discount_percent)) / 100;
                          } else if (appliedCoupon.discount_amount && parseFloat(appliedCoupon.discount_amount) > 0) {
                            monthlyDiscount = parseFloat(appliedCoupon.discount_amount);
                          }
                        }

                        const finalMonthlyPrice = Math.max(0, monthlyPrice - monthlyDiscount);

                        if (appliedCoupon && monthlyDiscount > 0) {
                          return `You'll pay $${finalMonthlyPrice.toFixed(2)}/month with your discount`;
                        }

                        return "You'll pay $149.97/month without any savings";
                      })()}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Selected Plan Review */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold mb-1">
                      Review Your Selection
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You've chosen a great plan with huge savings!
                    </p>
                  </div>

                  <Card className="p-5 border-2 border-green-500 bg-gradient-to-br from-green-50 to-green-100/50">
                    <div className="flex items-center justify-center mb-3">
                      <div className="bg-green-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        {modalSelectedPlan === "12-month"
                          ? "ULTIMATE VALUE 🏆"
                          : modalSelectedPlan === "6-month"
                          ? "BEST VALUE ⭐"
                          : "GREAT CHOICE ✓"}
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <h4 className="text-2xl font-bold">
                        {modalSelectedPlan === "3-month" && "3 Months Plan"}
                        {modalSelectedPlan === "6-month" && "6 Months Plan"}
                        {modalSelectedPlan === "12-month" && "12 Months Plan"}
                      </h4>

                      {(() => {
                        const product = getProductByPlan(modalSelectedPlan);
                        return product ? (
                          <>
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-3xl font-bold text-green-700">
                                ${product.price}
                              </span>
                            </div>

                            <div className="bg-white rounded-lg p-4 space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-base">Product:</span>
                                <span className="text-sm font-bold text-right">
                                  {product.product_name}
                                </span>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t">
                                <span className="text-base font-semibold">
                                  Total Price:
                                </span>
                                <span className="text-2xl font-bold text-green-600">
                                  ${product.price}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : null;
                      })()}
                    </div>
                  </Card>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-3">
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={proceedWithSelectedPlan}
                      className="w-full text-lg py-5 font-bold"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setModalSelectedPlan(null)}
                      className="w-full text-base py-4 border-2"
                    >
                      ← Choose Different Plan
                    </Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Payment;
