/// <reference types="vite/client" />

// Google Tag Manager dataLayer type definitions
interface Window {
  dataLayer?: Array<{
    event?: string;
    ecommerce?: {
      transaction_id?: string;
      value?: number;
      currency?: string;
      items?: Array<{
        item_id?: string | number;
        item_name?: string;
        price?: number;
        quantity?: number;
      }>;
    };
    [key: string]: any;
  }>;
  google?: {
    maps: {
      places: {
        Autocomplete: new (
          inputField: HTMLInputElement,
          options?: {
            types?: string[];
            componentRestrictions?: { country: string };
          }
        ) => {
          addListener: (event: string, callback: () => void) => void;
          getPlace: () => {
            formatted_address?: string;
            address_components?: Array<{
              long_name: string;
              short_name: string;
              types: string[];
            }>;
          };
        };
      };
    };
  };
}
