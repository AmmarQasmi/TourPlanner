import { supabase } from "../db/connect.js";

export const validateBooking = async (req, res, next, id) => {
    // Validate booking ID
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid Booking ID" });
    }

    try {
        // Fetch the booking by ID
        const { data, error } = await supabase
            .from("bookings")
            .select('*')
            .eq("booking_id", id)
            .single();

        // Handle errors or missing booking
        if (error || !data) {
            return res.status(404).json({ error: "Booking not found" });
        }

        // Attach booking data to the request object
        req.booking = data;
        next();
    } catch (err) {
        console.error("Error validating booking:", err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
