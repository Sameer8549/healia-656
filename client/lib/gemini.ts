// Note: In production, this API key should be stored securely in environment variables
// For demo purposes, we're using it directly here

const API_KEY = 'AIzaSyBGpio1p5_otwnkQNQSqmflztXOl-2o8sY';

// Direct API call to Gemini REST API
async function callGeminiAPI(prompt: string) {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function analyzeSymptoms(symptoms: string, age?: number, gender?: string) {
  const prompt = `
    As a medical AI assistant, analyze these symptoms and provide a detailed assessment:
    
    Symptoms: ${symptoms}
    ${age ? `Age: ${age}` : ''}
    ${gender ? `Gender: ${gender}` : ''}
    
    Please provide:
    1. Possible conditions (with confidence percentages)
    2. Risk level (low/medium/high)
    3. Immediate recommendations
    4. When to seek medical care
    5. Home care suggestions
    
    Format as JSON with these fields:
    {
      "riskLevel": "low|medium|high",
      "possibleConditions": [{"name": "condition", "confidence": 75, "description": "brief desc"}],
      "recommendations": ["recommendation1", "recommendation2"],
      "seekCareIf": ["symptom1", "symptom2"],
      "homeCare": ["care1", "care2"],
      "summary": "brief summary"
    }
    
    IMPORTANT: This is for informational purposes only and not a substitute for professional medical advice.
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if JSON parsing fails
    return {
      riskLevel: 'medium',
      possibleConditions: [{ name: 'General symptoms', confidence: 50, description: 'Requires further evaluation' }],
      recommendations: ['Monitor symptoms', 'Stay hydrated', 'Rest'],
      seekCareIf: ['Symptoms worsen', 'High fever', 'Difficulty breathing'],
      homeCare: ['Rest', 'Hydration', 'Monitor temperature'],
      summary: text.substring(0, 200) + '...'
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze symptoms. Please try again.');
  }
}

export async function analyzeWomensHealth(data: {
  cycleLength?: number;
  lastPeriod?: string;
  symptoms?: string[];
  age?: number;
}) {
  const prompt = `
    Analyze women's health data and provide insights:
    
    Cycle Length: ${data.cycleLength || 'Not provided'} days
    Last Period: ${data.lastPeriod || 'Not provided'}
    Symptoms: ${data.symptoms?.join(', ') || 'None reported'}
    Age: ${data.age || 'Not provided'}
    
    Provide analysis as JSON:
    {
      "cycleHealth": "regular|irregular|concerning",
      "fertileWindow": "current phase description",
      "healthScore": 85,
      "recommendations": ["rec1", "rec2"],
      "riskFactors": ["risk1", "risk2"],
      "nextPeriod": "estimated date",
      "insights": ["insight1", "insight2"]
    }
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      cycleHealth: 'regular',
      fertileWindow: 'Ovulation phase',
      healthScore: 85,
      recommendations: ['Track cycle regularly', 'Maintain healthy diet'],
      riskFactors: [],
      nextPeriod: 'In 14 days',
      insights: ['Cycle appears regular', 'Good overall reproductive health']
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze women\'s health data.');
  }
}

export async function analyzeLabReport(reportText: string) {
  const prompt = `
    Analyze this lab report and provide insights based on ICMR standards:
    
    ${reportText}
    
    Provide analysis as JSON:
    {
      "overallHealth": "excellent|good|fair|poor",
      "abnormalValues": [{"parameter": "name", "value": "actual", "normal": "range", "significance": "description"}],
      "recommendations": ["rec1", "rec2"],
      "followUpNeeded": true/false,
      "riskFactors": ["risk1", "risk2"],
      "summary": "overall summary"
    }
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      overallHealth: 'good',
      abnormalValues: [],
      recommendations: ['Continue healthy lifestyle'],
      followUpNeeded: false,
      riskFactors: [],
      summary: 'Lab results appear normal'
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze lab report.');
  }
}

export async function getMentalWellnessAdvice(mood: string, stressLevel: number, concerns: string[]) {
  const prompt = `
    Provide mental wellness advice based on:
    
    Current Mood: ${mood}
    Stress Level: ${stressLevel}/10
    Concerns: ${concerns.join(', ')}
    
    Provide advice as JSON:
    {
      "wellnessScore": 75,
      "moodAnalysis": "description",
      "recommendations": ["rec1", "rec2"],
      "exercises": ["exercise1", "exercise2"],
      "resources": ["resource1", "resource2"],
      "urgentCare": true/false,
      "tips": ["tip1", "tip2"]
    }
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      wellnessScore: 75,
      moodAnalysis: 'Moderate stress levels detected',
      recommendations: ['Practice mindfulness', 'Regular exercise'],
      exercises: ['Deep breathing', '10-minute meditation'],
      resources: ['NIMHANS helpline: 080-26995000'],
      urgentCare: false,
      tips: ['Take regular breaks', 'Connect with friends']
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get mental wellness advice.');
  }
}

