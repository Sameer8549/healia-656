import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import PDFReport from "@/components/PDFReport";
import { analyzeSymptoms } from "@/lib/gemini";
import { findNearbyHospitals } from "@/lib/api";
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
  Heart,
  Loader2,
} from "lucide-react";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    setError("");
    
    try {
      const result = await analyzeSymptoms(
        symptoms, 
        age ? parseInt(age) : undefined, 
        gender || undefined
      );
      setAnalysisResult(result);
      setAnalysisComplete(true);
      
      // Fetch nearby hospitals
      const hospitalData = await findNearbyHospitals();
      setHospitals(hospitalData);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze symptoms');
    } finally {
      setIsAnalyzing(false);
    }
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
          <Link
            to="/features"
            className="inline-flex items-center gap-2 text-health-600 hover:text-health-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Features
          </Link>

          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-health rounded-xl flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                AI Symptom Checker
              </h1>
              <p className="text-gray-600">
                Get AI-powered health analysis with ICMR data
              </p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Age (optional)
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Gender (optional)
                      </label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

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
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                    <strong>Privacy Notice:</strong> Your symptoms are analyzed
                    using Gemini AI and compared with medical data. Information is
                    encrypted and not stored permanently.
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
            {!analysisComplete || !analysisResult ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 bg-health-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-health-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {isAnalyzing ? 'Analyzing symptoms...' : 'Enter symptoms to get AI analysis'}
                  </h3>
                  <p className="text-gray-600">
                    {isAnalyzing ? 'Please wait while we analyze your symptoms using Gemini AI' : 'Go to Symptom Input tab to describe your symptoms'}
                  </p>
                  {isAnalyzing && (
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mt-4 text-health-600" />
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Analysis Results */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {analysisResult.riskLevel === 'low' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : analysisResult.riskLevel === 'medium' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      AI Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`border rounded-lg p-4 ${
                      analysisResult.riskLevel === 'low' ? 'bg-green-50 border-green-200' :
                      analysisResult.riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {analysisResult.riskLevel === 'low' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : analysisResult.riskLevel === 'medium' ? (
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className="font-medium text-yellow-800">
                          {analysisResult.riskLevel.charAt(0).toUpperCase() + analysisResult.riskLevel.slice(1)} Risk Level
                        </span>
                      </div>
                      <p className={`text-sm ${
                        analysisResult.riskLevel === 'low' ? 'text-green-700' :
                        analysisResult.riskLevel === 'medium' ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                        {analysisResult.summary}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Possible Conditions:</h4>
                      <div className="space-y-2">
                        {analysisResult.possibleConditions.map((condition: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                            <div>
                              <span className="text-sm font-medium">{condition.name}</span>
                              <p className="text-xs text-gray-600">{condition.description}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                              condition.confidence > 70 ? 'bg-red-100 text-red-800' :
                              condition.confidence > 50 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {condition.confidence}% match
                            </span>
                          </div>
                        ))}
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
                      <h4 className="font-medium">Recommendations:</h4>
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                          <p className="text-sm">{rec}</p>
                        </div>
                      ))}
                      
                      <h4 className="font-medium mt-4">Seek Medical Care If:</h4>
                      {analysisResult.seekCareIf.map((symptom: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
                          <p className="text-sm">{symptom}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-health-50 border border-health-200 rounded-lg p-4">
                      <h5 className="font-medium text-health-800 mb-2">
                        Home Care
                      </h5>
                      <ul className="text-sm text-health-700 space-y-1">
                        {analysisResult.homeCare.map((care: string, index: number) => (
                          <li key={index}>• {care}</li>
                        ))}
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
                  {hospitals.map((hospital, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{hospital.name}</h4>
                        <p className="text-sm text-gray-600">
                          {hospital.type} • {hospital.distance}
                        </p>
                        <p className="text-xs text-gray-500">
                          {hospital.specialties.join(', ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`tel:${hospital.phone}`)}
                        >
                          Call
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">
                          {hospital.phone}
                        </p>
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
                age,
                gender,
                analysis: analysisResult,
                hospitals: hospitals.slice(0, 3)
              }}
              onGeneratePDF={handleGeneratePDF}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
