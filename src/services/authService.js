// This file pretends to be a real server for login/registration.
// In a real app, these functions would call your backend over the internet.

const MOCK_USERS = [
  {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    phone: '1234567890',
    password: 'Test123!'
  }
];

// Small helper to create a "waiting time" so it feels like a real network request
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(credentials) {
    await delay(1000); // Pretend we are talking to a server
    
    const { username, email, password } = credentials;
    
    // Try to find a user whose username/email and password match
    const user = MOCK_USERS.find(u => 
      (u.username === username || u.email === email) && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Return a fake token and a simplified user object
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
    await delay(1000); // Pretend we are talking to a server
    
    const { username, email, phone, password } = userData;
    
    // Make sure the username or email is not already used
    const existingUser = MOCK_USERS.find(u => 
      u.username === username || u.email === email
    );
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Save the new user in our in-memory list (temporary storage)
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
    await delay(1000); // Pretend we are talking to a server
    
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
