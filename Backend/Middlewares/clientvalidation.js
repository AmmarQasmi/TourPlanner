import { supabase } from "../db/connect.js";
import jwt from 'jsonwebtoken';


export const validateClientId = async (req, res, next, clientId) => {

    // Check if ID is valid
    if (!clientId || isNaN(clientId)) {
        return res.status(400).json({ error: 'Invalid Client ID' });
    }

    // Check if client exists in Supabase
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('client_id', clientId)
        .single();

    if (error || !data) {
        return res.status(404).json({ error: 'Client not found' });
    }

    // Attach the client data to the request object
    req.client = data;
    next();
};

// Middleware to Authenticate Client
export const authenticateClient = async (req, res, next) => {
  try {
    // 1. Extract token from cookies
    const token = req.cookies.client_token; // Extract token from client cookie
    if (!token) {
      return res.status(401).json({ message: "Authentication required", Error: true });
    }

    // 2. Verify and Decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "my_secret");
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.log('Token expired');
        return res.status(401).json({ message: 'Session expired. Please log in again.', Error: true });
      }
      console.error("Token verification failed:", error);
      return res.status(403).json({ message: "Invalid or expired token", Error: true });
    }

    // 3. Fetch client from Supabase using decoded ID
    const { data: client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('client_id', decoded.id)
      .single(); // Fetch one record

    // 4. Handle errors or missing client
    if (error || !client) {
      return res.status(404).json({ message: "Client not found", Error: true });
    }

    // 5. Check if client is logged in (is_login must be true)
    if (!client.is_login) {
      return res.status(403).json({ message: "Access denied. Please log in again.", Error: true });
    }

    // 6. Attach client details to the request object
    req.user = {
      id: client.client_id,
      email: client.email,
      is_agent: false, // Set role for clients
    };

    // Proceed to the next middleware
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    return res.status(500).json({ message: "Internal server error", Error: true });
  }
};
