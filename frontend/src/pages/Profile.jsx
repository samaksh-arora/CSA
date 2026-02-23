import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaEnvelope, FaGraduationCap, FaPhone, FaCalendarCheck, FaEdit, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { currentUser, getToken } = useAuth();
  const [userData, setUserData] = useState(null);
  const [rsvpEvents, setRsvpEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState(null);
  
  // Edit profile state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    major: '',
    graduationYear: ''
  });

  // Fetch user profile data
  useEffect(() => {
    if (currentUser) {
      fetchUserData();
      fetchUserRsvps();
    } else {
      setLoading(false);
      setError('No user logged in');
    }
  }, [currentUser]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = await getToken();
      if (!token) {
        throw new Error('No authentication token available');
      }

      console.log('Fetching user data with token:', token.substring(0, 20) + '...');
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/me`,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      console.log('User data response:', response.data);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user ', error);
      if (error.response) {
        console.error('Response ', error.response.data);
        console.error('Response status:', error.response.status);
        setError(`Server error: ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response from server. Make sure the backend is running.');
      } else {
        console.error('Error message:', error.message);
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRsvps = async () => {
    try {
      setLoadingEvents(true);
      const token = await getToken();
      
      // Fetch all events
      const eventsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/events`
      );
      
      // Filter events where current user has RSVP'd
      const userRsvpEvents = eventsResponse.data.filter(event => 
        event.attendees?.some(attendee => attendee.userId === currentUser?.uid)
      );
      
      // Sort by date (upcoming first)
      const sortedEvents = userRsvpEvents.sort((a, b) => 
        new Date(a.date) - new Date(b.date)
      );
      
      setRsvpEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching RSVP events:', error);
    } finally {
      setLoadingEvents(false);
    }
  };

  // Edit Profile Functions
  const handleEditClick = () => {
    setEditFormData({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      major: userData.major,
      graduationYear: userData.graduationYear
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    try {
      const token = await getToken();
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/me`,
        editFormData,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      alert('Profile updated successfully!');
      setShowEditModal(false);
      fetchUserData(); // Refresh user data
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      major: '',
      graduationYear: ''
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/70">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="alert alert-error max-w-md mx-auto shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Profile Error</h3>
            <div className="text-xs">{error}</div>
          </div>
        </div>
        <button 
          className="btn btn-primary mt-4" 
          onClick={fetchUserData}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="alert alert-warning max-w-md mx-auto shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h3 className="font-bold">No Profile Data</h3>
            <div className="text-xs">Unable to load profile information.</div>
          </div>
        </div>
        <button 
          className="btn btn-primary mt-4" 
          onClick={fetchUserData}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2">My Profile</h1>
            <p className="text-base-content/60">Manage your GSCMA membership details</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="card bg-base-100 shadow-xl border border-base-300">
                <figure className="px-10 pt-10">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={`https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&size=200&background=4ade80&color=ffffff`}
                        alt="Profile"
                      />
                    </div>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-2xl">{userData.firstName} {userData.lastName}</h2>
                  <div className="badge badge-primary badge-lg">{userData.role}</div>
                  {userData.paymentStatus && (
                    <div className={`badge badge-lg ${userData.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                      {userData.paymentStatus === 'paid' ? 'Dues Paid ✓' : 'Dues Pending'}
                    </div>
                  )}
                  <div className="divider"></div>
                  <div className="stats stats-vertical shadow w-full">
                    <div className="stat place-items-center">
                      <div className="stat-title">Events RSVP'd</div>
                      <div className="stat-value text-primary">{rsvpEvents.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Information */}
            <div className="md:col-span-2 space-y-6">
              {/* Personal Info Card */}
              <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-6 flex items-center gap-2">
                    <FaUser className="text-primary" />
                    Personal Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-base-content/60">
                        <FaEnvelope className="text-primary" />
                        Email
                      </div>
                      <p className="text-lg pl-6">{userData.email}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-base-content/60">
                        <FaPhone className="text-primary" />
                        Phone Number
                      </div>
                      <p className="text-lg pl-6">{userData.phoneNumber}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-base-content/60">
                        <FaGraduationCap className="text-primary" />
                        Major
                      </div>
                      <p className="text-lg pl-6">{userData.major}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-base-content/60">
                        <FaCalendarCheck className="text-primary" />
                        Graduation Year
                      </div>
                      <p className="text-lg pl-6">{userData.graduationYear}</p>
                    </div>
                  </div>

                  <div className="divider"></div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-base-content/60">Member Since</p>
                    <p className="text-lg">{new Date(userData.createdAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</p>
                  </div>

                  <div className="card-actions justify-end mt-6">
                    <button 
                      className="btn btn-primary gap-2"
                      onClick={handleEditClick}
                    >
                      <FaEdit />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* My RSVPs Card */}
              <div className="card bg-base-100 shadow-xl border border-base-300">
                <div className="card-body">
                  <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    My RSVPs
                  </h2>
                  
                  {loadingEvents ? (
                    <div className="flex justify-center py-8">
                      <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                  ) : rsvpEvents.length === 0 ? (
                    <div className="text-center py-8">
                      <FaCalendarAlt className="text-6xl text-base-content/20 mx-auto mb-4" />
                      <p className="text-base-content/60 mb-4">You haven't RSVP'd to any events yet.</p>
                      <Link to="/events" className="btn btn-primary btn-sm">
                        Browse Events
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {rsvpEvents.map((event) => (
                        <div key={event._id} className="border border-base-300 rounded-lg p-4 hover:border-primary transition-colors">
                          <Link to="/events">
                            <h3 className="font-bold text-lg mb-2 text-primary hover:underline">
                              {event.name}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-base-content/70">
                              <div className="flex items-center gap-1">
                                <FaCalendarAlt className="text-secondary" />
                                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaClock className="text-secondary" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaMapMarkerAlt className="text-accent" />
                                <span>{event.location}</span>
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
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl text-primary mb-6 flex items-center gap-2">
              <FaEdit />
              Edit Profile
            </h3>
            
            <form onSubmit={handleSaveProfile}>
              <div className="space-y-4">
                {/* First Name & Last Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">First Name</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={editFormData.firstName}
                      onChange={handleEditFormChange}
                      className="input input-bordered input-primary"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Last Name</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={editFormData.lastName}
                      onChange={handleEditFormChange}
                      className="input input-bordered input-primary"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={editFormData.phoneNumber}
                    onChange={handleEditFormChange}
                    className="input input-bordered input-primary"
                    required
                  />
                </div>

                {/* Major */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Major</span>
                  </label>
                  <input
                    type="text"
                    name="major"
                    value={editFormData.major}
                    onChange={handleEditFormChange}
                    className="input input-bordered input-primary"
                    required
                  />
                </div>

                {/* Graduation Year */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Graduation Year</span>
                  </label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={editFormData.graduationYear}
                    onChange={handleEditFormChange}
                    className="input input-bordered input-primary"
                    min="2020"
                    max="2035"
                    required
                  />
                </div>

                {/* Email (Read-only) */}
                <div className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-sm">Email address cannot be changed. Contact admin if you need to update your email.</span>
                </div>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost gap-2"
                  onClick={handleCancelEdit}
                >
                  <FaTimes />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary gap-2"
                >
                  <FaEdit />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
