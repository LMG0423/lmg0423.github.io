export default function Upload({ fileChosen, alumni, onChoose, onReset, onEnrich }) {
  return (
    <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'48px 32px'}}>
      <div style={{width:680,animation:'fadein .4s ease'}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <h1 style={{fontFamily:"'Newsreader',serif",fontSize:34,fontWeight:500,marginBottom:10}}>Enrich your alumni records</h1>
          <p style={{fontSize:15,color:'#6f6a5e',lineHeight:1.5,maxWidth:480,margin:'0 auto'}}>Upload a roster and we'll find verified LinkedIn profiles, then surface current title and employer for your team to confirm.</p>
        </div>
        {!fileChosen ? (
          <div className="upload-zone" onClick={onChoose}>
            <div style={{width:46,height:46,borderRadius:'50%',background:'#f2eee3',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
              <div style={{fontFamily:"'Newsreader',serif",fontSize:24,color:'#7b2c39'}}>↑</div>
            </div>
            <div style={{fontSize:15,fontWeight:600,marginBottom:4}}>Drop your CSV here, or click to browse</div>
            <div style={{fontSize:13,color:'#8a8475'}}>Columns expected: Full Name · State · Degree Affiliate · Degree Year</div>
          </div>
        ) : (
          <>
            <div style={{background:'#fff',border:'1px solid #e6e1d6',borderRadius:6,overflow:'hidden'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderBottom:'1px solid #eee7d9',background:'#fbfaf6'}}>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:34,height:34,borderRadius:5,background:'#7b2c39',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,letterSpacing:'.5px'}}>CSV</div>
                  <div>
                    <div style={{fontSize:14,fontWeight:600}}>alumni_roster_2026.csv</div>
                    <div style={{fontSize:12,color:'#8a8475'}}>1,284 records · 4 columns detected</div>
                  </div>
                </div>
                <div style={{fontSize:12,color:'#3f7d5b',fontWeight:600,display:'flex',alignItems:'center',gap:6}}>
                  <span style={{width:7,height:7,borderRadius:'50%',background:'#3f7d5b',display:'inline-block'}} />Ready
                </div>
              </div>
              <div style={{padding:'4px 20px 8px'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:12.5}}>
                  <thead><tr style={{textAlign:'left',color:'#8a8475'}}>
                    {['Full Name','State','Degree Affiliate','Year'].map(h=><th key={h} style={{padding:'10px 8px',fontWeight:600,fontSize:11,letterSpacing:'.5px',textTransform:'uppercase'}}>{h}</th>)}
                  </tr></thead>
                  <tbody>{alumni.slice(0,4).map((r,i)=>(
                    <tr key={i} style={{borderTop:'1px solid #f0ebdf'}}>
                      <td style={{padding:'9px 8px',fontWeight:500}}>{r.name}</td>
                      <td style={{padding:'9px 8px',color:'#5c5749'}}>{r.state}</td>
                      <td style={{padding:'9px 8px',color:'#5c5749'}}>{r.aff}</td>
                      <td style={{padding:'9px 8px',color:'#5c5749'}}>{r.year}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:20}}>
              <button onClick={onReset} style={{background:'none',border:'none',color:'#8a8475',fontSize:13,cursor:'pointer',textDecoration:'underline'}}>Choose a different file</button>
              <button className="btn-primary" onClick={onEnrich}>Begin enrichment →</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}