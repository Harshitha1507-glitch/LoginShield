import { useEffect, useMemo, useState } from 'react'
import {
  Activity, AlertTriangle, ArrowRight, ArrowUpRight, Bell, Blocks, Bot,
  Check, ChevronDown, ChevronRight, CircleHelp, Clock3, Eye, EyeOff,
  Fingerprint, Globe2, KeyRound, Laptop, LockKeyhole, LogOut, MapPin,
  Menu, MoreHorizontal, Network, PanelLeftClose, PanelLeftOpen, Play,
  Plus, Radar, RefreshCw, Search, Settings, Shield, ShieldAlert,
  ShieldCheck, Siren, Sparkles, User, UserRound, X,
} from 'lucide-react'
import './App.css'

const navigation = [
  { id: 'overview', label: 'Overview', icon: Blocks, section: 'Workspace' },
  { id: 'simulator', label: 'Login Simulator', icon: Play },
  { id: 'analytics', label: 'Risk Analytics', icon: Activity },
  { id: 'incidents', label: 'Incidents', icon: Siren, count: '07' },
  { id: 'travel', label: 'Impossible Travel', icon: Globe2 },
  { id: 'devices', label: 'Device & IP Monitoring', icon: Network, section: 'Detection' },
  { id: 'mfa', label: 'MFA Verification', icon: Fingerprint },
  { id: 'honeypot', label: 'Honeypot Lab', icon: Bot },
  { id: 'replay', label: 'Attack Replay', icon: RefreshCw },
  { id: 'honeytokens', label: 'Honeytokens', icon: KeyRound },
  { id: 'audit', label: 'Audit Logs', icon: Clock3, section: 'Governance' },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const incidents = [
  { initials: 'JD', name: 'James Davidson', email: 'j.davidson@northstar.io', event: 'Credential stuffing', location: 'Bucharest, RO', time: '2 min ago', score: 94, risk: 'high' },
  { initials: 'SL', name: 'Sofia Laurent', email: 's.laurent@northstar.io', event: 'Impossible travel', location: 'Lagos, NG', time: '18 min ago', score: 78, risk: 'high' },
  { initials: 'AK', name: 'Arjun Kapoor', email: 'a.kapoor@northstar.io', event: 'New device detected', location: 'Singapore, SG', time: '42 min ago', score: 56, risk: 'medium' },
  { initials: 'MR', name: 'Maya Rivera', email: 'm.rivera@northstar.io', event: 'Unusual login time', location: 'Austin, US', time: '1 hr ago', score: 38, risk: 'medium' },
]

const events = [
  { icon: ShieldAlert, tone: 'red', title: 'High-risk login blocked', detail: 'Credential stuffing · Bucharest, RO', time: '2 min ago' },
  { icon: Fingerprint, tone: 'blue', title: 'Step-up verification passed', detail: 'Maya Rivera · Austin, US', time: '11 min ago' },
  { icon: MapPin, tone: 'amber', title: 'Impossible travel detected', detail: 'Sofia Laurent · Lagos, NG', time: '18 min ago' },
  { icon: Laptop, tone: 'violet', title: 'New device fingerprint', detail: 'Arjun Kapoor · Singapore, SG', time: '42 min ago' },
]

const routeTitles = Object.fromEntries(navigation.map(({ id, label }) => [id, label]))

function routeFromHash() {
  const route = window.location.hash.replace(/^#\/?/, '')
  return routeTitles[route] ? route : (route === 'signup' || route === 'login' ? route : 'overview')
}

function Brand({ collapsed = false }) {
  return (
    <div className={`brand ${collapsed ? 'brand-collapsed' : ''}`}>
      <span className="brand-mark"><ShieldCheck size={21} strokeWidth={2.2} /></span>
      {!collapsed && <span className="brand-copy"><strong>LoginShield</strong><small>IDENTITY DEFENSE</small></span>}
    </div>
  )
}

function RiskPill({ level }) {
  return <span className={`risk-pill ${level}`}><span />{level}</span>
}

function Avatar({ initials, tone = '' }) {
  return <span className={`avatar ${tone}`}>{initials}</span>
}

function MetricCard({ label, value, change, icon: Icon, tone, note }) {
  return (
    <article className="metric-card">
      <div className="metric-top"><span className={`metric-icon ${tone}`}><Icon size={18} /></span><span className="metric-change"><ArrowUpRight size={13} />{change}</span></div>
      <p>{label}</p>
      <div className="metric-value">{value}</div>
      <span className="metric-note">{note}</span>
    </article>
  )
}

function LoginChart() {
  return (
    <div className="activity-chart">
      <div className="chart-legend"><span><i className="legend-blue" />Successful</span><span><i className="legend-violet" />Flagged</span></div>
      <div className="chart-plot">
        <div className="chart-y-labels"><span>1.2k</span><span>900</span><span>600</span><span>300</span><span>0</span></div>
        <div className="chart-area">
          {[0, 1, 2, 3, 4].map((line) => <div className="chart-gridline" key={line} />)}
          <svg className="chart-svg" viewBox="0 0 720 180" preserveAspectRatio="none" role="img" aria-label="Login activity trend over the last 24 hours">
            <defs>
              <linearGradient id="areaBerry" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--berry)" stopOpacity=".28" /><stop offset="100%" stopColor="var(--berry)" stopOpacity="0" /></linearGradient>
              <linearGradient id="lineBerry" x1="0" x2="1"><stop stopColor="var(--burgundy)" /><stop offset="100%" stopColor="var(--berry)" /></linearGradient>
            </defs>
            <path d="M0 130 C40 122 45 82 90 98 S145 117 178 78 S222 94 260 71 S300 95 344 61 S385 77 418 55 S465 75 499 45 S540 70 580 48 S624 66 660 27 S695 43 720 18 V180 H0Z" fill="url(#areaBerry)" />
            <path d="M0 130 C40 122 45 82 90 98 S145 117 178 78 S222 94 260 71 S300 95 344 61 S385 77 418 55 S465 75 499 45 S540 70 580 48 S624 66 660 27 S695 43 720 18" fill="none" stroke="url(#lineBerry)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <path d="M0 159 C40 155 53 141 90 150 S148 158 178 142 S226 152 260 138 S306 148 344 134 S393 146 418 127 S462 141 499 130 S548 144 580 123 S626 136 660 113 S690 123 720 102" fill="none" stroke="var(--berry)" strokeWidth="2" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
            <circle cx="499" cy="45" r="4" fill="var(--ivory)" stroke="var(--burgundy)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="chart-x-labels"><span>12 AM</span><span>4 AM</span><span>8 AM</span><span>12 PM</span><span>4 PM</span><span>8 PM</span><span>Now</span></div>
        </div>
      </div>
    </div>
  )
}

function RiskDistribution() {
  return (
    <div className="distribution-content">
      <div className="donut-wrap">
        <svg viewBox="0 0 140 140" role="img" aria-label="Risk distribution: 72 percent low, 20 percent medium, 8 percent high">
          <circle cx="70" cy="70" r="52" fill="none" stroke="var(--border)" strokeWidth="15" />
          <circle cx="70" cy="70" r="52" fill="none" stroke="var(--green)" strokeWidth="15" strokeDasharray="235 327" strokeDashoffset="0" transform="rotate(-90 70 70)" />
          <circle cx="70" cy="70" r="52" fill="none" stroke="var(--amber)" strokeWidth="15" strokeDasharray="65 327" strokeDashoffset="-239" transform="rotate(-90 70 70)" />
          <circle cx="70" cy="70" r="52" fill="none" stroke="var(--red)" strokeWidth="15" strokeDasharray="25 327" strokeDashoffset="-308" transform="rotate(-90 70 70)" />
        </svg>
        <div className="donut-center"><strong>1,284</strong><span>total logins</span></div>
      </div>
      <div className="distribution-legend">
        <div><span><i className="risk-dot low" />Low risk</span><strong>72% <small>924</small></strong></div>
        <div><span><i className="risk-dot medium" />Medium risk</span><strong>20% <small>257</small></strong></div>
        <div><span><i className="risk-dot high" />High risk</span><strong>8% <small>103</small></strong></div>
      </div>
    </div>
  )
}

function IncidentTable({ compact = false }) {
  const shown = compact ? incidents.slice(0, 4) : incidents
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>USER</th><th>DETECTION</th><th>LOCATION</th><th>RISK SCORE</th><th>STATUS</th><th /></tr></thead>
        <tbody>{shown.map((incident) => (
          <tr key={incident.email}>
            <td><div className="user-cell"><Avatar initials={incident.initials} /><span><strong>{incident.name}</strong><small>{incident.email}</small></span></div></td>
            <td>{incident.event}</td><td className="location-cell"><MapPin size={13} />{incident.location}</td>
            <td><div className="score-cell"><strong>{incident.score}</strong><span className={`score-track ${incident.risk}`}><i style={{ width: `${incident.score}%` }} /></span></div></td>
            <td><RiskPill level={incident.risk} /></td>
            <td><button className="icon-button row-action" aria-label={`More actions for ${incident.name}`}><MoreHorizontal size={17} /></button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  )
}

function Dashboard({ navigate }) {
  const [range, setRange] = useState('24 hours')
  return (
    <div className="page-content">
      <section className="page-heading dashboard-heading">
        <div><div className="eyebrow-line"><span className="live-dot" />SECURITY OPERATIONS CENTER</div><h1>Security Overview</h1><p>Monitor login activity, investigate suspicious behaviour, and understand risk in real time.</p></div>
        <button className="button secondary range-button"><Clock3 size={15} /><select aria-label="Dashboard time range" value={range} onChange={(event) => setRange(event.target.value)}><option>24 hours</option><option>7 days</option><option>30 days</option></select><ChevronDown size={14} /></button>
      </section>
      <section className="metric-grid">
        <MetricCard label="Total Login Attempts" value="1,284" change="+12.8%" note="vs. previous period" icon={Activity} tone="blue" />
        <MetricCard label="Suspicious Logins" value="36" change="+4.3%" note="across 14 users" icon={ShieldAlert} tone="amber" />
        <MetricCard label="High-Risk Incidents" value="07" change="−2.1%" note="3 require attention" icon={Siren} tone="red" />
        <MetricCard label="Step-Up Verifications" value="112" change="+8.6%" note="96% completion rate" icon={Fingerprint} tone="violet" />
      </section>
      <section className="visual-grid">
        <article className="card chart-card">
          <div className="card-heading"><div><h2>Login activity</h2><p>Authentication attempts across your workspace</p></div><button className="icon-button" aria-label="More chart options"><MoreHorizontal size={18} /></button></div>
          <LoginChart />
        </article>
        <article className="card distribution-card">
          <div className="card-heading"><div><h2>Risk distribution</h2><p>Login attempts by assessed risk level</p></div><button className="icon-button" aria-label="More risk options"><MoreHorizontal size={18} /></button></div>
          <RiskDistribution />
        </article>
      </section>
      <section className="dashboard-bottom">
        <article className="card incidents-card">
          <div className="card-heading"><div><h2>Recent incidents <span className="count-badge">07</span></h2><p>Events that may need your attention</p></div><button className="text-link" onClick={() => navigate('incidents')}>View all <ArrowRight size={14} /></button></div>
          <IncidentTable compact />
        </article>
        <aside className="right-rail">
          <article className="card events-card">
            <div className="card-heading"><div><h2>Latest security events</h2><p>Live signals from your environment</p></div><span className="live-label"><i />LIVE</span></div>
            <div className="event-list">{events.map(({ icon: Icon, tone, title, detail, time }) => <div className="event-item" key={title}><span className={`event-icon ${tone}`}><Icon size={15} /></span><div><strong>{title}</strong><p>{detail}</p><small>{time}</small></div></div>)}</div>
          </article>
          <article className="card quick-card">
            <div className="card-heading"><div><h2>Quick actions</h2><p>Jump into your security tools</p></div></div>
            <div className="quick-actions">
              <button onClick={() => navigate('simulator')}><span className="quick-icon blue"><Play size={15} /></span>Simulate login<ArrowRight size={14} /></button>
              <button onClick={() => navigate('incidents')}><span className="quick-icon red"><Siren size={15} /></span>Review incidents<ArrowRight size={14} /></button>
              <button onClick={() => navigate('honeypot')}><span className="quick-icon violet"><Bot size={15} /></span>Open honeypot<ArrowRight size={14} /></button>
              <button onClick={() => navigate('replay')}><span className="quick-icon amber"><RefreshCw size={15} /></span>Start replay<ArrowRight size={14} /></button>
            </div>
          </article>
        </aside>
      </section>
    </div>
  )
}

function Simulator({ onSimulate }) {
  const [result, setResult] = useState(null)
  const options = [
    { id: 'normal', title: 'Trusted sign-in', description: 'Known device · Familiar location · Typical hours', score: 8, level: 'low', icon: ShieldCheck },
    { id: 'unusual', title: 'Unusual sign-in', description: 'New device · Unfamiliar location · Off-hours', score: 54, level: 'medium', icon: AlertTriangle },
    { id: 'attack', title: 'Credential attack', description: 'Repeated failures · Anonymous proxy · New device', score: 94, level: 'high', icon: ShieldAlert },
  ]
  return (
    <div className="page-content">
      <PageHeading eyebrow="DETECTION PLAYGROUND" title="Login Simulator" description="Explore how LoginShield evaluates authentication signals. All activity here is synthetic and stays in this demo." />
      <div className="simulator-layout">
        <article className="card simulator-main"><div className="card-heading"><div><h2>Choose a scenario</h2><p>Run a sample login through the risk engine</p></div><span className="demo-tag"><Sparkles size={13} /> DEMO DATA</span></div>
          <div className="scenario-list">{options.map((option) => <button className={`scenario-option ${result?.id === option.id ? 'selected' : ''}`} key={option.id} onClick={() => { setResult(option); onSimulate(option) }}><span className={`scenario-symbol ${option.level}`}><option.icon size={19} /></span><span className="scenario-copy"><strong>{option.title}</strong><small>{option.description}</small></span><span className="scenario-score"><strong>{option.score}</strong><small>/100 risk</small></span><ChevronRight size={17} /></button>)}</div>
          {result ? <div className={`simulation-result ${result.level}`}><div className="result-heading"><span className={`result-icon ${result.level}`}><result.icon size={18} /></span><div><strong>{result.title} assessed</strong><p>Risk score {result.score}/100 · {result.level} risk</p></div><Check size={17} /></div><div className="result-bar"><i style={{ width: `${result.score}%` }} /></div><p className="result-disclaimer">Demonstration only. No authentication request was made and no account was accessed.</p></div> : <div className="simulator-empty"><Radar size={21} /><span>Select a scenario above to view its risk assessment.</span></div>}
        </article>
        <aside className="card signal-card"><span className="signal-art"><Radar size={32} /></span><span className="eyebrow">EXPLAINABLE SECURITY</span><h2>Every decision has a reason.</h2><p>See how device reputation, location, behavior, and threat intelligence combine into a transparent risk score.</p><div className="signal-list"><span><Check size={14} />Device fingerprint</span><span><Check size={14} />Location intelligence</span><span><Check size={14} />Behavioral signals</span><span><Check size={14} />Threat patterns</span></div></aside>
      </div>
    </div>
  )
}

function PageHeading({ eyebrow = 'SECURITY WORKSPACE', title, description, action }) {
  return <section className="page-heading"><div><div className="eyebrow-line">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</section>
}

const sectionContent = {
  analytics: { eyebrow: 'THREAT INTELLIGENCE', title: 'Risk Analytics', description: 'Understand risk patterns across authentication activity and spot emerging threats.', metrics: [['Average risk score', '18.4', '↓ 3.2% this week'], ['Risky sign-ins', '103', '8% of total attempts'], ['New device rate', '12.6%', 'Across active accounts']], icon: Activity, chart: true },
  incidents: { eyebrow: 'INVESTIGATION QUEUE', title: 'Incidents', description: 'Review, prioritize, and investigate suspicious authentication activity.', metrics: [['Open incidents', '07', '3 need attention'], ['High severity', '02', '1 opened today'], ['Mean response time', '8m 24s', '↓ 12% this week']], icon: Siren, table: true },
  travel: { eyebrow: 'LOCATION INTELLIGENCE', title: 'Impossible Travel', description: 'Identify sign-ins from locations that cannot be reached in the observed time window.', metrics: [['Travel alerts', '12', 'Last 7 days'], ['Users affected', '08', '2 repeat detections'], ['Confirmed threats', '03', '25% confirmation rate']], icon: Globe2, table: true },
  devices: { eyebrow: 'NETWORK INTELLIGENCE', title: 'Device & IP Monitoring', description: 'Track device fingerprints, network reputation, and changes in sign-in context.', metrics: [['Known devices', '486', 'Across 128 users'], ['Untrusted IPs', '19', '4 currently active'], ['New fingerprints', '28', 'Last 24 hours']], icon: Network, table: true },
  mfa: { eyebrow: 'IDENTITY ASSURANCE', title: 'MFA Verification', description: 'Review step-up challenges, completion rates, and verification outcomes.', metrics: [['Challenges today', '112', '↑ 8.6% this period'], ['Completion rate', '96.2%', 'Above 95% target'], ['Pending challenges', '04', 'Awaiting response']], icon: Fingerprint, table: true },
  honeypot: { eyebrow: 'DECEPTION TECHNOLOGY', title: 'Honeypot Lab', description: 'Monitor decoy services and safely explore simulated attacker interactions.', metrics: [['Active sensors', '04', 'All systems operational'], ['Interactions', '37', 'Last 24 hours'], ['Unique sources', '11', 'Across 6 regions']], icon: Bot, table: true },
  replay: { eyebrow: 'THREAT SIMULATION', title: 'Attack Replay', description: 'Replay synthetic attack patterns to understand how detection controls respond.', metrics: [['Saved scenarios', '06', 'Ready to replay'], ['Last replay', 'Today, 10:42 AM', 'Credential stuffing'], ['Detection coverage', '94%', 'Across replay signals']], icon: RefreshCw, replay: true },
  honeytokens: { eyebrow: 'DECEPTION TECHNOLOGY', title: 'Honeytokens', description: 'Manage synthetic decoy credentials and receive alerts when they are interacted with.', metrics: [['Active tokens', '09', 'All monitored'], ['Triggered', '02', 'This month'], ['Coverage', '6 locations', 'Across demo workspace']], icon: KeyRound, table: true },
  audit: { eyebrow: 'COMPLIANCE & GOVERNANCE', title: 'Audit Logs', description: 'Search the chronological record of security signals and workspace activity.', metrics: [['Events recorded', '8,492', 'Last 30 days'], ['Admin actions', '28', 'This week'], ['Export status', 'Available', 'Synthetic demo data']], icon: Clock3, table: true },
  settings: { eyebrow: 'WORKSPACE CONFIGURATION', title: 'Settings', description: 'Manage workspace preferences and your demo environment.', metrics: [], settings: true },
}

function GenericPage({ page, navigate, onSimulate }) {
  const content = sectionContent[page]
  if (page === 'simulator') return <Simulator onSimulate={onSimulate} />
  if (content.settings) return <SettingsPage />
  return (
    <div className="page-content">
      <PageHeading eyebrow={content.eyebrow} title={content.title} description={content.description} action={content.replay ? <button className="button primary" onClick={() => navigate('simulator')}><Play size={15} />Run demo replay</button> : page === 'honeytokens' ? <button className="button primary" onClick={() => window.alert('Demo only: token creation is not connected to a backend.')}><Plus size={15} />Create token</button> : null} />
      <div className="section-metrics">{content.metrics.map(([label, value, note], index) => <article className="card section-metric" key={label}><span className={`section-metric-icon tone-${index}`}><content.icon size={17} /></span><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</div>
      {content.chart && <div className="card section-chart"><div className="card-heading"><div><h2>Risk score trend</h2><p>Average login risk over the last 7 days</p></div><span className="chart-period">LAST 7 DAYS</span></div><LoginChart /></div>}
      {content.replay && <div className="replay-grid">{['Credential stuffing', 'Impossible travel', 'Password spraying'].map((name, index) => <article className="card replay-item" key={name}><div className={`replay-art art-${index}`}><content.icon size={22} /></div><div><span className="eyebrow">SYNTHETIC SCENARIO 0{index + 1}</span><h2>{name}</h2><p>{['Repeated login attempts from rotating proxies', 'Rapid sign-ins across distant regions', 'Low-and-slow password guessing pattern'][index]}</p></div><button className="button secondary" onClick={() => navigate('simulator')}><Play size={14} />Preview</button></article>)}</div>}
      {content.table && <article className="card incidents-card section-table"><div className="card-heading"><div><h2>{page === 'incidents' ? 'Incident queue' : page === 'audit' ? 'Recent audit events' : page === 'honeypot' ? 'Recent sensor interactions' : page === 'honeytokens' ? 'Token activity' : page === 'mfa' ? 'Recent verification events' : page === 'travel' ? 'Recent travel detections' : 'Recently observed activity'}</h2><p>Demo workspace · Synthetic activity</p></div><button className="button secondary small-button" onClick={() => navigate('overview')}><ArrowRight size={14} />Overview</button></div><IncidentTable /></article>}
      <div className="demo-notice"><ShieldCheck size={16} /><span><strong>Demo environment</strong> — All activity and metrics shown on this page are synthetic examples.</span></div>
    </div>
  )
}

function SettingsPage() {
  return <div className="page-content"><PageHeading eyebrow="WORKSPACE CONFIGURATION" title="Settings" description="Manage workspace preferences and your demo environment." />
    <div className="settings-grid">
      <article className="card settings-panel"><h2>Workspace profile</h2><p>Basic details for your LoginShield demo workspace.</p><label>Workspace name<input defaultValue="Northstar Security" /></label><label>Workspace URL<input defaultValue="northstar.loginshield.demo" readOnly /></label><label>Timezone<select defaultValue="UTC−05:00 Eastern Time"><option>UTC−05:00 Eastern Time</option><option>UTC</option><option>UTC+00:00 London</option></select></label><button className="button primary" onClick={() => window.alert('Demo mode: workspace changes are not saved.')}>Save changes</button></article>
      <article className="card settings-panel"><h2>Security preferences</h2><p>Adjust demo alert and workspace behavior.</p><ToggleRow title="High-risk login alerts" description="Show a notification when a high-risk login is detected." defaultChecked /><ToggleRow title="Step-up verification" description="Prompt for additional verification on medium-risk events." defaultChecked /><ToggleRow title="Weekly security digest" description="Include a synthetic activity summary in your dashboard." /><div className="inline-disclaimer"><CircleHelp size={15} />Preferences are preview-only in this demo.</div></article>
    </div>
  </div>
}

function ToggleRow({ title, description, defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked)
  return <div className="toggle-row"><div><strong>{title}</strong><p>{description}</p></div><button className={`toggle ${checked ? 'on' : ''}`} onClick={() => setChecked(!checked)} role="switch" aria-checked={checked} aria-label={title}><span /></button></div>
}

function AuthScreen({ mode, navigate, onDemo }) {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const signup = mode === 'signup'
  function submit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') || '').trim()
    const password = data.get('password') || ''
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address to continue.')
      return
    }
    if (signup && !String(data.get('name') || '').trim()) {
      setError('Enter your full name to create a demo account.')
      return
    }
    if (signup && password !== data.get('confirmPassword')) {
      setError('Passwords do not match. Please check and try again.')
      return
    }
    if (signup && !data.get('terms')) {
      setError('Please accept the demo terms to continue.')
      return
    }
    if (password.length < 8) {
      setError('Use a password with at least 8 characters.')
      return
    }
    setSuccess(signup ? 'Demo account created for this session.' : 'Signed in to the demo for this session.')
    window.setTimeout(onDemo, 700)
  }
  return (
    <main className="auth-layout">
      <section className="auth-form-side"><div className="auth-brand" onClick={() => navigate('overview')}><Brand /></div><div className="auth-form-wrap">
        <div className="auth-overline"><ShieldCheck size={14} /> LOGINSHIELD DEMO ENVIRONMENT</div><h1>{signup ? 'Create your account' : 'Welcome back'}</h1><p className="auth-subtitle">{signup ? 'Start exploring identity security with your demo workspace.' : 'Sign in to your security workspace to continue.'}</p>
        <div className="demo-callout"><span><Sparkles size={16} /></span><p><strong>Explore with demo access</strong><small>Use the demo option to enter without creating an account.</small></p><button onClick={onDemo}>Enter demo <ArrowRight size={14} /></button></div>
        <div className="form-divider"><span>or {signup ? 'create an account' : 'sign in with email'}</span></div>
        <form className="auth-form" onSubmit={submit} noValidate>
          {signup && <label>Full name<div className="input-wrap"><UserRound size={16} /><input name="name" placeholder="Your full name" autoComplete="name" required /></div></label>}
          <label>Email address<div className="input-wrap"><User size={16} /><input name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></div></label>
          <label>Password<div className="input-wrap"><LockKeyhole size={16} /><input name="password" type={showPassword ? 'text' : 'password'} placeholder="At least 8 characters" autoComplete={signup ? 'new-password' : 'current-password'} minLength="8" required /><button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
          {signup && <><PasswordStrength /><label>Confirm password<div className="input-wrap"><LockKeyhole size={16} /><input name="confirmPassword" type={showPassword ? 'text' : 'password'} placeholder="Re-enter your password" autoComplete="new-password" required /></div></label><label className="terms-check"><input type="checkbox" name="terms" /><span>I agree to the demo <button type="button" onClick={() => setError('This demo does not collect or retain your personal data.')}>terms and privacy notice</button>.</span></label></>}
          {!signup && <div className="auth-options"><label className="remember-check"><input type="checkbox" name="remember" /><span>Remember me</span></label><button type="button" className="text-link" onClick={() => setError('Password recovery is unavailable in this demo. Use demo access to explore.')}>Forgot password?</button></div>}
          {error && <p className="form-message error-message" role="alert"><AlertTriangle size={14} />{error}</p>}
          {success && <p className="form-message success-message" role="status"><Check size={14} />{success}</p>}
          <button className="button primary auth-submit" type="submit">{signup ? 'Create demo account' : 'Sign in'}<ArrowRight size={16} /></button>
        </form>
        <p className="auth-switch">{signup ? 'Already have an account?' : 'New to LoginShield?'} <button onClick={() => navigate(signup ? 'login' : 'signup')}>{signup ? 'Sign in' : 'Create account'}</button></p>
        <div className="auth-disclaimer"><LockKeyhole size={13} />Demo only — frontend authentication is not secure and must not be used for real accounts. Passwords are never stored or sent to a server.</div>
      </div><div className="auth-footer">© 2026 LoginShield <span>·</span> Identity security, made clear.</div></section>
      <aside className="auth-visual"><div className="auth-visual-grid" /><div className="visual-top"><Brand /><span className="demo-tag"><span className="live-dot" />DEMO ENVIRONMENT</span></div><div className="visual-center"><div className="security-orbit orbit-one" /><div className="security-orbit orbit-two" /><div className="security-core"><ShieldCheck size={52} strokeWidth={1.35} /></div><span className="orbit-node node-one"><Fingerprint size={17} /></span><span className="orbit-node node-two"><Globe2 size={17} /></span><span className="orbit-node node-three"><Activity size={17} /></span><span className="orbit-node node-four"><LockKeyhole size={16} /></span></div><div className="visual-copy"><span className="eyebrow">SECURITY THAT THINKS AHEAD</span><h2>Every identity.<br />Every signal.<br /><span>One clear picture.</span></h2><p>Know what’s happening across your login surface — and why it matters.</p><div className="visual-status"><span className="live-dot" />DETECTION SYSTEMS OPERATIONAL <span>·</span> ALL REGIONS</div></div><div className="visual-foot"><span>01 / 03</span><div><i /><i /><i /></div><span>IDENTITY DEFENSE PLATFORM</span></div></aside>
    </main>
  )
}

function PasswordStrength() {
  const [value, setValue] = useState('')
  useEffect(() => {
    const input = document.querySelector('input[name="password"]')
    if (!input) return undefined
    const update = () => setValue(input.value)
    input.addEventListener('input', update)
    return () => input.removeEventListener('input', update)
  }, [])
  const strength = value.length < 1 ? 0 : value.length < 8 ? 1 : value.length < 12 ? 2 : 3
  return <div className="password-strength"><div className="strength-bars">{[0, 1, 2, 3].map((bar) => <i className={bar < strength ? `strength-${strength}` : ''} key={bar} />)}</div><span>{['Use 8 or more characters', 'Weak', 'Fair', 'Strong'][strength]}</span></div>
}

function App() {
  const [page, setPage] = useState(routeFromHash)
  const [collapsed, setCollapsed] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [notificationCount, setNotificationCount] = useState(3)
  const [simulations, setSimulations] = useState(0)

  useEffect(() => {
    const onHashChange = () => setPage(routeFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (window.location.hash !== `#/${page}`) window.location.hash = `/${page}`
  }, [page])

  const navigate = (destination) => {
    setPage(destination)
    setDrawerOpen(false)
    setMenuOpen(false)
  }

  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const value = search.toLowerCase()
    return [...navigation.filter((item) => item.label.toLowerCase().includes(value)).map((item) => ({ label: item.label, detail: 'Navigate to section', route: item.id })), ...incidents.filter((item) => `${item.name} ${item.event} ${item.location}`.toLowerCase().includes(value)).map((item) => ({ label: item.name, detail: `${item.event} · ${item.location}`, route: 'incidents' }))].slice(0, 5)
  }, [search])

  if (page === 'login' || page === 'signup') return <AuthScreen key={page} mode={page} navigate={navigate} onDemo={() => navigate('overview')} />

  const currentTitle = routeTitles[page] || 'Overview'
  const sidebarClass = `sidebar ${collapsed ? 'collapsed' : ''} ${drawerOpen ? 'drawer-open' : ''}`
  return (
    <div className="app-shell">
      {drawerOpen && <button className="drawer-scrim" aria-label="Close navigation menu" onClick={() => setDrawerOpen(false)} />}
      <aside className={sidebarClass}>
        <div className="sidebar-brand"><Brand collapsed={collapsed} /><button className="icon-button collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}</button><button className="icon-button close-drawer" onClick={() => setDrawerOpen(false)} aria-label="Close navigation"><X size={18} /></button></div>
        <div className="workspace-switch"><span className="workspace-mark">N</span>{!collapsed && <><span><strong>Northstar Security</strong><small>DEMO WORKSPACE</small></span><ChevronDown size={14} /></>}</div>
        <nav className="main-navigation" aria-label="Main navigation">{navigation.map((item) => <div key={item.id}>{item.section && <div className="nav-section-label">{!collapsed && item.section}</div>}<button className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)} title={collapsed ? item.label : undefined}><item.icon size={17} strokeWidth={1.8} /><span className="nav-label">{item.label}</span>{item.count && !collapsed && <span className="nav-count">{item.count}</span>}</button></div>)}</nav>
        <div className="sidebar-bottom">
          <button className="nav-item sidebar-account-link" onClick={() => navigate('settings')} title={collapsed ? 'Account settings' : undefined}><Settings size={16} /><span className="nav-label">Account settings</span></button>
          <button className="nav-item sidebar-account-link" onClick={() => navigate('login')} title={collapsed ? 'Sign out' : undefined}><LogOut size={16} /><span className="nav-label">Sign out</span></button>
          <div className={`sidebar-user ${collapsed ? 'user-collapsed' : ''}`}><Avatar initials="AC" tone="profile-avatar" />{!collapsed && <span><strong>Alex Chen</strong><small>Security admin</small></span>}{!collapsed && <button className="icon-button user-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open account menu"><MoreHorizontal size={17} /></button>}</div>
        </div>
      </aside>
      <div className={`main-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <header className="topbar">
          <div className="topbar-start"><button className="icon-button mobile-menu" aria-label="Open navigation" onClick={() => setDrawerOpen(true)}><Menu size={19} /></button><div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{currentTitle}</strong></div></div>
          <div className="topbar-tools">
            <div className="search-box"><Search size={15} /><input aria-label="Search workspace" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd>{search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search"><X size={13} /></button>}{searchResults.length > 0 && <div className="search-results">{searchResults.map((result) => <button key={`${result.label}-${result.route}`} onClick={() => { navigate(result.route); setSearch('') }}><Search size={14} /><span><strong>{result.label}</strong><small>{result.detail}</small></span><ArrowRight size={13} /></button>)}</div>}{search && searchResults.length === 0 && <div className="search-results empty-search">No matching pages or incidents.</div>}</div>
            <span className="topbar-demo"><i />DEMO ENVIRONMENT</span><div className="popover-holder"><button className={`icon-button notification-button ${notificationsOpen ? 'tool-active' : ''}`} aria-label="Notifications" onClick={() => { setNotificationsOpen(!notificationsOpen); setMenuOpen(false) }}><Bell size={17} />{notificationCount > 0 && <i className="notification-dot" />}</button>{notificationsOpen && <div className="popover notifications-popover"><div className="popover-heading"><strong>Notifications</strong><button className="text-link" onClick={() => setNotificationCount(0)}>Mark all read</button></div>{events.slice(0, 3).map((event) => <div className="notification-row" key={event.title}><span className={`event-icon ${event.tone}`}><event.icon size={14} /></span><span><strong>{event.title}</strong><small>{event.time}</small></span></div>)}</div>}</div>
            <div className="popover-holder"><button className="topbar-profile" onClick={() => { setMenuOpen(!menuOpen); setNotificationsOpen(false) }}><Avatar initials="AC" tone="profile-avatar" /><span><strong>Alex Chen</strong><small>Admin</small></span><ChevronDown size={14} /></button>{menuOpen && <div className="popover account-popover"><button onClick={() => { setMenuOpen(false); window.alert('Alex Chen · Security admin · Demo workspace') }}><UserRound size={15} />Profile</button><button onClick={() => navigate('settings')}><Settings size={15} />Account settings</button><button onClick={() => navigate('login')}><LogOut size={15} />Sign out</button></div>}</div>
          </div>
        </header>
        <main className="main-content">{page === 'overview' ? <Dashboard navigate={navigate} /> : <GenericPage page={page} navigate={navigate} onSimulate={() => setSimulations((count) => count + 1)} />}</main>
        <footer className="app-footer"><span><Shield size={13} />LoginShield <span className="footer-dot">·</span> Security through explainable decisions</span><span>DEMO DATA ONLY <span className="footer-dot">·</span> {simulations} simulations this session</span></footer>
      </div>
    </div>
  )
}

export default App
