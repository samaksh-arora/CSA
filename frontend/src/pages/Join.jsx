import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaGraduationCap, FaPhone, FaBook, FaUserPlus } from 'react-icons/fa';

const Join = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    major: '',
    graduationYear: '',
    phoneNumber: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate Wayne State email
    if (!formData.email.endsWith('@wayne.edu')) {
      setError('Please use your Wayne State University email (@wayne.edu)');
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signup(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        major: formData.major,
        graduationYear: formData.graduationYear,
        phoneNumber: formData.phoneNumber,
        role: 'member'
      });
      navigate('/profile');
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 px-4 py-12">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <FaUserPlus className="text-3xl text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Join GSCMA</h1>
          <p className="text-base-content/70">
            Become a member and start your journey in supply chain excellence
          </p>
        </div>

        {/* Registration Card */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body">
            {/* Error Alert */}
            {error && (
              <div className="alert alert-error mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaUser className="text-base-content/40" />
                    </span>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="input input-bordered w-full pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaUser className="text-base-content/40" />
                    </span>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="input input-bordered w-full pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-semibold">Wayne State Email</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaEnvelope className="text-base-content/40" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@wayne.edu"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Must be a valid @wayne.edu email address
                  </span>
                </label>
              </div>

              {/* Password Fields */}
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaLock className="text-base-content/40" />
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 6 characters"
                      className="input input-bordered w-full pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Confirm Password</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaLock className="text-base-content/40" />
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className="input input-bordered w-full pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="divider my-6">Academic Information</div>

              {/* Major Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Major</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaBook className="text-base-content/40" />
                  </span>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    placeholder="e.g., Supply Chain Management"
                    className="input input-bordered w-full pl-10"
                    required
                  />
                </div>
              </div>

              {/* Graduation Year & Phone */}
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Graduation Year</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaGraduationCap className="text-base-content/40" />
                    </span>
                    <input
                      type="number"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleChange}
                      placeholder="2026"
                      min="2024"
                      max="2030"
                      className="input input-bordered w-full pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Phone Number</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaPhone className="text-base-content/40" />
                    </span>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className="input input-bordered w-full pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-control mt-8">
                <button 
                  type="submit" 
                  className={`btn btn-primary w-full btn-lg ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-base-content/70">
                  Already have an account?{' '}
                  <Link to="/login" className="link link-primary font-semibold hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-xs text-base-content/50">
            By creating an account, you agree to GSCMA's Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Join;
