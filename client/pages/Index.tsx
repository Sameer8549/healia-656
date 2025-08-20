import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { 
  Heart, 
  Activity, 
  Dna, 
  Shield, 
  Clock, 
  CheckCircle,
  Sparkles,
  Users,
  BrainCircuit,
  Globe,
  Award,
  Zap,
  Phone,
  MapPin,
  Languages
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 animate-float">
            <Activity className="w-8 h-8 text-white/30" />
          </div>
          <div className="absolute top-32 right-16 animate-float delay-1000">
            <Heart className="w-12 h-12 text-white/20" />
          </div>
          <div className="absolute bottom-32 left-20 animate-float delay-2000">
            <Dna className="w-10 h-10 text-white/25" />
          </div>
          <div className="absolute top-40 left-1/2 animate-float delay-500">
            <Sparkles className="w-6 h-6 text-white/30" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center animate-fade-in">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="block">Revolutionary AI Healthcare</span>
              <span className="block bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                Platform for India
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              Healia is India's first comprehensive AI health platform powered by Gemini, 
              providing personalized healthcare insights, government scheme assistance, 
              and 24/7 emergency support for every Indian family.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/features">
                <Button 
                  size="lg" 
                  className="bg-white text-health-600 hover:bg-gray-50 text-lg px-8 py-4 h-auto"
                >
                  Explore All Features
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 h-auto"
              >
                Get Support
              </Button>
            </div>

            {/* Footer Highlights */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Gemini AI Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-300" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span>24/7 Emergency Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Healia Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Healia.AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for India's diverse healthcare needs, combining cutting-edge AI 
              with local medical data and government healthcare schemes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI-Powered */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-health rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BrainCircuit className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Google Gemini AI analyzes your health data against ICMR standards and provides 
                personalized recommendations based on Indian medical research.
              </p>
            </div>

            {/* Government Integration */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Government Schemes</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatic eligibility checking for Ayushman Bharat, PMMVY, JSY, and 100+ 
                state-specific health programs with step-by-step application guidance.
              </p>
            </div>

            {/* Women's Health Focus */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-women rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Women's Health Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive reproductive health tracking, PCOS support, maternal care, 
                and postpartum guidance tailored for Indian women.
              </p>
            </div>

            {/* Emergency Ready */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-emergency rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Ready</h3>
              <p className="text-gray-600 leading-relaxed">
                One-tap SOS calling to 108/100/1098 with automatic location sharing 
                and real-time first-aid guidance for critical situations.
              </p>
            </div>

            {/* Multi-language */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Languages className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Language Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Available in 10 Indian languages including Hindi, Bengali, Telugu, Tamil, 
                and regional languages for better accessibility across India.
              </p>
            </div>

            {/* Real-time Data */}
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Data</h3>
              <p className="text-gray-600 leading-relaxed">
                Live air quality (CPCB), weather (IMD), public health alerts, and outbreak 
                notifications to keep you informed and safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Data Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powered by Trusted Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use only verified data sources and cutting-edge technology to ensure 
              accurate, reliable healthcare information for Indian families.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BrainCircuit className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Google Gemini AI</h4>
              <p className="text-sm text-gray-600">Advanced AI for medical analysis</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">ICMR Data</h4>
              <p className="text-sm text-gray-600">Indian medical research standards</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">MoHFW Integration</h4>
              <p className="text-sm text-gray-600">Ministry of Health data</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Live Location Data</h4>
              <p className="text-sm text-gray-600">Real-time environmental data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Health Data is Secure
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              We follow international privacy standards and Indian data protection laws 
              to keep your personal health information completely secure.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-health-600" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-health-600" />
              <span>End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-health-600" />
              <span>Government Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-health-600" />
              <span>Data Localization Compliant</span>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-16 text-center bg-gradient-to-r from-health-50 to-women-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help Getting Started?</h3>
            <p className="text-gray-600 mb-6">
              Our support team is available 24/7 to help you navigate Healia.AI 
              and make the most of your healthcare journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-health-600 hover:bg-health-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Call Support
              </Button>
              <Link to="/features">
                <Button variant="outline">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
