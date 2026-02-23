import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import tharunikaImg from '../assets/tharunika.jpeg';
import danielImg from '../assets/daniel.jpeg';
import connorImg from '../assets/connor.jpeg';
import Aayan_QaziImg from '../assets/Aayan_Qazi.jpeg';
import johnImg from '../assets/john.jpeg';
import makaylaImg from '../assets/makayla.jpeg';
import aliImg from '../assets/ali.jpeg';
import zeinabImg from '../assets/zeinab.jpeg';
import aasiyahImg from '../assets/aasiyah.jpeg';
import danielSImg from '../assets/danielS.jpeg';
import Joseph_BurtonImg from '../assets/Joseph_Burton.jpeg';
import ShaTina_BoxIMG from '../assets/ShaTina_Box.jpeg';
import Ashir_QaziImg from '../assets/Ashir_Qazi.jpeg';
import Tahani_ChoudhuryImg from '../assets/Tahani_Choudhury.jpeg';

const Officers = () => {
  // Officer data with images
  const officers = [
    {
      id: 1,
      name: 'Tharunika Vasudevan',
      position: 'President',
      year: 'Senior',
      image: tharunikaImg,
      objectPosition: 'center center',
      bio: 'Leading GSCMA with vision and dedication to supply chain excellence.',
    },
    {
      id: 2,
      name: 'Daniel Kuznair',
      position: 'Co-Vice President',
      year: 'Junior',
      image: danielImg,
      objectPosition: 'center top',
      bio: 'Passionate about logistics and operational efficiency.',
    },
    {
      id: 3,
      name: 'Connor Diemond',
      position: 'Co-Vice President',
      year: 'Senior',
      image: connorImg,
      objectPosition: 'center center',
      bio: 'Driving innovation in supply chain management.',
    },
    {
      id: 4,
      name: 'Aasiyah Imthias',
      position: 'Secretary',
      year: 'Sophomore',
      image: aasiyahImg,
      objectPosition: 'center center',
      bio: 'Keeping GSCMA organized and running smoothly.',
    },
    {
      id: 5,
      name: 'Makayla Stewart',
      position: 'Membership Officer',
      year: 'Senior',
      image: makaylaImg,
      objectPosition: 'center center',
      bio: 'Building connections and growing our community.',
    },
    {
      id: 6,
      name: 'Ashir Qazi',
      position: 'Membership Officer',
      year: 'Sophomore',
      image: Ashir_QaziImg,
      objectPosition: 'center center',
      bio: 'Engaging members and fostering collaboration.',
    },
    {
      id: 7,
      name: 'Tahani Choudhury',
      position: 'Co-Marketing Officer',
      year: 'Senior',
      image: Tahani_ChoudhuryImg,
      objectPosition: 'center center',
      bio: 'Amplifying GSCMA\'s voice and brand.',
    },
    {
      id: 8,
      name: 'John Lagarde',
      position: 'Co-Marketing Officer',
      year: 'Senior',
      image: johnImg,
      objectPosition: 'center top',
      bio: 'Creative strategies for impactful outreach.',
    },
    {
      id: 9,
      name: 'Ali Shuttari',
      position: 'Treasurer',
      year: 'Senior',
      image: aliImg,
      objectPosition: 'center top',
      bio: 'Managing finances with precision and transparency.',
    },
    {
      id: 10,
      name: 'ShaTina Box',
      position: 'AIAG Chair',
      year: 'Masters',
      image: ShaTina_BoxIMG,
      objectPosition: 'center top',
      bio: 'Leading AIAG initiatives and automotive supply chain connections.',
    },
    {
      id: 11,
      name: 'Zeinab Alhilal',
      position: 'ISM Chair',
      year: 'Senior',
      image: zeinabImg,
      objectPosition: 'center center',
      bio: 'Coordinating ISM events and professional development.',
    },
    {
      id: 12,
      name: 'Daniel Saleem',
      position: 'TCD Chair',
      year: 'Senior',
      image: danielSImg,
      objectPosition: 'center top',
      bio: 'Organizing technology and career development programs.',
    },
    {
      id: 13,
      name: 'Aayan Qazi',
      position: 'CSCMP Chair',
      year: 'Sophomore',
      image: Aayan_QaziImg,
      objectPosition: 'center center',
      bio: 'Bridging GSCMA with CSCMP national network.',
    },
    {
      id: 14,
      name: 'Joseph Burton',
      position: 'Merchandise Coordinator',
      year: 'Senior',
      image: Joseph_BurtonImg,
      objectPosition: 'center center',
      bio: 'Curating GSCMA merchandise and connecting our community.',
    },
    
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      {/* Hero Section - Clean, No Background */}
      <div className="container mx-auto px-4 pt-20 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Leadership Team</h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Meet the dedicated officers leading GSCMA at Wayne State University
          </p>
        </motion.div>
      </div>

      {/* Officers Grid */}
      <div className="container mx-auto px-4 pb-16">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {officers.map((officer) => (
            <motion.div
              key={officer.id}
              variants={fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="card bg-base-100 shadow-lg hover:shadow-2xl border border-base-300 hover:border-primary/50 transition-all h-full">
                <figure className="px-8 pt-8">
                  <div className="relative">
                    <img 
                      src={officer.image} 
                      alt={officer.name} 
                      className="rounded-2xl w-full aspect-square object-cover ring-4 ring-primary/20 hover:ring-primary/50 transition-all"
                      style={{ objectPosition: officer.objectPosition }}
                    />
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                </figure>
                
                <div className="card-body items-center text-center pt-6">
                  <h2 className="card-title text-xl font-bold">{officer.name}</h2>
                  <div className="badge badge-primary badge-lg font-semibold">{officer.position}</div>
                  <p className="text-sm text-base-content/60 font-medium">{officer.year}</p>
                  
                  {officer.bio && (
                    <p className="text-sm text-base-content/70 mt-2 leading-relaxed">
                      {officer.bio}
                    </p>
                  )}

                  {/* Social Links (Optional - uncomment if you have social media) */}
                  {/* <div className="flex gap-2 mt-4">
                    <button className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-white">
                      <FaLinkedin />
                    </button>
                    <button className="btn btn-circle btn-sm btn-ghost hover:bg-primary hover:text-white">
                      <FaEnvelope />
                    </button>
                  </div> */}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Join the Team CTA */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">Interested in Leadership?</h2>
            <p className="text-lg text-base-content/70 mb-8">
              Officer positions open annually. Stay connected to learn about opportunities to lead GSCMA.
            </p>
            <motion.button
              className="btn btn-primary btn-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href='/contact'>Contact Us</a>
              
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Officers;
