'use client';

import { useState } from 'react';
import { SiteContent } from '@/lib/content';

interface ContactBackPageProps {
  siteContent: SiteContent;
}

export default function ContactBackPage({ siteContent }: ContactBackPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return value.trim().length > 0 ? '' : 'Please enter your name.';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.';
      case 'message':
        return value.trim().length >= 5 ? '' : 'Please include a short message.';
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error if field becomes valid
    if (errors[name] && validateField(name, value) === '') {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors: Record<string, string> = {};
    newErrors.name = validateField('name', formData.name);
    newErrors.email = validateField('email', formData.email);
    newErrors.message = validateField('message', formData.message);
    
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    setErrors(newErrors);
    
    if (hasErrors) {
      // Focus first invalid field
      const firstError = Object.keys(newErrors).find(key => newErrors[key] !== '');
      if (firstError) {
        document.getElementById(`cf-${firstError}`)?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: 'Portfolio Inquiry'
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrors({ general: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 lg:py-20 md:py-11"
      style={{ 
        backgroundColor: 'var(--text)',
        color: 'var(--bg)'
      }}
    >
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8">
        
        {/* Contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-18 items-start">
          
          {/* Left column */}
          <div>
            <div 
              className="font-semibold uppercase mb-4 text-xs"
              style={{ 
                color: 'var(--accent-dark-mode)',
                letterSpacing: '0.1em' 
              }}
              dangerouslySetInnerHTML={{ __html: siteContent.contactEyebrow }}
            />
            
            <h2 
              className="font-serif font-medium mb-6 text-4xl lg:text-6xl leading-none [&>em]:italic [&>em]:font-normal [&>em]:[color:var(--accent-dark-mode)]"
              style={{ 
                color: 'var(--bg)',
                letterSpacing: '-0.025em'
              }}
              dangerouslySetInnerHTML={{ __html: siteContent.contactHeadline }}
            />
            
            <p 
              className="max-w-lg text-base lg:text-lg leading-relaxed"
              style={{ 
                color: 'rgba(240, 238, 230, 0.75)'
              }}
            >
              {siteContent.contactLede}
            </p>
          </div>

          {/* Right column */}
          <div>
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="mt-8">
                
                {/* General error */}
                {errors.general && (
                  <div 
                    className="mb-6 text-sm"
                    style={{ color: '#E89B8A' }}
                  >
                    {errors.general}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Name */}
                  <div>
                    <label 
                      htmlFor="cf-name" 
                      className="block font-semibold uppercase mb-2 text-xs"
                      style={{ 
                        color: 'var(--accent-dark-mode)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="cf-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full bg-transparent border-0 border-b py-2.5 lg:py-2.5 text-base lg:text-lg min-h-11 lg:min-h-auto focus:outline-none transition-colors"
                      style={{
                        borderBottomWidth: '1px',
                        borderBottomColor: errors.name ? '#E89B8A' : 'rgba(240, 238, 230, 0.25)',
                        color: 'var(--bg)',
                        fontSize: '16px'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderBottomColor = 'var(--accent-dark-mode)';
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        if (!errors[e.target.name]) {
                          e.target.style.borderBottomColor = 'rgba(240, 238, 230, 0.25)';
                        }
                      }}
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                      <div 
                        className="flex items-center gap-2 mt-2 text-sm"
                        style={{ color: '#E89B8A' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="8" cy="8" r="6.5"/>
                          <path d="M8 4.5v4M8 11v.01" strokeLinecap="round"/>
                        </svg>
                        {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label 
                      htmlFor="cf-email" 
                      className="block font-semibold uppercase mb-2 text-xs"
                      style={{ 
                        color: 'var(--accent-dark-mode)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="cf-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className="w-full bg-transparent border-0 border-b py-2.5 lg:py-2.5 text-base lg:text-lg min-h-11 lg:min-h-auto focus:outline-none transition-colors"
                      style={{
                        borderBottomWidth: '1px',
                        borderBottomColor: errors.email ? '#E89B8A' : 'rgba(240, 238, 230, 0.25)',
                        color: 'var(--bg)',
                        fontSize: '16px'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderBottomColor = 'var(--accent-dark-mode)';
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        if (!errors[e.target.name]) {
                          e.target.style.borderBottomColor = 'rgba(240, 238, 230, 0.25)';
                        }
                      }}
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <div 
                        className="flex items-center gap-2 mt-2 text-sm"
                        style={{ color: '#E89B8A' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="8" cy="8" r="6.5"/>
                          <path d="M8 4.5v4M8 11v.01" strokeLinecap="round"/>
                        </svg>
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Company - full width */}
                  <div className="lg:col-span-2">
                    <label 
                      htmlFor="cf-company" 
                      className="block font-semibold uppercase mb-2 text-xs"
                      style={{ 
                        color: 'var(--accent-dark-mode)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      Company{' '}
                      <span 
                        className="font-normal normal-case"
                        style={{ 
                          color: 'rgba(240, 238, 230, 0.5)',
                          letterSpacing: '0'
                        }}
                      >
                        — optional
                      </span>
                    </label>
                    <input
                      type="text"
                      id="cf-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      autoComplete="organization"
                      placeholder="Where you're building"
                      className="w-full bg-transparent border-0 border-b py-2.5 lg:py-2.5 text-base lg:text-lg min-h-11 lg:min-h-auto focus:outline-none transition-colors"
                      style={{
                        borderBottomWidth: '1px',
                        borderBottomColor: 'rgba(240, 238, 230, 0.25)',
                        color: 'var(--bg)',
                        fontSize: '16px'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderBottomColor = 'var(--accent-dark-mode)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderBottomColor = 'rgba(240, 238, 230, 0.25)';
                      }}
                    />
                  </div>

                  {/* Message - full width */}
                  <div className="lg:col-span-2">
                    <label 
                      htmlFor="cf-message" 
                      className="block font-semibold uppercase mb-2 text-xs"
                      style={{ 
                        color: 'var(--accent-dark-mode)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="cf-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="What are you working on?"
                      className="w-full bg-transparent border-0 border-b py-2.5 lg:py-2.5 text-base lg:text-lg min-h-24 lg:min-h-28 resize-y focus:outline-none transition-colors leading-relaxed"
                      style={{
                        borderBottomWidth: '1px',
                        borderBottomColor: errors.message ? '#E89B8A' : 'rgba(240, 238, 230, 0.25)',
                        color: 'var(--bg)',
                        fontSize: '16px'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderBottomColor = 'var(--accent-dark-mode)';
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                        if (!errors[e.target.name]) {
                          e.target.style.borderBottomColor = 'rgba(240, 238, 230, 0.25)';
                        }
                      }}
                      aria-invalid={errors.message ? 'true' : 'false'}
                    />
                    {errors.message && (
                      <div 
                        className="flex items-center gap-2 mt-2 text-sm"
                        style={{ color: '#E89B8A' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="8" cy="8" r="6.5"/>
                          <path d="M8 4.5v4M8 11v.01" strokeLinecap="round"/>
                        </svg>
                        {errors.message}
                      </div>
                    )}
                  </div>

                  {/* Honeypot field - hidden */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                  />

                  {/* Submit row */}
                  <div className="lg:col-span-2 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mt-4">
                    <div 
                      className="font-mono uppercase text-xs order-2 lg:order-1 text-center lg:text-left"
                      style={{ 
                        color: 'rgba(240, 238, 230, 0.45)',
                        letterSpacing: '0.08em'
                      }}
                    >
                      {siteContent.contactHelper}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="font-medium rounded px-7 py-3.5 lg:py-3.5 min-h-12 text-base order-1 lg:order-2 transition-colors w-full lg:w-auto"
                      style={{
                        backgroundColor: 'var(--accent-dark-mode)',
                        color: '#14130D',
                        letterSpacing: '-0.005em'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#D6CB85';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = 'var(--accent-dark-mode)';
                        }
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send message'}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Success card */
              <div 
                className="mt-8 p-8 rounded-lg border"
                style={{
                  borderColor: 'rgba(201, 188, 110, 0.35)',
                  backgroundColor: 'rgba(201, 188, 110, 0.08)'
                }}
              >
                <div 
                  className="flex items-center gap-2 mb-3 font-semibold uppercase text-xs"
                  style={{ 
                    color: 'var(--accent-dark-mode)',
                    letterSpacing: '0.1em'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <circle cx="8" cy="8" r="6.5"/>
                    <path d="M5 8.25l2 2 4-4.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Message sent
                </div>
                <h3 
                  className="font-serif font-medium mb-2 text-2xl"
                  style={{ 
                    color: 'var(--bg)',
                    letterSpacing: '-0.01em'
                  }}
                >
                  Thanks — I'll be in touch.
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ 
                    color: 'rgba(240, 238, 230, 0.7)'
                  }}
                >
                  Replies usually go out within 24 hours, Monday through Friday.
                </p>
              </div>
            )}

            {/* Find me elsewhere block */}
            <div 
              className="mt-10 pt-6 border-t"
              style={{ borderColor: 'rgba(240, 238, 230, 0.18)' }}
            >
              <div 
                className="font-semibold uppercase mb-3 text-xs"
                style={{ 
                  color: 'var(--accent-dark-mode)',
                  letterSpacing: '0.1em'
                }}
              >
                {siteContent.labels.findMeElsewhere}
              </div>
              <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
                <a 
                  href={siteContent.linkedin}
                  className="font-serif font-medium text-lg border-b transition-colors inline-block"
                  style={{ 
                    color: 'var(--bg)',
                    borderBottomColor: 'rgba(240, 238, 230, 0.25)',
                    borderBottomWidth: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottomColor = 'var(--accent-dark-mode)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottomColor = 'rgba(240, 238, 230, 0.25)';
                  }}
                >
                  LinkedIn{' '}
                  <span style={{ color: 'rgba(240, 238, 230, 0.55)' }}>↗</span>
                </a>
                <a 
                  href={siteContent.resumeUrl}
                  className="font-serif font-medium text-lg border-b transition-colors inline-block"
                  style={{ 
                    color: 'var(--bg)',
                    borderBottomColor: 'rgba(240, 238, 230, 0.25)',
                    borderBottomWidth: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottomColor = 'var(--accent-dark-mode)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottomColor = 'rgba(240, 238, 230, 0.25)';
                  }}
                >
                  Resume{' '}
                  <span style={{ color: 'rgba(240, 238, 230, 0.55)' }}>↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}