/**
 * Dr. Gowtham's Smile Care - Smart AI Review Generator & NFC Portal
 * Handles multilingual review generation, smooth typewriter effects,
 * clipboard copy, Google review redirect, and vCard contact generation.
 */

// Google Review & Maps Links for Dr. Gowtham's Smile Care
const reviewLink = "https://maps.app.goo.gl/rCiivwuzsyPhxgoN9";

let activeCat = "all";
let activeLang = "en";
let currentReview = "";
let lastIndexMap = {}; // Tracks last served index per category+language to prevent repeats

// UI Strings for Localization
const uiStrings = {
    en: {
        cardLabel: "YOUR 5-STAR REVIEW",
        copyBtn: "Copy & Paste on Google",
        copiedBtn: "Copied! Opening Google... ✓",
        hint: "Tap button to copy review, then paste in Google!",
        hintCopied: "Review copied to clipboard! Paste it on Google. ⭐",
        disclaimer: "Tap button to copy review text and directly open our Google Reviews page.",
        ratingHeading: "Share your treatment experience in 10 seconds!",
        serviceLabel: "Select Treatment Received:",
        toastMsg: "Review copied! Opening Google...",
        lblSaveContact: "Save<br>Contact",
        lblWhatsapp: "WhatsApp<br>Chat",
        lblCall: "Call<br>Doctor",
        lblDirections: "Google<br>Location",
        lblInstagram: "Instagram<br>Page",
        lblFacebook: "Facebook<br>Page",
        voiceHint: "Tap Mic to speak in Tamil, English, or Tanglish",
        voiceListening: "🎙️ Listening... Speak your review now",
        voiceReady: "Review captured! Tap 'Copy & Paste on Google'"
    },
    ta: {
        cardLabel: "உங்கள் 5-ஸ்டார் மதிப்புரை",
        copyBtn: "நகலெடுத்து கூகுளில் பதியவும்",
        copiedBtn: "நகலெடுக்கப்பட்டது! கூகுள் திறக்கிறது... ✓",
        hint: "பட்டனை தட்டி ரிவ்யூவை காப்பி செய்து, கூகுளில் பேஸ்ட் செய்யவும்!",
        hintCopied: "ரிவ்யூ காப்பி செய்யப்பட்டது! கூகுள் பாக்ஸில் பேஸ்ட் செய்யவும். ⭐",
        disclaimer: "கூகுள் பக்கத்தில் உங்கள் அனுபவத்தை எளிதாகப் பகிர இந்த வசதி.",
        ratingHeading: "உங்கள் சிகிச்சை அனுபவத்தை 10 வினாடிகளில் பகிருங்கள்!",
        serviceLabel: "நீங்கள் பெற்ற சிகிச்சையை தேர்வு செய்யவும்:",
        toastMsg: "மதிப்புரை நகலெடுக்கப்பட்டது! கூகுள் திறக்கிறது...",
        lblSaveContact: "தொடர்பு<br>சேமிக்க",
        lblWhatsapp: "வாட்ஸ்அப்<br>அரட்டை",
        lblCall: "மருத்துவர்<br>அழைப்பு",
        lblDirections: "கூகுள்<br>இருப்பிடம்",
        lblInstagram: "இன்ஸ்டா<br>பக்கம்",
        lblFacebook: "ஃபேஸ்புக்<br>பக்கம்",
        voiceHint: "மைக் தட்டி தமிழ், ஆங்கிலம் அல்லது தங்கிலீஷில் பேசலாம்",
        voiceListening: "🎙️ கேட்கிறது... உங்கள் கருத்தைப் பேசுங்கள்",
        voiceReady: "கருத்து பதிவு செய்யப்பட்டது! கூகுளில் பதிய தட்டவும்"
    },
    tanglish: {
        cardLabel: "UNGAL REVIEW",
        copyBtn: "Copy Panni Google-la Paste Pannunga",
        copiedBtn: "Copied! Google Open Aaguthu... ✓",
        hint: "Button tap panni review copy pannitu, Google-la paste pannunga!",
        hintCopied: "Review copy aaiduchu! Google-la paste pannunga. ⭐",
        disclaimer: "Customer convenience-kaga mattum intha vasathi.",
        ratingHeading: "Unga treatment experience-ah 10 seconds-la share pannunga!",
        serviceLabel: "Unga Treatment Category Select Pannunga:",
        toastMsg: "Review copy aaiduchu! Google open aaguthu...",
        lblSaveContact: "Contact<br>Save",
        lblWhatsapp: "WhatsApp<br>Chat",
        lblCall: "Doctor-ah<br>Call Panna",
        lblDirections: "Google<br>Map",
        lblInstagram: "Instagram<br>Page",
        lblFacebook: "Facebook<br>Page",
        voiceHint: "Mic tap panni Tamil, English or Tanglish-la pesalam",
        voiceListening: "🎙️ Listening... Unga review-ah pesunga",
        voiceReady: "Review capture aaiduchu! 'Copy & Paste'-ah thodavum"
    }
};

