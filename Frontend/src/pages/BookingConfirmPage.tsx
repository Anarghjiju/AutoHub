// BookingPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookingConfirmPage.css';

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

const BookingPage: React.FC = () => {
    const location = useLocation();
    const provider = location.state as IProvider; // Cast the provider data to IProvider

    const [models, setModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [contactNo, setContactNo] = useState<string>('');
    const [preferredDate, setPreferredDate] = useState<string>('');

    useEffect(() => {
        // Fetch models from the API based on the selected make
        const fetchModels = async () => {
            try {
                const response = await axios.get(`http://localhost:5004/api/cars/models/${provider.provider_make}`);
                setModels(response.data);
            } catch (error) {
                console.error('Error fetching models:', error);
            }
        };

        if (provider) {
            fetchModels();
        }
    }, [provider]);

    const handleConfirmService = () => {
        // Handle service confirmation logic here
        const bookingDetails = {
            provider: provider.name,
            model: selectedModel,
            contactNo,
            preferredDate,
        };

        console.log('Booking Details:', bookingDetails);
        // You can send this data to your backend API to create a booking
    };

    return (
        <div className="booking-page">
            <h2 className="booking-header">Book a Service with {provider.name}</h2>
            <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
                <label>
                    Make:
                    <input type="text" value={provider.provider_make} readOnly />
                </label>

                <label>
                    Model:
                    <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} required>
                        <option value="" disabled>Select a model</option>
                        {models.map((model, index) => (
                            <option key={index} value={model}>{model}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Contact Number:
                    <input type="tel" value={contactNo} onChange={(e) => setContactNo(e.target.value)} required />
                </label>

                <label>
                    Preferred Date:
                    <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} required />
                </label>

                <button type="button" onClick={handleConfirmService} className="confirm-button">Confirm Service</button>
            </form>
        </div>
    );
};

export default BookingPage;
