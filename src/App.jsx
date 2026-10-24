import {useState,useMemo} from "react";
const inr=n=>"₹"+n.toLocaleString("en-IN");
const COL=["#1E3A5F","#0F9D8A","#C8963E","#7C5C8F","#2F6FA8","#4C8C5A"];
const COMM=[
{id:1,n:"Pune Tech Circle",c:"Technology",city:"Pune",pin:"411045",m:1840,mode:"Hybrid",fee:0,ev:"Rust Night · 8 Nov",d:"Engineers, founders and students sharing talks, code reviews and hack nights."},
{id:2,n:"Women in Business India",c:"Business",city:"Mumbai",pin:"400051",m:3120,mode:"Online",fee:999,ev:"Pricing Workshop · 12 Nov",d:"A network for women founders and operators to learn, hire and invest in each other."},
{id:3,n:"Weekend Trekkers Pune",c:"Travel",city:"Pune",pin:"411004",m:2260,mode:"Offline",fee:0,ev:"Rajmachi Trek · 9 Nov",d:"Beginner-friendly Sahyadri treks every weekend with experienced leads."},
{id:4,n:"Designers Collective",c:"Art",city:"Bengaluru",pin:"560034",m:980,mode:"Hybrid",fee:499,ev:"Portfolio Clinic · 15 Nov",d:"Product and visual designers trading critique, jobs and craft."},
{id:5,n:"Founders & Freelancers Network",c:"Business",city:"Nagpur",pin:"440010",m:640,mode:"Offline",fee:0,ev:"Coffee & Contracts · 10 Nov",d:"Nagpur’s independent professionals meeting monthly to swap leads and advice."},
{id:6,n:"Community Fitness Club",c:"Fitness",city:"Delhi",pin:"110016",m:1510,mode:"Offline",fee:299,ev:"Sunday Run · 8 Nov",d:"Group runs, yoga and strength sessions in Delhi’s parks."}];
const EVENTS=[
{id:1,t:"Rust Night",cm:1,date:"8 Nov",time:"6:30 PM",venue:"Baner, Pune",fee:0,seats:42},
{id:2,t:"Pricing Workshop",cm:2,date:"12 Nov",time:"11:00 AM",venue:"Online (Meet)",fee:750,seats:18},
{id:3,t:"Rajmachi Trek",cm:3,date:"9 Nov",time:"5:00 AM",venue:"Lonavala base camp",fee:600,seats:9},
{id:4,t:"Coffee & Contracts",cm:5,date:"10 Nov",time:"10:00 AM",venue:"Dharampeth, Nagpur",fee:0,seats:25}];
const MEM0=[
{id:1,n:"Aarav Sharma",e:"aarav@mail.in",st:"Active",att:92,pay:"Paid"},
{id:2,n:"Priya Deshmukh",e:"priya@mail.in",st:"Pending",att:0,pay:"Due"},
{id:3,n:"Rohan Iyer",e:"rohan@mail.in",st:"Active",att:74,pay:"Paid"},
{id:4,n:"Sneha Patil",e:"sneha@mail.in",st:"Pending",att:0,pay:"Due"},
{id:5,n:"Kabir Singh",e:"kabir@mail.in",st:"Suspended",att:38,pay:"Overdue"}];
const PAY=[
{id:"TXN48211",w:"Designers Collective",ty:"Membership",a:499,dt:"2 Oct",me:"UPI",s:"Successful"},
{id:"TXN47990",w:"Pricing Workshop",ty:"Event ticket",a:750,dt:"21 Sep",me:"Card",s:"Pending"},
{id:"TXN47102",w:"Rajmachi Trek",ty:"Event ticket",a:600,dt:"4 Sep",me:"Net Banking",s:"Refunded"},
{id:"TXN46550",w:"Community Fitness Club",ty:"Membership",a:299,dt:"28 Aug",me:"UPI",s:"Failed"}];
const NOT0=[{id:1,c:"Events",t:"Rust Night opens check-in at 6:00 PM",u:true},{id:2,c:"Membership",t:"Pune Tech Circle approved your request",u:true},{id:3,c:"Payments",t:"Payment of ₹750 is pending",u:false}];
const GROW=[120,180,260,310,420,520],MON=["May","Jun","Jul","Aug","Sep","Oct"];
const stCls=s=>({Successful:"ok",Active:"ok",Paid:"ok",Verified:"ok",Pending:"wa",Due:"wa",Refunded:"t",Suspended:"er",Failed:"er",Overdue:"er"}[s]||"");
const Tag=({s,c})=><span className={"tag "+(c||stCls(s))}>{s}</span>;
const Av=({i,n})=><div className="av" style={{background:COL[i%6]}} aria-hidden="true">{n[0]}</div>;
function Bars({data,labels,h=130}){const mx=Math.max(...data);return <div role="img" aria-label="Bar chart" style={{display:"flex",gap:8,alignItems:"flex-end",height:h}}>{data.map((v,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end",height:"100%",alignItems:"stretch"}} title={labels[i]+": "+v}><div className="bar" style={{height:(v/mx*(h-30))+"px"}}/><div className="mut" style={{textAlign:"center",fontSize:11}}>{labels[i]}</div></div>)}</div>}
function Line({data}){const mx=Math.max(...data),pts=data.map((v,i)=>`${i*(300/(data.length-1))+10},${110-v/mx*95}`).join(" ");return <svg viewBox="0 0 320 120" role="img" aria-label="Member growth line chart" style={{width:"100%"}}><polyline points={pts} fill="none" stroke="#1E3A5F" strokeWidth="3" strokeLinejoin="round"/>{data.map((v,i)=><circle key={i} cx={i*(300/(data.length-1))+10} cy={110-v/mx*95} r="4" fill="#fff" stroke="#1E3A5F" strokeWidth="2"/>)}</svg>}
const Stat=({l,v,s})=><div className="card"><div className="mut">{l}</div><div className="big">{v}</div><div className="mut">{s}</div></div>;
const MOT={Technology:<path d="M120 30l-24 18 24 18M180 30l24 18-24 18M163 22l-26 52"/>,Business:<path d="M110 70V50M140 70V36M170 70V44M200 70V24"/>,Travel:<g><path d="M70 76l50-42 32 28 24-18 54 32"/><circle cx="215" cy="26" r="9"/></g>,Art:<g><circle cx="130" cy="48" r="22"/><circle cx="170" cy="48" r="22"/></g>,Fitness:<path d="M110 48h80M118 30v36M182 30v36M102 40v16M198 40v16"/>};
const Cv=({c})=>{const a=COL[c.id%6],b=COL[(c.id+2)%6];return <svg viewBox="0 0 300 92" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}><defs><linearGradient id={"g"+c.id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a}/><stop offset="1" stopColor={b}/></linearGradient></defs><rect width="300" height="92" fill={"url(#g"+c.id+")"}/><circle cx="250" cy="10" r="50" fill="#fff2"/><circle cx="40" cy="95" r="40" fill="#fff2"/><g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity=".85">{MOT[c.c]||MOT.Technology}</g></svg>};
function CCard({c,state,onJoin,onOpen}){return <article className="card"><div className="cover" style={{position:"relative",padding:0,overflow:"hidden",height:110}}><Cv c={c}/><div style={{position:"absolute",left:10,bottom:10}}><Av i={c.id} n={c.n}/></div></div>
<h3><button className="logo" style={{fontSize:16,padding:0,textAlign:"left"}} onClick={()=>onOpen(c.id)}>{c.n}</button></h3>
<div className="mut">{c.city} {c.pin} · {c.m.toLocaleString("en-IN")} members</div>
<p className="mut" style={{margin:"8px 0"}}>{c.d}</p>
<div><Tag s={c.c} c=""/><Tag s={c.mode} c="t"/><Tag s={c.fee?inr(c.fee)+"/yr":"Free"} c={c.fee?"wa":"ok"}/></div>
<div className="mut" style={{margin:"8px 0 12px"}}>Next: {c.ev}</div>
<button className={"btn "+(state?"":"p")} disabled={state==="Member"||state==="Pending"} onClick={()=>onJoin(c)}>{state==="Member"?"Member":state==="Pending"?"Request pending":c.fee?"Request to join":"Join community"}</button></article>}

function Discover({st,join,open}){
const [q,setQ]=useState(""),[city,setCity]=useState(""),[mode,setMode]=useState(""),[fee,setFee]=useState(""),[sort,setSort]=useState("m");
const list=useMemo(()=>COMM.filter(c=>(c.n+c.d+c.c).toLowerCase().includes(q.toLowerCase())&&(!city||c.city===city)&&(!mode||c.mode===mode)&&(!fee||(fee==="Free")===!c.fee)).sort((a,b)=>sort==="m"?b.m-a.m:a.n.localeCompare(b.n)),[q,city,mode,fee,sort]);
return <div><h2>Find a community that feels like yours</h2><p className="mut">Search by topic, then narrow by city, mode and fee.</p>
<div className="row" style={{flexWrap:"wrap",margin:"14px 0"}}>
<input aria-label="Search communities" placeholder="Search name or topic" value={q} onChange={e=>setQ(e.target.value)} style={{flex:"1 1 200px"}}/>
<select aria-label="City" value={city} onChange={e=>setCity(e.target.value)}><option value="">All cities</option>{[...new Set(COMM.map(c=>c.city))].map(c=><option key={c}>{c}</option>)}</select>
<select aria-label="Mode" value={mode} onChange={e=>setMode(e.target.value)}><option value="">Any mode</option>{["Online","Offline","Hybrid"].map(c=><option key={c}>{c}</option>)}</select>
<select aria-label="Fee" value={fee} onChange={e=>setFee(e.target.value)}><option value="">Free or paid</option><option>Free</option><option>Paid</option></select>
<select aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)}><option value="m">Most members</option><option value="n">Name A–Z</option></select>
<button className="btn" onClick={()=>{setQ("");setCity("");setMode("");setFee("")}}>Clear filters</button></div>
{list.length?<div className="grid g3">{list.map(c=><CCard key={c.id} c={c} state={st[c.id]} onJoin={join} onOpen={open}/>)}</div>:<div className="card" style={{textAlign:"center"}}><h3>No communities match</h3><p className="mut">Clear a filter or try a broader search term.</p></div>}</div>}

function Profile({id,st,join}){const c=COMM.find(x=>x.id===id),s=st[id]||"Not a member";
return <div><div className="cover" style={{height:150,margin:0,padding:0,overflow:"hidden",position:"relative"}}><Cv c={c}/></div>
<div className="row" style={{margin:"14px 0",flexWrap:"wrap"}}><Av i={id} n={c.n}/><div style={{flex:1}}><h2>{c.n}</h2><div className="mut">{c.city} · {c.mode} · {c.m.toLocaleString("en-IN")} members</div></div><Tag s={s} c={s==="Member"?"ok":s==="Pending"?"wa":""}/></div>
<div className="grid g2"><div className="card"><h3>About</h3><p className="mut">{c.d}</p><h3>Membership rules</h3><p className="mut">Be respectful, attend with intent, and keep promotions to the announcements channel. Fee: {c.fee?inr(c.fee)+" per year":"Free"}.</p></div>
<div className="card"><h3>Next event</h3><p>{c.ev}</p><h3>Admin</h3><p className="mut">Meera Kulkarni · verified organiser</p><button className="btn p" disabled={s==="Member"||s==="Pending"} onClick={()=>join(c)}>{s==="Member"?"You’re a member":s==="Pending"?"Request pending":c.fee?"Request to join":"Join community"}</button></div></div></div>}

const Stats=()=><div className="grid g4" style={{margin:"0 0 40px"}}>{[["1,326","Communities"],["48,210","Members"],["9,400","Events hosted"],["120","Cities reached"]].map(([v,l])=><div className="card" key={l}><div className="big">{v}</div><div className="mut">{l} (demo figures)</div></div>)}</div>;
const CATS=[["💻","Technology & Startups"],["🤝","Business & Networking"],["🏃","Fitness & Wellness"],["🎨","Art & Creativity"],["📚","Education & Learning"],["🏔️","Travel & Adventure"],["🌱","Social Impact"],["🏘️","Local Neighbourhoods"]];
const Cats=({go})=><div style={{margin:"0 0 40px"}}><h2>Browse by interest</h2><div className="grid g4" style={{marginTop:14}}>{CATS.map(([e,n])=><button key={n} className="card" onClick={()=>go("discover")} style={{textAlign:"left",fontWeight:700}}><span style={{fontSize:26}}>{e}</span><div>{n}</div></button>)}</div></div>;
const EvSec=()=><div style={{margin:"48px 0 0"}}><h2>Upcoming events</h2><div className="grid g4" style={{marginTop:14}}>{EVENTS.map(e=>{const [d,m]=e.date.split(" ");return <div className="card" key={e.id}><div className="row"><div style={{background:"var(--p)",color:"#fff",borderRadius:12,padding:"6px 12px",textAlign:"center",lineHeight:1.1}}><b style={{fontSize:20}}>{d}</b><div style={{fontSize:11}}>{m}</div></div><div><h3>{e.t}</h3><div className="mut">{e.time}</div></div></div><p className="mut">{e.venue}</p><Tag s={e.fee?inr(e.fee):"Free"} c={e.fee?"wa":"ok"}/><Tag s={e.seats+" seats left"} c=""/></div>})}</div></div>;
const Foot=()=><footer style={{background:"#14283F",color:"#D5E0EE",padding:"32px 0"}}><div className="wrap row" style={{flexWrap:"wrap",justifyContent:"space-between"}}><div><b style={{color:"#fff"}}>Community Connect</b><div style={{fontSize:13}}>Discover, join and run communities across India.</div></div><div className="row" style={{flexWrap:"wrap",fontSize:13}}>{["About","Guidelines","Help Center","Privacy Policy","Terms"].map(t=><span key={t}>{t}</span>)}</div></div></footer>;
const HeroArt=()=><><div className="card hide-m" style={{position:"absolute",right:0,top:-18,width:190,padding:10}}><svg viewBox="0 0 170 110" role="img" aria-label="Event location map" style={{width:"100%"}}><rect width="170" height="110" rx="10" fill="#E3EAF4"/><path d="M0 70C40 50 70 90 170 40M60 0C50 40 90 70 80 110" stroke="#fff" strokeWidth="8" fill="none"/><circle cx="95" cy="58" r="14" fill="#0F9D8A33"/><circle cx="95" cy="58" r="6" fill="#0F9D8A"/><circle cx="40" cy="30" r="5" fill="#C8963E"/></svg><div className="mut" style={{marginTop:4}}>Baner, Pune · 2.1 km</div></div><div className="card hide-m" style={{position:"absolute",right:0,bottom:0,padding:"10px 14px"}}><div className="row" style={{gap:0}}>{[0,1,2,3].map(i=><div key={i} className="av" style={{background:COL[i],width:32,height:32,marginLeft:i?-10:0,fontSize:13}}>{"APRK"[i]}</div>)}</div><div className="mut" style={{marginTop:4}}>+1,836 members</div></div></>;
function Home({go,st,join,open}){return <div>
<div><div className="wrap"><section className="hero"><div><span className="tag t">Your people. Your community.</span><h1>Find your people. Build your community.</h1>
<p className="mut" style={{fontSize:17,maxWidth:480}}>Discover communities around your interests, meet people nearby, join events and keep every member, rupee and attendance record in one place.</p>
<div className="row" style={{flexWrap:"wrap"}}><button className="btn p" onClick={()=>go("discover")}>Explore communities</button><button className="btn" onClick={()=>go("login")}>Create a community</button></div></div>
<div style={{position:"relative",minHeight:340}}><HeroArt/><div className="card float" style={{maxWidth:330,position:"relative"}}><div className="row"><Av i={1} n="Pune Tech Circle"/><div><h3>Pune Tech Circle</h3><div className="mut">1,840 members</div></div></div><p className="mut">Rust Night · Sat 8 Nov, 6:30 PM · Baner</p><Tag s="42 seats left" c="wa"/><Tag s="Free" c="ok"/></div>
<div className="card" style={{maxWidth:280,width:"85%",margin:"-10px 0 0 auto",position:"relative"}}><div className="mut">Attendance this month</div><Bars data={[40,55,48,72,90]} labels={["W1","W2","W3","W4","W5"]} h={90}/></div></div></section></div></div>
<div className="wrap" style={{paddingBottom:60}}><Stats/><Cats go={go}/><Discover st={st} join={join} open={open}/><EvSec/>
<h2 style={{marginTop:48}}>How it works</h2><div className="grid g4">{["Create your profile","Discover matching communities","Join and register for events","Connect and track growth"].map((t,i)=><div className="card" key={i}><div className="big" style={{color:COL[i]}}>{i+1}</div><h3>{t}</h3></div>)}</div>
<div className="card" style={{marginTop:40,background:"linear-gradient(135deg,#1E3A5F,#0F9D8A)",color:"#fff",border:0}}><h2>Your community deserves more than a group chat.</h2><p style={{color:"#D5E0EE"}}>Manage members, events, attendance, payments and reports from one dashboard.</p><button className="btn" style={{background:"#C8963E",borderColor:"#C8963E",color:"#fff"}} onClick={()=>go("login")}>Start your community</button></div></div><Foot/></div>}

function Login({enter}){const [ph,setPh]=useState(""),[otp,setOtp]=useState(false),[code,setCode]=useState(""),[role,setRole]=useState("member");
const ok=/^[6-9]\d{9}$/.test(ph);
return <div className="wrap" style={{maxWidth:900,padding:"40px 20px"}}><div className="grid g2" style={{alignItems:"stretch"}}><div className="card hide-m" style={{background:"linear-gradient(160deg,#1E3A5F,#0F9D8A)",color:"#fff",border:0}}><h2>Your community, in one place</h2><p style={{color:"#D5E0EE"}}>Join local groups, register for events, check in on site and keep every payment in one account.</p><div style={{lineHeight:2}}>✓ Discover communities near you<br/>✓ Register and check in to events<br/>✓ Track dues and receipts</div></div><div className="card"><h2>Sign in</h2><p className="mut">Demo only: OTP is simulated and nothing is sent. Use any 6 digits.</p>
<label className="mut" htmlFor="ph">Mobile number (+91)</label><div className="row"><span>+91</span><input id="ph" inputMode="numeric" maxLength={10} value={ph} onChange={e=>setPh(e.target.value.replace(/\D/g,""))} style={{flex:1}} placeholder="98765 43210"/></div>
{ph&&!ok&&<p style={{color:"var(--er)",margin:"6px 0"}}>Enter a valid 10-digit Indian mobile number.</p>}
<p className="mut" style={{margin:"12px 0 4px"}}>Continue as</p><select aria-label="Role" value={role} onChange={e=>setRole(e.target.value)} style={{width:"100%"}}><option value="member">Community member</option><option value="admin">Community admin</option><option value="platform">Platform admin</option></select>
{otp&&<><p className="mut" style={{margin:"12px 0 4px"}}>Enter OTP</p><input aria-label="OTP" inputMode="numeric" maxLength={6} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,""))} style={{width:"100%"}}/></>}
<button className="btn p" style={{width:"100%",marginTop:14}} disabled={!ok||(otp&&code.length<6)} onClick={()=>otp?enter(role):setOtp(true)}>{otp?"Verify and continue":"Send OTP"}</button></div></div></div>}

