# 🦷 SmileCare Dental Studio — Demo Website

A complete, modern, minimal, and premium demo website crafted for a dental clinic located in **Chennai, Tamil Nadu, India**. 

Designed specifically for freelancers to showcase a high-converting, professional web presence to a prospective dental clinic client.

---

## 🌟 Key Features & Sections

| Section | Description |
| :--- | :--- |
| **A. Navigation Bar** | Sticky header with blur glassmorphism, logo, full navigation links, telephone click-to-call, "Book Appointment" CTA button, and mobile hamburger drawer. |
| **B. Hero Section** | High-impact headline *"Your Smile Deserves the Best Care"*, trust indicators (10+ Years Experience, Patient-Focused, Modern Tech), dual CTAs, and floating trust badges. |
| **C. About Us** | Professional narrative covering hygiene, autoclave sterilization, patient comfort, and 10+ years experience. |
| **D. 8 Dental Treatments** | Service cards with category filters (Preventive, Restorative, Cosmetic, Kids) and *"Book Consultation"* buttons that pre-select the treatment in the form. |
| **E. Clinic Ambience** | Responsive 6-photo gallery (Reception, Lounge, Operatory, Digital Equipment, Consultation, Sterilization) with interactive Lightbox zoom modal. |
| **F. Why Choose Us** | 6 value-proposition cards highlighting low-radiation X-rays, zero wait-time policy, anxiety-free care, and transparent pricing. |
| **G. Patient Reviews** | 3 tasteful demo testimonials with patient first names, star ratings, and clear demo presentation badges. |
| **H. Appointment Booking** | Validated form (Name, 10-digit Indian mobile, Treatment, Date, Slot, Symptoms) with an interactive appointment slip and **WhatsApp Booking Forwarder**. |
| **I. Contact & Map** | Chennai address (Nungambakkam), working hours, helpline, email, and GPS map frame with "Get Directions" link. |
| **J. Modern Footer** | 4-column layout with quick links, dental services directory, timings, and demo copyright notice. |
| **✨ Live Customizer Tool** | Floating widget on the bottom-left allowing you to change the clinic name, phone, and Chennai neighborhood in real-time in front of your client! |

---

## ⚙️ Easy Customization Guide

All clinic details are centralized in **[`js/config.js`](file:///c:/Users/snnav/OneDrive/Desktop/dental/js/config.js)**:

```javascript
const CLINIC_CONFIG = {
  name: "SmileCare Dental Studio",
  tagline: "Gentle, Modern & Personalized Dental Care",
  contact: {
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "hello@smilecaredemo.example",
    address: {
      line1: "42, Khader Nawaz Khan Road",
      area: "Nungambakkam",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600006"
    },
    hours: {
      weekdays: "Monday – Saturday: 9:00 AM – 8:00 PM",
      sunday: "Sunday: 10:00 AM – 2:00 PM (By Prior Appointment)"
    }
  }
};
```
*Any edit in `config.js` instantly propagates across the entire site (header, hero, booking form, footer, and WhatsApp message generator).*

---

## 🚀 How to Share with Your Client (Public Shareable URL)

### Option 1: Netlify Drop (Fastest — 30 Seconds, No Code or CLI)
1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop this folder (`c:\Users\snnav\OneDrive\Desktop\dental`) straight into the browser window.
3. Netlify will instantly generate a live, public HTTPS link (e.g. `https://smilecare-chennai.netlify.app`) that you can send to your client via WhatsApp or email.

### Option 2: Surge.sh (1 Terminal Command)
Run:
```bash
npx surge . smilecare-chennai.surge.sh
```
*(Enter your email & a quick password if it's your first time. Your website will be live at `https://smilecare-chennai.surge.sh` immediately!)*

### Option 3: Vercel CLI
Run:
```bash
npx vercel --prod
```

### Option 4: GitHub Pages
1. Create a repository on GitHub (e.g. `smilecare-dental-demo`).
2. Run:
```bash
git remote add origin https://github.com/YOUR_USERNAME/smilecare-dental-demo.git
git branch -M main
git push -u origin main
```
3. In GitHub repo **Settings → Pages**, set branch to `main` and root to `/`. Your site will be live at `https://YOUR_USERNAME.github.io/smilecare-dental-demo/`.

---

## 💻 Running Locally

To view the website on your local machine:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
