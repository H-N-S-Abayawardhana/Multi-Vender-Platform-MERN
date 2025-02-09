import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css'; 

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/api/users/register', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
