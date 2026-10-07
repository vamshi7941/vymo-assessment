import { LeadForm } from './LeadForm'

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Vymo home">
          <span className="brand-mark" aria-hidden="true">v</span>
          <span>vymo</span>
        </a>
        <span className="topbar-note">
          Already a customer? <a href="mailto:support@vymo.com">Get support</a>
        </span>
      </header>

      <div className="content-layout">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow"><span /> LET’S TALK</p>
          <h1 id="page-title">
            Good conversations
            <br />
            <span>start here.</span>
          </h1>
          <p className="intro-copy">
            Tell us a little about yourself and what you’re looking for. Our
            team will be in touch soon.
          </p>
          <div className="trust-note">
            <div className="avatar-stack" aria-hidden="true">
              <span>AM</span><span>SK</span><span>RJ</span>
            </div>
            <p>
              Real people, thoughtful answers.
            </p>
          </div>
          <div className="decorative-orbit" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="orbit-dot" />
          </div>
        </section>

        <section className="form-card" aria-labelledby="form-title">
          <div className="form-heading">
            <div>
              <p className="form-step">YOUR DETAILS <span>01 / 01</span></p>
              <h2 id="form-title">Let’s get to know you</h2>
              <p>Fields marked with <span className="required-star">*</span> are required.</p>
            </div>
            <div className="heading-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M10 25.5 20.2 35 39 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
          <div className="divider" />
          <LeadForm />
        </section>
      </div>
      <footer className="page-footer">
        <span>© 2026 Vymo</span>
        <span>Making every customer moment count.</span>
      </footer>
    </main>
  )
}

export default App