function Events({regs,reg,admin,add}){const [f,setF]=useState({t:"",date:"",fee:0,seats:50});
return <div><h2>Events & activities</h2><div className="grid g3" style={{margin:"14px 0"}}>{EVENTS.map(e=>{const r=regs[e.id];return <div className="card" key={e.id}><Tag s={e.date} c=""/><h3>{e.t}</h3><div className="mut">{COMM.find(c=>c.id===e.cm).n}</div><p className="mut">{e.time} · {e.venue}</p><Tag s={e.fee?inr(e.fee):"Free"} c={e.fee?"wa":"ok"}/><Tag s={(e.seats-(r?1:0))+" seats left"} c=""/><div style={{marginTop:10}}><button className={"btn s "+(r?"d":"p")} onClick={()=>reg(e)}>{r?"Cancel registration":"Register"}</button></div></div>})}</div>
{admin&&<div className="card"><h3>Create event</h3><div className="row" style={{flexWrap:"wrap"}}><input aria-label="Title" placeholder="Event title" value={f.t} onChange={e=>setF({...f,t:e.target.value})}/><input aria-label="Date" placeholder="e.g. 20 Nov" value={f.date} onChange={e=>setF({...f,date:e.target.value})}/><input aria-label="Ticket price in rupees" type="number" min="0" value={f.fee} onChange={e=>setF({...f,fee:+e.target.value})}/><button className="btn p" disabled={!f.t||!f.date} onClick={()=>{add(f);setF({t:"",date:"",fee:0,seats:50})}}>Publish event</button></div></div>}</div>}

