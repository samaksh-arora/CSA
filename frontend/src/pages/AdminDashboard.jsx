import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  FaUsers, FaCalendarAlt, FaUserShield, FaSearch,
  FaTimes, FaEye, FaEdit, FaTrash, FaUserCog,
  FaFileExcel, FaDownload, FaCode
} from 'react-icons/fa';
import { exportMembersToExcel, exportAttendeesToExcel } from '../utils/exportToExcel';

const AdminDashboard = () => {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventAttendees, setEventAttendees] = useState([]);
  const [showAttendeesModal, setShowAttendeesModal] = useState(false);

  // Edit event state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '', date: '', time: '', location: '', description: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const [usersRes, eventsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/users/all`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/events`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setUsers(usersRes.data);
      setEvents(eventsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventAttendees = async (eventId, eventName) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/events/${eventId}/attendees`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEventAttendees(response.data);
      setSelectedEvent(eventName);
      setShowAttendeesModal(true);
    } catch (error) {
      console.error('Error fetching event attendees:', error);
      alert('Failed to fetch event attendees.');
    }
  };

  const filteredUsers = users.filter(user => {
    const s = searchTerm.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(s) ||
      user.lastName?.toLowerCase().includes(s) ||
      user.email?.toLowerCase().includes(s) ||
      user.major?.toLowerCase().includes(s) ||
      user.graduationYear?.toString().includes(s)
    );
  });

  const toggleUserRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'member' : 'admin';
    if (!window.confirm(`Change this user's role to ${newRole}?`)) return;
    try {
      const token = await getToken();
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role.');
    }
  };

  const deleteUser = async (userId, userEmail) => {
    if (!window.confirm(`Delete user ${userEmail}? This cannot be undone.`)) return;
    try {
      const token = await getToken();
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEditFormData({
      name: event.name,
      date: new Date(event.date).toISOString().split('T')[0],
      time: event.time,
      location: event.location,
      description: event.description
    });
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.put(
        `${import.meta.env.VITE_API_URL}/events/${editingEvent._id}`,
        editFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Event updated successfully!');
      setShowEditModal(false);
      setEditingEvent(null);
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event.');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingEvent(null);
    setEditFormData({ name: '', date: '', time: '', location: '', description: '' });
  };

  const handleDeleteEvent = async (eventId, eventName) => {
    if (!window.confirm(`Delete "${eventName}"? This cannot be undone.`)) return;
    try {
      const token = await getToken();
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/events/${eventId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event.');
    }
  };

  const stats = [
    { title: 'Total Members', value: users.length, icon: FaUsers, color: 'primary' },
    { title: 'Total Events', value: events.length, icon: FaCalendarAlt, color: 'secondary' },
    { title: 'Admins', value: users.filter(u => u.role === 'admin').length, icon: FaUserShield, color: 'accent' },
    { title: 'Upcoming', value: events.filter(e => new Date(e.date) >= new Date()).length, icon: FaCode, color: 'info' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-4 text-base-content/60 font-mono text-sm">// loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-7xl">

        {/* ── Header ── */}
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-primary">// admin</span>
          <h1 className="text-4xl font-bold text-base-content mt-1">Admin Dashboard</h1>
          <p className="text-base-content/60 mt-1">Manage members, events, and roles</p>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ title, value, icon: Icon, color }) => (
            <div key={title} className="card bg-base-100 border border-base-300 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm">
              <div className="card-body p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-base-content/50 font-medium uppercase tracking-wide">{title}</p>
                    <p className={`text-3xl font-bold text-${color} mt-1`}>{value}</p>
                  </div>
                  <div className={`w-10 h-10 bg-${color}/10 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${color}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="tabs tabs-boxed bg-base-100 border border-base-300 p-1 mb-6 w-fit rounded-xl">
          <button
            className={`tab gap-2 rounded-lg transition-all ${activeTab === 'users' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUserCog className="w-4 h-4" /> User Management
          </button>
          <button
            className={`tab gap-2 rounded-lg transition-all ${activeTab === 'events' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <FaCalendarAlt className="w-4 h-4" /> Event Management
          </button>
        </div>

        {/* ── Users Tab ── */}
        {activeTab === 'users' && (
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-4 sm:p-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <h2 className="text-xl font-bold text-base-content">Members</h2>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-3.5 h-3.5" />
                    <input
                      type="text"
                      placeholder="Search members..."
                      className="input input-bordered input-sm pl-9 w-56"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-sm btn-outline gap-2"
                    onClick={() => exportMembersToExcel(users)}
                  >
                    <FaFileExcel className="w-3.5 h-3.5" /> Export
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-base-300">
                <table className="table table-sm">
                  <thead className="bg-base-200">
                    <tr>
                      <th>Member</th>
                      <th>Major</th>
                      <th>Grad Year</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user._id} className="hover">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-8 rounded-full">
                                <img
                                  src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random&bold=true`}
                                  alt={user.firstName}
                                />
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{user.firstName} {user.lastName}</p>
                              <p className="text-xs text-base-content/50">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-sm text-base-content/70">{user.major}</td>
                        <td className="text-sm text-base-content/70">{user.graduationYear}</td>
                        <td>
                          <div className={`badge gap-1 ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                            {user.role === 'admin' && <FaUserShield className="w-3 h-3" />}
                            {user.role}
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button
                              className="btn btn-xs btn-outline gap-1"
                              onClick={() => toggleUserRole(user._id, user.role)}
                              title="Toggle role"
                            >
                              <FaUserCog className="w-3 h-3" />
                              {user.role === 'admin' ? 'Demote' : 'Promote'}
                            </button>
                            <button
                              className="btn btn-xs btn-error btn-outline"
                              onClick={() => deleteUser(user._id, user.email)}
                              title="Delete user"
                            >
                              <FaTrash className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-base-content/40 font-mono text-sm">
                          // no members found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Events Tab ── */}
        {activeTab === 'events' && (
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-base-content">Events</h2>
                <button
                  className="btn btn-sm btn-outline gap-2"
                  onClick={() => exportAttendeesToExcel(events)}
                >
                  <FaDownload className="w-3.5 h-3.5" /> Export
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-base-300">
                <table className="table table-sm">
                  <thead className="bg-base-200">
                    <tr>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(event => (
                      <tr key={event._id} className="hover">
                        <td>
                          <p className="font-semibold text-sm">{event.name}</p>
                          <p className="text-xs text-base-content/50 line-clamp-1">{event.description}</p>
                        </td>
                        <td className="text-sm text-base-content/70">
                          {new Date(event.date).toLocaleDateString()} {event.time && `• ${event.time}`}
                        </td>
                        <td className="text-sm text-base-content/70">{event.location}</td>
                        <td>
                          <div className="flex gap-1">
                            <button
                              className="btn btn-xs btn-outline gap-1"
                              onClick={() => fetchEventAttendees(event._id, event.name)}
                            >
                              <FaEye className="w-3 h-3" /> Attendees
                            </button>
                            <button
                              className="btn btn-xs btn-outline gap-1"
                              onClick={() => handleEditEvent(event)}
                            >
                              <FaEdit className="w-3 h-3" /> Edit
                            </button>
                            <button
                              className="btn btn-xs btn-error btn-outline"
                              onClick={() => handleDeleteEvent(event._id, event.name)}
                            >
                              <FaTrash className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {events.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-base-content/40 font-mono text-sm">
                          // no events found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Attendees Modal ── */}
      {showAttendeesModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl border border-base-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Attendees — {selectedEvent}</h3>
              <button
                className="btn btn-sm btn-ghost btn-circle"
                onClick={() => setShowAttendeesModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            {eventAttendees.length === 0 ? (
              <p className="text-base-content/50 font-mono text-sm text-center py-6">// no attendees yet</p>
            ) : (
              <>
                <div className="overflow-x-auto rounded-xl border border-base-300 mb-4">
                  <table className="table table-sm">
                    <thead className="bg-base-200">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Major</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventAttendees.map((attendee, i) => (
                        <tr key={i} className="hover">
                          <td className="font-medium text-sm">{attendee.firstName} {attendee.lastName}</td>
                          <td className="text-sm text-base-content/60">{attendee.email}</td>
                          <td className="text-sm text-base-content/60">{attendee.major}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  className="btn btn-sm btn-outline gap-2 w-full"
                  onClick={() => exportAttendeesToExcel(eventAttendees, selectedEvent)}
                >
                  <FaFileExcel className="w-3.5 h-3.5" /> Export Attendees
                </button>
              </>
            )}
          </div>
          <div className="modal-backdrop" onClick={() => setShowAttendeesModal(false)} />
        </div>
      )}

      {/* ── Edit Event Modal ── */}
      {showEditModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg border border-base-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Edit Event</h3>
              <button className="btn btn-sm btn-ghost btn-circle" onClick={handleCancelEdit}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div className="form-control">
                <label className="label"><span className="label-text text-sm">Event Name</span></label>
                <input name="name" value={editFormData.name} onChange={handleEditFormChange}
                  className="input input-bordered input-sm" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label"><span className="label-text text-sm">Date</span></label>
                  <input name="date" type="date" value={editFormData.date} onChange={handleEditFormChange}
                    className="input input-bordered input-sm" required />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text text-sm">Time</span></label>
                  <input name="time" value={editFormData.time} onChange={handleEditFormChange}
                    className="input input-bordered input-sm" />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text text-sm">Location</span></label>
                <input name="location" value={editFormData.location} onChange={handleEditFormChange}
                  className="input input-bordered input-sm" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text text-sm">Description</span></label>
                <textarea name="description" value={editFormData.description} onChange={handleEditFormChange}
                  className="textarea textarea-bordered textarea-sm h-24" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="btn btn-primary btn-sm flex-1">Save Changes</button>
                <button type="button" className="btn btn-ghost btn-sm flex-1" onClick={handleCancelEdit}>Cancel</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={handleCancelEdit} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
