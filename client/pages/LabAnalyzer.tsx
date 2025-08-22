import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import PDFReport from "@/components/PDFReport";
import { analyzeLabReport } from "@/lib/gemini";
import {
  ArrowLeft,
  Activity,
  Upload,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  Camera,
} from "lucide-react";

export default function LabAnalyzer() {
  const [reportText, setReportText] = useState("");
  const [patientName, setPatientName] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!reportText.trim()) {
      setError("Please enter lab report data");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    
    try {
      const result = await analyzeLabReport(reportText);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze lab report');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setReportText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleGeneratePDF = () => {
    console.log("Generating PDF report for Lab Analysis...");
    window.print();
  };

  const sampleReport = `COMPLETE BLOOD COUNT (CBC)
Date: ${new Date().toLocaleDateString()}
Patient: Sample Patient

Hemoglobin: 12.5 g/dL (Normal: 12.0-15.5)
RBC Count: 4.2 million/μL (Normal: 4.0-5.2)
WBC Count: 7,500/μL (Normal: 4,000-11,000)
Platelet Count: 250,000/μL (Normal: 150,000-450,000)
Hematocrit: 38% (Normal: 36-46%)

LIPID PROFILE
Total Cholesterol: 180 mg/dL (Normal: <200)
HDL Cholesterol: 45 mg/dL (Normal: >40)
LDL Cholesterol: 110 mg/dL (Normal: <100)
Triglycerides: 120 mg/dL (Normal: <150)

LIVER FUNCTION TESTS
SGPT/ALT: 25 U/L (Normal: 7-56)
SGOT/AST: 30 U/L (Normal: 10-40)
Bilirubin Total: 0.8 mg/dL (Normal: 0.3-1.2)`;

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'fair': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'poor': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Lab Report Analyzer
              </h1>
              <p className="text-gray-600">
                AI-powered analysis with ICMR standards and doctor-style explanations
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl">
            <TabsTrigger value="upload">Upload Report</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="report">PDF Report</TabsTrigger>
          </TabsList>

          {/* Upload Report Tab */}
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-600" />
                    Upload Lab Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Patient Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Patient Name (optional)
                      </label>
                      <Input
                        placeholder="Enter patient name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Report Date (optional)
                      </label>
                      <Input
                        type="date"
                        value={reportDate}
                        onChange={(e) => setReportDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Upload Options */}
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1" onClick={() => document.getElementById('file-upload')?.click()}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload File
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Text Input */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Or paste your lab report data here:
                    </label>
                    <Textarea
                      placeholder="Paste your lab report values here... (e.g., Hemoglobin: 12.5 g/dL, Cholesterol: 180 mg/dL)"
                      value={reportText}
                      onChange={(e) => setReportText(e.target.value)}
                      className="min-h-48"
                    />
                  </div>

                  {/* Sample Report Button */}
                  <Button
                    variant="outline"
                    onClick={() => setReportText(sampleReport)}
                    className="w-full"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Use Sample Report
                  </Button>

                  {/* Analyze Button */}
                  <Button
                    onClick={handleAnalyze}
                    disabled={!reportText.trim() || isAnalyzing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing Report...
                      </>
                    ) : (
                      <>
                        <Activity className="w-4 h-4 mr-2" />
                        Analyze Lab Report
                      </>
                    )}
                  </Button>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    How to Use
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
                      <p className="text-sm text-gray-700">Upload your lab report file or paste the text</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
                      <p className="text-sm text-gray-700">Our AI will analyze against ICMR standards</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                      <p className="text-sm text-gray-700">Get detailed explanations and recommendations</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">4</div>
                      <p className="text-sm text-gray-700">Download PDF report to share with doctors</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <h4 className="font-medium text-yellow-800 mb-2">Supported Formats</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Text files (.txt)</li>
                      <li>• PDF documents</li>
                      <li>• Word documents</li>
                      <li>• Direct text input</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analysis Results Tab */}
          <TabsContent value="analysis" className="space-y-6">
            {analysisResult ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overall Health */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getHealthIcon(analysisResult.overallHealth)}
                      Overall Health Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`border rounded-lg p-4 ${getHealthColor(analysisResult.overallHealth)}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {getHealthIcon(analysisResult.overallHealth)}
                        <span className="font-medium capitalize">
                          {analysisResult.overallHealth} Health Status
                        </span>
                      </div>
                      <p className="text-sm">{analysisResult.summary}</p>
                    </div>

                    {analysisResult.followUpNeeded && (
                      <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="font-medium text-orange-800">Follow-up Recommended</span>
                        </div>
                        <p className="text-sm text-orange-700">
                          Please consult with your healthcare provider to discuss these results.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Abnormal Values */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-red-600" />
                      Abnormal Values
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysisResult.abnormalValues && analysisResult.abnormalValues.length > 0 ? (
                      <div className="space-y-3">
                        {analysisResult.abnormalValues.map((value: any, index: number) => (
                          <div key={index} className="border rounded-lg p-3 bg-red-50 border-red-200">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-red-900">{value.parameter}</span>
                              <span className="text-sm text-red-700">
                                {value.value} (Normal: {value.normal})
                              </span>
                            </div>
                            <p className="text-sm text-red-800">{value.significance}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                          All Values Normal
                        </h3>
                        <p className="text-green-700">
                          No abnormal values detected in your lab report.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-health-600" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Health Recommendations</h4>
                        <ul className="space-y-2">
                          {analysisResult.recommendations.map((rec: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {analysisResult.riskFactors && analysisResult.riskFactors.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Risk Factors to Monitor</h4>
                          <ul className="space-y-2">
                            {analysisResult.riskFactors.map((risk: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                                <AlertCircle className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Analysis Available
                  </h3>
                  <p className="text-gray-600">
                    Upload a lab report to get AI-powered analysis and insights.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PDF Report Tab */}
          <TabsContent value="report">
            <PDFReport
              reportType="lab-analysis"
              patientName={patientName || "Patient"}
              reportData={{
                reportText,
                reportDate,
                analysis: analysisResult
              }}
              onGeneratePDF={handleGeneratePDF}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}