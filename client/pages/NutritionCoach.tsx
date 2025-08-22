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
import { getNutritionAdvice } from "@/lib/gemini";
import {
  ArrowLeft,
  Apple,
  Utensils,
  Target,
  Droplets,
  TrendingUp,
  Clock,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function NutritionCoach() {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    activityLevel: "",
    dietaryRestrictions: [] as string[],
    healthGoals: [] as string[],
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [nutritionPlan, setNutritionPlan] = useState<any>(null);
  const [error, setError] = useState("");

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
    { value: 'light', label: 'Light (light exercise 1-3 days/week)' },
    { value: 'moderate', label: 'Moderate (moderate exercise 3-5 days/week)' },
    { value: 'active', label: 'Active (hard exercise 6-7 days/week)' },
    { value: 'very-active', label: 'Very Active (very hard exercise, physical job)' },
  ];

  const dietaryRestrictions = [
    'Vegetarian',
    'Vegan',
    'Gluten-free',
    'Dairy-free',
    'Nut allergies',
    'Diabetic',
    'Low sodium',
    'Keto',
    'Jain food',
    'Halal'
  ];

  const healthGoals = [
    'Weight loss',
    'Weight gain',
    'Muscle building',
    'Improve energy',
    'Better digestion',
    'Heart health',
    'Diabetes management',
    'Lower cholesterol',
    'Better sleep',
    'Stress reduction'
  ];

  const handleRestrictionChange = (restriction: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({
        ...prev,
        dietaryRestrictions: [...prev.dietaryRestrictions, restriction]
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        dietaryRestrictions: prev.dietaryRestrictions.filter(r => r !== restriction)
      }));
    }
  };

  const handleGoalChange = (goal: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({
        ...prev,
        healthGoals: [...prev.healthGoals, goal]
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        healthGoals: prev.healthGoals.filter(g => g !== goal)
      }));
    }
  };

  const handleAnalyze = async () => {
    if (!profile.age || !profile.weight || !profile.height || !profile.activityLevel) {
      setError("Please fill in all required fields");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    
    try {
      const result = await getNutritionAdvice({
        age: parseInt(profile.age),
        weight: parseFloat(profile.weight),
        height: parseFloat(profile.height),
        activityLevel: profile.activityLevel,
        dietaryRestrictions: profile.dietaryRestrictions,
        healthGoals: profile.healthGoals
      });
      setNutritionPlan(result);
    } catch (err: any) {
      setError(err.message || 'Failed to get nutrition advice');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeneratePDF = () => {
    console.log("Generating PDF report for Nutrition Plan...");
    window.print();
  };

  const getBMI = () => {
    if (profile.weight && profile.height) {
      const heightInM = parseFloat(profile.height) / 100;
      const bmi = parseFloat(profile.weight) / (heightInM * heightInM);
      return bmi.toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Nutrition & Lifestyle Coach
              </h1>
              <p className="text-gray-600">
                Personalized nutrition plans with Indian foods and AI guidance
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="plan">Meal Plan</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="report">PDF Report</TabsTrigger>
          </TabsList>

          {/* Profile Setup */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Age *
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
                        Weight (kg) *
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter weight"
                        value={profile.weight}
                        onChange={(e) => setProfile(prev => ({ ...prev, weight: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Height (cm) *
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter height"
                        value={profile.height}
                        onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Activity Level *
                    </label>
                    <Select value={profile.activityLevel} onValueChange={(value) => setProfile(prev => ({ ...prev, activityLevel: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Dietary Restrictions (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {dietaryRestrictions.map((restriction) => (
                        <div key={restriction} className="flex items-center space-x-2">
                          <Checkbox
                            id={restriction}
                            checked={profile.dietaryRestrictions.includes(restriction)}
                            onCheckedChange={(checked) => handleRestrictionChange(restriction, checked as boolean)}
                          />
                          <label htmlFor={restriction} className="text-sm text-gray-700">
                            {restriction}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Health Goals */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                      Health Goals (select all that apply)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {healthGoals.map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox
                            id={goal}
                            checked={profile.healthGoals.includes(goal)}
                            onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
                          />
                          <label htmlFor={goal} className="text-sm text-gray-700">
                            {goal}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Generate Plan Button */}
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Plan...
                      </>
                    ) : (
                      'Generate Nutrition Plan'
                    )}
                  </Button>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* BMI Calculator */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Health Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getBMI() ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {getBMI()}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">BMI</div>
                        <div className={`font-medium ${getBMICategory(parseFloat(getBMI()!)).color}`}>
                          {getBMICategory(parseFloat(getBMI()!)).category}
                        </div>
                      </div>

                      {nutritionPlan && (
                        <div className="space-y-3">
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-lg font-bold text-green-600">
                              {nutritionPlan.dailyCalories}
                            </div>
                            <div className="text-sm text-green-700">Daily Calories</div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 bg-blue-50 rounded">
                              <div className="font-medium text-blue-600">{nutritionPlan.macros?.protein}g</div>
                              <div className="text-xs text-blue-700">Protein</div>
                            </div>
                            <div className="p-2 bg-yellow-50 rounded">
                              <div className="font-medium text-yellow-600">{nutritionPlan.macros?.carbs}g</div>
                              <div className="text-xs text-yellow-700">Carbs</div>
                            </div>
                            <div className="p-2 bg-purple-50 rounded">
                              <div className="font-medium text-purple-600">{nutritionPlan.macros?.fat}g</div>
                              <div className="text-xs text-purple-700">Fat</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600">
                        Enter your weight and height to calculate BMI
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Meal Plan */}
          <TabsContent value="plan" className="space-y-6">
            {nutritionPlan ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily Meal Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-orange-600" />
                      Daily Meal Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Object.entries(nutritionPlan.mealPlan).map(([meal, foods]) => (
                      <div key={meal}>
                        <h4 className="font-medium text-gray-900 mb-3 capitalize flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {meal}
                        </h4>
                        <ul className="space-y-2">
                          {(foods as string[]).map((food, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {food}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Indian Foods & Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Apple className="w-5 h-5 text-green-600" />
                      Recommended Indian Foods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Staple Foods</h4>
                      <div className="flex flex-wrap gap-2">
                        {nutritionPlan.indianFoods.map((food: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Supplements</h4>
                      <ul className="space-y-2">
                        {nutritionPlan.supplements.map((supplement: string, index: number) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <AlertCircle className="w-3 h-3 text-orange-500" />
                            {supplement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        Hydration
                      </h4>
                      <p className="text-sm text-gray-700">{nutritionPlan.hydration}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Nutrition Tips</h4>
                      <ul className="space-y-2">
                        {nutritionPlan.tips.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-1" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Apple className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Meal Plan Generated
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Complete your profile to get a personalized nutrition plan
                  </p>
                  <Button onClick={() => document.querySelector('[value="profile"]')?.click()}>
                    Complete Profile
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tracking */}
          <TabsContent value="tracking" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Today's Calories</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">1,250</div>
                  <div className="text-sm text-gray-600">
                    of {nutritionPlan?.dailyCalories || 2000} calories
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Water Intake</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                  <div className="text-sm text-gray-600">of 8 glasses</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">-0.5kg</div>
                  <div className="text-sm text-gray-600">This week</div>
                  <div className="text-xs text-green-600 mt-2">On track!</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Log Your Meals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col">
                    <span className="text-lg mb-1">🌅</span>
                    <span>Breakfast</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <span className="text-lg mb-1">☀️</span>
                    <span>Lunch</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <span className="text-lg mb-1">🌆</span>
                    <span>Dinner</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col">
                    <span className="text-lg mb-1">🍎</span>
                    <span>Snacks</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PDF Report */}
          <TabsContent value="report">
            <PDFReport
              reportType="nutrition"
              patientName="User"
              reportData={{
                profile,
                nutritionPlan,
                bmi: getBMI()
              }}
              onGeneratePDF={handleGeneratePDF}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}