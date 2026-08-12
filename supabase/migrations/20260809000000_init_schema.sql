-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Patients Table
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    dob DATE NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    assigned_doctor TEXT NOT NULL DEFAULT 'Dr. Sarah Smith',
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    last_visit DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Staff Table
CREATE TABLE IF NOT EXISTS public.staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    department TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'On Leave')),
    join_date DATE DEFAULT CURRENT_DATE,
    last_active TEXT DEFAULT 'Just now',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Clinical SOAP Notes Table
CREATE TABLE IF NOT EXISTS public.clinical_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    session_date DATE DEFAULT CURRENT_DATE,
    subjective TEXT DEFAULT '',
    objective TEXT DEFAULT '',
    assessment TEXT DEFAULT '',
    plan TEXT DEFAULT '',
    attached_lab_ids TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Medications Table
CREATE TABLE IF NOT EXISTS public.medications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Visit History Table
CREATE TABLE IF NOT EXISTS public.visit_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    visit_date DATE NOT NULL,
    reason TEXT NOT NULL,
    provider TEXT NOT NULL,
    status TEXT DEFAULT 'Completed',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visit_history ENABLE ROW LEVEL SECURITY;

-- Allow public access for anon client during development
CREATE POLICY "Allow public read access on patients" ON public.patients FOR SELECT USING (true);
CREATE POLICY "Allow public write access on patients" ON public.patients FOR ALL USING (true);

CREATE POLICY "Allow public read access on staff" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Allow public write access on staff" ON public.staff FOR ALL USING (true);

CREATE POLICY "Allow public read access on clinical_notes" ON public.clinical_notes FOR SELECT USING (true);
CREATE POLICY "Allow public write access on clinical_notes" ON public.clinical_notes FOR ALL USING (true);

CREATE POLICY "Allow public read access on medications" ON public.medications FOR SELECT USING (true);
CREATE POLICY "Allow public write access on medications" ON public.medications FOR ALL USING (true);

CREATE POLICY "Allow public read access on visit_history" ON public.visit_history FOR SELECT USING (true);
CREATE POLICY "Allow public write access on visit_history" ON public.visit_history FOR ALL USING (true);
