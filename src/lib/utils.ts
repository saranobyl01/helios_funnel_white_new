// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // Get stored tracking parameters
// export const getTrackingParams = () => {
//   const stored = localStorage.getItem('trackingParams');
//   if (stored) {
//     return JSON.parse(stored);
//   }
//   return {
//     sub1: '',
//     sub2: '',
//     sub3: '',
//     sub4: '',
//     sub5: '',
//     clickId: '',
//     uid: '',
//     oid: '',
//     affid: '',
//     transactionId: '',
//   };
// };

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Capture and store tracking parameters from URL
export const captureTrackingParams = () => {
  const params = new URLSearchParams(window.location.search);
  
  // Try to get transaction_id from URL parameter first
  const transactionIdFromUrl = params.get('transaction_id') || params.get('tid') || '';
  
  const trackingData = {
    sub1: params.get('sub1') || '',
    sub2: params.get('sub2') || '',
    sub3: params.get('sub3') || '',
    sub4: params.get('sub4') || '',
    sub5: params.get('sub5') || '',
    clickId: params.get('click_id') || params.get('clickid') || '',
    uid: params.get('uid') || '',
    oid: params.get('oid') || '',
    affid: params.get('affid') || '',
    transactionId: transactionIdFromUrl, // Get from URL if available
  };
  
  console.log('Captured tracking params from URL:', trackingData);
  
  // Only store if we have at least one tracking parameter
  if (Object.values(trackingData).some(val => val !== '')) {
    localStorage.setItem('trackingParams', JSON.stringify(trackingData));
  }
  
  return trackingData;
};

// Generate and store transaction ID (only once)
export const generateTransactionId = () => {
  const trackingParams = getTrackingParams();
  
  // If we already have a transaction ID, return it
  if (trackingParams.transactionId) {
    return trackingParams.transactionId;
  }
  
  // Generate new transaction ID
  const transactionId = `tid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Store it
  const updatedParams = { ...trackingParams, transactionId };
  localStorage.setItem('trackingParams', JSON.stringify(updatedParams));
  
  return transactionId;
};

// Get stored tracking parameters
export const getTrackingParams = () => {
  const stored = localStorage.getItem('trackingParams');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    sub1: '',
    sub2: '',
    sub3: '',
    sub4: '',
    sub5: '',
    clickId: '',
    uid: '',
    oid: '',
    affid: '',
    transactionId: '',
  };
};



// Get all cookies for debugging
export const getAllCookies = () => {
  const cookies: { [key: string]: string } = {};
  const cookieString = document.cookie;
  
  console.log('========================');
  console.log('🍪 Raw document.cookie string:', cookieString);
  console.log('🍪 Cookie string length:', cookieString.length);
  console.log('========================');
  
  if (cookieString) {
    const cookiePairs = cookieString.split(';');
    console.log('🍪 Number of cookies found:', cookiePairs.length);
    
    cookiePairs.forEach((cookie, index) => {
      const trimmed = cookie.trim();
      const equalIndex = trimmed.indexOf('=');
      if (equalIndex > 0) {
        const name = trimmed.substring(0, equalIndex);
        const value = trimmed.substring(equalIndex + 1);
        cookies[name] = value;
        console.log(`🍪 Cookie ${index + 1}: "${name}" = "${value}"`);
      }
    });
  } else {
    console.log('⚠️ document.cookie is EMPTY - cookies might be HttpOnly or on different domain');
  }
  
  console.log('========================');
  console.log('🍪 All parsed cookies object:', cookies);
  console.log('🍪 Cookie names found:', Object.keys(cookies));
  console.log('========================');
  return cookies;
};

// Get cookie value by name
export const getCookie = (name: string): string => {
  console.log(`🔍 Looking for cookie with name: "${name}"`);
  const cookieString = document.cookie;
  console.log(`🔍 document.cookie = "${cookieString}"`);
  
  const value = `; ${cookieString}`;
  const parts = value.split(`; ${name}=`);
  
  console.log(`🔍 Split into ${parts.length} parts`);
  
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift() || '';
    console.log(`✅ Found cookie "${name}" with value: "${cookieValue}"`);
    return cookieValue;
  }
  
  console.log(`❌ Cookie "${name}" not found`);
  return '';
};  

// Get transaction_id from cookie OR URL OR localStorage
export const getTransactionIdFromCookie = (): string => {
  console.log('\n');
  console.log('═══════════════════════════════════════════════════');
  console.log('🔎 SEARCHING FOR TRANSACTION_ID');
  console.log('═══════════════════════════════════════════════════');
  console.log('Current URL:', window.location.href);
  console.log('Current domain:', window.location.hostname);
  console.log('═══════════════════════════════════════════════════');
  
  // First, show ALL cookies available
  const allCookies = getAllCookies();
  
  console.log('\n📋 STEP 1: Checking Cookies');
  console.log('─────────────────────────────────────────────────');
  
  // 1. Try to get from cookies (different possible names)
  const possibleNames = ['transaction_id', 'transactionId', 'tid', 'TID', '_transaction_id'];
  for (const name of possibleNames) {
    const value = getCookie(name);
    if (value) {
      console.log(`✅ SUCCESS! Found transaction ID from cookie "${name}":`, value);
      console.log('═══════════════════════════════════════════════════\n');
      return value;
    }
  }
  console.log('❌ No transaction_id found in cookies');
  console.log('⚠️  This might mean:');
  console.log('   - Cookie is HttpOnly (set by server, not accessible by JS)');
  console.log('   - Cookie is set for different domain/path');
  console.log('   - Cookie name is different than expected');
  
  console.log('\n📋 STEP 2: Checking URL Parameters');
  console.log('─────────────────────────────────────────────────');
  const params = new URLSearchParams(window.location.search);
  const tidFromUrl = params.get('transaction_id') || params.get('tid') || '';
  if (tidFromUrl) {
    console.log('✅ SUCCESS! Found transaction ID from URL parameter:', tidFromUrl);
    // Store it in localStorage for future use
    const trackingParams = getTrackingParams();
    trackingParams.transactionId = tidFromUrl;
    localStorage.setItem('trackingParams', JSON.stringify(trackingParams));
    console.log('💾 Stored in localStorage for future use');
    console.log('═══════════════════════════════════════════════════\n');
    return tidFromUrl;
  }
  console.log('❌ No transaction_id found in URL parameters');
  
  console.log('\n📋 STEP 3: Checking localStorage');
  console.log('─────────────────────────────────────────────────');
  const trackingParams = getTrackingParams();
  if (trackingParams.transactionId) {
    console.log('✅ SUCCESS! Found transaction ID from localStorage:', trackingParams.transactionId);
    console.log('═══════════════════════════════════════════════════\n');
    return trackingParams.transactionId;
  }
  console.log('❌ No transaction_id found in localStorage');
  
  console.log('\n⚠️  TRANSACTION_ID NOT FOUND IN ANY SOURCE');
  console.log('═══════════════════════════════════════════════════\n');
  return '';
};
