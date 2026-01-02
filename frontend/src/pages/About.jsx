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
          [Add your personal story here - why you decided to build this app, what problem
          you were trying to solve, or what inspired you to create it.]
        </p>
      </section>

      <section>
        <h3>Technology Stack</h3>
        <p>Mood Index is built with modern web technologies:</p>
        <ul>
          <li><strong>Frontend:</strong> React, Recharts for data visualization</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Database:</strong> PostgreSQL</li>
          <li><strong>Authentication:</strong> JWT (JSON Web Tokens), bcrypt for password hashing</li>
        </ul>
      </section>

      <section>
        <h3>About the Developer</h3>
        <p>
          [Add information about yourself here - your background, interests, or what you're
          currently learning/working on.]
        </p>
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
          <li><strong>Email:</strong> [your-email@example.com]</li>
          <li><strong>GitHub:</strong> <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="legal-link">[Your GitHub Profile]</a></li>
          <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="legal-link">[Your LinkedIn Profile]</a></li>
          <li><strong>Portfolio:</strong> <a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer" className="legal-link">[Your Portfolio]</a></li>
        </ul>
      </section>

      <section>
        <h3>Feedback & Contributions</h3>
        <p>
          Found a bug or have a feature suggestion? I welcome feedback! Please feel free
          to reach out through any of the contact methods above.
        </p>
      </section>

      <section>
        <h3>Acknowledgments</h3>
        <p>
          [Optional: Thank any resources, tutorials, or people who helped you build this project.]
        </p>
      </section>
    </div>
  );
}

export default About;
