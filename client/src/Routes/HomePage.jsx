import React from 'react';
import Schedule from '../Components/Schedule';
import '../styles/HomePage.css';

function HomePage() {
  return (
    <div>
        <div>
            <div className='schedule-container'>
                <Schedule />
            </div>
        </div>
    </div>
  );
}

export default HomePage;