// Comprehensive 5-Star Reviews Database
const reviewsData = {
    // -------------------------------------------------------------
    // OVERALL CARE (ALL)
    // -------------------------------------------------------------
    all: {
        en: [
            "Had an outstanding experience at Dr. Gowtham's Smile Care in Cuddalore! Both Dr. Gowtham and Dr. Adeline are exceptionally skilled, patient, and caring. The clinic is spotless, ultra-modern, and staff are very welcoming. Truly the best dental clinic in Cuddalore!",
            "Hands down the best dental experience I've ever had. Dr. Gowtham explained every step with clarity and made sure I felt comfortable throughout. Genuine care, transparent fees, and state-of-the-art facilities. Highly recommend for the entire family!",
            "Visited Dr. Gowtham's Smile Care based on a recommendation and I am so glad I did. Excellent hospitality, zero waiting hassle, and thorough professional treatment. You can trust them 100% with any dental issue!",
            "Extremely satisfied with the care provided at Dr. Gowtham's Smile Care. The ambiance is pleasant, doctors are humble and highly knowledgeable, and hygiene standards are top-notch. Five stars without a doubt!"
        ],
        ta: [
            "கடலூரில் உள்ள Dr. Gowtham's Smile Care கிளினிக்கில் சிகிச்சை எடுத்தேன். மருத்துவர்கள் கௌதம் மற்றும் அடிலின் அவர்களின் கனிவான அணுகுமுறையும் சிகிச்சையும் மிகச் சிறப்பு. கிளினிக் மிகவும் சுத்தமாகவும் நவீன வசதிகளுடனும் உள்ளது. குடும்பத்தினர் அனைவருக்கும் ஏற்ற சிறந்த பல் மருத்துவமனை!",
            "மிகவும் திருப்திகரமான சிகிச்சை அனுபவம்! ஒவ்வொரு நிலையையும் தெளிவாக விளக்கி பொறுமையுடன் சிகிச்சை அளித்தார்கள். நியாயமான கட்டணம் மற்றும் உயர்தர உபகரணங்கள். கடலூரில் சிறந்த பல் கிளினிக் இதுவே!",
            "டாக்டர் கௌதம் அவர்களின் அன்பான கவனிப்பும் சிகிச்சையும் என்னை மிகவும் கவர்ந்தது. வலி இல்லாத சிகிச்சை மற்றும் அன்பான ஊழியர்கள். பற்கள் தொடர்பான எந்த பிரச்சனைக்கும் நம்பிக்கையுடன் இங்கு செல்லலாம்!",
            "Dr. Gowtham's Smile Care-ல் சிறந்த மருத்துவ சேவை கிடைத்தது. நவீன தொழில்நுட்பம் மற்றும் உலகத்தரம் வாய்ந்த சுகாதாரம். அனைவருக்கும் என் மனமார்ந்த பரிந்துரை!"
        ],
        tanglish: [
            "Dr. Gowtham's Smile Care Cuddalore-la treatment eduthen, romba superb experience! Doctors Gowtham and Adeline romba friendly and caring. Clinic romba clean and modern-ah irukku. Best dental clinic in Cuddalore!",
            "Enoda best dental visit idhu thaan. Dr. Gowtham procedure-ah romba theliva explain pannaru. Zero pain and reasonable charges. Family mothamum treat panna best place!",
            "Friend recommend panni ponen, unmaiyilaye romba nalla treat pannanga. Staffs-um romba polite. Dental problem iruntha bayame illama inga pogalam!",
            "Dr. Gowtham's Smile Care-la treatment romba satisfying-ah irunthathu. Doctors humble and experienced, clinic ambience super. Full 5-stars!"
        ]
    },

    // -------------------------------------------------------------
    // KIDS DENTISTRY (PEDIATRIC)
    // -------------------------------------------------------------
    kids: {
        en: [
            "Dr. Adeline Genivie is a miracle worker with kids! My child was terrified of dentists, but she made the entire cavity filling process completely painless and fun. Her patience and warmth put both parents and kids at ease. Best pediatric dentist in Cuddalore!",
            "I cannot thank Dr. Adeline enough for the gentle pulpectomy treatment given to my 6-year-old child. She explained everything playfully, ensuring zero fear and no tears. Truly a compassionate, world-class kids dentist!",
            "Finding a great pediatric dentist is tough, but Dr. Gowtham's Smile Care exceeded all our expectations. Gentle approach, playful environment, and pain-free treatment. My daughter actually smiles while going to the dentist now!",
            "Excellent care for kids' dental problems! Dr. Adeline handled my toddler with utmost patience and calm. If your child has tooth decay or pain, don't look anywhere else—this is the right place!"
        ],
        ta: [
            "என் 6 வயது குழந்தைக்கு டாக்டர் அடிலின் மேடம் சிகிச்சை அளித்தார்கள். குழந்தைகள் என்றால் மிகவும் பொறுமையாகவும் பயமில்லாமலும் சிகிச்சை தருகிறார்கள். என் குழந்தை அழவே இல்லை! குழந்தைகளுக்கு கடலூரில் உள்ள மிகச் சிறந்த பல் மருத்துவர் இவரே!",
            "Dr. Adeline Genivie அவர்களின் கனிவான குழந்தைப் பராமரிப்பு அருமை! குழந்தைகளுக்கான பல் சொத்தை அடைத்தல் மற்றும் ரூட் கெனால் சிகிச்சையை வலியின்றி எளிதாக முடித்தார்கள். குழந்தைகளுக்கு மிகச் சிறந்த கிளினிக்!",
            "பல் மருத்துவர் என்றாலே பயப்படும் என் மகனை அன்பாகப் பேசி பயத்தைப் போக்கி சிகிச்சை அளித்தார்கள். பெற்றோர்களுக்கு முழு நிம்மதி தரும் கிளினிக். மிக்க நன்றி டாக்டர்!",
            "குழந்தைகளின் பற்கள் பிரச்சனைக்கு Dr. Gowtham's Smile Care தான் முதலிடம். அருமையான சூழல், கனிவான மருத்துவர். ஒவ்வொரு பெற்றோருக்கும் என் பரிந்துரை!"
        ],
        tanglish: [
            "Dr. Adeline Genivie mam kids handling-la romba expert! En paiyannuku cavity filling pannom, oru thuli kooda alave illa. Romba patient and friendly doctor for children!",
            "My 6-year-old kid-ku pulpectomy treatment Dr. Adeline kitta pannom. Full-ah play panniye bayam illama mudichitanga. Kids dentist theduna Dr. Gowtham's Smile Care thaan best!",
            "Doctor kitta pona bayapadura en ponnu, inga jolly-ah treatment eduthukitta. Dr. Adeline's patience is amazing. Highly recommended for all parents in Cuddalore!",
            "Children's dental care-ku best hospital Cuddalore-la idhu thaan. Kids-friendly atmosphere and gentle treatment. Romba thanks doctor!"
        ]
    },

    // -------------------------------------------------------------
    // ROOT CANAL TREATMENT (RCT)
    // -------------------------------------------------------------
    rct: {
        en: [
            "Had a single-sitting Root Canal Treatment (RCT) done by Dr. Gowtham. I was worried about pain, but it was virtually painless from start to finish! The crown fitting was perfect and natural. Truly grateful for such expert care!",
            "Suffered from severe toothache and got my RCT done here. Dr. Gowtham is extremely gentle and skilled. The procedure was fast, comfortable, and affordable. My pain vanished the very same day!",
            "Outstanding Root Canal Treatment! State-of-the-art rotary instruments, digital X-rays, and proper anesthesia made it a walk in the park. Highly recommend Dr. Gowtham for complex root canals and caps!",
            "I completed my RCT and ceramic crown in just 3 days with zero discomfort. Dr. Gowtham's precision and post-procedure advice were top quality. Best root canal experience in Cuddalore!"
        ],
        ta: [
            "Dr. Gowtham அவர்களிடம் ரூட் கெனால் (Root Canal) சிகிச்சை எடுத்தேன். ஆரம்பத்தில் பயந்தேன், ஆனால் சிறிதும் வலியின்றி மிக நேர்த்தியாக செய்து முடித்தார். பற்கள் மூடியும் (Crown) இயற்கையாகப் பொருந்தியுள்ளது. மிகச் சிறந்த அனுபவம்!",
            "கடுமையான பல் வலியுடன் இங்கு சென்றேன். டாக்டர் கௌதம் அவர்களின் துல்லியமான சிகிச்சையால் வலி உடனே நின்றது. சுத்தமான உபகரணங்கள் மற்றும் குறைவான நேரத்தில் சிகிச்சை முடிந்தது. மிக்க நன்றி!",
            "ரூட் கெனால் மற்றும் கேப் சிகிச்சை மிகவும் சிறப்பாகவும் நியாயமான கட்டணத்திலும் செய்து கொடுத்தார்கள். கடலூரில் பல் வலிக்கு சிறந்த தீர்வு Dr. Gowtham's Smile Care!",
            "வலியில்லாத ரூட் கெனால் சிகிச்சை பெற விரும்புபவர்களுக்கு இதுவே மிகச் சிறந்த தேர்வு. மருத்துவரின் கைவண்ணம் பாராட்டுக்குரியது!"
        ],
        tanglish: [
            "Dr. Gowtham kitta Root Canal (RCT) treatment eduthen. Pain irukkumnu bayanthen, aana 100% painless-ah mudichitanga! Crown fitting-um romba perfect-ah set aaiduchu.",
            "Severe tooth ache irunthuchu, inga RCT panninathum single day-la pain poiruchu. Dr. Gowtham romba skilled and gentle dentist. Best RCT clinic in Cuddalore!",
            "Advanced rotary instruments use panni quick-ah root canal panni kuduthanga. Zero irritation or side effects. Value for money and great quality!",
            "Enaku canine tooth-la RCT and tooth cap 3-4 days-la mudichanga. Turnaround time and quality of work romba impressive. Must visit for tooth pain!"
        ]
    },

    // -------------------------------------------------------------
    // TEETH CLEANING & WHITENING (SCALING)
    // -------------------------------------------------------------
    scaling: {
        en: [
            "Got ultrasonic scaling and teeth polishing done today at Dr. Gowtham's Smile Care. My teeth feel so fresh, squeaky clean, and noticeably brighter! Gentle procedure with zero gum sensitivity.",
            "Wonderful experience with teeth cleaning and whitening! The doctors were extremely meticulous, removing all stubborn stains while making sure I was comfortable throughout. My smile looks amazing now!",
            "Regular scaling at Dr. Gowtham's Smile Care is part of my dental routine now. Very gentle hands, advanced ultrasonic tools, and great oral hygiene guidance from the doctors.",
            "Quick, comfortable, and super effective teeth cleaning. Removed tartar and yellow stains effortlessly without any enamel harm. Delighted with my brighter smile!"
        ],
        ta: [
            "Dr. Gowtham's Smile Care-ல் பற்கள் சுத்தம் (Scaling) மற்றும் பாலிஷிங் செய்தேன். ஈறுகளில் வலியின்றி பற்கள் பளிச்சென மாறியுள்ளன. கனிவான சேவைக்கு நன்றி!",
            "பற்களில் இருந்த கறைகள் முழுமையாக நீங்கி பற்கள் வெண்மையாகின. மருத்துவரின் ஆலோசனை மற்றும் அணுகுமுறை மிகவும் அருமை. புன்னகைக்கு புத்துயிர் கிடைத்தது!",
            "மிகவும் மென்மையான முறையில் பற்களை சுத்தம் செய்து கொடுத்தார்கள். உணர்திறன் (Sensitivity) எதுவும் இல்லை. மிகச் சிறந்த அனுபவம்!",
            "பற்கள் வெண்மையாக்குதல் மற்றும் தூய்மைப்படுத்தும் சிகிச்சைக்கு கடலூரில் சிறந்த மருத்துவமனை!"
        ],
        tanglish: [
            "Ultrasonic scaling and teeth polishing panninen. Teeth romba fresh and bright-ah aaiduchu! Gums-la oru pain-um illa, zero sensitivity.",
            "Teeth cleaning and whitening experience romba super. Stains ellam neat-ah remove aaiduchu. Smile ippo romba confident-ah irukku!",
            "Very gentle scaling with latest tools. Doctor oral care tips-um nalla explain pannaru. Regular cleaning-ku perfect clinic!",
            "Affordable cost-la teeth cleaning and polishing pannanga. Super service and friendly doctors!"
        ]
    },

    // -------------------------------------------------------------
    // DENTAL IMPLANTS & LASER SURGERY
    // -------------------------------------------------------------
    implants: {
        en: [
            "Got a dental implant done by Dr. Gowtham, who is an MDS Periodontist & Implantologist. His expertise in implantology and laser dentistry is second to none! The implant feels and functions just like my natural tooth.",
            "Dr. Gowtham placed my dental implant with computer-guided precision. I experienced negligible pain and healed very fast. Truly an authority in dental implants in Cuddalore!",
            "Laser gum treatment and implant procedure were completed smoothly without stitches or heavy bleeding. Modern technology at its finest. Highly recommend Dr. Gowtham for implants!",
            "Lost my molar tooth and got an implant placed here. From planning to final crown restoration, everything was handled flawlessly. Worth every rupee!"
        ],
        ta: [
            "டாக்டர் கௌதம் (MDS Implantologist) அவர்களிடம் பல் இம்ப்ளான்ட் (Dental Implant) சிகிச்சை பெற்றேன். இயற்கையான பல் போலவே உறுதியாக உள்ளது. லேசர் தொழில்நுட்பத்தால் வலியும் ரத்தப்போக்கும் இன்றி முடிந்தது!",
            "இம்ப்ளான்ட் சிகிச்சை மிகத் துல்லியமாகவும் பாதுகாப்பாகவும் செய்து தரப்பட்டது. மருத்துவரின் அனுபவமும் நுணுக்கமும் பாராட்டுக்குரியது!",
            "பற்கள் இழந்தவர்களுக்கு Dr. Gowtham's Smile Care-ல் உலகத்தரம் வாய்ந்த இம்ப்ளான்ட் சிகிச்சை கிடைக்கிறது. முழு திருப்தி!",
            "லேசர் ஈறு சிகிச்சை மற்றும் இம்ப்ளான்ட் பொருத்துதல் மிகச் சிறப்பாக அமைந்தது. நன்றி டாக்டர்!"
        ],
        tanglish: [
            "Dr. Gowtham sir kitta dental implant panninen. Avare Periodontist & Implantologist-nu sonnathu pola, treatment romba expert level-la irunthuchu. Natural tooth madhiriye irukku!",
            "Laser gum treatment and implant pain illama mudinjuthu. Healing-um romba fast. Best implant specialist in Cuddalore!",
            "Molar tooth missing-ku implant vechom, perfect precision and fitting. Cuddalore-la latest technology use panranga!",
            "Implant procedure romba smooth-ah pochu. Doctor-oda knowledge and guidance excellent!"
        ]
    },

    // -------------------------------------------------------------
    // BRACES & ALIGNERS (ORTHODONTICS)
    // -------------------------------------------------------------
    braces: {
        en: [
            "Undergoing aligners/braces treatment at Dr. Gowtham's Smile Care, and the progress has been incredible! My teeth alignment has improved dramatically in just a few months. Friendly consultations and affordable EMI options too!",
            "Got my teeth straightening done here. The doctors took detailed digital scans and planned my smile step-by-step. Very transparent and comfortable orthodontic care!",
            "Best clinic in Cuddalore for invisible clear aligners and ceramic braces! Doctors monitor every check-up attentively and answer every query with patience.",
            "My crooked teeth are now beautifully aligned thanks to Dr. Gowtham's Smile Care. I can smile with complete confidence now!"
        ],
        ta: [
            "பல் வரிசை சீரமைப்பு (Braces / Aligners) சிகிச்சை இங்கு எடுத்து வருகிறேன். குறுகிய காலத்தில் பற்கள் அழகாக வரிசையாகி வருகின்றன. மருத்துவர்களின் கவனிப்பு அருமை!",
            "கிளிப் மற்றும் கண்ணுக்குத் தெரியாத அலைனர்ஸ் சிகிச்சைக்கு கடலூரில் சிறந்த மருத்துவமனை. புன்னகைக்கு முழு தன்னம்பிக்கை கிடைத்துள்ளது!",
            "பற்களை வரிசைப்படுத்தும் சிகிச்சையை மிகக் கனிவாகவும் நியாயமான கட்டணத்திலும் வழங்குகிறார்கள். என் மனமார்ந்த நன்றி!",
            "சரியான முறையில் பற்களை சீரமைத்து அழகான புன்னகை அமைத்து தந்ததற்கு மிக்க நன்றி டாக்டர்!"
        ],
        tanglish: [
            "Teeth alignment / braces treatment inga thaan panren. Few months-laye semma change theriyuthu! Doctors romba supportive and regular check-up super.",
            "Invisible clear aligners-ku Cuddalore-la best clinic. Smile design step-by-step-ah monitor panranga. Semma result!",
            "Teeth straightening romba comfortable-ah nadanthuthu. Highly recommend for braces and clip treatment in Cuddalore!",
            "En smile-ah completely transform pannitanga. Full confidence vanthuruchu. Thank you doctors!"
        ]
    },

    // -------------------------------------------------------------
    // WISDOM TOOTH EXTRACTION
    // -------------------------------------------------------------
    wisdom: {
        en: [
            "Got both my impacted wisdom teeth extracted by Dr. Gowtham. I was terrified of surgery, but Dr. Gowtham was so gentle that I didn't feel a single thing! Excellent post-op recovery care and instructions.",
            "Painless wisdom tooth removal! Dr. Gowtham checked on my comfort throughout the extraction and explained the step-by-step process. No swelling, no trauma. Amazing surgical skill!",
            "Had severe pain due to a horizontal wisdom tooth. The extraction was done smoothly within 20 minutes under local anesthesia. Extremely relieved and thankful!",
            "Best surgical dentist in Cuddalore. If you have wisdom tooth trouble, go straight to Dr. Gowtham's Smile Care without second thoughts!"
        ],
        ta: [
            "அறிவுப் பல் (Wisdom Tooth) அறுவை சிகிச்சை மூலம் நீக்கப்பட்டது. மருத்துவர் கௌதம் அவர்கள் வலி தெரியாமல் மிக எளிதாக எடுத்து முடித்தார். சிகிச்சைக்குப் பின்னும் எவ்வித வீக்கமும் இல்லை!",
            "கடுமையான அறிவுப் பல் வலியால் அவதிப்பட்டேன். உடனடியாக கனிவான கவனிப்புடன் அறுவை சிகிச்சை செய்து வலியைப் போக்கினார்கள். மிகச் சிறந்த மருத்துவர்!",
            "பல் பிடுங்குவதில் எந்த பயமும் இல்லாமல் சிகிச்சை அளித்தார்கள். சிறந்த அனுபவம் மற்றும் பாதுகாப்பு!",
            "அறிவுப் பல் பிரச்சனை உள்ளவர்களுக்கு Dr. Gowtham's Smile Care தான் சரியான தீர்வு. நன்றி டாக்டர்!"
        ],
        tanglish: [
            "Wisdom tooth extraction Dr. Gowtham kitta panninen. Operation-nu bayanthen, aana surgery nadanthuthey therila, avlo painless! Best surgical skill.",
            "Impacted wisdom tooth 20 mins-la remove pannitanga. No swelling, quick recovery. Friendly doctors and caring staff!",
            "Severe jaw pain irunthuthu wisdom tooth nala. Doctor step-by-step-ah explain panni comfort-ah extract pannaru. Semma relief!",
            "Wisdom tooth removal-ku bayame theva illa inga pona. 100% safe and expert care in Cuddalore!"
        ]
    },

    // -------------------------------------------------------------
    // CROWN & BRIDGE
    // -------------------------------------------------------------
    crown: {
        en: [
            "Got a zirconia ceramic crown fitted at Dr. Gowtham's Smile Care. The color match and bite are 100% natural! You can't even tell it's an artificial cap. Brilliant aesthetic work!",
            "Replaced my missing teeth with a permanent dental bridge. The fit is rock solid and chewing feels just like original teeth. High quality materials and precise impressions!",
            "Exceptional cosmetic dentistry and crown work. Dr. Gowtham ensures millimeter-level accuracy before cementing the crown. Extremely pleased with the longevity and finish!",
            "Prompt delivery and perfect fit for my tooth cap. Finished in just a couple of days with great precision and friendly service!"
        ],
        ta: [
            "பல் மூடி (Crown & Bridge) சிகிச்சை எடுத்தேன். இயற்கையான பல் போலவே நிறமும் அமைப்பும் மிகத் துல்லியமாக பொருந்தியுள்ளது. உணவு உட்கொள்ளும்போது எந்த சிரமமும் இல்லை!",
            "நிலையான பல் பாலம் (Dental Bridge) அமைத்து தந்தார்கள். பற்கள் இயற்கையாகவும் உறுதியாகவும் உள்ளது. மிகச் சிறந்த தரம்!",
            "பல் கேப் அமைப்பதில் மருத்துவரின் நேர்த்தியும் கவனமும் பாராட்டுக்குரியது. முழு திருப்தி அளிக்கும் சேவை!",
            "அழகான புன்னகைக்கும் உறுதியான பற்களுக்கும் Dr. Gowtham's Smile Care சிறந்த இடம்!"
        ],
        tanglish: [
            "Zirconia ceramic crown fitting panninen. Natural tooth color-ku 100% match aaiduchu. Chewing and bite romba comfortable-ah irukku!",
            "Missing teeth-ku permanent bridge vechanga. Solid quality and quick delivery within 3 days. Semma finish!",
            "Crown fitting millimeter accuracy-la panni kuduthanga. Aesthetic and smile design-la Dr. Gowtham super expert!",
            "Tooth cap work romba neat and natural-ah irunthathu. Great value for money in Cuddalore!"
        ]
    },

    // -------------------------------------------------------------
    // PAINLESS TREATMENT & HOSPITALITY
    // -------------------------------------------------------------
    painless: {
        en: [
            "True to their promise, Dr. Gowtham's Smile Care offers 100% painless dental treatments! Modern equipment, gentle injection techniques, and doctors who truly listen to your concerns. Dental phobia cured!",
            "I had a huge phobia of dental chairs until I visited this clinic. Both doctors made me feel completely relaxed and comfortable. Painless procedures and wonderful hospitality!",
            "The hygiene, soothing atmosphere, and painless technology make Dr. Gowtham's Smile Care stand out in Cuddalore. Truly patient-first dental care!",
            "From reception to treatment, the experience was smooth, pain-free, and respectful. You will never dread visiting a dentist again!"
        ],
        ta: [
            "சொன்னபடியே 100% வலியற்ற சிகிச்சை வழங்குகிறார்கள்! ஊசி போடுவதே தெரியாத அளவுக்கு மென்மையான கைவண்ணம். பல் மருத்துவ பயத்தைப் போக்கிய மருத்துவர்களுக்கு நன்றி!",
            "கிளினிக்கின் அமைதியான சூழல், சுத்தமான உபகரணங்கள் மற்றும் மருத்துவர்களின் அன்பான பேச்சு மனதிற்கு முழு அமைதியை தருகிறது. வலி இல்லா சிகிச்சை!",
            "மருத்துவர்கள் நோயாளிகளின் நிலையை உணர்ந்து கனிவோடு சிகிச்சை அளிக்கிறார்கள். பயமில்லாமல் செல்லலாம்!",
            "கடலூரில் சிறந்த வலியற்ற பல் சிகிச்சை மையம் இதுவே. அனைவருக்கும் என் மனமார்ந்த வாழ்த்துகளும் பரிந்துரைகளும்!"
        ],
        tanglish: [
            "Unmaiyave 100% painless dental care! Injection potathey therila, avlo gentle hand. Enoda dental phobia-ve poiduchu!",
            "Dental chair pathale bayapadura aal naan, but doctors friendly-ah pesi comfort pannitanga. Zero pain and full peace of mind!",
            "Super clean hygiene, soothing ambience, and painless technology. Patients-ku respect and care tharanga!",
            "Painless treatment venumna direct-ah Dr. Gowtham's Smile Care-ku polam. Superb hospitality!"
        ]
    }
};

