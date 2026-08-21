import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVenues()
  }, [])

  const fetchVenues = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/venues')
      setVenues(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load venues')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🎾 Pickleball Booking App</h1>
        <p>Find and book your favorite pickleball courts</p>
      </header>

      <main className="main">
        {loading && <p className="loading">Loading venues...</p>}
        {error && <p className="error">{error}</p>}
        
        {!loading && venues.length > 0 && (
          <div className="venues-grid">
            {venues.map((venue) => (
              <div key={venue.id} className="venue-card">
                <h2>{venue.name}</h2>
                <p className="address">
                  {venue.address}, {venue.city}, {venue.state} {venue.zip_code}
                </p>
                <p className="description">{venue.description}</p>
                <div className="venue-info">
                  <span className="price">${venue.price_per_hour}/hour</span>
                  <button className="book-btn">View Courts</button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && venues.length === 0 && !error && (
          <p className="no-data">No venues available</p>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2024 Pickleball Booking App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
