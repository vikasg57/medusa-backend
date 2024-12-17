import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are properly loaded and validated
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables: SUPABASE_URL or SUPABASE_KEY');
}

// Create a single Supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

