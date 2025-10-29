import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';

export function VeroStories() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      name: 'Michael Rodriguez',
      location: 'Miami, FL',
      franchiseAge: '3 years',
      revenue: '$1.8M annually',
      quote: 'VERO transformed my life. Coming from corporate America, I was skeptical about franchise ownership, but the comprehensive support system and proven business model made all the difference. Within 18 months, I exceeded my revenue projections.',
      image: 'MR',
      rating: 5,
    },
    {
      name: 'Sarah Chen',
      location: 'Austin, TX',
      franchiseAge: '2 years',
      revenue: '$1.5M annually',
      quote: 'The training program was exceptional, and the ongoing support is unmatched. I went from having zero business experience to running a successful franchise. The VERO team treats you like family, not just a number.',
      image: 'SC',
      rating: 5,
    },
    {
      name: 'David Thompson',
      location: 'Denver, CO',
      franchiseAge: '5 years',
      revenue: '$2.3M annually',
      quote: 'I own three VERO franchises now. The scalability and territory protection allow for strategic growth. The corporate support team is always innovating, keeping us ahead of the competition.',
      image: 'DT',
      rating: 5,
    },
    {
      name: 'Jennifer Martinez',
      location: 'Seattle, WA',
      franchiseAge: '1 year',
      revenue: '$1.2M annually',
      quote: 'As a first-time business owner, I was nervous. The VERO team guided me through every step. The marketing support and operational systems are incredible. I hit profitability in just 8 months.',
      image: 'JM',
      rating: 5,
    },
  ];

  const successMetrics = [
    {
      metric: '98%',
      label: 'Franchisee Satisfaction',
      description: 'Based on annual surveys',
    },
    {
      metric: '85%',
      label: 'Year-Over-Year Growth',
      description: 'Average revenue increase',
    },
    {
      metric: '12',
      label: 'Months to Profitability',
      description: 'Average breakeven timeline',
    },
    {
      metric: '15+',
      label: 'Industry Awards',
      description: 'Recognition for excellence',
    },
  ];

  const journeys = [
    {
      name: 'Robert Kim',
      title: 'From Teacher to Multi-Unit Owner',
      background: 'Former high school teacher',
      story: 'After 15 years in education, Robert took a leap of faith. Starting with one location in 2019, he now operates four thriving VERO franchises, employing over 80 people and generating over $6M in combined annual revenue.',
      results: ['4 Locations', '$6M+ Revenue', '80+ Employees', 'Regional Leader'],
    },
    {
      name: 'Amanda Foster',
      title: 'Military Veteran Success Story',
      background: 'U.S. Air Force Veteran',
      story: 'Amanda leveraged her military discipline and leadership skills to build a VERO empire. The structured systems and clear processes reminded her of military operations. She achieved profitability in record time.',
      results: ['Record Profitability', 'Community Leader', 'Award Winner', 'Mentor to New Franchisees'],
    },
    {
      name: 'Carlos & Maria Gonzalez',
      title: 'Husband-Wife Partnership',
      background: 'Former restaurant managers',
      story: 'The Gonzalez family turned their restaurant management experience into franchise ownership. With VERO\'s proven systems, they streamlined operations while maintaining personal touch that customers love.',
      results: ['Family Business', 'Above-Average Sales', 'Customer Satisfaction Leader', 'Growing to 2nd Location'],
    },
  ];

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const nextTestimonial = () => {
    setAutoplay(false);
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setAutoplay(false);
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="vero-stories pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8">
              <Award className="w-4 h-4" />
              <span>Real Success Stories</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Franchisee Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              Meet the entrepreneurs who've transformed their lives with VERO franchise ownership
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-20 md:py-32 bg-white text-black">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-2 border-gray-200">
                  <CardContent className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-3 gap-12 items-center">
                      {/* Testimonial Content */}
                      <div className="lg:col-span-2">
                        <Quote className="w-12 h-12 text-black/20 mb-6" />
                        
                        <div className="flex gap-1 mb-6">
                          {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-black text-black" />
                          ))}
                        </div>

                        <p className="text-2xl md:text-3xl leading-relaxed mb-8 text-black/90">
                          "{testimonials[activeTestimonial].quote}"
                        </p>

                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="text-xl font-bold">
                              {testimonials[activeTestimonial].image}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-xl">{testimonials[activeTestimonial].name}</div>
                            <div className="text-black/60">{testimonials[activeTestimonial].location}</div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-6">
                        <div className="p-6 bg-gray-50 rounded-xl">
                          <div className="text-sm text-black/60 mb-1">Franchise Age</div>
                          <div className="text-2xl font-bold">{testimonials[activeTestimonial].franchiseAge}</div>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-xl">
                          <div className="text-sm text-black/60 mb-1">Annual Revenue</div>
                          <div className="text-2xl font-bold">{testimonials[activeTestimonial].revenue}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="h-12 w-12 rounded-full border-2"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveTestimonial(index);
                      setAutoplay(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? 'w-8 bg-black' : 'w-2 bg-black/20'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="h-12 w-12 rounded-full border-2"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-100 text-black">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">By The Numbers</h2>
            <p className="text-xl text-black/60">
              Success metrics that speak for themselves
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {successMetrics.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-black transition-colors text-center">
                  <CardContent className="p-8">
                    <div className="text-5xl font-bold mb-3">{item.metric}</div>
                    <div className="font-semibold text-lg mb-2">{item.label}</div>
                    <div className="text-sm text-black/60">{item.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Stories */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Transformation Journeys</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Inspiring stories of entrepreneurs who built their dreams with VERO
            </p>
          </motion.div>

          <div className="space-y-12">
            {journeys.map((journey, index) => (
              <motion.div
                key={journey.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-2 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-8 md:p-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm mb-4">
                            {journey.background}
                          </div>
                          <h3 className="text-3xl font-bold mb-2">{journey.name}</h3>
                          <p className="text-xl text-white/80">{journey.title}</p>
                        </div>
                        <p className="text-lg text-white/70 leading-relaxed">
                          {journey.story}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="font-semibold text-white/80 mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Key Achievements
                        </div>
                        {journey.results.map((result) => (
                          <div
                            key={result}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                          >
                            <div className="w-6 h-6 bg-white text-black rounded flex items-center justify-center flex-shrink-0">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span>{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-white text-black">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Write Your Success Story
            </h2>
            <p className="text-xl text-black/70 mb-12 max-w-2xl mx-auto">
              Join hundreds of successful VERO franchise owners building their legacy
            </p>
            <Button
              size="lg"
              className="bg-black text-white hover:bg-black/90 text-lg px-12 h-16 font-semibold"
            >
              Start Your Journey Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
