import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import PDFReport from "@/components/PDFReport";
import { 
  ArrowLeft, 
  Stethoscope, 
  Mic,
  Search,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Thermometer,
  Brain,
  Heart
} from "lucide-react";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showPDFReport, setShowPDFReport] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const handleGeneratePDF = () => {
    console.log("Generating PDF report for Symptom Analysis...");
    window.print();
  };

  const handleVoiceInput = () => {
    // Simulate voice input
    console.log("Starting voice input...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/features" className="inline-flex items-center gap-2 text-health-600 hover:text-health-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Features
          </Link>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-health rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">AI Symptom Checker</h1>
              <p className="text-gray-600">Get AI-powered health analysis with ICMR data</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="checker" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="checker">Symptom Input</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="hospitals">Nearby Hospitals</TabsTrigger>
            <TabsTrigger value="report">PDF Report</TabsTrigger>
          </TabsList>

          {/* Symptom Input Tab */}
          <TabsContent value="checker" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Symptom Input */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-health-500" />
                    Describe Your Symptoms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      What symptoms are you experiencing?
                    </label>
                    <Textarea
                      placeholder="Describe your symptoms in detail... (e.g., headache for 2 days, fever, nausea)"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="min-h-32"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleAnalyze}
                      disabled={!symptoms.trim() || isAnalyzing}
                      className="bg-health-600 hover:bg-health-700 flex-1"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Stethoscope className="w-4 h-4 mr-2" />
                          Analyze Symptoms
                        </>
                      )}
                    </Button>
                    
                    <Button variant="outline" onClick={handleVoiceInput}>
                      <Mic className="w-4 h-4 mr-2" />
                      Voice Input
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                    <strong>Privacy Notice:</strong> Your symptoms are analyzed using AI and compared 
                    with ICMR medical data. Information is encrypted and not stored permanently.
                  </div>
                </CardContent>
              </Card>

              {/* Quick Symptom Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-500" />
                    Common Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                    onClick={() => setSymptoms("Headache and fever for 2 days")}
                  >
                    <Thermometer className="w-4 h-4 mr-2 text-red-500" />
                    Fever & Pain
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                    onClick={() => setSymptoms("Stomach pain and nausea")}
                  >
                    <Heart className="w-4 h-4 mr-2 text-green-500" />
                    Digestive Issues
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                    onClick={() => setSymptoms("Cough and shortness of breath")}
                  >
                    <Brain className="w-4 h-4 mr-2 text-blue-500" />
                    Respiratory
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                    onClick={() => setSymptoms("Skin rash and itching")}
                  >
                    <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                    Skin Conditions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            {!analysisComplete ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 bg-health-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-health-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Enter symptoms to get AI analysis</h3>
                  <p className="text-gray-600">Go to Symptom Input tab to describe your symptoms</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Analysis Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      AI Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Moderate Risk Level</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Based on ICMR data analysis, your symptoms suggest possible viral infection.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Possible Conditions:</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm">Viral Fever</span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">75% match</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm">Common Cold</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">60% match</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-sm">Stress Headache</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">45% match</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-health-600" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="font-medium text-sm">Immediate Actions</p>
                          <p className="text-xs text-gray-600">Rest, hydration, monitor temperature</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                        <div>
                          <p className="font-medium text-sm">Monitor Symptoms</p>
                          <p className="text-xs text-gray-600">Track fever, headache intensity for 24-48 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-600 mt-1" />
                        <div>
                          <p className="font-medium text-sm">Seek Medical Care If</p>
                          <p className="text-xs text-gray-600">Fever &gt;101°F, severe headache, difficulty breathing</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-health-50 border border-health-200 rounded-lg p-4">
                      <h5 className="font-medium text-health-800 mb-2">Next Steps</h5>
                      <ul className="text-sm text-health-700 space-y-1">
                        <li>• Consult doctor if symptoms worsen</li>
                        <li>• Take prescribed medications only</li>
                        <li>• Maintain symptom diary</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Nearby Hospitals Tab */}
          <TabsContent value="hospitals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-health-600" />
                  Nearby Healthcare Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Apollo Hospital", distance: "2.3 km", type: "Multi-specialty", phone: "+91-11-12345678" },
                    { name: "AIIMS Delhi", distance: "4.1 km", type: "Government", phone: "+91-11-26588500" },
                    { name: "Max Hospital", distance: "3.7 km", type: "Private", phone: "+91-11-26925858" }
                  ].map((hospital, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{hospital.name}</h4>
                        <p className="text-sm text-gray-600">{hospital.type} • {hospital.distance}</p>
                      </div>
                      <div className="text-right">
                        <Button size="sm" variant="outline">
                          Call {hospital.phone}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PDF Report Tab */}
          <TabsContent value="report">
            <PDFReport
              reportType="symptom-analysis"
              patientName="User"
              reportData={{
                symptoms,
                analysis: analysisComplete ? "Completed" : "Pending",
                riskLevel: "moderate"
              }}
              onGeneratePDF={handleGeneratePDF}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
