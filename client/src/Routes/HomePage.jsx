import React from 'react';
import Schedule from '../Components/Schedule';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div>
        <div>
            <h1>Schedule</h1>
            <div className='schedule-container'>
                <Schedule />
            </div>
        </div>
    </div>
  );
}

export default HomePage;
