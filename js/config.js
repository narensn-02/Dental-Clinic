/**
 * ====================================================================
 * SmileCare Dental Studio - Clinic Configuration File
 * ====================================================================
 * 
 * Freelancer / Clinic Owner Instructions:
 * Edit the values below to customize the clinic's details instantly.
 * All changes will reflect across the entire website automatically!
 */

const CLINIC_CONFIG = {
  // Clinic Branding
  name: "SmileCare Dental Studio",
  tagline: "Gentle, Modern & Personalized Dental Care",
  establishedYear: 2014,
  yearsOfExperience: "10+",

  // Contact Information (Demo Placeholders - Replace before going live)
  contact: {
    phone: "+91 98765 43210",
    phoneRaw: "+919876543210", // Used for tel: links
    whatsapp: "+91 98765 43210",
    whatsappRaw: "919876543210", // Used for WhatsApp wa.me links
    email: "hello@smilecaredemo.example",
    website: "https://smilecare-chennai.demo",
    
    // Address Details
    address: {
      line1: "42, Khader Nawaz Khan Road",
      line2: "Opposite High Street Boutique, Nungambakkam",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600006",
      country: "India",
      landmark: "Near Nungambakkam High Road Junction",
      // Google Maps Coordinates / Embed Query
      mapQuery: "Chennai, Tamil Nadu, India"
    },

    // Clinic Working Hours
    hours: {
      weekdays: "Monday – Saturday: 9:00 AM – 8:00 PM",
      sunday: "Sunday: 10:00 AM – 2:00 PM (By Prior Appointment)",
      emergency: "Emergency Dental Line: 24/7 on call"
    }
  },

  // Trust Statistics (Demo numbers for presentation)
  stats: {
    experience: "10+",
    happySmiles: "8,500+",
    expertDentists: "6+",
    satisfactionRate: "99.4%"
  },

  // Social Links (Placeholders)
  social: {
    instagram: "https://instagram.com/smilecaredentaldemo",
    facebook: "https://facebook.com/smilecaredentaldemo",
    googleMaps: "https://maps.google.com/?q=Chennai,+Tamil+Nadu",
    youtube: "https://youtube.com/@smilecaredentaldemo"
  },

  // Demo Mode Banner Flag
  demoMode: {
    enabled: true,
    bannerText: "Demo Website Preview • Created for Dental Practice Showcase in Chennai",
    disclaimer: "All doctor names, patient testimonials, and contact phone numbers on this demo site are placeholders for evaluation."
  }
};

// Export to window for global access
if (typeof window !== "undefined") {
  window.CLINIC_CONFIG = CLINIC_CONFIG;
}
