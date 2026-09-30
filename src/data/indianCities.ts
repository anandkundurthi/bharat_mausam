import { IndianCity, Region } from '../types/weather';

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
] as const;

export const INDIAN_REGIONS: { id: Region; label: string; icon: string }[] = [
  { id: 'North', label: 'North India', icon: '🏔️' },
  { id: 'South', label: 'South India', icon: '🌴' },
  { id: 'West', label: 'West India', icon: '🌊' },
  { id: 'East', label: 'East India', icon: '🌾' },
  { id: 'Central', label: 'Central India', icon: '🏛️' },
  { id: 'North-East', label: 'North-East', icon: '🌿' },
  { id: 'UT', label: 'Union Territories', icon: '🇮🇳' },
];

export const INDIAN_CITIES: IndianCity[] = [
  // --- National Capital Territory & Delhi NCR ---
  {
    id: 'delhi',
    name: 'New Delhi',
    state: 'Delhi',
    region: 'North',
    latitude: 28.6139,
    longitude: 77.2090,
    category: 'metro',
    isCapital: true,
    famousFor: 'Capital of India, Red Fort, India Gate',
    hindiName: 'नई दिल्ली',
    populationTier: 1
  },
  {
    id: 'noida',
    name: 'Noida',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 28.5355,
    longitude: 77.3910,
    category: 'tier2',
    famousFor: 'IT Hub, NCR Metro',
    hindiName: 'नोएडा',
    populationTier: 2
  },
  {
    id: 'gurugram',
    name: 'Gurugram',
    state: 'Haryana',
    region: 'North',
    latitude: 28.4595,
    longitude: 77.0266,
    category: 'metro',
    famousFor: 'Millennium City, Cyber Hub',
    hindiName: 'गुरुग्राम',
    populationTier: 1
  },
  {
    id: 'faridabad',
    name: 'Faridabad',
    state: 'Haryana',
    region: 'North',
    latitude: 28.4089,
    longitude: 77.3178,
    category: 'tier2',
    famousFor: 'Industrial City, Badkhal Lake',
    hindiName: 'फरीदाबाद',
    populationTier: 2
  },
  {
    id: 'ghaziabad',
    name: 'Ghaziabad',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 28.6692,
    longitude: 77.4538,
    category: 'tier2',
    famousFor: 'Gateway of UP',
    hindiName: 'गाजियाबाद',
    populationTier: 2
  },

  // --- Maharashtra ---
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    region: 'West',
    latitude: 19.0760,
    longitude: 72.8777,
    category: 'metro',
    isCapital: true,
    famousFor: 'Financial Capital, Marine Drive, Bollywood',
    hindiName: 'मुंबई',
    populationTier: 1
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    region: 'West',
    latitude: 18.5204,
    longitude: 73.8567,
    category: 'metro',
    famousFor: 'Oxford of the East, IT & Automobile Hub',
    hindiName: 'पुणे',
    populationTier: 1
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    state: 'Maharashtra',
    region: 'West',
    latitude: 21.1458,
    longitude: 79.0882,
    category: 'tier2',
    famousFor: 'Orange City, Winter Capital of Maharashtra',
    hindiName: 'नागपुर',
    populationTier: 2
  },
  {
    id: 'nashik',
    name: 'Nashik',
    state: 'Maharashtra',
    region: 'West',
    latitude: 19.9975,
    longitude: 73.7898,
    category: 'spiritual',
    famousFor: 'Wine Capital, Kumbh Mela, Panchavati',
    hindiName: 'नाशिक',
    populationTier: 2
  },
  {
    id: 'aurangabad',
    name: 'Chhatrapati Sambhajinagar',
    state: 'Maharashtra',
    region: 'West',
    latitude: 19.8762,
    longitude: 75.3433,
    category: 'tier2',
    famousFor: 'Ajanta & Ellora Caves, Bibi Ka Maqbara',
    hindiName: 'छत्रपती संभाजीनगर',
    populationTier: 2
  },
  {
    id: 'thane',
    name: 'Thane',
    state: 'Maharashtra',
    region: 'West',
    latitude: 19.2183,
    longitude: 72.9781,
    category: 'tier2',
    famousFor: 'City of Lakes',
    hindiName: 'ठाणे',
    populationTier: 2
  },
  {
    id: 'kolhapur',
    name: 'Kolhapur',
    state: 'Maharashtra',
    region: 'West',
    latitude: 16.7050,
    longitude: 74.2433,
    category: 'tier2',
    famousFor: 'Mahalaxmi Temple, Kolhapuri Chappals',
    hindiName: 'कोल्हापुर',
    populationTier: 2
  },
  {
    id: 'solapur',
    name: 'Solapur',
    state: 'Maharashtra',
    region: 'West',
    latitude: 17.6599,
    longitude: 75.9064,
    category: 'tier2',
    famousFor: 'Textile Hub, Solapuri Chaddar',
    hindiName: 'सोलापूर',
    populationTier: 2
  },
  {
    id: 'shirdi',
    name: 'Shirdi',
    state: 'Maharashtra',
    region: 'West',
    latitude: 19.7667,
    longitude: 74.4762,
    category: 'spiritual',
    famousFor: 'Sai Baba Temple',
    hindiName: 'शिर्डी',
    populationTier: 3
  },
  {
    id: 'mahabaleshwar',
    name: 'Mahabaleshwar',
    state: 'Maharashtra',
    region: 'West',
    latitude: 17.9307,
    longitude: 73.6477,
    category: 'hill_station',
    famousFor: 'Western Ghats, Strawberries, Viewpoints',
    hindiName: 'महाबळेश्वर',
    populationTier: 3
  },

  // --- Karnataka ---
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    region: 'South',
    latitude: 12.9716,
    longitude: 77.5946,
    category: 'metro',
    isCapital: true,
    famousFor: 'Silicon Valley of India, Garden City',
    hindiName: 'बेंगलुरु',
    populationTier: 1
  },
  {
    id: 'mysuru',
    name: 'Mysuru',
    state: 'Karnataka',
    region: 'South',
    latitude: 12.2958,
    longitude: 76.6394,
    category: 'tier2',
    famousFor: 'Mysore Palace, Dasara, Silk',
    hindiName: 'मैसूरु',
    populationTier: 2
  },
  {
    id: 'mangalore',
    name: 'Mangaluru',
    state: 'Karnataka',
    region: 'South',
    latitude: 12.9141,
    longitude: 74.8560,
    category: 'coastal',
    famousFor: 'Port City, Beaches, Sea Food',
    hindiName: 'मंगलुरु',
    populationTier: 2
  },
  {
    id: 'hubballi',
    name: 'Hubballi-Dharwad',
    state: 'Karnataka',
    region: 'South',
    latitude: 15.3647,
    longitude: 75.1240,
    category: 'tier2',
    famousFor: 'Commercial Hub of North Karnataka',
    hindiName: 'हुब्बल्लि',
    populationTier: 2
  },
  {
    id: 'belagavi',
    name: 'Belagavi',
    state: 'Karnataka',
    region: 'South',
    latitude: 15.8497,
    longitude: 74.4977,
    category: 'tier2',
    famousFor: 'Belgaum Fort, Sugar Bowl',
    hindiName: 'बेलगावी',
    populationTier: 2
  },
  {
    id: 'coorg',
    name: 'Madikeri (Coorg)',
    state: 'Karnataka',
    region: 'South',
    latitude: 12.4244,
    longitude: 75.7382,
    category: 'hill_station',
    famousFor: 'Coffee Plantations, Scotland of India',
    hindiName: 'कूर्ग (मदिकेरी)',
    populationTier: 3
  },
  {
    id: 'udupi',
    name: 'Udupi',
    state: 'Karnataka',
    region: 'South',
    latitude: 13.3409,
    longitude: 74.7421,
    category: 'coastal',
    famousFor: 'Krishna Matha, Malpe Beach, Cuisine',
    hindiName: 'उडुपी',
    populationTier: 3
  },

  // --- Tamil Nadu ---
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South',
    latitude: 13.0827,
    longitude: 80.2707,
    category: 'metro',
    isCapital: true,
    famousFor: 'Detroit of Asia, Marina Beach, Classical Arts',
    hindiName: 'चेन्नई',
    populationTier: 1
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    region: 'South',
    latitude: 11.0168,
    longitude: 76.9558,
    category: 'tier2',
    famousFor: 'Manchester of South India, Isha Yoga',
    hindiName: 'कोयंबटूर',
    populationTier: 2
  },
  {
    id: 'madurai',
    name: 'Madurai',
    state: 'Tamil Nadu',
    region: 'South',
    latitude: 9.9252,
    longitude: 78.1198,
    category: 'spiritual',
    famousFor: 'Meenakshi Amman Temple, Temple City',
    hindiName: 'मदुरै',
    populationTier: 2
  },
  {
    id: 'tiruchirappalli',
    name: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    region: 'South',
    latitude: 10.7905,
    longitude: 78.7047,
    category: 'tier2',
    famousFor: 'Rockfort Temple, Srirangam',
    hindiName: 'तिरुचिरापल्ली',
    populationTier: 2
  },
  {
    id: 'salem',
    name: 'Salem',
    state: 'Tamil Nadu',
    region: 'South',
    latitude: 11.6643,
    longitude: 78.1460,
    category: 'tier2',
    famousFor: 'Steel City, Mangoes',
    hindiName: 'सेलम',
    populationTier: 2
  },
  {
    id: 'ooty',
    name: 'Ooty (Udhagamandalam)',
    state: 'Tamil Nadu',
    region: 'South',
    latitude: 11.4102,
    longitude: 76.6950,
    category: 'hill_station',
    famousFor: 'Queen of Hill Stations, Nilgiri Tea',
    hindiName: 'ऊटी',
    populationTier: 3
  },
  {
    id: 'kanyakumari',
    name: 'Kanyakumari',
    state: 'Tamil Nadu',
    region: 'South',
    latitude: 8.0883,
    longitude: 77.5385,
    category: 'coastal',
    famousFor: 'Southernmost Tip of Mainland India, Triveni Sangam',
    hindiName: 'कन्याकुमारी',
    populationTier: 3
  },
  {
    id: 'rameshwaram',
    name: 'Rameswaram',
    state: 'Tamil Nadu',
    region: 'South',
    latitude: 9.2876,
    longitude: 79.3129,
    category: 'spiritual',
    famousFor: 'Ramanathaswamy Temple, Pamban Bridge',
    hindiName: 'रामेश्वरम',
    populationTier: 3
  },

  // --- Telangana ---
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    region: 'South',
    latitude: 17.3850,
    longitude: 78.4867,
    category: 'metro',
    isCapital: true,
    famousFor: 'City of Pearls, Biryani, Cyberabad',
    hindiName: 'हैदराबाद',
    populationTier: 1
  },
  {
    id: 'warangal',
    name: 'Warangal',
    state: 'Telangana',
    region: 'South',
    latitude: 17.9784,
    longitude: 79.5941,
    category: 'tier2',
    famousFor: 'Kakatiya Dynasty, Thousand Pillar Temple',
    hindiName: 'वारंगल',
    populationTier: 2
  },
  {
    id: 'nizamabad',
    name: 'Nizamabad',
    state: 'Telangana',
    region: 'South',
    latitude: 18.6725,
    longitude: 78.0941,
    category: 'tier3',
    famousFor: 'Ashok Sagar, Agriculture & Trade',
    hindiName: 'निज़ामाबाद',
    populationTier: 3
  },

  // --- Andhra Pradesh ---
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam (Vizag)',
    state: 'Andhra Pradesh',
    region: 'South',
    latitude: 17.6868,
    longitude: 83.2185,
    category: 'metro',
    famousFor: 'City of Destiny, Vizag Port, RK Beach',
    hindiName: 'विशाखापट्टनम',
    populationTier: 1
  },
  {
    id: 'vijayawada',
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    region: 'South',
    latitude: 16.5062,
    longitude: 80.6480,
    category: 'tier2',
    famousFor: 'Kanaka Durga Temple, Prakasam Barrage',
    hindiName: 'विजयवाड़ा',
    populationTier: 2
  },
  {
    id: 'tirupati',
    name: 'Tirupati',
    state: 'Andhra Pradesh',
    region: 'South',
    latitude: 13.6288,
    longitude: 79.4192,
    category: 'spiritual',
    famousFor: 'Sri Venkateswara Swamy Temple (Tirumala)',
    hindiName: 'तिरुपति',
    populationTier: 2
  },
  {
    id: 'guntur',
    name: 'Guntur',
    state: 'Andhra Pradesh',
    region: 'South',
    latitude: 16.3067,
    longitude: 80.4365,
    category: 'tier2',
    famousFor: 'Chilli Capital of India, Tobacco Trade',
    hindiName: 'गुंटूर',
    populationTier: 2
  },

  // --- Kerala ---
  {
    id: 'kochi',
    name: 'Kochi (Cochin)',
    state: 'Kerala',
    region: 'South',
    latitude: 9.9312,
    longitude: 76.2673,
    category: 'metro',
    famousFor: 'Queen of Arabian Sea, Fort Kochi, Backwaters',
    hindiName: 'कोच्चि',
    populationTier: 1
  },
  {
    id: 'thiruvananthapuram',
    name: 'Thiruvananthapuram',
    state: 'Kerala',
    region: 'South',
    latitude: 8.5241,
    longitude: 76.9366,
    category: 'tier2',
    isCapital: true,
    famousFor: 'Padmanabhaswamy Temple, Kovalam Beach',
    hindiName: 'तिरुवनंतपुरम',
    populationTier: 2
  },
  {
    id: 'kozhikode',
    name: 'Kozhikode (Calicut)',
    state: 'Kerala',
    region: 'South',
    latitude: 11.2588,
    longitude: 75.7804,
    category: 'coastal',
    famousFor: 'City of Spices, Malabar Coast, Cuisine',
    hindiName: 'कोझिकोड',
    populationTier: 2
  },
  {
    id: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    region: 'South',
    latitude: 10.0889,
    longitude: 77.0595,
    category: 'hill_station',
    famousFor: 'Tea Gardens, Western Ghats, Anamudi',
    hindiName: 'मुन्नार',
    populationTier: 3
  },
  {
    id: 'alappuzha',
    name: 'Alappuzha (Alleppey)',
    state: 'Kerala',
    region: 'South',
    latitude: 9.4981,
    longitude: 76.3388,
    category: 'coastal',
    famousFor: 'Venice of the East, Houseboats',
    hindiName: 'अलप्पुझा',
    populationTier: 3
  },

  // --- Gujarat ---
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    state: 'Gujarat',
    region: 'West',
    latitude: 23.0225,
    longitude: 72.5714,
    category: 'metro',
    famousFor: 'UNESCO World Heritage City, Sabarmati Ashram',
    hindiName: 'अहमदाबाद',
    populationTier: 1
  },
  {
    id: 'surat',
    name: 'Surat',
    state: 'Gujarat',
    region: 'West',
    latitude: 21.1702,
    longitude: 72.8311,
    category: 'metro',
    famousFor: 'Diamond City, Textile Hub',
    hindiName: 'सूरत',
    populationTier: 1
  },
  {
    id: 'vadodara',
    name: 'Vadodara (Baroda)',
    state: 'Gujarat',
    region: 'West',
    latitude: 22.3072,
    longitude: 73.1812,
    category: 'tier2',
    famousFor: 'Cultural Capital of Gujarat, Laxmi Vilas Palace',
    hindiName: 'वडोदरा',
    populationTier: 2
  },
  {
    id: 'rajkot',
    name: 'Rajkot',
    state: 'Gujarat',
    region: 'West',
    latitude: 22.3039,
    longitude: 70.8022,
    category: 'tier2',
    famousFor: 'Saurashtra Hub, Handicrafts, Gold',
    hindiName: 'राजकोट',
    populationTier: 2
  },
  {
    id: 'gandhinagar',
    name: 'Gandhinagar',
    state: 'Gujarat',
    region: 'West',
    latitude: 23.2156,
    longitude: 72.6369,
    category: 'tier2',
    isCapital: true,
    famousFor: 'Green Capital City, Akshardham Temple',
    hindiName: 'गांधीनगर',
    populationTier: 2
  },
  {
    id: 'dwarka',
    name: 'Dwarka',
    state: 'Gujarat',
    region: 'West',
    latitude: 22.2442,
    longitude: 68.9685,
    category: 'spiritual',
    famousFor: 'Dwarkadhish Temple, Char Dham',
    hindiName: 'द्वारका',
    populationTier: 3
  },

  // --- Rajasthan ---
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North',
    latitude: 26.9124,
    longitude: 75.7873,
    category: 'metro',
    isCapital: true,
    famousFor: 'Pink City, Hawa Mahal, Amer Fort',
    hindiName: 'जयपुर',
    populationTier: 1
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    state: 'Rajasthan',
    region: 'North',
    latitude: 26.2389,
    longitude: 73.0243,
    category: 'tier2',
    famousFor: 'Blue City, Sun City, Mehrangarh Fort',
    hindiName: 'जोधपुर',
    populationTier: 2
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'North',
    latitude: 24.5854,
    longitude: 73.7125,
    category: 'tier2',
    famousFor: 'City of Lakes, Lake Pichola, City Palace',
    hindiName: 'उदयपुर',
    populationTier: 2
  },
  {
    id: 'kota',
    name: 'Kota',
    state: 'Rajasthan',
    region: 'North',
    latitude: 25.2138,
    longitude: 75.8648,
    category: 'tier2',
    famousFor: 'Education Hub, Chambal Riverfront',
    hindiName: 'कोटा',
    populationTier: 2
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    state: 'Rajasthan',
    region: 'North',
    latitude: 26.9157,
    longitude: 70.9083,
    category: 'tier3',
    famousFor: 'Golden City, Thar Desert, Sam Sand Dunes',
    hindiName: 'जैसलमेर',
    populationTier: 3
  },
  {
    id: 'ajmer',
    name: 'Ajmer',
    state: 'Rajasthan',
    region: 'North',
    latitude: 26.4499,
    longitude: 74.6399,
    category: 'spiritual',
    famousFor: 'Ajmer Sharif Dargah, Ana Sagar',
    hindiName: 'अजमेर',
    populationTier: 2
  },
  {
    id: 'mount_abu',
    name: 'Mount Abu',
    state: 'Rajasthan',
    region: 'North',
    latitude: 24.5925,
    longitude: 72.7156,
    category: 'hill_station',
    famousFor: 'Only Hill Station in Rajasthan, Dilwara Temples',
    hindiName: 'माउंट आबू',
    populationTier: 3
  },

  // --- Uttar Pradesh ---
  {
    id: 'lucknow',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 26.8467,
    longitude: 80.9462,
    category: 'metro',
    isCapital: true,
    famousFor: 'City of Nawabs, Chikankari, Bara Imambara',
    hindiName: 'लखनऊ',
    populationTier: 1
  },
  {
    id: 'varanasi',
    name: 'Varanasi (Kashi)',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 25.3176,
    longitude: 82.9739,
    category: 'spiritual',
    famousFor: 'Ghats of Ganges, Kashi Vishwanath, Sarnath',
    hindiName: 'वाराणसी',
    populationTier: 2
  },
  {
    id: 'kanpur',
    name: 'Kanpur',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 26.4499,
    longitude: 80.3319,
    category: 'metro',
    famousFor: 'Leather City, Industrial Metropolis',
    hindiName: 'कानपुर',
    populationTier: 1
  },
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 27.1767,
    longitude: 78.0081,
    category: 'tier2',
    famousFor: 'Taj Mahal, Agra Fort, Petha',
    hindiName: 'आगरा',
    populationTier: 2
  },
  {
    id: 'prayagraj',
    name: 'Prayagraj (Allahabad)',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 25.4358,
    longitude: 81.8463,
    category: 'spiritual',
    famousFor: 'Triveni Sangam, Maha Kumbh Mela, High Court',
    hindiName: 'प्रयागराज',
    populationTier: 2
  },
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 26.7922,
    longitude: 82.1998,
    category: 'spiritual',
    famousFor: 'Ram Janmabhoomi Mandir, Saryu River',
    hindiName: 'अयोध्या',
    populationTier: 3
  },
  {
    id: 'mathura',
    name: 'Mathura',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 27.4924,
    longitude: 77.6737,
    category: 'spiritual',
    famousFor: 'Krishna Janmabhoomi, Vrindavan',
    hindiName: 'मथुरा',
    populationTier: 2
  },
  {
    id: 'meerut',
    name: 'Meerut',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 28.9845,
    longitude: 77.7064,
    category: 'tier2',
    famousFor: 'Sports Goods Capital, 1857 Revolt',
    hindiName: 'मेरठ',
    populationTier: 2
  },
  {
    id: 'gorakhpur',
    name: 'Gorakhpur',
    state: 'Uttar Pradesh',
    region: 'North',
    latitude: 26.7606,
    longitude: 83.3732,
    category: 'tier2',
    famousFor: 'Gorakhnath Temple, Gita Press',
    hindiName: 'गोरखपुर',
    populationTier: 2
  },

  // --- West Bengal ---
  {
    id: 'kolkata',
    name: 'Kolkata',
    state: 'West Bengal',
    region: 'East',
    latitude: 22.5726,
    longitude: 88.3639,
    category: 'metro',
    isCapital: true,
    famousFor: 'City of Joy, Howrah Bridge, Victoria Memorial',
    hindiName: 'कोलकाता',
    populationTier: 1
  },
  {
    id: 'siliguri',
    name: 'Siliguri',
    state: 'West Bengal',
    region: 'East',
    latitude: 26.7271,
    longitude: 88.3953,
    category: 'tier2',
    famousFor: 'Gateway to North-East, Tea Trade',
    hindiName: 'सिलीगुड़ी',
    populationTier: 2
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    state: 'West Bengal',
    region: 'East',
    latitude: 27.0410,
    longitude: 88.2663,
    category: 'hill_station',
    famousFor: 'Himalayan Toy Train, Darjeeling Tea, Kanchenjunga',
    hindiName: 'दार्जिलिंग',
    populationTier: 3
  },
  {
    id: 'asansol',
    name: 'Asansol',
    state: 'West Bengal',
    region: 'East',
    latitude: 23.6739,
    longitude: 86.9524,
    category: 'tier2',
    famousFor: 'Coal Mining, Industrial Hub',
    hindiName: 'आसनसोल',
    populationTier: 2
  },
  {
    id: 'durgapur',
    name: 'Durgapur',
    state: 'West Bengal',
    region: 'East',
    latitude: 23.5204,
    longitude: 87.3119,
    category: 'tier2',
    famousFor: 'Steel City of Eastern India',
    hindiName: 'दुर्गापुर',
    populationTier: 2
  },

  // --- Madhya Pradesh ---
  {
    id: 'bhopal',
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    region: 'Central',
    latitude: 23.2599,
    longitude: 77.4126,
    category: 'tier2',
    isCapital: true,
    famousFor: 'City of Lakes, Upper Lake, Van Vihar',
    hindiName: 'भोपाल',
    populationTier: 2
  },
  {
    id: 'indore',
    name: 'Indore',
    state: 'Madhya Pradesh',
    region: 'Central',
    latitude: 22.7196,
    longitude: 75.8577,
    category: 'metro',
    famousFor: 'Cleanest City of India, Sarafa Bazaar, Poha',
    hindiName: 'इंदौर',
    populationTier: 1
  },
  {
    id: 'gwalior',
    name: 'Gwalior',
    state: 'Madhya Pradesh',
    region: 'Central',
    latitude: 26.2183,
    longitude: 78.1828,
    category: 'tier2',
    famousFor: 'Gwalior Fort, Tansen Music Heritage',
    hindiName: 'ग्वालियर',
    populationTier: 2
  },
  {
    id: 'jabalpur',
    name: 'Jabalpur',
    state: 'Madhya Pradesh',
    region: 'Central',
    latitude: 23.1815,
    longitude: 79.9864,
    category: 'tier2',
    famousFor: 'Bhedaghat Marble Rocks, Dhuandhar Falls',
    hindiName: 'जबलपुर',
    populationTier: 2
  },
  {
    id: 'ujjain',
    name: 'Ujjain',
    state: 'Madhya Pradesh',
    region: 'Central',
    latitude: 23.1765,
    longitude: 75.7885,
    category: 'spiritual',
    famousFor: 'Mahakaleshwar Jyotirlinga, Simhastha Kumbh',
    hindiName: 'उज्जैन',
    populationTier: 2
  },

  // --- Punjab & Chandigarh ---
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    state: 'Chandigarh',
    region: 'North',
    latitude: 30.7333,
    longitude: 76.7794,
    category: 'metro',
    isCapital: true,
    famousFor: 'The City Beautiful, Rock Garden, Sukhna Lake',
    hindiName: 'चंडीगढ़',
    populationTier: 1
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    state: 'Punjab',
    region: 'North',
    latitude: 31.6340,
    longitude: 74.8723,
    category: 'spiritual',
    famousFor: 'Golden Temple (Harmandir Sahib), Wagah Border',
    hindiName: 'अमृतसर',
    populationTier: 2
  },
  {
    id: 'ludhiana',
    name: 'Ludhiana',
    state: 'Punjab',
    region: 'North',
    latitude: 30.9010,
    longitude: 75.8573,
    category: 'tier2',
    famousFor: 'Manchester of India, Hosiery & Cycles',
    hindiName: 'लुधियाना',
    populationTier: 2
  },
  {
    id: 'jalandhar',
    name: 'Jalandhar',
    state: 'Punjab',
    region: 'North',
    latitude: 31.3260,
    longitude: 75.5762,
    category: 'tier2',
    famousFor: 'Sports Goods Manufacturing Hub',
    hindiName: 'जालंधर',
    populationTier: 2
  },
  {
    id: 'patiala',
    name: 'Patiala',
    state: 'Punjab',
    region: 'North',
    latitude: 30.3398,
    longitude: 76.3869,
    category: 'tier2',
    famousFor: 'Qila Mubarak, Royal Heritage, Patiala Shahi',
    hindiName: 'पटियाला',
    populationTier: 2
  },

  // --- Bihar ---
  {
    id: 'patna',
    name: 'Patna',
    state: 'Bihar',
    region: 'East',
    latitude: 25.5941,
    longitude: 85.1376,
    category: 'metro',
    isCapital: true,
    famousFor: 'Ancient Pataliputra, Golghar, Ganga Ghats',
    hindiName: 'पटना',
    populationTier: 1
  },
  {
    id: 'gaya',
    name: 'Gaya (Bodh Gaya)',
    state: 'Bihar',
    region: 'East',
    latitude: 24.7955,
    longitude: 85.0002,
    category: 'spiritual',
    famousFor: 'Mahabodhi Temple, Buddha Enlightenment',
    hindiName: 'गया (बोधगया)',
    populationTier: 2
  },
  {
    id: 'muzaffarpur',
    name: 'Muzaffarpur',
    state: 'Bihar',
    region: 'East',
    latitude: 26.1209,
    longitude: 85.3647,
    category: 'tier2',
    famousFor: 'Shahi Litchi City',
    hindiName: 'मुजफ्फरपुर',
    populationTier: 2
  },
  {
    id: 'bhagalpur',
    name: 'Bhagalpur',
    state: 'Bihar',
    region: 'East',
    latitude: 25.2425,
    longitude: 86.9842,
    category: 'tier2',
    famousFor: 'Silk City, Vikramshila',
    hindiName: 'भागलपुर',
    populationTier: 2
  },

  // --- Odisha ---
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar',
    state: 'Odisha',
    region: 'East',
    latitude: 20.2961,
    longitude: 85.8245,
    category: 'tier2',
    isCapital: true,
    famousFor: 'Temple City, Lingaraj Temple, IT Hub',
    hindiName: 'भुवनेश्वर',
    populationTier: 2
  },
  {
    id: 'puri',
    name: 'Puri',
    state: 'Odisha',
    region: 'East',
    latitude: 19.8135,
    longitude: 85.8312,
    category: 'spiritual',
    famousFor: 'Jagannath Temple, Rath Yatra, Golden Beach',
    hindiName: 'पुरी',
    populationTier: 3
  },
  {
    id: 'cuttack',
    name: 'Cuttack',
    state: 'Odisha',
    region: 'East',
    latitude: 20.4625,
    longitude: 85.8828,
    category: 'tier2',
    famousFor: 'Silver City, Bali Jatra, Netaji Birthplace',
    hindiName: 'कटक',
    populationTier: 2
  },
  {
    id: 'rourkela',
    name: 'Rourkela',
    state: 'Odisha',
    region: 'East',
    latitude: 22.2604,
    longitude: 84.8536,
    category: 'tier2',
    famousFor: 'Steel City, Hockey Stadium',
    hindiName: 'राउरकेला',
    populationTier: 2
  },

  // --- Jharkhand ---
  {
    id: 'ranchi',
    name: 'Ranchi',
    state: 'Jharkhand',
    region: 'East',
    latitude: 23.3441,
    longitude: 85.3096,
    category: 'tier2',
    isCapital: true,
    famousFor: 'City of Waterfalls, Tagore Hill, Dhoni Hometown',
    hindiName: 'राँची',
    populationTier: 2
  },
  {
    id: 'jamshedpur',
    name: 'Jamshedpur',
    state: 'Jharkhand',
    region: 'East',
    latitude: 22.8046,
    longitude: 86.2029,
    category: 'tier2',
    famousFor: 'Steel City, Tata Steel, Jubilee Park',
    hindiName: 'जमशेदपुर',
    populationTier: 2
  },
  {
    id: 'dhanbad',
    name: 'Dhanbad',
    state: 'Jharkhand',
    region: 'East',
    latitude: 23.7957,
    longitude: 86.4304,
    category: 'tier2',
    famousFor: 'Coal Capital of India',
    hindiName: 'धनबाद',
    populationTier: 2
  },

  // --- Chhattisgarh ---
  {
    id: 'raipur',
    name: 'Raipur',
    state: 'Chhattisgarh',
    region: 'Central',
    latitude: 21.2514,
    longitude: 81.6296,
    category: 'tier2',
    isCapital: true,
    famousFor: 'Nava Raipur, Steel & Rice Hub',
    hindiName: 'रायपुर',
    populationTier: 2
  },
  {
    id: 'bilaspur',
    name: 'Bilaspur',
    state: 'Chhattisgarh',
    region: 'Central',
    latitude: 22.0797,
    longitude: 82.1409,
    category: 'tier2',
    famousFor: 'High Court, Doobraj Rice',
    hindiName: 'बिलासपुर',
    populationTier: 3
  },

  // --- Uttarakhand ---
  {
    id: 'dehradun',
    name: 'Dehradun',
    state: 'Uttarakhand',
    region: 'North',
    latitude: 30.3165,
    longitude: 78.0322,
    category: 'tier2',
    isCapital: true,
    famousFor: 'Doon Valley, Forest Research Institute',
    hindiName: 'देहरादून',
    populationTier: 2
  },
  {
    id: 'haridwar',
    name: 'Haridwar',
    state: 'Uttarakhand',
    region: 'North',
    latitude: 29.9457,
    longitude: 78.1642,
    category: 'spiritual',
    famousFor: 'Har Ki Pauri, Kumbh Mela, Ganga Aarti',
    hindiName: 'हरिद्वार',
    populationTier: 2
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    region: 'North',
    latitude: 30.0869,
    longitude: 78.2676,
    category: 'spiritual',
    famousFor: 'Yoga Capital of the World, Ram Jhula, River Rafting',
    hindiName: 'ऋषिकेश',
    populationTier: 3
  },
  {
    id: 'nainital',
    name: 'Nainital',
    state: 'Uttarakhand',
    region: 'North',
    latitude: 29.3919,
    longitude: 79.4542,
    category: 'hill_station',
    famousFor: 'Naini Lake, Mall Road, Kumaon Hills',
    hindiName: 'नैनीताल',
    populationTier: 3
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    state: 'Uttarakhand',
    region: 'North',
    latitude: 30.4598,
    longitude: 78.0644,
    category: 'hill_station',
    famousFor: 'Queen of the Hills, Kempty Falls',
    hindiName: 'मसूरी',
    populationTier: 3
  },

  // --- Himachal Pradesh ---
  {
    id: 'shimla',
    name: 'Shimla',
    state: 'Himachal Pradesh',
    region: 'North',
    latitude: 31.1048,
    longitude: 77.1734,
    category: 'hill_station',
    isCapital: true,
    famousFor: 'The Ridge, Mall Road, British Summer Capital',
    hindiName: 'शिमला',
    populationTier: 2
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    region: 'North',
    latitude: 32.2432,
    longitude: 77.1892,
    category: 'hill_station',
    famousFor: 'Solang Valley, Rohtang Pass, Atal Tunnel',
    hindiName: 'मनाली',
    populationTier: 3
  },
  {
    id: 'dharamshala',
    name: 'Dharamshala',
    state: 'Himachal Pradesh',
    region: 'North',
    latitude: 32.2190,
    longitude: 76.3234,
    category: 'hill_station',
    famousFor: 'Dalai Lama Residence, McLeod Ganj, HPCA Stadium',
    hindiName: 'धर्मशाला',
    populationTier: 3
  },
  {
    id: 'kullu',
    name: 'Kullu',
    state: 'Himachal Pradesh',
    region: 'North',
    latitude: 31.9579,
    longitude: 77.1095,
    category: 'hill_station',
    famousFor: 'Valley of Gods, Dussehra, River Beas',
    hindiName: 'कुल्लू',
    populationTier: 3
  },

  // --- Jammu & Kashmir and Ladakh ---
  {
    id: 'srinagar',
    name: 'Srinagar',
    state: 'Jammu and Kashmir',
    region: 'North',
    latitude: 34.0837,
    longitude: 74.7973,
    category: 'hill_station',
    isCapital: true,
    famousFor: 'Dal Lake, Shikara, Houseboats, Tulip Garden',
    hindiName: 'श्रीनगर',
    populationTier: 2
  },
  {
    id: 'jammu',
    name: 'Jammu',
    state: 'Jammu and Kashmir',
    region: 'North',
    latitude: 32.7266,
    longitude: 74.8570,
    category: 'spiritual',
    famousFor: 'City of Temples, Vaishno Devi Base',
    hindiName: 'जम्मू',
    populationTier: 2
  },
  {
    id: 'gulmarg',
    name: 'Gulmarg',
    state: 'Jammu and Kashmir',
    region: 'North',
    latitude: 34.0484,
    longitude: 74.3805,
    category: 'hill_station',
    famousFor: 'Meadow of Flowers, Gondola, Ski Resort',
    hindiName: 'गुलमर्ग',
    populationTier: 3
  },
  {
    id: 'leh',
    name: 'Leh',
    state: 'Ladakh',
    region: 'North',
    latitude: 34.1526,
    longitude: 77.5771,
    category: 'hill_station',
    isCapital: true,
    famousFor: 'Land of High Passes, Pangong Lake, Monasteries',
    hindiName: 'लेह',
    populationTier: 3
  },
  {
    id: 'kargil',
    name: 'Kargil',
    state: 'Ladakh',
    region: 'North',
    latitude: 34.5539,
    longitude: 76.1349,
    category: 'tier3',
    famousFor: 'Suru Valley, Kargil War Memorial',
    hindiName: 'कारगिल',
    populationTier: 3
  },

  // --- Goa ---
  {
    id: 'panaji',
    name: 'Panaji',
    state: 'Goa',
    region: 'West',
    latitude: 15.4909,
    longitude: 73.8278,
    category: 'coastal',
    isCapital: true,
    famousFor: 'Fontainhas Latin Quarter, Mandovi River',
    hindiName: 'पणजी',
    populationTier: 3
  },
  {
    id: 'margao',
    name: 'Margao',
    state: 'Goa',
    region: 'West',
    latitude: 15.2832,
    longitude: 73.9862,
    category: 'coastal',
    famousFor: 'Cultural Capital of Goa, Colva Beach',
    hindiName: 'मडगांव',
    populationTier: 3
  },

  // --- North-Eastern States ---
  {
    id: 'guwahati',
    name: 'Guwahati',
    state: 'Assam',
    region: 'North-East',
    latitude: 26.1445,
    longitude: 91.7362,
    category: 'metro',
    famousFor: 'Kamakhya Temple, Brahmaputra River, Gateway to NE',
    hindiName: 'गुवाहाटी',
    populationTier: 1
  },
  {
    id: 'shillong',
    name: 'Shillong',
    state: 'Meghalaya',
    region: 'North-East',
    latitude: 25.5788,
    longitude: 91.8933,
    category: 'hill_station',
    isCapital: true,
    famousFor: 'Scotland of the East, Umiam Lake, Waterfalls',
    hindiName: 'शिलांग',
    populationTier: 2
  },
  {
    id: 'gangtok',
    name: 'Gangtok',
    state: 'Sikkim',
    region: 'North-East',
    latitude: 27.3389,
    longitude: 88.6065,
    category: 'hill_station',
    isCapital: true,
    famousFor: 'Rumtek Monastery, View of Mt Kanchenjunga',
    hindiName: 'गंगटोक',
    populationTier: 2
  },
  {
    id: 'agartala',
    name: 'Agartala',
    state: 'Tripura',
    region: 'North-East',
    latitude: 23.8315,
    longitude: 91.2868,
    category: 'tier2',
    isCapital: true,
    famousFor: 'Ujjayanta Palace, Heritage of Tripura',
    hindiName: 'अगरतला',
    populationTier: 2
  },
  {
    id: 'imphal',
    name: 'Imphal',
    state: 'Manipur',
    region: 'North-East',
    latitude: 24.8170,
    longitude: 93.9368,
    category: 'tier2',
    isCapital: true,
    famousFor: 'Kangla Fort, Loktak Floating Lake',
    hindiName: 'इम्फाल',
    populationTier: 2
  },
  {
    id: 'aizawl',
    name: 'Aizawl',
    state: 'Mizoram',
    region: 'North-East',
    latitude: 23.7271,
    longitude: 92.7176,
    category: 'hill_station',
    isCapital: true,
    famousFor: 'Mizo Hills, Solomon Temple, Serene Climate',
    hindiName: 'आइजोल',
    populationTier: 2
  },
  {
    id: 'kohima',
    name: 'Kohima',
    state: 'Nagaland',
    region: 'North-East',
    latitude: 25.6751,
    longitude: 94.1086,
    category: 'hill_station',
    isCapital: true,
    famousFor: 'Hornbill Festival, Naga Heritage, War Cemetery',
    hindiName: 'कोहिमा',
    populationTier: 3
  },
  {
    id: 'itanagar',
    name: 'Itanagar',
    state: 'Arunachal Pradesh',
    region: 'North-East',
    latitude: 27.0844,
    longitude: 93.6053,
    category: 'hill_station',
    isCapital: true,
    famousFor: 'Ita Fort, Ganga Lake, Land of Dawn-lit Mountains',
    hindiName: 'ईटानगर',
    populationTier: 3
  },

  // --- Island & Coastal Union Territories ---
  {
    id: 'port_blair',
    name: 'Port Blair',
    state: 'Andaman and Nicobar Islands',
    region: 'UT',
    latitude: 11.6234,
    longitude: 92.7265,
    category: 'coastal',
    isCapital: true,
    famousFor: 'Cellular Jail, Ross Island, Coral Reefs',
    hindiName: 'पोर्ट ब्लेयर',
    populationTier: 3
  },
  {
    id: 'puducherry',
    name: 'Puducherry (Pondicherry)',
    state: 'Puducherry',
    region: 'UT',
    latitude: 11.9416,
    longitude: 79.8083,
    category: 'coastal',
    isCapital: true,
    famousFor: 'French Quarter, Promenade Beach, Auroville',
    hindiName: 'पुदुच्चेरी',
    populationTier: 2
  },
  {
    id: 'kavaratti',
    name: 'Kavaratti',
    state: 'Lakshadweep',
    region: 'UT',
    latitude: 10.5667,
    longitude: 72.6417,
    category: 'coastal',
    isCapital: true,
    famousFor: 'Lakshadweep Coral Atolls, Marine Life',
    hindiName: 'कवरत्ती',
    populationTier: 3
  },
  {
    id: 'daman',
    name: 'Daman',
    state: 'Dadra and Nagar Haveli and Daman and Diu',
    region: 'UT',
    latitude: 20.3974,
    longitude: 72.8328,
    category: 'coastal',
    isCapital: true,
    famousFor: 'Portuguese Forts, Devka Beach',
    hindiName: 'दमन',
    populationTier: 3
  }
];

// Calculate Haversine distance in km between two lat/lon points
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Find nearest Indian city to given coordinates
export function findNearestIndianCity(lat: number, lon: number): { city: IndianCity; distanceKm: number } {
  let nearestCity = INDIAN_CITIES[0];
  let minDistance = calculateDistanceKm(lat, lon, nearestCity.latitude, nearestCity.longitude);

  for (const city of INDIAN_CITIES) {
    const dist = calculateDistanceKm(lat, lon, city.latitude, city.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      nearestCity = city;
    }
  }

  return { city: nearestCity, distanceKm: minDistance };
}

// Filter curated Indian cities
export function searchCuratedIndianCities(query: string): IndianCity[] {
  const q = query.toLowerCase().trim();
  if (!q) return INDIAN_CITIES;

  return INDIAN_CITIES.filter((city) => {
    return (
      city.name.toLowerCase().includes(q) ||
      city.state.toLowerCase().includes(q) ||
      city.region.toLowerCase().includes(q) ||
      (city.famousFor && city.famousFor.toLowerCase().includes(q)) ||
      (city.hindiName && city.hindiName.includes(q))
    );
  });
}
