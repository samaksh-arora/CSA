import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaEnvelope,
  FaGraduationCap, FaPhone, FaEdit, FaTimes, FaCode, FaCalendarCheck
} from 'react-icons/fa';

const Profile = () => {
  const { currentUser, getToken } = useAuth();
  const [userData, setUserData] = useState(null);
  const [rsvpEvents, setRsvpEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    major: '',
    graduationYear: ''
  });

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
      if (!token) throw new Error('No authentication token available');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user', error);
      setError(error.response?.data?.error || error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRsvps = async () => {
    try {
      setLoadingEvents(true);
      const eventsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      const userRsvpEvents = eventsResponse.data.filter(event =>
        event.attendees?.some(a => a.userId === currentUser?.uid)
      );
      setRsvpEvents(userRsvpEvents.sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch (error) {
      console.error('Error fetching RSVP events:', error);
    } finally {
      setLoadingEvents(false);
    }
  };

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
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.put(`${import.meta.env.VITE_API_URL}/users/me`, editFormData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      setShowEditModal(false);
      fetchUserData();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditFormData({ firstName: '', lastName: '', phoneNumber: '', major: '', graduationYear: '' });
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-4 text-base-content/60 font-mono text-sm">// loading profile...</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-error/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaUser className="w-7 h-7 text-error" />
          </div>
          <h2 className="text-xl font-bold text-base-content mb-2">Profile Error</h2>
          <p className="text-base-content/60 text-sm mb-6">{error}</p>
          <button className="btn btn-primary rounded-full px-8" onClick={fetchUserData}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!userData) return null;

  const memberSince = new Date(userData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long'
  });

  return (
    <div className="bg-base-100 min-h-screen">

      {/* ── Hero Banner ── */}
      <div className="bg-base-200 border-b border-base-300">
        <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-base-100 shadow-xl">
                <img
                  src={`https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&size=200&background=random&color=ffffff&bold=true`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
             
            </div>

            {/* Name + meta */}
            <div className="text-center sm:text-left flex-1">
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-1 block">
                // member profile
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
                {userData.firstName} {userData.lastName}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                <span className="badge badge-primary">{userData.role}</span>
        
                {userData.major && (
                  <span className="badge badge-ghost">{userData.major}</span>
                )}
              </div>
            </div>

            {/* Edit button */}
            <button
              onClick={handleEditClick}
              className="btn btn-outline btn-sm rounded-full gap-2 shrink-0"
            >
              <FaEdit className="w-3 h-3" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Left Column: Info ── */}
          <div className="lg:col-span-1 space-y-6">

            {/* About Card */}
            <div className="bg-base-200 rounded-2xl border border-base-300 p-6">
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
                // about
              </span>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <FaEnvelope className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/50 font-medium">Email</p>
                    <p className="text-sm text-base-content font-medium truncate">{userData.email}</p>
                  </div>
                </div>

                {userData.phoneNumber && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <FaPhone className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-base-content/50 font-medium">Phone</p>
                      <p className="text-sm text-base-content font-medium">{userData.phoneNumber}</p>
                    </div>
                  </div>
                )}

                {userData.major && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <FaCode className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-base-content/50 font-medium">Major</p>
                      <p className="text-sm text-base-content font-medium">{userData.major}</p>
                    </div>
                  </div>
                )}

                {userData.graduationYear && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <FaGraduationCap className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-base-content/50 font-medium">Graduation Year</p>
                      <p className="text-sm text-base-content font-medium">{userData.graduationYear}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <FaCalendarCheck className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/50 font-medium">Member Since</p>
                    <p className="text-sm text-base-content font-medium">{memberSince}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-base-200 rounded-2xl border border-base-300 p-6">
              <span className="text-xs font-mono uppercase tracking-widest text-primary mb-4 block">
                // stats
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-base-100 rounded-xl p-4 border border-base-300">
                  <p className="text-2xl font-bold text-primary">{rsvpEvents.length}</p>
                  <p className="text-xs text-base-content/60 mt-1">Events RSVP'd</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 border border-base-300">
                  <p className="text-2xl font-bold text-primary capitalize">{userData.role}</p>
                  <p className="text-xs text-base-content/60 mt-1">Role</p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right Column: RSVP'd Events ── */}
          <div className="lg:col-span-2">
            <div className="bg-base-200 rounded-2xl border border-base-300 p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-primary">
                  // my events
                </span>
                <Link to="/events" className="btn btn-ghost btn-xs rounded-full text-primary">
                  Browse All →
                </Link>
              </div>

              {loadingEvents ? (
                <div className="flex justify-center py-12">
                  <span className="loading loading-spinner loading-md text-primary" />
                </div>
              ) : rsvpEvents.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 bg-base-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-base-300">
                    <FaCalendarAlt className="w-6 h-6 text-base-content/30" />
                  </div>
                  <p className="text-base-content/60 text-sm mb-4">No events RSVP'd yet</p>
                  <Link to="/events" className="btn btn-primary btn-sm rounded-full px-6">
                    Explore Events
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {rsvpEvents.map(event => {
                    const isPast = new Date(event.date) < new Date();
                    return (
                      <div
                        key={event._id}
                        className={`bg-base-100 rounded-xl border p-4 transition-all hover:border-primary group ${isPast ? 'border-base-300 opacity-60' : 'border-base-300'}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {isPast ? (
                                <span className="badge badge-ghost badge-xs">Past</span>
                              ) : (
                                <span className="badge badge-primary badge-xs">Upcoming</span>
                              )}
                            </div>
                            <h3 className="font-semibold text-base-content text-sm truncate group-hover:text-primary transition-colors">
                              {event.title}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                              <span className="flex items-center gap-1.5 text-xs text-base-content/60">
                                <FaCalendarAlt className="w-3 h-3 text-primary" />
                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              {event.time && (
                                <span className="flex items-center gap-1.5 text-xs text-base-content/60">
                                  <FaClock className="w-3 h-3 text-primary" />
                                  {event.time}
                                </span>
                              )}
                              {event.location && (
                                <span className="flex items-center gap-1.5 text-xs text-base-content/60">
                                  <FaMapMarkerAlt className="w-3 h-3 text-primary" />
                                  {event.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Edit Modal ── */}
      {showEditModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-base-content/40 backdrop-blur-sm" onClick={handleCancelEdit} />
          <div className="relative bg-base-100 rounded-2xl border border-base-300 shadow-2xl w-full max-w-lg p-6 z-10">

            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-1">
                  // edit profile
                </span>
                <h3 className="text-xl font-bold text-base-content">Update your info</h3>
              </div>
              <button onClick={handleCancelEdit} className="btn btn-ghost btn-sm btn-circle">
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs font-medium text-base-content/70">First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditFormChange}
                    className="input input-bordered input-sm rounded-xl"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xs font-medium text-base-content/70">Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditFormChange}
                    className="input input-bordered input-sm rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs font-medium text-base-content/70">Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={editFormData.phoneNumber}
                  onChange={handleEditFormChange}
                  className="input input-bordered input-sm rounded-xl"
                  placeholder="(555) 000-0000"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs font-medium text-base-content/70">Major</span>
                </label>
                <input
                  type="text"
                  name="major"
                  value={editFormData.major}
                  onChange={handleEditFormChange}
                  className="input input-bordered input-sm rounded-xl"
                  placeholder="e.g. Computer Science"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xs font-medium text-base-content/70">Graduation Year</span>
                </label>
                <input
                  type="text"
                  name="graduationYear"
                  value={editFormData.graduationYear}
                  onChange={handleEditFormChange}
                  className="input input-bordered input-sm rounded-xl"
                  placeholder="e.g. 2026"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={handleCancelEdit} className="btn btn-ghost btn-sm flex-1 rounded-full">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm flex-1 rounded-full">
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
