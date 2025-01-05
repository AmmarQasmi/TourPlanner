import { supabase } from "../db/connect.js";

export const validateHotel = async (req, res, next, id) => {
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid Hotel ID" });
    }

    //check if hotel exists
    const { data, error } = await supabase.from("Hotels").select("*").eq("hotel_id", id).single();

    if (error || !data) {
        return res.status(404).json({ error: 'Hotel not found' });
    }

    req.hotel = data;
    next();
}