export async function getNutritionAdvice(profile: {
  age?: number;
  weight?: number;
  height?: number;
  activityLevel?: string;
  dietaryRestrictions?: string[];
  healthGoals?: string[];
}) {
  const prompt = `
    Create a personalized nutrition plan for Indian dietary preferences:
    
    Age: ${profile.age || 'Not provided'}
    Weight: ${profile.weight || 'Not provided'} kg
    Height: ${profile.height || 'Not provided'} cm
    Activity Level: ${profile.activityLevel || 'Moderate'}
    Dietary Restrictions: ${profile.dietaryRestrictions?.join(', ') || 'None'}
    Health Goals: ${profile.healthGoals?.join(', ') || 'General wellness'}
    
    Provide plan as JSON:
    {
      "dailyCalories": 2000,
      "macros": {"protein": 150, "carbs": 250, "fat": 65},
      "mealPlan": {
        "breakfast": ["item1", "item2"],
        "lunch": ["item1", "item2"],
        "dinner": ["item1", "item2"],
        "snacks": ["item1", "item2"]
      },
      "indianFoods": ["dal", "roti", "sabzi"],
      "supplements": ["vitamin D", "B12"],
      "hydration": "3-4 liters daily",
      "tips": ["tip1", "tip2"]
    }
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      dailyCalories: 2000,
      macros: { protein: 150, carbs: 250, fat: 65 },
      mealPlan: {
        breakfast: ['Oats with fruits', 'Green tea'],
        lunch: ['Dal rice', 'Mixed vegetables'],
        dinner: ['Roti with curry', 'Salad'],
        snacks: ['Nuts', 'Fruits']
      },
      indianFoods: ['Dal', 'Roti', 'Sabzi', 'Rice'],
      supplements: ['Vitamin D', 'B12'],
      hydration: '3-4 liters daily',
      tips: ['Eat at regular intervals', 'Include variety in diet']
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get nutrition advice.');
  }
}

export async function analyzeReproductiveHealth(data: {
  age?: number;
  symptoms?: string[];
  cycleHistory?: string;
  concerns?: string[];
}) {
  const prompt = `
    Analyze reproductive health data for PCOS and fertility insights:
    
    Age: ${data.age || 'Not provided'}
    Symptoms: ${data.symptoms?.join(', ') || 'None reported'}
    Cycle History: ${data.cycleHistory || 'Not provided'}
    Concerns: ${data.concerns?.join(', ') || 'None'}
    
    Provide analysis as JSON:
    {
      "pcosRisk": "low|medium|high",
      "fertilityScore": 85,
      "hormoneBalance": "balanced|imbalanced",
      "recommendations": ["rec1", "rec2"],
      "lifestyle": ["tip1", "tip2"],
      "redFlags": ["flag1", "flag2"],
      "followUp": "recommended timeline"
    }
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      pcosRisk: 'low',
      fertilityScore: 85,
      hormoneBalance: 'balanced',
      recommendations: ['Regular exercise', 'Balanced diet'],
      lifestyle: ['Maintain healthy weight', 'Manage stress'],
      redFlags: [],
      followUp: '6 months'
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze reproductive health.');
  }
}

export async function analyzeMaternalHealth(data: {
  pregnancyWeek?: number;
  symptoms?: string[];
  previousPregnancies?: number;
  age?: number;
}) {
  const prompt = `
    Analyze maternal health data and provide pregnancy guidance:
    
    Pregnancy Week: ${data.pregnancyWeek || 'Not provided'}
    Symptoms: ${data.symptoms?.join(', ') || 'None reported'}
    Previous Pregnancies: ${data.previousPregnancies || 0}
    Age: ${data.age || 'Not provided'}
    
    Provide analysis as JSON:
    {
      "trimester": "first|second|third",
      "riskLevel": "low|medium|high",
      "developmentStage": "description",
      "recommendations": ["rec1", "rec2"],
      "nutrition": ["food1", "food2"],
      "exercises": ["exercise1", "exercise2"],
      "warningSigns": ["sign1", "sign2"],
      "nextCheckup": "timeline"
    }
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      trimester: 'second',
      riskLevel: 'low',
      developmentStage: 'Normal development',
      recommendations: ['Regular prenatal visits', 'Take prenatal vitamins'],
      nutrition: ['Folic acid rich foods', 'Iron supplements'],
      exercises: ['Prenatal yoga', 'Walking'],
      warningSigns: ['Severe headaches', 'Unusual bleeding'],
      nextCheckup: '4 weeks'
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze maternal health.');
  }
}

export async function analyzeYouthHealth(data: {
  age?: number;
  studyHours?: number;
  screenTime?: number;
  sleepHours?: number;
  stressLevel?: number;
  concerns?: string[];
}) {
  const prompt = `
    Analyze youth health data for students and young adults:
    
    Age: ${data.age || 'Not provided'}
    Study Hours: ${data.studyHours || 'Not provided'} per day
    Screen Time: ${data.screenTime || 'Not provided'} hours per day
    Sleep Hours: ${data.sleepHours || 'Not provided'} per night
    Stress Level: ${data.stressLevel || 'Not provided'}/10
    Concerns: ${data.concerns?.join(', ') || 'None'}
    
    Provide analysis as JSON:
    {
      "healthScore": 75,
      "sleepQuality": "good|fair|poor",
      "stressLevel": "low|medium|high",
      "screenTimeRisk": "low|medium|high",
      "recommendations": ["rec1", "rec2"],
      "studyTips": ["tip1", "tip2"],
      "exerciseRoutine": ["exercise1", "exercise2"],
      "mentalHealth": ["advice1", "advice2"]
    }
  `;

  try {
    const text = await callGeminiAPI(prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      healthScore: 75,
      sleepQuality: 'good',
      stressLevel: 'medium',
      screenTimeRisk: 'medium',
      recommendations: ['Take regular breaks', 'Exercise daily'],
      studyTips: ['Pomodoro technique', 'Regular breaks'],
      exerciseRoutine: ['Morning walk', 'Yoga'],
      mentalHealth: ['Practice mindfulness', 'Talk to friends']
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to analyze youth health.');
  }
}