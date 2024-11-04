import React, { useState } from 'react';
import '../styles/Sellcar.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

const GOOGLE_API_KEY = 'AIzaSyCzPJ-xFQL6qSd1Fv1a6ZcVbXAVVtKlaYY';  // Replace with your actual Google API key

// Define TypeScript interfaces for car details and image handling
interface CarDetails {
  make: string;
  carModel: string;
  year: number;
  kmsDriven: number;
  price: number;
  description: string;
}

const UsedCarSell: React.FC = () => {
  const [carDetails, setCarDetails] = useState<CarDetails>({
    make: '',
    carModel: '',
    year: new Date().getFullYear(),
    kmsDriven: 0,
    price: 0,
    description: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const navigate = useNavigate();

  const calculateEstimatedPrice = async (carDetails: CarDetails) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Provide an estimated resale price in ruppes for a used car based on the following details:
                           Make: ${carDetails.make},
                           Model: ${carDetails.carModel},
                           Year: ${carDetails.year},
                           Kilometers Driven: ${carDetails.kmsDriven}.
                           Only provide estimate reslale price as output.`
                  }
                ]
              }
            ]
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch estimated price.');
      }

      const data = await response.json();
      console.log(data);
      const estimatedPrice = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return estimatedPrice;
    } catch (error) {
      console.error('Error estimating price:', error);
      Swal.fire('Error', 'Failed to estimate price. Please try again.', 'error');
      return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: name === 'year' || name === 'kmsDriven' || name === 'price' ? Number(value) : value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const updatedImages = [...images];
        updatedImages[index] = base64String;
        setImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEstimatePrice = async () => {
    setLoading(true);
    const price = await calculateEstimatedPrice(carDetails);
    if (price) {
      setEstimatedPrice(price);
      Swal.fire('Estimated Price', `Estimated price is: ${price}`, 'info');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      ...carDetails,
      sellerId: 'SOME_SELLER_ID',
      buyerId: '',
      images, 
    };

    try {
      const response = await fetch('http://localhost:3001/api/usedcars', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire('Submitted!', 'Your car has been listed for sale!', 'success');
        navigate('/');  
      } else {
        const errorData = await response.json();
        Swal.fire('Error', errorData.error || 'Failed to list your car.', 'error');
      }
    } catch (error) {
      console.error('Error submitting car details:', error);
      Swal.fire('Error', 'Failed to list your car.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="used-car-sell-container">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Uploading...</p>
          </div>
        ) : (
          <form className="sell-form" onSubmit={handleSubmit}>
            <h1>Sell Your Car</h1>
            <div className="form-group">
              <label>Make</label>
              <input type="text" name="make" value={carDetails.make} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Model</label>
              <input type="text" name="carModel" value={carDetails.carModel} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input type="number" name="year" value={carDetails.year} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Kilometers Driven</label>
              <input type="number" name="kmsDriven" value={carDetails.kmsDriven} onChange={handleChange} required />
            </div>
            <div className="estimate-price-container">
            <button className="estimate-button" onClick={handleEstimatePrice}>
                Get Estimated Price
            </button>
            <div className="price-response">{estimatedPrice}</div> {/* Display the estimated price */}
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" name="price" value={carDetails.price} onChange={handleChange} required />
            </div>
            <div className="image-upload-container">
              <label>Upload Images:</label>
              <div className="upload-box-container">
                {Array.from(Array(5), (_, index) => (
                  <div className="upload-box" key={index}>
                    {images[index] && (
                      <img
                        className="image-preview"
                        src={images[index]}
                        alt="Preview"
                      />
                    )}
                    <input
                      type="file"
                      id={`image-upload-${index}`}
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                    />
                    <label htmlFor={`image-upload-${index}`}><span>+</span></label>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={carDetails.description} onChange={handleChange} required />
            </div>
            <button type="submit" className="submit-button">List car for verification</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UsedCarSell;
