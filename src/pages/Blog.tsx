import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const posts = [
  {
    title: 'Understanding Sensory Processing in Children',
    excerpt: 'Learn about how children process sensory information and how it affects their daily life.',
    category: 'Occupational Therapy',
    author: 'Dr. Sarah Johnson',
    date: 'Oct 12, 2025',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: '5 Tips to Encourage Speech at Home',
    excerpt: 'Practical strategies for parents to support their child\'s language development during everyday activities.',
    category: 'Speech Therapy',
    author: 'Dr. Michael Chen',
    date: 'Oct 08, 2025',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'The Importance of Early Intervention',
    excerpt: 'Why starting therapy early can make a significant difference in a child\'s long-term development.',
    category: 'Development',
    author: 'Dr. Emily Brown',
    date: 'Sep 28, 2025',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800'
  }
];

export default function Blog() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-8">Parent Resources</h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Expert insights, tips, and resources to help you support your child's growth and development journey.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <motion.article 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all"
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 leading-tight hover:text-emerald-600 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  <p className="text-stone-600 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <Calendar size={16} />
                      {post.date}
                    </div>
                    <button className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                      Read More <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
