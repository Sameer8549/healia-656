import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { getAirQuality, getWeather } from "@/lib/api";
import {
  ArrowLeft,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MapPin,
  RefreshCw,
  Loader2,
} from "lucide-react";

export default function AirQuality() {
  const [city, setCity] = useState("Delhi");
  const [airData, setAirData] = useState<any>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (cityName: string = city) => {
    setLoading(true);
    setError("");
    
    try {
      const [air, weather] = await Promise.all([
        getAirQuality(cityName),
        getWeather(cityName)
      ]);
      
      setAirData(air);
      setWeatherData(weather);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: 'Good', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
    if (aqi <= 100) return { status: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertTriangle };
    if (aqi <= 150) return { status: 'Unhealthy for Sensitive', color: 'text-orange-600', bg: 'bg-orange-50', icon: AlertTriangle };
    if (aqi <= 200) return { status: 'Unhealthy', color: 'text-red-600', bg: 'bg-red-50', icon: XCircle };
    if (aqi <= 300) return { status: 'Very Unhealthy', color: 'text-purple-600', bg: 'bg-purple-50', icon: XCircle };
    return { status: 'Hazardous', color: 'text-red-800', bg: 'bg-red-100', icon: XCircle };
  };

  const getHealthAdvice = (aqi: number) => {
    if (aqi <= 50) return [
      "Air quality is good. Enjoy outdoor activities!",
      "Perfect time for morning walks and exercise",
      "Windows can be kept open for fresh air"
    ];
    if (aqi <= 100) return [
      "Air quality is acceptable for most people",
      "Sensitive individuals should limit prolonged outdoor activities",
      "Consider wearing a mask during heavy traffic hours"
    ];
    if (aqi <= 150) return [
      "Unhealthy for sensitive groups (children, elderly, heart/lung conditions)",
      "Limit outdoor activities if you experience symptoms",
      "Keep windows closed and use air purifiers indoors"
    ];
    if (aqi <= 200) return [
      "Everyone should limit outdoor activities",
      "Wear N95 masks when going outside",
      "Keep windows closed and use air purifiers",
      "Avoid outdoor exercise"
    ];
    return [
      "Health alert: everyone may experience serious health effects",
      "Avoid all outdoor activities",
      "Stay indoors with air purifiers running",
      "Seek medical attention if experiencing breathing difficulties"
    ];
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
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Air Quality & Weather
              </h1>
              <p className="text-gray-600">
                Real-time air quality and weather data from CPCB & IMD
              </p>
            </div>
          </div>

          {/* City Search */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchData()}
              />
            </div>
            <Button 
              onClick={() => fetchData()}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700"
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

        {airData && weatherData && (
          <div className="space-y-6">
            {/* Current Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Air Quality */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-teal-600" />
                    Air Quality Index
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-gray-900 mb-2">
                      {airData.aqi}
                    </div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getAQIStatus(airData.aqi).bg}`}>
                      {(() => {
                        const IconComponent = getAQIStatus(airData.aqi).icon;
                        return <IconComponent className={`w-5 h-5 ${getAQIStatus(airData.aqi).color}`} />;
                      })()}
                      <span className={`font-medium ${getAQIStatus(airData.aqi).color}`}>
                        {getAQIStatus(airData.aqi).status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{airData.pm25}</div>
                      <div className="text-sm text-gray-600">PM2.5</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{airData.pm10}</div>
                      <div className="text-sm text-gray-600">PM10</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{airData.city}</span>
                    <span>•</span>
                    <span>{new Date(airData.timestamp).toLocaleTimeString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Weather */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-blue-600" />
                    Weather Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-gray-900 mb-2">
                      {weatherData.temperature}°C
                    </div>
                    <div className="text-lg text-gray-600">
                      {weatherData.condition}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium">{weatherData.humidity}%</div>
                        <div className="text-sm text-gray-600">Humidity</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Wind className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="font-medium">{weatherData.windSpeed} km/h</div>
                        <div className="text-sm text-gray-600">Wind Speed</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{weatherData.city}</span>
                    <span>•</span>
                    <span>{new Date(weatherData.timestamp).toLocaleTimeString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Health Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-health-600" />
                  Health Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getHealthAdvice(airData.aqi).map((advice, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-health-600 rounded-full mt-2"></div>
                      <p className="text-gray-700">{advice}</p>
                    </div>
                  ))}
                </div>

                {airData.aqi > 100 && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">
                      Special Precautions for Sensitive Groups
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Children and elderly should stay indoors</li>
                      <li>• People with asthma or heart conditions should avoid outdoor activities</li>
                      <li>• Pregnant women should take extra precautions</li>
                      <li>• Consider using air purifiers indoors</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AQI Scale Reference */}
            <Card>
              <CardHeader>
                <CardTitle>Air Quality Index Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { range: '0-50', status: 'Good', color: 'bg-green-500' },
                    { range: '51-100', status: 'Moderate', color: 'bg-yellow-500' },
                    { range: '101-150', status: 'Unhealthy for Sensitive', color: 'bg-orange-500' },
                    { range: '151-200', status: 'Unhealthy', color: 'bg-red-500' },
                    { range: '201-300', status: 'Very Unhealthy', color: 'bg-purple-500' },
                    { range: '301+', status: 'Hazardous', color: 'bg-red-800' },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-full h-4 ${item.color} rounded mb-2`}></div>
                      <div className="font-medium text-sm">{item.range}</div>
                      <div className="text-xs text-gray-600">{item.status}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}