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
  Stethoscope,
  BrainCircuit
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
              Healia is India's AI health app with Gemini + real data for women's health, 
              lab analysis, nutrition, youth guidance, SOS, and government aid.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/womens-health">
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

      {/* Features Preview Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Healthcare at Your Fingertips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From AI-powered symptom checking to government scheme assistance, 
              Healia provides complete healthcare solutions tailored for India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Women's Health */}
            <Link to="/womens-health" className="group">
              <div className="bg-gradient-women rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Women's Health</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Comprehensive menstrual, pregnancy, and fertility tracking with government maternity schemes integration.
                </p>
              </div>
            </Link>

            {/* Symptom Checker */}
            <Link to="/symptom-checker" className="group">
              <div className="bg-gradient-health rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Symptom Checker</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Enter symptoms and get AI-powered analysis with ICMR data, risk levels, and nearby hospital recommendations.
                </p>
              </div>
            </Link>

            {/* Mental Wellness */}
            <Link to="/mental-wellness" className="group">
              <div className="bg-gradient-mental rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mental Wellness</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Stress management, journaling, yoga guidance, and connection to mental health helplines.
                </p>
              </div>
            </Link>

            {/* Emergency SOS */}
            <Link to="/emergency" className="group">
              <div className="bg-gradient-emergency rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Emergency SOS</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  One-tap emergency calling to 108/100/1098 with location sharing and first-aid guidance.
                </p>
              </div>
            </Link>

            {/* Lab Analyzer */}
            <Link to="/lab-analyzer" className="group">
              <div className="bg-blue-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lab Report Analyzer</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Upload lab reports and get AI-powered analysis compared with ICMR standards and recommendations.
                </p>
              </div>
            </Link>

            {/* Government Schemes */}
            <Link to="/govt-schemes" className="group">
              <div className="bg-indigo-600 rounded-2xl p-8 text-white transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Govt Schemes</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Discover Ayushman Bharat and state-specific health programs with eligibility guidance.
                </p>
              </div>
            </Link>
          </div>

          {/* View All Features Button */}
          <div className="text-center mt-12">
            <Link to="/womens-health">
              <Button size="lg" className="bg-health-600 hover:bg-health-700 text-white px-8 py-4">
                View All 12 Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">
              Trusted Healthcare Technology
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-health-600" />
                <span>Powered by Google Gemini AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-health-600" />
                <span>ICMR Data Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-health-600" />
                <span>Government Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-health-600" />
                <span>Privacy Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
