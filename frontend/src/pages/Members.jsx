import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Members = () => {
  const { getToken } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all members
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/members`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching members:', error);
      setLoading(false);
    }
  };

  // Filter members based on search term
  const filteredMembers = members.filter((member) =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-4">Our Members</h1>
        <p className="text-lg mb-6">Connect with fellow GSCMA members at Wayne State University</p>
        
        <div className="form-control max-w-md">
          <input
            type="text"
            placeholder="Search by name or major..."
            className="input input-bordered"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div key={member._id} className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={`https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&size=150&background=random`}
                alt={`${member.firstName} ${member.lastName}`}
                className="rounded-full"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{member.firstName} {member.lastName}</h2>
              <p className="text-sm text-gray-600">{member.major}</p>
              <p className="text-xs text-gray-500">Class of {member.graduationYear}</p>
              {member.role === 'admin' && (
                <div className="badge badge-primary">Officer</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No members found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Members;
