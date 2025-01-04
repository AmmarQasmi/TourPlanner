import { supabase } from '../db/connect.js';

// returns with order desc wrt to time
export const getAllClients = async (req, res) => {
    try {
        const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });

        if (error) {
            return res.status(400).json({ message: error.message, Error: true });
        }

        return res.status(200).json({ message: 'Client found', Clients: data });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error', Error: true });
    }
};

export const getClientById = async (req, res) => {
    return res.status(200).json({ message: 'Client found', Clients: req.client });
};

export const createClient = async (req, res) => {
    const { first_name: fname, last_name: lname, email, password, phone, address } = req.body;

    if (!fname || !lname || !email || !password || !phone || !address) {
        return res.status(400).json({ message: 'Bad request, all fields required', Error: true });
    }

    try {
        const id = Math.floor(Math.random() * 1000) + 1; // random id generation.
        const client = {
            client_id: id,
            first_name: fname,
            last_name: lname,
            email,
            phone,
            address,
            password
        };
        const { data, error } = await supabase.from('clients').insert(client).select();

        if (error) {
            return res.status(500).json({ message: error.message, Error: true });
        }

        return res.status(201).json({ message: 'Client created successfully', Clients: data, Error: false });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error', Error: true });
    }
};

export const updateClient = async (req, res) => {
    const { clientId } = req.params;
    const { fname, lname, email, phone, address, password } = req.body;

    try {


        // Prepare data for update (excluding undefined fields)
        const updateData = {};
        if (fname) updateData.first_name = fname;
        if (lname) updateData.last_name = lname;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (address) updateData.address = address;
        if (password) {
            updateData.password = password;
        }

        const { data, error } = await supabase
            .from('clients')
            .update(updateData)
            .eq('client_id', clientId).select();

        if (error) {
            return res.status(400).json({ message: error.message });
        }
        // Respond with updated data
        res.status(200).json({ message: 'Client updated successfully', Clinets: data, Error: false });
    } catch (error) {
        console.error('Error updating client:', error.message);
        res.status(500).json({ message: 'Internal Server Error', Error: true });
    }
};

export const deleteClient = async (req, res) => {
    const { clientId } = req.params;
    try {
        const { data, error } = await supabase.from('clients').delete().eq('client_id', clientId).select();

        if (error) {
            return res.status(500).json({ message: 'Internal server error', Error: true });
        }

        return res.status(204).json({ message: 'Client deleted', Client: data });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error', Error: true });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Bad request, email and password are required', Error: true });
    }

    try {
        // Query the clients table to find the user by email
        const { data: client, error: clientError } = await supabase
            .from('clients')
            .select('email, password, is_login')  // Select the required fields
            .eq('email', email)
            .single();  // Ensures only one row is returned

        if (clientError || !client) {
            return res.status(404).json({ message: 'User not found', Error: true });
        }

        // Check if the password matches the stored one
        if (client.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials', Error: true });
        }

        const { error: updateError } = await supabase
            .from('clients')
            .update({ is_login: 'Y' })
            .eq('email', email);

        if (updateError) {
            return res.status(500).json({ message: 'Failed to update login status', Error: true });
        }

        return res.status(200).json({ message: 'Login successful', user: client });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', Error: true });
    }
};
