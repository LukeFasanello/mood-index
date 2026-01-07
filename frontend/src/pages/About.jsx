import '../App.css';

function About() {
  return (
    <div className="legal-page">
      <h2>About Mood Index</h2>

      <section>
        <h3>What is Mood Index?</h3>
        <p>
          Mood Index is a personal mood tracking application that helps you monitor and
          understand your emotional well-being over time. Track your daily moods, add notes,
          and visualize your emotional patterns with simple charts and statistics.
        </p>
      </section>

      <section>
        <h3>Why I Built This</h3>
        <p>
          Before building this website, I realized I needed to approach life with a bit more balance. 
          I wanted to avoid the peaks and valleys in my mindset and productivity, and focus on steady 
          progress rather than cycling between bursts of intensity and periods of stagnation.
        </p>
        <p>
          Inspired by how stock market charts show trends over time, I started thinking about what it 
          would look like to track mood in a similar way. I wanted to be able to zoom out and see the 
          bigger picture, understand patterns, and figure out what actually influences how I feel over time.
        </p>
        <p>
          At the same time, I wanted to learn more about web development by building something 
          real and useful from start to finish. This project let me explore both the technical 
          and human sides of building a product, and I hope it’s helpful for anyone who wants a 
          better understanding of their own patterns.
        </p>
      </section>

      <section>
        <h3>Tech Stack</h3>
        <p>Mood Index is built with modern web technologies:</p>
        <ul>
          <li><strong>Frontend:</strong> React, Recharts for data visualization</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Database:</strong> PostgreSQL</li>
          <li><strong>Authentication:</strong> JWT, bcrypt for password hashing</li>
        </ul>
      </section>

      <section>
        <h3>Project Status</h3>
        <p>
          This is a personal and educational project. While I've implemented security best
          practices, this app is primarily built for learning and demonstration purposes.
          Feel free to use it, but please be aware of the limitations mentioned in the
          Terms of Service and Privacy Policy.
        </p>
      </section>

      <section>
        <h3>Contact & Links</h3>
        <p>I'd love to hear from you! You can reach me through:</p>
        <ul>
          <li><strong>Email:</strong> lukefas6@gmail.com</li>
          <li><strong>GitHub:</strong> <a href="https://github.com/LukeFasanello" target="_blank" rel="noopener noreferrer" className="legal-link">https://github.com/LukeFasanello</a></li>
          <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/lukefasanello/" target="_blank" rel="noopener noreferrer" className="legal-link">https://www.linkedin.com/in/lukefasanello/</a></li>
        </ul>
      </section>

      <section>
        <h3>Feedback & Contributions</h3>
        <p>
          Found a bug or have a feature suggestion? I welcome feedback! Please feel free
          to reach out through any of the contact methods above.
        </p>
      </section>
    </div>
  );
}

export default About;