/**
 * Typewriter effect using requestAnimationFrame
 */
let typeRAF = null;

function typeText(element, text) {
    if (typeRAF) {
        cancelAnimationFrame(typeRAF);
        typeRAF = null;
    }

    element.textContent = "";

    const textNode = document.createTextNode("");
    element.appendChild(textNode);

    const cursor = document.createElement("span");
    cursor.className = "type-cursor";
    element.appendChild(cursor);

    let charIndex = 0;
    let lastTime = null;
    const msPerChar = 18; // Speed of typing

    function step(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const elapsed = timestamp - lastTime;
        const charsToAdd = Math.floor(elapsed / msPerChar);

        if (charsToAdd > 0) {
            const nextIndex = Math.min(charIndex + charsToAdd, text.length);
            textNode.textContent = text.slice(0, nextIndex);
            charIndex = nextIndex;
            lastTime = timestamp;
        }

        if (charIndex < text.length) {
            typeRAF = requestAnimationFrame(step);
        } else {
            // Keep cursor blinking for a short while then remove
            setTimeout(() => {
                if (cursor.parentNode) cursor.remove();
            }, 3000);
        }
    }

    typeRAF = requestAnimationFrame(step);
}

/**
 * Get random review from category avoiding immediate repeat
 */
function getRandomReview(cat, lang) {
    const list = (reviewsData[cat] && reviewsData[cat][lang]) || reviewsData.all.en;
    const key = `${cat}_${lang}`;
    const lastIndex = lastIndexMap[key] !== undefined ? lastIndexMap[key] : -1;

    let nextIndex;
    if (list.length <= 1) {
        nextIndex = 0;
    } else {
        do {
            nextIndex = Math.floor(Math.random() * list.length);
        } while (nextIndex === lastIndex);
    }

    lastIndexMap[key] = nextIndex;
    return list[nextIndex];
}

