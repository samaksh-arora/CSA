import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaUsers, FaCalendarAlt, FaMoneyBillWave, FaUserShield, FaSearch, FaTimes, FaEye, FaEdit, FaTrash, FaUserCog, FaFileExcel, FaDownload } from 'react-icons/fa';
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
    name: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });

  // Fetch dashboard data
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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard ', error);
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
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.major.toLowerCase().includes(searchLower) ||
      user.graduationYear.toString().includes(searchLower)
    );
  });

  const togglePaymentStatus = async (userId, currentStatus) => {
    try {
      const token = await getToken();
      const newStatus = currentStatus === 'paid' ? 'not_paid' : 'paid';
      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${userId}/payment`,
        { paymentStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update payment status.');
    }
  };

  const toggleUserRole = async (userId, currentRole) => {
    try {
      const token = await getToken();
      const newRole = currentRole === 'admin' ? 'member' : 'admin';
      
      if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/users/${userId}/role`,
          { role: newRole },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role.');
    }
  };

  const deleteUser = async (userId, userEmail) => {
    try {
      if (window.confirm(`Are you sure you want to delete user ${userEmail}? This action cannot be undone.`)) {
        const token = await getToken();
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/users/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  // Edit Event Functions
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    
    // Format date for input (YYYY-MM-DD)
    const formattedDate = new Date(event.date).toISOString().split('T')[0];
    
    setEditFormData({
      name: event.name,
      date: formattedDate,
      time: event.time,
      location: event.location,
      description: event.description
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
      alert('Failed to update event. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingEvent(null);
    setEditFormData({
      name: '',
      date: '',
      time: '',
      location: '',
      description: ''
    });
  };

  // Delete Event Function
  const handleDeleteEvent = async (eventId, eventName) => {
    if (window.confirm(`Are you sure you want to delete "${eventName}"? This action cannot be undone.`)) {
      try {
        const token = await getToken();
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/events/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        alert('Event deleted successfully!');
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  // Export functions
  const handleExportMembers = () => {
    const success = exportMembersToExcel(filteredUsers);
    if (success) {
      alert(`Successfully exported ${filteredUsers.length} members to Excel!`);
    } else {
      alert('Failed to export members. Please try again.');
    }
  };

  const handleExportAttendees = () => {
    const success = exportAttendeesToExcel(eventAttendees, selectedEvent);
    if (success) {
      alert(`Successfully exported ${eventAttendees.length} attendees to Excel!`);
    } else {
      alert('Failed to export attendees. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-base-200 to-base-300">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/70">Loading dashboard...</p>
      </div>
    );
  }

  const paidMembers = users.filter(u => u.paymentStatus === 'paid').length;
  const totalMembers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  const stats = [
    {
      title: 'Total Users',
      value: totalMembers,
      description: 'Registered users',
      icon: FaUsers,
      color: 'primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Paid Members',
      value: paidMembers,
      description: `${totalMembers - paidMembers} pending`,
      icon: FaMoneyBillWave,
      color: 'success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Admins',
      value: adminCount,
      description: 'Admin users',
      icon: FaUserShield,
      color: 'secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Total Events',
      value: events.length,
      description: 'Scheduled events',
      icon: FaCalendarAlt,
      color: 'info',
      bgColor: 'bg-info/10',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-base-content/70">Manage users, events, and organization settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={stat.title} className="card bg-base-100 shadow-lg border border-base-300 hover:border-primary/50 transition-all hover:-translate-y-1">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-base-content/60 font-medium">{stat.title}</p>
                    <p className={`text-4xl font-bold text-${stat.color} mt-2`}>{stat.value}</p>
                    <p className="text-xs text-base-content/50 mt-1">{stat.description}</p>
                  </div>
                  <div className={`${stat.bgColor} p-4 rounded-2xl`}>
                    <stat.icon className={`text-3xl text-${stat.color}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="tabs tabs-boxed bg-base-100 shadow-lg mb-6 p-2 border border-base-300">
          <button
            className={`tab tab-lg flex-1 gap-2 ${activeTab === 'users' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUserCog />
            User Management
          </button>
          <button
            className={`tab tab-lg flex-1 gap-2 ${activeTab === 'events' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <FaCalendarAlt />
            Events
          </button>
        </div>

        {/* Users Table */}
        {activeTab === 'users' && (
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              {/* Search Bar & Export Button */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="card-title text-2xl text-primary flex items-center gap-2">
                    <FaUsers />
                    User Management
                  </h2>
                  <p className="text-sm text-base-content/60 mt-1">
                    Manage member accounts and permissions
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {/* Export Button */}
                  <button
                    className="btn btn-success gap-2"
                    onClick={handleExportMembers}
                    disabled={filteredUsers.length === 0}
                  >
                    <FaFileExcel />
                    Export to Excel ({filteredUsers.length})
                  </button>
                  
                  {/* Search */}
                  <div className="form-control">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search by name, email, major..."
                        className="input input-bordered input-primary w-full md:w-80"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm ? (
                        <button 
                          className="btn btn-square btn-primary"
                          onClick={() => setSearchTerm('')}
                        >
                          <FaTimes />
                        </button>
                      ) : (
                        <button className="btn btn-square btn-primary">
                          <FaSearch />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {searchTerm && (
                <div className="alert alert-info shadow-lg mb-4">
                  <FaSearch />
                  <span>
                    Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users matching "{searchTerm}"
                  </span>
                  <button 
                    className="btn btn-sm btn-ghost"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear
                  </button>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-base-200">
                      <th className="font-bold">Name</th>
                      <th className="font-bold">Email</th>
                      <th className="font-bold">Major</th>
                      <th className="font-bold">Year</th>
                      <th className="font-bold">Role</th>
                      <th className="font-bold">Payment</th>
                      <th className="font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-base-200/50">
                        <td className="font-semibold">{user.firstName} {user.lastName}</td>
                        <td className="text-sm">{user.email}</td>
                        <td>{user.major}</td>
                        <td>{user.graduationYear}</td>
                        <td>
                          <div className={`badge badge-lg ${user.role === 'admin' ? 'badge-secondary' : 'badge-primary'}`}>
                            {user.role === 'admin' && <FaUserShield className="mr-1" />}
                            {user.role}
                          </div>
                        </td>
                        <td>
                          <div className={`badge badge-lg ${user.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                            {user.paymentStatus === 'paid' ? '✓ Paid' : 'Pending'}
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-2 justify-center flex-wrap">
                            <button
                              className="btn btn-xs btn-success gap-1"
                              onClick={() => togglePaymentStatus(user._id, user.paymentStatus)}
                              title="Toggle Payment Status"
                            >
                              <FaMoneyBillWave />
                              Payment
                            </button>
                            <button
                              className="btn btn-xs btn-info gap-1"
                              onClick={() => toggleUserRole(user._id, user.role)}
                              title="Toggle Role"
                            >
                              <FaUserShield />
                              Role
                            </button>
                            <button
                              className="btn btn-xs btn-error gap-1"
                              onClick={() => deleteUser(user._id, user.email)}
                              title="Delete User"
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <FaSearch className="text-6xl text-base-content/20 mx-auto mb-4" />
                    <p className="text-base-content/60 text-lg">No users found matching your search.</p>
                    <button 
                      className="btn btn-primary btn-sm mt-4"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Events Table */}
        {activeTab === 'events' && (
          <div className="card bg-base-100 shadow-xl border border-base-300">
            <div className="card-body">
              <div className="mb-6">
                <h2 className="card-title text-2xl text-primary flex items-center gap-2">
                  <FaCalendarAlt />
                  Event Management
                </h2>
                <p className="text-sm text-base-content/60 mt-1">
                  View and manage organization events
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="bg-base-200">
                      <th className="font-bold">Event Name</th>
                      <th className="font-bold">Date</th>
                      <th className="font-bold">Time</th>
                      <th className="font-bold">Location</th>
                      <th className="font-bold text-center">Attendees</th>
                      <th className="font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event._id} className="hover:bg-base-200/50">
                        <td className="font-semibold">{event.name}</td>
                        <td>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}</td>
                        <td>{event.time}</td>
                        <td>{event.location}</td>
                        <td className="text-center">
                          <button 
                            className="badge badge-info badge-lg cursor-pointer hover:badge-primary transition-colors gap-1"
                            onClick={() => fetchEventAttendees(event._id, event.name)}
                          >
                            <FaUsers />
                            {event.attendees?.length || 0}
                          </button>
                        </td>
                        <td>
                          <div className="flex gap-2 justify-center flex-wrap">
                            <button 
                              className="btn btn-xs btn-info gap-1"
                              onClick={() => fetchEventAttendees(event._id, event.name)}
                            >
                              <FaEye />
                              View
                            </button>
                            <button 
                              className="btn btn-xs btn-primary gap-1"
                              onClick={() => handleEditEvent(event)}
                            >
                              <FaEdit />
                              Edit
                            </button>
                            <button 
                              className="btn btn-xs btn-error gap-1"
                              onClick={() => handleDeleteEvent(event._id, event.name)}
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {showEditModal && (
          <div className="modal modal-open">
            <div className="modal-box max-w-2xl">
              <h3 className="font-bold text-2xl text-primary mb-6 flex items-center gap-2">
                <FaEdit />
                Edit Event
              </h3>
              
              <form onSubmit={handleSaveEdit}>
                <div className="space-y-4">
                  {/* Event Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Event Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditFormChange}
                      className="input input-bordered input-primary"
                      required
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Date</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={editFormData.date}
                        onChange={handleEditFormChange}
                        className="input input-bordered input-primary"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Time</span>
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={editFormData.time}
                        onChange={handleEditFormChange}
                        className="input input-bordered input-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Location</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={editFormData.location}
                      onChange={handleEditFormChange}
                      className="input input-bordered input-primary"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Description</span>
                    </label>
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={handleEditFormChange}
                      className="textarea textarea-bordered textarea-primary h-32"
                      required
                    />
                  </div>
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleCancelEdit}
                  >
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

        {/* Event Attendees Modal */}
        {showAttendeesModal && (
          <div className="modal modal-open">
            <div className="modal-box max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-2xl text-primary flex items-center gap-2">
                    <FaUsers />
                    Event Attendees
                  </h3>
                  <p className="text-base-content/70 mt-1">
                    Showing RSVPs for "<strong>{selectedEvent}</strong>"
                  </p>
                </div>
                {eventAttendees.length > 0 && (
                  <button
                    className="btn btn-success gap-2"
                    onClick={handleExportAttendees}
                  >
                    <FaDownload />
                    Export to Excel
                  </button>
                )}
              </div>
              
              {eventAttendees.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr className="bg-base-200">
                        <th className="font-bold">Name</th>
                        <th className="font-bold">RSVP Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventAttendees.map((attendee, index) => (
                        <tr key={index}>
                          <td className="font-semibold">{attendee.userName}</td>
                          <td>{new Date(attendee.rsvpDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaUsers className="text-6xl text-base-content/20 mx-auto mb-4" />
                  <p className="text-base-content/60 text-lg">No attendees have RSVP'd for this event yet.</p>
                </div>
              )}
              
              <div className="modal-action">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAttendeesModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
