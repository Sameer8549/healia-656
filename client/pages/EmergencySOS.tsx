import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import { getEmergencyContacts } from "@/lib/api";
import {
  ArrowLeft,
  Shield,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Heart,
  Flame,
  Car,
  Users,
  Baby,
  Plane,
  Train,
  CheckCircle,
} from "lucide-react";

export default function EmergencySOS() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState<any>({});
  const [sosActive, setSosActive] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Get emergency contacts
    getEmergencyContacts().then(setEmergencyContacts);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setLocationError("Location access denied. Emergency services may not be able to locate you quickly.");
        }
      );
    }
  }, []);

  const handleEmergencyCall = (number: string, type: string) => {
    if (sosActive) return;

    setSosActive(true);
    setCountdown(5);

    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Make the call
          window.open(`tel:${number}`);
          setSosActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelEmergencyCall = () => {
    setSosActive(false);
    setCountdown(0);
  };

  const emergencyServices = [
    {
      name: "Police",
      number: emergencyContacts.police || "100",
      icon: Shield,
      color: "bg-blue-600 hover:bg-blue-700",
      description: "For crimes, accidents, and general emergencies"
    },
    {
      name: "Fire Brigade",
      number: emergencyContacts.fire || "101",
      icon: Flame,
      color: "bg-red-600 hover:bg-red-700",
      description: "For fire emergencies and rescue operations"
    },
    {
      name: "Ambulance",
      number: emergencyContacts.ambulance || "108",
      icon: Heart,
      color: "bg-green-600 hover:bg-green-700",
      description: "For medical emergencies and ambulance services"
    },
    {
      name: "Women Helpline",
      number: emergencyContacts.women || "1091",
      icon: Users,
      color: "bg-purple-600 hover:bg-purple-700",
      description: "24x7 helpline for women in distress"
    },
    {
      name: "Child Helpline",
      number: emergencyContacts.child || "1098",
      icon: Baby,
      color: "bg-pink-600 hover:bg-pink-700",
      description: "For child abuse and missing children"
    },
    {
      name: "Disaster Management",
      number: emergencyContacts.disaster || "108",
      icon: AlertTriangle,
      color: "bg-orange-600 hover:bg-orange-700",
      description: "For natural disasters and emergencies"
    }
  ];

  const firstAidTips = [
    {
      title: "Heart Attack",
      steps: [
        "Call 108 immediately",
        "Help the person sit down and rest",
        "Loosen tight clothing",
        "If prescribed, help them take nitroglycerin",
        "If unconscious and not breathing, start CPR"
      ]
    },
    {
      title: "Choking",
      steps: [
        "Encourage coughing if they can",
        "Give 5 back blows between shoulder blades",
        "Give 5 abdominal thrusts (Heimlich maneuver)",
        "Alternate between back blows and abdominal thrusts",
        "Call 108 if object doesn't dislodge"
      ]
    },
    {
      title: "Severe Bleeding",
      steps: [
        "Apply direct pressure to the wound",
        "Elevate the injured area above heart level",
        "Use a clean cloth or bandage",
        "Don't remove objects embedded in wound",
        "Call 108 for severe bleeding"
      ]
    },
    {
      title: "Burns",
      steps: [
        "Cool the burn with cold running water for 10-20 minutes",
        "Remove jewelry before swelling occurs",
        "Cover with sterile, non-adhesive bandage",
        "Don't use ice, butter, or ointments",
        "Seek medical attention for severe burns"
      ]
    }
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

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-emergency rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Emergency SOS
              </h1>
              <p className="text-gray-600">
                Quick access to emergency services and first-aid guidance
              </p>
            </div>
          </div>

          {/* Location Status */}
          <div className="mb-6">
            {location ? (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Location detected. Emergency services can locate you at coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  {locationError || "Getting your location for emergency services..."}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* SOS Countdown */}
          {sosActive && (
            <Alert className="border-red-200 bg-red-50 mb-6">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <div className="flex items-center justify-between">
                  <span>Emergency call will be placed in {countdown} seconds...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={cancelEmergencyCall}
                    className="ml-4"
                  >
                    Cancel
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="space-y-8">
          {/* Emergency Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                Emergency Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyServices.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <Button
                      key={service.name}
                      onClick={() => handleEmergencyCall(service.number, service.name)}
                      disabled={sosActive}
                      className={`${service.color} h-auto p-6 flex flex-col items-center text-white`}
                    >
                      <IconComponent className="w-8 h-8 mb-2" />
                      <div className="text-lg font-semibold mb-1">{service.name}</div>
                      <div className="text-2xl font-bold mb-2">{service.number}</div>
                      <div className="text-xs text-center opacity-90">{service.description}</div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Share Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Share your current location with emergency contacts or services.
                </p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    if (location) {
                      const locationText = `Emergency! I need help. My location: https://maps.google.com/?q=${location.lat},${location.lng}`;
                      if (navigator.share) {
                        navigator.share({ text: locationText });
                      } else {
                        navigator.clipboard.writeText(locationText);
                        alert('Location copied to clipboard');
                      }
                    }
                  }}
                >
                  Share My Location
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Medical Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Quick access to your medical information for emergency responders.
                </p>
                <Button variant="outline" className="w-full">
                  View Medical ID
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Quickly call your personal emergency contacts.
                </p>
                <Button variant="outline" className="w-full">
                  Call Emergency Contact
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* First Aid Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                First Aid Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {firstAidTips.map((tip, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">{tip.title}</h4>
                    <ol className="space-y-2">
                      {tip.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Services */}
          <Card>
            <CardHeader>
              <CardTitle>Other Important Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Plane className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Tourist Helpline</div>
                    <div className="text-sm text-gray-600">{emergencyContacts.tourist || "1363"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Train className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium">Railway Enquiry</div>
                    <div className="text-sm text-gray-600">{emergencyContacts.railway || "139"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Car className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium">Road Accident</div>
                    <div className="text-sm text-gray-600">1073</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Cyber Crime</div>
                    <div className="text-sm text-gray-600">155620</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Emergency Preparedness Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Before an Emergency</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Keep emergency numbers saved in your phone
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Share your location with trusted contacts
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Keep a first aid kit at home and in your car
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Learn basic first aid and CPR
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">During an Emergency</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                      Stay calm and assess the situation
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                      Call appropriate emergency services immediately
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                      Provide clear location and nature of emergency
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                      Follow dispatcher's instructions carefully
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}