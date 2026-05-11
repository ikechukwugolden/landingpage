/* Reset & Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background-color: #ffffff;
  color: #1a1a1a;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  font-family: inherit;
}

img {
  max-width: 100%;
  display: block;
}

/* Utility Classes */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.3s ease;
  padding: 1.5rem 0;
}

.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 0;
}

.navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #fbbf24, #d97706);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-weight: bold;
  font-size: 1.25rem;
  box-shadow: 0 4px 20px rgba(251, 191, 36, 0.3);
  transition: box-shadow 0.3s ease;
}

.brand:hover .brand-logo {
  box-shadow: 0 4px 30px rgba(251, 191, 36, 0.5);
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #000000;
  letter-spacing: -0.025em;
}

.nav-links {
  display: none;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: #525252;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #d97706;
}

.nav-cta {
  background-color: #000000;
  color: #fbbf24;
  padding: 0.625rem 1.25rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.nav-cta:hover {
  background-color: #1a1a1a;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.mobile-toggle {
  display: block;
  background: none;
  color: #000000;
  font-size: 1.5rem;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  padding: 1.5rem;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.mobile-menu.open {
  display: flex;
}

.mobile-link {
  color: #404040;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.mobile-link:hover {
  color: #d97706;
}

.mobile-cta {
  background-color: #000000;
  color: #fbbf24;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 700;
  text-align: center;
  margin-top: 0.5rem;
}

/* Hero Section */
.hero {
  position: relative;
  padding-top: 8rem;
  padding-bottom: 5rem;
  overflow: hidden;
  background-color: #ffffff;
}

@media (min-width: 1024px) {
  .hero {
    padding-top: 12rem;
    padding-bottom: 8rem;
  }
}

.hero-glow-1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 800px;
  height: 800px;
  background: rgba(251, 191, 36, 0.15);
  border-radius: 50%;
  filter: blur(120px);
  transform: translateY(-50%) translateX(33%);
  pointer-events: none;
}

.hero-glow-2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 600px;
  height: 600px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  filter: blur(100px);
  transform: translateY(33%) translateX(-25%);
  pointer-events: none;
}

.hero-grid {
  display: grid;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  color: #d97706;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: fit-content;
}

.ping-dot {
  position: relative;
  display: flex;
  height: 0.5rem;
  width: 0.5rem;
}

.ping-ring {
  position: absolute;
  display: inline-flex;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #fbbf24;
  opacity: 0.75;
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.ping-core {
  position: relative;
  display: inline-flex;
  border-radius: 50%;
  height: 0.5rem;
  width: 0.5rem;
  background-color: #d97706;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: #000000;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 4.5rem;
  }
}

.hero-gradient-text {
  background: linear-gradient(135deg, #fbbf24, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-lead {
  font-size: 1.125rem;
  color: #525252;
  max-width: 32rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .hero-actions {
    flex-direction: row;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #000000;
  color: #fbbf24;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #1a1a1a;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #ffffff;
  color: #000000;
  border: 2px solid #000000;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #000000;
  color: #fbbf24;
}

.hero-trust {
  padding-top: 1rem;
}

.hero-trust-text {
  font-size: 0.875rem;
  color: #737373;
  margin-bottom: 1rem;
}

.hero-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #404040;
  font-size: 0.875rem;
  font-weight: 500;
}

.highlight-icon {
  color: #fbbf24;
  width: 1rem;
  height: 1rem;
}

/* Hero Visual */
.hero-visual {
  position: relative;
}

.visual-glow {
  position: absolute;
  inset: -1rem;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(0, 0, 0, 0.1));
  border-radius: 1.5rem;
  opacity: 0.3;
  filter: blur(2rem);
}

