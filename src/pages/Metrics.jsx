import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  HardHat, 
  DollarSign, 
  Star, 
  Target,
  ArrowUp,
  ArrowDown,
  Minus,
  Banknote,
  Brain,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const Metrics = () => {
  // Example data - in production this would come from APIs/CRM
  const kpiData = [
    {
      id: 'leads-this-week',
      title: 'Leads This Week',
      value: 25,
      target: 25,
      unit: '',
      icon: Users,
      color: 'blue',
      trend: 'up',
      trendValue: '+12%',
      description: 'New leads generated this week'
    },
    {
      id: 'conversion-rate',
      title: 'Conversion Rate',
      value: 40,
      target: 40,
      unit: '%',
      icon: Target,
      color: 'green',
      trend: 'up',
      trendValue: '+3%',
      description: 'Percentage of leads converted to customers'
    },
    {
      id: 'jobs-on-site',
      title: 'Jobs On Site Now',
      value: 8,
      target: 10,
      unit: '',
      icon: HardHat,
      color: 'orange',
      trend: 'down',
      trendValue: '-2',
      description: 'Active roofing projects currently in progress'
    },
    {
      id: 'invoices-paid',
      title: 'Invoices Paid (%)',
      value: 85,
      target: 90,
      unit: '%',
      icon: DollarSign,
      color: 'purple',
      trend: 'up',
      trendValue: '+5%',
      description: 'Percentage of invoices paid on time'
    },
    {
      id: 'profit-margin',
      title: 'Profit Margin',
      value: 30,
      target: 35,
      unit: '%',
      icon: TrendingUp,
      color: 'emerald',
      trend: 'neutral',
      trendValue: '0%',
      description: 'Current profit margin across all projects'
    },
    {
      id: 'customer-rating',
      title: 'Customer Rating',
      value: 4.8,
      target: 4.5,
      unit: '/5',
      icon: Star,
      color: 'yellow',
      trend: 'up',
      trendValue: '+0.2',
      description: 'Average customer satisfaction rating'
    },
    {
      id: 'revenue-generated',
      title: 'Revenue Generated',
      value: 125000,
      target: 150000,
      unit: '',
      icon: Banknote,
      color: 'emerald',
      trend: 'up',
      trendValue: '+8%',
      description: 'Total revenue generated this month'
    }
  ];

  // AI Insights Data
  const aiInsights = {
    summary: {
      overallScore: 87,
      trend: 'up',
      trendValue: '+5%',
      lastUpdated: '2 minutes ago'
    },
    keyInsights: [
      {
        id: 'revenue-optimization',
        type: 'opportunity',
        priority: 'high',
        title: 'Revenue Optimization Opportunity',
        description: 'Your conversion rate is 15% above industry average, but lead volume is 20% below target. Focus on lead generation to maximize revenue potential.',
        impact: 'Could increase monthly revenue by $18,000',
        confidence: 94,
        icon: TrendingUp,
        color: 'green'
      },
      {
        id: 'seasonal-pattern',
        type: 'insight',
        priority: 'medium',
        title: 'Seasonal Performance Pattern Detected',
        description: 'Roofing projects peak in March-May and September-November. Current metrics suggest you\'re in the optimal season for scaling operations.',
        impact: 'Historical data shows 35% higher conversion rates during this period',
        confidence: 89,
        icon: BarChart3,
        color: 'blue'
      },
      {
        id: 'customer-satisfaction',
        type: 'success',
        priority: 'low',
        title: 'Exceptional Customer Satisfaction',
        description: 'Your 4.8/5 rating is in the top 5% of roofing companies. This high satisfaction correlates with 40% higher referral rates.',
        impact: 'Strong foundation for organic growth through referrals',
        confidence: 96,
        icon: Star,
        color: 'yellow'
      },
      {
        id: 'efficiency-alert',
        type: 'warning',
        priority: 'high',
        title: 'Project Efficiency Alert',
        description: 'Average project completion time has increased by 12% this month. Weather delays and material shortages are the primary factors.',
        impact: 'Could impact 3 upcoming projects worth $45,000',
        confidence: 87,
        icon: AlertTriangle,
        color: 'orange'
      }
    ],
    recommendations: [
      {
        id: 'lead-generation',
        title: 'Boost Lead Generation',
        description: 'Implement targeted Google Ads campaigns for "roofing services" in your service area',
        expectedImpact: '+25% lead volume',
        timeframe: '2-4 weeks',
        effort: 'Medium',
        icon: Users,
        color: 'blue'
      },
      {
        id: 'weather-planning',
        title: 'Weather-Responsive Scheduling',
        description: 'Use weather forecasting to optimize project scheduling and reduce delays',
        expectedImpact: '-30% weather-related delays',
        timeframe: '1-2 weeks',
        effort: 'Low',
        icon: Activity,
        color: 'green'
      },
      {
        id: 'referral-program',
        title: 'Customer Referral Program',
        description: 'Launch a structured referral program to capitalize on high satisfaction ratings',
        expectedImpact: '+15% new customers from referrals',
        timeframe: '3-4 weeks',
        effort: 'Medium',
        icon: Star,
        color: 'purple'
      }
    ],
    predictions: [
      {
        metric: 'Monthly Revenue',
        current: '$125k',
        predicted: '$142k',
        timeframe: 'Next 30 days',
        confidence: 91,
        trend: 'up'
      },
      {
        metric: 'Lead Volume',
        current: '25/week',
        predicted: '32/week',
        timeframe: 'Next 2 weeks',
        confidence: 85,
        trend: 'up'
      },
      {
        metric: 'Project Completion Rate',
        current: '78%',
        predicted: '85%',
        timeframe: 'Next month',
        confidence: 88,
        trend: 'up'
      }
    ]
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-white',
      green: 'bg-green-500 text-white',
      orange: 'bg-orange-500 text-white',
      purple: 'bg-purple-500 text-white',
      emerald: 'bg-emerald-500 text-white',
      yellow: 'bg-yellow-500 text-white'
    };
    return colors[color] || 'bg-gray-500 text-white';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUp size={16} className="text-green-500" />;
      case 'down':
        return <ArrowDown size={16} className="text-red-500" />;
      default:
        return <Minus size={16} className="text-gray-500" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-7xl mx-auto"
    >

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(kpi.color)}`}>
                <kpi.icon size={24} />
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(kpi.trend)}
                <span className={`text-sm font-medium ${getTrendColor(kpi.trend)}`}>
                  {kpi.trendValue}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{kpi.title}</h3>

            {/* Value */}
            <div className="mb-3">
              <span className="text-3xl font-bold text-gray-800">
                {kpi.id === 'revenue-generated' ? `$${(kpi.value / 1000).toFixed(0)}k` : kpi.value}
              </span>
              <span className="text-lg text-gray-600 ml-1">{kpi.unit}</span>
            </div>

            {/* Target */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Target: {kpi.id === 'revenue-generated' ? `$${(kpi.target / 1000).toFixed(0)}k` : `${kpi.target}${kpi.unit}`}</span>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                  <div 
                    className={`h-2 rounded-full ${getColorClasses(kpi.color).split(' ')[0]}`}
                    style={{ 
                      width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` 
                    }}
                  />
                </div>
                <span className="text-gray-600 text-xs">
                  {Math.round((kpi.value / kpi.target) * 100)}%
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-3">{kpi.description}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Insights Module */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 shadow-lg">
          {/* AI Insights Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Brain size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">AI Business Insights</h2>
                <p className="text-gray-600">Powered by advanced analytics and machine learning</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live Analysis</span>
              </div>
              <div className="text-sm text-gray-500">Updated {aiInsights.summary.lastUpdated}</div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Lightbulb size={20} className="text-yellow-500 mr-2" />
                Key Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {aiInsights.keyInsights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 border-l-4 ${
                      insight.type === 'opportunity' ? 'border-green-400' :
                      insight.type === 'warning' ? 'border-orange-400' :
                      insight.type === 'success' ? 'border-blue-400' :
                      'border-purple-400'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <insight.icon size={16} className={`${
                          insight.color === 'green' ? 'text-green-500' :
                          insight.color === 'orange' ? 'text-orange-500' :
                          insight.color === 'blue' ? 'text-blue-500' :
                          'text-yellow-500'
                        }`} />
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                          insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {insight.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">{insight.confidence}% confidence</div>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                      <strong>Impact:</strong> {insight.impact}
                    </div>
                  </motion.div>
                ))}
              </div>
          </div>

          {/* Recommendations and Predictions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Zap size={20} className="text-blue-500 mr-2" />
                AI Recommendations
              </h3>
              <div className="space-y-4">
                {aiInsights.recommendations.map((rec, index) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        rec.color === 'blue' ? 'bg-blue-100' :
                        rec.color === 'green' ? 'bg-green-100' :
                        'bg-purple-100'
                      }`}>
                        <rec.icon size={20} className={`${
                          rec.color === 'blue' ? 'text-blue-600' :
                          rec.color === 'green' ? 'text-green-600' :
                          'text-purple-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{rec.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <TrendingUp size={12} className="mr-1" />
                            {rec.expectedImpact}
                          </span>
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            {rec.timeframe}
                          </span>
                          <span className="flex items-center">
                            <Activity size={12} className="mr-1" />
                            {rec.effort} effort
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Predictions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <PieChart size={20} className="text-green-500 mr-2" />
                Predictive Analytics
              </h3>
              <div className="space-y-4">
                {aiInsights.predictions.map((pred, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{pred.metric}</h4>
                      <div className="flex items-center space-x-1">
                        <ArrowUp size={14} className="text-green-500" />
                        <span className="text-xs text-green-600 font-medium">{pred.confidence}% confidence</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Current</div>
                        <div className="text-lg font-semibold text-gray-800">{pred.current}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">{pred.timeframe}</div>
                        <div className="text-2xl">→</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Predicted</div>
                        <div className="text-lg font-semibold text-green-600">{pred.predicted}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Integration Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Live Data Integration</h3>
            <p className="text-blue-700 mb-4">
              Currently showing example data. To connect real-time metrics, integrate with:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-800 mb-1">Google Sheets</h4>
                <p className="text-blue-700 text-sm">CRM data, lead tracking, job status</p>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-800 mb-1">Analytics</h4>
                <p className="text-blue-700 text-sm">Website traffic, conversion rates</p>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                <h4 className="font-semibold text-blue-800 mb-1">CRM System</h4>
                <p className="text-blue-700 text-sm">Customer data, project management</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Metrics;
