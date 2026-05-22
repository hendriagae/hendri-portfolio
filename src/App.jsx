import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';

// ============================================================
// DATA — dari CV Hendri Erida (edit bagian ini sesuai kebutuhan)
// ============================================================
const DATA = {
  name: "Hendri Erida",
  title: "Creative Designer & ICT Educator",
  tagline: "Web · Design · Video · Programming",
  location: "Aceh Barat Daya, Indonesia",
  dob: "10 Januari 1998",
  bio: "Nama saya Hendri Erida, lahir di Gelanggang Gajah pada 10 Januari 1998. Saya adalah pribadi yang disiplin, bertanggung jawab, dan selalu berusaha memberikan yang terbaik dalam setiap hal yang saya kerjakan. Seorang yang berkomitmen, memiliki semangat belajar tinggi, dan mampu bekerja secara mandiri maupun tim.",
  email: "hendryerida@gmail.com",
  phone: "+6281312628448",
  address: "Dusun Cot Seumantok No.23, Desa Cot Seumantok, Kec. Babahrot, Kab. Aceh Barat Daya",
  social: {
    instagram: "https://instagram.com/hen_1098",
    facebook: "https://www.facebook.com/hendryerida",
    linkedin: "https://www.linkedin.com/in/hendri-erida-8602b623a/",
    twitter: "https://www.twitter.com/hendriagae",
    behance: "https://www.behance.net/hendryerida",
  },
  skills: [
    { name: "Microsoft Office", level: 90 },
    { name: "Desain Grafis", level: 85 },
    { name: "Web Programming", level: 80 },
    { name: "Videographer & Editing", level: 82 },
    { name: "C++ & Python", level: 70 },
    { name: "Admin Web / CMS", level: 85 },
  ],
  languages: ["Indonesia (Aktif)", "Aceh (Aktif)", "Inggris (Pasif)"],
  education: [
    { year: "2019 – 2023", school: "Universitas Islam Balitar", major: "Teknik Informatika" },
    { year: "2012 – 2015", school: "SMKN 1 Aceh Barat Daya", major: "Teknik Mesin Sepeda Motor" },
    { year: "2009 – 2012", school: "SMP 3 Babahrot", major: "" },
    { year: "2004 – 2009", school: "SDN 10 Babahrot", major: "" },
  ],
  experience: [
    { year: "2022 – 2024", role: "Guru Pengajar ICT", company: "Al Lathif Islamic School", location: "Kota Bandung, Jawa Barat", desc: "Mengajar mata pelajaran Information & Communication Technology (ICT)." },
    { year: "2019 – 2024", role: "Administrasi Keuangan", company: "Yayasan Noor Rakhmah", location: "Kota Bandung, Jawa Barat", desc: "Pengelolaan keuangan yayasan, CMS dan Smart Billing Bank Syariah Indonesia." },
    { year: "2021 – 2023", role: "Freelance Video Editing & Desain", company: "Hexagon Inc.", location: "Kota Cimahi, Jawa Barat", desc: "Produksi konten visual dan editing video untuk berbagai klien." },
    { year: "2018 – 2019", role: "Admin Website PKBM Al Lathif", company: "Pusat Kegiatan Belajar Masyarakat", location: "Bandung", desc: "Pengelolaan dan pemeliharaan website lembaga pendidikan." },
    { year: "2017 – 2018", role: "Operator Desa", company: "Kantor Desa Cot Seumantok", location: "Aceh Barat Daya", desc: "Operasional administrasi digital desa." },
  ],
  // ↓ Tambahkan project aslimu di sini
  portfolio: [
    {
      id: 1,
      title: "Mobile UI Design — Searah",
      category: "Design",
      desc: "Desain UI mobile app Searah menggunakan Figma. Fokus pada user experience yang clean dan modern.",
      img: "",
      link: "https://www.figma.com/make/1KoK8XJrSis0RaelDDgPE0/Design-mobile-UI-for-Searah?fullscreen=1",
    },
    {
      id: 2,
      title: "Konten Video — Al Lathif Islamic School",
      category: "Video",
      desc: "Produksi dan editing video konten untuk channel YouTube Al Lathif Islamic School.",
      img: "",
      link: "https://www.youtube.com/@AlLathifIslamicSchool",
    },
    {
      id: 3,
      title: "Antriin — Web App",
      category: "Web",
      desc: "Website aplikasi antrian online yang sudah live dan di-deploy di Vercel.",
      img: "",
      link: "https://antriin-web.vercel.app/",
    },
  ],
  // ↓ Tambahkan artikel aslimu di sini
  blog: [
    { id: 1, date: "Des 2023", category: "Web Development", title: "Tips Web Programming untuk Pemula", excerpt: "Konten artikel akan segera ditambahkan." },
    { id: 2, date: "Nov 2023", category: "Design", title: "Prinsip Dasar Desain yang Wajib Diketahui", excerpt: "Konten artikel akan segera ditambahkan." },
    { id: 3, date: "Okt 2023", category: "Video", title: "Workflow Video Editing yang Efisien", excerpt: "Konten artikel akan segera ditambahkan." },
  ],
};

