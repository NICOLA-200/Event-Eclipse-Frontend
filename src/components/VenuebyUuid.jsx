


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams} from 'react-router-dom';
import Header from './header-footer/Header';

function VenueUuid() {
  const { uuid } = useParams();
  
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`https://eventeclipsebackend.onrender.com/api/v1/venue/get_by_uuid?uuid=${uuid}`, {
          headers: {
            'event-token': localStorage.getItem('token'),
          }
        });
        setVenue(response.data.venue);
      } catch (error) {
        console.error('Error fetching venue:', error);
        setError('Failed to fetch venue');
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [uuid]);



  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`https://eventeclipsebackend.onrender.com/api/v1/venue/delete?uuid/${uuid}`, {
          headers: {
            'event-token': token,
          }
        });
        const data = response.data;
        if (data.status === 'success') {
          alert('Venue deleted successfully');
         // Redirect to venue list or home page
        } else {
          alert('Failed to delete venue: ' + data.message);
        }
      } catch (error) {
        console.error('Error deleting venue:', error);
        alert('Failed to delete venue. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ color: 'white', marginTop: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Header />
      <h1>{venue.venueName}</h1>
      <img width={500} src={venue.imageUrl} alt={venue.venueName} />
      <p>{venue.description}</p>
      <p>Location: {venue.location}</p>
      <p>Capacity: {venue.capacity}</p>
      <p>Owner: {venue.owner.username}</p>
      {venue.owner.uuid === localStorage.getItem('user').uuid && (
        <div>
          <Link  to={`/updateVenue/${uuid}`}>Update Venue</Link>
          <button onClick={handleDelete}>Delete Venue</button>
        </div>
      )}
    </div>
  );
}

export default VenueUuid;
