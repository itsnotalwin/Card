/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Mail, 
  Globe, 
  MapPin, 
  Camera, 
  Download, 
  Share2,
  Check,
  QrCode,
  Calendar,
  X,
  Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import QRCode from 'react-qr-code';

// Contact Data
const contactData = {
  name: 'Alwin Newman',
  title: 'Portrait Photographer',
  company: 'Shutterhausvisuals',
  location: 'Gauteng, South Africa',
  email: 'itsnotalwin@gmail.com',
  phone: '+27730958363',
  website: 'https://shutterhausvisuals.mypixieset.com/',
  about: 'Striking, authentic portraits that bring your story to light.',
  image: 'https://drive.google.com/thumbnail?id=1dGo1hDouUsBn3CLQsB5cz-Ji40wzxgAI&sz=w500',
  coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&h=400&auto=format&fit=crop',
  links: [
    { name: 'Email', icon: Mail, url: 'mailto:itsnotalwin@gmail.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/shutterhausvisuals/' },
    { name: 'Portfolio', icon: Globe, url: 'https://shutterhausvisuals.mypixieset.com/' },
  ]
};

export default function App() {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://shutterhausvisuals.mypixieset.com/');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${contactData.name}'s Digital Card`,
          text: `Check out ${contactData.name}'s digital business card!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy link
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadVcard = () => {
    // Basic vCard generation with requested cellphone number
    const vCard = `BEGIN:VCARD
VERSION:3.0
N:Newman;Alwin;;;
FN:Alwin Newman
ORG:Shutterhausvisuals
TITLE:Portrait Photographer
TEL;TYPE=CELL,VOICE:${contactData.phone}
EMAIL:${contactData.email}
URL:${contactData.website}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'alwin_newman.vcf';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-[#F6F5F2] flex items-center justify-center p-3 sm:p-6 font-sans selection:bg-brand-dark selection:text-white">
      
      {/* Main Card Container with subtle elegant shadow and gold-touch borders */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[360px] bg-brand-offwhite rounded-2xl shadow-[0_12px_40px_rgba(36,34,32,0.04)] border border-stone-200/50 overflow-hidden"
      >
        
        {/* Cover Image */}
        <div className="h-28 relative overflow-hidden">
          <img 
            src={contactData.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover grayscale-[15%] contrast-[1.05]" 
            draggable={false}
          />
          <div className="absolute inset-0 bg-brand-dark/10"></div>
        </div>

        {/* Profile Section */}
        <div className="px-6 pb-6 relative">
          
          {/* Avatar with luxury golden ring */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring', bounce: 0.2 }}
            className="relative -mt-12 mb-4 flex justify-center"
          >
            <div className="w-24 h-24 rounded-full border-4 border-brand-offwhite shadow-md overflow-hidden bg-white ring-1 ring-brand-gold/30">
              <img 
                src={contactData.image} 
                alt={contactData.name} 
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* Name & Title */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-serif text-brand-dark tracking-wide mb-1.5">
              {contactData.name}
            </h1>
            <p className="text-brand-gold-dark font-semibold text-[9px] uppercase tracking-[0.2em] mb-3">
              {contactData.title}
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-brand-gold-dark" />
                {contactData.company}
              </span>
              <span className="text-stone-200">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-gold-dark" />
                {contactData.location}
              </span>
            </div>
          </div>

          {/* About */}
          <div className="mb-5 text-center">
            <p className="text-stone-700 font-sans text-xs sm:text-[13px] leading-relaxed tracking-wide font-medium px-4">
              “{contactData.about}”
            </p>
          </div>

          {/* Links Grid */}
          <div className="flex justify-center gap-3.5 mb-5">
            {contactData.links.map((link, idx) => {
              const isEmail = link.name === 'Email';
              return (
                <div key={link.name} className="relative">
                  {/* Tooltip for Copy Confirmation */}
                  {isEmail && (
                    <AnimatePresence>
                      {emailCopied && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, x: '-50%' }}
                          animate={{ opacity: 1, y: 0, x: '-50%' }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute -top-10 left-1/2 bg-brand-dark text-white text-[10px] px-2.5 py-1 rounded-md font-medium tracking-wide shadow-md whitespace-nowrap z-10"
                        >
                          Copied Email!
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-brand-dark"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.08) }}
                    onClick={(e) => {
                      if (isEmail) {
                        e.preventDefault();
                        handleCopyEmail();
                      } else {
                        window.open(link.url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className={`flex items-center justify-center w-11 h-11 rounded-full border transition-all active:scale-95 ${
                      isEmail && emailCopied 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-600' 
                        : 'border-stone-200 text-stone-500 hover:text-brand-gold-dark hover:border-brand-gold hover:bg-brand-gold-light/40'
                    }`}
                    aria-label={link.name}
                    title={isEmail ? 'Copy email address' : link.name}
                  >
                    {isEmail && emailCopied ? (
                      <Check className="w-4 h-4 stroke-[2]" />
                    ) : (
                      <link.icon className="w-4.5 h-4.5 stroke-[1.5]" />
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleDownloadVcard}
              className="w-full flex items-center justify-center gap-2 bg-brand-dark hover:bg-black text-brand-gold-light py-3 px-6 rounded-xl font-medium tracking-wide text-sm transition-all active:scale-[0.98] shadow-sm"
            >
              <Download className="w-4 h-4 text-brand-gold" />
              Save Contact
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setShowQR(true)}
                className="w-full flex items-center justify-center gap-2 bg-white border border-stone-200 hover:bg-brand-gold-light/20 hover:border-brand-gold/40 text-stone-700 py-2.5 px-4 rounded-xl font-medium tracking-wide text-xs transition-all active:scale-[0.98]"
              >
                <QrCode className="w-3.5 h-3.5 text-brand-gold-dark" />
                QR Code
              </button>

              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 bg-stone-100/80 hover:bg-stone-200/80 text-brand-dark py-2.5 px-4 rounded-xl font-medium tracking-wide text-xs transition-all active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-stone-600" />
                    <span>Share Card</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </motion.div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative flex flex-col items-center"
            >
              <button 
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center mb-6 mt-2">
                <h3 className="text-xl font-serif text-stone-800 tracking-wide mb-1">Scan to Connect</h3>
                <p className="text-stone-500 text-sm">Point your camera at the screen</p>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-inner border border-stone-100">
                <QRCode
                  value={currentUrl}
                  size={200}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                  fgColor="#1c1917" // stone-900
                />
              </div>
              
              <p className="mt-6 text-xs text-stone-400 uppercase tracking-widest">
                {contactData.name}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
