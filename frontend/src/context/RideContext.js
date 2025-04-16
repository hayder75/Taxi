import React, { createContext, useState, useContext } from 'react';
import { rideAPI } from '@services/api';

const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [currentRide, setCurrentRide] = useState(null);
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableRoutes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await rideAPI.getAvailableRoutes();
      setAvailableRoutes(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch routes');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const requestRide = async (rideData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await rideAPI.requestRide(rideData);
      setCurrentRide(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request ride');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkRideStatus = async (rideId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await rideAPI.getRideStatus(rideId);
      setCurrentRide(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check ride status');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelRide = async (rideId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await rideAPI.cancelRide(rideId);
      setCurrentRide(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel ride');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <RideContext.Provider
      value={{
        currentRide,
        availableRoutes,
        loading,
        error,
        fetchAvailableRoutes,
        requestRide,
        checkRideStatus,
        cancelRide,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
}; 