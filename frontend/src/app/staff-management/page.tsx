'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import AppShell from '@/components/layout/AppShell';
import StaffPageHeader from '@/components/staff/StaffPageHeader';
import StaffStatsGrid from '@/components/staff/StaffStatsGrid';
import StaffFilterBar from '@/components/staff/StaffFilterBar';
import StaffTable from '@/components/staff/StaffTable';
import PaginationFooter from '@/components/staff/PaginationFooter';
import StaffFormModal from '@/components/staff/StaffFormModal';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { fetchStaffMembers, saveStaffMember, setStaffStatus as updateStaffStatusApi } from '@/services/staffService';
import { exportStaffToCsv } from '@/lib/exportCsv';
import { StaffMember, StaffRole, AccountStatus } from '@/types/staff';
import { useToast } from '@/components/ui/Toast';

const PAGE_SIZE = 5;

export default function StaffManagementPage() {
  const [allStaff, setAllStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchStaffMembers();
        setAllStaff(data);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<StaffRole | 'All Roles'>('All Roles');
  const [statusFilter, setStatusFilter] = useState<AccountStatus | 'All Statuses'>('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | undefined>(undefined);
  const [deactivatingStaff, setDeactivatingStaff] = useState<StaffMember | null>(null);

  const filteredStaff = useMemo(() => {
    return allStaff.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'All Roles' || member.role === roleFilter;
      const matchesStatus = statusFilter === 'All Statuses' || member.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [allStaff, searchTerm, roleFilter, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / PAGE_SIZE));
  const rangeStart = filteredStaff.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredStaff.length);
  const paginatedStaff = filteredStaff.slice(rangeStart - 1, rangeEnd);

  function handleAddClick() {
    setEditingStaff(undefined);
    setIsFormOpen(true);
  }

  function handleEditClick(staff: StaffMember) {
    setEditingStaff(staff);
    setIsFormOpen(true);
  }

  async function handleFormSubmit(data: Omit<StaffMember, 'id' | 'joinDate' | 'lastActive'>) {
    const result = await saveStaffMember(data, editingStaff?.id);
    if (editingStaff) {
      setAllStaff((prev) =>
        prev.map((member) => (member.id === editingStaff.id ? result : member))
      );
      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: `${data.name}'s record saved`,
      });
    } else {
      setAllStaff((prev) => [result, ...prev]);
      addToast({
        type: 'success',
        title: 'Staff Added',
        message: `${data.name} added to directory`,
      });
    }
    setIsFormOpen(false);
  }

  function handleDeactivateClick(staff: StaffMember) {
    setDeactivatingStaff(staff);
  }

  async function handleConfirmDeactivate() {
    if (!deactivatingStaff) return;
    const name = deactivatingStaff.name;
    await updateStaffStatusApi(deactivatingStaff.id, 'Inactive');
    setAllStaff((prev) =>
      prev.map((member) =>
        member.id === deactivatingStaff.id ? { ...member, status: 'Inactive' } : member
      )
    );
    setDeactivatingStaff(null);
    addToast({
      type: 'warning',
      title: 'Account Deactivated',
      message: `${name}'s access has been suspended`,
    });
  }

  function handleExportCsv() {
    exportStaffToCsv(filteredStaff);
    addToast({
      type: 'info',
      title: 'Export Complete',
      message: `${filteredStaff.length} records exported to CSV`,
    });
  }

  return (
    <AppShell>
      <StaffPageHeader onAddClick={handleAddClick} onExportClick={handleExportCsv} />
      <StaffStatsGrid staff={allStaff} />
      <StaffFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <div className="rounded-xl border border-gray-200 bg-white p-6 card-hover">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-800">Team Directory</h2>
            <p className="text-sm text-gray-400">
              {filteredStaff.length} registered staff members found
            </p>
          </div>
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-4 py-6">
            <div className="h-12 w-full animate-pulse rounded-md bg-gray-100" />
            <div className="h-12 w-full animate-pulse rounded-md bg-gray-100" />
            <div className="h-12 w-full animate-pulse rounded-md bg-gray-100" />
            <div className="h-12 w-full animate-pulse rounded-md bg-gray-100" />
            <div className="h-12 w-full animate-pulse rounded-md bg-gray-100" />
          </div>
        ) : (
          <>
            <StaffTable
              staff={paginatedStaff}
              onEdit={handleEditClick}
              onDeactivate={handleDeactivateClick}
            />
            <PaginationFooter
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              total={filteredStaff.length}
              onPrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              canGoPrevious={currentPage > 1}
              canGoNext={currentPage < totalPages}
            />
          </>
        )}
      </div>

      <StaffFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingStaff}
      />

      <ConfirmDialog
        isOpen={deactivatingStaff !== null}
        title="Deactivate Staff Member"
        message={
          deactivatingStaff
            ? `Are you sure you want to deactivate ${deactivatingStaff.name}? Their account status will be changed to Inactive.`
            : ''
        }
        confirmLabel="Deactivate"
        isDangerous
        onConfirm={handleConfirmDeactivate}
        onCancel={() => setDeactivatingStaff(null)}
      />
    </AppShell>
  );
}