function Attendance({toast}){const [s,setS]=useState("Not checked in");
const check=()=>{setS("Verifying location");if(!navigator.geolocation){setS("Location unavailable");return}
navigator.geolocation.getCurrentPosition(()=>setTimeout(()=>{setS("Verified");toast("Demo check-in recorded")},900),e=>setS(e.code===1?"Location permission required":"Location unavailable"),{timeout:8000})};
return <div><h2>Attendance</h2><div className="card" style={{maxWidth:520,marginTop:14}}><h3>Rust Night · Baner, Pune</h3><p className="mut">Allowed radius 150 m · window opens 6:00 PM. Your location is read once, only when you tap check in. The result here is a demo; a real backend must verify position, radius and time.</p>
<Tag s={s} c={s==="Verified"?"ok":s.includes("required")||s.includes("unavail")?"er":"wa"}/><div className="row" style={{marginTop:12}}><button className="btn p" disabled={s==="Verified"||s==="Verifying location"} onClick={check}>{s==="Verified"?"Already checked in":"Check in with my location"}</button></div></div></div>}

function Pay({}){const [fl,setFl]=useState("All");const rows=PAY.filter(p=>fl==="All"||p.s===fl);
const csv=()=>{const t="ID,For,Type,Amount,Date,Method,Status\n"+rows.map(p=>[p.id,p.w,p.ty,p.a,p.dt,p.me,p.s].join(",")).join("\n");const a=document.createElement("a");a.href="data:text/csv,"+encodeURIComponent(t);a.download="transactions.csv";a.click()};
return <div><h2>Payments</h2><div className="grid g4" style={{margin:"14px 0"}}><Stat l="Total paid" v={inr(499)} s="1 successful"/><Stat l="Pending dues" v={inr(750)} s="1 transaction"/></div>
<div className="card"><div className="row" style={{marginBottom:8,flexWrap:"wrap"}}><select aria-label="Status" value={fl} onChange={e=>setFl(e.target.value)}>{["All","Successful","Pending","Failed","Refunded"].map(s=><option key={s}>{s}</option>)}</select><button className="btn s" onClick={csv}>Download CSV</button><span className="mut">Pay by UPI, card or net banking via a gateway once connected.</span></div>
<div className="ov"><table><thead><tr><th>ID</th><th>For</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th></tr></thead><tbody>{rows.map(p=><tr key={p.id}><td>{p.id}</td><td>{p.w}<div className="mut">{p.ty}</div></td><td>{inr(p.a)}</td><td>{p.dt}</td><td>{p.me}</td><td><Tag s={p.s}/></td></tr>)}</tbody></table></div></div></div>}

