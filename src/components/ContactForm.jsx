import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { profile } from '../data/siteData';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
  consent: false,
  honeypot: ''
};

const projectOptions = [
  'Portfolio Website',
  'Business Website',
  'E-commerce Website',
  'Landing Page',
  'Website Redesign',
  'Web App',
  'Mobile App',
  'Collaboration',
  'Other'
];

const budgetOptions = ['Low budget', '₦50k–₦100k', '₦100k–₦250k', '₦250k–₦500k', '₦500k+', 'Not sure yet'];
const timelineOptions = ['Urgent', '1 week', '2–4 weeks', '1–2 months', 'Flexible'];

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef(null);
  const formRef = useRef(null);
  const turnstileKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const subjectPrefix = import.meta.env.VITE_CONTACT_SUBJECT_PREFIX || 'Email from my portfolio';
  const subject = `${subjectPrefix} — ${form.name || 'Visitor'} — ${form.projectType || 'Project'}`;

  useEffect(() => {
    if (!turnstileKey || !turnstileRef.current || !window.turnstile) return undefined;

    const widgetId = window.turnstile.render(turnstileRef.current, {
      sitekey: turnstileKey,
      callback: (token) => setTurnstileToken(token),
      'error-callback': () => setTurnstileToken('')
    });

    return () => {
      if (window.turnstile && widgetId) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [turnstileKey]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.projectType || !form.budget || !form.timeline || !form.message) {
      return 'Please fill in all required fields.';
    }
    if (!form.consent) {
      return 'Please confirm consent so Gideon can respond.';
    }
    if (turnstileKey && !turnstileToken) {
      return 'Please verify that you are human.';
    }
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.honeypot) {
      return;
    }

    const error = validate();
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const receiverEmail = import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || profile.email;
    const subject = `${subjectPrefix} — ${form.name} — ${form.projectType}`;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'error',
        message: 'Email service is not configured yet. Please try again soon.'
      });
      return;
    }

    if (!receiverEmail) {
      setStatus({
        type: 'error',
        message: 'Recipient email is missing. Please refresh and try again.'
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      if (!formRef.current) {
        throw new Error('Form not ready yet.');
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      setStatus({ type: 'success', message: 'Message sent successfully. Gideon will reply shortly.' });
      setForm(initialForm);
      setTurnstileToken('');
    } catch (err) {
      const errorText = err?.text || err?.message || 'Something went wrong while sending. Please try again.';
      setStatus({ type: 'error', message: errorText });
      console.error('EmailJS error:', err);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full name"
          className="form-input"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email address"
          type="email"
          className="form-input"
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone or WhatsApp"
          className="form-input"
          required
        />
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company/brand name"
          className="form-input"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <select name="projectType" value={form.projectType} onChange={handleChange} className="form-input" required>
          <option value="">Project type</option>
          {projectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select name="budget" value={form.budget} onChange={handleChange} className="form-input" required>
          <option value="">Budget range</option>
          {budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select name="timeline" value={form.timeline} onChange={handleChange} className="form-input" required>
          <option value="">Timeline</option>
          {timelineOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell me about the project"
        className="form-input min-h-[140px]"
        required
      />
      <input type="hidden" name="to_email" value={import.meta.env.VITE_CONTACT_RECEIVER_EMAIL || profile.email} />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="reply_to" value={form.email} />
      <input type="hidden" name="turnstile_token" value={turnstileToken} />
      <div className="flex items-start gap-3 text-sm text-white/60">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={form.consent}
          onChange={handleChange}
          className="mt-1"
          required
        />
        <label htmlFor="consent">I agree that Gideon can contact me about this project.</label>
      </div>

      <div className="hidden">
        <label htmlFor="honeypot">Leave this field empty</label>
        <input id="honeypot" name="honeypot" value={form.honeypot} onChange={handleChange} />
      </div>

      {turnstileKey && <div ref={turnstileRef} className="turnstile" />}

      <button type="submit" className="btn-primary py-4 font-bold tracking-widest" disabled={status.type === 'loading'}>
        {status.type === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status.type !== 'idle' && (
        <div className={`toast toast-${status.type}`} role="status">
          {status.message}
        </div>
      )}
    </form>
  );
}
