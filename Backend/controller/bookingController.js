import { supabase } from "../db/connect.js";

export const createBooking = async (req, res) => {
    const { client_id, destination_id, agent_id, status = 'Pending', total_amount } = req.body;

    if (!client_id || !destination_id || !agent_id || !total_amount) {
        return res.status(400).json({ error: "All Fields Required." });
    }

    try {
        const { data, error } = await supabase
            .from('bookings')
            .insert([{ client_id, destination_id, agent_id, status, total_amount }])
            .select('*');

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to create Booking." });
        }

        return res.status(201).json({
            message: "Booking created successfully!",
            booking: data[0],
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to create booking." });
    }
};

export const getBooking = async (req, res) => {
    try {
        const { data, error } = await supabase.from("bookings").select('*');

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to retrieve Bookings." });
        }

        // Return the list of bookings
        return res.status(200).json({
            message: "Bookings retrieved successfully!",
            bookings: data,
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to retrieve bookings." });
    }
};

export const getBookingsbyID = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase.from("bookings").select('*').eq('booking_id', id);

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to retrieve Bookings." });
        }

        // Return the list of bookings
        return res.status(200).json({
            message: "Bookings retrieved successfully!",
            bookings: data,
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to retrieve bookings." });
    }
};

export const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { client_id, destination_id, agent_id, status = 'Pending', total_amount } = req.body;

    if (!client_id || !destination_id || !agent_id || !total_amount) {
        return res.status(400).json({ error: "All Fields Required." });
    }

    try {
        const { data, error } = await supabase
            .from('bookings')
            .update({ client_id, destination_id, agent_id, status, total_amount })
            .eq('booking_id', id)
            .select('*');

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to update Booking." });
        }

        // Check if the booking was found and updated
        if (data.length === 0) {
            return res.status(404).json({ error: "Booking not found." });
        }

        return res.status(200).json({
            message: "Booking updated successfully!",
            booking: data[0],
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to update booking." });
    }
};

export const deleteBooking = async (req, res) => {
    const { id } = req.params;

    // Validate that an ID is provided
    if (!id) {
        return res.status(400).json({ error: "Booking ID is required." });
    }

    try {
        const { data, error } = await supabase
            .from('bookings')
            .delete()
            .eq('booking_id', id)
            .select('*');

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to delete Booking." });
        }

        // Handle case where no booking was found with the provided ID
        if (data.length === 0) {
            return res.status(404).json({ error: "Booking not found." });
        }

        return res.status(200).json({
            message: "Booking deleted successfully!",
        });
    } catch (err) {
        console.error("Server Error:", err.message);
        return res.status(500).json({ error: "An unexpected error occurred while deleting the booking." });
    }
};