function Members({toast}){const [m,setM]=useState(MEM0),[tab,setTab]=useState("All"),[q,setQ]=useState("");
const set=(id,st,msg)=>{setM(m.map(x=>x.id===id?{...x,st}:x));toast(msg)};
const rows=m.filter(x=>(tab==="All"||x.st===tab)&&(x.n+x.e).toLowerCase().includes(q.toLowerCase()));
return <div><h2>Members</h2><div className="row" style={{margin:"14px 0",flexWrap:"wrap"}}>{["All","Pending","Active","Suspended"].map(t=><button key={t} className={"btn s "+(tab===t?"p":"")} onClick={()=>setTab(t)}>{t}</button>)}<input aria-label="Search members" placeholder="Search name or email" value={q} onChange={e=>setQ(e.target.value)}/></div>
<div className="card ov"><table><thead><tr><th>Member</th><th>Status</th><th>Attendance</th><th>Payment</th><th>Actions</th></tr></thead><tbody>{rows.map(x=><tr key={x.id}><td>{x.n}<div className="mut">{x.e}</div></td><td><Tag s={x.st}/></td><td>{x.att}%</td><td><Tag s={x.pay}/></td><td>
{x.st==="Pending"&&<><button className="btn s p" onClick={()=>set(x.id,"Active",x.n+" approved")}>Approve</button> <button className="btn s d" onClick={()=>{if(confirm("Reject "+x.n+"?")){setM(m.filter(y=>y.id!==x.id));toast("Request rejected")}}}>Reject</button></>}
{x.st==="Active"&&<button className="btn s" onClick={()=>set(x.id,"Suspended",x.n+" suspended")}>Suspend</button>}
{x.st==="Suspended"&&<button className="btn s" onClick={()=>set(x.id,"Active",x.n+" restored")}>Restore</button>}</td></tr>)}</tbody></table>{!rows.length&&<p className="mut">No members in this view.</p>}</div></div>}

