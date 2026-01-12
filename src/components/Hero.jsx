import React from 'react'

const Hero = () => {
  return (
  <section className="hero">
  <div className="hero-content">
    <h1>Hi, I'm Mohamed 👋</h1>
    <h2>Frontend Developer (React.js & Flutter)</h2>
    <p>
      I am a dedicated Frontend Developer with hands-on experience in building modern web applications using React
      and cross-platform mobile applications using Flutter. I focus on creating user-friendly interfaces,
      scalable components, and clean, maintainable code. I have worked on multiple projects that strengthened my skills
      in state management, UI/UX implementation, and performance optimization.
    </p>

    <div className="hero-buttons">
      <a href="#contact" className="btn primary">Contact Me</a>
      <a
       href="https://drive.google.com/file/d/1T6N3tTKcToSZb2mcO0nNMiLloRNrGr2Y/view?usp=drivesdk" 
      className="btn secondary" download>Download My CV</a>
    </div>
  </div>
</section>
  )
}

export default Hero