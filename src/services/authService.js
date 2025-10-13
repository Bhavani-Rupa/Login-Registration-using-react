// Mock authentication service for testing purposes
// In a real application, this would make actual API calls to your backend

const MOCK_USERS = [
  {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    phone: '1234567890',
    password: 'Test123!'
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(credentials) {
    await delay(1000); // Simulate network delay
    
    const { username, email, password } = credentials;
    
    // Find user by username or email
    const user = MOCK_USERS.find(u => 
      (u.username === username || u.email === email) && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Return mock token
    return {
      success: true,
      token: 'mock-jwt-token-' + user.id,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
  },

  async register(userData) {
    await delay(1000); // Simulate network delay
    
    const { username, email, phone, password } = userData;
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => 
      u.username === username || u.email === email
    );
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Add new user to mock database
    const newUser = {
      id: MOCK_USERS.length + 1,
      username,
      email,
      phone,
      password
    };
    
    MOCK_USERS.push(newUser);
    
    return {
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    };
  },

  async forgotPassword(email) {
    await delay(1000); // Simulate network delay
    
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Email not found');
    }
    
    return {
      success: true,
      message: 'Password reset instructions sent to your email'
    };
  }
};
