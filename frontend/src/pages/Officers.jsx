import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaUser } from 'react-icons/fa';
import samakshimg from '../assets/samakshimg.jpg';

const OFFICERS = [
  {
    id: 1,
    name: 'Samaksh Arora',
    position: 'President',
    year: 'Sophomore',
    image: samakshimg,
    objectPosition: 'center center',
    bio: 'Founder and President of CSA.',
    linkedin: '',
    email: '',
  },
  {
    id: 2,
    name: 'Ayanah Ahmed',
    position: 'Vice President',
    year: 'Sophomore',
    image: samakshimg,
    objectPosition: 'center top',
    bio: 'Passionate about building inclusive tech communities.',
    linkedin: '',
    email: '',
  },
  {
    id: 3,
    name: 'Ben Curd',
    position: 'Treasurer',
    year: 'Sophomore',
    image: samakshimg,
    objectPosition: 'center center',
    bio: 'Driving innovation in CSA.',
    linkedin: '',
    email: '',
  },
  {
    id: 4,
    name: 'Ridhima Jain',
    position: 'External Relations',
    year: 'Sophomore',
    image: samakshimg,
    objectPosition: 'center center',
    bio: 'Connecting CSA with industry partners and opportunities.',
    linkedin: '',
    email: '',
  },
];

// Fallback shown when image is missing or fails to load
const OfficerImage = ({ src, name, objectPosition }) => {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div className="w-full h-full bg-base-200 flex flex-col items-center justify-center gap-2">
        <FaUser className="w-12 h-12 text-base-content/20" />
        <span className="text-xs text-base-content/30 font-mono">{name}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      style={{ objectPosition }}
      onError={() => setErrored(true)}
    />
  );
};

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
          {OFFICERS.map((officer) => (
            <div
              key={officer.id}
              className="group bg-base-100 border border-base-300 hover:border-primary rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Photo */}
              <div className="relative overflow-hidden aspect-square">
                <OfficerImage
                  src={officer.image}
                  name={officer.name}
                  objectPosition={officer.objectPosition}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-300/60 via-transparent to-transparent pointer-events-none" />

                {/* Position badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="badge badge-primary badge-sm font-semibold shadow-lg">
                    {officer.position}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-base-content mb-0.5">{officer.name}</h2>
                <p className="text-xs text-base-content/50 font-mono mb-3">{officer.year}</p>
                {officer.bio && (
                  <p className="text-sm text-base-content/65 leading-relaxed mb-4">
                    {officer.bio}
                  </p>
                )}

                {/* Social links — only rendered if values are provided */}
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
