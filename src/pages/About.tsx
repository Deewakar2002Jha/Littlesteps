import React from 'react';
import { motion } from 'motion/react';
import { Heart, Target, Eye, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold mb-8"
          >
            Our Mission is Your <span className="text-emerald-600">Child's Growth</span>
          </motion.h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Little Steps was founded with a simple vision: to create a space where every child, regardless of their challenges, can find the support they need to thrive.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Story" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                Founded in 2015, Little Steps started as a small speech therapy clinic. Over the years, we've grown into a multi-disciplinary center, bringing together experts from various fields to provide holistic care.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                We understand that every child is unique. That's why we don't believe in one-size-fits-all solutions. Our team works collaboratively to design intervention programs that address the specific strengths and needs of each child.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Compassion', desc: 'We treat every child with the same love and care we would our own.', icon: Heart },
              { title: 'Excellence', desc: 'We stay at the forefront of pediatric therapy through continuous learning.', icon: Target },
              { title: 'Integrity', desc: 'Honesty and transparency are the foundations of our relationship with families.', icon: Shield },
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 text-center">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

import { Shield } from 'lucide-react';
