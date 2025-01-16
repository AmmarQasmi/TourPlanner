import { supabase } from "../db/connect.js";
import { transporter } from "../nodemailer/nodemailer.config.js"; 

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
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status value." });
    }

    try {
        const { data, error } = await supabase
            .from('bookings')
            .update({ status })
            .eq('booking_id', id)
            .select('*');

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to update booking." });
        }

        if (data.length === 0) {
            return res.status(404).json({ error: "Booking not found." });
        }

        // Step 1: Send email notification to the user
        const booking = data[0];
        const { client_id, agent_id, total_amount } = booking;
        
        // Fetch the client and agent details
        const { data: clientData, error: clientError } = await supabase
            .from('clients')
            .select('first_name, email')
            .eq('client_id', client_id)
            .single();

        const { data: agentData, error: agentError } = await supabase
            .from('agents')
            .select('first_name, email')
            .eq('agent_id', agent_id)
            .single();

        if (clientError || agentError) {
            return res.status(500).json({ error: "Failed to retrieve client or agent information." });
        }

        // Email subject and content
        let subject, htmlContent;
        if (status === 'Confirmed') {
            subject = `Booking Confirmed - ${booking.booking_id}`;
            htmlContent = `
                <p>Dear ${clientData.first_name},</p>
                <p>Your booking has been confirmed! Here are the details:</p>
                <ul>
                    <li><strong>Booking ID:</strong> ${booking.booking_id}</li>
                    <li><strong>Status:</strong> Confirmed</li>
                    <li><strong>Total Amount:</strong> $${total_amount}</li>
                </ul>
                <p>Thank you for booking with us!</p>
            `;
        } else if (status === 'Cancelled') {
            subject = `Booking Cancelled - ${booking.booking_id}`;
            htmlContent = `
                <p>Dear ${clientData.first_name},</p>
                <p>We regret to inform you that your booking has been cancelled due to unforeseen circumstances. Here are the details:</p>
                <ul>
                    <li><strong>Booking ID:</strong> ${booking.booking_id}</li>
                    <li><strong>Status:</strong> Cancelled</li>
                    <li><strong>Total Amount:</strong> $${total_amount}</li>
                </ul>
                <p>If you have any questions or need assistance, please contact our website admin at <strong>${process.env.EMAIL}</strong>. We will reach out to you as soon as possible.</p>
                <p>We apologize for the inconvenience caused.</p>
            `;
        }

        // Send email to the user
        await transporter.sendMail({
            from: `"Hotel Booking Service" <${process.env.EMAIL}>`,
            to: clientData.email,
            subject: subject,
            html: htmlContent,
        });

        // Send email to the admin
        const agentSubject = `Booking Status Update - ${booking.booking_id}`;
        const agentHtml = `
            <h2>Booking Status Update</h2>
            <ul>
                <li><strong>Booking ID:</strong> ${booking.booking_id}</li>
                <li><strong>Status:</strong> ${status}</li>
                <li><strong>Total Amount:</strong> $${total_amount}</li>
            </ul>
            <p>For further details, please review the booking.</p>
        `;

        await transporter.sendMail({
            from: `"Booking Notifications" <${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            subject: agentSubject,
            html: agentHtml,
        });

        return res.status(200).json({
            message: `Booking ${status.toLowerCase()} successfully!`,
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