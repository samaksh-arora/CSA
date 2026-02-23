import React from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaClipboardList, FaCheckCircle, FaArrowRight, FaMobileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Payment = () => {
  const membershipFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdI2_fI3hZK7VIZpv53_YTrdcPsHa28Au3CMggMgwLN26rXVg/viewform';
  const venmoUsername = '@WSU-GSCMA';
  const venmoUrl = 'https://www.venmo.com/u/WSU-GSCMA';

  const steps = [
    {
      number: 1,
      title: 'Pay Membership Dues',
      description: `Send payment via Venmo to ${venmoUsername} with your full name in the note.`,
      icon: FaMoneyBillWave,
      color: 'primary',
    },
    {
      number: 2,
      title: 'Fill Out Membership Form',
      description: 'Complete our online membership application with your information.',
      icon: FaClipboardList,
      color: 'secondary',
    },
    {
      number: 3,
      title: 'Get Confirmed',
      description: 'Your membership will be activated within 24-48 hours.',
      icon: FaCheckCircle,
      color: 'success',
    },
  ];

  const benefits = [
    'Access to exclusive networking events',
    'Industry speaker sessions and workshops',
    'Resume reviews and career guidance',
    'Professional development opportunities',
    'Connect with supply chain professionals',
    'GSCMA membership certificate',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Become a Member</h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Join GSCMA and unlock exclusive opportunities to grow your supply chain career
          </p>
        </motion.div>

        {/* Membership Fee Cards */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* One Semester */}
            <div className="card bg-gradient-to-br from-primary to-primary/80 text-white shadow-2xl">
              <div className="card-body text-center py-10">
                <div className="flex items-center justify-center mb-4">
                  <FaMoneyBillWave className="text-4xl" />
                </div>
                <h2 className="text-xl font-bold mb-2">One Semester</h2>
                <p className="text-5xl font-bold mb-2">$12</p>
                <p className="text-white/90">
                  Fall or Winter semester
                </p>
              </div>
            </div>

            {/* Full Year */}
            <div className="card bg-gradient-to-br from-secondary to-secondary/80 text-white shadow-2xl border-4 border-accent">
              <div className="card-body text-center py-10 relative">
                <div className="badge badge-accent badge-lg absolute top-4 right-4 font-bold">
                  Best Value
                </div>
                <div className="flex items-center justify-center mb-4">
                  <FaMoneyBillWave className="text-4xl" />
                </div>
                <h2 className="text-xl font-bold mb-2">Full Year</h2>
                <p className="text-5xl font-bold mb-2">$18</p>
                <p className="text-white/90">
                  Entire academic year
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Steps Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How to Join
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="card bg-base-100 shadow-lg border-2 border-base-300 hover:border-primary/50 transition-all h-full">
                  <div className="card-body items-center text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 relative ${
                      step.color === 'primary' ? 'bg-primary/10' : 
                      step.color === 'secondary' ? 'bg-secondary/10' : 
                      'bg-success/10'
                    }`}>
                      <step.icon className={`text-3xl ${
                        step.color === 'primary' ? 'text-primary' : 
                        step.color === 'secondary' ? 'text-secondary' : 
                        'text-success'
                      }`} />
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        step.color === 'primary' ? 'bg-primary' : 
                        step.color === 'secondary' ? 'bg-secondary' : 
                        'bg-success'
                      }`}>
                        {step.number}
                      </div>
                    </div>
                    <h3 className="card-title text-xl mb-3">{step.title}</h3>
                    <p className="text-base-content/70">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Venmo Payment Card - STEP 1 */}
            <motion.a
              href={venmoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card bg-base-100 shadow-xl border-2 border-base-300 hover:border-primary transition-all cursor-pointer"
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="card-body items-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <FaMobileAlt className="text-4xl text-primary" />
                </div>
                <h3 className="card-title text-2xl mb-2">Step 1: Pay Dues</h3>
                <p className="text-base-content/70 mb-2">
                  Send payment via Venmo to
                </p>
                <p className="text-2xl font-bold text-primary mb-2">
                  {venmoUsername}
                </p>
                <div className="text-base-content/70 mb-6">
                  <p className="font-semibold">$12 (One Semester)</p>
                  <p className="font-semibold">$18 (Full Year)</p>
                </div>
                <button className="btn btn-primary btn-wide gap-2">
                  Open Venmo
                  <FaArrowRight />
                </button>
              </div>
            </motion.a>

            {/* Membership Form Card - STEP 2 */}
            <motion.a
              href={membershipFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card bg-base-100 shadow-xl border-2 border-base-300 hover:border-secondary transition-all cursor-pointer"
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <div className="card-body items-center text-center">
                <div className="w-20 h-20 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                  <FaClipboardList className="text-4xl text-secondary" />
                </div>
                <h3 className="card-title text-2xl mb-2">Step 2: Fill Form</h3>
                <p className="text-base-content/70 mb-6">
                  Complete the membership application form after payment
                </p>
                <button className="btn btn-secondary btn-wide gap-2">
                  Open Form
                  <FaArrowRight />
                </button>
              </div>
            </motion.a>
          </div>

          {/* Important Note */}
          <motion.div
            className="alert alert-warning shadow-lg mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-1.964-1.333-2.732 0L3.732 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-bold">Important!</h3>
              <div className="text-sm">
                Please include your <strong>full name</strong> and <strong>which membership type</strong> (semester or full year) in the Venmo payment note.
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="card bg-base-100 shadow-xl border-2 border-base-300">
            <div className="card-body">
              <h2 className="card-title text-3xl mb-6 justify-center">Membership Benefits</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <FaCheckCircle className="text-success text-xl mt-1 flex-shrink-0" />
                    <p className="text-base-content/80">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Questions Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
          <p className="text-base-content/70 mb-6">
            Contact us if you need help with the membership process
          </p>
          <Link to="/contact" className="btn btn-outline btn-primary">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
