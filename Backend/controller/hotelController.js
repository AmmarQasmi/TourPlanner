import { supabase } from "../db/connect.js";

export const getHotel = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("hotels").select('*');

        if (error) {
            console.error("Supabase Error", error);
            return res.status(500).json({ error: "Failed to get Hotels" });
        }

        // Return the list of agents
        return res.status(200).json({
            message: "Hotels retrieved successfully!",
            hotels: data,
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to retrieve hotels." });
    }
}

export const getHotelByID = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("hotels").select("*").eq("hotel_id", id);

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to retrieve hotels by id." });
        }

        return res.status(200).json({
            message: "Hotels retrieved successfully",
            hotels: data,
        });
    } catch {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to retrieve hotels." });
    }
}

export const createHotel = async (req, res) => {
    const { name, location, rating, capacity, image, description } = req.body;

    if (!name || !location || !rating || !capacity || !image || !description) {
        return res.status(400).json({ error: "All fields (name, location, rating, capacity, image, description) are required." });
    }

    try {
        const { data, error } = await supabase
            .from("hotels")
            .insert([{ name, location, rating, capacity, image, description }])
            .select('*').single();

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to create Hotel." });
        }

        return res.status(201).json({
            message: "Hotel created successfully!",
            hotel: data,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to create Hotel." });
    }
};

export const updateHotel = async (req, res) => {
    const { id: hotel_id } = req.params;
    const { name, location, rating, capacity, image, description } = req.body;

    if (!hotel_id) {
        return res.status(400).json({ error: "Hotel ID is required." });
    }

    if (!name || !location || !rating || !capacity) {
        return res.status(400).json({ error: "Name, location, rating, and capacity are required." });
    }

    try {
        const { data, error } = await supabase
            .from("hotels")
            .update({ name, location, rating, capacity, image, description })
            .eq("hotel_id", hotel_id)
            .select('*').single();

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to update Hotel." });
        }

        return res.status(200).json({
            message: "Hotel updated successfully!",
            hotel: data,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to update Hotel." });
    }
}

export const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("hotels").delete().eq("hotel_id", id);
        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to delete hotel." });
        }

        return res.status(200).json({
            message: "Hotel deleted successfully",
        });
    } catch {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to delete hotel." });
    }
}

