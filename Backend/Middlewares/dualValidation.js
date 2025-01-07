import { supabase } from '../db/connect.js';
import jwt from 'jsonwebtoken';


// Middleware for Clients and Agents
export const authenticateUser = async (req, res, next) => {
  try {
    // 1. Extract tokens for both roles
    const clientToken = req.cookies.client_token; // Token for clients
    const agentToken = req.cookies.agent_token;   // Token for agents

    let token = null;     // Will hold the extracted token
    let role = null;      // Role: 'client' or 'agent'
    let decoded = null;   // Decoded token payload

    // 2. Check if Client Token Exists
    if (clientToken) {
      token = clientToken;
      role = 'client';
    } 
    // 3. Check if Agent Token Exists
    else if (agentToken) {
      token = agentToken;
      role = 'agent';
    } 
    // 4. No Token Found
    else {
      return res.status(401).json({ message: "Authentication required", Error: true });
    }

    // 5. Verify Token
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'my_secret'); // Decode JWT
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Session expired. Please log in again.', Error: true });
      }
      console.error('Token verification failed:', error);
      return res.status(403).json({ message: 'Invalid token', Error: true });
    }

    // 6. Fetch User from Supabase based on role
    const { data: user, error } = await supabase
      .from(role === 'client' ? 'clients' : 'agents') // Table based on role
      .select('*')
      .eq(role === 'client' ? 'client_id' : 'agent_id', decoded.id) // Match ID
      .single(); // Fetch single record

    // 7. Handle Errors or Missing User
    if (error || !user) {
      return res.status(404).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found`, Error: true });
    }

    // 8. Check if User is Logged In (is_login === 'Y')
    if (user.is_login !== 'Y') {
      return res.status(403).json({ message: 'Session invalid. Please log in again.', Error: true });
    }

    // 9. Attach User Details to Request
    req.user = {
      id: user[role === 'client' ? 'client_id' : 'agent_id'],
      email: user.email,
      role: role, // 'client' or 'agent'
    };

    // 10. Proceed to Next Middleware
    next();

  } catch (err) {
    console.error('Authentication error:', err.message);
    return res.status(500).json({ message: 'Internal server error', Error: true });
  }
};
