import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/header-footer/Header';
import VenueCard from './venueCard';
import '../components/css/Allvenue.css';

function AllVenue() {
  const [venues, setVenues] = useState([]);
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('https://eventeclipsebackend.onrender.com/api/v1/venues/get_all', {
       
        });
        console.log(response.data.venues.venues )
        setVenues(response.data.venues.venues);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchVenues();
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Header />
      <div className='venue'>
        {venues.map(venue => (
          <VenueCard
            key={venue.uuid}
            imageUrl={venue.imageUrl}
            name={venue.venueName}
            owner={venue.owner.username}
            uuid={venue.uuid}
          />
        ))}
      </div>
    </div>
  );
}

export default AllVenue;