function Notifs({n,setN}){const [c,setC]=useState("All");const rows=n.filter(x=>c==="All"||x.c===c);
return <div><div className="row"><h2 style={{flex:1}}>Notifications</h2><button className="btn s" onClick={()=>setN(n.map(x=>({...x,u:false})))}>Mark all as read</button></div>
<div className="row" style={{margin:"12px 0"}}>{["All","Events","Membership","Payments"].map(t=><button key={t} className={"btn s "+(c===t?"p":"")} onClick={()=>setC(t)}>{t}</button>)}</div>
<div className="grid">{rows.map(x=><button key={x.id} className="card" style={{textAlign:"left",fontWeight:x.u?700:500}} onClick={()=>setN(n.map(y=>y.id===x.id?{...y,u:false}:y))}>{x.u&&<Tag s="New" c=""/>}<Tag s={x.c} c="t"/> {x.t}</button>)}</div></div>}

function MemberHome({st,regs,go,join,open}){const joined=COMM.filter(c=>st[c.id]==="Member"),myEv=EVENTS.filter(e=>regs[e.id]);
return <div><h2>Good morning, welcome back</h2><p className="mut">Your communities are meeting soon. Here’s what’s next.</p>
<div className="grid g4" style={{margin:"14px 0"}}><Stat l="Communities joined" v={joined.length} s="Active memberships"/><Stat l="Upcoming events" v={myEv.length} s="Registered"/><Stat l="Events attended" v={12} s="Since joining"/><Stat l="Pending payments" v={inr(750)} s="1 due"/></div>
<div className="grid g2"><div className="card"><h3>Upcoming events</h3>{myEv.length?myEv.map(e=><p key={e.id}>{e.t} <span className="mut">· {e.date}, {e.time}</span></p>):<p className="mut">No registrations yet. <button className="btn s" onClick={()=>go("events")}>Browse events</button></p>}</div>
<div className="card"><h3>Participation</h3><Bars data={[3,5,2,6,4,7]} labels={MON}/></div></div>
<h3 style={{margin:"22px 0 10px"}}>Recommended for you</h3><div className="grid g3">{COMM.filter(c=>!st[c.id]).slice(0,3).map(c=><CCard key={c.id} c={c} state={st[c.id]} onJoin={join} onOpen={open}/>)}</div></div>}

