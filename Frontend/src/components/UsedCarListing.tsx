import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import '../styles/usedCarListing.css'

interface Image {
  publicId: string;
  url: string;
}

interface Car {
  _id: string; 
  make: string;
  carModel: string;
  year: number;
  kmsDriven: number;
  price: number;
  description: string;
  verified: boolean;
  listed: boolean;
  images: Image[];
}

const UsedCarListing: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/usedcars');
        const data = await response.json();

        if (Array.isArray(data)) {
          setCars(data);
        } else {
          console.error('The fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
    car.carModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="row align-items-center mb-4">
        <div className="col">
          <h3 className="text-left">Buy used cars</h3>
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="container py-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
            <div className="row">
            {filteredCars.map((car) => (
              <div className="col-md-4 mb-4" key={car._id}>
                <div className="card h-100 shadow-sm compact-card text-center">
                  <img 
                    src={car.images.length > 0 ? car.images[0].url : 'fallback-image-url.jpg'} 
                    className="card-img-top" 
                    alt={car.carModel} 
                  />
                  <div className="card-body">
                    <h3 className="card-title car-make">{car.make}</h3>
                    <h5 className="card-title">{car.carModel}</h5>
                    <p className="card-text">Rs. {car.price}</p>
                    <Link to={`/usedcar/${car._id}`} className="btn btn-dark text-white btn-lg">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          
        )}
      </div>
    </div>
  );
};

export default UsedCarListing;
