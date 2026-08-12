# Medical Practice CRM Software

A modern, HIPAA-compliant Medical Practice Customer Relationship Management (CRM) platform built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Supabase.

---

## 👥 Team Roles & Responsibilities Matrix

| Team Member | Role | Assigned Responsibility |
| :--- | :--- | :--- |
| **Will Bryan Koeries** | Frontend Developer 1 | UI design system, layout, navigation & AppShell |
| **Matthew Barron** | Frontend Developer 2 • Secretary | Patient management directory interface |
| **Aiden Barends** | Frontend Developer 3 | Appointment scheduling & calendar interface |
| **Joshua Jonathan Bird** | Backend Developer 1 | Authentication, user roles, clinic tenant structure |
| **Jonathan Scott Munday** | Backend Developer 2 • Technical Lead | Patient database, medical notes, file storage |
| **Abdullahi Farah** | Backend Developer 3 • Chairperson | Appointment scheduling database & business logic |

---

## 🏗 System Architecture & Directory Structure

```
Medical-Practise-Crm/
├── frontend/                     # Next.js 16 + React 19 + Tailwind CSS Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Login Page & Supabase Connection Indicator
│   │   │   ├── dashboard/        # Practice Overview Dashboard & Quick Metrics
│   │   │   ├── patients/         # Patient Directory, Registration & Editing
│   │   │   ├── clinical-workspace/ # Clinical SOAP Notes & Medication Workspace
│   │   │   └── staff-management/ # Staff & Provider Management Directory
│   │   ├── components/           # UI Components, AppShell, Layout & Modals
│   │   ├── lib/                  # Supabase client (`supabase.ts`) & utilities
│   │   ├── services/             # Database Services (Patients, Staff, Clinical)
│   │   └── types/                # TypeScript Interfaces
│   ├── .env.example              # Environment variables template
│   └── package.json
├── supabase/                     # Supabase Backend Configuration
│   ├── migrations/
│   │   └── 20260809000000_init_schema.sql # Database Migration Script
│   └── seed.sql                  # Initial SQL Seed Data
└── documentation/                # API Specs & Diagrams
```

---

## 🚀 Step-by-Step Instructions: Connecting Supabase Backend

Follow these steps to connect your live Supabase database with the Next.js frontend:

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and log in or create a free account.
2. Click **New Project** and select your organization.
3. Enter a **Name** (e.g., `medical-practice-crm`), choose a secure database password, and select your preferred region.
4. Click **Create new project** and wait for the database to spin up (~1-2 minutes).

### Step 2: Run Database Schema & Migration Script
1. In your Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Copy the entire contents of `supabase/migrations/20260809000000_init_schema.sql` from this repository and paste it into the SQL Editor.
4. Click **Run** (or press Ctrl+Enter / Cmd+Enter). This creates the `patients`, `staff`, `clinical_notes`, `medications`, and `visit_history` tables along with Row Level Security (RLS) policies.

### Step 3: Seed Initial Demo Data (Optional but Recommended)
1. Open another query in the Supabase **SQL Editor**.
2. Copy the entire contents of `supabase/seed.sql` from this repository and paste it into the editor.
3. Click **Run**. This populates sample physicians, nurses, patient profiles, active medications, and SOAP notes.

### Step 4: Retrieve API Keys
1. In your Supabase Dashboard, go to **Project Settings** (gear icon at bottom left) -> **API**.
2. Copy your **Project URL** (e.g. `https://xxxx.supabase.co`).
3. Copy your **`anon` `public` Key**.

### Step 5: Configure Local Environment Variables
1. Inside the `frontend` folder, create a file named `.env.local`:
   ```bash
   cd frontend
   cp .env.example .env.local
   ```
2. Open `.env.local` and paste your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 6: Start the Frontend Application
1. Run the dev server:
   ```bash
   cd frontend
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. The Login page will show a **"Connected to Live Supabase Backend"** badge!

---

## ⚡ Running in Local Sandbox / Demo Mode

If environment variables are not set, the CRM operates in **Local Sandbox Mode**, utilizing local state memory so you can immediately explore and demonstrate all features without configuring a live database.
