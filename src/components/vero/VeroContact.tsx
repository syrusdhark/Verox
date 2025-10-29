import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function VeroContact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    investment: '',
    timeline: '',
    experience: '',
    location: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFormState('success');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormState('idle');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        investment: '',
        timeline: '',
        experience: '',
        location: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (800) 555-VERO',
      subdetails: 'Mon-Fri 9am-6pm EST',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'franchise@vero.com',
      subdetails: 'Response within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      details: '123 Business Plaza',
      subdetails: 'New York, NY 10001',
    },
  ];

  const qualifications = [
    'Minimum net worth of $500,000',
    'Liquid capital of $150,000+',
    'Strong credit history',
    'Business or management experience',
    'Passion for the industry',
    'Commitment to brand standards',
  ];

  return (
    <div className="vero-contact pt-20">
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
              <Send className="w-4 h-4" />
              <span>Start Your Journey</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Let's Connect
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
              Take the first step toward franchise ownership. Fill out the form below and our team will be in touch within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 md:py-32 bg-white text-black">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg text-black/60 leading-relaxed">
                  Our franchise development team is here to answer your questions and guide you through the application process.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-2 border-gray-200 hover:border-black transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-black/60 mb-1">{item.title}</div>
                            <div className="font-bold text-lg mb-1">{item.details}</div>
                            <div className="text-sm text-black/60">{item.subdetails}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-bold mb-4">Ideal Candidate Profile</h3>
                <ul className="space-y-3">
                  {qualifications.map((qual) => (
                    <li key={qual} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-black/70">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Card className="border-2 border-gray-200">
                <CardContent className="p-8">
                  {formState === 'success' ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">Application Received!</h3>
                      <p className="text-lg text-black/60">
                        Thank you for your interest in VERO. Our team will review your application and contact you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Franchise Application</h3>
                      </div>

                      {/* Name Fields */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            className="h-12"
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            className="h-12"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      {/* Contact Fields */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="h-12"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="h-12"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      {/* Investment & Timeline */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="investment">Available Investment *</Label>
                          <Select
                            value={formData.investment}
                            onValueChange={(value) => handleChange('investment', value)}
                            required
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="250-350">$250K - $350K</SelectItem>
                              <SelectItem value="350-450">$350K - $450K</SelectItem>
                              <SelectItem value="450-500">$450K - $500K</SelectItem>
                              <SelectItem value="500+">$500K+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timeline">Timeline *</Label>
                          <Select
                            value={formData.timeline}
                            onValueChange={(value) => handleChange('timeline', value)}
                            required
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                              <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                              <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                              <SelectItem value="long">Long-term (12+ months)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Experience & Location */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="experience">Business Experience *</Label>
                          <Select
                            value={formData.experience}
                            onValueChange={(value) => handleChange('experience', value)}
                            required
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No prior experience</SelectItem>
                              <SelectItem value="some">Some experience</SelectItem>
                              <SelectItem value="franchise">Franchise owner</SelectItem>
                              <SelectItem value="executive">Executive/Management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Desired Location *</Label>
                          <Input
                            id="location"
                            required
                            value={formData.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                            className="h-12"
                            placeholder="City, State"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          className="min-h-[120px] resize-none"
                          placeholder="Tell us about yourself, your goals, and why you're interested in VERO..."
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-black text-white hover:bg-black/90 h-14 text-lg font-semibold"
                        disabled={formState === 'submitting'}
                      >
                        {formState === 'submitting' ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Submitting Application...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <Send className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-black/60 text-center">
                        By submitting this form, you agree to be contacted by VERO regarding franchise opportunities.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-20 md:py-32 bg-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Visit Our Headquarters</h2>
            <p className="text-xl text-black/60">
              Schedule a discovery day and see VERO in action
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center"
          >
            <div className="text-center text-black/40">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg font-medium">Interactive Map</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
