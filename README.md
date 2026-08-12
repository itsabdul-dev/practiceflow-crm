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

