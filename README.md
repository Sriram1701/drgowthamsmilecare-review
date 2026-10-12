# Dr. Gowtham's Smile Care - Smart AI Google Review & NFC Portal

An ultra-premium, AI-powered Google Review booster web application built specifically for **Dr. Gowtham's Smile Care** (`drgowthamsmilecare.in`), Cuddalore, inspired by modern NFC Tap Card & Smart QR review landing pages.

---

## ✨ Features Included

1. **Smart Review Generation with Typewriter Effect**
   - Automatically generates natural, authentic, 5-star Google review drafts based on the exact treatment chosen by the patient.
   - Built-in review pool of **120+ authentic variations** across 9 categories and 3 languages.
   - Live typewriter animation with blinking cursor for an AI-generated feel.

2. **🎙️ Speech-to-Text Voice Command (Microphone Button)**
   - Patients can speak their own review directly in **Tamil, English, or Tanglish**!
   - Built-in native Web Speech API with live animated sound waves and pulsing recording indicator.
   - Transcribes spoken words directly into the review card in real-time.
   - 1-tap "Copy & Paste on Google" allows them to paste their own spoken review directly onto Google Maps.

3. **9 Clinical Treatment Categories (Pills)**
   - ⭐ **Overall Care** - General positive clinic experience
   - 👶 **Kids Dentistry** - Gentle pediatric care, cavity filling, pulpectomy (Dr. Adeline Genivie)
   - 🦷 **Root Canal (RCT)** - Painless single-visit RCT and crown fitting (Dr. Gowtham)
   - ✨ **Cleaning & Whitening** - Ultrasonic scaling & polishing
   - 🔩 **Dental Implants** - Advanced implantology & laser gum surgery
   - 😬 **Braces & Aligners** - Invisible aligners & orthodontic teeth alignment
   - 🦷 **Wisdom Tooth** - Painless surgical wisdom teeth extractions
   - 👑 **Crown & Bridge** - Natural ceramic tooth caps & bridges
   - 🩺 **Painless Treatment** - Focus on gentle injection, hospitality, and comfort

3. **Multi-Language Switcher (3 Languages)**
   - 🇬🇧 **English** - Polished, professional feedback.
   - 🇮🇳 **தமிழ் (Tamil)** - Pure Tamil script for native local patients.
   - 💬 **Tanglish** - Tamil written in English alphabet (very popular with young patients).

4. **1-Tap "Copy & Paste on Google" Workflow**
   - Copies the generated review to the patient's phone clipboard.
   - Displays a success state (`✓ Copied! Opening Google...`) and micro-toast notification.
   - Automatically opens the clinic's Google Review / Google Maps profile in a new tab.

5. **Review Shuffle Button**
   - Patients can tap the 🔀 refresh button to instantly get an alternative review variation.

6. **Quick Connect Hub**
   - 📇 **Save Contact**: Generates and downloads a `.vcf` vCard directly to phone contacts.
   - 💬 **WhatsApp**: 1-tap chat with Dr. Gowtham's clinic (`+91 97878 07552`).
   - 📞 **Call Doctor**: Direct call dialer (`+91 63740 88810`).
   - 📍 **Google Location**: Opens Google Maps navigation to 43, Bashyam Street, Manjakuppam, Cuddalore.

7. **Specialists & Clinic Profile**
   - Features **Dr. K. Gowtham, MDS** (Periodontist & Implantologist) and **Dr. M. Adeline Genivie, MDS** (Pediatric Dentist) with real clinic photos.
   - Embedded interactive Google Map and clinic timings.

---

## 🚀 How to Run Locally

```bash
# In the project directory:
npx serve -l 3000 .
```
Then visit `http://localhost:3000` in any browser or mobile simulator.

---

## 🌐 Free 1-Click Deployment (Vercel / Netlify)

### To Deploy on Vercel:
1. Push this folder to GitHub or run:
   ```bash
   npx vercel
   ```
2. Your live link will be generated (e.g. `drgowtham-review.vercel.app`).

### To Program NFC Card / QR Code:
1. Copy your published URL (e.g., `https://drgowtham-review.vercel.app`).
2. **For NFC Cards / Tap stands:** Use any free mobile app like **NFC Tools** (Android/iOS) -> Tap *Write* -> *Add record* -> *URL/URI* -> Paste link -> Tap your NFC card.
3. **For QR Code stands:** Generate a QR code for your URL and place it at the reception counter.
