import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

interface Car {
  _id: string;
  Make: string;
  Model: string;
  Variant: string;
  Ex_Showroom_Price: string;
  Fuel_Type: string;
  Power: string;
  Torque: string;
  Displacement: string;
  Fuel_Tank_Capacity: string;
  Type: string;
  Body_Type: string;
  Doors: string;
  Seating_Capacity: string;
  ARAI_Certified_Mileage: string;
  Length: string;
  Width: string;
  Height: string;
  Kerb_Weight: string;
  Ground_Clearance: string;
  Front_Brakes: string;
  Rear_Brakes: string;
  ABS: string;
  Electric_Range: string;
  Variants: string[];
  imageUrls: string[];
}

const CarListing: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;
  const maxVisiblePages = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get<Car[]>('http://localhost:5004/api/cars/test');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    // Reset to the first page whenever search term changes
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredCars = cars.filter((car) =>
    car.Model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getVisiblePageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleCardClick = (car: Car) => {
    navigate(`/detail/${car._id}`, { state: { car } });
  };

  return (
    <div>
      <div className="row align-items-center mb-4">
        <div className="col">
          <h2 className="text-left">Car Listings</h2>
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
        <div className="row">
          {currentCars.map((car) => (
            <div className="col-md-4 mb-4" key={car._id} onClick={() => handleCardClick(car)}>
              <div className="card h-100 shadow-sm">
                <img src={car.imageUrls[0]} className="card-img-top" alt={car.Model} />
                <div className="card-body">
                  <h5 className="card-title text-center">{car.Model}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </button>
          </li>
          {getVisiblePageNumbers().map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
            >
              <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CarListing;
