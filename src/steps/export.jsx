export default function Export({ alumni, onBackReview }) {
  const total    = alumni.length
  const approved = alumni.filter(a => a.status === 'approved').length
  const flagged  = alumni.filter(a => a.status === 'rejected').length
  const pending  = alumni.filter(a => a.status === 'pending').length

  const stats = [
    { value: approved, label: 'Matches confirmed',    color: '#3f7d5b' },
    { value: flagged,  label: 'Flagged for follow-up', color: '#a8443f' },
    { value: pending,  label: 'Still pending',          color: '#9a6a1f' },
    { value: Math.round((approved / total) * 100) + '%', label: 'Roster enriched', color: '#21283b' },
  ]

  const rows = alumni.map(a => {
    const sel = a.candidates[a.selected]
    const st  = a.status === 'approved'
      ? { t: 'Confirmed', bg: '#e6f0ea', c: '#3f7d5b' }
      : a.status === 'rejected'
      ? { t: 'Flagged',   bg: '#f6e6e5', c: '#a8443f' }
      : { t: 'Pending',   bg: '#f5ecda', c: '#9a6a1f' }
    return {
      name:     a.name,
      year:     String(a.year),
      url:      a.status === 'rejected' ? '—' : sel.url,
      title:    a.status === 'rejected' ? '—' : a.editTitle,
      employer: a.status === 'rejected' ? '—' : (a.editEmployer || '—'),
      status: st,
    }
  })

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '40px 32px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', animation: 'fadein .35s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontFamily: "'Newsreader', serif", fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#b08d4f', marginBottom: 10 }}>
            Enrichment complete
          </div>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontSize: 32, fontWeight: 500 }}>
            Your enriched roster is ready
          </h1>
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
          {stats.map(s => (
            <div key={s.label} style={{ flex: 1, background: '#fff', border: '1px solid #e6e1d6', borderRadius: 7, padding: 22 }}>
              <div style={{ fontFamily: "'Newsreader', serif", fontSize: 30, fontWeight: 600, color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: '#8a8475', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e6e1d6', borderRadius: 7, overflow: 'hidden', marginBottom: 24 }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #eee7d9', background: '#fbfaf6', fontSize: 13, fontWeight: 600 }}>
            Final enriched data — preview
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, whiteSpace: 'nowrap' }}>
              <thead>
                <tr style={{ textAlign: 'left', color: '#8a8475', background: '#fdfcf9' }}>
                  {['Full Name', 'Year', 'LinkedIn URL', 'Title', 'Employer', 'Status'].map(h => (
                    <th key={h} style={{ padding: '11px 16px', fontWeight: 600, fontSize: 10.5, letterSpacing: '.5px', textTransform: 'uppercase' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #f0ebdf' }}>
                    <td style={{ padding: '10px 16px', fontWeight: 500 }}>{r.name}</td>
                    <td style={{ padding: '10px 16px', color: '#5c5749' }}>{r.year}</td>
                    <td style={{ padding: '10px 16px', color: '#2563a8' }}>{r.url}</td>
                    <td style={{ padding: '10px 16px', color: '#5c5749' }}>{r.title}</td>
                    <td style={{ padding: '10px 16px', color: '#5c5749' }}>{r.employer}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99,
                        background: r.status.bg, color: r.status.c,
                      }}>
                        {r.status.t}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onBackReview} style={{
            background: 'none', border: 'none', color: '#8a8475', fontSize: 13,
            cursor: 'pointer', textDecoration: 'underline',
          }}>
            ← Back to review queue
          </button>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-crm">Push to CRM</button>
            <button className="btn-primary">↓ Download enriched CSV</button>
          </div>
        </div>
      </div>
    </div>
  )
}