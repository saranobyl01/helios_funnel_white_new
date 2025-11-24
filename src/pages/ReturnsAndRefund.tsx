import Navbar from "@/components/Navbar";
import React, { useEffect } from "react";
import Footer from "@/components/Footer";

const ReturnsAndRefund = () => {
     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div>
    <Navbar/>
    <div className="mx-auto pt-[80.8px] ">
        <div className="py-6  px-2 bg-[#eaebf5] mb-8">
            <h2 className="text-3xl lg:text-6xl sm:text-4xl md:text-3xl font-bold  text-primary container mx-auto text-center md:text-left">
                Returns & Refund Policy
            </h2>
        </div>
    <div className="container px-3 sm:px-3 md:px-4 lg:px-8 mx-auto">
      <p className="mb-6 leading-relaxed text-lg">
        At <span className="font-bold">FMMeds</span>, we strive to provide the highest level of quality healthcare, 
        including frictionless access to medical providers and medications at prices that are affordable and accessible. 
        We also make every effort to provide excellent patient care before and after your purchase. If you have an issue 
        with your order or product, please reach out to our patient care team at{" "}
        <a href="tel:8889968639" className="text-blue-600 hover:underline underline">
          +1 866 575 9247
        </a>{" "}
        or{" "}
        <a
          href="mailto:support@heliosmeds.com"
          className="text-blue-600 hover:underline underline"
        >
          support@heliosmeds.com
        </a>.
        <br />
        <br />
        Below are our categories and how we can help you after the sale:
      </p>

      {/* PRESCRIPTION MEDICATIONS */}
      <h3 className="text-2xl text-primary font-bold mt-8 mb-3">
        PRESCRIPTION MEDICATIONS:
      </h3>
      <p className="mb-6 leading-relaxed text-lg">
        State and Federal regulations do not allow the return of prescription medications after being dispensed by the
        pharmacy. Once your method of payment has been charged and your package has been handed over to the carrier
        (USPS, FedEx, UPS), all sales are final. You can always log in to your{" "}
        <span className="font-bold">fmmeds.com</span> account before your products ship to change your address,
        payment method, or to cancel your subscription. If your prescription medication arrives damaged or is lost
        during transit, please contact our patient care team at{" "}
        <a href="tel:8889968639" className="text-blue-600 hover:underline underline">
          +1 866 575 9247
        </a>{" "}
        or{" "}
        <a
          href="mailto:support@heliosmeds.com"
          className="text-blue-600 hover:underline underline"
        >
          support@heliosmeds.com
        </a>.
      </p>

      {/* NON-PRESCRIPTION PRODUCTS */}
      <h3 className="text-2xl text-primary font-bold mt-8 mb-3">
        NON-PRESCRIPTION (OVER THE COUNTER) PRODUCTS:
      </h3>
      <p className="mb-6 leading-relaxed text-lg">
        FMMeds may accept returns on unopened, non-prescription items up to 30 days after purchase. You will be
        responsible for paying the return shipping cost, and we do not accept COD returns. If you need to return an
        item, please contact our patient care team at{" "}
        <a href="tel:8889968639" className="text-blue-600 hover:underline underline">
          +1 866 575 9247
        </a>{" "}
        or{" "}
        <a
          href="mailto:support@heliosmeds.com"
          className="text-blue-600 hover:underline underline"
        >
          support@heliosmeds.com
        </a>. Include your order number, reason for return, and the product name. FMMeds reserves the right to deny a
        return that does not arrive in its original condition or appears tampered with or opened. After we receive and
        approve the returned product, your purchase price will be refunded to your original method of payment.
      </p>

      {/* ADDRESS */}
      <h3 className="text-2xl text-primary font-bold mt-8 mb-3">
        Address for Returns:
      </h3>
      <div className="mb-6 leading-relaxed text-lg">
        <p>Helios Meds / Manifest Pharmacy</p>
        <p>1018 S. Batesville Rd</p>
        <p>Building 4-A</p>
        <p>Greer, SC 29650</p>
      </div>

      {/* LOST PACKAGES */}
      <h3 className="text-2xl text-primary font-bold mt-8 mb-3">
        LOST PACKAGES:
      </h3>
      <p className="leading-relaxed text-lg mb-8">
        In the rare case your package is lost in transit, FMMeds will reship your prescription or non-prescription order.
        We will work with your carrier (USPS, FedEx, UPS) to locate your package and have it redirected if needed.
        Weather may occasionally delay delivery times, but since we currently do not ship refrigerated products, your
        product will not be affected by increased transit time. If your package is lost in transit or does not arrive at
        the shipping address you provided, please contact our patient care team at{" "}
        <a href="tel:8889968639" className="text-blue-600 hover:underline underline">
          +1 866 575 9247
        </a>{" "}
        or{" "}
        <a
          href="mailto:support@heliosmeds.com"
          className="text-blue-600 hover:underline underline"
        >
          support@heliosmeds.com
        </a>.
      </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ReturnsAndRefund;