/**
 * Refreshes / Shuffles Review
 */
function refreshReview() {
    const btn = document.getElementById("btnRefresh");
    if (btn) btn.classList.add("spinning");

    const reviewEl = document.getElementById("reviewText");
    currentReview = getRandomReview(activeCat, activeLang);

    if (reviewEl) {
        typeText(reviewEl, currentReview);
    }

    // Reset Copy CTA state
    const copyBtn = document.getElementById("btnCopy");
    const copyBtnText = document.getElementById("copyBtnText");
    const s = uiStrings[activeLang];

    if (copyBtn) {
        copyBtn.classList.remove("copied-success");
        if (copyBtnText) copyBtnText.textContent = s.copyBtn;
    }

    const hintEl = document.getElementById("hint");
    if (hintEl) hintEl.textContent = s.hint;

    setTimeout(() => {
        if (btn) btn.classList.remove("spinning");
    }, 450);
}

/**
 * Category Selection Handler
 */
function selectCat(button) {
    const buttons = document.querySelectorAll(".cat-pill");
    buttons.forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");
    activeCat = button.getAttribute("data-cat");

    refreshReview();
}

/**
 * Language Selection Handler
 */
function selectLang(lang) {
    if (lang === activeLang) return;
    activeLang = lang;

    const toggle = document.getElementById("langToggle");
    if (toggle) {
        toggle.classList.remove("english", "ta", "tanglish");
        toggle.classList.add(lang);
    }

    document.body.classList.toggle("lang-tamil", lang === "ta");

    // Update UI localized strings
    const s = uiStrings[lang];
    const cardLabel = document.getElementById("cardLabelText");
    if (cardLabel) cardLabel.textContent = s.cardLabel;

    const copyBtnText = document.getElementById("copyBtnText");
    if (copyBtnText) copyBtnText.textContent = s.copyBtn;

    const disclaimer = document.getElementById("disclaimer");
    if (disclaimer) disclaimer.textContent = s.disclaimer;

    const ratingHeading = document.getElementById("ratingHeading");
    if (ratingHeading) ratingHeading.textContent = s.ratingHeading;

    const serviceLabel = document.getElementById("serviceLabel");
    if (serviceLabel) serviceLabel.textContent = s.serviceLabel;

    const hint = document.getElementById("hint");
    if (hint) hint.textContent = s.hint;

    const lblSaveContact = document.getElementById("lblSaveContact");
    if (lblSaveContact) lblSaveContact.innerHTML = s.lblSaveContact;

    const lblWhatsapp = document.getElementById("lblWhatsapp");
    if (lblWhatsapp) lblWhatsapp.innerHTML = s.lblWhatsapp;

    const lblCall = document.getElementById("lblCall");
    if (lblCall) lblCall.innerHTML = s.lblCall;

    const lblInstagram = document.getElementById("lblInstagram");
    if (lblInstagram) lblInstagram.innerHTML = s.lblInstagram;

    const lblFacebook = document.getElementById("lblFacebook");
    if (lblFacebook) lblFacebook.innerHTML = s.lblFacebook;

    // If currently listening to voice, update recognition language
    if (recognition && isRecordingVoice) {
        stopVoiceInput();
        setTimeout(toggleVoiceInput, 300);
    }

    refreshReview();
}

