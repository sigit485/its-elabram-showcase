export default function LoadingSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="skeleton-card">
          <div className="skeleton" style={{ width: 28, height: 20, borderRadius: 4 }} />
          <div className="skeleton" style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div className="skeleton" style={{ height: 18, width: '60%' }} />
            <div className="skeleton" style={{ height: 14, width: '90%' }} />
            <div className="skeleton" style={{ height: 14, width: '40%' }} />
          </div>
          <div className="skeleton" style={{ width: 58, height: 56, borderRadius: 10 }} />
        </div>
      ))}
    </>
  );
}
