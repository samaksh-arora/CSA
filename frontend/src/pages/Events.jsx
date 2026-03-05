import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { FaPlus, FaTimes, FaCalendarAlt } from 'react-icons/fa';

const Events = () => {
  const { currentUser, userRole, getToken } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '', date: '', time: '', location: '', description: ''
  });

  const isAdmin = userRole === 'admin';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      if (editingEvent) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/events/${editingEvent._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/events`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      closeModal();
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event. Please try again.');
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
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
  };

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

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({ name: '', date: '', time: '', location: '', description: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setFormData({ name: '', date: '', time: '', location: '', description: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-4 text-base-content/60 font-mono text-sm">// loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">

      {/* ── Hero ── */}
      <section className="bg-base-200 border-b border-base-300 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-primary mb-3">
                // events
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content tracking-tight mb-3">
                Upcoming Events
              </h1>
              <p className="text-base sm:text-lg text-base-content/65 max-w-xl">
                Workshops, hackathons, tech talks, and networking — stay plugged in to what's happening at CSA.
              </p>
            </div>
            {isAdmin && (
              <button
                className="btn btn-primary gap-2 shrink-0 w-full sm:w-auto"
                onClick={openCreateModal}
              >
                <FaPlus className="w-3.5 h-3.5" />
                Create Event
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Events Grid ── */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-6xl">
        {events.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-base-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaCalendarAlt className="w-7 h-7 text-base-content/30" />
            </div>
            <p className="text-base-content/50 font-mono text-sm mb-1">// no events found</p>
            <p className="text-base-content/40 text-sm">Check back soon for upcoming workshops and events.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
      </section>

      {/* ── Create / Edit Modal ── */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto border border-base-300 p-0">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-base-300">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-0.5">
                  {editingEvent ? '// edit' : '// new event'}
                </span>
                <h3 className="font-bold text-xl text-base-content">
                  {editingEvent ? 'Edit Event' : 'Create Event'}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-sm btn-ghost btn-circle"
                aria-label="Close modal"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

              {/* Event Name */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold">Event Name</span>
                  <span className="label-text-alt text-error">required</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="e.g., Intro to React Workshop"
                  required
                  autoComplete="off"
                />
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text font-semibold">Date</span>
                    <span className="label-text-alt text-error">required</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:input-primary"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="label-text font-semibold">Time</span>
                    <span className="label-text-alt text-error">required</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="input input-bordered w-full focus:input-primary"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold">Location</span>
                  <span className="label-text-alt text-error">required</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="input input-bordered w-full focus:input-primary"
                  placeholder="e.g., Engineering Building Room 2100"
                  required
                  autoComplete="off"
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label pb-1">
                  <span className="label-text font-semibold">Description</span>
                  <span className="label-text-alt text-error">required</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full focus:textarea-primary leading-relaxed min-h-[120px]"
                  placeholder="What will attendees learn or do at this event?"
                  rows={5}
                  required
                />
                <label className="label pt-1">
                  <span className="label-text-alt text-base-content/40 font-mono">
                    {formData.description.length} characters
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2 border-t border-base-300">
                <button
                  type="button"
                  className="btn btn-ghost w-full sm:w-auto"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto sm:ml-auto"
                >
                  {editingEvent ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={closeModal} />
        </div>
      )}
    </div>
  );
};

export default Events;