/**
 * Show Micro-Toast notification
 */
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toastMsg");
    if (!toast) return;

    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

/**
 * 1-Tap Copy & Open Google Reviews
 */
function copyAndGo() {
    const s = uiStrings[activeLang];
    const copyBtn = document.getElementById("btnCopy");
    const copyBtnText = document.getElementById("copyBtnText");
    const hint = document.getElementById("hint");

    function onSuccess() {
        if (copyBtn) copyBtn.classList.add("copied-success");
        if (copyBtnText) copyBtnText.textContent = s.copiedBtn;
        if (hint) hint.textContent = s.hintCopied;

        showToast(s.toastMsg);

        // Redirect to Google Review page after short delay for feedback
        setTimeout(() => {
            window.open(reviewLink, "_blank", "noopener,noreferrer");
        }, 850);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentReview)
            .then(onSuccess)
            .catch(() => fallbackCopy(currentReview, onSuccess));
    } else {
        fallbackCopy(currentReview, onSuccess);
    }
}

/**
 * Fallback copy using temporary textarea
 */
function fallbackCopy(text, callback) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand("copy");
    } catch (err) {
        console.error("Clipboard copy fallback failed", err);
    }

    document.body.removeChild(textArea);
    if (callback) callback();
}

/**
 * Generate and download vCard contact file
 */
