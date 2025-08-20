import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import PDFReport from "@/components/PDFReport";
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
  Users
} from "lucide-react";

export default function WomensHealth() {
  const [currentCycle, setCurrentCycle] = useState(28);
  const [lastPeriod, setLastPeriod] = useState("2024-01-15");
  const [showPDFReport, setShowPDFReport] = useState(false);

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
          <Link to="/" className="inline-flex items-center gap-2 text-health-600 hover:text-health-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-women rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Women's Health</h1>
              <p className="text-gray-600">Comprehensive tracking and government scheme integration</p>
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
                    {/* Cycle Calendar Visual */}
                    <div className="bg-gradient-women rounded-lg p-6 text-white">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Current Cycle: Day 12</h3>
                          <p className="text-white/80">Fertile window</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">16</div>
                          <div className="text-sm text-white/80">days until next period</div>
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
                          <div className="bg-white h-2 rounded-full" style={{ width: "43%" }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="bg-women-500 hover:bg-women-600">
                        Log Period Start
                      </Button>
                      <Button variant="outline">
                        Add Symptoms
                      </Button>
                    </div>
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
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <p className="font-medium text-sm">Regular Cycle</p>
                      <p className="text-xs text-gray-600">Your cycle is consistently 28 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <p className="font-medium text-sm">Fertile Window</p>
                      <p className="text-xs text-gray-600">High chance of conception next 3 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-women-500 mt-1" />
                    <div>
                      <p className="font-medium text-sm">Mood Pattern</p>
                      <p className="text-xs text-gray-600">Energy levels typically increase now</p>
                    </div>
                  </div>
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
                    <h3 className="text-lg font-semibold mb-2">Not Currently Pregnant</h3>
                    <p className="text-gray-600 mb-4">Track your pregnancy journey with AI-powered insights</p>
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
                      <span className="text-sm font-medium">PCOS Risk Assessment</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Low Risk</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Fertility Health Score</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">85/100</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Hormone Balance</span>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Monitor</span>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-health-500" />
                    Pradhan Mantri Matru Vandana Yojana (PMMVY)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">You're Eligible!</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Get ₹5,000 cash benefit for first living child
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Benefits:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• ₹1,000 after early registration</li>
                        <li>• ₹2,000 after 6 months of pregnancy</li>
                        <li>• ₹2,000 after child birth and vaccination</li>
                      </ul>
                    </div>
                    
                    <Button className="w-full bg-health-600 hover:bg-health-700">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-women-500" />
                    Janani Suraksha Yojana (JSY)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-800">Check Eligibility</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Safe delivery and post-delivery care support
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Benefits:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Cash assistance for institutional delivery</li>
                        <li>• Free delivery care</li>
                        <li>• Post-delivery support</li>
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Check Eligibility
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
                    <h3 className="font-semibold text-lg mb-3">This Month's Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-health-600 mb-1">92%</div>
                        <div className="text-sm text-gray-600">Cycle Regularity</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-women-600 mb-1">7.5</div>
                        <div className="text-sm text-gray-600">Wellness Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">Low</div>
                        <div className="text-sm text-gray-600">Health Risk</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Personalized Recommendations</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="font-medium text-green-800">Maintain Iron Intake</p>
                          <p className="text-sm text-green-700">Your iron levels are good. Continue with iron-rich foods like spinach and lentils.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-1" />
                        <div>
                          <p className="font-medium text-yellow-800">Increase Water Intake</p>
                          <p className="text-sm text-yellow-700">You're drinking 6 glasses daily. Aim for 8-10 glasses for better hormonal balance.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <Info className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="font-medium text-blue-800">Stress Management</p>
                          <p className="text-sm text-blue-700">Consider 10 minutes of daily meditation during your luteal phase to reduce PMS symptoms.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
