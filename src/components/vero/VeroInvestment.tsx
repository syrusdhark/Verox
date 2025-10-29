import { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, TrendingUp, Calculator, ChevronRight, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export function VeroInvestment() {
  const [territory, setTerritory] = useState('metro');
  const [investment, setInvestment] = useState([350000]);

  const investmentBreakdown = [
    { category: 'Franchise Fee', amount: '$50,000', description: 'One-time initial franchise fee' },
    { category: 'Real Estate & Build-Out', amount: '$150,000 - $250,000', description: 'Location lease, construction, and fixtures' },
    { category: 'Equipment & Technology', amount: '$75,000 - $100,000', description: 'Point-of-sale, inventory, and operational systems' },
    { category: 'Initial Inventory', amount: '$25,000 - $40,000', description: 'Opening inventory and supplies' },
    { category: 'Working Capital', amount: '$50,000 - $100,000', description: 'Operating expenses for first 3 months' },
    { category: 'Training & Grand Opening', amount: '$15,000 - $25,000', description: 'Initial training and launch marketing' },
  ];

  const ongoingFees = [
    { fee: 'Royalty Fee', amount: '6% of gross sales', description: 'Ongoing support, systems, and innovation' },
    { fee: 'Marketing Fund', amount: '2% of gross sales', description: 'National and regional marketing campaigns' },
    { fee: 'Technology Fee', amount: '$500/month', description: 'POS system, software licenses, and updates' },
  ];

  const financingOptions = [
    {
      title: 'SBA Loans',
      description: 'Small Business Administration loans offering favorable terms and rates for qualified applicants.',
      benefits: ['Up to 90% financing', 'Competitive interest rates', 'Extended repayment terms'],
    },
    {
      title: 'Preferred Lenders',
      description: 'Our network of franchise-friendly lenders who understand the VERO business model.',
      benefits: ['Streamlined approval', 'Franchise-specific programs', 'Expert guidance'],
    },
    {
      title: 'Retirement Fund (ROBS)',
      description: 'Use retirement funds to invest in your franchise without penalties or taxes.',
      benefits: ['No early withdrawal penalty', 'Tax-free investment', 'Maintain retirement growth'],
    },
    {
      title: 'Home Equity',
      description: 'Leverage your home equity for franchise investment with potentially lower rates.',
      benefits: ['Lower interest rates', 'Tax-deductible interest', 'Flexible terms'],
    },
  ];

  const calculateROI = () => {
    const investmentAmount = investment[0];
    const avgRevenue = 1200000; // $1.2M average
    const avgMargin = 0.25; // 25% profit margin
    const profit = avgRevenue * avgMargin;
    const roi = ((profit / investmentAmount) * 100).toFixed(1);
    const paybackYears = (investmentAmount / profit).toFixed(1);

    return { profit, roi, paybackYears };
  };

  const results = calculateROI();

  return (
    <div className="vero-investment pt-20">
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
              <Calculator className="w-4 h-4" />
              <span>Transparent Investment Details</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Investment Overview
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              Clear, comprehensive breakdown of costs and returns for your VERO franchise investment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Investment Range */}
      <section className="py-20 md:py-32 bg-white text-black">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Total Investment</h2>
            <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600 mb-4">
              $250K - $500K
            </div>
            <p className="text-xl text-black/60">
              Investment varies based on location, size, and market conditions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-gray-200 hover:border-black transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold mb-2">$250K</div>
                  <div className="text-lg font-semibold mb-4">Minimum Investment</div>
                  <p className="text-black/60">Smaller markets, existing space, minimal build-out</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-black bg-black text-white">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold mb-2">$350K</div>
                  <div className="text-lg font-semibold mb-4">Average Investment</div>
                  <p className="text-white/70">Most common scenario, standard location and setup</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 border-gray-200 hover:border-black transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl font-bold mb-2">$500K</div>
                  <div className="text-lg font-semibold mb-4">Premium Investment</div>
                  <p className="text-black/60">Major metro areas, extensive build-out, premium locations</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Breakdown */}
      <section className="py-20 md:py-32 bg-gray-100 text-black">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Cost Breakdown</h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              Detailed breakdown of your initial investment
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {investmentBreakdown.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white border-2 border-gray-200 rounded-xl px-6 hover:border-black transition-colors"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center justify-between w-full text-left pr-4">
                      <span className="text-lg font-semibold">{item.category}</span>
                      <span className="text-xl font-bold">{item.amount}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-black/60 text-base pb-6">
                    <div className="flex items-start gap-3 pt-2">
                      <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p>{item.description}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Ongoing Fees */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ongoing Fees</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Recurring costs that support your continued success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {ongoingFees.map((item, index) => (
              <motion.div
                key={item.fee}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-white/5 backdrop-blur-sm border-2 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-8">
                    <div className="text-3xl font-bold mb-3">{item.amount}</div>
                    <h3 className="text-xl font-semibold mb-4">{item.fee}</h3>
                    <p className="text-white/60 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 md:py-32 bg-white text-black">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">ROI Calculator</h2>
            <p className="text-xl text-black/60">
              Estimate your potential returns based on investment amount
            </p>
          </motion.div>

          <Card className="border-2 border-gray-200">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <Label htmlFor="investment" className="text-lg font-semibold mb-4 block">
                    Your Investment Amount
                  </Label>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-bold">${investment[0].toLocaleString()}</span>
                  </div>
                  <Slider
                    id="investment"
                    min={250000}
                    max={500000}
                    step={10000}
                    value={investment}
                    onValueChange={setInvestment}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-black/60">
                    <span>$250K</span>
                    <span>$500K</span>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-sm text-black/60 mb-2">Annual Profit</div>
                    <div className="text-3xl font-bold">${results.profit.toLocaleString()}</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-sm text-black/60 mb-2">ROI</div>
                    <div className="text-3xl font-bold">{results.roi}%</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="text-sm text-black/60 mb-2">Payback Period</div>
                    <div className="text-3xl font-bold">{results.paybackYears} yrs</div>
                  </div>
                </div>

                <div className="text-sm text-black/60 text-center">
                  *Estimates based on average franchise performance. Actual results may vary.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-20 md:py-32 bg-gray-100 text-black">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Financing Options</h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              Multiple pathways to fund your VERO franchise investment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {financingOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-black transition-colors group">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <DollarSign className="w-6 h-6" />
                      </div>
                      {option.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-black/60 mb-6 leading-relaxed">{option.description}</p>
                    <div className="space-y-2">
                      {option.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-black/70 mb-6">
              Our franchise development team will connect you with financing specialists
            </p>
            <Button size="lg" className="bg-black text-white hover:bg-black/90">
              Schedule Financing Consultation
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
