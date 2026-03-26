import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import CustomCursor from './components/ui/CustomCursor';

// Public pages
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Quote from './pages/Quote';
import Contact from './pages/Contact';

// Admin pages
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPortfolio from './pages/admin/Portfolio';
import AdminBookings from './pages/admin/Bookings';
import AdminQuotes from './pages/admin/Quotes';

import ProtectedRoute from './components/ui/ProtectedRoute';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <CustomCursor />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/portfolio" element={<AdminPortfolio />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/quotes" element={<AdminQuotes />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}
