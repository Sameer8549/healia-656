import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileDown, 
  Calendar, 
  User, 
  MapPin,
  Leaf,
  CheckCircle,
  AlertCircle,
  XCircle,
  TrendingUp,
  Activity,
  Heart
} from "lucide-react";

interface PDFReportProps {
  reportType: "symptom-analysis" | "womens-health" | "lab-analysis" | "mental-wellness" | "nutrition" | "maternal-health" | "reproductive-health" | "govt-schemes";
  patientName?: string;
  reportData: any;
  onGeneratePDF: () => void;
}

interface ReportSection {
  title: string;
  icon: React.ReactNode;
  riskLevel: "low" | "medium" | "high";
  content: string[];
  recommendations: string[];
}

export default function PDFReport({ reportType, patientName = "Patient", reportData, onGeneratePDF }: PDFReportProps) {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long', 
    year: 'numeric'
  });

  const getRiskIcon = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "low":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "medium":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "high":
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getRiskBadge = (level: "low" | "medium" | "high") => {
    const styles = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800", 
      high: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[level]}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)} Risk
      </span>
    );
  };

  // Sample report sections - would be populated with real data
  const getReportSections = (): ReportSection[] => {
    switch (reportType) {
      case "womens-health":
        return [
          {
            title: "Menstrual Cycle Analysis",
            icon: <Heart className="w-5 h-5 text-women-500" />,
            riskLevel: "low",
            content: [
              "Regular 28-day cycle detected",
              "Normal flow duration: 5-6 days",
              "Ovulation patterns are consistent",
              "No irregular bleeding reported"
            ],
            recommendations: [
              "Continue tracking cycle for better insights",
              "Maintain healthy diet rich in iron",
              "Stay hydrated during menstruation",
              "Consider prenatal vitamins if planning pregnancy"
            ]
          },
          {
            title: "Reproductive Health Score",
            icon: <Activity className="w-5 h-5 text-health-500" />,
            riskLevel: "low",
            content: [
              "Overall reproductive health: Excellent (85/100)",
              "Hormone balance: Within normal range",
              "PCOS risk assessment: Low",
              "Fertility indicators: Positive"
            ],
            recommendations: [
              "Annual gynecological check-up recommended",
              "Continue regular exercise routine",
              "Monitor stress levels during ovulation",
              "Consider fertility tracking if trying to conceive"
            ]
          }
        ];
      
      case "symptom-analysis":
        return [
          {
            title: "Symptom Assessment",
            icon: <Activity className="w-5 h-5 text-health-500" />,
            riskLevel: "medium",
            content: [
              "Primary symptoms: Headache, fatigue",
              "Duration: 3 days",
              "Severity: Moderate (6/10)",
              "Associated symptoms: Mild nausea"
            ],
            recommendations: [
              "Monitor symptoms for 24-48 hours",
              "Increase fluid intake",
              "Rest and avoid strenuous activities",
              "Consult doctor if symptoms worsen"
            ]
          }
        ];
      
      default:
        return [
          {
            title: "Health Analysis",
            icon: <Activity className="w-5 h-5 text-health-500" />,
            riskLevel: "low",
            content: [
              "Analysis completed successfully",
              "All parameters within normal range",
              "No immediate concerns identified"
            ],
            recommendations: [
              "Continue current health routine",
              "Regular check-ups recommended",
              "Maintain healthy lifestyle"
            ]
          }
        ];
    }
  };

  const reportSections = getReportSections();

  return (
    <div className="max-w-4xl mx-auto">
      {/* PDF Preview */}
      <Card className="mb-6">
        <CardHeader className="border-b bg-gradient-to-r from-health-50 to-women-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-health rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Healia.AI Health Report</CardTitle>
                <p className="text-sm text-gray-600">AI-Powered Healthcare Analysis</p>
              </div>
            </div>
            <Button onClick={onGeneratePDF} className="bg-health-600 hover:bg-health-700">
              <FileDown className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Report Header */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Patient:</span>
                <span>{patientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Date:</span>
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="font-medium">Location:</span>
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Report Sections */}
          <div className="space-y-8">
            {reportSections.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {section.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  </div>
                  {getRiskBadge(section.riskLevel)}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Analysis */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-health-600" />
                      Analysis
                    </h4>
                    <ul className="space-y-2">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-health-600 rounded-full mt-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      {getRiskIcon(section.riskLevel)}
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {section.recommendations.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-women-600 rounded-full mt-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Disclaimer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">AI Analysis Disclaimer</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                This report is generated using AI analysis based on ICMR data and should be used for 
                informational purposes only. It is not a substitute for professional medical advice, 
                diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.
              </p>
            </div>
          </div>

          {/* Government Schemes (if applicable) */}
          {(reportType === "womens-health" || reportType === "maternal-health" || reportType === "govt-schemes") && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Applicable Government Schemes</h4>
              <div className="text-sm text-green-800 space-y-1">
                <p>• Pradhan Mantri Matru Vandana Yojana (PMMVY) - ₹5,000 benefit</p>
                <p>• Janani Suraksha Yojana (JSY) - Safe delivery support</p>
                <p>• Ayushman Bharat - Health insurance coverage</p>
              </div>
            </div>
          )}

          {/* Report Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-2">
              <span>✅ Healia Verified</span>
              <span>•</span>
              <span>Built by Abdul Sameer</span>
              <span>•</span>
              <span>Powered by Gemini + Indian Data</span>
            </div>
            <p className="text-xs text-gray-500">
              Report generated on {currentDate} • Healia.AI Healthcare Platform
            </p>
          </div>
        </CardContent>
      </Card>

      {/* PDF Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onGeneratePDF} size="lg" className="bg-health-600 hover:bg-health-700">
          <FileDown className="w-5 h-5 mr-2" />
          Download PDF Report
        </Button>
        <Button variant="outline" size="lg">
          Share with Doctor
        </Button>
        <Button variant="outline" size="lg">
          Save to Health Records
        </Button>
      </div>
    </div>
  );
}
