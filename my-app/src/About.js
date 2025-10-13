import ProfileCard from './components/ProfileCard/ProfileCard';
import DecryptedText from './components/DecryptedText/DecryptedText';
import CurvedLoop from './components/CurvedLoop/CurvedLoop';

export default function About() {
  return (
    <main style={{ padding: 24, background: 'transparent', color: 'white' }}>
      {/* leave empty for now or add a placeholder */}
      {/* About page */}
      <div style={{size:"10px", position:"left"}}>About</div>
      
      <div style={{fontSize:"20px", fontWeight:"bold", color:"#fff", marginTop:"60px"}}>
        <CurvedLoop 
        marqueeText="nice ✦ to ✦ meet✦ you ✦ ◡̈ ✦"
        speed={2}
        curveAmount={0}
        direction="right"
        interactive={true}
        className="custom-text-style"
      />
      </div>
      <div style={{flexDirection:"row", display:"flex", justifyContent:"center", alignItems:"center", zIndex:"5", position:"relative", padding:"50px"}}>
      <div style={{size:"40px"}}>
      <ProfileCard
        name="Sasha Khajanchi"
        title=""
        handle="sasha.khajanchi@berkeley.edu"
        status=""
        contactText="Email Me"
        avatarUrl="/photos/IMG_6608.JPG"
        showUserInfo={true}
        showBehindGradient={false}
        enableTilt={true}
        enableMobileTilt={false}
        onContactClick={() => console.log('Contact clicked')}
        />
        </div>

        <div style={{maxWidth:"600px", background:"#ffffff70", borderRadius:"15px", margin:"20px", padding:"20px", boxShadow:"0 4px 8px rgba(0,0,0,0.1)"}}>
            <p style={{fontSize:"23px", color:"#1c0346ff"}}>
             I'm Sasha, a second-year UC Berkeley student studying Political Economy and Design. I believe we learn most when we ask for help and embrace what we don't know yet. While I'm early in my professional journey, I'm driven by creativity and curiosity about how strategy and human behavior intersect. I'm particularly drawn to project management, business analytics, and marketing—fields where I can combine my love for understanding people with data-driven insights. I thrive on spotting patterns and bringing fresh perspectives to complex challenges.
            I love connecting with others and learning from diverse perspectives, always looking for opportunities to grow and contribute meaningfully to any team or project.       
            </p>

            <div style= {{flexDirection:"row", display:"flex", justifyContent:"left"}}>
            <p style={{padding: "10px", fontSize: "23px", color: "#1c0346ff"}}>Connect with me on LinkedIn!</p>
            <a
              href="https://www.linkedin.com/in/sasha-khajanchi/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:"inline-flex",
                alignItems:"center",
                gap:"8px",
                textDecoration:"none",
                color:"#0A66C2",
                fontWeight:600
              }}
              aria-label="Sasha on LinkedIn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.6 0 4.264 2.37 4.264 5.455v6.288zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            </div>
          </div>


        </div>


       
        <div style={{flexDirection:"row", display:"flex", justifyContent:"left", alignItems:"left", marginLeft:"250px"}}>

        <div style={{marginTop:"10px"}}>
          <h1 style={{color:"#280368ff", fontSize:"40px"}}>My SuperPowers</h1>
          <img src="/photos/superpower.gif" alt="superpowers" style={{width:"300px", height:"300px", borderRadius:"50px"}}/>
        </div> 
        <div style={{flexDirection:"column"   , display:"flex", justifyContent:"left", alignItems:"left" , padding:"50px", maxWidth:"800px"}}>


        <div style={{background:"#0a0101c9", borderRadius:"15px", padding:"20px", marginBottom:"20px"}}>
        <div style={{fontSize:"30px", color:"#fcfbfcff", fontWeight:"bold", marginTop:"10px"}}>
        <DecryptedText
          text="Late-Starter Resilience"
          speed={100}
          maxIterations={20}
          characters="ABCD1234!?"
          className="revealed"
          parentClassName="all-letters"
          encryptedClassName="encrypted"
          />
          </div>
          <p style={{fontSize:"20px"}}>I've tried countless new sports throughout my life, even picking up completely unfamiliar activities now. This has taught me that being terrible at something initially is just part of the process, not a reason to quit. This experience has made me comfortable with the vulnerability of being a beginner and shown me that improvement comes from persistence. </p>
         </div>

          <div style={{background:"#0a0101c9", borderRadius:"15px", padding:"20px", marginBottom:"20px"}}>
         <div style={{fontSize:"30px", color:"#faf9fbff", fontWeight:"bold", marginTop:"10px"}}>
          <DecryptedText
          text="Adaptive Facilitation"
          speed={100}
          maxIterations={20}
          characters="ABCD1234!?"
          className="revealed"
          parentClassName="all-letters"
          encryptedClassName="encrypted"
          />
          </div>
          <p style={{fontSize:"20px"}}>
          Working as an art teacher at a pottery studio taught me to read the room and adjust my approach in real-time. Whether guiding students through a challenging  technique or managing a classroom full of different skill levels, I learned to pivot when things weren't working and find new ways to help people succeed.
          </p>
          </div>
        
          <div style={{background:"#0a0101c9", borderRadius:"15px", padding:"20px", marginBottom:"20px"}}>
          <div style={{fontSize:"30px", color:"#f8f7faff", fontWeight:"bold", marginTop:"10px"}}>
          <DecryptedText
          text="Turning Chaos into Clarity"
          speed={100}
          animateOn='both'
          maxIterations={20}
          characters="ABCD1234!?"
          className="revealed"
          parentClassName="all-letters"
          encryptedClassName="encrypted"
          />
          </div>
          <p style={{fontSize:"20px"}}>I thrive in messy, creative environments and can help groups find direction when things feel overwhelming. I'm skilled at breaking down complex processes into manageable steps that help people build confidence as they work toward their goals.</p>
          </div>
        </div>
        </div>
    </main>
  );
}

