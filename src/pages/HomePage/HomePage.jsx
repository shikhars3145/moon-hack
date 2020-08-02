import React from 'react';
import './HomePage.scss';
import ButtonPrimary from '../../components/ButtonPrimary/ButtonPrimary';
import db from '../../firebase';

import firebase from 'firebase';

const handleClick = () => {
  console.log('helooo ')
  
  db.collection('visitors').add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  console.log('yes, i work');

}


const handleMe = () => {
  console.log('hi')
}
export default function HomePage({ history }) {
  return (
    <div className="home-page">
      <div className="title">STARGAZER</div>
      <div className="description">
        Share your amazing night sky photographs with people around the world.
        <br />
        Capture and share rare events with enthusiasts just like you.
      </div>
      <div className="btn-container">
        <ButtonPrimary onClick={() => history.push('./study'), handleClick}>
          Study
        </ButtonPrimary>
        <ButtonPrimary onClick={() => history.push('/explore')}>
          Explore
        </ButtonPrimary>
      </div>
    </div>
  );
}
