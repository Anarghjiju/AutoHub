import React, { useState } from 'react';
import '../styles/Sellcar.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';

const UsedCarSell = () => {
  const [carDetails, setCarDetails] = useState({
    make: '',
    carModel: '',
    year: new Date().getFullYear(),
    kmsDriven: 0,
    price: 0,
    description: '',
  });
  const [images, setImages] = useState<string[]>([]); // Store base64 images
  const [loading, setLoading] = useState(false); // Loading state
  const history = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCarDetails({ ...carDetails, [name]: value });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
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
        history('/');  
      } else {
        const errorData = await response.json();
        Swal.fire('Error', errorData.error || 'Failed to list your car.', 'error');
      }
    } catch (error) {
      console.error('Error submitting car details:', error);
      Swal.fire('Error', 'Failed to list your car.', 'error');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <Navbar />
      <div className="used-car-sell-container">
        {loading ? (
          <div className="spinner-container">
            <div className="spinner"></div> {/* Loading spinner */}
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
