'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: 'Portfolio Inquiry',
    message: '',
    honeypot: '' // Hidden field for spam protection
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', subject: 'Portfolio Inquiry', message: '', honeypot: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="bg-surface border-t border-border">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="h2 text-text mb-6">Let's work together</h2>
            <p className="body text-text-subtle mb-8">
              I'm currently available for Senior Product Management roles in fintech, 
              financial operations, or adjacent industries. Let's discuss how I can 
              help drive your product forward.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="body-strong text-text mb-2">LinkedIn</h3>
                <a 
                  href="https://linkedin.com/in/bradshaffer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  linkedin.com/in/bradshaffer
                </a>
              </div>
              
              <div>
                <h3 className="body-strong text-text mb-2">Location</h3>
                <p className="text-text-subtle">Greater Phoenix, Arizona</p>
              </div>
              
              <div>
                <h3 className="body-strong text-text mb-2">Resume</h3>
                <a 
                  href="/Shaffer Brad - Resume - Product.pdf" 
                  target="_blank"
                  className="text-accent hover:text-accent-hover transition-colors"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="body-strong text-text block mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-md bg-bg text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="body-strong text-text block mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-md bg-bg text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="body-strong text-text block mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-md bg-bg text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="body-strong text-text block mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-md bg-bg text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-vertical"
                  placeholder="Tell me about the role, your team, or what you're looking to discuss..."
                />
              </div>
              
              {/* Honeypot field - hidden from users but visible to bots */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? 'Sending...' : 'Send message'}
              </button>
              
              {status === 'success' && (
                <div className="text-green-700 bg-green-50 border border-green-200 rounded-md p-4">
                  Thanks for reaching out! I'll get back to you soon.
                </div>
              )}
              
              {status === 'error' && (
                <div className="text-red-700 bg-red-50 border border-red-200 rounded-md p-4">
                  Sorry, there was an error sending your message. Please try again or reach out directly at brad@bshaffer.co.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}