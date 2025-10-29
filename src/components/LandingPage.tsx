import { Button } from "./ui/button";
import { TrendingUp, Users, Zap, Menu, X, Sun, Moon, ArrowRight, ChevronDown, Shield, CheckCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../lib/theme-context";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./ui/card";
import veroLogo from "figma:asset/1a29221577cf591b7faa7cb6c6c272ef9611797d.png";

interface LandingPageProps {
  onGetStarted: () => void;
  onGoToDashboard?: () => void;
}

export function LandingPage({ onGetStarted, onGoToDashboard }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [counts, setCounts] = useState({ franchises: 0, matches: 0, satisfaction: 0 });
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Animated counter
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsVisible) {
          setStatsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [statsVisible]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        franchises: Math.floor(500 * progress),
        matches: Math.floor(10000 * progress),
        satisfaction: Math.floor(98 * progress),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'AI-Powered Matching',
      description: 'Our intelligent system analyzes your profile to find the perfect franchise opportunities tailored to your goals.',
    },
    {
      icon: Shield,
      title: 'Verified Opportunities',
      description: 'Every franchise listing is thoroughly vetted to ensure legitimacy and quality standards.',
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Connect with franchise consultants who understand your vision and guide you through the process.',
    },
    {
      icon: Zap,
      title: 'Streamlined Process',
      description: 'From discovery to ownership, we simplify every step of your franchise journey.',
    },
  ];

  const features = [
    'Personalized franchise recommendations',
    'Real-time market insights',
    'Direct communication with franchisors',
    'Investment analysis tools',
    'Territory availability tracking',
    'Legal document assistance',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-border">
                <img src={veroLogo} alt="VeroX AI" className="w-8 h-8" />
              </div>
              <span className="text-2xl tracking-tight text-foreground">VeroX AI</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Benefits
              </a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
              {onGoToDashboard && (
                <Button
                  variant="ghost"
                  onClick={onGoToDashboard}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Owner Portal
                </Button>
              )}
              <Button
                onClick={onGetStarted}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Start Conversation
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
              <button
                className="p-2 text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden py-4 border-t border-border overflow-hidden"
              >
                <div className="flex flex-col gap-4">
                  <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </a>
                  <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    How It Works
                  </a>
                  <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Benefits
                  </a>
                  <div className="pt-4 border-t border-border flex flex-col gap-2">
                    {onGoToDashboard && (
                      <Button
                        variant="ghost"
                        onClick={onGoToDashboard}
                        className="w-full justify-start"
                      >
                        Owner Portal
                      </Button>
                    )}
                    <Button
                      onClick={onGetStarted}
                      className="w-full bg-foreground text-background hover:bg-foreground/90"
                    >
                      Start Conversation
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background">
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted-foreground rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 py-32 text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-12 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(0,0,0,0.1)',
                    '0 0 60px rgba(0,0,0,0.3)',
                    '0 0 20px rgba(0,0,0,0.1)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 bg-card rounded-xl flex items-center justify-center border border-border"
              >
                <img src={veroLogo} alt="VeroX AI" className="w-12 h-12" />
              </motion.div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight"
          >
            Find Your Perfect
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
              Franchise Match
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            AI-powered platform connecting aspiring entrepreneurs with verified franchise opportunities. Start your journey to business ownership today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8 h-14 min-w-[220px]"
            >
              Start Conversation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {onGoToDashboard && (
              <Button
                size="lg"
                variant="outline"
                onClick={onGoToDashboard}
                className="border-2 text-lg px-8 h-14 min-w-[220px]"
              >
                Owner Portal
              </Button>
            )}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="features" ref={statsRef} className="py-20 md:py-32 bg-card">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join a growing community of successful franchise owners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl mb-4">
                {counts.franchises}+
              </div>
              <div className="text-lg text-muted-foreground">Franchise Brands</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl mb-4">
                {counts.matches.toLocaleString()}+
              </div>
              <div className="text-lg text-muted-foreground">Successful Matches</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl mb-4">
                {counts.satisfaction}%
              </div>
              <div className="text-lg text-muted-foreground">User Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 md:py-32 bg-background">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">Why Choose VeroX AI</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to find and secure your ideal franchise opportunity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 hover:border-foreground transition-colors duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-foreground text-background rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl mb-4">{benefit.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32 bg-card">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">Simple 3-Step Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From conversation to franchise ownership
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Start Conversation', description: 'Chat with our AI to discuss your goals, budget, and preferences' },
              { step: 2, title: 'Get Matched', description: 'Receive personalized franchise recommendations based on your profile' },
              { step: 3, title: 'Connect & Launch', description: 'Connect with franchisors and begin your ownership journey' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-foreground text-background rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive tools to support your franchise search
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-foreground transition-colors">
                <div className="flex-shrink-0 w-6 h-6 bg-foreground text-background rounded flex items-center justify-center mt-1">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-card via-muted to-card">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Begin your conversation with our AI assistant and discover franchise opportunities perfectly matched to your goals
            </p>
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-foreground text-background hover:bg-foreground/90 text-lg px-12 h-16"
            >
              Start Conversation Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center border border-border">
              <img src={veroLogo} alt="VeroX AI" className="w-6 h-6" />
            </div>
            <span className="text-xl text-foreground">VeroX AI</span>
          </div>
          <p className="text-muted-foreground">
            © 2025 VeroX AI. Empowering entrepreneurs to find their perfect franchise match.
          </p>
        </div>
      </footer>
    </div>
  );
}
