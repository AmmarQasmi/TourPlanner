import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';

dotenv.config();
const supabaseUrl = 'https://czcfgyklepicvfdccsco.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(process.env.supabaseUrl, process.env.apikey);
