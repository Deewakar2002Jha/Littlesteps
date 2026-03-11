import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const conditions = [
  {
    category: 'Developmental Conditions',
    items: [
      'Autism Spectrum Disorder (ASD)',
      'Attention Deficit Hyperactivity Disorder (ADHD)',
      'Global Developmental Delay (GDD)',
      'Down Syndrome',
      'Cerebral Palsy'
    ]
  },
  {
    category: 'Communication Challenges',
    items: [
      'Speech Sound Disorders',
      'Expressive & Receptive Language Delay',
      'Stuttering / Fluency Disorders',
      'Social Communication Disorder',
      'Apraxia of Speech'
    ]
  },
  {
    category: 'Sensory & Motor Challenges',
    items: [
      'Sensory Processing Disorder',
      'Fine & Gross Motor Delays',
      'Dyspraxia / Coordination Challenges',
      'Postural Instability',
      'Handwriting Difficulties'
    ]
  },
  {
    category: 'Learning & Behavioral',
    items: [
      'Dyslexia & Reading Challenges',
      'Learning Disabilities',
      'Behavioral Challenges',
      'Executive Functioning Deficits',
      'Social Skills Difficulties'
    ]
  }
];

export default function Conditions() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-8">Conditions We Treat</h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            We provide specialized support for a wide range of developmental, physical, and behavioral conditions.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {conditions.map((group, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-stone-50 p-10 rounded-3xl border border-stone-100"
              >
                <h3 className="text-2xl font-bold mb-8 text-emerald-700">{group.category}</h3>
                <ul className="space-y-4">
                  {group.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-stone-700 text-lg">
                      <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
