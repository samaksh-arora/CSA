import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const OFFICERS = [
  {
    id: 1,
    name: 'Samaksh Arora',
    position: 'President',
    year: 'Sophomore',
    bio: 'Founder of CSA, focused on growing the CS community at Wayne State.',
    linkedin: '',
    email: '',
  },
  {
    id: 2,
    name: 'Ayanah Ahmed',
    position: 'Vice President',
    year: 'Sophomore',
    bio: 'Passionate about building inclusive tech communities.',
    linkedin: '',
    email: '',
  },
  {
    id: 3,
    name: 'Ben Curd',
    position: 'Treasurer',
    year: 'Sophomore',
    bio: 'Manages CSA\'s finances and ensures resources are used effectively.',
    linkedin: '',
    email: '',
  },
  {
    id: 4,
    name: 'Ridhima Jain',
    position: 'External Relations',
    year: 'Sophomore',
    bio: 'Connecting CSA with industry partners and opportunities.',
    linkedin: '',
    email: '',
  },
  {
    id: 5,
    name: 'James Najor',
    position: 'Membership Chair',
    year: 'Freshman',
    bio: 'Oversees member onboarding and keeps membership records up to date.',
    linkedin: '',
    email: '',
  },
  {
    id: 6,
    name: 'James Latsletter',
    position: 'Project Manager',
    year: 'Freshman',
    bio: 'Coordinates project teams and guides members from ideation to completion.',
    linkedin: '',
    email: '',
  },
  {
    id: 7,
    name: 'Shanmuk Javvaji',
    position: 'Membership Chair',
    year: 'Sophomore',
    bio: 'Supports member recruitment and helps keep the CSA community engaged.',
    linkedin: '',
    email: '',
  },
  {
    id: 8,
    name: 'Yusuf Tariq',
    position: 'Secretary',
    year: 'Sophomore',
    bio: 'Maintains meeting notes and handles communications to keep operations on track.',
    linkedin: '',
    email: '',
  }
];

const getInitials = (name) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase();

// Consistent color per officer based on name
const AVATAR_COLORS = [
  'bg-primary/20 text-primary',
  'bg-secondary/20 text-secondary',
  'bg-accent/20 text-accent',
  'bg-info/20 text-info',
];

const Officers = () => {
  return (
    <div className="min-h-screen bg-base-100">

      {/* ── Hero ── */}
      <section className="bg-base-200 border-b border-base-300 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-4">
            // leadership
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-base-content tracking-tight mb-5">
            Meet the Team
          </h1>
          <p className="text-lg sm:text-xl text-base-content/65 max-w-2xl mx-auto">
            The officers behind CSA — building a stronger CS community at Wayne State University.
          </p>
        </div>
      </section>

      {/* ── Officers Grid ── */}
      <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 max-w-6xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OFFICERS.map((officer, index) => (
            <div
              key={officer.id}
              className="group bg-base-100 border border-base-300 hover:border-primary rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Avatar */}
              <div className={`flex items-center justify-center py-10 ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
                <div className="w-20 h-20 rounded-2xl bg-base-100/30 flex items-center justify-center">
                  <span className="text-3xl font-bold tracking-tight">
                    {getInitials(officer.name)}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="text-lg font-bold text-base-content">{officer.name}</h2>
                </div>
                <span className="badge badge-primary badge-sm font-semibold mb-1">
                  {officer.position}
                </span>
                <p className="text-xs text-base-content/50 font-mono mb-3">{officer.year}</p>
                {officer.bio && (
                  <p className="text-sm text-base-content/65 leading-relaxed mb-4">
                    {officer.bio}
                  </p>
                )}

                {(officer.linkedin || officer.email) && (
                  <div className="flex gap-2 pt-3 border-t border-base-300">
                    {officer.linkedin && (
                      <a
                        href={officer.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-xs btn-ghost btn-circle hover:text-primary"
                        aria-label={`${officer.name} LinkedIn`}
                      >
                        <FaLinkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {officer.email && (
                      <a
                        href={`mailto:${officer.email}`}
                        className="btn btn-xs btn-ghost btn-circle hover:text-primary"
                        aria-label={`Email ${officer.name}`}
                      >
                        <FaEnvelope className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-widest text-primary-content/60 mb-4">
            // get involved
          </p>
          <h2 className="text-4xl font-bold text-primary-content mb-5">
            Interested in leadership?
          </h2>
          <p className="text-primary-content/80 text-lg mb-8">
            Officer positions open annually. Stay connected to learn about opportunities to lead CSA.
          </p>
          <Link
            to="/contact"
            className="btn btn-lg bg-primary-content text-primary hover:bg-primary-content/90 border-none font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Officers;
