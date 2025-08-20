import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import WomensHealth from "./pages/WomensHealth";
import FeaturePlaceholder from "./components/FeaturePlaceholder";
import NotFound from "./pages/NotFound";
import {
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
  Users
} from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/womens-health" element={<WomensHealth />} />

          {/* Feature placeholder routes */}
          <Route
            path="/symptom-checker"
            element={
              <FeaturePlaceholder
                title="AI Symptom Checker"
                description="Enter symptoms and get AI-powered analysis with ICMR data, risk levels, and nearby hospital recommendations."
                icon={<Stethoscope className="w-10 h-10 text-white" />}
              />
            }
          />
          <Route
            path="/reproductive-health"
            element={
              <FeaturePlaceholder
                title="Reproductive Health & PCOS Support"
                description="Track cycles, PCOS symptoms, hormone-related issues with AI-backed lifestyle guidance and government program connections."
                icon={<Heart className="w-10 h-10 text-white" />}
              />
            }
          />
          <Route
            path="/maternal-health"
            element={
              <FeaturePlaceholder
                title="Maternal Health & Postpartum Care"
                description="Nutrition, vaccination reminders, safe delivery guidelines, post-pregnancy support, and maternal government schemes."
                icon={<Baby className="w-10 h-10 text-white" />}
              />
            }
          />
          <Route
            path="/lab-analyzer"
            element={
              <FeaturePlaceholder
                title="Lab Report Analyzer"
                description="Upload lab reports and get AI-powered analysis compared with ICMR standards and doctor-style explanations."
                icon={<Activity className="w-10 h-10 text-white" />}
              />
            }
          />
          <Route
            path="/mental-wellness"
            element={
              <FeaturePlaceholder
                title="Mental Wellness"
                description="Journaling, stress checks, yoga guidance, and connection to mental health helplines like NIMHANS."
                icon={<BrainCircuit className="w-10 h-10 text-white" />}
              />
            }
          />
          <Route
            path="/nutrition"
            element={
              <FeaturePlaceholder
                title="Nutrition & Lifestyle Coach"
                description="Personalized diet plans with Indian food, yoga guidance, hydration alerts, and budget-friendly recipes."
                icon={<Apple className="w-10 h-10 text-white" />}
              />
            }
          />
          <Route
            path="/youth-health"
            element={
              <FeaturePlaceholder
                title="Youth Health"
                description="Study-sleep balance, screen detox guidance, exam stress toolkit, and healthy lifestyle habits for students."
                icon={<GraduationCap className="w-10 h-10 text-white" />}
              />
            }
          />
          <Route
            path="/air-quality"
            element={
              <FeaturePlaceholder
                title="Air Quality + Weather"
                description="Real-time AQI data from CPCB, weather from IMD, and outdoor safety advice based on air quality."
                icon={<Wind className="w-10 h-10 text-white" />}
              />
            }
          />
          <Route
            path="/public-health"
            element={
              <FeaturePlaceholder
                title="Public Health Alerts"
                description="Local outbreak alerts, vaccination notifications, and public health updates from government sources."
                icon={<Megaphone className="w-10 h-10 text-white" />}
              />
            }
          />
          <Route
            path="/emergency"
            element={
              <FeaturePlaceholder
                title="Emergency SOS"
                description="One-tap emergency calling to 108/100/1098, live location sharing, and first-aid guidance."
                icon={<Shield className="w-10 h-10 text-white" />}
              />
            }
          />
          <Route
            path="/govt-schemes"
            element={
              <FeaturePlaceholder
                title="Government Schemes & Aid"
                description="Discover Ayushman Bharat and state-specific health programs with eligibility guides based on your location and income."
                icon={<Users className="w-10 h-10 text-white" />}
              />
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
