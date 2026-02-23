import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const About = () => {
  const { currentUser, userRole } = useAuth();
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const benefitsRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, margin: '-100px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://i.postimg.cc/9fNC8gQR/Header-About-Us.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About <span className="text-secondary">GSCMA</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Wayne State University's premier organization for future supply chain leaders
          </motion.p>
        </div>
      </motion.div>

      {/* Mission Section */}
      <div ref={missionRef} className="container mx-auto px-4 py-20">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          animate={missionInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div variants={fadeIn}>
              <div className="relative">
                <img
                  src="https://i.postimg.cc/zDggbpT5/All-About-US.jpg"
                  alt="GSCMA Team"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-3xl -z-10" />
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h2 className="text-4xl font-bold mb-6 text-base-content">Who We Are</h2>
              <p className="text-lg text-base-content/80 mb-4 leading-relaxed">
               GSCMA is a student-led organization for global supply chain management undergraduates, 
               MBA students and other interested Wayne State students
              </p>
              <p className="text-lg text-base-content/80 leading-relaxed">
                Founded by students passionate about logistics, operations, and global trade, we provide
                a platform for networking, professional development, and industry engagement.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeIn} className="order-2 md:order-1">
              <h2 className="text-4xl font-bold mb-6 text-base-content">What We Do</h2>
              <div className="space-y-4">
                {[
                  { icon: '-', text: 'Host industry speakers and panel discussions' },
                  { icon: '-', text: 'Organize company tours and site visits' },
                  { icon: '-', text: 'Facilitate networking events with professionals' },
                  { icon: '-', text: 'Provide career development workshops' },
                  { icon: '-', text: 'Connect students with internship opportunities' },
                  { icon: '-', text: 'Compete in supply chain case competitions' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-base-100 rounded-xl hover:bg-primary/5 transition-colors"
                    whileHover={{ x: 10 }}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="order-1 md:order-2">
              <div className="relative max-w-2xl">
                <img
                  src="https://i.postimg.cc/5NCvjMR7/ABOUT-US.jpg"
                  alt="Events"
                  className="rounded-3xl shadow-2xl w-full"
                />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-3xl -z-10" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Values Section */}
      <div ref={valuesRef} className="bg-gradient-to-b from-base-100 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-base-content/70">What drives us forward</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
          >
            {[
              {
                title: 'Excellence',
                description: 'Striving for the highest standards in supply chain education and practice',
                icon: '⭐',
              },
              {
                title: 'Innovation',
                description: 'Embracing new ideas and technologies shaping the future of supply chains',
                icon: '💡',
              },
              {
                title: 'Community',
                description: 'Building lasting connections between students, alumni, and industry leaders',
                icon: '🌍',
              },
            ].map((value, index) => (
              <motion.div key={index} variants={fadeIn} whileHover={{ y: -10 }}>
                <div className="bg-base-100 rounded-2xl p-8 shadow-xl border-2 border-base-300 hover:border-primary transition-all h-full">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-base-content/70">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Member Benefits - Only for logged-in users */}
      {currentUser && (
        <div ref={benefitsRef} className="container mx-auto px-4 py-20">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">Your Member Benefits</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  ),
                  title: 'Exclusive Events',
                  description: 'Member-only workshops and networking events',
                  link: '/events',
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2"
                    />
                  ),
                  title: 'Career Resources',
                  description: 'Job postings and internship opportunities',
                  link: '/profile',
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  ),
                  title: 'Network Access',
                  description: 'Connect with alumni and professionals',
                  link: '/members',
                },
              ].map((benefit, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }}>
                  <Link to={benefit.link}>
                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 text-center border-2 border-primary/20 hover:border-primary transition-all h-full">
                      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {benefit.icon}
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-base-content/70">{benefit.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {currentUser ? (
              <>
                <h2 className="text-4xl font-bold mb-6">Ready to Get Involved?</h2>
                <p className="text-xl mb-8 text-white/90">
                  Make the most of your GSCMA membership and unlock exclusive opportunities
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/events" className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none">
                      View Events →
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/members" className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary">
                      Connect Now
                    </Link>
                  </motion.div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-bold mb-6">Join Our Community Today</h2>
                <p className="text-xl mb-8 text-white/90">
                  Whether you're studying supply chain, business, or engineering—GSCMA welcomes all Wayne State students
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/join" className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none">
                    Become a Member →
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
