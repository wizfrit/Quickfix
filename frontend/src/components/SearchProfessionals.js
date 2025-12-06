import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../HomePage.css';

const SearchProfessionals = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [minRating, setMinRating] = useState('');
  const [professionalRatings, setProfessionalRatings] = useState({});

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a skill to search');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await api.get('/auth/search-professionals', {
        params: { skill: searchTerm.trim() }
      });
      setProfessionals(response.data);
      
      // Fetch average ratings for each professional from Request.rating via new endpoint
      const ratingsMap = {};
      for (const professional of response.data) {
        try {
          const avgRes = await api.get(`/ratings/average/${professional._id}`);
          if (avgRes.data && typeof avgRes.data.averageRating !== 'undefined') {
            ratingsMap[professional._id] = Number(avgRes.data.averageRating) || 0;
          } else {
            ratingsMap[professional._id] = 0;
          }
        } catch (err) {
          console.error('Error fetching average rating:', err);
          ratingsMap[professional._id] = 0;
        }
      }
      setProfessionalRatings(ratingsMap);
      
      if (response.data.length === 0) {
        setError(`No professionals found with skill: "${searchTerm}"`);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search professionals. Please try again.');
      setProfessionals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getFilteredProfessionals = () => {
    if (!minRating) return professionals;
    return professionals.filter(prof => {
      const rating = professionalRatings[prof._id] || 0;
      return rating >= parseFloat(minRating);
    });
  };

  return (
    <div className="homepage" style={{ padding: '20px', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#0d2b3e' }}>
          Search Professionals
        </h1>

        {/* Search Bar and Filter */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '30px',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="Enter a skill (e.g., moving, plumbing, electrician)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              border: '2px solid #0d2b3e',
              borderRadius: '5px',
              width: '400px',
              maxWidth: '100%'
            }}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: '12px 30px',
              fontSize: '16px',
              backgroundColor: '#0d2b3e',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          
          {professionals.length > 0 && (
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              style={{
                padding: '12px 20px',
                fontSize: '16px',
                border: '2px solid #0d2b3e',
                borderRadius: '5px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="">Filter by Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars & Up</option>
              <option value="3">3 Stars & Up</option>
              <option value="2">2 Stars & Up</option>
              <option value="1">1 Star & Up</option>
              <option value="0">All Ratings</option>
            </select>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '15px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '5px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Results */}
        {professionals.length > 0 && (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#0d2b3e' }}>
              Found {getFilteredProfessionals().length} Professional{getFilteredProfessionals().length !== 1 ? 's' : ''}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {getFilteredProfessionals().map((professional) => (
                <div
                  key={professional._id}
                  style={{
                    border: '2px solid #0d2b3e',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    position: 'relative'
                  }}
                >
                  {/* Rating Badge on Top Right */}
                  {professionalRatings[professional._id] !== undefined && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: '#0d2b3e',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '50%',
                      textAlign: 'center',
                      minWidth: '50px',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      ⭐ {professionalRatings[professional._id].toFixed(1)}
                    </div>
                  )}
                  
                  <h3 style={{ marginTop: 0, color: '#0d2b3e' }}>
                    {professional.name}
                  </h3>
                  
                  {professional.bio && (
                    <p style={{ color: '#666', marginBottom: '10px' }}>
                      {professional.bio}
                    </p>
                  )}
                  
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Skills:</strong>
                    <div style={{ marginTop: '5px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {professional.skills && professional.skills.length > 0 ? (
                        professional.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            style={{
                              backgroundColor: '#0d2b3e',
                              color: 'white',
                              padding: '5px 10px',
                              borderRadius: '15px',
                              fontSize: '12px'
                            }}
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span style={{ color: '#999' }}>No skills listed</span>
                      )}
                    </div>
                  </div>

                  {professional.experience && (
                    <p style={{ marginBottom: '5px' }}>
                      <strong>Experience:</strong> {professional.experience} year{professional.experience !== 1 ? 's' : ''}
                    </p>
                  )}

                  {professional.phoneNumber && (
                    <p style={{ marginBottom: '5px' }}>
                      <strong>Phone:</strong> {professional.phoneNumber}
                    </p>
                  )}

                  {professional.address && (
                    <p style={{ marginBottom: '5px', color: '#666' }}>
                      <strong>Location:</strong> {professional.address}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && searchTerm && professionals.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>No professionals found. Try searching for a different skill.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProfessionals;

