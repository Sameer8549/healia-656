import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import PDFReport from "@/components/PDFReport";
import { analyzeReproductiveHealth } from "@/lib/gemini";
import {
  ArrowLeft,
  Heart,
  Activity,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Loader2,
} from "lucide-react";

export default function ReproductiveHealth() {
  const [profile, setProfile] = useState({
    age: "",
    cycleHistory: "",
    concerns: [] as string[],
    symptoms: [] as string[]
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState("");

  const commonSymptoms = [
    'Irregular periods',
    'Heavy bleeding',
    'Painful periods',
    'Missed periods',
    'Spotting between periods',
    'Excessive hair growth',
    'Acne',
    'Weight gain',
    'Mood changes',
    'Fatigue'
  ];

  const commonConcerns = [
    'PCOS symptoms',
    'Fertility issues',
    'Hormone imbalance',
    'Pregnancy planning',
    'Contraception advice',
    'Menopause symptoms',
    'Endometriosis',
    'Ovarian cysts'
  ];

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({ ...prev, symptoms: [...prev.symptoms, symptom] }));
    } else {
      setProfile(prev => ({ ...prev, symptoms: prev.symptoms.filter(s => s !== symptom) }));
    }
  };

  const handleConcernChange = (concern: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({ ...prev, concerns: [...prev.concerns, concern] }));
    } else {
      setProfile(prev => ({ ...prev, concerns: prev.concerns.filter(c => c !== concern) }));
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError("");
    
    try {
      const result = await analyzeReproductiveHealth({
        age: profile.age ? parseInt(profile.age) : undefined,
        symptoms: profile.symptoms,
        cycleHistory: profile.cycleHistory,
        concerns: profile.concerns
      });
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze reproductive health');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePDF = () => {
    console.log("Generating PDF report for Reproductive Health...");
    window.print();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
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
            <div className="w-12 h-12 bg-gradient-women rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Reproductive Health & PCOS Support
              </h1>
              <p className="text-gray-600">
                Track cycles, PCOS symptoms, and get AI-backed lifestyle guidance
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="assessment" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="tracking">Cycle Tracking</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="report">PDF Report</TabsTrigger>
          </TabsList>

          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-women-600" />
                    Reproductive Health Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Age
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter age"
                        value={profile.age}
                        onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Cycle History
                      </label>
                      <Select value={profile.cycleHistory} onValueChange={(value) => setProfile(prev => ({ ...prev, cycleHistory: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cycle pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular (21-35 days)</SelectItem>
                          <SelectItem value="irregular">Irregular</SelectItem>
                          <SelectItem value="absent">Absent periods</SelectItem>
                          <SelectItem value="heavy">Heavy periods</SelectItem>
                          <SelectItem value="light">Light periods</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Current Symptoms (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {commonSymptoms.map((symptom) => (
                        <div key={symptom} className="flex items-center space-x-2">
                          <Checkbox
                            id={symptom}
                            checked={profile.symptoms.includes(symptom)}
                            onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                          />
                          <label htmlFor={symptom} className="text-sm text-gray-700">
                            {symptom}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Concerns */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Health Concerns (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                      {commonConcerns.map((concern) => (
                        <div key={concern} className="flex items-center space-x-2">
                          <Checkbox
                            id={concern}
                            checked={profile.concerns.includes(concern)}
                            onCheckedChange={(checked) => handleConcernChange(concern, checked as boolean)}
                          />
                          <label htmlFor={concern} className="text-sm text-gray-700">
                            {concern}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Analyze Button */}
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-women-600 hover:bg-women-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Get AI Analysis'
                    )}
                  </Button>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-health-600" />
                    Health Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisResult ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-women-600 mb-2">
                          {analysisResult.fertilityScore}/100
                        </div>
                        <div className="text-sm text-gray-600">Fertility Score</div>
                      </div>

                      <div className={`border rounded-lg p-3 ${getRiskColor(analysisResult.pcosRisk)}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {analysisResult.pcosRisk === 'low' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <AlertCircle className="w-4 h-4" />
                          )}
                          <span className="font-medium">PCOS Risk: {analysisResult.pcosRisk}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Hormone Balance</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            analysisResult.hormoneBalance === 'balanced' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {analysisResult.hormoneBalance}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600">
                        Complete assessment to see your health overview
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cycle Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-women-600" />
                  Cycle Tracking Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Cycle Tracking Coming Soon</h3>
                  <p className="text-gray-600 mb-4">
                    Interactive calendar for tracking periods, symptoms, and fertility windows.
                  </p>
                  <Button variant="outline">Set Up Tracking</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            {analysisResult ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-green-800">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Lifestyle Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Lifestyle Guidance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.lifestyle.map((tip: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-blue-800">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Red Flags */}
                {analysisResult.redFlags && analysisResult.redFlags.length > 0 && (
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        Warning Signs to Monitor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {analysisResult.redFlags.map((flag: string, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                            <p className="text-sm text-red-800">{flag}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Follow-up */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Follow-up Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">Next Steps</h4>
                      <p className="text-sm text-purple-800">
                        Recommended follow-up: {analysisResult.followUp}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Analysis Available</h3>
                  <p className="text-gray-600">
                    Complete the assessment to get AI-powered reproductive health insights.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PDF Report Tab */}
          <TabsContent value="report">
            <PDFReport
              reportType="reproductive-health"
              patientName="User"
              reportData={{
                profile,
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