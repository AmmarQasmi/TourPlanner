import { supabase } from "../db/connect.js";
import { generatetokenSetCookie } from '../utils/generateCookieSetTokenAgent.js';

export const createAgent = async (req, res) => {
    const { first_name, last_name, email, phone, password, region } = req.body;
  
    if (!first_name || !last_name || !email || !phone || !region || !password) {
      return res.status(400).json({ error: "first_name, last_name, email, phone, region  and password are required." });
    }

    try {
        const is_login = 'Y';
        const agent_id = Math.floor(Math.random() * 10000) + 1;
        const { data, error } = await supabase
            .from("agents")
            .insert([{ agent_id ,first_name, last_name, email, phone, region, password, is_login }]) // password added
            .select()
            .single();

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to create agent." });
        }

        // set token for the agent
        const token = generatetokenSetCookie(res, agent_id, is_login, email);

        return res.status(201).json({
            message: "Agent created successfully!",
            agent: data,
            token
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to create agent." });
    }
};


export const getAgents = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("agents")
            .select(); // Fetch all agents

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to retrieve agents." });
        }

        // Return the list of agents
        return res.status(200).json({
            message: "Agents retrieved successfully!",
            agents: data,
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to retrieve agents." });
    }
};

export const getAgentsByID = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch agent data from the "agents" table based on the provided ID
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("agent_id", id)
      .single(); // Fetch a single row instead of an array

    if (error) {
      console.error("Supabase Error:", error);
      return res.status(500).json({ error: "Failed to retrieve agent." });
    }

    // Return the single agent object
    return res.status(200).json({
      message: "Agent retrieved successfully!",
      agent: data, // Send the single agent object
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Failed to retrieve agent." });
  }
};

export const updateAgent = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone, region } = req.body;

    try {
        const { data, error } = await supabase
            .from("agents")
            .update({ first_name, last_name, email, phone, region })
            .eq('agent_id', id) // 'id' to target the specific agent
            .select();

        if (error) {
            console.error("Supabase error", error);
            return res.status(500).json({ error: "Failed to update agent." });
        }

        if (data && data.length > 0) {
            return res.status(200).json({
                message: "Agent updated successfully!",
                agent: data[0], // Return the updated agent
            });
        } else {
            return res.status(404).json({ message: "Agent not found." });
        }
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to update the agent." });
    }
};

export const deleteAgent = async (req, res) => {
    const { id } = req.params;

    try {
        const { error } = await supabase
            .from("agents")
            .delete() 
            .eq('agent_id', id); 

        if (error) {
            console.error("Supabase error:", error);
            return res.status(500).json({ error: "Failed to delete agent." });
        }

        // If no error and the agent is deleted, send a success response
        return res.status(200).json({
            message: "Agent deleted successfully!",
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to delete the agent." });
    }
};

// export const login = async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Bad request, email and password are required', Error: true });
//     }

//     try {
//         const { data: agent, error: agentError } = await supabase
//             .from('agents')
//             .select('email, password, is_login') 
//             .eq('email', email)
//             .single();  // Ensures only one row is returned

//         if (agentError || !agent) {
//             return res.status(404).json({ message: 'User not found', Error: true });
//         }

//         // Check if the password matches the stored one
//         if (agent.password !== password) {
//             return res.status(401).json({ message: 'Invalid credentials', Error: true });
//         }

//         const { error: updateError } = await supabase
//             .from('agents')
//             .update({ is_login: 'Y' })
//             .eq('email', email);

//         if (updateError) {
//             return res.status(500).json({ message: 'Failed to update login status', Error: true });
//         }

//         return res.status(200).json({ message: 'Login successful', user: agent });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error', Error: true });
//     }
// };
