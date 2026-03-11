import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-20">
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-8">Get in Touch</h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Have questions about our services or want to visit our center? We're here to help.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Phone</h4>
                      <p className="text-stone-600 text-lg">+1 (234) 567-8900</p>
                      <p className="text-stone-400 text-sm">Mon-Fri from 9am to 6pm</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Email</h4>
                      <p className="text-stone-600 text-lg">hello@littlesteps.com</p>
                      <p className="text-stone-400 text-sm">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">Location</h4>
                      <p className="text-stone-600 text-lg">123 Therapy Lane, Child Development Center, City, State 12345</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-stone-50 rounded-3xl border border-stone-100">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-emerald-600" /> Working Hours
                </h4>
                <div className="space-y-2 text-stone-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-bold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-bold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-bold text-red-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <form className="bg-white p-10 rounded-3xl shadow-2xl border border-stone-100 space-y-6">
                <h3 className="text-2xl font-bold mb-4">Send us a Message</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Subject</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none transition-all" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Message</label>
                  <textarea className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 outline-none transition-all h-40 resize-none" placeholder="Your message here..."></textarea>
                </div>
                <button className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-100">
                  Send Message <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
