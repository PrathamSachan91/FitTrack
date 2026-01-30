import { Link } from "react-router-dom";
import {Users, TrendingUp, Calendar, BarChart3, Shield, Zap, Target, Award } from "lucide-react";
import "./Landing.css";

function Landing() {
  const scrollToFeatures = (e) => {
    e.preventDefault();
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing">

      <section className="hero-section" data-testid="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            {/* Badge */}
            <span className="hero-badge" data-testid="hero-badge">
              🚀 Next-Gen Gym Management Platform
            </span>

            {/* Main Heading */}
            <h1 className="hero-title" data-testid="hero-title">
              <span className="hero-title-gradient">Manage Your Gym</span>
              <br />
              <span>Smarter 💪</span>
            </h1>

            {/* Subheading */}
            <p className="hero-description" data-testid="hero-description">
              Track members, monitor revenue, manage trainers, and grow your fitness
              business — all from one powerful dashboard.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons" data-testid="hero-buttons">
              <Link to="/login" className="btn btn-primary">
                Get Started
                <Zap className="lucide" />
              </Link>
              <button className="btn btn-secondary" onClick={scrollToFeatures}>
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats" data-testid="hero-stats">
              <div className="stat-item">
                <div className="stat-number orange">500+</div>
                <div className="stat-label">Active Gyms</div>
              </div>
              <div className="stat-item">
                <div className="stat-number purple">50K+</div>
                <div className="stat-label">Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number pink">99%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features" data-testid="features-section">
        <div className="features-bg"></div>
        
        <div className="features-container">
          <div className="features-header">
            <span className="features-badge" data-testid="features-badge">✨ Features</span>
            <h2 className="features-title" data-testid="features-title">Why Choose FitTrack?</h2>
            <p className="features-description" data-testid="features-description">
              Everything you need to run a successful fitness business, all in one place
            </p>
          </div>

          <div className="features-grid">
            {/* Feature Card 1 */}
            <div className="feature-card" data-testid="feature-card-admin">
              <div className="feature-icon orange">
                <BarChart3 />
              </div>
              <h3 className="feature-title">📊 Admin Control</h3>
              <p className="feature-description">
                Get full visibility into members, revenue, attendance, and system
                performance with real-time analytics and insights.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card purple" data-testid="feature-card-subadmin">
              <div className="feature-icon purple">
                <Users />
              </div>
              <h3 className="feature-title">🧑‍💼 Sub-Admin Management</h3>
              <p className="feature-description">
                Assign batches, manage approvals, and handle daily operations
                efficiently with role-based access control.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card pink" data-testid="feature-card-member">
              <div className="feature-icon pink">
                <Target />
              </div>
              <h3 className="feature-title">🏋️ Member Dashboard</h3>
              <p className="feature-description">
                Members can track workouts, plans, attendance, and subscription
                status easily with a personalized experience.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="feature-card blue" data-testid="feature-card-revenue">
              <div className="feature-icon blue">
                <TrendingUp />
              </div>
              <h3 className="feature-title">💰 Revenue Tracking</h3>
              <p className="feature-description">
                Monitor subscriptions, payments, and financial performance with
                detailed reports and automated billing.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="feature-card green" data-testid="feature-card-attendance">
              <div className="feature-icon green">
                <Calendar />
              </div>
              <h3 className="feature-title">📅 Smart Attendance</h3>
              <p className="feature-description">
                Automated check-in system with QR codes, real-time tracking, and
                attendance analytics for better insights.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="feature-card yellow" data-testid="feature-card-security">
              <div className="feature-icon yellow">
                <Shield />
              </div>
              <h3 className="feature-title">🔒 Secure & Reliable</h3>
              <p className="feature-description">
                Enterprise-grade security with encrypted data, regular backups, and
                99.9% uptime guarantee for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section" data-testid="testimonials-section">
        <div className="testimonial-container">
          <div className="testimonial-card">
            <div className="testimonial-bg-1"></div>
            <div className="testimonial-bg-2"></div>
            
            <div className="testimonial-content">
              <Award className="testimonial-icon" />
              <blockquote className="testimonial-quote">
                "FitTrack transformed how we manage our gym. Member retention increased by 40%!"
              </blockquote>
              <div>
                <div className="testimonial-author">Sarah Johnson</div>
                <div className="testimonial-role">Owner, PowerFit Gym</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-testid="cta-section">
        <div className="cta-container">
          <div className="cta-card">
            <div className="cta-overlay"></div>
            
            <div className="cta-content">
              <h2 className="cta-title" data-testid="cta-title">
                Ready to Transform Your Gym?
              </h2>
              <p className="cta-description" data-testid="cta-description">
                Join hundreds of gyms already using FitTrack to grow their business and delight their members.
              </p>
              <Link to="/login" className="btn-cta" data-testid="cta-button">
                Start Your Free Trial
                <Zap className="lucide" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Landing;