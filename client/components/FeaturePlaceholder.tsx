import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { ArrowLeft, Construction } from "lucide-react";

interface FeaturePlaceholderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeaturePlaceholder({ title, description, icon }: FeaturePlaceholderProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-health-600 hover:text-health-700 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-health rounded-2xl flex items-center justify-center">
              {icon}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Construction className="w-6 h-6 text-amber-600" />
                <h3 className="font-semibold text-amber-800">Coming Soon</h3>
              </div>
              <p className="text-amber-700">
                This feature is currently under development. We're working hard to bring you 
                comprehensive healthcare solutions with AI-powered insights and real-time data.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Continue prompting to help us build this feature according to your specific needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" size="lg">
                    Explore Other Features
                  </Button>
                </Link>
                <Button size="lg" className="bg-health-600 hover:bg-health-700">
                  Request Feature Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
