cat > src/steps/Review.jsx << 'EOF'
import { confMeta, avatarBg, initialsOf } from '../data'

function QueueRail({ alumni, idx, onJump, approvedCount, flaggedCount, pendingCount, reviewedCount, totalCount, onGoExport }) {
  return (
    <aside style={{width:288,flexShrink:0,background:'#fbfaf6',borderRight:'1px solid #e6e1d6',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'18px 20px 14px',borderBottom:'1px solid #eee7d9'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10}}>
          <span style={{fontSize:13,fontWeight:600}}>Review queue</span>
          <span style={{fontSize:12,color:'#8a8475'}}>{reviewedCount}/{totalCount}</span>
        </div>
        <div style={{height:5,background:'#e6e1d6',borderRadius:99,overflow:'hidden'}}>
          <div style={{height:'100%',width:`${Math.round(reviewedCount/totalCount*100)}%`,background:'#3f7d5b',borderRadius:99,transition:'width .3s'}} />
        </div>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          {[['#3f7d5b',approvedCount,'Confirmed'],['#a8443f',flaggedCount,'Flagged'],['#6f6a5e',pendingCount,'Pending']].map(([color,val,label])=>(
            <div key={label} style={{flex:1,textAlign:'center'}}>
              <div style={{fontSize:15,fontWeight:700,color}}>{val}</div>
              <div style={{fontSize:10,color:'#8a8475',textTransform:'uppercase',letterSpacing:'.4px'}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflowY:'auto'}}>
        {alumni.map((a,i)=>{
          const cm=confMeta(a.candidates[a.selected].conf)
          const dot=a.status==='approved'?'#3f7d5b':a.status==='rejected'?'#a8443f':'#cfc7b4'
          const isActive=i===idx
          return (
            <div key={a.id} className="rail-item" onClick={()=>onJump(i)} style={{background:isActive?'#f1ebdd':'transparent',borderLeft:`3px solid ${isActive?'#7b2c39':'transparent'}`}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:dot,flexShrink:0}} />
              <div style={{minWidth:0,flex:1}}>
                <div style={{fontSize:13,fontWeight:isActive?700:500,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{a.name}</div>
                <div style={{fontSize:11.5,color:'#8a8475',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{a.aff} · {a.year}</div>
              </div>
              <div style={{fontSize:10.5,fontWeight:600,color:cm.color,flexShrink:0}}>{cm.short}</div>
            </div>
          )
        })}
      </div>
      <button className="btn-export-rail" onClick={onGoExport}>Finish &amp; export →</button>
    </aside>
  )
}

function RecordDetail({ alumni, idx, onUpdateAlumnus, onApprove, onReject, onSkip, onPrev, onNext }) {
  const a=alumni[idx]
  if(!a) return null
  const sel=a.candidates[a.selected]
  const cm=confMeta(sel.conf)
  const total=alumni.length
  return (
    <main style={{flex:1,overflowY:'auto',padding:'28px 36px'}}>
      <div style={{maxWidth:920,margin:'0 auto',animation:'fadein .25s ease'}} key={idx}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
          <div style={{fontSize:12,color:'#8a8475',letterSpacing:'.4px'}}>RECORD {idx+1} OF {total}</div>
          <div style={{display:'flex',gap:6}}>
            <button className="nav-btn" onClick={onPrev}>←</button>
            <button className="nav-btn" onClick={onNext}>→</button>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:22}}>
          <div style={{background:'#fff',border:'1px solid #e6e1d6',borderRadius:7,padding:22}}>
            <div style={{fontSize:11,letterSpacing:1,textTransform:'uppercase',color:'#8a8475',marginBottom:16}}>On file · institutional record</div>
            <h2 style={{fontFamily:"'Newsreader',serif",fontSize:25,fontWeight:600,marginBottom:18}}>{a.name}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:13}}>
              {[['State',a.state],['Degree affiliate',a.aff],['Degree year',String(a.year)]].map(([label,val])=>(
                <div key={label} style={{display:'flex',justifyContent:'space-between',fontSize:13.5}}>
                  <span style={{color:'#8a8475'}}>{label}</span>
                  <span style={{fontWeight:500,textAlign:'right'}}>{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'#fff',border:'1px solid #e6e1d6',borderRadius:7,padding:22}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <span style={{fontSize:11,letterSpacing:1,textTransform:'uppercase',color:'#8a8475'}}>Found on LinkedIn</span>
              <span style={{fontSize:11.5,fontWeight:700,padding:'3px 9px',borderRadius:99,background:cm.bg,color:cm.color}}>{cm.label}</span>
            </div>
            <div style={{display:'flex',gap:14,alignItems:'center',marginBottom:14}}>
              <div style={{width:54,height:54,borderRadius:'50%',background:avatarBg(idx),color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,fontWeight:600,flexShrink:0}}>{initialsOf(sel.name)}</div>
              <div style={{minWidth:0}}>
                <div style={{fontSize:16,fontWeight:600}}>{sel.name}</div>
                <div style={{fontSize:12.5,color:'#6f6a5e',lineHeight:1.35}}>{sel.headline}</div>
              </div>
            </div>
            <a href="#" onClick={e=>e.preventDefault()} style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:12.5,color:'#2563a8',textDecoration:'none',fontWeight:500}}>{sel.url} ↗</a>
            <div style={{fontSize:12,color:'#8a8475',marginTop:12,lineHeight:1.4}}>{sel.reason}</div>
          </div>
        </div>
        {a.candidates.length>1&&(
          <div style={{marginBottom:22}}>
            <div style={{fontSize:12,color:'#8a8475',marginBottom:10}}>This match is ambiguous — choose the correct profile:</div>
            <div style={{display:'flex',gap:12}}>
              {a.candidates.map((cand,ci)=>{
                const cm2=confMeta(cand.conf)
                return (
                  <div key={ci} className="candidate-card" onClick={()=>onUpdateAlumnus(idx,{selected:ci,editTitle:cand.title,editEmployer:cand.employer})} style={{border:`1.5px solid ${ci===a.selected?'#7b2c39':'#e6e1d6'}`}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                      <div style={{display:'flex',alignItems:'center',gap:9}}>
                        <div style={{width:34,height:34,borderRadius:'50%',background:avatarBg(idx+ci),color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600}}>{initialsOf(cand.name)}</div>
                        <div style={{fontSize:13.5,fontWeight:600}}>{cand.name}</div>
                      </div>
                      <span style={{fontSize:11,fontWeight:700,color:cm2.color}}>{cand.conf}%</span>
                    </div>
                    <div style={{fontSize:12,color:'#6f6a5e',lineHeight:1.35}}>{cand.headline}</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <div style={{background:'#fff',border:'1px solid #e6e1d6',borderRadius:7,padding:22,marginBottom:22}}>
          <div style={{fontSize:11,letterSpacing:1,textTransform:'uppercase',color:'#8a8475',marginBottom:16}}>Confirm what we'll write back</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18}}>
            <div>
              <label style={{display:'block',fontSize:12.5,fontWeight:600,marginBottom:6}}>Current title</label>
              <input className="field-input" value={a.editTitle} onChange={e=>onUpdateAlumnus(idx,{editTitle:e.target.value})} />
            </div>
            <div>
              <label style={{display:'block',fontSize:12.5,fontWeight:600,marginBottom:6}}>Current employer</label>
              <input className="field-input" value={a.editEmployer} onChange={e=>onUpdateAlumnus(idx,{editEmployer:e.target.value})} />
            </div>
          </div>
          <div style={{marginTop:14,display:'flex',alignItems:'center',gap:8,fontSize:12,color:'#8a8475'}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'#b08d4f',display:'inline-block'}} />
            Verified LinkedIn URL: <span style={{color:'#21283b',fontWeight:500}}>{sel.url}</span>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingBottom:20}}>
          <button className="btn-danger" onClick={onReject}>Flag — no good match</button>
          <div style={{display:'flex',gap:10}}>
            <button className="btn-secondary" onClick={onSkip}>Skip for now</button>
            <button className="btn-confirm" onClick={onApprove}>✓ Confirm match</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function Review({ alumni, idx, onSetIdx, onUpdateAlumnus, onGoExport, onApprove, onReject, onSkip }) {
  const approved=alumni.filter(a=>a.status==='approved').length
  const flagged=alumni.filter(a=>a.status==='rejected').length
  const pending=alumni.filter(a=>a.status==='pending').length
  const hasCurrent=idx>=0&&idx<alumni.length
  return (
    <div style={{flex:1,display:'flex',minHeight:0}}>
      <QueueRail alumni={alumni} idx={idx} onJump={onSetIdx} approvedCount={approved} flaggedCount={flagged} pendingCount={pending} reviewedCount={approved+flagged} totalCount={alumni.length} onGoExport={onGoExport} />
      {hasCurrent&&<RecordDetail alumni={alumni} idx={idx} onUpdateAlumnus={onUpdateAlumnus} onApprove={onApprove} onReject={onReject} onSkip={onSkip} onPrev={()=>onSetIdx((idx-1+alumni.length)%alumni.length)} onNext={()=>onSetIdx((idx+1)%alumni.length)} />}
      {!hasCurrent&&(
        <main style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:48}}>
          <div style={{textAlign:'center',maxWidth:420,animation:'fadein .3s ease'}}>
            <div style={{width:58,height:58,borderRadius:'50%',background:'#3f7d5b',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,margin:'0 auto 18px'}}>✓</div>
            <h2 style={{fontFamily:"'Newsreader',serif",fontSize:26,fontWeight:500,marginBottom:8}}>Queue cleared</h2>
            <p style={{fontSize:14,color:'#6f6a5e',marginBottom:24}}>Every record has been reviewed. You're ready to export the enriched roster.</p>
            <button className="btn-primary" onClick={onGoExport}>Review export →</button>
          </div>
        </main>
      )}
    </div>
  )
}
EOF