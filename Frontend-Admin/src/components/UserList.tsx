import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import '../styles/userList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserShield } from '@fortawesome/free-solid-svg-icons';

interface User {
    _id: string;
    uid: string;
    name: string;
    email: string;
    isAdmin: boolean;
    phno?: number;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5002/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:5002/api/users/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter((user) => user._id !== userId));
            } else {
                console.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleRoleChange = async () => {
        if (!selectedUser) return;

        try {
            const response = await fetch(`http://localhost:5002/api/users/${selectedUser._id}/role`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isAdmin: !selectedUser.isAdmin })
            });
            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
                setShowRoleModal(false);
            } else {
                console.error("Failed to change role");
            }
        } catch (error) {
            console.error("Error changing role:", error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="user-list">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search Users"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: 'auto' }}
                />
            </div>
            <h3>User Management</h3>
            <Table bordered className='user-table'>
                <thead>
                    <tr>
                        <th>UID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user._id}>
                            <td>{user.uid}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? "Admin" : "User"}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setShowRoleModal(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUserShield} /> Change Role
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteUser(user._id)}
                                    className="ml-2"
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for changing user role */}
            <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Change User Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <p>
                            Are you sure you want to {selectedUser.isAdmin ? 'remove admin rights from' : 'grant admin rights to'}{' '}
                            {selectedUser.name}?
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRoleModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleRoleChange}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserList;