function AdminHome({go}){const reqs=2;return <div><h2>Pune Tech Circle dashboard</h2>
<div className="grid g4" style={{margin:"14px 0"}}><Stat l="Total members" v="1,840" s="+9% vs last month"/><Stat l="Active members" v="1,212" s="66% of total"/><Stat l="Attendance rate" v="74%" s="Last 30 days"/><Stat l="Collections" v={inr(284500)} s={inr(32000)+" pending"}/></div>
<div className="grid g2"><div className="card"><h3>Member growth</h3><Line data={GROW}/></div><div className="card"><h3>Monthly attendance</h3><Bars data={[88,102,95,140,126,171]} labels={MON}/></div></div>
<div className="card" style={{marginTop:16}}><h3>Quick actions</h3><div className="row" style={{flexWrap:"wrap"}}><button className="btn s p" onClick={()=>go("events")}>Create event</button><button className="btn s" onClick={()=>go("members")}>Review {reqs} requests</button><button className="btn s" onClick={()=>go("payments")}>View payments</button></div></div></div>}

function Platform({toast}){const [r,setR]=useState([{id:1,w:"“Crypto Gains Club” community",why:"Suspected spam",s:"Open"},{id:2,w:"Comment by user #4821",why:"Harassment",s:"Open"}]);
const act=(id,s)=>{setR(r.map(x=>x.id===id?{...x,s}:x));toast("Report "+s.toLowerCase())};
return <div><h2>Platform overview</h2><div className="grid g4" style={{margin:"14px 0"}}><Stat l="Users" v="48,210" s="Demo data"/><Stat l="Communities" v="1,326" s="Demo data"/><Stat l="Transactions" v={inr(2840000)} s="Demo data"/><Stat l="Open reports" v={r.filter(x=>x.s==="Open").length} s="Needs review"/></div>
<div className="card"><h3>Moderation queue</h3>{r.map(x=><div key={x.id} className="row" style={{padding:"8px 0",borderTop:"1px solid var(--bd)",flexWrap:"wrap"}}><div style={{flex:1}}>{x.w}<div className="mut">{x.why}</div></div><Tag s={x.s} c={x.s==="Open"?"wa":"ok"}/>{x.s==="Open"&&<><button className="btn s d" onClick={()=>confirm("Suspend this item?")&&act(x.id,"Resolved")}>Suspend</button><button className="btn s" onClick={()=>act(x.id,"Dismissed")}>Dismiss</button></>}</div>)}</div></div>}

