import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EMOJIS } from '../../lib/constants';
import ModalOverlay from './ModalOverlay';

const CATEGORIES = [
  'Web App', 'Mobile App', 'API & Backend', 'Data & Analytics',
  'AI & ML', 'DevOps & Tools', 'Security', 'Automation', 'Internal Tools',
];

const defaultForm = {
  emoji: '🚀', name: '', team: '', tagline: '', description: '',
  category: '', status: 'live', url: '', members: '', tech: '',
};

export default function SubmitModal({ onSubmit }) {
  const { closeModal, showToast } = useApp();
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.name || !form.tagline || !form.description || !form.category) {
      showToast('⚠️ Lengkapi field yang wajib diisi!');
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit({
        emoji: form.emoji,
        name: form.name.trim(),
        tagline: form.tagline.trim(),
        description: form.description.trim(),
        category: form.category,
        status: form.status,
        team: form.team.trim() || 'IT Team',
        url: form.url.trim() || null,
        featured: false,
        members: form.members ? form.members.split(',').map(m => m.trim()).filter(Boolean) : ['Sigit H.'],
        tech: form.tech ? form.tech.split(',').map(t => t.trim()).filter(Boolean) : [],
        tags: [form.category.toLowerCase().replace(/[& ]+/g, '-'), form.status],
      });
      setForm(defaultForm);
      closeModal();
      showToast('🎉 Project berhasil di-submit!');
    } catch {
      showToast('❌ Gagal submit project. Coba lagi.');
    }
    setSubmitting(false);
  }

  return (
    <ModalOverlay modalId="submit">
      <div className="modal-header">
        <div>
          <div className="modal-title">🚀 Submit Project</div>
          <div className="modal-sub">Bagikan project keren yang kamu buat ke seluruh tim</div>
        </div>
        <button className="modal-close" onClick={closeModal}>×</button>
      </div>

      <div className="modal-body">
        <div className="form-group">
          <label className="form-label">Pilih Icon Project</label>
          <div className="emoji-picker-row">
            {EMOJIS.map(e => (
              <div
                key={e}
                className={`emoji-opt${form.emoji === e ? ' selected' : ''}`}
                onClick={() => set('emoji', e)}
              >
                {e}
              </div>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nama Project <span>*</span></label>
            <input className="form-input" type="text" placeholder="e.g. HR Portal v2"
              value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Divisi / Tim</label>
            <input className="form-input" type="text" placeholder="e.g. IT Infrastructure"
              value={form.team} onChange={e => set('team', e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tagline <span>*</span></label>
          <input className="form-input" type="text" maxLength={100}
            placeholder="Satu kalimat singkat tentang project ini..."
            value={form.tagline} onChange={e => set('tagline', e.target.value)} />
          <div className="form-hint">Maksimal 100 karakter</div>
        </div>

        <div className="form-group">
          <label className="form-label">Deskripsi Lengkap <span>*</span></label>
          <textarea className="form-textarea"
            placeholder="Ceritakan tentang project ini: latar belakang, fitur utama, dampak, dan teknologi..."
            value={form.description} onChange={e => set('description', e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Kategori <span>*</span></label>
            <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="">Pilih Kategori...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="live">🟢 Live / Production</option>
              <option value="beta">🟡 Beta / Testing</option>
              <option value="dev">🔵 In Development</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">URL Project / Demo</label>
            <input className="form-input" type="url" placeholder="https://..."
              value={form.url} onChange={e => set('url', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Anggota Tim</label>
            <input className="form-input" type="text" placeholder="Nama1, Nama2, Nama3"
              value={form.members} onChange={e => set('members', e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Tech Stack / Teknologi</label>
          <input className="form-input" type="text" placeholder="e.g. React, Node.js, PostgreSQL, Docker"
            value={form.tech} onChange={e => set('tech', e.target.value)} />
          <div className="form-hint">Pisahkan dengan koma</div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn btn-ghost btn-lg" onClick={closeModal} disabled={submitting}>Batal</button>
        <button className="btn btn-primary btn-lg" onClick={handleSubmit} disabled={submitting}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          {submitting ? 'Menyimpan...' : 'Submit Project'}
        </button>
      </div>
    </ModalOverlay>
  );
}
