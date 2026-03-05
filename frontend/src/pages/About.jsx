import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCode, FaTerminal, FaUsers, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import Cubes from '../components/Cubes';

const WHAT_WE_DO = [
  'Host technical workshops and coding sessions',
  'Organize hackathons and programming competitions',
  'Facilitate networking with software engineers and recruiters',
  'Run resume reviews and mock interview prep',
  'Connect students with internship and co-op opportunities',
  'Invite industry speakers for tech talks and panels',
];

const VALUES = [
  {
    icon: FaCode,
    title: 'Technical Excellence',
    description: 'We push each other to write better code, think deeper, and solve harder problems.',
  },
  {
    icon: FaTerminal,
    title: 'Curiosity First',
    description: 'Great engineers never stop learning. We cultivate a culture of exploration and experimentation.',
  },
  {
    icon: FaUsers,
    title: 'Inclusive Community',
    description: 'Whether you are a freshman or a senior, a beginner or an expert, you belong here.',
  },
];

const BENEFITS = [
  {
    icon: FaCalendarAlt,
    title: 'Exclusive Events',
    description: 'Member-only workshops, hackathons, and networking nights',
    link: '/events',
  },
  {
    icon: FaBriefcase,
    title: 'Career Resources',
    description: 'Job postings, resume reviews, and internship referrals',
    link: '/profile',
  },
  {
    icon: FaUsers,
    title: 'Member Network',
    description: 'Connect with peers, alumni, and industry professionals',
    link: '/members',
  },
];

const About = () => {
  const { currentUser } = useAuth();

  return (
    <div className="bg-base-100">

      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-base-200">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-base-content, #000) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-base-content, #000) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            opacity: 0.06,
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-4">
            // about us
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-base-content mb-6 leading-tight tracking-tight">
            Computer Science<br />
            <span className="text-primary">Association</span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light">
            Wayne State University's home for developers, builders, and problem solvers.
          </p>
        </div>
      </section>

      {/* ── Who We Are ── */}
      {/* ── Who We Are ── */}
<section className="container mx-auto px-4 sm:px-6 py-20 max-w-6xl">
  <div className="grid md:grid-cols-2 gap-16 items-stretch">
    {/* Text */}
    <div>
      <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-3">
        // who we are
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-6">
        Built by students,<br />for students
      </h2>
      <p className="text-base-content/70 text-lg leading-relaxed mb-4">
        CSA is a student-led organization open to all Wayne State students with a passion for
        technology — whether you are studying Computer Science, Engineering, Business, or anything else.
      </p>
      <p className="text-base-content/70 text-lg leading-relaxed">
        We bridge the gap between classroom theory and real-world engineering by creating
        opportunities to build, collaborate, and grow alongside a community that shares your drive.
      </p>
    </div>

    {/* Cubes animation */}
    <div className="rounded-2xl overflow-hidden border border-base-300 min-h-[400px] [&>div]:!w-full [&>div]:!aspect-auto [&>div]:!h-full">
      <Cubes
        gridSize={11}
        maxAngle={45}
        radius={3}
        borderStyle="2px dashed oklch(var(--p))"
        faceColor="oklch(var(--b2))"
        rippleColor="oklch(var(--p))"
        rippleSpeed={1.5}
        autoAnimate
        rippleOnClick
      />
    </div>
  </div>
</section>


      {/* ── What We Do ── */}
      <section className="bg-base-200 py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-3">
                // what we do
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">
                More than a club
              </h2>
              <p className="text-base-content/70 text-lg leading-relaxed">
                We run a full calendar of technical and professional events designed to make you
                a stronger engineer and a more confident job candidate.
              </p>
            </div>

            <ul className="space-y-3">
              {WHAT_WE_DO.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 p-4 bg-base-100 rounded-xl border border-base-300 hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="text-base-content/80 text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="container mx-auto px-4 sm:px-6 py-20 max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-3">
            // core values
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content">
            What drives us
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-base-100 border border-base-300 hover:border-primary rounded-2xl p-8 transition-all hover:-translate-y-1 duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-base-content mb-3">{title}</h3>
              <p className="text-base-content/65 leading-relaxed text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Member Benefits (logged-in only) ── */}
      {currentUser && (
        <section className="bg-base-200 py-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-3">
                // members only
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-base-content">
                Your member benefits
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {BENEFITS.map(({ icon: Icon, title, description, link }) => (
                <Link to={link} key={title} className="group block">
                  <div className="bg-base-100 border-2 border-base-300 group-hover:border-primary rounded-2xl p-8 transition-all h-full group-hover:-translate-y-1 duration-300">
                    <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-xl flex items-center justify-center mb-5 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-base-content mb-2">{title}</h3>
                    <p className="text-base-content/65 text-sm leading-relaxed mb-4">{description}</p>
                    <span className="text-primary text-sm font-semibold group-hover:underline">
                      Explore →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          {currentUser ? (
            <>
              <p className="text-xs font-mono uppercase tracking-widest text-primary-content/60 mb-4">
                // you're in
              </p>
              <h2 className="text-4xl font-bold text-primary-content mb-6">
                Ready to get involved?
              </h2>
              <p className="text-primary-content/80 text-lg mb-10">
                Make the most of your membership — explore upcoming events and connect with the community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/events"
                  className="btn btn-lg bg-primary-content text-primary hover:bg-primary-content/90 border-none font-semibold"
                >
                  View Events
                </Link>
                <Link
                  to="/members"
                  className="btn btn-lg btn-outline border-primary-content text-primary-content hover:bg-primary-content hover:text-primary font-semibold"
                >
                  Member Directory
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs font-mono uppercase tracking-widest text-primary-content/60 mb-4">
                // join us
              </p>
              <h2 className="text-4xl font-bold text-primary-content mb-6">
                Ready to start building?
              </h2>
              <p className="text-primary-content/80 text-lg mb-10">
                All Wayne State students are welcome — no experience required, just curiosity and drive.
              </p>
              <Link
                to="/join"
                className="btn btn-lg bg-primary-content text-primary hover:bg-primary-content/90 border-none font-semibold"
              >
                Become a Member
              </Link>
            </>
          )}
        </div>
      </section>

    </div>
  );
};

export default About;
