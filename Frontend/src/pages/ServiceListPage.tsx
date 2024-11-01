// CarDetailsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters
import axios from 'axios';


export interface IService {
    service_id: string; // Unique identifier for the service
    service_name: string;
    service_price: number;
    service_duration: number; // Duration in minutes
    service_description: string;
  }

export interface IProvider{
    _id:string;
    provider_id: string; // Unique identifier for the provider
    name: string;
    provider_make: string; // The make of the vehicle associated with the provider
    contactInfo: string;
    location: string;
    servicesOffered: IService[]; // Array of service objects 
    availability: boolean;
    contact: string;
  }



const ServiceListPage: React.FC = () => {
  const { make } = useParams<{ make: string }>(); // Get the make from route parameters
  const [providers, setProviders] = useState<IProvider[]>([]); // State to hold provider details
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  console.log('Make parameter:', make);

  useEffect(() => {
    const fetchProvidersByMake = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/providers/make/${make}`); // Fetch data by make
        setProviders(response.data); // Assuming response.data is an array of IProvider objects
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching provider details:', error);
        setError('Failed to load provider details.'); // Set error message
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchProvidersByMake();
  }, [make]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      <h1>Service Providers for {make}</h1>
      {providers.length > 0 ? (
        providers.map((provider) => (
          <div key={provider.provider_id} style={cardStyle}>
            <h3>{provider.name}</h3>
            <p><strong>Make:</strong> {provider.provider_make}</p>
            <p><strong>Location:</strong> {provider.location}</p>
          </div>
        ))
      ) : (
        <p>No service providers found for this make.</p> // Message if no providers are found
      )}
    </div>
  );
};

// Card styles
const cardStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '15px',
  width: '250px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  textAlign: 'center',
  transition: 'transform 0.2s',
  backgroundColor: '#fff',
};

export default ServiceListPage;
