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
import SymptomChecker from "./pages/SymptomChecker";
import FeaturePlaceholder from "./components/FeaturePlaceholder";
import NotFound from "./pages/NotFound";
import AirQuality from "./pages/AirQuality";
import MentalWellness from "./pages/MentalWellness";
import NutritionCoach from "./pages/NutritionCoach";
import EmergencySOS from "./pages/EmergencySOS";
import PublicHealthAlerts from "./pages/PublicHealthAlerts";
import LabAnalyzer from "./pages/LabAnalyzer";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import ReproductiveHealth from "./pages/ReproductiveHealth";
import MaternalHealth from "./pages/MaternalHealth";
import YouthHealth from "./pages/YouthHealth";
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
  Users,
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
          <Route path="/air-quality" element={<AirQuality />} />
          <Route path="/mental-wellness" element={<MentalWellness />} />
          <Route path="/nutrition" element={<NutritionCoach />} />
          <Route path="/emergency" element={<EmergencySOS />} />
          <Route path="/public-health" element={<PublicHealthAlerts />} />
          <Route path="/lab-analyzer" element={<LabAnalyzer />} />
          <Route path="/govt-schemes" element={<GovernmentSchemes />} />
          <Route path="/reproductive-health" element={<ReproductiveHealth />} />
          <Route path="/maternal-health" element={<MaternalHealth />} />
          <Route path="/youth-health" element={<YouthHealth />} />

          {/* Feature placeholder routes */}
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
