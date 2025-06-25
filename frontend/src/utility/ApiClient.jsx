import { ApiError, AuthError } from "./Types"
const BASE_URL = 'http://localhost:9000/api';

export const authApiClient = {
  async loginWithGoogle(userData) {
    try {
      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new ApiError('Login failed', response.status);
      }
      
      return await response.json();
    } catch (error) {
      throw new AuthError(`Authentication failed: ${error.message}`);
    }
  },

  async mockGoogleAuth() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          googleId: 'mock_google_id_12345',
          email: 'john.doe@example.com',
          name: 'John Doe'
        });
      }, 1000);
    });
  }
};

export const userApiClient = {
  async getUserById(userId) {
    try {
      const response = await fetch(`${BASE_URL}/api/user/${userId}`);
      if (!response.ok) {
        throw new ApiError('Failed to fetch user', response.status);
      }
      return await response.json();
    } catch (error) {
      throw new ApiError(`User fetch failed: ${error.message}`);
    }
  },

  async updateDailyGoals(userId, goals) {
    try {
      const response = await fetch(`${BASE_URL}/api/user/daily-goals`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, goals }),
      });
      
      if (!response.ok) {
        throw new ApiError('Failed to update goals', response.status);
      }
      
      return await response.json();
    } catch (error) {
      throw new ApiError(`Goal update failed: ${error.message}`);
    }
  }
};

export const statsApiClient = {
  async createStat(statData) {
    try {
      const response = await fetch(`${BASE_URL}/api/stats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statData),
      });
      
      if (!response.ok) {
        throw new ApiError('Failed to save stat', response.status);
      }
      
      return await response.json();
    } catch (error) {
      throw new ApiError(`Stat creation failed: ${error.message}`);
    }
  },

  async getStatsByUser(userId) {
    try {
      const response = await fetch(`${BASE_URL}/api/stats/${userId}`);
      if (!response.ok) {
        throw new ApiError('Failed to fetch stats', response.status);
      }
      return await response.json();
    } catch (error) {
      throw new ApiError(`Stats fetch failed: ${error.message}`);
    }
  }
};