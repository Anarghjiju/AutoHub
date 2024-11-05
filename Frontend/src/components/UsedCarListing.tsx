import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/usedCarListing.css';

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
  isSold: boolean;
  images: Image[];
  sellerId: string;
  buyerId: string;
  orders: string[];
}

interface UsedCarListingProps {
  cars: Car[]; // Accept filtered cars as a prop
}

const UsedCarListing: React.FC<UsedCarListingProps> = ({ cars }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 12;
  const maxVisiblePages = 3;
  const navigate = useNavigate();

  useEffect(() => {
    // Reset to the first page whenever the search term changes
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredCars = cars.filter((car) =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
    car.carModel.toLowerCase().includes(searchTerm.toLowerCase())
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
    navigate(`/usedcar/${car._id}`); // Update this line as necessary
  };

  return (
    <div>
      <div className="row align-items-center mb-4">
        <div className="col">
          <h3 className="text-left">Buy Used Cars</h3>
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

export default UsedCarListing;
