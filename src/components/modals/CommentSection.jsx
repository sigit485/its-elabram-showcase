import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { getAvatarColor, getInitials } from '../../lib/constants';
import { useApp } from '../../context/AppContext';

function formatTime(isoStr) {
  if (!isoStr) return 'Baru saja';
  const diff = Date.now() - new Date(isoStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Baru saja';
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}

export default function CommentSection({ projectId }) {
  const { showToast } = useApp();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    async function load() {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      if (data) setComments(data);
    }
    load();
  }, [projectId]);

  async function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed || !projectId) return;
    setSending(true);
    const author = 'Sigit H.';
    const { error } = await supabase.from('comments').insert([{
      project_id: projectId,
      author,
      avatar: getInitials(author),
      color: getAvatarColor(author),
      body: trimmed,
    }]);
    if (!error) {
      setText('');
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      if (data) setComments(data);
      showToast('💬 Komentar ditambahkan!');
    }
    setSending(false);
  }

  return (
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, marginTop: 8 }}>
      <div className="detail-section-title">💬 Komentar</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
        {comments.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: '16px 0' }}>
            Belum ada komentar. Jadilah yang pertama!
          </div>
        ) : (
          comments.map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 10, padding: 12, background: 'var(--bg)', borderRadius: 10 }}>
              <span
                className="author-avatar-sm"
                style={{
                  background: c.color || getAvatarColor(c.author),
                  width: 30, height: 30, fontSize: 11,
                  borderRadius: '50%',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, flexShrink: 0,
                }}
              >
                {c.avatar || getInitials(c.author)}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{c.author}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{formatTime(c.created_at)}</span>
                </div>
                <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{c.body}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <div className="avatar" style={{ width: 32, height: 32, fontSize: 11, flexShrink: 0 }}>SH</div>
        <div style={{ flex: 1, display: 'flex', gap: 8 }}>
          <input
            className="form-input"
            type="text"
            placeholder="Tulis komentar..."
            style={{ flex: 1 }}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            disabled={sending}
          />
          <button
            className="btn btn-primary"
            style={{ height: 40, borderRadius: 10, padding: '0 16px' }}
            onClick={handleSubmit}
            disabled={sending}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
