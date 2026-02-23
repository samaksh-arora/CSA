import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';

const Events = () => {
  const { currentUser, userRole, getToken } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  const isAdmin = userRole === 'admin';

  // Fetch all events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle create/edit event submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      if (editingEvent) {
        // Update existing event
        await axios.put(
          `${import.meta.env.VITE_API_URL}/events/${editingEvent._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new event
        await axios.post(
          `${import.meta.env.VITE_API_URL}/events`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setShowModal(false);
      setEditingEvent(null);
      setFormData({ name: '', date: '', time: '', location: '', description: '' });
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  // Handle event deletion
  const handleDelete = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = await getToken();
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/events/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event.');
      }
    }
  };

  // Handle edit button click
  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      date: event.date.split('T')[0],
      time: event.time,
      location: event.location,
      description: event.description
    });
    setShowModal(true);
  };

  // Open modal for creating new event
  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({ name: '', date: '', time: '', location: '', description: '' });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Header Section - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
            Upcoming Events
          </h1>
          <p className="text-base sm:text-lg text-base-content/70">
            Join us for exciting events and networking opportunities
          </p>
        </div>
        {isAdmin && (
          <button 
            className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto shadow-lg"
            onClick={openCreateModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Create Event</span>
            <span className="inline sm:hidden">New Event</span>
          </button>
        )}
      </div>

      {/* Events Grid - Mobile Optimized */}
      {events.length === 0 ? (
        <div className="text-center py-12 sm:py-16 px-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-lg sm:text-xl text-base-content/60">
            No events scheduled at the moment. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              isAdmin={isAdmin}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Event Modal - Mobile Optimized */}
      {showModal && (
        <div className="modal modal-open">
          {/* Modal backdrop with improved touch target */}
          <div 
            className="modal-backdrop bg-black/50" 
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal box with responsive sizing */}
          <div className="modal-box w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="font-bold text-xl sm:text-2xl">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-circle btn-ghost"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Form with mobile-optimized inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Event Name</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full focus:input-primary text-base"
                  placeholder="e.g., Supply Chain Workshop"
                  required
                  autoComplete="off"
                />
              </div>

              {/* Date and Time - Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">Date</span>
                    <span className="label-text-alt text-error">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:input-primary text-base"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">Time</span>
                    <span className="label-text-alt text-error">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:input-primary text-base"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Location</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input input-bordered w-full focus:input-primary text-base"
                  placeholder="e.g., Student Center Room 101"
                  required
                  autoComplete="off"
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">Description</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full focus:textarea-primary text-base leading-relaxed min-h-[120px]"
                  placeholder="Describe your event..."
                  rows="5"
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    {formData.description.length} characters
                  </span>
                </label>
              </div>

              {/* Modal Actions - Mobile Optimized */}
              <div className="modal-action mt-6 flex-col sm:flex-row gap-2 sm:gap-3">
                <button 
                  type="button" 
                  className="btn btn-ghost w-full sm:w-auto order-2 sm:order-1"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary w-full sm:w-auto order-1 sm:order-2"
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
