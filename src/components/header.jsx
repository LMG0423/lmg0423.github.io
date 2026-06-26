export default function Header({ batchName }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', height: 64, background: '#21283b', color: '#f6f4ee', flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 30, height: 30, border: '1.5px solid #b08d4f', borderRadius: 3,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Newsreader', serif", fontSize: 17, color: '#b08d4f', fontWeight: 600,
        }}>A</div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span style={{ fontFamily: "'Newsreader', serif", fontSize: 19, letterSpacing: '.2px' }}>
            Alumni Connect
          </span>
          <span style={{ fontSize: 10.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#b08d4f' }}>
            Advancement Office
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 13, color: '#b9bccb' }}>
        <span>Enrichment batch · {batchName}</span>
        <div style={{
          width: 30, height: 30, borderRadius: '50%', background: '#39435c',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600, color: '#f6f4ee',
        }}>EM</div>
      </div>
    </header>
  )
}