'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Inquiry {
  id: string;
  name: string;
  email: string;
  inquiry_type: string;
  message: string;
  phone?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  status: string;
  created_at: string;
}

interface ModalInquiry extends Inquiry {}

export default function AdminDashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [modalInquiry, setModalInquiry] = useState<ModalInquiry | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/admin/login');
        return;
      }

      setUser(user);
      fetchInquiries();
    };

    checkAuth();
  }, [router]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
      setInquiries(
        inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      await supabase.from('inquiries').delete().eq('id', id);
      setInquiries(inquiries.filter((inq) => inq.id !== id));
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const filteredInquiries = selectedStatus
    ? inquiries.filter((inq) => inq.status === selectedStatus)
    : inquiries;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Inquiry Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600">Total Inquiries</p>
            <p className="text-2xl font-bold text-slate-900">{inquiries.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600">New</p>
            <p className="text-2xl font-bold text-blue-600">
              {inquiries.filter((inq) => inq.status === 'new').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600">Contacted</p>
            <p className="text-2xl font-bold text-yellow-600">
              {inquiries.filter((inq) => inq.status === 'contacted').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <p className="text-sm text-slate-600">Interested</p>
            <p className="text-2xl font-bold text-green-600">
              {inquiries.filter((inq) => inq.status === 'interested').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 mb-6">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedStatus(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedStatus === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({inquiries.length})
            </button>
            {['new', 'contacted', 'interested', 'closed'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)} (
                {inquiries.filter((inq) => inq.status === status).length})
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          {filteredInquiries.length === 0 ? (
            <div className="p-8 text-center text-slate-600">
              No inquiries found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{inquiry.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {inquiry.inquiry_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={inquiry.status}
                          onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                          className="px-3 py-1 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="interested">Interested</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => setModalInquiry(inquiry)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-medium"
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-slate-200 sticky top-0 bg-white flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Inquiry from {modalInquiry.name}
              </h2>
              <button
                onClick={() => setModalInquiry(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase">Email</p>
                <p className="text-slate-900">{modalInquiry.email}</p>
              </div>
              {modalInquiry.phone && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Phone</p>
                  <p className="text-slate-900">{modalInquiry.phone}</p>
                </div>
              )}
              {modalInquiry.company && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Company</p>
                  <p className="text-slate-900">{modalInquiry.company}</p>
                </div>
              )}
              {modalInquiry.budget && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Budget</p>
                  <p className="text-slate-900">{modalInquiry.budget}</p>
                </div>
              )}
              {modalInquiry.timeline && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">Timeline</p>
                  <p className="text-slate-900">{modalInquiry.timeline}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase">Message</p>
                <p className="text-slate-900 whitespace-pre-wrap">{modalInquiry.message}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase">Submitted</p>
                <p className="text-slate-900">
                  {new Date(modalInquiry.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