const NAV={member:[["dash","Overview","⌂"],["discover","Discover","◎"],["events","Events","▦"],["attendance","Attendance","✓"],["payments","Payments","₹"],["notifs","Alerts","●"]],
admin:[["dash","Overview","⌂"],["members","Members","☺"],["events","Events","▦"],["payments","Payments","₹"],["notifs","Alerts","●"]],
platform:[["dash","Overview","⌂"],["notifs","Alerts","●"]]};

function App(){
const [role,setRole]=useState(null),[v,setV]=useState("home"),[cid,setCid]=useState(1),[toastT,setToast]=useState(""),
[st,setSt]=useState({1:"Member",4:"Member"}),[regs,setRegs]=useState({1:true}),[n,setN]=useState(NOT0);
const toast=m=>{setToast(m);setTimeout(()=>setToast(""),2200)};
const join=c=>{if(!role){setV("login");return}setSt({...st,[c.id]:c.fee?"Pending":"Member"});toast(c.fee?"Request sent to the admin":"You joined "+c.n)};
const open=id=>{setCid(id);setV("community")};
const reg=e=>{const on=!regs[e.id];setRegs({...regs,[e.id]:on});toast(on?"Registered for "+e.t:"Registration cancelled")};
const enter=r=>{setRole(r);setV("dash")};
const out=()=>{setRole(null);setV("home")};
const unread=n.filter(x=>x.u).length;
let page;
if(v==="home")page=<Home go={setV} st={st} join={join} open={open}/>;
else if(v==="login")page=<Login enter={enter}/>;
else if(v==="community")page=<div className="wrap" style={{padding:"24px 20px"}}><Profile id={cid} st={st} join={join}/></div>;
else if(v==="discover")page=<div className={role?"":"wrap"} style={role?{}:{padding:"24px 20px"}}><Discover st={st} join={join} open={open}/></div>;
else if(role==="member")page={dash:<MemberHome st={st} regs={regs} go={setV} join={join} open={open}/>,events:<Events regs={regs} reg={reg}/>,attendance:<Attendance toast={toast}/>,payments:<Pay/>,notifs:<Notifs n={n} setN={setN}/>}[v];
else if(role==="admin")page={dash:<AdminHome go={setV}/>,members:<Members toast={toast}/>,events:<Events regs={regs} reg={reg} admin add={f=>toast("Published “"+f.t+"” (demo)")}/>,payments:<Pay/>,notifs:<Notifs n={n} setN={setN}/>}[v];
else if(role==="platform")page={dash:<Platform toast={toast}/>,notifs:<Notifs n={n} setN={setN}/>}[v];
const items=role?NAV[role]:[];
const Brand=<button className="logo" onClick={()=>setV(role?"dash":"home")}><i>C</i>Community Connect</button>;
return <>
{!role&&<header className="nav"><div className="wrap row" style={{height:60}}>{Brand}<div style={{flex:1}}/><button className="btn s hide-m" onClick={()=>setV("discover")}>Discover</button><button className="btn s" onClick={()=>setV("login")}>Sign in</button><button className="btn s p" onClick={()=>setV("login")}>Get started</button></div></header>}
{!role&&page}
{role&&<div className="shell"><aside className="side">{Brand}<nav style={{marginTop:16}} aria-label="Main">{items.map(([k,l,ic])=><button key={k} className={"i "+(v===k?"on":"")} onClick={()=>setV(k)}><span>{ic}</span>{l}{k==="notifs"&&unread>0&&<Tag s={unread} c="wa"/>}</button>)}<button className="i" onClick={out}><span>↩</span>Sign out</button></nav><p className="mut" style={{padding:"0 12px"}}>Role: {role}. Demo guards only; real access control belongs on the backend.</p></aside>
<main className="main">{page}</main></div>}
{role&&<nav className="bn" aria-label="Primary">{items.map(([k,l,ic])=><button key={k} className={v===k?"on":""} onClick={()=>setV(k)}><span style={{fontSize:18}}>{ic}</span>{l}</button>)}<button onClick={out}><span style={{fontSize:18}}>↩</span>Exit</button></nav>}
{toastT&&<div className="toast" role="status">{toastT}</div>}</>}

export default App;
