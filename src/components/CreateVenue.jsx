import React, { useState } from 'react'
import "./css/createVenue.css"
import Header from './header-footer/Header'
import axios from 'axios';

export default function CreateVenue() {
   const [name , setName] = useState();
   const [imageUrl , setImageUrl] = useState();
   const [description , setDescription] = useState();
   const [location , setLocation] = useState();
   const [capacity , setCapacity] = useState();
   const [loading, setLoading] = useState(false);
     


     const handleVenue = async (e) => {
          e.preventDefault();
          setLoading(true);

          const token = localStorage.getItem('token');
        
    try {
     const response = await axios.post('https://eventeclipsebackend.onrender.com/api/v1/venues', 
       {
         venueName: name,
         imageUrl,
         description,
         location,
         capacity
       },
       {
         headers: {
           'event-token': token,
           'Content-Type': 'application/json'
         }
       }
     );   
            const data = response.data;
      
            if (data.status === 'success') {
            
              alert('venue created successful');
            } else {
              alert('error occured: ' + data.message);
            }
          } catch (error) {
            console.error("error occured:", error);
            alert("error occured. Please try again.");
          } finally {
            setLoading(false);
          }
        };

  return (
    <div style={{Height: '100vh'}}>
       <Header/>
       <div className='venue-form'>
          <h1 style={{ textAlign: 'center'}}>Create venue</h1>
          <form action="" onSubmit={handleVenue}>
               <label htmlFor="">
                     <span>Name</span>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name of venue' />
               </label>

               <label htmlFor=""><span>Image Link</span>
                    <input type="text" name="image_link" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder='image link' />
               </label>

               <label htmlFor=""><span>description </span>
                    <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description ' />
               </label>

               <label htmlFor=""><span> location </span>
                    <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='location' />
               </label>

               
               <label htmlFor=""><span> capacity </span>
                    <input type="number" name="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder='capacity...' />
               </label>

               <button disabled={loading} type="submit">{loading ? 'Submiting...' : 'Submit'}</button>
          </form>
       </div>
     CreateVenue</div>
  )
}
