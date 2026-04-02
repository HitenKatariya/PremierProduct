import authService from './authService';
import API_BASE_URL from '../config/api';

const API_ROOT = `${API_BASE_URL}/users`;

const userService = {
  async updateProfile(updates) {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_ROOT}/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return { success: false, message: err.message || 'Failed to update profile' };
    }
  },

  async changePassword(currentPassword, newPassword) {
    try {
      const token = authService.getToken();
      const response = await fetch(`${API_ROOT}/password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return { success: false, message: err.message || 'Failed to update password' };
    }
  }
};

export default userService;