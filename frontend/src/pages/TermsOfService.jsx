import '../App.css';

function TermsOfService() {
  return (
    <div className="legal-page">
      <h2>Terms of Service</h2>
      <p className="last-updated">Last Updated: January 2, 2026</p>

      <section>
        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing and using Mood Index, you acknowledge that you have read, understood,
          and agree to be bound by these Terms of Service.
        </p>
      </section>

      <section>
        <h3>2. Educational and Personal Project</h3>
        <p>
          <strong>IMPORTANT:</strong> Mood Index is provided as a personal and educational project.
          This service is offered "AS IS" and "AS AVAILABLE" without any warranties of any kind,
          either express or implied.
        </p>
        <p>
          While we implement reasonable security measures, we make NO GUARANTEE that the service
          will be secure, error-free, or available at all times. You use this service at your own risk.
        </p>
      </section>

      <section>
        <h3>3. Description of Service</h3>
        <p>
          Mood Index is a web application that allows users to track their daily mood and view
          historical mood data. The service includes features for logging mood entries, viewing
          mood trends over time, and managing mood history.
        </p>
      </section>

      <section>
        <h3>4. User Accounts</h3>
        <p>
          To use Mood Index, you must create an account. You are responsible for:
        </p>
        <ul>
          <li>Maintaining the confidentiality of your account credentials</li>
          <li>All activities that occur under your account</li>
          <li>Notifying us immediately of any unauthorized use of your account</li>
        </ul>
      </section>

      <section>
        <h3>5. Data Storage and Security</h3>
        <p>
          Your mood entries and personal information are stored in our database. While we implement
          security measures including password hashing and authentication, we cannot guarantee
          absolute security.
        </p>
        <p>
          <strong>Important Security Disclaimer:</strong>
        </p>
        <ul>
          <li>This is a personal/educational project with limited resources</li>
          <li>We implement basic security measures but cannot guarantee enterprise-level security</li>
          <li>Data breaches or unauthorized access may occur despite our efforts</li>
          <li>You should not store highly sensitive or critical information</li>
          <li>We recommend using a unique password not used on other services</li>
        </ul>
      </section>

      <section>
        <h3>6. Limitation of Liability</h3>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL MOOD INDEX OR ITS CREATOR
          BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
          OR ANY LOSS OF DATA, USE, OR PROFITS ARISING OUT OF OR IN CONNECTION WITH YOUR USE
          OF THE SERVICE.
        </p>
        <p>
          This includes, but is not limited to, damages resulting from:
        </p>
        <ul>
          <li>Data breaches or unauthorized access to your account</li>
          <li>Loss or corruption of your mood data</li>
          <li>Service interruptions or unavailability</li>
          <li>Any errors or bugs in the application</li>
        </ul>
      </section>

      <section>
        <h3>7. Not Medical Advice</h3>
        <p>
          Mood Index is NOT a medical device or health service. The mood tracking features are
          for personal informational purposes only and do not constitute medical advice, diagnosis,
          or treatment. Always consult with qualified healthcare professionals regarding any
          mental health concerns.
        </p>
      </section>

      <section>
        <h3>8. User Conduct</h3>
        <p>You agree not to:</p>
        <ul>
          <li>Use the service for any illegal purposes</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt the service</li>
          <li>Use automated scripts to create accounts or submit data</li>
        </ul>
      </section>

      <section>
        <h3>9. Service Availability</h3>
        <p>
          We reserve the right to modify, suspend, or discontinue the service at any time
          without notice. We may also delete inactive accounts or data at our discretion.
        </p>
      </section>

      <section>
        <h3>10. Changes to Terms</h3>
        <p>
          We may update these Terms of Service at any time. Continued use of the service
          after changes constitutes acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h3>11. Termination</h3>
        <p>
          You may delete your account at any time. We reserve the right to terminate or
          suspend your account for any reason, including violation of these terms.
        </p>
      </section>

      <section>
        <h3>12. Contact</h3>
        <p>
          If you have questions about these Terms of Service, please contact us through
          the information provided in the Privacy Policy.
        </p>
      </section>

      <section className="disclaimer-box">
        <h3>Summary Disclaimer</h3>
        <p>
          By using Mood Index, you acknowledge and accept that this is a personal/educational
          project with inherent risks. While we implement security measures, we provide no
          guarantees and are not liable for any damages, data loss, or security incidents
          that may occur.
        </p>
      </section>
    </div>
  );
}

export default TermsOfService;
