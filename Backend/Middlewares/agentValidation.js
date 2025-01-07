import { supabase } from "../db/connect.js";
import jwt from "jsonwebtoken";

export const validateAgent = async (req, res, next, id) => {
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid Agent ID" });
  }

  //check if agent exists
  const { data, error } = await supabase.from('agents').select('*').eq('agent_id', id).single();

  if (error || !data) {
    return res.status(404).json({ error: 'Client not found' });
  }

  // Attach the agent data to the request object
  req.agent = data;
  next();
};

// Middleware to Authenticate Agent
export const authenticateAgent = async (req, res, next) => {
  try {
    // 1. Extract token from cookies
    const token = req.cookies.agent_token;
    if (!token) {
      return res.status(401).json({ message: "Authentication required", Error: true });
    }

    // 2. Verify and decode the token
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

    // 3. Fetch agent from Supabase using decoded ID
    const { data: agent, error } = await supabase
      .from('agents')
      .select('*')
      .eq('agent_id', decoded.id)
      .single(); // Fetch one record

    // 4. Handle errors or missing agent
    if (error || !agent) {
      return res.status(404).json({ message: "Agent not found", Error: true });
    }

    // 5. Check if agent is logged in (is_login must be true)
    if (agent.is_login !== 'Y') {
      return res.status(403).json({ message: "Access denied. Please log in again.", Error: true });
    }

    // 6. Attach user details to the request object
    req.user = {
      id: agent.agent_id,
      email: agent.email,
      is_agent: true,
    };

    // Proceed to next middleware
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    return res.status(500).json({ message: "Internal server error", Error: true });
  }
};

