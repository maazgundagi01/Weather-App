import Header from './header/Header';
import WeatherData from './weather-data/WeatherData';
import SavedLocations from './saved-locations/SavedLocations'
import Search from './search/Search'
import Status404 from './status/Status';
import Footer from './footer/Footer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<SavedLocations />} />
        <Route path='/location/:location' element={<WeatherData />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<Status404 />} />
      </Routes >
      <Footer />
    </Router >
  );
}

export default App;
