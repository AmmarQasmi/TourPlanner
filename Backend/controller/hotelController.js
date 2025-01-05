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

}
export const updateHotel = async (req, res) => {

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

