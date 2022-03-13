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
      <Header/>
      <Routes>
        <Route path='/' element={<SavedLocations />} />
        <Route path='/weather' element={<WeatherData />} /> //Replace /weather weather with /:location once it's setup.
        <Route path='search' element={<Search />} />
        <Route path='*' element={<Status404 />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
