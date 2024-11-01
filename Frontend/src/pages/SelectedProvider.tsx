import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate here
import '../styles/SelectedProvider.css';
import Navbar from '../components/Navbar';

export interface IService {
    service_id: string;
    service_name: string;
    service_price: number;
    service_duration: number;
    service_description: string;
}

export interface IProvider {
    _id: string;
    provider_id: string;
    name: string;
    provider_make: string;
    contactInfo: string;
    location: string;
    servicesOffered: IService[];
    availability: boolean;
    contact: string;
}

const ProviderDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Call useNavigate inside the component
    const provider = location.state as IProvider; // Cast the provider data to IProvider

    const [selectedService, setSelectedService] = useState<IService | null>(null); // State for the selected service

    const handleServiceClick = (service: IService) => {
        setSelectedService(service); // Set the selected service to display in the overlay
    };

    const handleBookService = () => {
        navigate('/bookingConfirm', { state: provider }); // Pass the provider data to the booking page
    };

    const handleCloseOverlay = () => {
        setSelectedService(null); // Close the overlay
    };

    if (!provider) {
        return <div>No provider data available.</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="provider-details">
                <h2>{provider.name}</h2>
                <p><strong>Make:</strong> {provider.provider_make}</p>
                <p><strong>Location:</strong> {provider.location}</p>
                <p><strong>Contact Info:</strong> {provider.contactInfo}</p>
                <h3>Services Offered:</h3>
                <ul>
                    {provider.servicesOffered.map((service: IService) => (
                        <li key={service.service_id} onClick={() => handleServiceClick(service)} className="service-item">
                            {service.service_name}
                        </li>
                    ))}
                </ul>

                {selectedService && (
                    <div className="overlay">
                        <div className="overlay-content">
                            <h2>{selectedService.service_name}</h2>
                            <p><strong>Price:</strong> ${selectedService.service_price}</p>
                            <p><strong>Duration:</strong> {selectedService.service_duration} mins</p>
                            <p><strong>Description:</strong> {selectedService.service_description}</p>
                            <button className="book-button" onClick={handleBookService}>Book Service</button>
                            <button className="close-button" onClick={handleCloseOverlay}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProviderDetails;
