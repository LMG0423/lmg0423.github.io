export default function Enriching({ progress }) {
  const found = Math.round(1284 * progress / 100)
  const status = progress < 35 ? 'Searching LinkedIn…' : progress < 70 ? 'Verifying profile matches…' : progress < 100 ? 'Extracting titles & employers…' : 'Finalizing results'
  const stats = [
    {value:found.toLocaleString(),label:'PROFILES FOUND'},
    {value:Math.round(found*.72).toLocaleString(),label:'HIGH CONFIDENCE'},
    {value:Math.round(found*.28).toLocaleString(),label:'NEED REVIEW'},
  ]
  return (
    <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:48}}>
      <div style={{width:560,textAlign:'center',animation:'fadein .4s ease'}}>
        <div style={{fontFamily:"'Newsreader',serif",fontSize:13,letterSpacing:2,textTransform:'uppercase',color:'#b08d4f',marginBottom:14}}>Enriching</div>
        <h1 style={{fontFamily:"'Newsreader',serif",fontSize:30,fontWeight:500,marginBottom:8}}>{status}</h1>
        <p style={{fontSize:14,color:'#6f6a5e',marginBottom:30}}>Cross-referencing names, locations and graduation years against public profiles.</p>
        <div style={{height:8,background:'#e6e1d6',borderRadius:99,overflow:'hidden',position:'relative'}}>
          <div style={{height:'100%',width:`${progress}%`,background:'#7b2c39',borderRadius:99,transition:'width .12s linear',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',inset:0,width:'40%',background:'linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)',animation:'barshine 1.1s infinite'}} />
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:12,fontSize:13,color:'#8a8475'}}>
          <span>{Math.round(progress)}% complete</span>
          <span>{found.toLocaleString()} of 1,284 processed</span>
        </div>
        <div style={{display:'flex',gap:14,marginTop:36,justifyContent:'center'}}>
          {stats.map(s=>(
            <div key={s.label} style={{flex:1,background:'#fff',border:'1px solid #e6e1d6',borderRadius:6,padding:18}}>
              <div style={{fontFamily:"'Newsreader',serif",fontSize:26,fontWeight:600,color:'#21283b'}}>{s.value}</div>
              <div style={{fontSize:11.5,color:'#8a8475',letterSpacing:'.4px',marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}