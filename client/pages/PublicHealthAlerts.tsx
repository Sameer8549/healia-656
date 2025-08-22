import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { getPublicHealthAlerts } from "@/lib/api";
import {
  ArrowLeft,
  Megaphone,
  AlertTriangle,
  Info,
  CheckCircle,
  MapPin,
  Calendar,
  RefreshCw,
  Bell,
  Loader2,
} from "lucide-react";

export default function PublicHealthAlerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [location, setLocation] = useState("Delhi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAlerts = async (locationName: string = location) => {
    setLoading(true);
    setError("");
    
    try {
      const alertData = await getPublicHealthAlerts(locationName);
      setAlerts(alertData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch public health alerts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Info className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'outbreak': return 'bg-red-500';
      case 'vaccination': return 'bg-green-500';
      case 'advisory': return 'bg-blue-500';
      case 'weather': return 'bg-orange-500';
      default: return 'bg-gray-500';
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

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Public Health Alerts
              </h1>
              <p className="text-gray-600">
                Real-time health alerts and vaccination updates from government sources
              </p>
            </div>
          </div>

          {/* Location Search */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchAlerts()}
              />
            </div>
            <Button 
              onClick={() => fetchAlerts()}
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <Card key={alert.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(alert.type)} mt-2`}></div>
                      <div>
                        <CardTitle className="text-xl mb-2">{alert.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(alert.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getSeverityColor(alert.severity)} flex items-center gap-1`}>
                      {getSeverityIcon(alert.severity)}
                      {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{alert.description}</p>
                  
                  {alert.recommendations && alert.recommendations.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Recommendations:</h4>
                      <ul className="space-y-1">
                        {alert.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                            <CheckCircle className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Alerts</h3>
                <p className="text-gray-600">
                  No public health alerts for your area at this time.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Alert Categories */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Alert Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-red-900">Disease Outbreaks</div>
                  <div className="text-sm text-red-700">Infectious disease alerts</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-green-900">Vaccination</div>
                  <div className="text-sm text-green-700">Immunization updates</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-blue-900">Health Advisory</div>
                  <div className="text-sm text-blue-700">General health guidance</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-orange-900">Weather Health</div>
                  <div className="text-sm text-orange-700">Weather-related alerts</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}