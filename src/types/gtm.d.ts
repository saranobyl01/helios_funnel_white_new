/// <reference types="vite/client" />

interface Window {
  dataLayer?: Array<any>;
}

// GTM Ecommerce Item Type
interface GTMEcommerceItem {
  item_id: string | number;
  item_name: string;
  item_category?: string;
  price: number;
  quantity: number;
}

