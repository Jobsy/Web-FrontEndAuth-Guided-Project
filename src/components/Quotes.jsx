import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Use the wrapped axios!
import withAuth from '../axios';
// import { Redirect } from 'react-router-dom';

export default function Quotes(props) {
  const [quotes, setQuotes] = useState([]);

  // (OPTION A) Find a way to have the component
  // redirect to the /login screen,
  // if there's no 'token' in local storage.
  // Alternatively we could use a 'protected'
  // route in Container.jsx
  // useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     props.history.push('/');
  //   }
  // }, [])

  useEffect(() => {
    // We need the wrapped axios instead, to send token
    // along automatically, in an Authorization header
    // axios.get('http://localhost:5000/api/quotes')
    withAuth().get('http://localhost:5000/api/quotes')
      .then(res => {
        setQuotes(res.data);
      })
      .catch(error => {
        // props.history.push('/'); // could be improved
        alert(error.response.data.message);
      });
  }, []);

  // the request still goes out :(
  // if(!localStorage.getItem('token')) {
  //   return <Redirect to="/login" />
  // }

  return (
    <div className='quotes'>
      {
        quotes.map(q => (
          <li key={q.id}>{q.text}</li>
        ))
      }
    </div>
  );
}
