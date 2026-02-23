import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FaCode, FaLaptopCode, FaRocket } from 'react-icons/fa';

const Home = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const eventsRef = useRef(null);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 150]);

  const missionInView = useInView(missionRef, { once: true, margin: '-50px' });
  const eventsInView = useInView(eventsRef, { once: true, margin: '-50px' });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
        const sorted = res.data
          .slice()
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sorted.slice(0, 3));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, []);

  const features = [
    {
      icon: FaCode,
      title: 'Build Projects',
      description: 'Collaborate on real-world software projects and grow your portfolio alongside peers.',
      color: 'primary',
    },
    {
      icon: FaLaptopCode,
      title: 'Sharpen Skills',
      description: 'Join workshops, hackathons, and tech talks covering everything from DSA to cloud computing.',
      color: 'secondary',
    },
    {
      icon: FaRocket,
      title: 'Launch Careers',
      description: 'Connect with recruiters, land internships, and get mentorship from industry engineers.',
      color: 'accent',
    },
  ];

  return (
    <div>
      {/* ── Hero Section ── */}
      <div ref={heroRef} className="hero min-h-screen relative overflow-hidden bg-[#0d1117]">
        {/* Animated grid/code background */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            y: backgroundY,
          }}
          animate={prefersReducedMotion ? {} : { backgroundPositionY: ['0px', '40px'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/60 via-transparent to-[#0d1117]/80 z-10" />

        <div className="hero-content text-center relative z-20 px-4 sm:px-6">
          <div className="max-w-5xl w-full">
            {/* Terminal pill badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 text-sm text-indigo-300 font-mono"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              &gt;_ hello, world
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block text-white"
              >
                COMPUTER SCIENCE
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"
              >
                ASSOCIATION
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-2xl text-white/70 mb-8 sm:mb-10 font-light max-w-3xl mx-auto px-2 font-mono"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Where code meets community — building the next generation of engineers at Wayne State University.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {currentUser ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/events"
                    className="btn btn-md sm:btn-lg bg-indigo-500 hover:bg-indigo-400 text-white border-none font-semibold text-base sm:text-lg px-6 sm:px-8 shadow-xl shadow-indigo-500/30 min-h-[44px]"
                  >
                    Explore Events
                  </Link>
                </motion.div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/join"
                      className="btn btn-md sm:btn-lg bg-indigo-500 hover:bg-indigo-400 text-white border-none font-semibold text-base sm:text-lg px-6 sm:px-8 shadow-xl shadow-indigo-500/30 min-h-[44px]"
                    >
                      Join the Club
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/events"
                      className="btn btn-md sm:btn-lg btn-outline text-white/80 border-white/20 hover:bg-white/10 hover:border-white/40 font-semibold text-base sm:text-lg px-6 sm:px-8 min-h-[44px]"
                    >
                      See Events
                    </Link>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Mission + Features Section ── */}
      <div className="bg-base-100 py-12 sm:py-20" ref={missionRef}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-10 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Section label */}
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-indigo-500 mb-3">
              // who we are
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-base-content">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-base-content/80 leading-relaxed">
              We unite CS students through code, collaboration, and curiosity — providing the resources,
              mentorship, and community you need to grow as a developer and land your dream role.
            </p>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-14 sm:mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6 sm:p-8 rounded-2xl border border-base-300 hover:border-indigo-500/40 transition-colors bg-base-100"
                initial={{ opacity: 0, y: 30 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className={`w-14 h-14 sm:w-16 sm:h-16 bg-${feature.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}
                  whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                >
                  <feature.icon className={`w-7 h-7 sm:w-8 sm:h-8 text-${feature.color}`} />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-base-content">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-base-content/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* ── Upcoming Events ── */}
          <div className="max-w-6xl mx-auto px-0 sm:px-4" ref={eventsRef}>
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={eventsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="block text-xs font-mono uppercase tracking-widest text-indigo-500 mb-1">
                  // what's coming up
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content">
                  Upcoming Events
                </h3>
              </div>
              <Link
                to="/events"
                className="text-indigo-500 hover:underline font-semibold text-sm sm:text-base md:text-lg"
              >
                View all →
              </Link>
            </motion.div>

            {loadingEvents ? (
              <div className="flex justify-center items-center py-12">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : events.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={eventsInView ? { opacity: 1 } : {}}
              >
                <p className="text-base sm:text-xl text-base-content/60 px-4 font-mono">
                  // no upcoming events scheduled yet
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {events.map((event, index) => (
                  <motion.div
                    key={event._id || event.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={eventsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link to="/events" className="block h-full">
                      <div className="card bg-base-100 border-2 border-base-300 hover:border-indigo-500/60 active:border-indigo-500 transition-all h-full shadow-lg hover:shadow-indigo-500/10 hover:shadow-xl">
                        <div className="card-body p-4 sm:p-5 md:p-6">
                          {/* Color accent strip */}
                          <div className="w-8 h-1 bg-indigo-500 rounded-full mb-3" />
                          <h4 className="card-title text-base sm:text-lg md:text-xl mb-2 sm:mb-3 leading-tight">
                            {event.name}
                          </h4>
                          <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                            <p className="text-xs sm:text-sm text-base-content/60 flex items-start gap-2">
                              <span className="shrink-0">📅</span>
                              <span>
                                {event.date ? new Date(event.date).toLocaleDateString() : ''} • {event.time}
                              </span>
                            </p>
                            <p className="text-xs sm:text-sm text-base-content/60 flex items-start gap-2">
                              <span className="shrink-0">📍</span>
                              <span>{event.location}</span>
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm text-base-content/80 line-clamp-3 mb-3 sm:mb-4 leading-relaxed">
                            {event.description}
                          </p>
                          <div className="card-actions mt-auto">
                            <motion.button
                              className="btn btn-sm w-full sm:w-auto min-h-[40px] bg-indigo-500 hover:bg-indigo-400 text-white border-none"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Learn more
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
