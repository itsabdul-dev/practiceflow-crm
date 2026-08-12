'use client';

export default function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-gray-200/80 bg-white/60 backdrop-blur-sm px-6 py-3">
      <p className="text-[11px] text-gray-400">
        © {new Date().getFullYear()} PracticeFlow CRM · HIPAA Compliant Interface
      </p>
    </footer>
  );
}