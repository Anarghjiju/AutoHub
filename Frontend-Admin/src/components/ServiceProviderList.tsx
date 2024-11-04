import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import '../styles/serviceProviderList.css';

interface IService {
    service_id: string;
    service_name: string;
    service_price: number;
    service_duration: number;
    service_description: string;
}

interface Provider {
    provider_id: string;
    name: string;
    provider_make: string;
    contactInfo: string;
    location: string;
    servicesOffered: IService[];
    availability: boolean;
    contact: string;
}

const ServiceProviderList: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [showProviderModal, setShowProviderModal] = useState(false);

    // Form states for new service
    const [serviceName, setServiceName] = useState('');
    const [servicePrice, setServicePrice] = useState<number>(0);
    const [serviceDuration, setServiceDuration] = useState<number>(0);
    const [serviceDescription, setServiceDescription] = useState('');

    const [providerName, setProviderName] = useState('');
    const [providerMake, setProviderMake] = useState('');
    const [providerContact, setProviderContact] = useState('');
    const [providerLocation, setProviderLocation] = useState('');
    const [providerId, setProviderId] = useState('');

    // Search state
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await fetch('http://localhost:5002/api/providers');
                const data = await response.json();
                setProviders(data);
            } catch (error) {
                console.error("Error fetching providers:", error);
            }
        };
        fetchProviders();
    }, []);

    const handleAddService = async () => {
        if (!selectedProvider) return;

        const newService = {
            service_name: serviceName,
            service_price: servicePrice,
            service_duration: serviceDuration,
            service_description: serviceDescription,
            service_id: Date.now().toString()  // Temporary ID for frontend until saved in backend
        };

        try {
            const response = await fetch(`http://localhost:5002/api/providers/${selectedProvider.provider_id}/service`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newService)
            });

            if (response.ok) {
                // Update UI with the new service
                setProviders(prevProviders =>
                    prevProviders.map(provider =>
                        provider.provider_id === selectedProvider.provider_id
                            ? { ...provider, servicesOffered: [...provider.servicesOffered, newService] }
                            : provider
                    )
                );
                setShowServiceModal(false); // Close modal on success
                resetServiceForm(); // Reset form fields
            } else {
                console.error("Failed to add service");
            }
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    const resetServiceForm = () => {
        setServiceName('');
        setServicePrice(0);
        setServiceDuration(0);
        setServiceDescription('');
    };

    const handleDeleteService = async (providerId: string, serviceId: string) => {
        try {
            const response = await fetch(`http://localhost:5002/api/providers/${providerId}/service/${serviceId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProviders((prevProviders) =>
                    prevProviders.map((provider) =>
                        provider.provider_id === providerId
                            ? {
                                  ...provider,
                                  servicesOffered: provider.servicesOffered.filter(
                                      (service) => service.service_id !== serviceId
                                  ),
                              }
                            : provider
                    )
                );
            } else {
                console.error("Failed to delete service");
            }
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const handleAddProvider = async () => {
        const newProvider = {
            provider_id: providerId, // Use the provider ID from the input
            name: providerName,
            provider_make: providerMake,
            contactInfo: providerContact,
            location: providerLocation,
            servicesOffered: [],
            availability: true,
        };

        try {
            const response = await fetch('http://localhost:5002/api/providers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProvider)
            });

            if (response.ok) {
                const addedProvider = await response.json();
                setProviders((prevProviders) => [...prevProviders, addedProvider]);
                setShowProviderModal(false);
                resetProviderForm();
            } else {
                console.error("Failed to add provider");
            }
        } catch (error) {
            console.error("Error adding provider:", error);
        }
    };

    const resetProviderForm = () => {
        setProviderId(''); // Reset provider ID
        setProviderName('');
        setProviderMake('');
        setProviderContact('');
        setProviderLocation('');
    };

    // Filter providers based on search query
    const filteredProviders = providers.filter(provider => 
        provider.name.toLowerCase().includes(searchQuery.toLowerCase())||provider.provider_id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="service-provider-list">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button className='add-provider' onClick={() => setShowProviderModal(true)}>Add a provider</Button>
                <Form.Control
                    type="text"
                    placeholder="Search Providers"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: 'auto' }} // Adjust the width as needed
                />
            </div>
            <h3>Service Providers</h3>
            <Table bordered className='provider-table'>
                <thead>
                    <tr>
                        <th>Provider ID</th>
                        <th>Name</th>
                        <th>Make</th>
                        <th>Services Offered</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProviders.map((provider) => (
                        <tr key={provider.provider_id}>
                            <td>{provider.provider_id}</td>
                            <td>{provider.name}</td>
                            <td>{provider.provider_make}</td>
                            <td>
                                <ul>
                                    {provider.servicesOffered.map((service) => (
                                        <li key={service.service_id}>
                                            {service.service_name} (Price: {service.service_price})
                                            <br />
                                            <Button className='remove-btn'
                                                
                                                onClick={() => handleDeleteService(provider.provider_id, service.service_id)}
                                            >
                                                Remove service
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <Button
                                  className='add-service-btn'
                                    onClick={() => {
                                        setSelectedProvider(provider);
                                        setShowServiceModal(true);
                                    }}
                                >
                                    Add Service
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for adding a service */}
            <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="serviceName">
                            <Form.Label>Service Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={serviceName}
                                onChange={(e) => setServiceName(e.target.value)}
                                placeholder="Enter service name"
                                className="rounded-input"
                            />
                        </Form.Group>
                        <Form.Group controlId="servicePrice">
                            <Form.Label>Service Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={servicePrice}
                                onChange={(e) => setServicePrice(parseFloat(e.target.value))}
                                placeholder="Enter service price"
                                className="rounded-input"
                            />
                        </Form.Group>
                        <Form.Group controlId="serviceDuration">
                            <Form.Label>Service Duration (minutes)</Form.Label>
                            <Form.Control
                                type="number"
                                value={serviceDuration}
                                onChange={(e) => setServiceDuration(parseFloat(e.target.value))}
                                placeholder="Enter duration"
                                className="rounded-input"
                            />
                        </Form.Group>
                        <Form.Group controlId="serviceDescription">
                            <Form.Label>Service Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={serviceDescription}
                                onChange={(e) => setServiceDescription(e.target.value)}
                                placeholder="Enter description"
                                className="rounded-input"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowServiceModal(false)} className="btn-black">
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddService} className="btn-black">
                        Add Service
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for adding a provider */}
            <Modal show={showProviderModal} onHide={() => setShowProviderModal(false)} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Add Provider</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="providerName">
                            <Form.Label>Provider Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={providerName}
                                onChange={(e) => setProviderName(e.target.value)}
                                placeholder="Enter provider name"
                                className="rounded-input"
                            />
                        </Form.Group>
                        <Form.Group controlId="providerMake">
                            <Form.Label>Provider Make</Form.Label>
                            <Form.Control
                                type="text"
                                value={providerMake}
                                onChange={(e) => setProviderMake(e.target.value)}
                                placeholder="Enter provider make"
                                className="rounded-input"
                            />
                        </Form.Group>
                        <Form.Group controlId="providerContact">
                            <Form.Label>Contact Info</Form.Label>
                            <Form.Control
                                type="text"
                                value={providerContact}
                                onChange={(e) => setProviderContact(e.target.value)}
                                placeholder="Enter contact info"
                                className="rounded-input"
                            />
                        </Form.Group>
                        <Form.Group controlId="providerLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                value={providerLocation}
                                onChange={(e) => setProviderLocation(e.target.value)}
                                placeholder="Enter location"
                                className="rounded-input"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowProviderModal(false)} className="btn-black">
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProvider} className="btn-black">
                        Add Provider
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ServiceProviderList;
