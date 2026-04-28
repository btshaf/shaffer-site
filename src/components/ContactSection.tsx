'use client';

import { useState } from 'react';

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

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
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Please enter your name' : '';
      case 'email':
        if (value.trim() === '') return 'Please enter your email address';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'message':
        return value.trim() === '' ? 'Please enter your message' : '';
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};
    
    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.message = validateField('message', formData.message);
    
    // Remove empty error messages
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key as keyof FieldErrors]) {
        delete newErrors[key as keyof FieldErrors];
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all required fields as touched
    setTouched({ name: true, email: true, message: true });
    
    if (!validateForm()) {
      return;
    }
    
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
        const result = await response.json();
        console.log('Contact form success:', result);
        setStatus('success');
        setFormData({ name: '', email: '', company: '', subject: 'Portfolio Inquiry', message: '', honeypot: '' });
        setErrors({});
        setTouched({});
      } else {
        const errorResult = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Contact form error:', response.status, errorResult);
        console.error('Form data sent:', formData);
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact form exception:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FieldErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
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
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="body-strong text-text block mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-md bg-bg text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${
                      touched.name && errors.name 
                        ? 'border-error-border focus:ring-error/20' 
                        : 'border-border'
                    }`}
                  />
                  {touched.name && errors.name && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-shrink-0">
                        <svg className="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="small text-error">{errors.name}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="body-strong text-text block mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-md bg-bg text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors ${
                      touched.email && errors.email 
                        ? 'border-error-border focus:ring-error/20' 
                        : 'border-border'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-shrink-0">
                        <svg className="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="small text-error">{errors.email}</span>
                    </div>
                  )}
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
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-md bg-bg text-text focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-vertical transition-colors ${
                    touched.message && errors.message 
                      ? 'border-error-border focus:ring-error/20' 
                      : 'border-border'
                  }`}
                  placeholder="Tell me about the role, your team, or what you're looking to discuss..."
                />
                {touched.message && errors.message && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-shrink-0">
                      <svg className="w-4 h-4 text-error" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="small text-error">{errors.message}</span>
                  </div>
                )}
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
                <div className="bg-surface-alt border border-border-strong rounded-md p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="body-strong text-text">Message sent successfully</p>
                      <p className="small text-text-muted mt-1">Thanks for reaching out! I'll get back to you soon.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {status === 'error' && (
                <div className="bg-error-bg border border-error-border rounded-md p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-error" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="body-strong text-error">Unable to send message</p>
                      <p className="small text-text-muted mt-1">Please try again or contact me through LinkedIn.</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}