function saveContact() {
    const vCardData = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Smile Care;Dr. Gowtham's;;;",
        "FN:Dr. Gowtham's Smile Care",
        "ORG:Dr. Gowtham's Smile Care - Kids & Family Dentistry",
        "TITLE:Dental Clinic & Implant Center",
        "TEL;TYPE=WORK,VOICE:+916374088810",
        "TEL;TYPE=CELL,VOICE,PREF:+919787807552",
        "ADR;TYPE=WORK:;;43, Bashyam Street, Near Aruna Lab, Manjakuppam;Cuddalore;Tamil Nadu;607001;India",
        "URL:https://drgowthamsmilecare.in",
        "NOTE:Specialists: Dr. K. Gowtham MDS (Implantologist) & Dr. M. Adeline Genivie MDS (Pediatric Dentist). Mon-Sat 9:30 AM-8:30 PM.",
        "END:VCARD"
    ].join("\r\n");

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "DrGowthamSmileCare.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 1500);

    showToast("Contact card downloaded!");
}

// ==========================================================================
// Speech-to-Text Voice Recognition Engine (Tamil, English, Tanglish)
// ==========================================================================
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isRecordingVoice = false;

function setupSpeechRecognition() {
    if (!SpeechRecognition) return null;

    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
        isRecordingVoice = true;
        const btnVoice = document.getElementById("btnVoice");
        const bar = document.getElementById("voiceStatusBar");
        const statusText = document.getElementById("voiceStatusText");
        const s = uiStrings[activeLang];

        if (btnVoice) btnVoice.classList.add("is-recording");
        if (bar) bar.style.display = "flex";
        if (statusText) statusText.textContent = s.voiceListening || "Listening... Speak now";

        const reviewEl = document.getElementById("reviewText");
        if (reviewEl) {
            reviewEl.innerHTML = '<span style="color:#0d9488;font-style:italic;">Listening... (பேசுங்கள்...)</span>';
        }

        showToast(s.voiceListening || "Microphone active! Speak now");
    };

    rec.onresult = (event) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + " ";
        }
        transcript = transcript.trim();
        if (transcript) {
            currentReview = transcript;
            const reviewEl = document.getElementById("reviewText");
            if (reviewEl) reviewEl.textContent = currentReview;
        }
    };

    rec.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
            showToast("Microphone access denied. Please allow microphone in browser.");
        } else if (event.error !== 'no-speech') {
            showToast("Voice input: " + event.error);
        }
        stopVoiceInput();
    };

    rec.onend = () => {
        isRecordingVoice = false;
        const btnVoice = document.getElementById("btnVoice");
        const bar = document.getElementById("voiceStatusBar");
        if (btnVoice) btnVoice.classList.remove("is-recording");
        if (bar) bar.style.display = "none";

        if (currentReview && !currentReview.includes("Listening...")) {
            const s = uiStrings[activeLang];
            showToast(s.voiceReady || "Review captured! Ready to paste.");
            const copyBtnText = document.getElementById("copyBtnText");
            if (copyBtnText) copyBtnText.textContent = s.copyBtn;
        }
    };

    return rec;
}

