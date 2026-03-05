import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaCode, FaLaptopCode, FaRocket } from 'react-icons/fa';
import Galaxy from '../components/Galaxy';

const useReveal = (options = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1, rootMargin: '-40px', ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const Home = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [missionRef, missionVisible] = useReveal();
  const [eventsRef, eventsVisible] = useReveal();

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
      {/* ── Hero ── */}
      <div className="hero min-h-screen relative overflow-hidden bg-base-200">

        {/* Galaxy background — fills entire hero */}
        <div className="absolute inset-0 z-0">
     <Galaxy
  mouseRepulsion={true}
  mouseInteraction={true}
  density={1}
  glowIntensity={0.3}
  saturation={0}
  hueShift={140}
  twinkleIntensity={0.3}
  rotationSpeed={0.1}
  repulsionStrength={2}
  autoCenterRepulsion={0}
  starSpeed={0.5}
  speed={1}
/>
        </div>

        {/* Subtle overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-base-200/40 via-transparent to-base-200/70 z-10 pointer-events-none" />

        <div className="hero-content text-center relative z-20 px-4 sm:px-6">
          <div className="max-w-5xl w-full">

            {/* Terminal badge */}
            <div className="inline-flex items-center gap-2 bg-base-content/5 border border-base-content/10 rounded-full px-4 py-1.5 mb-6 text-sm text-primary font-mono
                            opacity-0 animate-[fadeSlideDown_0.5s_ease-out_0.1s_forwards]">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              &gt;_ hello, world
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
              <span className="block text-base-content opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]">
                COMPUTER SCIENCE
              </span>
              <span className="block text-primary opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards]">
                ASSOCIATION
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-base-content/65 mb-8 sm:mb-10 font-light max-w-3xl mx-auto px-2 font-mono
                          opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.55s_forwards]">
              Where code meets community — building the next generation of engineers at Wayne State University.
            </p>

            <div className="opacity-0 animate-[fadeIn_0.5s_ease-out_0.75s_forwards]">
              {currentUser ? (
                <Link
                  to="/events"
                  className="btn btn-primary btn-md sm:btn-lg font-semibold px-6 sm:px-8 min-h-[44px]"
                >
                  Explore Events
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <Link
                    to="/join"
                    className="btn btn-primary btn-md sm:btn-lg font-semibold px-6 sm:px-8 min-h-[44px]"
                  >
                    Join the Club
                  </Link>
                  <Link
                    to="/events"
                    className="btn btn-outline btn-md sm:btn-lg font-semibold px-6 sm:px-8 min-h-[44px]"
                  >
                    See Events
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mission + Features ── */}
      <div className="bg-base-100 py-12 sm:py-20" ref={missionRef}>
        <div className="container mx-auto px-4 sm:px-6">

          {/* ── Upcoming Events ── */}
          <div className="max-w-6xl mx-auto px-0 sm:px-4" ref={eventsRef}>
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2 sm:gap-3
                            transition-all duration-700 ease-out
                            ${eventsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <div>
                <span className="block text-xs font-mono uppercase tracking-widest text-primary mb-1">
                  // what's coming up
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-base-content">
                  Upcoming Events
                </h3>
              </div>
              <Link to="/events" className="text-primary hover:underline font-semibold text-sm sm:text-base md:text-lg">
                View all →
              </Link>
            </div>

            {loadingEvents ? (
              <div className="flex justify-center items-center py-12">
                <span className="loading loading-spinner loading-lg text-primary" />
              </div>
            ) : events.length === 0 ? (
              <div className={`text-center py-12 transition-all duration-700 ease-out
                ${eventsVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                <p className="text-base sm:text-xl text-base-content/60 px-4 font-mono">
                  // no upcoming events scheduled yet
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {events.map((event, index) => (
                  <div
                    key={event._id || event.id}
                    className={`transition-all duration-500 ease-out
                      ${eventsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: eventsVisible ? `${index * 100}ms` : '0ms' }}
                  >
                    <Link to="/events" className="block h-full group">
                      <div className="card bg-base-100 border-2 border-base-300 group-hover:border-primary/60 transition-all duration-300 h-full shadow-sm group-hover:shadow-lg group-hover:-translate-y-1">
                        <div className="card-body p-4 sm:p-5 md:p-6">
                          <div className="w-8 h-1 bg-primary rounded-full mb-3" />
                          <h4 className="card-title text-base sm:text-lg md:text-xl mb-2 sm:mb-3 leading-tight">
                            {event.name}
                          </h4>
                          <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                            <p className="text-xs sm:text-sm text-base-content/60 flex items-start gap-2">
                              <span className="shrink-0">📅</span>
                              <span>{event.date ? new Date(event.date).toLocaleDateString() : ''} • {event.time}</span>
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
                            <button className="btn btn-primary btn-sm w-full sm:w-auto min-h-[40px]">
                              Learn more
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
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
