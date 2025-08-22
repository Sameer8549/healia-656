import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import PDFReport from "@/components/PDFReport";
import { getGovernmentSchemes } from "@/lib/api";
import {
  ArrowLeft,
  Users,
  CheckCircle,
  Info,
  MapPin,
  Calendar,
  FileText,
  ExternalLink,
  IndianRupee,
  Loader2,
} from "lucide-react";

export default function GovernmentSchemes() {
  const [userProfile, setUserProfile] = useState({
    age: "",
    gender: "",
    income: "",
    state: "",
    pregnant: false,
    category: ""
  });
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
  ];

  const fetchSchemes = async () => {
    setLoading(true);
    setError("");
    
    try {
      const schemeData = await getGovernmentSchemes({
        age: userProfile.age ? parseInt(userProfile.age) : undefined,
        gender: userProfile.gender,
        income: userProfile.income,
        state: userProfile.state,
        pregnant: userProfile.pregnant
      });
      setSchemes(schemeData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch government schemes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const handleGeneratePDF = () => {
    console.log("Generating PDF report for Government Schemes...");
    window.print();
  };

  const allSchemes = [
    {
      id: 'ayushman-bharat',
      name: 'Ayushman Bharat - PM-JAY',
      description: 'Health insurance coverage up to ₹5 lakh per family per year',
      eligibility: ['SECC database families', 'Rural/Urban poor', 'Specific occupational categories'],
      benefits: ['₹5 lakh coverage per family', 'Cashless treatment', '1,400+ medical procedures', 'Pre and post hospitalization'],
      applicationProcess: 'Check eligibility online at pmjay.gov.in or visit nearest Common Service Center',
      documents: ['Aadhaar Card', 'Ration Card', 'SECC verification'],
      category: 'Health Insurance',
      targetGroup: 'All eligible families',
      launchYear: '2018',
      ministry: 'Ministry of Health and Family Welfare'
    },
    {
      id: 'pmmvy',
      name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      description: 'Cash benefit for pregnant and lactating mothers',
      eligibility: ['Pregnant women aged 19+', 'First living child', 'All categories except government employees'],
      benefits: ['₹1,000 after early registration', '₹2,000 after 6 months pregnancy', '₹2,000 after delivery and immunization'],
      applicationProcess: 'Apply at Anganwadi Center or health facility',
      documents: ['Aadhaar Card', 'Bank account details', 'Pregnancy certificate', 'Delivery certificate'],
      category: 'Maternity Benefit',
      targetGroup: 'Pregnant and lactating women',
      launchYear: '2017',
      ministry: 'Ministry of Women and Child Development'
    },
    {
      id: 'jsy',
      name: 'Janani Suraksha Yojana (JSY)',
      description: 'Safe delivery and post-delivery care support',
      eligibility: ['Pregnant women from BPL families', 'All women in low performing states', 'Age 19+ for cash assistance'],
      benefits: ['Cash assistance for delivery', 'Free delivery care', 'Post-delivery support', 'ASHA facilitation'],
      applicationProcess: 'Register at health facility during pregnancy',
      documents: ['Aadhaar Card', 'BPL card', 'Pregnancy registration'],
      category: 'Maternal Health',
      targetGroup: 'Pregnant women from poor families',
      launchYear: '2005',
      ministry: 'Ministry of Health and Family Welfare'
    },
    {
      id: 'rbsk',
      name: 'Rashtriya Bal Swasthya Karyakram (RBSK)',
      description: 'Child health screening and early intervention services',
      eligibility: ['Children 0-18 years', 'All children in government schools', 'Anganwadi children'],
      benefits: ['Free health screening', 'Treatment for defects', 'Follow-up care', 'Referral services'],
      applicationProcess: 'Automatic coverage through schools and Anganwadis',
      documents: ['School enrollment', 'Aadhaar Card (if available)'],
      category: 'Child Health',
      targetGroup: 'Children and adolescents',
      launchYear: '2013',
      ministry: 'Ministry of Health and Family Welfare'
    },
    {
      id: 'pmjay-ma',
      name: 'PM-JAY MA (Pradhan Mantri Jan Arogya Yojana - Mukhyamantri Amrutam)',
      description: 'Enhanced health coverage for Gujarat residents',
      eligibility: ['Gujarat residents', 'SECC beneficiaries', 'Additional state-specific categories'],
      benefits: ['₹5 lakh central + ₹5 lakh state coverage', 'Total ₹10 lakh coverage', 'Cashless treatment'],
      applicationProcess: 'Apply through Gujarat government portals',
      documents: ['Aadhaar Card', 'Residence proof', 'Income certificate'],
      category: 'State Health Insurance',
      targetGroup: 'Gujarat residents',
      launchYear: '2019',
      ministry: 'Gujarat State Government'
    },
    {
      id: 'kalia',
      name: 'KALIA (Krushak Assistance for Livelihood and Income Augmentation)',
      description: 'Comprehensive support for farmers and agricultural workers',
      eligibility: ['Small and marginal farmers', 'Landless agricultural workers', 'Vulnerable households'],
      benefits: ['₹25,000 for cultivation support', '₹12,500 for livelihood support', 'Life insurance coverage'],
      applicationProcess: 'Apply online at kalia.odisha.gov.in',
      documents: ['Land records', 'Aadhaar Card', 'Bank account details'],
      category: 'Agricultural Support',
      targetGroup: 'Farmers and agricultural workers',
      launchYear: '2018',
      ministry: 'Odisha State Government'
    }
  ];

  const getEligibilityStatus = (scheme: any) => {
    // Simple eligibility logic based on user profile
    if (scheme.id === 'pmmvy' && userProfile.gender === 'female' && userProfile.pregnant) {
      return { eligible: true, reason: 'Pregnant woman eligible for maternity benefits' };
    }
    if (scheme.id === 'ayushman-bharat' && (userProfile.income === 'low' || userProfile.income === 'below-poverty-line')) {
      return { eligible: true, reason: 'Income criteria met for health insurance' };
    }
    if (scheme.id === 'jsy' && userProfile.gender === 'female' && userProfile.income === 'low') {
      return { eligible: true, reason: 'Eligible for safe delivery support' };
    }
    return { eligible: false, reason: 'Check detailed eligibility criteria' };
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Government Schemes & Aid
              </h1>
              <p className="text-gray-600">
                Discover health schemes and benefits with eligibility guidance
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="profile">Your Profile</TabsTrigger>
            <TabsTrigger value="schemes">Available Schemes</TabsTrigger>
            <TabsTrigger value="eligible">Eligible Schemes</TabsTrigger>
            <TabsTrigger value="report">PDF Report</TabsTrigger>
          </TabsList>

          {/* Profile Setup */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Age</label>
                    <Input
                      type="number"
                      placeholder="Enter age"
                      value={userProfile.age}
                      onChange={(e) => setUserProfile(prev => ({ ...prev, age: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
                    <Select value={userProfile.gender} onValueChange={(value) => setUserProfile(prev => ({ ...prev, gender: value }))}>
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
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Income Category</label>
                    <Select value={userProfile.income} onValueChange={(value) => setUserProfile(prev => ({ ...prev, income: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select income category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="below-poverty-line">Below Poverty Line (BPL)</SelectItem>
                        <SelectItem value="low">Low Income</SelectItem>
                        <SelectItem value="middle">Middle Income</SelectItem>
                        <SelectItem value="high">High Income</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">State</label>
                    <Select value={userProfile.state} onValueChange={(value) => setUserProfile(prev => ({ ...prev, state: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                    <Select value={userProfile.category} onValueChange={(value) => setUserProfile(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="sc">Scheduled Caste (SC)</SelectItem>
                        <SelectItem value="st">Scheduled Tribe (ST)</SelectItem>
                        <SelectItem value="obc">Other Backward Class (OBC)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {userProfile.gender === 'female' && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="pregnant"
                        checked={userProfile.pregnant}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, pregnant: e.target.checked }))}
                        className="rounded"
                      />
                      <label htmlFor="pregnant" className="text-sm text-gray-700">Currently pregnant</label>
                    </div>
                  )}
                </div>

                <Button
                  onClick={fetchSchemes}
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Finding Schemes...
                    </>
                  ) : (
                    'Find Eligible Schemes'
                  )}
                </Button>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Schemes */}
          <TabsContent value="schemes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allSchemes.map((scheme) => (
                <Card key={scheme.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{scheme.name}</CardTitle>
                      <Badge variant="outline">{scheme.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{scheme.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {scheme.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Since {scheme.launchYear}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{scheme.targetGroup}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Info className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Apply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Eligible Schemes */}
          <TabsContent value="eligible" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allSchemes.map((scheme) => {
                const eligibility = getEligibilityStatus(scheme);
                return (
                  <Card key={scheme.id} className={eligibility.eligible ? 'border-green-200 bg-green-50' : ''}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{scheme.name}</CardTitle>
                        <Badge className={eligibility.eligible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {eligibility.eligible ? 'Eligible' : 'Check Eligibility'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{scheme.description}</p>
                      
                      <div className={`border rounded-lg p-3 ${eligibility.eligible ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {eligibility.eligible ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Info className="w-4 h-4 text-blue-600" />
                          )}
                          <span className={`font-medium ${eligibility.eligible ? 'text-green-800' : 'text-blue-800'}`}>
                            {eligibility.eligible ? 'You are eligible!' : 'Eligibility Status'}
                          </span>
                        </div>
                        <p className={`text-sm ${eligibility.eligible ? 'text-green-700' : 'text-blue-700'}`}>
                          {eligibility.reason}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Required Documents:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {scheme.documents.map((doc, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <FileText className="w-3 h-3 text-gray-500" />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">How to Apply:</h4>
                        <p className="text-sm text-gray-700">{scheme.applicationProcess}</p>
                      </div>

                      <Button 
                        className={`w-full ${eligibility.eligible ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                      >
                        {eligibility.eligible ? 'Apply Now' : 'Check Full Eligibility'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* PDF Report */}
          <TabsContent value="report">
            <PDFReport
              reportType="govt-schemes"
              patientName="User"
              reportData={{
                userProfile,
                eligibleSchemes: allSchemes.filter(scheme => getEligibilityStatus(scheme).eligible),
                allSchemes: allSchemes
              }}
              onGeneratePDF={handleGeneratePDF}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}