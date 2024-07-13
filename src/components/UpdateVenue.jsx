import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams  } from 'react-router-dom';
import Header from './header-footer/Header';

export default function UpdateVenue() {
  const { uuid } = useParams();

  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
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
        const venue = response.data.venue;
        setName(venue.venueName);
        setImageUrl(venue.imageUrl);
        setDescription(venue.description);
        setLocation(venue.location);
        setCapacity(venue.capacity);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching venue:', error);
        setError('Failed to fetch venue');
        setLoading(false);
      }
    };

    fetchVenue();
  }, [uuid]);

  const handleUpdateVenue = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`https://eventeclipsebackend.onrender.com/api/v1/venue/update/${uuid}`, {
        venueName: name,
        imageUrl,
        description,
        location,
        capacity
      }, {
        headers: {
          'event-token': token,
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;
      if (data.status === 'success') {
        alert('Venue updated successfully');
        // Redirect to updated venue page
      } else {
        alert('Failed to update venue: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating venue:', error);
      alert('Failed to update venue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ height: '100vh' }}>
      <Header />
      <div className='venue-form'>
        <h1 style={{ textAlign: 'center' }}>Update venue</h1>
        <form action="" onSubmit={handleUpdateVenue}>
          <label htmlFor="">
            <span>Name</span>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of venue' />
          </label>

          <label htmlFor=""><span>Image Link</span>
            <input type="text" name="image_link" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder='Image link' />
          </label>

          <label htmlFor=""><span>Description</span>
            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
          </label>

          <label htmlFor=""><span>Location</span>
            <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' />
          </label>

          <label htmlFor=""><span>Capacity</span>
            <input type="number" name="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder='Capacity...' />
          </label>

          <button disabled={loading} type="submit">{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>
    </div>
  );
}
