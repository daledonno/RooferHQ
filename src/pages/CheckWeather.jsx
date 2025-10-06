import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye,
  MapPin,
  RefreshCw,
  AlertTriangle,
  Sunrise,
  Sunset,
  Gauge
} from 'lucide-react';

const CheckWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Liverpool weather data for the next week
  const liverpoolWeatherData = {
    location: 'Liverpool, UK',
    current: {
      temperature: 13,
      condition: 'Light Rain',
      humidity: 78,
      windSpeed: 18,
      visibility: 8,
      uvIndex: 2,
      pressure: 1013,
      sunrise: '07:45',
      sunset: '16:30',
      feelsLike: 11
    },
    forecast: [
      { 
        day: 'Today', 
        date: new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
        high: 14, 
        low: 8, 
        condition: 'Light Rain', 
        icon: 'rain',
        precipitation: 85,
        windSpeed: 18,
        description: 'Light rain throughout the day with moderate winds'
      },
      { 
        day: 'Tomorrow', 
        date: new Date(Date.now() + 86400000).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
        high: 12, 
        low: 6, 
        condition: 'Heavy Rain', 
        icon: 'rain',
        precipitation: 95,
        windSpeed: 22,
        description: 'Heavy rain expected, avoid outdoor work'
      },
      { 
        day: 'Wednesday', 
        date: new Date(Date.now() + 172800000).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
        high: 10, 
        low: 4, 
        condition: 'Cloudy', 
        icon: 'cloudy',
        precipitation: 20,
        windSpeed: 15,
        description: 'Overcast with light drizzle possible'
      },
      { 
        day: 'Thursday', 
        date: new Date(Date.now() + 259200000).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
        high: 11, 
        low: 5, 
        condition: 'Partly Cloudy', 
        icon: 'partly-cloudy',
        precipitation: 10,
        windSpeed: 12,
        description: 'Mixed clouds and sun, good for outdoor work'
      },
      { 
        day: 'Friday', 
        date: new Date(Date.now() + 345600000).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
        high: 13, 
        low: 7, 
        condition: 'Sunny', 
        icon: 'sunny',
        precipitation: 5,
        windSpeed: 8,
        description: 'Clear skies, excellent conditions for roofing work'
      },
      { 
        day: 'Saturday', 
        date: new Date(Date.now() + 432000000).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
        high: 15, 
        low: 9, 
        condition: 'Partly Cloudy', 
        icon: 'partly-cloudy',
        precipitation: 15,
        windSpeed: 10,
        description: 'Partly cloudy with light winds'
      },
      { 
        day: 'Sunday', 
        date: new Date(Date.now() + 518400000).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
        high: 16, 
        low: 10, 
        condition: 'Light Rain', 
        icon: 'rain',
        precipitation: 60,
        windSpeed: 14,
        description: 'Light rain in the afternoon'
      }
    ]
  };

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'sunny': Sun,
      'partly-cloudy': Cloud,
      'cloudy': Cloud,
      'rain': CloudRain,
      'snow': CloudSnow,
      'light-rain': CloudRain,
      'heavy-rain': CloudRain
    };
    return iconMap[condition] || Cloud;
  };

  const getWeatherColor = (condition) => {
    const colorMap = {
      'sunny': 'text-yellow-500',
      'partly-cloudy': 'text-blue-400',
      'cloudy': 'text-gray-500',
      'rain': 'text-blue-600',
      'snow': 'text-blue-300',
      'light-rain': 'text-blue-500',
      'heavy-rain': 'text-blue-700'
    };
    return colorMap[condition] || 'text-gray-500';
  };

  const getWorkRecommendation = (day) => {
    if (!day) return '';
    
    const temp = day.high;
    const condition = day.condition.toLowerCase();
    const windSpeed = day.windSpeed;
    const precipitation = day.precipitation;
    
    if (precipitation > 80) {
      return '⚠️ Avoid outdoor work - heavy rain expected';
    } else if (precipitation > 50) {
      return '⚠️ Light rain - consider postponing outdoor work';
    } else if (temp < 5) {
      return '❄️ Very cold - consider postponing outdoor work';
    } else if (windSpeed > 20) {
      return '💨 High winds - avoid working at heights';
    } else if (condition.includes('sunny') || (condition.includes('partly') && precipitation < 20)) {
      return '✅ Good conditions for outdoor roofing work';
    } else {
      return '⚠️ Check conditions before starting work';
    }
  };

  const getPrecipitationColor = (precipitation) => {
    if (precipitation > 80) return 'text-red-600';
    if (precipitation > 50) return 'text-orange-600';
    if (precipitation > 20) return 'text-yellow-600';
    return 'text-green-600';
  };

  useEffect(() => {
    // Simulate loading weather data
    setTimeout(() => {
      setWeatherData(liverpoolWeatherData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Liverpool weather...</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
              <p className="text-red-600 font-medium">Error loading weather data</p>
              <p className="text-gray-600 mt-2">{error}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!weatherData) return null;

  const today = weatherData.forecast[0];
  const weekForecast = weatherData.forecast.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Today's Weather - Emphasized */}
        <div className="bg-gradient-to-br from-accent/10 to-blue-50 rounded-2xl p-8 shadow-lg mb-8 border-2 border-accent/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Today in Liverpool</h2>
              <p className="text-gray-600">{today.date}</p>
            </div>
            <div className="flex items-center gap-2 text-accent">
              <MapPin size={20} />
              <span className="font-medium">Liverpool, UK</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Weather Display */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center">
                  {(() => {
                    const IconComponent = getWeatherIcon(today.icon);
                    return <IconComponent size={100} className={getWeatherColor(today.icon)} />;
                  })()}
                </div>
                <div>
                  <div className="text-7xl font-bold text-gray-800 mb-2">
                    {weatherData.current.temperature}°
                  </div>
                  <div className="text-2xl text-gray-600 mb-1">{today.condition}</div>
                  <div className="text-gray-500">Feels like {weatherData.current.feelsLike}°</div>
                </div>
              </div>
            </div>

            {/* Today's Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-800">{today.high}°</div>
                  <div className="text-sm text-gray-600">High</div>
                </div>
                <div className="bg-white/60 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-800">{today.low}°</div>
                  <div className="text-sm text-gray-600">Low</div>
                </div>
              </div>
              
              <div className="bg-white/60 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Precipitation</span>
                  <span className={`font-semibold ${getPrecipitationColor(today.precipitation)}`}>
                    {today.precipitation}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${today.precipitation > 50 ? 'bg-red-500' : today.precipitation > 20 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${today.precipitation}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Work Recommendation for Today */}
          <div className="mt-6 p-4 bg-white/80 rounded-lg border-l-4 border-accent">
            <h3 className="font-semibold text-gray-800 mb-2">Today's Work Recommendation</h3>
            <p className="text-gray-700">{getWorkRecommendation(today)}</p>
            <p className="text-sm text-gray-600 mt-2">{today.description}</p>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">7-Day Forecast</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {weatherData.forecast.map((day, index) => {
              const IconComponent = getWeatherIcon(day.icon);
              const isToday = index === 0;
              
              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isToday 
                      ? 'bg-accent/10 border-accent shadow-lg' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold text-gray-800 mb-2">
                      {day.day}
                      {isToday && <span className="ml-2 text-xs bg-accent text-white px-2 py-1 rounded-full">TODAY</span>}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">{day.date}</div>
                    
                    <div className="flex items-center justify-center mb-3">
                      <IconComponent size={32} className={getWeatherColor(day.icon)} />
                    </div>
                    
                    <div className="text-lg font-bold text-gray-800 mb-1">
                      {day.high}° / {day.low}°
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">{day.condition}</div>
                    
                    <div className="space-y-1 text-xs text-gray-700">
                      <div className="flex justify-between">
                        <span>Rain:</span>
                        <span className={getPrecipitationColor(day.precipitation)}>
                          {day.precipitation}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wind:</span>
                        <span className="text-gray-700">{day.windSpeed} km/h</span>
                      </div>
                    </div>
                    
                    {!isToday && (
                      <div className="mt-3 p-2 bg-white rounded text-xs text-gray-600">
                        {getWorkRecommendation(day)}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Current Conditions Details */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Current Conditions</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Droplets className="text-blue-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-gray-800">{weatherData.current.humidity}%</div>
              <div className="text-sm text-gray-600">Humidity</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Wind className="text-gray-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-gray-800">{weatherData.current.windSpeed} km/h</div>
              <div className="text-sm text-gray-600">Wind Speed</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Eye className="text-green-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-gray-800">{weatherData.current.visibility} km</div>
              <div className="text-sm text-gray-600">Visibility</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <Gauge className="text-orange-500 mx-auto mb-2" size={24} />
              <div className="text-2xl font-bold text-gray-800">{weatherData.current.pressure} hPa</div>
              <div className="text-sm text-gray-600">Pressure</div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sunrise className="text-yellow-500" size={20} />
                <span className="text-gray-700">Sunrise</span>
              </div>
              <span className="font-semibold">{weatherData.current.sunrise}</span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sunset className="text-orange-500" size={20} />
                <span className="text-gray-700">Sunset</span>
              </div>
              <span className="font-semibold">{weatherData.current.sunset}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckWeather;
