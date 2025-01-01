import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();

export const supabase = createClient(process.env.supabaseUrl, process.env.apikey);
