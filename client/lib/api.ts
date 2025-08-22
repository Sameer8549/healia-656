import axios from 'axios';

// Air Quality API
export async function getAirQuality(city: string = 'Delhi') {
  try {
    // Using OpenWeatherMap Air Pollution API (free tier)
    const API_KEY = 'demo_key'; // In production, use environment variable
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?q=${city}&appid=${API_KEY}`
    );
    
    // Fallback with mock data for demo
    return {
      aqi: Math.floor(Math.random() * 300) + 50,
      pm25: Math.floor(Math.random() * 100) + 20,
      pm10: Math.floor(Math.random() * 150) + 30,
      status: 'Moderate',
      city: city,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    // Mock data for demo
    return {
      aqi: 156,
      pm25: 65,
      pm10: 89,
      status: 'Moderate',
      city: city,
      timestamp: new Date().toISOString()
    };
  }
}

// Weather API
export async function getWeather(city: string = 'Delhi') {
  try {
    // Mock weather data for demo
    return {
      temperature: Math.floor(Math.random() * 20) + 20,
      humidity: Math.floor(Math.random() * 40) + 40,
      condition: 'Partly Cloudy',
      windSpeed: Math.floor(Math.random() * 15) + 5,
      city: city,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      temperature: 28,
      humidity: 65,
      condition: 'Partly Cloudy',
      windSpeed: 8,
      city: city,
      timestamp: new Date().toISOString()
    };
  }
}

// Government Schemes API
export async function getGovernmentSchemes(userProfile: {
  age?: number;
  gender?: string;
  income?: string;
  state?: string;
  pregnant?: boolean;
}) {
  // Mock government schemes data
  const allSchemes = [
    {
      id: 'pmmvy',
      name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      description: 'Cash benefit of ₹5,000 for first living child',
      eligibility: ['Pregnant women', 'Lactating mothers', 'Age 19+'],
      benefits: ['₹1,000 after early registration', '₹2,000 after 6 months', '₹2,000 after delivery'],
      applicationProcess: 'Apply at Anganwadi Center',
      documents: ['Aadhaar', 'Bank account', 'Pregnancy certificate'],
      eligible: userProfile.gender === 'female' && userProfile.pregnant
    },
    {
      id: 'jsy',
      name: 'Janani Suraksha Yojana (JSY)',
      description: 'Safe delivery and post-delivery care support',
      eligibility: ['Pregnant women', 'BPL families'],
      benefits: ['Cash assistance for delivery', 'Free delivery care'],
      applicationProcess: 'Register at health facility',
      documents: ['Aadhaar', 'BPL card'],
      eligible: userProfile.gender === 'female' && userProfile.income === 'low'
    },
    {
      id: 'ayushman',
      name: 'Ayushman Bharat - PM-JAY',
      description: 'Health insurance coverage up to ₹5 lakh',
      eligibility: ['SECC database families', 'Rural/Urban poor'],
      benefits: ['₹5 lakh coverage', 'Cashless treatment', '1,400+ procedures'],
      applicationProcess: 'Check eligibility online',
      documents: ['Aadhaar', 'Ration card'],
      eligible: userProfile.income === 'low' || userProfile.income === 'medium'
    }
  ];

  return allSchemes.filter(scheme => scheme.eligible);
}

// Hospital Finder API
export async function findNearbyHospitals(location: string = 'Delhi') {
  // Mock hospital data
  return [
    {
      name: 'All India Institute of Medical Sciences (AIIMS)',
      distance: '2.3 km',
      type: 'Government',
      phone: '+91-11-26588500',
      address: 'Ansari Nagar, New Delhi',
      rating: 4.5,
      specialties: ['Cardiology', 'Neurology', 'Oncology'],
      emergency: true
    },
    {
      name: 'Apollo Hospital',
      distance: '3.1 km',
      type: 'Private',
      phone: '+91-11-26925858',
      address: 'Sarita Vihar, New Delhi',
      rating: 4.3,
      specialties: ['Multi-specialty', 'Emergency'],
      emergency: true
    },
    {
      name: 'Max Super Speciality Hospital',
      distance: '4.2 km',
      type: 'Private',
      phone: '+91-11-26925050',
      address: 'Saket, New Delhi',
      rating: 4.2,
      specialties: ['Cardiology', 'Orthopedics'],
      emergency: true
    }
  ];
}

// Public Health Alerts API
export async function getPublicHealthAlerts(location: string = 'Delhi') {
  // Mock public health alerts
  return [
    {
      id: 'alert1',
      type: 'outbreak',
      severity: 'medium',
      title: 'Dengue Cases Rising',
      description: 'Increased dengue cases reported in South Delhi area',
      date: new Date().toISOString(),
      location: 'South Delhi',
      recommendations: ['Use mosquito repellent', 'Remove stagnant water', 'Seek medical care for fever']
    },
    {
      id: 'alert2',
      type: 'vaccination',
      severity: 'low',
      title: 'COVID-19 Booster Available',
      description: 'COVID-19 booster shots available at all government centers',
      date: new Date().toISOString(),
      location: 'All Delhi',
      recommendations: ['Get vaccinated if eligible', 'Carry ID proof', 'Book slot online']
    }
  ];
}

// Emergency Services API
export async function getEmergencyContacts() {
  return {
    police: '100',
    fire: '101',
    ambulance: '108',
    women: '1091',
    child: '1098',
    disaster: '108',
    tourist: '1363',
    railway: '139'
  };
}