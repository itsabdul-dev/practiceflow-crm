const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://vmeosotjewjxxciznnvj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZW9zb3RqZXdqeHhjaXpubnZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyOTY1NzQsImV4cCI6MjEwMTg3MjU3NH0.OKiDr2OhGfZP67smARadG251BgM_BGWuIihGbF_aPIo'
);

async function checkData() {
  const { data: patients, error: pErr } = await supabase.from('patients').select('*');
  const { data: staff, error: sErr } = await supabase.from('staff').select('*');
  
  console.log('Patients:', patients?.length, 'Error:', pErr);
  console.log('Staff:', staff?.length, 'Error:', sErr);
}

checkData();
