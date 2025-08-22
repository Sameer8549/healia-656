import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import { analyzeYouthHealth } from "@/lib/gemini";
import {
  ArrowLeft,
  GraduationCap,
  Brain,
  Moon,
  Smartphone,
  Activity,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Loader2,
} from "lucide-react";

export default function YouthHealth() {
  const [profile, setProfile] = useState({
    age: "",
    studyHours: [6],
    screenTime: [8],
    sleepHours: [7],
    stressLevel: [5],
    concerns: [] as string[]
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState("");

  const youthConcerns = [
    'Academic pressure',
    'Exam stress',
    'Sleep problems',
    'Social anxiety',
    'Screen addiction',
    'Poor concentration',
    'Peer pressure',
    'Body image issues',
    'Time management',
    'Career confusion'
  ];

  const handleConcernChange = (concern: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({ ...prev, concerns: [...prev.concerns, concern] }));
    } else {
      setProfile(prev => ({ ...prev, concerns: prev.concerns.filter(c => c !== concern) }));
    }
  };

  const handleAnalyze = async () => {
    if (!profile.age) {
      setError("Please enter your age");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    
    try {
      const result = await analyzeYouthHealth({
        age: parseInt(profile.age),
        studyHours: profile.studyHours[0],
        screenTime: profile.screenTime[0],
        sleepHours: profile.sleepHours[0],
        stressLevel: profile.stressLevel[0],
        concerns: profile.concerns
      });
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze youth health');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
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
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Youth Health
              </h1>
              <p className="text-gray-600">
                Study-sleep balance, screen detox, and healthy lifestyle for students
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="assessment" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="assessment">Health Assessment</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="tools">Wellness Tools</TabsTrigger>
            <TabsTrigger value="tips">Study Tips</TabsTrigger>
          </TabsList>

          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-indigo-600" />
                    Youth Health Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Age
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter your age"
                      value={profile.age}
                      onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                      min="13"
                      max="25"
                    />
                  </div>

                  {/* Study Hours */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Daily Study Hours: {profile.studyHours[0]} hours
                    </label>
                    <Slider
                      value={profile.studyHours}
                      onValueChange={(value) => setProfile(prev => ({ ...prev, studyHours: value }))}
                      max={16}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 hour</span>
                      <span>16 hours</span>
                    </div>
                  </div>

                  {/* Screen Time */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Daily Screen Time: {profile.screenTime[0]} hours
                    </label>
                    <Slider
                      value={profile.screenTime}
                      onValueChange={(value) => setProfile(prev => ({ ...prev, screenTime: value }))}
                      max={16}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1 hour</span>
                      <span>16 hours</span>
                    </div>
                  </div>

                  {/* Sleep Hours */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Daily Sleep: {profile.sleepHours[0]} hours
                    </label>
                    <Slider
                      value={profile.sleepHours}
                      onValueChange={(value) => setProfile(prev => ({ ...prev, sleepHours: value }))}
                      max={12}
                      min={4}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>4 hours</span>
                      <span>12 hours</span>
                    </div>
                  </div>

                  {/* Stress Level */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Stress Level: {profile.stressLevel[0]}/10
                    </label>
                    <Slider
                      value={profile.stressLevel}
                      onValueChange={(value) => setProfile(prev => ({ ...prev, stressLevel: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Low Stress</span>
                      <span>High Stress</span>
                    </div>
                  </div>

                  {/* Concerns */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Current Concerns (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {youthConcerns.map((concern) => (
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
                    disabled={!profile.age || isAnalyzing}
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Get Health Analysis'
                    )}
                  </Button>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Health Overview */}
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
                        <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisResult.healthScore)}`}>
                          {analysisResult.healthScore}/100
                        </div>
                        <div className="text-sm text-gray-600">Overall Health Score</div>
                      </div>

                      <div className="space-y-3">
                        <div className={`border rounded-lg p-3 ${getRiskColor(analysisResult.sleepQuality)}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Moon className="w-4 h-4" />
                            <span className="font-medium">Sleep Quality</span>
                          </div>
                          <p className="text-sm capitalize">{analysisResult.sleepQuality}</p>
                        </div>

                        <div className={`border rounded-lg p-3 ${getRiskColor(analysisResult.stressLevel)}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Brain className="w-4 h-4" />
                            <span className="font-medium">Stress Level</span>
                          </div>
                          <p className="text-sm capitalize">{analysisResult.stressLevel}</p>
                        </div>

                        <div className={`border rounded-lg p-3 ${getRiskColor(analysisResult.screenTimeRisk)}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <Smartphone className="w-4 h-4" />
                            <span className="font-medium">Screen Time Risk</span>
                          </div>
                          <p className="text-sm capitalize">{analysisResult.screenTimeRisk}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600">
                        Complete assessment to see your health overview
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
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
                      Health Recommendations
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

                {/* Exercise Routine */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Exercise Routine
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.exerciseRoutine.map((exercise: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <Activity className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-blue-800">{exercise}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Study Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      Study Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.studyTips.map((tip: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                          <Brain className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-purple-800">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Mental Health */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      Mental Wellness
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResult.mentalHealth.map((advice: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                          <TrendingUp className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-indigo-800">{advice}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Analysis Available</h3>
                  <p className="text-gray-600">
                    Complete the health assessment to get personalized insights and recommendations.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Wellness Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    Pomodoro Timer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    25-minute focused study sessions with 5-minute breaks.
                  </p>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Start Pomodoro
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-blue-600" />
                    Sleep Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Track your sleep patterns and get personalized sleep tips.
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Track Sleep
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-orange-600" />
                    Screen Time Monitor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Monitor and reduce excessive screen time with smart reminders.
                  </p>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Monitor Screen Time
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    Exercise Reminders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Get reminders for quick exercises and stretches during study breaks.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Set Reminders
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    Stress Meter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Quick stress assessment with immediate coping strategies.
                  </p>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Check Stress Level
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-red-600" />
                    Exam Prep Toolkit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Comprehensive exam preparation with study schedules and tips.
                  </p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Prepare for Exams
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Study Tips Tab */}
          <TabsContent value="tips" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Effective Study Techniques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">1</div>
                      <div>
                        <h4 className="font-medium">Active Recall</h4>
                        <p className="text-sm text-gray-600">Test yourself regularly instead of just re-reading notes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
                      <div>
                        <h4 className="font-medium">Spaced Repetition</h4>
                        <p className="text-sm text-gray-600">Review material at increasing intervals</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                      <div>
                        <h4 className="font-medium">Pomodoro Technique</h4>
                        <p className="text-sm text-gray-600">25-minute focused sessions with short breaks</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">4</div>
                      <div>
                        <h4 className="font-medium">Mind Mapping</h4>
                        <p className="text-sm text-gray-600">Visual representation of information and concepts</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Healthy Study Habits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Consistent Sleep Schedule</h4>
                        <p className="text-sm text-gray-600">7-9 hours of sleep at the same time daily</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Regular Exercise</h4>
                        <p className="text-sm text-gray-600">30 minutes of physical activity daily</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Healthy Nutrition</h4>
                        <p className="text-sm text-gray-600">Balanced meals with brain-boosting foods</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Screen Time Limits</h4>
                        <p className="text-sm text-gray-600">Take breaks every 20 minutes, limit recreational screen time</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exam Stress Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Deep Breathing</h4>
                        <p className="text-sm text-gray-600">4-7-8 breathing technique for instant calm</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Progressive Muscle Relaxation</h4>
                        <p className="text-sm text-gray-600">Tense and release muscle groups systematically</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Positive Visualization</h4>
                        <p className="text-sm text-gray-600">Imagine successful exam performance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Time Management</h4>
                        <p className="text-sm text-gray-600">Create realistic study schedules and stick to them</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Digital Wellness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-medium">20-20-20 Rule</h4>
                        <p className="text-sm text-gray-600">Every 20 minutes, look at something 20 feet away for 20 seconds</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Blue Light Filters</h4>
                        <p className="text-sm text-gray-600">Use blue light filters, especially in the evening</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Digital Detox</h4>
                        <p className="text-sm text-gray-600">Schedule regular breaks from all digital devices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-medium">Mindful Usage</h4>
                        <p className="text-sm text-gray-600">Be intentional about when and why you use devices</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}