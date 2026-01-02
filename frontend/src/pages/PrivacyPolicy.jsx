import '../App.css';

function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <h2>Privacy Policy</h2>
      <p className="last-updated">Last Updated: January 2, 2026</p>

      <section>
        <h3>1. Introduction</h3>
        <p>
          This Privacy Policy explains how Mood Index collects, uses, and protects your personal
          information. By using our service, you consent to the data practices described in this policy.
        </p>
        <p>
          <strong>Important Notice:</strong> Mood Index is a personal and educational project.
          While we take reasonable measures to protect your data, we cannot guarantee absolute
          security. Please do not store highly sensitive or critical information.
        </p>
      </section>

      <section>
        <h3>2. Information We Collect</h3>

        <h4>Account Information</h4>
        <ul>
          <li>Username</li>
          <li>Email address</li>
          <li>Password (stored as a cryptographic hash)</li>
        </ul>

        <h4>Mood Data</h4>
        <ul>
          <li>Mood values (numerical ratings from -10 to 10)</li>
          <li>Entry dates and timestamps</li>
          <li>Optional notes or comments you add to mood entries</li>
        </ul>

        <h4>Technical Information</h4>
        <ul>
          <li>Browser type and version</li>
          <li>IP address (may be logged by hosting provider)</li>
          <li>Access times and dates</li>
        </ul>
      </section>

      <section>
        <h3>3. How We Use Your Information</h3>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and maintain the mood tracking service</li>
          <li>Authenticate your account and manage user sessions</li>
          <li>Display your mood history and analytics</li>
          <li>Communicate with you about service updates or issues</li>
          <li>Improve the service and fix bugs</li>
        </ul>
        <p>
          We do NOT sell, rent, or share your personal information with third parties for
          marketing purposes.
        </p>
      </section>

      <section>
        <h3>4. Data Storage and Security</h3>

        <h4>Security Measures</h4>
        <p>We implement the following security measures:</p>
        <ul>
          <li>Password hashing using bcrypt</li>
          <li>JWT-based authentication</li>
          <li>HTTPS encryption for data in transit (when deployed with SSL)</li>
          <li>Database access controls</li>
        </ul>

        <h4>Security Limitations</h4>
        <p>
          <strong>IMPORTANT:</strong> Despite these measures, you should be aware of limitations:
        </p>
        <ul>
          <li>This is a personal/educational project with limited resources and security auditing</li>
          <li>We cannot guarantee protection against all security threats</li>
          <li>Data breaches may occur despite our security efforts</li>
          <li>Database backups may not be regular or comprehensive</li>
          <li>The service may be vulnerable to undiscovered security flaws</li>
        </ul>
        <p>
          <strong>Recommendation:</strong> Use a unique password for this service and avoid storing
          information you would not want to be publicly accessible.
        </p>
      </section>

      <section>
        <h3>5. Data Retention</h3>
        <p>
          We retain your account information and mood data for as long as your account is active.
          If you delete your account, we will make reasonable efforts to delete your data, but:
        </p>
        <ul>
          <li>Some data may remain in backups for a period of time</li>
          <li>Technical constraints may prevent immediate deletion</li>
          <li>We may retain certain information if required by law</li>
        </ul>
      </section>

      <section>
        <h3>6. Your Rights</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data stored in our system</li>
          <li>Update or correct your information</li>
          <li>Delete your account and associated data</li>
          <li>Export your mood data (if export functionality is available)</li>
        </ul>
        <p>
          You can manage most of your data directly through the application interface.
        </p>
      </section>

      <section>
        <h3>7. Cookies and Local Storage</h3>
        <p>
          We use browser local storage to maintain your login session. Specifically, we store:
        </p>
        <ul>
          <li>Authentication token (JWT)</li>
          <li>Basic user information</li>
        </ul>
        <p>
          This data is stored locally in your browser and is used to keep you logged in.
          You can clear this data at any time by logging out or clearing your browser's
          local storage.
        </p>
      </section>

      <section>
        <h3>8. Third-Party Services</h3>
        <p>
          Our application may be hosted on third-party platforms that have their own privacy
          policies. These may include:
        </p>
        <ul>
          <li>Web hosting providers</li>
          <li>Database hosting services</li>
          <li>Domain registrars</li>
        </ul>
        <p>
          We recommend reviewing the privacy policies of these services as well.
        </p>
      </section>

      <section>
        <h3>9. Children's Privacy</h3>
        <p>
          Our service is not intended for children under 13 years of age. We do not knowingly
          collect personal information from children. If you believe a child has provided us
          with personal information, please contact us so we can delete it.
        </p>
      </section>

      <section>
        <h3>10. Data Breach Notification</h3>
        <p>
          In the event of a data breach that affects your personal information, we will make
          reasonable efforts to notify affected users. However, as this is a personal project
          with limited monitoring capabilities, we cannot guarantee timely detection or
          notification of all security incidents.
        </p>
      </section>

      <section>
        <h3>11. International Users</h3>
        <p>
          This service may be hosted in various locations. By using Mood Index, you consent
          to the transfer of your information to countries that may have different data
          protection laws than your country of residence.
        </p>
      </section>

      <section>
        <h3>12. Changes to Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. The "Last Updated" date at
          the top of this page indicates when the policy was last revised. Continued use
          of the service after changes constitutes acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h3>13. Contact Information</h3>
        <p>
          If you have questions or concerns about this Privacy Policy or how your data is
          handled, please contact the project maintainer through the project's repository
          or contact information.
        </p>
      </section>

      <section className="disclaimer-box">
        <h3>Privacy Summary</h3>
        <p>
          We collect mood tracking data and account information to provide the service.
          While we implement security measures, this is a personal/educational project
          with inherent limitations. We do not sell your data, but we cannot guarantee
          absolute security. Use this service understanding these risks.
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
