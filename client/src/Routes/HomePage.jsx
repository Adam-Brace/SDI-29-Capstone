import React from 'react';
import Schedule from '../Components/Schedule/Schedule.jsx';
import '../styles/HomePage.css';

function HomePage({ theme }) {
  return (
    <div>
        <div>
            <div className='schedule-container'>
                <Schedule theme={theme} />
            </div>
        </div>
    </div>
  );
}

export default HomePage;
