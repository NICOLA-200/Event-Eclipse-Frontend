
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VenueUuid() {
  const { uuid } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/venue/get_by_uuid?uuid=${uuid}`, {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>{venue.venueName}</h1>
      <img src={venue.imageUrl} alt={venue.venueName} />
      <p>{venue.description}</p>
      <p>Location: {venue.location}</p>
      <p>Capacity: {venue.capacity}</p>
      <p>Owner: {venue.owner.username}</p>
    </div>
  );
}

export default VenueUuid;