/**
 * Toggle Voice Input (Start / Stop Recording)
 */
function toggleVoiceInput() {
    if (!SpeechRecognition) {
        showToast("Speech recognition not supported on this browser. You can type or use keyboard mic! 🎙️");
        const reviewEl = document.getElementById("reviewText");
        if (reviewEl) {
            reviewEl.setAttribute("contenteditable", "true");
            reviewEl.focus();
        }
        return;
    }

    if (isRecordingVoice) {
        stopVoiceInput();
        return;
    }

    try {
        if (!recognition) {
            recognition = setupSpeechRecognition();
        }

        // Set speech language: Tamil (ta-IN) or Indian English (en-IN for English/Tanglish)
        if (activeLang === "ta") {
            recognition.lang = "ta-IN";
        } else {
            recognition.lang = "en-IN";
        }

        recognition.start();
    } catch (err) {
        console.error("Failed to start speech recognition:", err);
        try {
            recognition.stop();
            setTimeout(() => recognition.start(), 200);
        } catch (e) {
            showToast("Tap mic again to start");
        }
    }
}

/**
 * Stop Voice Input
 */
function stopVoiceInput() {
    if (recognition && isRecordingVoice) {
        try {
            recognition.stop();
        } catch (e) {
            console.warn(e);
        }
    }
    isRecordingVoice = false;
    const btnVoice = document.getElementById("btnVoice");
    const bar = document.getElementById("voiceStatusBar");
    if (btnVoice) btnVoice.classList.remove("is-recording");
    if (bar) bar.style.display = "none";
}

// Initial load
window.addEventListener("DOMContentLoaded", () => {
    refreshReview();
});
