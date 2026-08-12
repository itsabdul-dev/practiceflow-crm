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

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function clearDatabase() {
  console.log('Clearing clinical notes...');
  await supabase.from('clinical_notes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  console.log('Clearing medications...');
  await supabase.from('medications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  console.log('Clearing visit history...');
  await supabase.from('visit_history').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  console.log('Clearing patients...');
  await supabase.from('patients').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  console.log('Clearing staff...');
  await supabase.from('staff').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  console.log('Database cleared successfully!');
}

clearDatabase().catch(console.error);
