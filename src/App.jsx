import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Pages
import Home from './pages/Home';
import Pipeline from './pages/Pipeline';
import Metrics from './pages/Metrics';
import Office from './pages/Office';
import OnSite from './pages/OnSite';
import FAQ from './pages/FAQ';
import Training from './pages/Training';
import SocialMedia from './pages/SocialMedia';
import SocialPostCreation from './pages/SocialPostCreation';
import CompetitorCarousel from './pages/CompetitorCarousel';
import Documents from './pages/Documents';
import Settings from './pages/Settings';

// Office Tools
import PhoneScripts from './pages/PhoneScripts';
import EmailTemplates from './pages/EmailTemplates';
import RoutePlanning from './pages/RoutePlanning';
import RoofMeasurement from './pages/RoofMeasurement';
import CalendarPage from './pages/Calendar';
import PostcodeMap from './pages/PostcodeMap';
import CheckWeather from './pages/CheckWeather';
import QuoteBuilder from './pages/QuoteBuilder';
import CustomerDatabase from './pages/CustomerDatabase';
import DailyNotepad from './pages/DailyNotepad';
import SocialTemplates from './pages/SocialTemplates';
import OfficeTraining from './pages/OfficeTraining';
import TakeAPicture from './pages/TakeAPicture';
import Attendance from './pages/Attendance';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex h-screen bg-gray-200">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pipeline" element={<Pipeline />} />
                    <Route path="/metrics" element={<Metrics />} />
                    <Route path="/office" element={<Office />} />
                    <Route path="/onsite" element={<OnSite />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/training" element={<Training />} />
                    <Route path="/social" element={<SocialMedia />} />
                    <Route path="/competitor-carousel" element={<CompetitorCarousel />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/settings" element={<Settings />} />
                
                {/* Office Tools */}
                <Route path="/office/phone-scripts" element={<PhoneScripts />} />
                <Route path="/office/email-templates" element={<EmailTemplates />} />
                <Route path="/office/route-planning" element={<RoutePlanning />} />
                <Route path="/office/roof-measurement" element={<RoofMeasurement />} />
                    <Route path="/office/calendar" element={<CalendarPage />} />
                <Route path="/office/postcode-map" element={<PostcodeMap />} />
                <Route path="/office/check-weather" element={<CheckWeather />} />
                <Route path="/office/quote-builder" element={<QuoteBuilder />} />
                <Route path="/office/customer-database" element={<CustomerDatabase />} />
                <Route path="/office/daily-notepad" element={<DailyNotepad />} />
                <Route path="/office/training" element={<OfficeTraining />} />
                <Route path="/office/attendance" element={<Attendance />} />
                <Route path="/training/office" element={<OfficeTraining />} />
                <Route path="/social/templates" element={<SocialTemplates />} />
                <Route path="/social/post-creation" element={<SocialPostCreation />} />
                <Route path="/onsite/take-picture" element={<TakeAPicture />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
