/* ============================================================
   ZAHRA DINING — TEMPLATE CONFIGURATION
   ============================================================
   Edit THIS FILE ONLY to rebrand the whole website.
   You never need to open index.html or style.css to change:
   restaurant name, logo, contact info, hours, colors, images,
   the full menu, testimonials, events, offers, FAQ or socials.

   After editing, just save this file and refresh index.html.
   See /documentation/customization-guide.md for a full walk-through.
   ============================================================ */

window.ZAHRA_CONFIG = {

  /* ---------- 1. BRAND ---------- */
  brand: {
    name: "Zahra Dining",
    tagline: "Where Every Meal Becomes a Memory.",
    // Text logo is used by default. Swap to an image logo by putting
    // a file in /images/ and setting logoImage, e.g. "images/logo.png"
    logoImage: "images/logo.png",
    favicon: "images/favicon.png",
    // Short line used in the browser tab / SEO meta description
    metaDescription: "Zahra Dining — modern fine dining, wood-fired pizza, hand-cut steaks and a chef's tasting menu. Reserve your table today."
  },

  /* ---------- 2. CONTACT & LOCATION ---------- */
  contact: {
    phone: "+1 (512) 555-0142",
    phoneDisplay: "(512) 555-0142",
    email: "reservations@zahradining.com",
    address: {
      line1: "482 Riverside Boulevard",
      line2: "Austin, TX 78701",
      full: "482 Riverside Boulevard, Austin, TX 78701"
    },
    // Used to build the free, no-API-key Google Maps embed.
    mapQuery: "482 Riverside Boulevard, Austin, TX 78701"
  },

  /* ---------- 3. HOURS ---------- */
  hours: [
    { days: "Monday – Thursday", time: "5:00 PM – 10:00 PM" },
    { days: "Friday – Saturday", time: "5:00 PM – 11:30 PM" },
    { days: "Sunday", time: "4:00 PM – 9:00 PM" },
    { days: "Weekend Brunch", time: "Sat – Sun, 10:00 AM – 2:00 PM" }
  ],

  /* ---------- 4. SOCIAL LINKS ---------- */
  social: [
    { name: "Instagram", url: "https://instagram.com/zahradining", icon: "instagram" },
    { name: "Facebook",  url: "https://facebook.com/zahradining",  icon: "facebook" },
    { name: "TikTok",    url: "https://tiktok.com/@zahradining",   icon: "tiktok" },
    { name: "Yelp",      url: "https://yelp.com/biz/zahradining",  icon: "yelp" }
  ],

  /* ---------- 5. COLOR PALETTE ---------- */
  /* Change any hex value and every element using that role updates
     instantly — buttons, links, borders, section backgrounds, etc. */
  colors: {
    bg:        "#14100D",   // page background (espresso black)
    bgAlt:     "#1C1610",   // alternating section background
    surface:   "#251D16",   // cards, panels
    gold:      "#C6A15B",   // primary accent (brass/gold)
    goldLight: "#E7CE99",   // hover / highlight gold
    wine:      "#7B2036",   // secondary accent (deep burgundy)
    ivory:     "#F4EAD9",   // primary text on dark
    muted:     "#B6A794",   // secondary / muted text
    line:      "rgba(198,161,91,0.22)" // hairline divider color
  },

  /* ---------- 6. HERO ---------- */
  hero: {
    // Rotates automatically every 6s. Add or remove as many as you like.
    images: [
      "images/mezze-platter.jpg",
      "images/13.jpg",
      "images/mapo-tofu.jpg",
      "images/tea-cup.jpg",
      "images/images(29).jpeg",
      "images/11.jpg",
    ],
    eyebrow: "Pakistani · Continental · Chinese ·Barbeque(BBQ) · Desserts",
    heading: "Where Every Meal<br>Becomes a Memory.",
    subheading: "Nihari, wok-tossed karahi, char-grilled kebabs and East-meets-West favorites — served in a room built for the nights you'll actually remember.",
    // Scrolling marquee of signature dishes beneath the hero
    marquee: [
      "Nihari", "Seekh Kebab", "Chicken Karahi",
      "Mapo Tofu", "Rainbow Ice Cream", "Chef's Mezze Platter",
      "BBQ Grill Nights", "Chef's Tasting Menu"
    ]
  },

  /* ---------- 7. ABOUT ---------- */
  about: {
    eyebrow: "Our Story",
    heading: "A Table Worth Returning To",
    paragraphs: [
      "Zahra Dining opened its doors in 2014 with one idea: a great restaurant should feel like a memory in progress. Every plate is built around ingredients at their peak, techniques worth slowing down for, and a room designed to hold a conversation.",
      "From the wood-fired oven to the dry-aging room, nothing here is an afterthought. Our kitchen is led by Executive Chef Antoine Delacroix, whose seasonal menus move with the market, not the calendar."
    ],
    image: "images/mezze-platter.jpg",
    stats: [
      { number: "11", label: "Years of Service" },
      { number: "48", label: "Seasonal Dishes" },
      { number: "3", label: "Local Awards" },
      { number: "25k+", label: "Guests Served" }
    ]
  },

  /* ---------- 8. FEATURED DISHES ---------- */
  featuredDishes: [
    {
      name: "Nihari",
      description: "A Zahra Dining signature — beef slow-braised overnight with warming spices until it falls apart, finished with ginger, chili and fresh coriander.",
      image: "images/nihari.jpg"
    },
    {
      name: "Seekh Kebab",
      description: "Hand-minced chicken skewers seasoned with garam masala and fresh herbs, char-grilled over open flame for a smoky finish.",
      image: "images/seekh-kebab.jpg"
    },
    {
      name: "Chicken Karahi",
      description: "A wok-tossed classic — tomatoes, ginger and green chilies reduced into a rich, glossy sauce with tender chicken.",
      image: "images/chicken-karahi.jpg"
    },
    {
      name: "Mapo Tofu",
      description: "Silken tofu simmered in a bold, aromatic chili-bean sauce — a Chinese-kitchen favorite done the Zahra Dining way.",
      image: "images/mapo-tofu.jpg"
    },
    {
      name: "Garden Vegetable Stir-Fry",
      description: "Broccoli, mushroom and tofu tossed fast and hot to keep every vegetable crisp, bright and full of flavor.",
      image: "images/mixed-veg.jpg"
    },
    {
      name: "Rainbow Ice Cream",
      description: "A colorful house-made scoop trio — the dessert every table photographs before they taste.",
      image: "images/rainbow-icecream.jpg"
    },
    {
      name: "Chef's Mezze Platter",
      description: "A vibrant sharing spread pulled from across our menu — the best way to start a table of four or more.",
      image: "images/mezze-platter.jpg"
    },
    {
      name: "Far East Sharing Platter",
      description: "Our kitchen's tribute to the flavors of the East — a generous mixed platter built for the table to share.",
      image: "images/thai-platter.jpg"
    }
  ],

  /* ---------- 9. CHEF ---------- */
  chef: {
    name: "Antoine Delacroix",
    title: "Executive Chef & Partner",
    bio: "Trained in Lyon and seasoned across kitchens in New York and Austin, Chef Antoine builds every menu around what the market gives him that week. His food is technical without being fussy — the kind of cooking that makes a first date and a family dinner feel equally at home.",
    quote: "Cook the ingredient, not the trend. That's the whole philosophy.",
    image: "images/chef.jpg"
  },

  /* ---------- 10. GALLERY ---------- */
  gallery: [
    { image: "images/chef.jpg", caption: "Our kitchen team at work" },
    { image: "images/nihari.jpg", caption: "Nihari, slow-braised overnight" },
    { image: "images/seekh-kebab.jpg", caption: "Seekh kebab, off the grill" },
    { image: "images/chicken-karahi.jpg", caption: "Chicken karahi" },
    { image: "images/mapo-tofu.jpg", caption: "Mapo tofu" },
    { image: "images/mezze-platter.jpg", caption: "A sharing platter for the table" },
    { image: "images/rainbow-icecream.jpg", caption: "Dessert, always worth the photo" },
    { image: "images/gallery-extra-1.jpg", caption: "A moment at Zahra Dining" },
    { image: "images/gallery-extra-2.jpg", caption: "A moment at Zahra Dining" },
    { image: "images/gallery-extra-3.jpg", caption: "A moment at Zahra Dining" },
    { image: "images/gallery-extra-4.jpg", caption: "A moment at Zahra Dining" },
    { image: "images/gallery-extra-5.jpg", caption: "A moment at Zahra Dining" },
    { image: "images/gallery-extra-6.jpg", caption: "A moment at Zahra Dining" },
     { image: "images/fb86662148be855d931b37d6c1e5fcbe.jpeg", caption: "Mapo tofu" },
     { image: "images/11.jpg", caption: "plater" },
      { image: "images/7.jfif", caption: "hall" },
       { image: "images/6.jfif", caption: "hall" },
        { image: "images/9.jfif", caption: "hall" },
         { image: "images/10.jfif", caption: "hall" },
          { image: "images/c.png", caption: "hall"}

  ],

  /* ---------- 11. TESTIMONIALS ---------- */
  testimonials: [
    {
      quote: "Every dish arrived like it had been rehearsed. The ribeye alone is worth the drive across town.",
      name: "Priya Anand",
      role: "Google Review",
      rating: 5
    },
    {
      quote: "We celebrated our anniversary here and the team remembered us three visits later. That's rare.",
      name: "Marcus Webb",
      role: "OpenTable",
      rating: 5
    },
    {
      quote: "The tasting menu is the best $85 you'll spend on a Friday night in this city. Full stop.",
      name: "Elena Torres",
      role: "Yelp",
      rating: 5
    },
    {
      quote: "Wood-fired pizza that actually rivals what I had in Naples. Did not expect that in Austin.",
      name: "Daniel Osei",
      role: "Google Review",
      rating: 4
    }
  ],

  /* ---------- 12. EVENTS ---------- */
  events: [
    {
      title: "Live Jazz Fridays",
      date: "Every Friday · 7 PM",
      description: "A three-piece jazz trio plays the main dining room while the kitchen runs its Friday specials.",
      image: "https://images.unsplash.com/photo-1535850452425-140ee4a8dbae?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "BBQ Grill Nights",
      date: "Every Wednesday · 5–9 PM",
      description: "Skewers straight off the open flame, half-price on every BBQ platter, all evening long.",
      image: "images/seekh-kebab.jpg"
    },
    {
      title: "Chef's Table Experience",
      date: "First Saturday, Monthly",
      description: "An eight-seat counter overlooking the kitchen, with a nine-course menu built that morning.",
      image: "https://images.unsplash.com/photo-1577219492769-b63a779fac28?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Far East Fridays",
      date: "First Friday, Monthly",
      description: "A rotating menu of Chinese and East Asian favorites, from mapo tofu to our sharing platters.",
      image: "images/mapo-tofu.jpg"
    }
  ],

  /* ---------- 13. CATERING ---------- */
  catering: {
    heading: "Zahra Catering",
    description: "From a fifteen-person dinner in your home to a three-hundred-guest wedding, our catering team builds a menu around your event — not the other way around.",
    packages: [
      { name: "Intimate Gatherings", detail: "10–30 guests · plated or family-style", price: "From $65/guest" },
      { name: "Corporate & Private Events", detail: "30–150 guests · buffet or stations", price: "From $55/guest" },
      { name: "Weddings & Large Events", detail: "150+ guests · full-service catering", price: "Custom quote" }
    ],
    image: "images/asian-spread.jpg"
  },

  /* ---------- 14. SPECIAL OFFERS ---------- */
  offersBanner: {
    text: "This Week Only — 15% Off Your Bill Every Monday & Tuesday",
    cta: "Reserve Now"
  },
  offers: [
    {
      title: "Today's Special",
      description: "A chef's rotating dish, built around whatever came in freshest this morning.",
      value: "Ask your server",
      tag: "Daily"
    },
    {
      title: "Weekend Deals",
      description: "Three courses for two, plus a drink each, Friday through Sunday.",
      value: "$79 for two",
      tag: "Fri–Sun"
    },
    {
      title: "Seasonal Menu",
      description: "A short, four-course menu that changes with the season's best ingredients.",
      value: "$65/person",
      tag: "Seasonal"
    },
    {
      title: "Sunday Supper",
      description: "A three-course prix fixe for two, every Sunday evening.",
      value: "$59 for two",
      tag: "Weekly"
    },
    {
      title: "Happy Hour",
      description: "Half-price starters and $8 house cocktails at the bar.",
      value: "4 PM – 6 PM",
      tag: "Daily"
    }
  ],

  /* ---------- 15. FAQ ---------- */
  faq: [
    {
      question: "Do I need a reservation?",
      answer: "Reservations are strongly recommended, especially Thursday through Saturday. Walk-ins are welcome at the bar and are seated as tables become available."
    },
    {
      question: "Is there a dress code?",
      answer: "We ask for smart casual — think collared shirts and no athletic wear. Jackets are welcome but not required."
    },
    {
      question: "Can you accommodate dietary restrictions?",
      answer: "Yes. Please note any allergies or dietary needs in your reservation and our kitchen will adjust your menu accordingly."
    },
    {
      question: "Is parking available?",
      answer: "Complimentary valet parking is available Thursday through Sunday after 5 PM. Self-parking is available in the Riverside Boulevard garage."
    },
    {
      question: "Do you host private events?",
      answer: "Our private dining room seats up to 24 guests, and the full restaurant can be booked for larger events. Contact us for availability and pricing."
    },
    {
      question: "Do you offer gift cards?",
      answer: "Gift cards are available for purchase in-restaurant or by phone, in any denomination, and never expire."
    }
  ],

  /* ---------- 16. INSTAGRAM GALLERY ---------- */
  instagramHandle: "@zahradining",
  instagram: [
    "images/nihari.jpg",
    "images/seekh-kebab.jpg",
    "images/chicken-karahi.jpg",
    "images/mapo-tofu.jpg",
    "images/rainbow-icecream.jpg",
    "images/mezze-platter.jpg",
    "images/tea-cup.jpg",
    "images/coffee-cup.jpg"
  ],

  /* ---------- 17. FULL MENU ---------- */
  /* Each category becomes a tab. Add/remove items freely — the page
     re-renders automatically. "featured" items get a small gold star. */
  menu: [
    {
      id: "starters",
      label: "Starters",
      image: "https://images.unsplash.com/photo-1617474019977-0e105d1b430e?auto=format&fit=crop&w=1200&q=80",
      items: [
        { name: "Charred Octopus Crostini", description: "Grilled octopus, smoked paprika aioli, toasted sourdough, pickled fennel", price: "$16", image: "https://images.unsplash.com/photo-1706650439799-d4a8894556b6?auto=format&fit=crop&w=700&q=80" },
        { name: "Burrata & Heirloom Tomato", description: "Whipped burrata, basil oil, aged balsamic, sea salt crackers", price: "$14", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=700&q=80" },
        { name: "Truffle Arancini", description: "Crispy risotto balls, black truffle, parmesan fondue", price: "$13", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=700&q=80" },
        { name: "Yellowfin Tuna Tartare", description: "Avocado, citrus soy, sesame tuile", price: "$17", image: "https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "soups",
      label: "Soups",
      image: "https://images.unsplash.com/photo-1571167366136-b57e07761625?auto=format&fit=crop&w=1200&q=80",
      items: [
        { name: "Roasted Butternut Bisque", description: "Brown butter, toasted pepitas, chili oil", price: "$9", image: "https://images.unsplash.com/photo-1613844237701-8f3664fc2eff?auto=format&fit=crop&w=700&q=80" },
        { name: "French Onion Soup", description: "Caramelized onions, gruyère crust, brioche crouton", price: "$10", image: "https://images.unsplash.com/photo-1616501268826-ee9731c915d4?auto=format&fit=crop&w=700&q=80" },
        { name: "Wild Mushroom Velouté", description: "Porcini cream, truffle oil, chive", price: "$11", image: "https://images.unsplash.com/photo-1652088079703-38f4a8d6b981?auto=format&fit=crop&w=700&q=80" },
        { name: "Lobster Bisque", description: "Cognac cream, lobster claw, tarragon", price: "$14", image: "https://images.unsplash.com/photo-1620256114757-322387444c16?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "salads",
      label: "Salads",
      image: "https://images.unsplash.com/photo-1617474019977-0e105d1b430e?auto=format&fit=crop&w=1200&q=80",
      items: [
        { name: "Zahra Garden Salad", description: "Baby greens, shaved radish, citrus vinaigrette, candied walnuts", price: "$12", image: "https://images.unsplash.com/photo-1669472546359-418a98630699?auto=format&fit=crop&w=700&q=80" },
        { name: "Roasted Beet & Goat Cheese", description: "Whipped goat cheese, pistachio, honey, arugula", price: "$14", image: "https://images.unsplash.com/photo-1708184528305-33ce7daced65?auto=format&fit=crop&w=700&q=80" },
        { name: "Caesar Supreme", description: "Romaine hearts, parmesan crisp, white anchovy, garlic crouton", price: "$13", image: "https://images.unsplash.com/photo-1576402187658-44ca7d2c2c52?auto=format&fit=crop&w=700&q=80" },
        { name: "Grilled Peach & Burrata Salad", description: "Prosciutto, arugula, balsamic glaze", price: "$15", image: "https://images.unsplash.com/photo-1612949060041-663b198e1f86?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "pizza",
      label: "Pizza",
      image: "https://images.unsplash.com/photo-1564936281403-f92f66f89ee0?auto=format&fit=crop&w=1200&q=80",
      items: [
        { name: "Margherita Reale", description: "San Marzano tomato, fior di latte, basil, EVOO", price: "$18", featured: true, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80" },
        { name: "Tartufo Bianco", description: "White truffle cream, wild mushroom, fontina, arugula", price: "$24", image: "https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&w=700&q=80" },
        { name: "Prosciutto & Fig", description: "Fig jam, prosciutto di Parma, gorgonzola, balsamic", price: "$22", image: "https://images.unsplash.com/photo-1613564834361-9436948817d1?auto=format&fit=crop&w=700&q=80" },
        { name: "BBQ Chicken Pizza", description: "Smoked chicken, red onion, cilantro, mozzarella", price: "$20", image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "burgers",
      label: "Burgers",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
      items: [
        { name: "The Zahra Signature Burger", description: "Dry-aged beef, smoked cheddar, truffle aioli, brioche", price: "$19", featured: true, image: "https://images.unsplash.com/photo-1460306855393-0410f61241c7?auto=format&fit=crop&w=700&q=80" },
        { name: "Wagyu Cheeseburger", description: "A5 wagyu blend, caramelized onion, gruyère", price: "$26", image: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?auto=format&fit=crop&w=700&q=80" },
        { name: "Crispy Chicken Burger", description: "Buttermilk fried chicken, slaw, spicy honey", price: "$17", image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?auto=format&fit=crop&w=700&q=80" },
        { name: "Impossible Garden Burger", description: "Plant-based patty, avocado, chipotle mayo", price: "$16", image: "https://images.unsplash.com/photo-1575980726530-4e673bfa0ad8?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "pasta",
      label: "Pasta",
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=1200&q=80",
      items: [
        { name: "Truffle Tagliatelle", description: "Fresh egg pasta, black truffle, parmesan cream", price: "$24", featured: true, image: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=700&q=80" },
        { name: "Lobster Ravioli", description: "Saffron cream sauce, chive oil", price: "$28", image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=700&q=80" },
        { name: "Spaghetti Pomodoro", description: "San Marzano tomato, basil, garlic, EVOO", price: "$18", image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?auto=format&fit=crop&w=700&q=80" },
        { name: "Cacio e Pepe", description: "Pecorino Romano, cracked black pepper", price: "$17", image: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "steak",
      label: "Steak",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80",
      items: [
        { name: "Filet Mignon 8oz", description: "Peppercorn jus, roasted garlic mash", price: "$42", image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=700&q=80" },
        { name: "Ribeye 14oz", description: "Dry-aged, chimichurri, truffle fries", price: "$48", featured: true, image: "https://images.unsplash.com/photo-1602216475919-37336ceb4ad3?auto=format&fit=crop&w=700&q=80" },
        { name: "Tomahawk for Two", description: "Herb butter, roasted vegetables", price: "$95", image: "https://images.unsplash.com/photo-1608877906601-33195b1dc2cb?auto=format&fit=crop&w=700&q=80" },
        { name: "Wagyu Striploin", description: "Rich pan reduction, potato gratin", price: "$58", image: "https://images.unsplash.com/photo-1576511053046-7e445c5b95af?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "seafood",
      label: "Seafood",
      image: "https://images.unsplash.com/photo-1599206614622-d7dae04bb031?auto=format&fit=crop&w=1200&q=80",
      items: [
        { name: "Pan-Seared Salmon", description: "Lemon beurre blanc, asparagus, wild rice", price: "$29", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80" },
        { name: "Grilled Chilean Sea Bass", description: "Citrus butter, seasonal vegetables", price: "$36", featured: true, image: "https://images.unsplash.com/photo-1712334562767-5d366d0c40d9?auto=format&fit=crop&w=700&q=80" },
        { name: "Seafood Linguine", description: "Shrimp, clams, mussels, garlic butter sauce", price: "$27", image: "https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&w=700&q=80" },
        { name: "Miso Glazed Black Cod", description: "Bok choy, sticky rice", price: "$34", image: "https://images.unsplash.com/photo-1580959375944-abd7e991f971?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "bbq",
      label: "BBQ",
      image: "images/seekh-kebab.jpg",
      items: [
        { name: "Seekh Kebab", description: "Hand-minced chicken, garam masala, char-grilled", price: "$18", featured: true, image: "images/seekh-kebab.jpg" },
        { name: "Smoked Baby Back Ribs (Full Rack)", description: "Bourbon BBQ glaze, coleslaw, cornbread", price: "$28", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80" },
        { name: "Texas Brisket Platter", description: "Smoked 14 hours, pickles, mac & cheese", price: "$26", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80" },
        { name: "BBQ Pulled Pork Sandwich", description: "Brioche bun, house slaw", price: "$17", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80" },
        { name: "Smoked Chicken Half", description: "Applewood smoked, BBQ glaze, cornbread", price: "$21", image: "images/seekh-kebab.jpg" }
      ]
    },
    {
      id: "chicken",
      label: "Chicken",
      image: "images/chicken-karahi.jpg",
      items: [
        { name: "Chicken Karahi", description: "Wok-tossed tomato, ginger, green chili, fresh coriander", price: "$21", featured: true, image: "images/chicken-karahi.jpg" },
        { name: "Herb Roasted Chicken", description: "Jus, garlic mash, seasonal greens", price: "$23", image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=700&q=80" },
        { name: "Chicken Parmesan", description: "San Marzano, mozzarella, spaghetti pomodoro", price: "$22", image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=700&q=80" },
        { name: "Grilled Chicken Piccata", description: "Lemon caper butter sauce, asparagus", price: "$24", image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=700&q=80" },
        { name: "Southern Fried Chicken", description: "Honey drizzle, buttermilk biscuit", price: "$19", image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "desserts",
      label: "Desserts",
      image: "images/rainbow-icecream.jpg",
      items: [
        { name: "Rainbow Ice Cream", description: "A colorful house-made scoop trio", price: "$9", featured: true, image: "images/rainbow-icecream.jpg" },
        { name: "Molten Chocolate Lava Cake", description: "Vanilla bean gelato, raspberry coulis", price: "$12", image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=700&q=80" },
        { name: "Crème Brûlée", description: "Madagascar vanilla, caramelized sugar crust", price: "$10", image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=700&q=80" },
        { name: "Tiramisu", description: "Espresso-soaked ladyfingers, mascarpone", price: "$11", image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=700&q=80" },
        { name: "New York Cheesecake", description: "Graham crust, berry compote", price: "$10", image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "coffee",
      label: "Coffee",
      image: "images/coffee-cup.jpg",
      items: [
        { name: "Zahra Signature Espresso", description: "Double shot, house blend", price: "$4", image: "images/coffee-cup.jpg" },
        { name: "Cappuccino", description: "Espresso, steamed milk, foam art", price: "$5", image: "images/coffee-cup.jpg" },
        { name: "Caramel Macchiato", description: "Vanilla, caramel drizzle", price: "$6", image: "images/coffee-cup.jpg" },
        { name: "Cold Brew", description: "18-hour steeped, served over ice", price: "$5", image: "images/coffee-cup.jpg" }
      ]
    },
    {
      id: "drinks",
      label: "Drinks",
      image: "images/tea-cup.jpg",
      items: [
        { name: "Fresh Squeezed Lemonade", description: "Mint, sparkling water", price: "$6", image: "images/tea-cup.jpg" },
        { name: "Iced Herbal Tea", description: "Hibiscus, citrus", price: "$5", image: "images/tea-cup.jpg" },
        { name: "Sparkling Water", description: "San Pellegrino", price: "$4", image: "images/tea-cup.jpg" },
        { name: "Assorted Cold Drinks", description: "Coca-Cola, Sprite, Fanta — chilled", price: "$4", image: "images/coffee-cup.jpg" }
      ]
    },
    {
      id: "mocktails",
      label: "Mocktails",
      image: "https://images.unsplash.com/photo-1595977514600-72cbc8376c38?auto=format&fit=crop&w=1200&q=80",
      items: [
        { name: "Sunset Spritz", description: "Blood orange, ginger, soda, mint", price: "$9", image: "https://images.unsplash.com/photo-1654074518423-750767f571a9?auto=format&fit=crop&w=700&q=80" },
        { name: "Garden Mule", description: "Cucumber, lime, ginger beer", price: "$9", image: "https://images.unsplash.com/photo-1634496064950-02f043806b09?auto=format&fit=crop&w=700&q=80" },
        { name: "Berry Bramble Fizz", description: "Mixed berries, lemon, soda", price: "$9", image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=700&q=80" },
        { name: "Tropical Paradise", description: "Pineapple, coconut, passionfruit", price: "$10", image: "https://images.unsplash.com/photo-1619604394865-437a9fd6853c?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "kids",
      label: "Kids Menu",
      image: "https://images.unsplash.com/photo-1560130803-aaadb4bc913e?auto=format&fit=crop&w=1200&q=80",
      items: [
        { name: "Mini Cheeseburger & Fries", description: "Served with a fruit cup", price: "$9", image: "https://images.unsplash.com/photo-1636907229111-a8ac768fe6c9?auto=format&fit=crop&w=700&q=80" },
        { name: "Cheese Pizza Slice", description: "Served with a fruit cup", price: "$8", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80" },
        { name: "Chicken Tenders & Fries", description: "House-made honey mustard", price: "$9", image: "https://images.unsplash.com/photo-1605291581926-df4bf7ee3e89?auto=format&fit=crop&w=700&q=80" },
        { name: "Mac & Cheese", description: "Classic cheddar sauce", price: "$8", image: "https://images.unsplash.com/photo-1667499989723-c4ab9549d63c?auto=format&fit=crop&w=700&q=80" }
      ]
    },
    {
      id: "specials",
      label: "Chef Specials",
      image: "images/nihari.jpg",
      items: [
        { name: "Nihari", description: "Slow-braised overnight, warming spices, fresh ginger and coriander", price: "$24", featured: true, image: "images/nihari.jpg" },
        { name: "Zahra Tasting Menu (5-Course)", description: "Chef's seasonal selection, changes weekly", price: "$85/person", image: "https://images.unsplash.com/photo-1577219492769-b63a779fac28?auto=format&fit=crop&w=700&q=80" },
        { name: "Whole Roasted Branzino", description: "Herb crust, lemon butter, seasonal vegetables", price: "$38", image: "https://images.unsplash.com/photo-1577219492769-b63a779fac28?auto=format&fit=crop&w=700&q=80" },
        { name: "Duck Breast à l'Orange", description: "Crispy skin, orange gastrique, potato purée", price: "$32", image: "https://images.unsplash.com/photo-1577219492769-b63a779fac28?auto=format&fit=crop&w=700&q=80" },
        { name: "Truffle Risotto", description: "Arborio rice, wild mushroom, shaved black truffle", price: "$27", image: "https://images.unsplash.com/photo-1577219492769-b63a779fac28?auto=format&fit=crop&w=700&q=80" }
      ]
    }
  ]
};
