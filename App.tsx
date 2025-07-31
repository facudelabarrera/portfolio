'use client';

import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import CTASection from './components/CTASection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Analytics from './components/Analytics';
import AdminPanel from './components/AdminPanel';
import ConfigurationBanner from './components/ConfigurationBanner';

export default function App() {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          const navHeight = 80;
          const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listener to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Cleanup event listeners
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-['Geist',sans-serif] dark">
      {/* Configuration Banner - Shows only when Supabase is not configured */}
      <ConfigurationBanner />

      {/* Analytics Tracking */}
      <Analytics />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services />

        {/* Projects Section - Now powered by Supabase */}
        <Projects />

        {/* CTA Section */}
        <CTASection />

        {/* Contact Section - Now powered by Supabase */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Admin Panel - Hidden by default, toggle with Ctrl+Shift+A */}
      <AdminPanel />
    </div>
  );
}