import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Stethoscope, 
  Heart, 
  Baby, 
  Activity, 
  BrainCircuit, 
  Apple, 
  GraduationCap, 
  Wind, 
  Megaphone, 
  Shield, 
  Users,
  FileText,
  ArrowRight,
  Star
} from "lucide-react";

const features = [
  {
    id: "symptom-checker",
    name: "AI Symptom Checker",
    description: "Enter symptoms and get AI-powered analysis with ICMR data, risk levels, and nearby hospital recommendations.",
    icon: Stethoscope,
    gradient: "bg-gradient-health",
    path: "/symptom-checker",
    category: "Diagnosis",
    hasPDFReport: true
  },
  {
    id: "womens-health", 
    name: "Women's Health",
    description: "Comprehensive menstrual, pregnancy, and fertility tracking with government maternity schemes integration.",
    icon: Heart,
    gradient: "bg-gradient-women",
    path: "/womens-health",
    category: "Women's Care",
    hasPDFReport: true
  },
  {
    id: "reproductive-health",
    name: "Reproductive Health & PCOS",
    description: "Track cycles, PCOS symptoms, hormone-related issues with AI-backed lifestyle guidance and government program connections.",
    icon: Heart,
    gradient: "bg-gradient-women",
    path: "/reproductive-health", 
    category: "Women's Care",
    hasPDFReport: true
  },
  {
    id: "maternal-health",
    name: "Maternal Health & Postpartum",
    description: "Nutrition, vaccination reminders, safe delivery guidelines, post-pregnancy support, and maternal government schemes.",
    icon: Baby,
    gradient: "bg-pink-600",
    path: "/maternal-health",
    category: "Maternal Care",
    hasPDFReport: true
  },
  {
    id: "lab-analyzer",
    name: "Lab Report Analyzer", 
    description: "Upload lab reports and get AI-powered analysis compared with ICMR standards and doctor-style explanations.",
    icon: Activity,
    gradient: "bg-blue-600",
    path: "/lab-analyzer",
    category: "Analysis",
    hasPDFReport: true
  },
  {
    id: "mental-wellness",
    name: "Mental Wellness",
    description: "Journaling, stress checks, yoga guidance, and connection to mental health helplines like NIMHANS.",
    icon: BrainCircuit,
    gradient: "bg-gradient-mental",
    path: "/mental-wellness",
    category: "Mental Health",
    hasPDFReport: true
  },
  {
    id: "nutrition",
    name: "Nutrition & Lifestyle Coach",
    description: "Personalized diet plans with Indian food, yoga guidance, hydration alerts, and budget-friendly recipes.",
    icon: Apple,
    gradient: "bg-green-600",
    path: "/nutrition",
    category: "Lifestyle",
    hasPDFReport: true
  },
  {
    id: "youth-health",
    name: "Youth Health",
    description: "Study-sleep balance, screen detox guidance, exam stress toolkit, and healthy lifestyle habits for students.",
    icon: GraduationCap,
    gradient: "bg-indigo-600",
    path: "/youth-health",
    category: "Youth Care",
    hasPDFReport: false
  },
  {
    id: "air-quality",
    name: "Air Quality + Weather",
    description: "Real-time AQI data from CPCB, weather from IMD, and outdoor safety advice based on air quality.",
    icon: Wind,
    gradient: "bg-teal-600",
    path: "/air-quality",
    category: "Environment",
    hasPDFReport: false
  },
  {
    id: "public-health",
    name: "Public Health Alerts",
    description: "Local outbreak alerts, vaccination notifications, and public health updates from government sources.",
    icon: Megaphone,
    gradient: "bg-orange-600",
    path: "/public-health",
    category: "Public Health",
    hasPDFReport: false
  },
  {
    id: "emergency",
    name: "Emergency SOS",
    description: "One-tap emergency calling to 108/100/1098, live location sharing, and first-aid guidance.",
    icon: Shield,
    gradient: "bg-gradient-emergency",
    path: "/emergency",
    category: "Emergency",
    hasPDFReport: false
  },
  {
    id: "govt-schemes",
    name: "Government Schemes & Aid",
    description: "Discover Ayushman Bharat and state-specific health programs with eligibility guides based on your location and income.",
    icon: Users,
    gradient: "bg-purple-600",
    path: "/govt-schemes",
    category: "Government",
    hasPDFReport: true
  }
];

const categories = [
  { name: "All Features", count: features.length },
  { name: "Women's Care", count: features.filter(f => f.category === "Women's Care").length },
  { name: "Diagnosis", count: features.filter(f => f.category === "Diagnosis").length },
  { name: "Analysis", count: features.filter(f => f.category === "Analysis").length },
  { name: "Mental Health", count: features.filter(f => f.category === "Mental Health").length },
  { name: "Emergency", count: features.filter(f => f.category === "Emergency").length },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-health-600 hover:text-health-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Healthcare Features
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive AI-powered healthcare solutions tailored for India's diverse health needs.
              From women's health to emergency care, everything you need in one platform.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-health-600 mb-2">12</div>
              <div className="text-sm text-gray-600">Total Features</div>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-women-600 mb-2">8</div>
              <div className="text-sm text-gray-600">PDF Reports</div>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">AI Support</div>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-sm text-gray-600">Govt Schemes</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Link key={feature.id} to={feature.path} className="group">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  {/* Feature Header */}
                  <div className={`${feature.gradient} p-6 text-white relative`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      {feature.hasPDFReport && (
                        <div className="flex items-center gap-1 bg-white/20 rounded-full px-2 py-1 text-xs">
                          <FileText className="w-3 h-3" />
                          <span>PDF Report</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                    <div className="text-xs bg-white/20 rounded-full px-2 py-1 inline-block">
                      {feature.category}
                    </div>
                  </div>

                  {/* Feature Content */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>AI Powered</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-health-600 text-sm font-medium group-hover:gap-2 transition-all">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-hero rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Health Journey?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Indians who trust Healia.AI for their healthcare needs. 
            Get personalized insights, government scheme assistance, and 24/7 emergency support.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/womens-health">
              <Button size="lg" className="bg-white text-health-600 hover:bg-gray-50 px-8 py-4">
                Start with Women's Health
              </Button>
            </Link>
            <Link to="/emergency">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4">
                Setup Emergency SOS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
