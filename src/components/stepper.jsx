export default function Stepper({ items }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '18px 32px',
      background: '#fbfaf6', borderBottom: '1px solid #e6e1d6', flexShrink: 0,
    }}>
      {items.map((st, i) => (
        <div key={st.key} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: st.opacity }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 600,
              background: st.dotBg, color: st.dotColor,
              border: `1.5px solid ${st.dotBorder}`,
            }}>
              {st.mark}
            </div>
            <span style={{ fontSize: 13, fontWeight: st.weight, color: st.labelColor }}>
              {st.label}
            </span>
          </div>
          <div style={{ width: 48, height: 1.5, background: st.connector, margin: '0 16px' }} />
        </div>
      ))}
    </div>
  )
}