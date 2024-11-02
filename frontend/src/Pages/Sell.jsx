import React, { useState } from "react";
import axios from "axios";
import './CSS/Sell.css';
import Footer from "../Components/Footer/Footer";

const Sell = () => {
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        model: '',
        condition: '',
        startingBid: '',
        auctionEndTime: '',
        description: ''
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        // Validate file size (max 5MB)
        if (file && file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            e.target.value = null;
            return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (file && !validTypes.includes(file.type)) {
            setError('Please upload a valid image file (JPEG, PNG, or WEBP)');
            e.target.value = null;
            return;
        }

        setImage(file);
        setError('');
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        if (!image) {
            setError('Please select an image');
            return false;
        }

        if (parseFloat(formData.startingBid) <= 0) {
            setError('Starting bid must be greater than 0');
            return false;
        }

        const auctionDate = new Date(formData.auctionEndTime);
        if (auctionDate <= new Date()) {
            setError('Auction end time must be in the future');
            return false;
        }

        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submission started'); // Debug log
    
        if (!validateForm()) {
            console.log('Form validation failed'); // Debug log
            return;
        }
    
        setLoading(true);
        setError('');
        setSuccess('');
    
        try {
            console.log('Preparing form data'); // Debug log
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('brand', formData.brand);
            formDataToSend.append('model', formData.model);
            formDataToSend.append('condition', formData.condition);
            formDataToSend.append('startingBid', formData.startingBid);
            formDataToSend.append('auctionEndTime', formData.auctionEndTime);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', image);
    
            // Log the form data being sent
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
    
            console.log('Sending request to server'); // Debug log
            const response = await axios.post(
                'http://localhost:3000/api/sell/add-watch', 
                formDataToSend, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        console.log('Upload progress:', percentCompleted + '%');
                    }
                }
            );
    
            console.log('Server response:', response.data); // Debug log
    
            if (response.data.watch) {
                setSuccess('Watch added successfully!');
                // Reset form
                setFormData({
                    name: '',
                    brand: '',
                    model: '',
                    condition: '',
                    startingBid: '',
                    auctionEndTime: '',
                    description: ''
                });
                setImage(null);
                setPreview(null);
            }
        } catch (error) {
            console.error('Upload error details:', error.response || error); // Detailed error logging
            setError(
                error.response?.data?.message || 
                'Error creating listing. Please try again. Error: ' + error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sell-page">
            <div className="sell-container">
                <h1>Sell Your Watch</h1>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <form onSubmit={handleSubmit} className="sell-form">
                    <div className="form-group">
                        <label>Watch Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter watch name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter brand name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Model</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter model number"
                        />
                    </div>

                    <div className="form-group">
                        <label>Condition</label>
                        <select
                            name="condition"
                            value={formData.condition}
                            onChange={handleInputChange}
                            required
                            className="condition-select"
                        >
                            <option value="">Select condition</option>
                            <option value="new">New</option>
                            <option value="used">Used</option>
                            <option value="refurbished">Refurbished</option>
                            <option value="not working">Not Working</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Starting Bid ($)</label>
                        <input
                            type="number"
                            name="startingBid"
                            value={formData.startingBid}
                            onChange={handleInputChange}
                            required
                            min="0.01"
                            step="0.01"
                            placeholder="Enter starting bid"
                        />
                    </div>

                    <div className="form-group">
                        <label>Auction End Time</label>
                        <input
                            type="datetime-local"
                            name="auctionEndTime"
                            value={formData.auctionEndTime}
                            onChange={handleInputChange}
                            required
                            min={new Date().toISOString().slice(0, 16)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter watch description"
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label>Image</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/jpeg,image/png,image/webp"
                            required
                        />
                        {preview && (
                            <img src={preview} alt="Preview" className="preview-image" />
                        )}
                    </div>

                    <button type="submit" disabled={loading} className="submit-button">
                        {loading ? 'Uploading ...' : 'Create Listing'}
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Sell;