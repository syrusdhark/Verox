import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, TrendingUp, Shield, Users, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import veroLogo from 'figma:asset/1a29221577cf591b7faa7cb6c6c272ef9611797d.png';
import { CursorTrail } from './CursorTrail';

export function VeroHomePage() {
  const [counts, setCounts] = useState({ revenue: 0, franchises: 0, satisfaction: 0 });
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
        revenue: Math.floor(250 * progress),
        franchises: Math.floor(500 * progress),
        satisfaction: Math.floor(98 * progress),
      });

      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Proven Business Model',
      description: 'Join a system that generates consistent returns with industry-leading profitability metrics.',
    },
    {
      icon: Shield,
      title: 'Comprehensive Support',
      description: 'Receive end-to-end training, marketing support, and ongoing operational guidance.',
    },
    {
      icon: Users,
      title: 'Exclusive Territory',
      description: 'Secure your protected market area and build your regional empire without competition.',
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      description: 'Launch your franchise in 90 days with our streamlined setup and turnkey solutions.',
    },
  ];

  const process = [
    { step: 1, title: 'Initial Inquiry', description: 'Submit your application and schedule a discovery call' },
    { step: 2, title: 'Qualification', description: 'Review franchise requirements and financial qualifications' },
    { step: 3, title: 'Discovery Day', description: 'Visit our headquarters and meet the leadership team' },
    { step: 4, title: 'Agreement', description: 'Sign the franchise agreement and secure your territory' },
    { step: 5, title: 'Training', description: 'Complete comprehensive training program' },
    { step: 6, title: 'Launch', description: 'Grand opening with full corporate support' },
  ];

  const faqs = [
    {
      question: 'What is the total investment required?',
      answer: 'The total investment ranges from $250,000 to $500,000, including franchise fee, equipment, real estate, and working capital. We offer financing options through our preferred lending partners.',
    },
    {
      question: 'What kind of support does VERO provide?',
      answer: 'We provide comprehensive support including site selection, build-out assistance, training programs, marketing materials, operational systems, and ongoing business consulting.',
    },
    {
      question: 'How long does it take to open a franchise?',
      answer: 'From signing the franchise agreement to opening day, the process typically takes 90-120 days, depending on real estate and construction timelines.',
    },
    {
      question: 'What are the ongoing fees?',
      answer: 'Franchisees pay a 6% royalty fee on gross sales and a 2% marketing fund contribution. These fees support ongoing operations, innovation, and national marketing campaigns.',
    },
    {
      question: 'Do I need prior business experience?',
      answer: 'While business experience is valuable, it\'s not required. We look for passionate entrepreneurs with strong leadership skills and financial qualifications. Our training program prepares you for success.',
    },
  ];

  return (
    <div className="vero-home">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background">
          {/* Cursor Trail Effect */}
          <CursorTrail />
          
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
                className="w-32 h-32 bg-card dark:bg-white rounded-2xl flex items-center justify-center border border-border"
              >
                <img src={veroLogo} alt="VERO" className="w-20 h-20" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-foreground text-background rounded-full text-sm"
              >
                VERO
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
            Build Your Empire
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
              with VERO
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Join the fastest-growing premium franchise network. Proven systems, exclusive territories, and unmatched support.
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
              className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8 h-14 min-w-[200px]"
            >
              Explore Opportunities
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 text-lg px-8 h-14 min-w-[200px]"
            >
              Schedule Call
            </Button>
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
      <section ref={statsRef} className="py-20 md:py-32 bg-card">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">Why Choose VERO?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-leading performance metrics that speak for themselves
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
                ${counts.revenue}M+
              </div>
              <div className="text-lg text-muted-foreground">Average Annual Revenue</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl mb-4">
                {counts.franchises}+
              </div>
              <div className="text-lg text-muted-foreground">Active Franchises</div>
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
              <div className="text-lg text-muted-foreground">Franchisee Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">Franchise Benefits</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed, all in one comprehensive package
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

      {/* Process Timeline */}
      <section className="py-20 md:py-32 bg-card">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">Your Path to Success</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A proven 6-step process to franchise ownership
            </p>
          </motion.div>

          <div className="space-y-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 md:p-8 bg-background/50 backdrop-blur-sm border border-border rounded-2xl hover:bg-muted/50 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-foreground text-background rounded-xl flex items-center justify-center text-2xl">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.description}</p>
                </div>
                <CheckCircle className="flex-shrink-0 w-6 h-6 text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Get answers to common questions about VERO franchising
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-2 rounded-xl px-6 hover:border-foreground transition-colors"
                >
                  <AccordionTrigger className="text-left text-lg hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
              Ready to Build Your Legacy?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join the VERO family and start your journey to franchise ownership today
            </p>
            <Button
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90 text-lg px-12 h-16"
            >
              Start Your Application
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
