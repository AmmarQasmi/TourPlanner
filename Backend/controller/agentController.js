import { supabase } from "../db/connect.js";

export const createAgent = async (req, res) => {
    const { first_name, last_name, email, phone, region } = req.body;
  
    if (!first_name || !last_name || !email || !phone || !region) {
      return res.status(400).json({ error: "first_name, last_name, email, phone, region are required." });
    }

    try {
        const { data, error } = await supabase
            .from("agents")
            .insert([{ first_name, last_name, email, phone, region }])
            .select();

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to create agent." });
        }

        return res.status(201).json({
            message: "Agent created successfully!",
            agent: data[0],
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
        const { data, error } = await supabase
            .from("agents")
            .select("*") // Fetch all agents
            .eq("agent_id", id);

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
