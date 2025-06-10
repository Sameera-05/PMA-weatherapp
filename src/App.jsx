import React from 'react';
import WeatherNavbar from './components/Navbar';
import CurrentWeather from './components/CurrentWeather';
import RecentEvents from './components/RecentEvents';
import WeatherMap from './components/WeatherMap';

function App() {
  return (
    <div>
      <WeatherNavbar />
      <section id="current-weather" className="container py-5">
        <CurrentWeather />
      </section>
      <section id="recent-events" className="container py-5 bg-light">
        <RecentEvents />
      </section>
      <section id="map-section" className="container py-5">
        <WeatherMap />
      </section>
    </div>
  );
}

export default App;
