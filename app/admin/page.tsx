'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { AdminNavbar } from '@/components/navigation';

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

export default function AdminDashboard() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [modalInquiry, setModalInquiry] = useState<Inquiry | null>(null);

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

  if (loading) {
    return (
      <div className="admin-dashboard admin-dashboard-loading">
        <div className="admin-dashboard-loader">Loading...</div>
      </div>
    );
  }

  // Calculate metrics
  const totalInquiries = inquiries.length;
  const newCount = inquiries.filter((inq) => inq.status === 'new').length;
  const contactedCount = inquiries.filter((inq) => inq.status === 'contacted').length;
  const interestedCount = inquiries.filter((inq) => inq.status === 'interested').length;
  const closedCount = inquiries.filter((inq) => inq.status === 'closed').length;

  // Calculate conversion rate
  const conversionRate = totalInquiries > 0 ? Math.round((closedCount / totalInquiries) * 100) : 0;

  // Get recent inquiries (last 5)
  const recentInquiries = inquiries.slice(0, 5);

  // Get inquiry types distribution
  const typeCounts = inquiries.reduce(
    (acc, inq) => {
      acc[inq.inquiry_type] = (acc[inq.inquiry_type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Get top 3 inquiry types
  const topTypes = Object.entries(typeCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const filteredInquiries = selectedStatus
    ? inquiries.filter((inq) => inq.status === selectedStatus)
    : inquiries;

  return (
    <>
      <AdminNavbar />
      <div className="admin-dashboard-wrapper">
      {/* Page Header */}
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Dashboard</h1>
        <p className="admin-dashboard-subtitle">Manage and track coaching inquiries</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="admin-metrics-grid">
        {/* Total Inquiries Card */}
        <div className="admin-metric-card">
          <div className="admin-metric-header">
            <h3 className="admin-metric-label">Total Inquiries</h3>
            <span className="admin-metric-icon">📊</span>
          </div>
          <div className="admin-metric-value">{totalInquiries}</div>
          <p className="admin-metric-trend">All inquiries</p>
        </div>

        {/* New Inquiries Card */}
        <div className="admin-metric-card admin-metric-card--new">
          <div className="admin-metric-header">
            <h3 className="admin-metric-label">New</h3>
            <span className="admin-metric-icon">🆕</span>
          </div>
          <div className="admin-metric-value">{newCount}</div>
          <p className="admin-metric-trend">Awaiting contact</p>
        </div>

        {/* Contacted Card */}
        <div className="admin-metric-card admin-metric-card--contacted">
          <div className="admin-metric-header">
            <h3 className="admin-metric-label">Contacted</h3>
            <span className="admin-metric-icon">📞</span>
          </div>
          <div className="admin-metric-value">{contactedCount}</div>
          <p className="admin-metric-trend">In progress</p>
        </div>

        {/* Interested Card */}
        <div className="admin-metric-card admin-metric-card--interested">
          <div className="admin-metric-header">
            <h3 className="admin-metric-label">Interested</h3>
            <span className="admin-metric-icon">💚</span>
          </div>
          <div className="admin-metric-value">{interestedCount}</div>
          <p className="admin-metric-trend">Qualified leads</p>
        </div>

        {/* Conversion Rate Card */}
        <div className="admin-metric-card admin-metric-card--conversion">
          <div className="admin-metric-header">
            <h3 className="admin-metric-label">Conversion Rate</h3>
            <span className="admin-metric-icon">🎯</span>
          </div>
          <div className="admin-metric-value">{conversionRate}%</div>
          <p className="admin-metric-trend">{closedCount} closed</p>
        </div>

        {/* Response Rate Card */}
        <div className="admin-metric-card admin-metric-card--response">
          <div className="admin-metric-header">
            <h3 className="admin-metric-label">Response Rate</h3>
            <span className="admin-metric-icon">✅</span>
          </div>
          <div className="admin-metric-value">
            {totalInquiries > 0 ? Math.round(((totalInquiries - newCount) / totalInquiries) * 100) : 0}%
          </div>
          <p className="admin-metric-trend">{totalInquiries - newCount} responded</p>
        </div>
      </div>

      {/* Inquiry Types & Recent Activity */}
      <div className="admin-dashboard-grid-2">
        {/* Top Inquiry Types */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Top Inquiry Types</h2>
          </div>
          <div className="admin-card-content">
            {topTypes.length > 0 ? (
              <div className="admin-type-list">
                {topTypes.map(([type, count]) => (
                  <div key={type} className="admin-type-item">
                    <span className="admin-type-name">{type}</span>
                    <div className="admin-type-bar-container">
                      <div
                        className="admin-type-bar"
                        style={{
                          width: `${(count / Math.max(...topTypes.map(([, c]) => c))) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="admin-type-count">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="admin-empty-state">No inquiry types yet</p>
            )}
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Status Breakdown</h2>
          </div>
          <div className="admin-card-content">
            <div className="admin-status-breakdown">
              <div className="admin-status-item">
                <div className="admin-status-label">
                  <span className="admin-status-dot admin-status-dot--new" />
                  <span>New</span>
                </div>
                <span className="admin-status-percentage">{newCount}</span>
              </div>
              <div className="admin-status-item">
                <div className="admin-status-label">
                  <span className="admin-status-dot admin-status-dot--contacted" />
                  <span>Contacted</span>
                </div>
                <span className="admin-status-percentage">{contactedCount}</span>
              </div>
              <div className="admin-status-item">
                <div className="admin-status-label">
                  <span className="admin-status-dot admin-status-dot--interested" />
                  <span>Interested</span>
                </div>
                <span className="admin-status-percentage">{interestedCount}</span>
              </div>
              <div className="admin-status-item">
                <div className="admin-status-label">
                  <span className="admin-status-dot admin-status-dot--closed" />
                  <span>Closed</span>
                </div>
                <span className="admin-status-percentage">{closedCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiries List Section */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">All Inquiries</h2>
          <p className="admin-card-subtitle">Showing {filteredInquiries.length} inquiries</p>
        </div>

        {/* Status Filters */}
        <div className="admin-card-filters">
          <button
            onClick={() => setSelectedStatus(null)}
            className={`admin-filter-btn ${selectedStatus === null ? 'admin-filter-btn--active' : ''}`}
          >
            All ({totalInquiries})
          </button>
          {['new', 'contacted', 'interested', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`admin-filter-btn ${selectedStatus === status ? 'admin-filter-btn--active' : ''}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} (
              {inquiries.filter((inq) => inq.status === status).length})
            </button>
          ))}
        </div>

        {/* Inquiries Table */}
        <div className="admin-card-content">
          {filteredInquiries.length === 0 ? (
            <div className="admin-empty-state">No inquiries found.</div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr className="admin-table-header-row">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="admin-table-row">
                      <td className="admin-table-cell-name">{inquiry.name}</td>
                      <td className="admin-table-cell-email">{inquiry.email}</td>
                      <td className="admin-table-cell-type">
                        <span className="admin-inquiry-type-badge">{inquiry.inquiry_type}</span>
                      </td>
                      <td className="admin-table-cell-status">
                        <select
                          value={inquiry.status}
                          onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                          className="admin-status-select"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="interested">Interested</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="admin-table-cell-date">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </td>
                      <td className="admin-table-cell-actions">
                        <button
                          onClick={() => setModalInquiry(inquiry)}
                          className="admin-btn-view"
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="admin-btn-delete"
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

      {/* Detail Modal */}
      {modalInquiry && (
        <div className="admin-modal-overlay" onClick={() => setModalInquiry(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">Inquiry from {modalInquiry.name}</h2>
              <button
                onClick={() => setModalInquiry(null)}
                className="admin-modal-close"
              >
                ✕
              </button>
            </div>
            <div className="admin-modal-content">
              <div className="admin-modal-field">
                <p className="admin-modal-label">Email</p>
                <p className="admin-modal-value">{modalInquiry.email}</p>
              </div>
              {modalInquiry.phone && (
                <div className="admin-modal-field">
                  <p className="admin-modal-label">Phone</p>
                  <p className="admin-modal-value">{modalInquiry.phone}</p>
                </div>
              )}
              {modalInquiry.company && (
                <div className="admin-modal-field">
                  <p className="admin-modal-label">Company</p>
                  <p className="admin-modal-value">{modalInquiry.company}</p>
                </div>
              )}
              {modalInquiry.budget && (
                <div className="admin-modal-field">
                  <p className="admin-modal-label">Budget</p>
                  <p className="admin-modal-value">{modalInquiry.budget}</p>
                </div>
              )}
              {modalInquiry.timeline && (
                <div className="admin-modal-field">
                  <p className="admin-modal-label">Timeline</p>
                  <p className="admin-modal-value">{modalInquiry.timeline}</p>
                </div>
              )}
              <div className="admin-modal-field">
                <p className="admin-modal-label">Message</p>
                <p className="admin-modal-value admin-modal-message">{modalInquiry.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
