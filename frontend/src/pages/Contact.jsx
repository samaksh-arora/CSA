import React from 'react';
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Hero Section */}
      <motion.div
        className="container mx-auto px-4 py-20 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold mb-6">Get In Touch</h1>
        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
          Connect with GSCMA and stay updated on supply chain events, opportunities, and community news
        </p>
      </motion.div>

      {/* Contact Cards */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Email Card */}
          <motion.a
            href="mailto:gscma.wsu@gmail.com"
            className="card bg-base-100 shadow-xl border-2 border-base-300 hover:border-primary cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-body items-center text-center">
              <motion.div 
                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <FaEnvelope className="w-10 h-10 text-primary" />
              </motion.div>
              <h3 className="card-title text-2xl mb-2">Email Us</h3>
              <p className="text-base-content/70 mb-4">
                Send us an email and we'll get back to you soon
              </p>
              <p className="text-primary font-semibold"> gscma.wsu@gmail.com</p>
            </div>
          </motion.a>

          {/* LinkedIn Card */}
          <motion.a
            href="https://www.linkedin.com/groups/6572845/"
            target="_blank"
            rel="noopener noreferrer"
            className="card bg-base-100 shadow-xl border-2 border-base-300 hover:border-secondary cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-body items-center text-center">
              <motion.div 
                className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <FaLinkedin className="w-10 h-10 text-secondary" />
              </motion.div>
              <h3 className="card-title text-2xl mb-2">LinkedIn</h3>
              <p className="text-base-content/70 mb-4">
                Connect with us professionally and see career opportunities
              </p>
              <p className="text-secondary font-semibold">@GSCMA</p>
            </div>
          </motion.a>

          {/* Instagram Card */}
          <motion.a
            href="https://instagram.com/wsu_gscma"
            target="_blank"
            rel="noopener noreferrer"
            className="card bg-base-100 shadow-xl border-2 border-base-300 hover:border-accent cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-body items-center text-center">
              <motion.div 
                className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-4"
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <FaInstagram className="w-10 h-10 text-accent" />
              </motion.div>
              <h3 className="card-title text-2xl mb-2">Instagram</h3>
              <p className="text-base-content/70 mb-4">
                Follow us for event photos and community highlights
              </p>
              <p className="text-accent font-semibold">@WSU_GSCMA</p>
            </div>
          </motion.a>
        </div>

        {/* Additional Info Section */}
        <motion.div
          className="max-w-3xl mx-auto mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border-2 border-primary/20">
            <h3 className="text-3xl font-bold mb-4">Visit Us</h3>
            <p className="text-lg text-base-content/80 mb-2">
              Mike Ilitch School of Business
            </p>
            <p className="text-lg text-base-content/80 mb-2">
              Wayne State University
            </p>
            <p className="text-lg text-base-content/80 mb-6">
              Detroit, MI 48202
            </p>
            <div className="divider" />
            <h4 className="text-xl font-bold mb-3">Office Hours</h4>
            <p className="text-base-content/70">
              <strong>Monday - Thursday:</strong> 2:00 PM - 5:00 PM
            </p>
            <p className="text-base-content/70">
              <strong>Friday:</strong> 1:00 PM - 4:00 PM
            </p>
            <p className="text-base-content/70">
              <strong>Weekend:</strong> Closed
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
