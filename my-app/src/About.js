import ProfileCard from './components/ProfileCard/ProfileCard';
  

export default function About() {
  return (
    <main style={{ padding: 24, background: 'transparent', color: 'white' }}>
      {/* leave empty for now or add a placeholder */}
      {/* About page */}
      <div style={{size:"10px", position:"left"}}>About</div>
      <div style={{flexDirection:"row", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <div style={{padding:"100px", size:"40px"}}>
      <ProfileCard
        name="Sasha Khajanchi"
        title=""
        handle="sasha.khajanchi"
        status="Online"
        contactText="Contact Me"
        avatarUrl="/photos/IMG_6608.JPG"
        showUserInfo={true}
        showBehindGradient={false}
        enableTilt={true}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
        />
        </div>

        <div style={{maxWidth:"600px", padding:"20px", background:"#ffffff70", borderRadius:"15px", margin:"20px"}}>
          <h1 style={{fontSize: "30px", color: "#1c0346ff"}}>Nice to meet you :)</h1>
          <p style={{fontSize: "25px", color: "#1c0346ff"}}>
            I'm Sasha, a second-year UC Berkeley student studying Political Economy and Design. I believe we learn most when we ask for help and embrace what we don't know yet. While I'm early in my professional journey, I'm driven by creativity and curiosity about how strategy and human behavior intersect. I'm particularly drawn to project management, business analytics, and marketing—fields where I can combine my love for understanding people with data-driven insights. I thrive on spotting patterns and bringing fresh perspectives to complex challenges.
            I love connecting with others and learning from diverse perspectives, always looking for opportunities to grow and contribute meaningfully to any team or project.         
         </p>
                  
        </div>
        </div>
    </main>
  );
}

