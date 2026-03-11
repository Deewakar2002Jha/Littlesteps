import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Speech Therapy',
    description: 'We help children with articulation, language delays, stuttering, and social communication challenges.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    features: ['Articulation Training', 'Language Development', 'Social Skills', 'Feeding Therapy']
  },
  {
    title: 'Occupational Therapy',
    description: 'Focusing on fine motor skills, sensory processing, and daily living activities through therapeutic play.',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800',
    features: ['Sensory Integration', 'Fine Motor Development', 'Self-Care Skills', 'Handwriting Support']
  },
  {
    title: 'ABA Therapy',
    description: 'Evidence-based behavioral interventions designed to increase positive behaviors and decrease challenging ones.',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800',
    features: ['Behavior Modification', 'Skill Acquisition', 'Parent Training', 'Social Interaction']
  },
  {
    title: 'Physiotherapy',
    description: 'Improving strength, balance, and coordination to help children move more independently and confidently.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    features: ['Gross Motor Skills', 'Balance & Coordination', 'Postural Support', 'Mobility Training']
  }
];

export default function Services() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-8">Our Specialized Services</h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Comprehensive, evidence-based therapies delivered by compassionate experts in a child-friendly environment.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {services.map((service, i) => (
              <div key={i} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="lg:w-1/2">
                  <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                  <p className="text-lg text-stone-600 mb-8 leading-relaxed">{service.description}</p>
                  <ul className="grid grid-cols-2 gap-4 mb-10">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-stone-700 font-medium">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/book" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">
                    Book Consultation <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
