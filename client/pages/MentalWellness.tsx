import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import PDFReport from "@/components/PDFReport";
import { getMentalWellnessAdvice } from "@/lib/gemini";
import {
  ArrowLeft,
  BrainCircuit,
  Heart,
  Smile,
  Frown,
  Meh,
  Phone,
  MessageCircle,
  BookOpen,
  Headphones,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function MentalWellness() {
  const [mood, setMood] = useState("");
  const [stressLevel, setStressLevel] = useState([5]);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [journalEntry, setJournalEntry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState("");

  const moodOptions = [
    { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-600' },
    { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-600' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-600' },
    { value: 'anxious', label: 'Anxious', icon: AlertCircle, color: 'text-orange-600' },
    { value: 'stressed', label: 'Stressed', icon: AlertCircle, color: 'text-red-600' },
  ];

  const commonConcerns = [
    'Work stress',
    'Relationship issues',
    'Financial worries',
    'Health anxiety',
    'Sleep problems',
    'Social anxiety',
    'Depression',
    'Panic attacks',
    'Academic pressure',
    'Family problems'
  ];

  const handleConcernChange = (concern: string, checked: boolean) => {
    if (checked) {
      setConcerns([...concerns, concern]);
    } else {
      setConcerns(concerns.filter(c => c !== concern));
    }
  };

  const handleAnalyze = async () => {
    if (!mood) {
      setError("Please select your current mood");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    
    try {
      const result = await getMentalWellnessAdvice(mood, stressLevel[0], concerns);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to get mental wellness advice');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePDF = () => {
    console.log("Generating PDF report for Mental Wellness...");
    window.print();
  };

  const emergencyContacts = [
    { name: 'NIMHANS Helpline', number: '080-26995000', description: 'Mental health emergency' },
    { name: 'Vandrevala Foundation', number: '9999666555', description: '24/7 mental health support' },
    { name: 'AASRA', number: '91-9820466726', description: 'Suicide prevention' },
    { name: 'Sneha India', number: '044-24640050', description: 'Emotional support' },
  ];

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
            <div className="w-12 h-12 bg-gradient-mental rounded-xl flex items-center justify-center">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Mental Wellness
              </h1>
              <p className="text-gray-600">
                AI-powered mental health support and resources
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="assessment" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="assessment">Assessment</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="report">PDF Report</TabsTrigger>
          </TabsList>

          {/* Mental Health Assessment */}
          <TabsContent value="assessment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-purple-600" />
                    Mental Health Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mood Selection */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      How are you feeling today?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {moodOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => setMood(option.value)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              mood === option.value
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <IconComponent className={`w-8 h-8 mx-auto mb-2 ${option.color}`} />
                            <div className="text-sm font-medium">{option.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stress Level */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Stress Level (1-10): {stressLevel[0]}
                    </label>
                    <Slider
                      value={stressLevel}
                      onValueChange={setStressLevel}
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
                      What's concerning you? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {commonConcerns.map((concern) => (
                        <div key={concern} className="flex items-center space-x-2">
                          <Checkbox
                            id={concern}
                            checked={concerns.includes(concern)}
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
                    disabled={!mood || isAnalyzing}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Get AI Wellness Advice'
                    )}
                  </Button>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Wellness Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisResult ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {analysisResult.wellnessScore}/100
                        </div>
                        <div className="text-sm text-gray-600">Wellness Score</div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Mood Analysis</h4>
                          <p className="text-sm text-gray-600">{analysisResult.moodAnalysis}</p>
                        </div>

                        {analysisResult.urgentCare && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertCircle className="w-4 h-4 text-red-600" />
                              <span className="font-medium text-red-800">Urgent Care Recommended</span>
                            </div>
                            <p className="text-sm text-red-700">
                              Please consider reaching out to a mental health professional or emergency helpline.
                            </p>
                          </div>
                        )}

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Quick Tips</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {analysisResult.tips?.map((tip: string, index: number) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BrainCircuit className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600">
                        Complete the assessment to get personalized wellness insights
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Journal */}
          <TabsContent value="journal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Mental Health Journal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    How was your day? Write about your thoughts and feelings.
                  </label>
                  <Textarea
                    placeholder="Today I felt... I'm grateful for... I'm worried about..."
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    className="min-h-32"
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Entry
                  </Button>
                  <Button variant="outline">
                    View Past Entries
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Journaling Benefits</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Helps process emotions and thoughts</li>
                    <li>• Reduces stress and anxiety</li>
                    <li>• Improves self-awareness</li>
                    <li>• Tracks mood patterns over time</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exercises */}
          <TabsContent value="exercises" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysisResult?.exercises ? (
                analysisResult.exercises.map((exercise: string, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-green-600" />
                        {exercise}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Guided {exercise.toLowerCase()} exercise to help reduce stress and improve mental well-being.
                      </p>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Start Exercise
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Headphones className="w-5 h-5 text-green-600" />
                        Deep Breathing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        5-minute guided breathing exercise to reduce stress and anxiety.
                      </p>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Start Breathing Exercise
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-purple-600" />
                        Mindfulness Meditation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        10-minute mindfulness meditation for mental clarity and peace.
                      </p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        Start Meditation
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Progressive Muscle Relaxation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        15-minute exercise to release physical tension and stress.
                      </p>
                      <Button className="w-full bg-red-500 hover:bg-red-600">
                        Start Relaxation
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Smile className="w-5 h-5 text-yellow-600" />
                        Gratitude Practice
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        Daily gratitude exercise to improve mood and outlook.
                      </p>
                      <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                        Start Gratitude Practice
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Emergency Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    Emergency Mental Health Helplines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{contact.name}</h4>
                        <p className="text-sm text-gray-600">{contact.description}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`tel:${contact.number}`)}
                      >
                        Call
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    Mental Health Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisResult?.resources ? (
                    analysisResult.resources.map((resource: string, index: number) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">{resource}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900">NIMHANS</h4>
                        <p className="text-sm text-blue-800">National Institute of Mental Health and Neurosciences</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900">Mental Health Apps</h4>
                        <p className="text-sm text-green-800">Headspace, Calm, Insight Timer for meditation</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-900">Online Therapy</h4>
                        <p className="text-sm text-purple-800">BetterHelp, Talkspace for professional support</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* PDF Report */}
          <TabsContent value="report">
            <PDFReport
              reportType="mental-wellness"
              patientName="User"
              reportData={{
                mood,
                stressLevel: stressLevel[0],
                concerns,
                analysis: analysisResult,
                journalEntry
              }}
              onGeneratePDF={handleGeneratePDF}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}