.visual-card {
  position: relative;
  background-color: #ffffff;
  border: 2px solid #e5e5e5;
  border-radius: 1rem;
  aspect-ratio: 4 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.visual-placeholder {
  text-align: center;
  padding: 2rem;
}

.visual-icon-box {
  width: 5rem;
  height: 5rem;
  background-color: #f5f5f5;
  border-radius: 1rem;
  border: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.visual-icon {
  color: #fbbf24;
  width: 2.5rem;
  height: 2.5rem;
}

.visual-label {
  color: #404040;
  font-weight: 500;
}

.visual-sublabel {
  color: #737373;
  font-size: 0.875rem;
}

.visual-badge {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 0.75rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e5e5;
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.badge-icon {
  color: #fbbf24;
  width: 1.25rem;
  height: 1.25rem;
  fill: #fbbf24;
}

.status-bar {
  height: 0.375rem;
  width: 100%;
  background-color: #e5e5e5;
  border-radius: 9999px;
  overflow: hidden;
}

.status-fill {
  height: 100%;
  width: 100%;
  background-color: #fbbf24;
  border-radius: 9999px;
}

/* Stats Band */
.stats-band {
  padding: 3rem 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fafafa;
}

.stats-grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
}

.stat-badge {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: rgba(251, 191, 36, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d97706;
  font-weight: 700;
  font-size: 0.875rem;
}

.stat-text {
  color: #404040;
  font-weight: 500;
}

/* Section Base */
.section {
  padding: 6rem 0;
  background-color: #ffffff;
}

.section-intro {
  text-align: center;
  max-width: 48rem;
  margin: 0 auto 4rem;
}

.section-eyebrow {
  color: #d97706;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 3rem;
  }
}

.section-desc {
  font-size: 1.125rem;
  color: #525252;
}

/* Value Prop Cards */
.value-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .value-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.value-card {
  padding: 2rem;
  border-radius: 1rem;
  background-color: #ffffff;
  border: 2px solid #e5e5e5;
  transition: all 0.3s ease;
}

.value-card:hover {
  border-color: #fbbf24;
}

.value-icon-box {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;
}

.value-card:hover .value-icon-box {
  background-color: rgba(251, 191, 36, 0.15);
}

.value-icon {
  color: #737373;
  width: 1.5rem;
  height: 1.5rem;
  transition: color 0.3s ease;
}

.value-card:hover .value-icon {
  color: #d97706;
}

.value-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #000000;
}

/* Booking Cards */
.booking-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .booking-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .booking-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.booking-card {
  padding: 2rem;
  border-radius: 1rem;
  background-color: #ffffff;
  border: 2px solid #e5e5e5;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.booking-card:hover {
  border-color: #fbbf24;
  box-shadow: 0 10px 30px rgba(251, 191, 36, 0.1);
}

.booking-tag {
  display: inline-block;
  width: fit-content;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: rgba(251, 191, 36, 0.15);
  color: #d97706;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.booking-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 1rem;
}

.booking-text {
  color: #525252;
  margin-bottom: 2rem;
  flex: 1;
}

.booking-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #d97706;
  font-weight: 600;
  transition: color 0.3s ease;
}

.booking-action:hover {
  color: #000000;
}

.action-icon {
  width: 1rem;
  height: 1rem;
}

/* Feature Cards */
.features-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  padding: 2rem;
  border-radius: 1rem;
  background-color: #ffffff;
  border: 2px solid #e5e5e5;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: #fbbf24;
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.feature-icon-box {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #d97706;
  transition: background-color 0.3s ease;
}

.feature-card:hover .feature-icon-box {
  background-color: rgba(251, 191, 36, 0.15);
}

.feature-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 0.75rem;
}

.feature-text {
  color: #525252;
  line-height: 1.75;
}

/* Problem / Solution */
.split-section {
  padding: 6rem 0;
  background-color: #ffffff;
}

.split-grid {
  display: grid;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .split-grid {
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
  }
}

.problem-header {
  margin-bottom: 2rem;
}

.problem-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.problem-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  border: 2px solid #e5e5e5;
}

.problem-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #ef4444;
  flex-shrink: 0;
}

.problem-text {
  color: #404040;
  font-weight: 500;
}

.solution-panel {
  padding: 2.5rem;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #000000, #1a1a1a);
  border: 2px solid #fbbf24;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.solution-eyebrow {
  color: #fbbf24;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.solution-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.solution-text {
  color: #d4d4d4;
  font-size: 1.125rem;
  line-height: 1.75;
}

/* How It Works */
.steps-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .steps-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.step-card {
  position: relative;
  padding: 2rem;
  border-radius: 1rem;
  background-color: #ffffff;
  border: 2px solid #e5e5e5;
  transition: all 0.3s ease;
}

.step-card:hover {
  border-color: #fbbf24;
}

.step-number {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 3rem;
  font-weight: 700;
  color: #e5e5e5;
  transition: color 0.3s ease;
}

.step-card:hover .step-number {
  color: rgba(251, 191, 36, 0.3);
}