const ACCENT = "#ff5c35";
const ACCENT2 = "#2ecb7a";

// ─────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────
function NavBar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["about", "skills", "portfolio", "blog", "contact"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(15,15,20,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease", padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: 1 }}>
          HE<span style={{ color: ACCENT }}>.</span>
        </div>

        <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
          {navItems.map(item => (
            <li key={item}>
              <button onClick={() => go(item)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: active === item ? ACCENT : "rgba(255,255,255,0.55)",
                fontFamily: "'Poppins',sans-serif", fontSize: 14, fontWeight: 500,
                textTransform: "capitalize", letterSpacing: 0.5, padding: "4px 0",
                borderBottom: active === item ? `2px solid ${ACCENT}` : "2px solid transparent",
                transition: "all 0.3s",
              }}>{item}</button>
            </li>
          ))}
        </ul>

        {/* hamburger — shown via media query override in <style> */}
        <button id="ham-btn" onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          flexDirection: "column", gap: 5, padding: 4,
        }} aria-label="Toggle menu">
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block", width: 24, height: 2, background: "#fff", borderRadius: 2,
              transition: "all 0.3s",
              transform: menuOpen && i===0 ? "rotate(45deg) translate(5px,5px)"
                : menuOpen && i===2 ? "rotate(-45deg) translate(5px,-5px)" : "none",
              opacity: menuOpen && i===1 ? 0 : 1,
            }}/>
          ))}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: "rgba(15,15,20,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1rem 2rem 1.5rem" }}>
          {navItems.map(item => (
            <button key={item} onClick={() => go(item)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", cursor: "pointer",
              color: active === item ? ACCENT : "rgba(255,255,255,0.7)",
              fontFamily: "'Poppins',sans-serif", fontSize: 16,
              padding: "10px 0", textTransform: "capitalize",
            }}>{item}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────
// HERO
// ─────────────────────────────────────────
function HeroSection() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      textAlign: "center", background: "linear-gradient(160deg,#0f0f14 0%,#141620 60%,#0f1018 100%)",
      position: "relative", overflow: "hidden", padding: "0 2rem",
    }}>
      <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", top:-200, right:-200, background:`radial-gradient(circle,${ACCENT}12 0%,transparent 70%)`, pointerEvents:"none" }}/>
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", bottom:-100, left:-100, background:`radial-gradient(circle,${ACCENT2}12 0%,transparent 70%)`, pointerEvents:"none" }}/>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, display:"flex", alignItems:"center", gap:40, textAlign:"left", flexWrap:"wrap", justifyContent:"center" }}>

  {/* Foto Profil */}
  <div style={{ flexShrink:0 }}>
    <div style={{
      width: 160, height: 160, borderRadius: "50%",
      border: `3px solid ${ACCENT}`,
      overflow: "hidden", flexShrink: 0,
      boxShadow: `0 0 40px ${ACCENT}30`,
    }}>
      <img src="/foto.jpeg" alt="Hendri Erida"
        style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
    </div>
  </div>

  {/* Konten */}
  <div>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, color:ACCENT, letterSpacing:4, textTransform:"uppercase", marginBottom:20, fontWeight:600 }}>Halo, saya</p>
        <h1 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(2rem,8vw,5.5rem)", lineHeight:1.05, color:"#fff", margin:"0 0 20px", letterSpacing:-1 }}>
          {DATA.name}
        </h1>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(1rem,3vw,1.4rem)", color:"rgba(255,255,255,0.45)", margin:"0 0 14px", letterSpacing:0.5 }}>
          {DATA.title}
        </p>
        <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, color:ACCENT2, letterSpacing:2, textTransform:"uppercase", margin:"0 0 48px" }}>
          {DATA.tagline}
        </p>

        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          {[
            { label:"Tentang Saya", href:"#about", filled:true },
            { label:"Hire Me", href:`mailto:${DATA.email}`, filled:false },
          ].map(btn => (
            <a key={btn.label} href={btn.href}
              onClick={btn.href.startsWith("#") ? e => { e.preventDefault(); document.getElementById(btn.href.slice(1))?.scrollIntoView({behavior:"smooth"}); } : undefined}
              style={{
                display:"inline-block", padding:"14px 36px", borderRadius:50,
                background: btn.filled ? ACCENT : "transparent",
                color: btn.filled ? "#fff" : "rgba(255,255,255,0.65)",
                border: `2px solid ${btn.filled ? ACCENT : "rgba(255,255,255,0.14)"}`,
                fontFamily:"'Poppins',sans-serif", fontWeight:600, fontSize:14,
                textDecoration:"none", letterSpacing:0.5, transition:"all 0.3s",
              }}>{btn.label}</a>
          ))}
        </div>

        <div style={{ display:"flex", gap:16, justifyContent:"center", marginTop:48 }}>
          {[{label:"IG",href:DATA.social.instagram},{label:"FB",href:DATA.social.facebook},{label:"IN",href:DATA.social.linkedin}].map(s=>(
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              width:40,height:40,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.12)",
              display:"flex",alignItems:"center",justifyContent:"center",
              color:"rgba(255,255,255,0.45)",fontSize:11,fontWeight:700,
              fontFamily:"'Poppins',sans-serif",textDecoration:"none",transition:"all 0.3s",
            }}>{s.label}</a>
          ))}
        </div>
      </div>
      </div>
      <div style={{ position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)", display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
        <span style={{fontSize:10,color:"rgba(255,255,255,0.25)",letterSpacing:3,fontFamily:"'Poppins',sans-serif"}}>SCROLL</span>
        <div style={{width:1,height:48,background:"linear-gradient(to bottom,rgba(255,255,255,0.25),transparent)"}}/>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
function SectionTitle({ subtitle, title }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:11, color:ACCENT, letterSpacing:4, textTransform:"uppercase", margin:"0 0 10px", fontWeight:700 }}>{subtitle}</p>
      <h2 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(1.8rem,4vw,2.8rem)", color:"#fff", margin:0, letterSpacing:-0.5, lineHeight:1.1 }}>{title}</h2>
      <div style={{ width:40, height:3, background:ACCENT, borderRadius:2, marginTop:14 }}/>
    </div>
  );
}

