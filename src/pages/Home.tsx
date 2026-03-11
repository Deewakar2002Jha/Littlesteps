import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Star, Shield, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const services = [
  { title: 'Speech Therapy', description: 'Helping children find their voice and communicate effectively.', icon: '🗣️' },
  { title: 'Occupational Therapy', description: 'Developing essential life skills through play and targeted activities.', icon: '🎨' },
  { title: 'Autism / ABA Therapy', description: 'Evidence-based behavioral interventions for neurodiverse children.', icon: '🧩' },
  { title: 'Physiotherapy', description: 'Improving physical strength, balance, and motor coordination.', icon: '🏃' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-100 rounded-full">
                Nurturing Every Step
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8 text-stone-900">
                Empowering Children to <span className="text-emerald-600">Reach Their Potential</span>
              </h1>
              <p className="text-xl text-stone-600 mb-10 leading-relaxed max-w-xl">
                Little Steps provides comprehensive therapy services tailored to your child's unique needs. We believe in a holistic approach to development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/book" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
                  Book a Consultation <ArrowRight size={20} />
                </Link>
                <Link to="/services" className="px-8 py-4 bg-white text-stone-900 border border-stone-200 rounded-xl font-semibold hover:bg-stone-50 transition-all flex items-center justify-center">
                  Explore Services
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1000" 
                  alt="Child playing with therapist" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-stone-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-y border-stone-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Happy Families', value: '500+' },
              { label: 'Specialist Therapists', value: '25+' },
              { label: 'Therapy Sessions', value: '10k+' },
              { label: 'Success Rate', value: '98%' },
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-stone-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Specialized Services</h2>
            <p className="text-lg text-stone-600">We offer a wide range of therapies designed to support your child's development across all domains.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-stone-600 mb-6 leading-relaxed">{service.description}</p>
                <Link to="/services" className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1000" 
                alt="Therapy session" 
                className="rounded-3xl shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-8">Why Parents Trust Little Steps</h2>
              <div className="space-y-6">
                {[
                  { title: 'Expert Clinical Team', desc: 'Our therapists are highly qualified and specialized in pediatric care.' },
                  { title: 'Individualized Care Plans', desc: 'Every child receives a customized therapy plan based on their unique needs.' },
                  { title: 'Family-Centered Approach', desc: 'We work closely with parents to ensure progress continues at home.' },
                  { title: 'State-of-the-Art Facility', desc: 'A safe, welcoming environment designed specifically for children.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-stone-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-emerald-600 rounded-3xl p-12 lg:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Ready to Start Your Child's Journey?</h2>
              <p className="text-xl text-emerald-50 mb-12">Book a comprehensive consultation with our experts today and take the first step towards your child's brighter future.</p>
              <Link to="/book" className="inline-block px-10 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-stone-50 transition-all shadow-xl">
                Book Appointment Now
              </Link>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
