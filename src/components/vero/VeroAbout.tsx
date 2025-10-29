import { motion } from 'motion/react';
import { Target, Award, Globe, Users2, TrendingUp, Heart } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export function VeroAbout() {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We set the highest standards in everything we do, from operations to customer service.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Transparency and honesty guide every decision and partnership we forge.',
    },
    {
      icon: Users2,
      title: 'Partnership',
      description: 'Your success is our success. We grow together as a unified network.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Constantly evolving our systems to stay ahead in a competitive market.',
    },
  ];

  const milestones = [
    { year: '2015', title: 'Founded', description: 'VERO launched with a vision to revolutionize the industry' },
    { year: '2017', title: 'First Franchise', description: 'Successfully opened our first franchise location' },
    { year: '2019', title: '100 Locations', description: 'Reached 100 franchise locations nationwide' },
    { year: '2021', title: 'International', description: 'Expanded into international markets' },
    { year: '2023', title: '500+ Network', description: 'Grew to over 500 franchise partners globally' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as the #1 franchise in our category' },
  ];

  const support = [
    {
      title: 'Site Selection & Design',
      items: ['Real estate analysis', 'Lease negotiation support', 'Store design & layout', 'Construction oversight'],
    },
    {
      title: 'Training & Development',
      items: ['Initial training program', 'Ongoing education', 'Leadership development', 'Operations manuals'],
    },
    {
      title: 'Marketing & Branding',
      items: ['National campaigns', 'Local marketing support', 'Digital marketing tools', 'Brand assets'],
    },
    {
      title: 'Operations Support',
      items: ['Technology systems', 'Supply chain management', 'Quality assurance', '24/7 support hotline'],
    },
  ];

  return (
    <div className="vero-about pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-background via-muted to-background">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 backdrop-blur-sm rounded-full text-sm font-medium mb-8">
              <Award className="w-4 h-4" />
              <span>Award-Winning Franchise System</span>
            </div>
            <h1 className="text-5xl md:text-7xl mb-6">
              The VERO Opportunity
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Join a proven franchise system that empowers entrepreneurs to build thriving businesses with comprehensive support and exclusive market protection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-32 bg-card">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2015, VERO emerged from a simple yet powerful vision: to create a franchise system that truly puts partners first. Our founders, industry veterans with over 50 years of combined experience, recognized a gap in the market for a franchise that balanced profitability with genuine support.
                </p>
                <p>
                  From our first location to our current network of 500+ franchises worldwide, we've maintained unwavering commitment to our core principles: excellence, integrity, and partnership. Every system we've built, every process we've refined, has been designed with one goal in mind—your success.
                </p>
                <p>
                  Today, VERO stands as an industry leader, recognized not just for our financial performance but for the strength of our franchise relationships. We don't just sell franchises; we build lasting partnerships that create generational wealth.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="border-2">
                <CardContent className="p-6">
                  <Globe className="w-10 h-10 mb-4" />
                  <div className="text-4xl mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Global Locations</div>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-6">
                  <Users2 className="w-10 h-10 mb-4" />
                  <div className="text-4xl mb-2">5,000+</div>
                  <div className="text-sm text-muted-foreground">Team Members</div>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-6">
                  <Award className="w-10 h-10 mb-4" />
                  <div className="text-4xl mb-2">#1</div>
                  <div className="text-sm text-muted-foreground">Industry Ranking</div>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="p-6">
                  <TrendingUp className="w-10 h-10 mb-4" />
                  <div className="text-4xl mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision and drive our success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 hover:border-foreground transition-colors duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-foreground text-background rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl mb-4">{value.title}</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 bg-card">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones in building the premier franchise network
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-12 md:space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 0 ? 'md:pr-12' : 'md:pl-12 md:col-start-2'}>
                    <div className="text-5xl text-muted-foreground mb-2">{milestone.year}</div>
                    <h3 className="text-2xl mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground text-lg">{milestone.description}</p>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-foreground rounded-full border-4 border-card" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Comprehensive Support</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every tool, resource, and expert you need to thrive
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {support.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 hover:border-foreground transition-colors duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl mb-6">{category.title}</h3>
                    <ul className="space-y-3">
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-foreground text-background rounded flex items-center justify-center mt-0.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-lg text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