// ─────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" style={{ background:"#0f0f14", padding:"120px 2rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" }}>
          {/* Left */}
          <div>
            <SectionTitle subtitle="Tentang" title="Siapa Saya"/>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:15, lineHeight:1.85, color:"rgba(255,255,255,0.5)", margin:"0 0 32px" }}>{DATA.bio}</p>
            {[
              {label:"Tanggal Lahir",value:DATA.dob},
              {label:"Lokasi",value:DATA.location},
              {label:"Email",value:DATA.email},
              {label:"Telepon",value:DATA.phone},
              {label:"Bahasa",value:DATA.languages.join(" · ")},
            ].map(row=>(
              <div key={row.label} style={{ display:"flex", gap:16, padding:"11px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:12, color:ACCENT, fontWeight:700, minWidth:130, letterSpacing:0.5 }}>{row.label}</span>
                <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:13, color:"rgba(255,255,255,0.55)" }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Right */}
          <div>
            <SectionTitle subtitle="Karir" title="Riwayat Pekerjaan"/>
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute",left:6,top:8,bottom:0,width:1,background:"rgba(255,255,255,0.06)" }}/>
              {DATA.experience.map((exp,i)=>(
                <div key={i} style={{ display:"flex", gap:24, marginBottom:28, position:"relative" }}>
                  <div style={{ width:13,height:13,borderRadius:"50%",background:i===0?ACCENT:"rgba(255,255,255,0.12)",border:`2px solid ${i===0?ACCENT:"rgba(255,255,255,0.08)"}`,flexShrink:0,marginTop:4,position:"relative",zIndex:1 }}/>
                  <div>
                    <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:10,color:ACCENT,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase" }}>{exp.year}</span>
                    <h4 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:14,color:"#fff",margin:"4px 0 2px" }}>{exp.role}</h4>
                    <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:12,color:ACCENT2,margin:"0 0 4px",fontWeight:500 }}>{exp.company} · {exp.location}</p>
                    <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:12,color:"rgba(255,255,255,0.35)",margin:0 }}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop:36 }}>
              <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:10,color:ACCENT,letterSpacing:3,textTransform:"uppercase",fontWeight:700,margin:"0 0 18px" }}>Pendidikan</p>
              {DATA.education.map((edu,i)=>(
                <div key={i} style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                  <div>
                    <p style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:13,color:"#fff",margin:"0 0 2px" }}>{edu.school}</p>
                    {edu.major&&<p style={{ fontFamily:"'Poppins',sans-serif",fontSize:11,color:"rgba(255,255,255,0.35)",margin:0 }}>{edu.major}</p>}
                  </div>
                  <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:10,color:ACCENT,fontWeight:700,whiteSpace:"nowrap",marginLeft:16 }}>{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────
function SkillBar({ name, level, index }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setTimeout(()=>setW(level),index*120); },{threshold:0.5});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[level,index]);
  return (
    <div ref={ref} style={{ marginBottom:26 }}>
      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}>
        <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:14,color:"#fff",fontWeight:500 }}>{name}</span>
        <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:13,color:ACCENT,fontWeight:700 }}>{level}%</span>
      </div>
      <div style={{ height:3,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden" }}>
        <div style={{ height:"100%",width:`${w}%`,background:`linear-gradient(90deg,${ACCENT},${ACCENT2})`,borderRadius:3,transition:"width 1.1s cubic-bezier(.4,0,.2,1)" }}/>
      </div>
    </div>
  );
}