.step-content {
  position: relative;
  z-index: 10;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 0.75rem;
}

.step-text {
  color: #525252;
}

.step-connector {
  display: none;
}

@media (min-width: 1024px) {
  .step-connector {
    display: block;
    position: absolute;
    top: 50%;
    right: -0.75rem;
    width: 1.5rem;
    height: 1px;
    background-color: #e5e5e5;
  }
}

/* Positioning */
.positioning-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 768px) {
  .positioning-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.positioning-chip {
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: #000000;
  border: 2px solid #fbbf24;
  text-align: center;
  transition: all 0.3s ease;
}

.positioning-chip:hover {
  background-color: #1a1a1a;
  transform: translateY(-2px);
}

.chip-text {
  color: #fbbf24;
  font-weight: 600;
}

/* Why OMA */
.why-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .why-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .why-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.why-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  border: 2px solid #e5e5e5;
}

.why-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: rgba(251, 191, 36, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d97706;
  font-weight: 700;
  flex-shrink: 0;
}

.why-text {
  font-size: 1.125rem;
  color: #404040;
  font-weight: 500;
  padding-top: 0.125rem;
}

/* Emotional Close */
.emotional-grid {
  display: grid;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .emotional-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.quote-box {
  padding: 3rem;
  border-radius: 1.5rem;
  background: linear-gradient(135deg, #fbbf24, #d97706);
  color: #000000;
}

.quote-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
}

@media (min-width: 768px) {
  .quote-title {
    font-size: 2.25rem;
  }
}

.quote-author {
  font-weight: 500;
  opacity: 0.8;
}

.emotional-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.emotional-eyebrow {
  color: #d97706;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}

.emotional-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #000000;
  line-height: 1.3;
}

.emotional-text {
  font-size: 1.125rem;
  color: #525252;
  line-height: 1.75;
}

/* CTA */
.cta-section {
  position: relative;
  padding: 6rem 0;
  background-color: #000000;
  overflow: hidden;
}

.cta-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(251, 191, 36, 0.15), transparent);
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 10;
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
  padding: 0 1.5rem;
}

.cta-eyebrow {
  color: #fbbf24;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.cta-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .cta-title {
    font-size: 3.75rem;
  }
}

.cta-gradient {
  background: linear-gradient(135deg, #fbbf24, #fde68a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-desc {
  font-size: 1.25rem;
  color: #a3a3a3;
  margin-bottom: 2.5rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

@media (min-width: 640px) {
  .cta-actions {
    flex-direction: row;
  }
}

.cta-note {
  color: #737373;
  font-size: 0.875rem;
}

/* Taglines Marquee */
.taglines-section {
  padding: 3rem 0;
  background-color: #000000;
  border-top: 1px solid #262626;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  white-space: nowrap;
  animation: marquee 30s linear infinite;
}

.marquee-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #262626;
  margin: 0 2rem;
}

@media (min-width: 768px) {
  .marquee-text {
    font-size: 2.25rem;
  }
}

/* Footer */
.footer {
  background-color: #000000;
  padding-top: 5rem;
  padding-bottom: 2.5rem;
  border-top: 1px solid #262626;
}

.footer-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 4rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 2fr repeat(3, 1fr);
  }
}

.footer-brand {
  grid-column: span 2;
}

@media (min-width: 1024px) {
  .footer-brand {
    grid-column: span 2;
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.footer-logo-icon {
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #fbbf24, #d97706);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-weight: 700;
  font-size: 0.875rem;
}

.footer-logo-text {
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
}

.footer-desc {
  color: #a3a3a3;
  margin-bottom: 1.5rem;
  max-width: 20rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #1a1a1a;
  border: 1px solid #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a3a3a3;
  transition: all 0.3s ease;
}

.social-link:hover {
  color: #fbbf24;
  border-color: #fbbf24;
}

.social-icon {
  width: 1.125rem;
  height: 1.125rem;
}

.footer-heading {
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  font-size: 0.875rem;
  color: #a3a3a3;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #fbbf24;
}

.footer-bottom {
  border-top: 1px solid #262626;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
  }
}

.footer-copyright {
  color: #737373;
  font-size: 0.875rem;
}

.footer-contact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #737373;
  font-size: 0.875rem;
}

.contact-icon {
  width: 0.875rem;
  height: 0.875rem;
}

/* Responsive Nav */
@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }

  .mobile-toggle {
    display: none;
  }
}