import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X, Leaf } from "lucide-react";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "bn", name: "বাংলা" },
  { code: "te", name: "తెలుగు" },
  { code: "mr", name: "मराठी" },
  { code: "ta", name: "தமிழ்" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
];

export default function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const features = [
    { name: "Symptom Checker", path: "/symptom-checker" },
    { name: "Women's Health", path: "/womens-health" },
    { name: "Reproductive Health", path: "/reproductive-health" },
    { name: "Maternal Health", path: "/maternal-health" },
    { name: "Lab Report Analyzer", path: "/lab-analyzer" },
    { name: "Mental Wellness", path: "/mental-wellness" },
    { name: "Nutrition Coach", path: "/nutrition" },
    { name: "Youth Health", path: "/youth-health" },
    { name: "Air Quality", path: "/air-quality" },
    { name: "Public Health", path: "/public-health" },
    { name: "Emergency SOS", path: "/emergency" },
    { name: "Govt Schemes", path: "/govt-schemes" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-health rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Healia</span>
              <span className="text-xs text-gray-600 block leading-3">Professional Healthcare</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                <span>Features</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 grid grid-cols-2 gap-1 p-2">
                {features.map((feature) => (
                  <DropdownMenuItem key={feature.path} asChild>
                    <Link 
                      to={feature.path}
                      className="text-sm hover:bg-health-50 rounded p-2"
                    >
                      {feature.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                <span className="hidden sm:inline">
                  {languages.find(lang => lang.code === selectedLanguage)?.name}
                </span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((language) => (
                  <DropdownMenuItem 
                    key={language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                  >
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Get Support Button */}
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              Get Support
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 py-3 space-y-1">
              <div className="mb-4">
                <Button variant="outline" size="sm" className="w-full">
                  Get Support
                </Button>
              </div>
              
              <div className="text-sm font-medium text-gray-900 mb-2">Features</div>
              <div className="grid grid-cols-2 gap-2">
                {features.map((feature) => (
                  <Link
                    key={feature.path}
                    to={feature.path}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-health-50 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {feature.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
