import React from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope, FaDiscord, FaGithub, FaUsers } from 'react-icons/fa';

const SOCIALS = [
  {
    icon: FaEnvelope,
    title: 'Email',
    description: "Reach out directly and we'll get back to you within 24 hours.",
    handle: 'waynestatecsa@gmail.com',
    href: 'mailto:waynestatecsa@gmail.com',
    color: 'primary',
  },
  {
    icon: FaDiscord,
    title: 'Discord',
    description: 'Join our server for real-time announcements, help channels, and community chat.',
    handle: 'discord.gg/wsu-csa',
    href: 'https://discord.gg/JS8qaGrSJ',
    color: 'secondary',
  },
  {
    icon: FaLinkedin,
    title: 'LinkedIn',
    description: 'Follow us for job postings, member spotlights, and professional updates.',
    handle: '@wayne-state-csa',
    href: 'https://www.linkedin.com/company/wayne-state-csa/',
    color: 'accent',
  },
  {
    icon: FaInstagram,
    title: 'Instagram',
    description: 'See event recaps, hackathon highlights, and behind-the-scenes content.',
    handle: '@wsu_csa',
    href: 'https://instagram.com/wsu_csa',
    color: 'info',
  },
  {
    icon: FaUsers,
    title: 'GroupMe',
    description: 'Join our GroupMe chat to stay connected with members and get instant updates.',
    handle: 'Join our GroupMe',
    href: 'https://groupme.com/join_group/113605752/pG84Dhmx',
    color: 'success',
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-100">

      {/* ── Hero ── */}
      <section className="bg-base-200 border-b border-base-300 py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-4">
            // contact
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-base-content mb-5 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-base-content/65 max-w-xl mx-auto">
            Have a question, want to collaborate, or just want to say hello? We're always happy to hear from fellow developers.
          </p>
        </div>
      </section>

      {/* ── Socials ── */}
      <section className="container mx-auto px-4 sm:px-6 py-20 max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-3">
            // find us here
          </span>
          <h2 className="text-3xl font-bold text-base-content">Connect With Us</h2>
        </div>

        {/* 3-2 Grid */}
        <div className="flex flex-col gap-5">
          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SOCIALS.slice(0, 3).map(({ icon: Icon, title, description, handle, href, color }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="group block bg-base-100 border border-base-300 hover:border-primary rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`w-12 h-12 bg-${color}/10 group-hover:bg-${color}/20 rounded-xl flex items-center justify-center mb-4 transition-colors`}>
                  <Icon className={`w-5 h-5 text-${color}`} />
                </div>
                <h3 className="text-lg font-bold text-base-content mb-1">{title}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed mb-4">{description}</p>
                <span className={`text-sm font-mono font-semibold text-${color} group-hover:underline`}>
                  {handle} →
                </span>
              </a>
            ))}
          </div>
          {/* Row 2: 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:w-2/3 mx-auto">
            {SOCIALS.slice(3).map(({ icon: Icon, title, description, handle, href, color }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="group block bg-base-100 border border-base-300 hover:border-primary rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`w-12 h-12 bg-${color}/10 group-hover:bg-${color}/20 rounded-xl flex items-center justify-center mb-4 transition-colors`}>
                  <Icon className={`w-5 h-5 text-${color}`} />
                </div>
                <h3 className="text-lg font-bold text-base-content mb-1">{title}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed mb-4">{description}</p>
                <span className={`text-sm font-mono font-semibold text-${color} group-hover:underline`}>
                  {handle} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-xs font-mono uppercase tracking-widest text-primary-content/60 mb-4">
            // ready to build?
          </p>
          <h2 className="text-4xl font-bold text-primary-content mb-5">
            Join the community
          </h2>
          <p className="text-primary-content/80 mb-8 text-lg">
            Whether you have a question or just want to get involved — we'd love to hear from you.
          </p>
          <a
            href="mailto:waynestatecsa@gmail.com"
            className="btn btn-lg bg-primary-content text-primary hover:bg-primary-content/90 border-none font-semibold"
          >
            Send Us an Email
          </a>
        </div>
      </section>

    </div>
  );
};

export default Contact;
