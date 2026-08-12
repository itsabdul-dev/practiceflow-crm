const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

let supabaseUrl = '';
let supabaseAnonKey = '';

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    if (match[1] === 'NEXT_PUBLIC_SUPABASE_URL') supabaseUrl = match[2];
    if (match[1] === 'NEXT_PUBLIC_SUPABASE_ANON_KEY') supabaseAnonKey = match[2];
  }
});

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  const { data, error } = await supabase.from('staff').insert({
    name: 'Test Staff',
    email: 'test@example.com',
    role: 'Physician',
    department: 'Cardiology',
    status: 'Active'
  }).select().single();
  
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Inserted:', data);
  }
}

testInsert();
