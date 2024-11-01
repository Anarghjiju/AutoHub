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
    const { provider, service } = location.state as { provider: IProvider, service: IService };

    const [models, setModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState<string>('');
    const [contactNo, setContactNo] = useState<string>('');
    const [preferredDate, setPreferredDate] = useState<string>('');

    useEffect(() => {
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

    const handleConfirmService = async () => {
        const bookingDetails = {
            providerId: provider.provider_id,
            serviceId: service.service_id,
            userId: 'random-user-id-123',
            bookingDate: new Date(preferredDate),
            status: true,
            make: provider.provider_make,
            car_model: selectedModel,
            contact_no: contactNo,
        };

        try {
            const response = await axios.post('http://localhost:5001/api/book', bookingDetails);
            alert('Booking confirmed successfully!');
        } catch (error) {
            console.error('Error confirming booking:', error);
            alert('Failed to confirm booking. Please try again.');
        }
    };

    return (
        <div className="booking-page">
            <h2 className="booking-header">Book {service.service_name} with {provider.name}</h2>
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
