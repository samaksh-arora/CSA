import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaEdit, FaTrash, FaUsers, FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Event Card Component - displays event details with RSVP functionality
const EventCard = ({ event, isAdmin, onDelete, onEdit }) => {
  const { currentUser, getToken } = useAuth();
  const [isRsvped, setIsRsvped] = useState(
    event.attendees?.some(attendee => attendee.userId === currentUser?.uid) || false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle RSVP to event
  const handleRsvp = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/events/${event._id}/rsvp`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsRsvped(true);
    } catch (error) {
      console.error('Error RSVPing to event:', error);
      alert('Failed to RSVP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Convert 24-hour time to 12-hour format
  const formatTime = (time) => {
    if (!time) return '';
    
    // If time already includes AM/PM, return as is
    if (time.toLowerCase().includes('am') || time.toLowerCase().includes('pm')) {
      return time;
    }
    
    // Parse 24-hour format (e.g., "14:00" or "14:00:00")
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const min = minutes || '00';
    
    // Convert to 12-hour format
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
    
    return `${hour12}:${min} ${period}`;
  };

  // Check if description is long enough to need expansion
  const isLongDescription = event.description && event.description.length > 150;

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl border border-base-300 hover:border-primary/50 transition-all duration-300 h-full">
      <div className="card-body p-6">
        {/* Event Title */}
        <h2 className="card-title text-2xl font-bold text-primary mb-4 break-words">
          {event.name}
        </h2>
        
        {/* Event Details */}
        <div className="space-y-3 mb-4">
          {/* Date and Time */}
          <div className="flex items-start gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaCalendarAlt className="text-primary text-sm" />
              </div>
              <span className="text-base-content/80 font-medium">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FaClock className="text-secondary text-sm" />
              </div>
              <span className="text-base-content/80 font-medium">{formatTime(event.time)}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt className="text-accent text-sm" />
            </div>
            <span className="text-base-content/80 font-medium break-words">{event.location}</span>
          </div>
        </div>

        {/* Description with expand/collapse */}
        <div className="mb-4">
          <p className={`text-base-content/70 leading-relaxed break-words overflow-wrap-anywhere ${!isExpanded && isLongDescription ? 'line-clamp-3' : ''}`}>
            {event.description}
          </p>
          {isLongDescription && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-2 flex items-center gap-1 transition-colors"
            >
              {isExpanded ? (
                <>
                  Show less <FaChevronUp className="text-xs" />
                </>
              ) : (
                <>
                  Read more <FaChevronDown className="text-xs" />
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Divider */}
        <div className="divider my-2"></div>

        {/* Footer: Attendees & Actions */}
        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          {/* Attendee Count (Admin Only) */}
          {isAdmin ? (
            <div className="flex items-center gap-2 px-3 py-2 bg-info/10 rounded-lg">
              <FaUsers className="text-info text-sm" />
              <span className="text-sm font-semibold text-info">
                {event.attendees?.length || 0} {(event.attendees?.length || 0) === 1 ? 'Attendee' : 'Attendees'}
              </span>
            </div>
          ) : (
            <div></div>
          )}
          
          {/* Action Buttons */}
          <div className={`flex gap-2 flex-wrap ${!isAdmin ? 'ml-auto' : ''}`}>
            {isAdmin ? (
              <>
                <button 
                  className="btn btn-sm btn-ghost text-secondary hover:bg-secondary/10 gap-2"
                  onClick={() => onEdit(event)}
                >
                  <FaEdit />
                  Edit
                </button>
                <button 
                  className="btn btn-sm btn-ghost text-error hover:bg-error/10 gap-2"
                  onClick={() => onDelete(event._id)}
                >
                  <FaTrash />
                  Delete
                </button>
              </>
            ) : (
              currentUser && (
                <button 
                  className={`btn btn-sm gap-2 ${
                    isRsvped 
                      ? 'btn-success text-white' 
                      : 'btn-primary'
                  } ${isLoading ? 'loading' : ''}`}
                  onClick={handleRsvp}
                  disabled={isRsvped || isLoading}
                >
                  {isRsvped ? (
                    <>
                      <FaCheck />
                      RSVP'd
                    </>
                  ) : (
                    'RSVP Now'
                  )}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
