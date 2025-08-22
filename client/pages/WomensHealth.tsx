import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import PDFReport from "@/components/PDFReport";
import { analyzeWomensHealth } from "@/lib/gemini";
import { getGovernmentSchemes } from "@/lib/api";
import {
  ArrowLeft,
  Heart,
  Calendar,
  Baby,
  Activity,
  AlertCircle,
  CheckCircle,
  Info,
  TrendingUp,
  Pill,
  Users,
  Loader2,
} from "lucide-react";

export default function WomensHealth() {
  const [currentCycle, setCurrentCycle] = useState(28);
  const [lastPeriod, setLastPeriod] = useState("2024-01-15");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [error, setError] = useState("");

  const commonSymptoms = [
    'Irregular periods',
    'Heavy bleeding',
    'Cramps',
    'Mood swings',
    'Bloating',
    'Breast tenderness',
    'Fatigue',
    'Headaches'
  ];

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSymptoms([...symptoms, symptom]);
    } else {
      setSymptoms(symptoms.filter(s => s !== symptom));
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError("");
    
    try {
      const result = await analyzeWomensHealth({
        cycleLength: currentCycle,
        lastPeriod,
        symptoms,
        age: age ? parseInt(age) : undefined
      });
      setAnalysisResult(result);
      
      // Get government schemes
      const schemeData = await getGovernmentSchemes({
        age: age ? parseInt(age) : undefined,
        gender: 'female',
        pregnant: symptoms.includes('Pregnancy symptoms')
      });
      setSchemes(schemeData);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze health data');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePDF = () => {
    // In a real app, this would generate and download the PDF
    console.log("Generating PDF report for Women's Health...");
    // For demo, we could trigger browser print or use a PDF library
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-health-600 hover:text-health-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-women rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Women's Health
              </h1>
              <p className="text-gray-600">
                Comprehensive tracking and government scheme integration
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="tracking" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="tracking">Cycle Tracking</TabsTrigger>
            <TabsTrigger value="pregnancy">Pregnancy</TabsTrigger>
            <TabsTrigger value="schemes">Govt Schemes</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="report">PDF Report</TabsTrigger>
          </TabsList>

          {/* Cycle Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Cycle Status */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-women-500" />
                    Menstrual Cycle Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Cycle Length (days)
                        </label>
                        <Input
                          type="number"
                          value={currentCycle}
                          onChange={(e) => setCurrentCycle(parseInt(e.target.value) || 28)}
                          min="21"
                          max="35"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Last Period Date
                        </label>
                        <Input
                          type="date"
                          value={lastPeriod}
                          onChange={(e) => setLastPeriod(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                          Age (optional)
                        </label>
                        <Input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="Enter age"
                        />
                      </div>
                    </div>

                    {/* Symptoms Selection */}
                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-700 mb-3 block">
                        Current Symptoms (select all that apply)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {commonSymptoms.map((symptom) => (
                          <div key={symptom} className="flex items-center space-x-2">
                            <Checkbox
                              id={symptom}
                              checked={symptoms.includes(symptom)}
                              onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                            />
                            <label htmlFor={symptom} className="text-sm text-gray-700">
                              {symptom}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cycle Calendar Visual */}
                    <div className="bg-gradient-women rounded-lg p-6 text-white mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            Current Cycle: Day {Math.floor((new Date().getTime() - new Date(lastPeriod).getTime()) / (1000 * 60 * 60 * 24)) % currentCycle + 1}
                          </h3>
                          <p className="text-white/80">
                            {analysisResult?.fertileWindow || 'Tracking phase'}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {currentCycle - (Math.floor((new Date().getTime() - new Date(lastPeriod).getTime()) / (1000 * 60 * 60 * 24)) % currentCycle)}
                          </div>
                          <div className="text-sm text-white/80">
                            days until next period
                          </div>
                        </div>
                      </div>

                      {/* Cycle Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Period</span>
                          <span>Fertile</span>
                          <span>Ovulation</span>
                          <span>Next Period</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className="bg-white h-2 rounded-full"
                            style={{ 
                              width: `${((Math.floor((new Date().getTime() - new Date(lastPeriod).getTime()) / (1000 * 60 * 60 * 24)) % currentCycle) / currentCycle) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="bg-women-500 hover:bg-women-600"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          'Analyze Health'
                        )}
                      </Button>
                      <Button variant="outline">Add Symptoms</Button>
                    </div>

                    {error && (
                      <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                        {error}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Health Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-health-500" />
                    Health Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisResult ? (
                    <>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                        <div>
                          <p className="font-medium text-sm">Cycle Health</p>
                          <p className="text-xs text-gray-600">
                            {analysisResult.cycleHealth === 'regular' ? 'Regular cycle detected' : 
                             analysisResult.cycleHealth === 'irregular' ? 'Irregular patterns noticed' :
                             'Concerning patterns detected'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-500 mt-1" />
                        <div>
                          <p className="font-medium text-sm">Health Score</p>
                          <p className="text-xs text-gray-600">
                            {analysisResult.healthScore}/100 - {analysisResult.healthScore > 80 ? 'Excellent' : analysisResult.healthScore > 60 ? 'Good' : 'Needs attention'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-women-500 mt-1" />
                        <div>
                          <p className="font-medium text-sm">Next Period</p>
                          <p className="text-xs text-gray-600">
                            {analysisResult.nextPeriod}
                          </p>
                        </div>
                      </div>

                      {analysisResult.insights && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900 mb-2">AI Insights</h4>
                          <ul className="text-sm text-blue-800 space-y-1">
                            {analysisResult.insights.map((insight: string, index: number) => (
                              <li key={index}>• {insight}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-600">
                        Click "Analyze Health" to get AI-powered insights
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pregnancy Tab */}
          <TabsContent value="pregnancy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Baby className="w-5 h-5 text-women-500" />
                    Pregnancy Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-women-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Baby className="w-8 h-8 text-women-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Not Currently Pregnant
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Track your pregnancy journey with AI-powered insights
                    </p>
                    <Button className="bg-women-500 hover:bg-women-600">
                      Start Pregnancy Tracking
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-health-500" />
                    Reproductive Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        PCOS Risk Assessment
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Low Risk
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Fertility Health Score
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        85/100
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Hormone Balance
                      </span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        Monitor
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Take Full Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Government Schemes Tab */}
          <TabsContent value="schemes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schemes.length > 0 ? (
                schemes.map((scheme) => (
                  <Card key={scheme.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-health-500" />
                        {scheme.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className={`border rounded-lg p-4 ${
                          scheme.eligible ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
                        }`}>
                          <div className="flex items-center gap-2 mb-2">
                            {scheme.eligible ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Info className="w-5 h-5 text-blue-600" />
                            )}
                            <span className={`font-medium ${
                              scheme.eligible ? 'text-green-800' : 'text-blue-800'
                            }`}>
                              {scheme.eligible ? "You're Eligible!" : "Check Eligibility"}
                            </span>
                          </div>
                          <p className={`text-sm ${
                            scheme.eligible ? 'text-green-700' : 'text-blue-700'
                          }`}>
                            {scheme.description}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Benefits:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {scheme.benefits.map((benefit: string, index: number) => (
                              <li key={index}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Required Documents:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {scheme.documents.map((doc: string, index: number) => (
                              <li key={index}>• {doc}</li>
                            ))}
                          </ul>
                        </div>

                        <Button className={`w-full ${
                          scheme.eligible ? 'bg-health-600 hover:bg-health-700' : ''
                        }`} variant={scheme.eligible ? 'default' : 'outline'}>
                          {scheme.eligible ? 'Apply Now' : 'Check Eligibility'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Schemes Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Complete your health analysis to discover eligible government schemes
                  </p>
                  <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Health Data'}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-health-500" />
                  AI-Powered Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-health-50 to-women-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3">
                      {analysisResult ? "AI Health Analysis" : "Complete Analysis for Insights"}
                    </h3>
                    {analysisResult ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-health-600 mb-1">
                            {analysisResult.cycleHealth === 'regular' ? '92%' : 
                             analysisResult.cycleHealth === 'irregular' ? '65%' : '40%'}
                          </div>
                          <div className="text-sm text-gray-600">
                            Cycle Regularity
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-women-600 mb-1">
                            {(analysisResult.healthScore / 10).toFixed(1)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Wellness Score
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {analysisResult.riskFactors?.length || 0 === 0 ? 'Low' : 
                             analysisResult.riskFactors?.length <= 2 ? 'Medium' : 'High'}
                          </div>
                          <div className="text-sm text-gray-600">Health Risk</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-600">
                          Complete your health tracking to see detailed AI analysis
                        </p>
                      </div>
                    )}
                  </div>

                  {analysisResult && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">
                        Personalized Recommendations
                      </h4>

                      <div className="space-y-3">
                        {analysisResult.recommendations.map((rec: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                            <div>
                              <p className="text-sm text-green-700">{rec}</p>
                            </div>
                          </div>
                        ))}

                        {analysisResult.riskFactors && analysisResult.riskFactors.length > 0 && (
                          <>
                            <h5 className="font-medium text-red-800 mt-4">Risk Factors to Monitor:</h5>
                            {analysisResult.riskFactors.map((risk: string, index: number) => (
                              <div key={index} className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-red-600 mt-1" />
                                <div>
                                  <p className="text-sm text-red-700">{risk}</p>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PDF Report Tab */}
          <TabsContent value="report">
            <PDFReport
              reportType="womens-health"
              patientName="User" // In real app, this would come from user data
              reportData={{
                cycleData: { length: currentCycle, lastPeriod, age, symptoms },
                analysis: analysisResult,
                schemes: schemes.filter(s => s.eligible)
              }}
              onGeneratePDF={handleGeneratePDF}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
