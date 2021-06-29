import useGeolocation from 'react-hook-geolocation'
import TopBanner from './components/TopBanner'
import Map from './components/Map'
import AddCourt from './components/AddCourt'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'

function App() {
  
  const geolocation = useGeolocation()

  return (
    <Router>
      <div className="App">
        <TopBanner />
        <div className='main-layout'>
          <Route path='/' exact render={(props) => (
            <>
              {!geolocation.error
                ? <Map lng={geolocation.longitude} lat={geolocation.latitude} zoomLevel={10} />
                : <p>Please enable location tracking.</p>}
            </>
          )}/>
          <Route path='/add-court' component={AddCourt}/>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
