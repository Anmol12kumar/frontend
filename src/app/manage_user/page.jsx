'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const API_BASE_URL = 'http://localhost:5000/api';

// Validation schema
const petValidationSchema = Yup.object().shape({
    name: Yup.string().required('Pet name is required').min(2, 'Name must be at least 2 characters'),
    type: Yup.string().required('Pet type is required'),
    breed: Yup.string().required('Breed is required'),
    age: Yup.number().required('Age is required').positive('Age must be positive'),
    weight: Yup.number().required('Weight is required').positive('Weight must be positive'),
    color: Yup.string().required('Color is required'),
    vaccinated: Yup.boolean(),
    microchip: Yup.string(),
    description: Yup.string(),
    imageUrl: Yup.string().url('Must be a valid URL'),
});

export default function ManageUser() {
    const [pets, setPets] = useState([]);
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingPet, setEditingPet] = useState(null);

    // Initialize user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserId(user._id || user.id);
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
                toast.error('Please log in first');
            }
        } else {
            toast.error('Please log in to manage pets');
        }
    }, []);

    // Fetch user's pets
    const fetchPets = async (uid) => {
        if (!uid) return;
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/pets/${uid}`);
            setPets(response.data.pets);
        } catch (error) {
            if (error.response?.status !== 404) {
                toast.error('Error fetching pets');
            }
            setPets([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch pets when userId is set
    useEffect(() => {
        if (userId) {
            fetchPets(userId);
        }
    }, [userId]);

    // Handle form submission
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const petData = {
                ...values,
                userId,
            };

            if (editingPet) {
                // Update existing pet
                const response = await axios.put(`${API_BASE_URL}/pets/${editingPet._id}`, petData);
                toast.success('Pet updated successfully');
                setPets(pets.map(pet => pet._id === editingPet._id ? response.data.pet : pet));
                setEditingPet(null);
            } else {
                // Create new pet
                const response = await axios.post(`${API_BASE_URL}/pets`, petData);
                toast.success('Pet added successfully');
                setPets([...pets, response.data.pet]);
            }

            resetForm();
            setIsFormVisible(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error saving pet');
        }
    };

    // Handle pet deletion
    const handleDeletePet = async (petId) => {
        if (window.confirm('Are you sure you want to delete this pet?')) {
            try {
                await axios.delete(`${API_BASE_URL}/pets/${petId}`);
                toast.success('Pet deleted successfully');
                setPets(pets.filter(pet => pet._id !== petId));
            } catch (error) {
                toast.error('Error deleting pet');
            }
        }
    };

    // Handle edit
    const handleEditPet = (pet) => {
        setEditingPet(pet);
        setIsFormVisible(true);
    };

    // Reset form
    const handleCloseForm = () => {
        setIsFormVisible(false);
        setEditingPet(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">Manage Your Pets</h1>
                        <p className="text-gray-600 mt-2">Keep track of all your furry friends</p>
                    </div>
                    <button
                        onClick={() => setIsFormVisible(!isFormVisible)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                    >
                        <FiPlus size={20} />
                        Add Pet
                    </button>
                </div>

                {/* Form Section */}
                {isFormVisible && (
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {editingPet ? 'Edit Pet' : 'Add New Pet'}
                        </h2>

                        <Formik
                            initialValues={
                                editingPet || {
                                    name: '',
                                    type: 'Dog',
                                    breed: '',
                                    age: '',
                                    weight: '',
                                    color: '',
                                    vaccinated: false,
                                    microchip: '',
                                    description: '',
                                    imageUrl: '',
                                }
                            }
                            validationSchema={petValidationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {({ isSubmitting }) => (
                                <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pet Name *
                                        </label>
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="Enter pet name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pet Type *
                                        </label>
                                        <Field
                                            as="select"
                                            name="type"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="Dog">Dog</option>
                                            <option value="Cat">Cat</option>
                                            <option value="Bird">Bird</option>
                                            <option value="Rabbit">Rabbit</option>
                                            <option value="Hamster">Hamster</option>
                                            <option value="Guinea Pig">Guinea Pig</option>
                                            <option value="Other">Other</option>
                                        </Field>
                                        <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Breed */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Breed *
                                        </label>
                                        <Field
                                            type="text"
                                            name="breed"
                                            placeholder="Enter breed"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="breed" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Age */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Age (years) *
                                        </label>
                                        <Field
                                            type="number"
                                            name="age"
                                            placeholder="Enter age"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Weight */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Weight (kg) *
                                        </label>
                                        <Field
                                            type="number"
                                            name="weight"
                                            placeholder="Enter weight"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="weight" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Color */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Color *
                                        </label>
                                        <Field
                                            type="text"
                                            name="color"
                                            placeholder="Enter color"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="color" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Vaccinated */}
                                    <div className="flex items-center">
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                            <Field type="checkbox" name="vaccinated" />
                                            Vaccinated
                                        </label>
                                    </div>

                                    {/* Microchip */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Microchip ID
                                        </label>
                                        <Field
                                            type="text"
                                            name="microchip"
                                            placeholder="Enter microchip ID (optional)"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Image URL */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Image URL
                                        </label>
                                        <Field
                                            type="text"
                                            name="imageUrl"
                                            placeholder="Enter image URL (optional)"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            placeholder="Additional information about your pet"
                                            rows="4"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="md:col-span-2 flex gap-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Saving...' : editingPet ? 'Update Pet' : 'Add Pet'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCloseForm}
                                            className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}

                {/* Pets List */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Pets</h2>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="text-gray-500 text-lg">Loading pets...</div>
                        </div>
                    ) : pets.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <p className="text-gray-500 text-lg">No pets added yet. Click "Add Pet" to get started!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pets.map((pet) => (
                                <div key={pet._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                                    {pet.imageUrl && (
                                        <img
                                            src={pet.imageUrl}
                                            alt={pet.name}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
                                        <div className="space-y-2 text-gray-600 mb-4">
                                            <p><span className="font-semibold">Type:</span> {pet.type}</p>
                                            <p><span className="font-semibold">Breed:</span> {pet.breed}</p>
                                            <p><span className="font-semibold">Age:</span> {pet.age} years</p>
                                            <p><span className="font-semibold">Weight:</span> {pet.weight} kg</p>
                                            <p><span className="font-semibold">Color:</span> {pet.color}</p>
                                            {pet.vaccinated && (
                                                <p className="text-green-600"><span className="font-semibold">✓</span> Vaccinated</p>
                                            )}
                                            {pet.microchip && (
                                                <p><span className="font-semibold">Microchip:</span> {pet.microchip}</p>
                                            )}
                                        </div>
                                        {pet.description && (
                                            <p className="text-gray-600 text-sm mb-4">{pet.description}</p>
                                        )}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditPet(pet)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                            >
                                                <FiEdit2 size={18} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeletePet(pet._id)}
                                                className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                                            >
                                                <FiTrash2 size={18} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
