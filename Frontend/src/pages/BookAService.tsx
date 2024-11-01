// BookService.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import '../styles/BookAService.css';

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

const BookService: React.FC = () => {
    const [carMakes, setCarMakes] = useState<string[]>([]);
    const [locations, setLocations] = useState<string[]>([]);
    const [selectedMake, setSelectedMake] = useState<string>('');
    const [selectedLocation, setSelectedLocation] = useState<string>('');
    const [providers, setProviders] = useState<IProvider[]>([]); // Store all providers
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServiceProviders = async () => {
            try {
                const response = await axios.get<IProvider[]>('http://localhost:5002/api/providers');
                setProviders(response.data); // Save providers in state
                // Sort makes in descending order
                const uniqueMakes = Array.from(new Set(response.data.map(provider => provider.provider_make)))
                    .sort((a, b) => b.localeCompare(a));
                setCarMakes(uniqueMakes);
            } catch (error) {
                console.error('Error fetching service providers:', error);
            }
        };
        fetchServiceProviders();
    }, []);

    useEffect(() => {
        const fetchLocations = async () => {
            if (selectedMake) {
                try {
                    // Filter locations based on the selected make
                    const filteredLocations = Array.from(
                        new Set(providers
                            .filter(provider => provider.provider_make === selectedMake)
                            .map(provider => provider.location)
                        )
                    ).sort((a, b) => b.localeCompare(a));
                    setLocations(filteredLocations);
                } catch (error) {
                    console.error('Error fetching locations:', error);
                }
            }
        };
        fetchLocations();
    }, [selectedMake, providers]); // Use providers in dependency

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMake(event.target.value);
        setSelectedLocation('');
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(event.target.value);
    };

    const handleFindProvider = () => {
        if (selectedMake && selectedLocation) {
            const selectedProvider = providers.find(provider => 
                provider.provider_make === selectedMake && provider.location === selectedLocation
            );
            if (selectedProvider) {
                navigate(`/provider/${selectedMake}/${selectedLocation}`, { state: selectedProvider });
            }
        }
    };

    return (
        <div>
        <Navbar />
        <div className="book-service">
            
            <div className="book-service-left"></div>
            <div className="book-service-right">
                <div className="book-service-container">
                    <h2>Choose Your Car Make</h2>
                    <select onChange={handleMakeChange} defaultValue="" className="dropdown">
                        <option value="" disabled>Select a make</option>
                        {carMakes.map((make, index) => (
                            <option key={index} value={make}>{make}</option>
                        ))}
                    </select>

                    {selectedMake && (
                        <>
                            <h2>Choose Your Location</h2>
                            <select onChange={handleLocationChange} value={selectedLocation} defaultValue="" className="dropdown">
                                <option value="" disabled>Select a location</option>
                                {locations.map((location, index) => (
                                    <option key={index} value={location}>{location}</option>
                                ))}
                            </select>
                        </>
                    )}

                    <button onClick={handleFindProvider} disabled={!selectedMake || !selectedLocation} className="find-button">
                        Find Your Provider
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default BookService;
