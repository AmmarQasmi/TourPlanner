import { supabase } from '../db/connect.js';
import { generatetokenSetCookie } from '../utils/generateCookieSetTokenClient.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data: client, error: existingError } = await supabase.from('clients').select('*').eq('email', email).eq('password', password).single();

        if (existingError || !client) {
            return res.status(400).json({ message: 'Invalid email or password', Error: true });
        }

        // update status of login to Y
        const { error: updateError } = await supabase.from('clients').update({is_login: 'Y'}).eq('client_id', client.client_id);

        if(updateError) {
            return res.status(500).json({ message: 'Failed to update login status', Error: true });
        }

        const token = generatetokenSetCookie(res, client.client_id, client.is_login, client.email);

        return res.status(200).json({
            message: 'Login successful',
            token,
            is_agent: false, // Ensure frontend knows the role
            Error: false
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: err.message, Error: false});  
    }
};

export const logout = async (req, res) => {
    try {
        // 1. Get token from cookies
        const token = req.cookies.client_token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized, no token provided', Error: true });
        }

        // 2. Verify and Decode token
        const decoded = jwt.verify(token, 'my_secret');

        // 3. Fetch the agent using the decoded ID
        const { data: client, error } = await supabase
            .from('clients')
            .select('*')
            .eq('client_id', decoded.id) // Use decoded.id
            .single();

        // 4. Handle errors or missing agent
        if (error || !client) {
            return res.status(404).json({ message: 'Client not found', Error: true });
        }

        // 5. Update `is_login` to N
        const { error: updateError } = await supabase
            .from('clients')
            .update({ is_login: 'N' }) // Correct boolean value
            .eq('client_id', client.client_id);

        if (updateError) {
            return res.status(500).json({ message: 'Failed to update login status', Error: true });
        }

        // 6. Clear the cookie and send success response
        res.clearCookie('client_token', { path: '/' });
        return res.status(200).json({ message: 'Logged out successfully', Error: false });

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: err.message, Error: true });
    }
};