function SkillsSection() {
  const tools = ["Microsoft Office","C++","Python","HTML/CSS","JavaScript","CMS WordPress","Adobe Premiere","Figma","Adobe Photoshop","Bank Syariah CMS","Smart Billing"];
  return (
    <section id="skills" style={{ background:"#12121a",padding:"120px 2rem" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <SectionTitle subtitle="Kemampuan" title="Skills & Expertise"/>
        <div className="two-col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 80px" }}>
          {DATA.skills.map((s,i)=><SkillBar key={s.name} name={s.name} level={s.level} index={i}/>)}
        </div>
        <div style={{ marginTop:56 }}>
          <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:10,color:"rgba(255,255,255,0.25)",letterSpacing:3,textTransform:"uppercase",margin:"0 0 18px" }}>Tools & Tech</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>
            {tools.map(t=>(
              <span key={t} style={{ padding:"8px 16px",borderRadius:50,border:"1px solid rgba(255,255,255,0.09)",fontFamily:"'Poppins',sans-serif",fontSize:13,color:"rgba(255,255,255,0.45)",cursor:"default",transition:"all 0.3s" }}
                onMouseEnter={e=>{e.target.style.borderColor=ACCENT;e.target.style.color=ACCENT;}}
                onMouseLeave={e=>{e.target.style.borderColor="rgba(255,255,255,0.09)";e.target.style.color="rgba(255,255,255,0.45)";}}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────
function PortfolioSection() {
  const cats = ["All","Design","Video","Web"];
  const [active,setActive] = useState("All");
  const filtered = active==="All"?DATA.portfolio:DATA.portfolio.filter(p=>p.category===active);

  // color per category
  const catColor = { Design:ACCENT, Video:"#9b7cf8", Web:ACCENT2 };

  return (
    <section id="portfolio" style={{ background:"#0f0f14",padding:"120px 2rem" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <SectionTitle subtitle="Karya" title="My Portfolio"/>

        <div style={{ display:"flex",gap:8,marginBottom:48,flexWrap:"wrap" }}>
          {cats.map(cat=>(
            <button key={cat} onClick={()=>setActive(cat)} style={{
              padding:"8px 22px",borderRadius:50,cursor:"pointer",
              background:active===cat?ACCENT:"transparent",
              color:active===cat?"#fff":"rgba(255,255,255,0.4)",
              border:`1px solid ${active===cat?ACCENT:"rgba(255,255,255,0.1)"}`,
              fontFamily:"'Poppins',sans-serif",fontSize:13,fontWeight:500,transition:"all 0.3s",
            }}>{cat}</button>
          ))}
        </div>

        <div className="three-col" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20 }}>
          {filtered.map(item=>(
            <div key={item.id} style={{ background:"#1a1b22",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,overflow:"hidden",transition:"all 0.3s",cursor:"pointer" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=ACCENT+"55";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";e.currentTarget.style.transform="none";}}>
              <div style={{ height:180,background:"linear-gradient(135deg,#1e1f28,#252630)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
                <div style={{ width:56,height:56,borderRadius:"50%",border:"2px dashed rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <span style={{ fontSize:20,color:"rgba(255,255,255,0.15)" }}>+</span>
                </div>
                <span style={{ position:"absolute",top:12,right:12,padding:"4px 12px",borderRadius:50,background:`${catColor[item.category]||ACCENT}22`,color:catColor[item.category]||ACCENT,fontSize:10,fontWeight:700,letterSpacing:1,fontFamily:"'Poppins',sans-serif" }}>{item.category}</span>
              </div>
              <div style={{ padding:"20px 20px 24px" }}>
                <h3 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:15,color:"#fff",margin:"0 0 8px" }}>{item.title}</h3>
                <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:13,color:"rgba(255,255,255,0.38)",margin:"0 0 16px",lineHeight:1.65 }}>{item.desc}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:"'Poppins',sans-serif",fontSize:12,color:ACCENT,fontWeight:600,letterSpacing:0.5,textDecoration:"none" }}>
                  Lihat Project →
                </a>
              )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// BLOG
// ─────────────────────────────────────────
function BlogSection() {
  const catColor = { "Web Development":ACCENT2, Design:ACCENT, Video:"#9b7cf8" };
  return (
    <section id="blog" style={{ background:"#12121a",padding:"120px 2rem" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <SectionTitle subtitle="Artikel" title="Blog & Updates"/>
        <div className="three-col" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24 }}>
          {DATA.blog.map(post=>(
            <article key={post.id} style={{ background:"#1a1b22",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"28px 24px",cursor:"pointer",transition:"all 0.3s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=ACCENT+"55";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";e.currentTarget.style.transform="none";}}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
                <span style={{ padding:"4px 12px",borderRadius:50,background:`${catColor[post.category]||ACCENT}1a`,color:catColor[post.category]||ACCENT,fontSize:10,fontWeight:700,letterSpacing:1,fontFamily:"'Poppins',sans-serif" }}>{post.category}</span>
                <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:11,color:"rgba(255,255,255,0.28)" }}>{post.date}</span>
              </div>
              <h3 style={{ fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:15,color:"#fff",margin:"0 0 12px",lineHeight:1.45 }}>{post.title}</h3>
              <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:13,color:"rgba(255,255,255,0.38)",margin:"0 0 20px",lineHeight:1.7 }}>{post.excerpt}</p>
              <span style={{ fontFamily:"'Poppins',sans-serif",fontSize:12,color:ACCENT,fontWeight:600,letterSpacing:0.5 }}>Baca Selengkapnya →</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────
function ContactSection() {
  const [form,setForm] = useState({name:"",email:"",message:""});
  const [sent,setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    emailjs.send(
      "service_fftxzg5",
      "template_o1zoxcw",
      {
        from_name: form.name,
        from_email: form.email,
        email: form.email,
        message: form.message,
      },
      "clh50WNFEpQAOVYgr"
    ).then(() => {
      setSent(true);
      setForm({name:"",email:"",message:""});
      setTimeout(()=>setSent(false),4000);
    }).catch((err) => {
      console.error("EmailJS error:", err);
      alert("Gagal mengirim pesan. Coba lagi ya!");
    });
  };

  const inp = {
    width:"100%", padding:"14px 18px",
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)", borderRadius:10,
    color:"#fff", fontFamily:"'Poppins',sans-serif", fontSize:14,
    outline:"none", boxSizing:"border-box", transition:"border-color 0.3s",
  };

  return (
    <section id="contact" style={{ background:"#0f0f14",padding:"120px 2rem 80px" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <SectionTitle subtitle="Hubungi" title="Let's Work Together"/>
        <div className="two-col" style={{ display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:80 }}>

          {/* Info */}
          <div>
            <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:15,color:"rgba(255,255,255,0.45)",lineHeight:1.85,margin:"0 0 40px" }}>
              Tertarik bekerja sama atau punya pertanyaan? Hubungi saya melalui form ini atau langsung via kontak di bawah.
            </p>
            {[
              {label:"Email",value:DATA.email,href:`mailto:${DATA.email}`},
              {label:"Telepon",value:DATA.phone,href:`tel:${DATA.phone}`},
              {label:"Lokasi",value:DATA.address,href:null},
            ].map(c=>(
              <div key={c.label} style={{ marginBottom:28 }}>
                <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:10,color:ACCENT,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",margin:"0 0 6px" }}>{c.label}</p>
                {c.href
                  ?<a href={c.href} style={{ fontFamily:"'Poppins',sans-serif",fontSize:14,color:"rgba(255,255,255,0.55)",textDecoration:"none" }}>{c.value}</a>
                  :<p style={{ fontFamily:"'Poppins',sans-serif",fontSize:14,color:"rgba(255,255,255,0.55)",margin:0 }}>{c.value}</p>
                }
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={submit} style={{ display:"flex",flexDirection:"column",gap:14 }}>
            <input required placeholder="Nama Lengkap" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
              style={inp} onFocus={e=>e.target.style.borderColor=ACCENT} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"}/>
            <input required type="email" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
              style={inp} onFocus={e=>e.target.style.borderColor=ACCENT} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"}/>
            <textarea required rows={5} placeholder="Tulis pesan kamu di sini..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
              style={{...inp,resize:"vertical"}} onFocus={e=>e.target.style.borderColor=ACCENT} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"}/>
            <button type="submit" style={{
              padding:"14px 36px",background:ACCENT,color:"#fff",border:"none",borderRadius:50,
              fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",
              transition:"opacity 0.3s",letterSpacing:0.5,alignSelf:"flex-start",
            }} onMouseEnter={e=>e.target.style.opacity=0.85} onMouseLeave={e=>e.target.style.opacity=1}>
              {sent?"✓ Terkirim!":"Kirim Pesan"}
            </button>
            {sent&&<p style={{ fontFamily:"'Poppins',sans-serif",fontSize:13,color:ACCENT2,margin:0 }}>Pesan berhasil dikirim! Saya akan segera menghubungi kamu.</p>}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div style={{ maxWidth:1100,margin:"80px auto 0",paddingTop:28,borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
        <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:12,color:"rgba(255,255,255,0.2)",margin:0 }}>© 2024 Hendri Erida. All rights reserved.</p>
        <p style={{ fontFamily:"'Poppins',sans-serif",fontSize:12,color:"rgba(255,255,255,0.2)",margin:0 }}>Built with React ✦ Minimalis Clean Dark</p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────
export default function App() {
  const [activeSection,setActiveSection] = useState("about");

  useEffect(()=>{
    // inject Google Fonts
    if(!document.getElementById("gf-Poppins")){
      const l=document.createElement("link");
      l.id="gf-Poppins";
      l.href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap";
      l.rel="stylesheet";
      document.head.appendChild(l);
    }
    // active section tracker
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) setActiveSection(e.target.id); });
    },{threshold:0.35});
    ["about","skills","portfolio","blog","contact"].forEach(id=>{
      const el=document.getElementById(id);
      if(el) obs.observe(el);
    });
    return ()=>obs.disconnect();
  },[]);

  return (
    <div style={{ background:"#0f0f14",minHeight:"100vh" }}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{background:#0f0f14;}
        ::selection{background:#ff5c3540;color:#fff;}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:#0f0f14;}
        ::-webkit-scrollbar-thumb{background:#252630;border-radius:3px;}
        a{transition:opacity 0.3s;}
        a:hover{opacity:0.8;}
        @media(max-width:900px){
          nav ul{display:none !important;}
          #ham-btn{display:flex !important;}
          .two-col,.three-col{grid-template-columns:1fr !important;gap:48px !important;}
        }
        @media(max-width:600px){
          section{padding:80px 1.25rem !important;}
        }
      `}</style>

      <NavBar active={activeSection} setActive={setActiveSection}/>
      <HeroSection/>
      <AboutSection/>
      <SkillsSection/>
      <PortfolioSection/>
      <BlogSection/>
      <ContactSection/>
    </div>
  );
}
