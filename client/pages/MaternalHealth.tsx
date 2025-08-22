import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import PDFReport from "@/components/PDFReport";
import { analyzeMaternalHealth } from "@/lib/gemini";
import { getGovernmentSchemes } from "@/lib/api";
import {
  ArrowLeft,
  Baby,
  Heart,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  Users,
  Pill,
  Loader2,
} from "lucide-react";

export default function MaternalHealth() {
  const [profile, setProfile] = useState({
    pregnancyWeek: "",
    age: "",
    previousPregnancies: "",
    symptoms: [] as string[],
    riskFactors: [] as string[]
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [schemes, setSchemes] = useState<any[]>([]);
  const [error, setError] = useState("");

  const pregnancySymptoms = [
    'Morning sickness',
    'Fatigue',
    'Breast tenderness',
    'Frequent urination',
    'Food cravings',
    'Mood swings',
    'Heartburn',
    'Back pain',
    'Swelling',
    'Shortness of breath'
  ];

  const riskFactors = [
    'High blood pressure',
    'Diabetes',
    'Previous pregnancy complications',
    'Age over 35',
    'Multiple pregnancies',
    'Smoking',
    'Alcohol consumption',
    'Underweight/Overweight'
  ];

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({ ...prev, symptoms: [...prev.symptoms, symptom] }));
    } else {
      setProfile(prev => ({ ...prev, symptoms: prev.symptoms.filter(s => s !== symptom) }));
    }
  };

  const handleRiskFactorChange = (factor: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({ ...prev, riskFactors: [...prev.riskFactors, factor] }));
    } else {
      setProfile(prev => ({ ...prev, riskFactors: prev.riskFactors.filter(r => r !== factor) }));
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError("");
    
    try {
      const result = await analyzeMaternalHealth({
        pregnancyWeek: profile.pregnancyWeek ? parseInt(profile.pregnancyWeek) : undefined,
        symptoms: profile.symptoms,
        previousPregnancies: profile.previousPregnancies ? parseInt(profile.previousPregnancies) : undefined,
        age: profile.age ? parseInt(profile.age) : undefined
      });
      setAnalysisResult(result);

      // Get maternal schemes
      const schemeData = await getGovernmentSchemes({
        age: profile.age ? parseInt(profile.age) : undefined,
        gender: 'female',
        pregnant: true
      });
      setSchemes(schemeData);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze maternal health');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePDF = () => {
    console.log("Generating PDF report for Maternal Health...");
    window.print();
  };

  const getProgressPercentage = () => {
    if (!profile.pregnancyWeek) return 0;
    const week = parseInt(profile.pregnancyWeek);
    return Math.min((week / 40) * 100, 100);
  };

  const getTrimester = () => {
    if (!profile.pregnancyWeek) return '';
    const week = parseInt(profile.pregnancyWeek);
    if (week <= 12) return 'First Trimester';
    if (week <= 28) return 'Second Trimester';
    return 'Third Trimester';
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
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Maternal Health & Postpartum Care
              </h1>
              <p className="text-gray-600">
                Comprehensive pregnancy support with government scheme integration
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="tracking" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="tracking">Pregnancy Tracking</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="schemes">Govt Benefits</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="report">PDF Report</TabsTrigger>
          </TabsList>

          {/* Pregnancy Tracking Tab */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Baby className="w-5 h-5 text-pink-600" />
                    Pregnancy Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Current Week
                      </label>
                      <Input
                        type="number"
                        placeholder="Week (1-40)"
                        value={profile.pregnancyWeek}
                        onChange={(e) => setProfile(prev => ({ ...prev, pregnancyWeek: e.target.value }))}
                        min="1"
                        max="40"
                      />
                    </div>
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
                        Previous Pregnancies
                      </label>
                      <Input
                        type="number"
                        placeholder="Number"
                        value={profile.previousPregnancies}
                        onChange={(e) => setProfile(prev => ({ ...prev, previousPregnancies: e.target.value }))}
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Pregnancy Progress */}
                  {profile.pregnancyWeek && (
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-pink-900">
                          Week {profile.pregnancyWeek} - {getTrimester()}
                        </span>
                        <span className="text-sm text-pink-700">
                          {40 - parseInt(profile.pregnancyWeek)} weeks remaining
                        </span>
                      </div>
                      <Progress value={getProgressPercentage()} className="h-2" />
                    </div>
                  )}

                  {/* Current Symptoms */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Current Symptoms (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {pregnancySymptoms.map((symptom) => (
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

                  {/* Risk Factors */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Risk Factors (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
                      {riskFactors.map((factor) => (
                        <div key={factor} className="flex items-center space-x-2">
                          <Checkbox
                            id={factor}
                            checked={profile.riskFactors.includes(factor)}
                            onCheckedChange={(checked) => handleRiskFactorChange(factor, checked as boolean)}
                          />
                          <label htmlFor={factor} className="text-sm text-gray-700">
                            {factor}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Analyze Button */}
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-pink-600 hover:bg-pink-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Get Maternal Health Analysis'
                    )}
                  </Button>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Pregnancy Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisResult ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600 mb-1">
                          {analysisResult.trimester}
                        </div>
                        <div className="text-sm text-gray-600">Current Stage</div>
                      </div>

                      <div className={`border rounded-lg p-3 ${
                        analysisResult.riskLevel === 'low' ? 'bg-green-50 border-green-200' :
                        analysisResult.riskLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {analysisResult.riskLevel === 'low' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-orange-600" />
                          )}
                          <span className="font-medium">
                            {analysisResult.riskLevel.charAt(0).toUpperCase() + analysisResult.riskLevel.slice(1)} Risk
                          </span>
                        </div>
                        <p className="text-sm">{analysisResult.developmentStage}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Next Checkup</h4>
                        <p className="text-sm text-gray-600">{analysisResult.nextCheckup}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Baby className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600">
                        Enter pregnancy details to see overview
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Nutrition Tab */}
          <TabsContent value="nutrition" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-green-600" />
                    Prenatal Nutrition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisResult?.nutrition ? (
                    <div className="space-y-3">
                      {analysisResult.nutrition.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-green-800">{item}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-green-800">Folic acid 400-800 mcg daily</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-green-800">Iron supplements as prescribed</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-green-800">Calcium-rich foods daily</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Safe Exercises
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisResult?.exercises ? (
                    <div className="space-y-3">
                      {analysisResult.exercises.map((exercise: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <Activity className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-blue-800">{exercise}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Activity className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-blue-800">Prenatal yoga (with instructor)</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Activity className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-blue-800">Walking 20-30 minutes daily</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Activity className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-blue-800">Swimming (if comfortable)</p>
                      </div>
                    </div>
                  )}
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
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-green-800">You're Eligible!</span>
                          </div>
                          <p className="text-sm text-green-700">{scheme.description}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Benefits:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {scheme.benefits.map((benefit: string, index: number) => (
                              <li key={index}>• {benefit}</li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full bg-health-600 hover:bg-health-700">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Discover Maternal Benefits
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Complete your pregnancy information to find eligible government schemes
                  </p>
                  <Button onClick={handleAnalyze} disabled={isAnalyzing}>
                    {isAnalyzing ? 'Analyzing...' : 'Find Benefits'}
                  </Button>
                </div>
              )}
            </div>
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
                      Recommendations
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

                {/* Warning Signs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      Warning Signs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.warningSigns.map((sign: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-red-800">{sign}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Baby className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Analysis Available</h3>
                  <p className="text-gray-600">
                    Complete your pregnancy tracking to get AI-powered maternal health insights.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* PDF Report Tab */}
          <TabsContent value="report">
            <PDFReport
              reportType="maternal-health"
              patientName="User"
              reportData={{
                profile,
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