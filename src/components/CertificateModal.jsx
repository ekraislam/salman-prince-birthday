import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Award, CheckCircle } from 'lucide-react';
import styles from './CertificateModal.module.css';

export default function CertificateModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Render high-res royal certificate on HTML5 Canvas
  useEffect(() => {
    if (!isOpen) return;

    const renderCertificate = async () => {
      // Ensure fonts are loaded before drawing on canvas
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }
      } catch (e) {
        console.warn('Font loading error:', e);
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = 1200;
      const h = 1600;
      canvas.width = w;
      canvas.height = h;

      // Helper function to safely wrap and center text
      const wrapCenterText = (text, y, maxWidth, lineHeight, font, color) => {
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.letterSpacing = '0px';

        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line.trim(), w / 2, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line.trim(), w / 2, currentY);
        return currentY;
      };

      // 1. Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#090a12');
      bgGrad.addColorStop(0.5, '#050508');
      bgGrad.addColorStop(1, '#0e0e18');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle radial light in center
      const radialGlow = ctx.createRadialGradient(w / 2, h / 2 - 100, 10, w / 2, h / 2 - 100, 600);
      radialGlow.addColorStop(0, 'rgba(201, 162, 39, 0.06)');
      radialGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, w, h);

      // 2. Ornate Gold Borders
      ctx.strokeStyle = '#c9a227';
      ctx.lineWidth = 6;
      ctx.strokeRect(40, 40, w - 80, h - 80);

      ctx.strokeStyle = 'rgba(201, 162, 39, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(55, 55, w - 110, h - 110);

      // Corner ornaments
      const drawCorner = (x, y, r1, r2) => {
        ctx.save();
        ctx.strokeStyle = '#e8c84a';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(x, y, 30, r1, r2);
        ctx.stroke();
        ctx.restore();
      };
      drawCorner(70, 70, Math.PI, 1.5 * Math.PI);
      drawCorner(w - 70, 70, 1.5 * Math.PI, 2 * Math.PI);
      drawCorner(70, h - 70, 0.5 * Math.PI, Math.PI);
      drawCorner(w - 70, h - 70, 0, 0.5 * Math.PI);

      // 3. Header
      ctx.textAlign = 'center';
      ctx.letterSpacing = '5px';
      ctx.font = 'bold 22px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#c9a227';
      ctx.fillText('HIGH COURT OF AWESOME', w / 2, 145);

      ctx.letterSpacing = '1px';
      ctx.font = '16px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.5)';
      ctx.fillText('SPECIAL BIRTHDAY JURISDICTION • CASE NO. BDAY-2026-SP', w / 2, 185);

      // Divider line
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(250, 220);
      ctx.lineTo(w - 250, 220);
      ctx.stroke();

      // Certificate Title
      ctx.letterSpacing = '2px';
      ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#f0f0f5';
      ctx.fillText('CERTIFICATE OF FINAL VERDICT', w / 2, 300);

      ctx.letterSpacing = '1px';
      ctx.font = 'italic 22px "Playfair Display", Georgia, serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.7)';
      ctx.fillText('THIS IS TO OFFICIALLY CERTIFY THAT', w / 2, 370);

      // Defendant Name in large Gold
      ctx.letterSpacing = '1px';
      ctx.font = 'bold 74px "Playfair Display", Georgia, serif';
      const goldGrad = ctx.createLinearGradient(w / 2 - 300, 0, w / 2 + 300, 0);
      goldGrad.addColorStop(0, '#c9a227');
      goldGrad.addColorStop(0.5, '#fce588');
      goldGrad.addColorStop(1, '#c9a227');
      ctx.fillStyle = goldGrad;
      ctx.fillText('SALMAN PRINCE', w / 2, 465);

      // Designation
      ctx.letterSpacing = '2px';
      ctx.font = 'bold 20px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#c9a227';
      ctx.fillText('COUNSELOR AT LAW • ROYAL BROTHER • CERTIFIED LEGEND', w / 2, 515);

      // Underline
      ctx.strokeStyle = '#c9a227';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(350, 545);
      ctx.lineTo(w - 350, 545);
      ctx.stroke();

      // Body Paragraph
      ctx.letterSpacing = '0px';
      ctx.font = 'italic 25px "Playfair Display", Georgia, serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.85)';
      ctx.fillText('has been tried before the High Court of The People,', w / 2, 620);
      ctx.fillText('and after rigorous evaluation of all character exhibits,', w / 2, 665);
      ctx.fillText('has been unanimously and irreversibly declared:', w / 2, 710);

      // GUILTY Box
      ctx.fillStyle = 'rgba(201, 162, 39, 0.08)';
      ctx.strokeStyle = '#c9a227';
      ctx.lineWidth = 3;
      ctx.roundRect(w / 2 - 380, 760, 760, 210, 16);
      ctx.fill();
      ctx.stroke();

      ctx.letterSpacing = '3px';
      ctx.font = 'bold 84px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#e8c84a';
      ctx.fillText('GUILTY', w / 2, 850);

      ctx.letterSpacing = '2px';
      ctx.font = 'bold 34px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('OF BEING EXTREMELY AWESOME', w / 2, 920);

      // Penalty Text (Wrapped safely inside 950px width!)
      wrapCenterText(
        'Penalty: Required to maintain unlimited happiness, pursue grand dreams, and remain the best brother in the universe forever.',
        1030,
        960,
        34,
        '19px "Inter", sans-serif',
        'rgba(240, 240, 245, 0.7)'
      );

      // Seal & Signature Footer Section
      // Left: Court Seal
      ctx.beginPath();
      ctx.arc(320, 1290, 68, 0, Math.PI * 2);
      ctx.strokeStyle = '#c9a227';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(320, 1290, 58, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.letterSpacing = '2px';
      ctx.font = 'bold 16px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#c9a227';
      ctx.fillText('HIGH COURT', 320, 1280);
      ctx.fillText('SEAL ⚖️', 320, 1305);

      // Right: Stylish Signature by Ekra Islam Ohi
      ctx.textAlign = 'center';
      const sigX = w - 340;

      // Beautiful cursive signature
      ctx.letterSpacing = '0px';
      ctx.font = '54px "Great Vibes", "Alex Brush", "Playfair Display", cursive';
      const sigGrad = ctx.createLinearGradient(sigX - 150, 0, sigX + 150, 0);
      sigGrad.addColorStop(0, '#fce588');
      sigGrad.addColorStop(0.5, '#e8c84a');
      sigGrad.addColorStop(1, '#c9a227');
      ctx.fillStyle = sigGrad;
      ctx.fillText('Ekra Islam Ohi', sigX, 1280);

      // Signature line with pen flourish
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sigX - 160, 1305);
      ctx.lineTo(sigX + 160, 1305);
      ctx.stroke();

      // Signer Title
      ctx.letterSpacing = '2px';
      ctx.font = 'bold 16px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#f0f0f5';
      ctx.fillText('EKRA ISLAM OHI', sigX, 1335);

      ctx.letterSpacing = '1px';
      ctx.font = '14px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(201, 162, 39, 0.8)';
      ctx.fillText('CHIEF JUSTICE • ELDER BROTHER', sigX, 1360);

      // Bottom Legal Date
      ctx.letterSpacing = '2px';
      ctx.font = '15px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(201, 162, 39, 0.6)';
      ctx.fillText(`ISSUED IN FULL LEGAL FORCE • YEAR ${new Date().getFullYear()}`, w / 2, 1490);
    };

    renderCertificate();
  }, [isOpen]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Salman-Prince-Court-Verdict-Certificate.png`;
      link.href = dataUrl;
      link.click();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <Award size={20} className={styles.awardIcon} />
                <span>OFFICIAL VERDICT CERTIFICATE</span>
              </div>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            {/* Canvas Preview Container */}
            <div className={styles.previewContainer}>
              <canvas ref={canvasRef} className={styles.canvas} />
            </div>

            {/* Footer Action Buttons */}
            <div className={styles.footer}>
              <p className={styles.tipText}>
                💡 এই সার্টিফিকেটটি ফোনে সেভ করে স্টোরিতে শেয়ার করতে পারো!
              </p>
              <button
                className={`btn-gold ${styles.downloadBtn}`}
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloaded ? (
                  <>
                    <CheckCircle size={18} />
                    <span>ডাউনলোড সম্পন্ন হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    <span>সার্টিফিকেট ডাউনলোড করো (HD PNG)</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
