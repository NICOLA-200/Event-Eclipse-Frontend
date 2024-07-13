import React from 'react';
import { Link } from 'react-router-dom';

function VenueCard({ imageUrl, name, owner, uuid }) {
  return (
     <Link to={`/venue/${uuid}`} className='venue-card-link'>
    <div className='venue-card'>
      <div style={{width: '100%', height:200}} ><img src={imageUrl} alt={name} className='venue-card-image' /></div>
      <h2 className='venue-card-name'>{name}</h2>
      <p className='venue-card-owner'>Owner: {owner}</p>
      <p className='venue-card-uuid'>UUID: {uuid}</p>
    </div>
    </Link>
  );
}

export default VenueCard;

