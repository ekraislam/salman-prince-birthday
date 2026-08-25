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

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = 1200;
      const h = 1600;
      canvas.width = w;
      canvas.height = h;

      // 1. Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#090a10');
      bgGrad.addColorStop(0.5, '#050508');
      bgGrad.addColorStop(1, '#0e0e18');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Ornate Border
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

      // 3. Header Texts
      ctx.textAlign = 'center';
      
      // Top badge
      ctx.font = 'bold 24px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#c9a227';
      ctx.letterSpacing = '6px';
      ctx.fillText('HIGH COURT OF AWESOME', w / 2, 160);

      ctx.font = '18px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.5)';
      ctx.fillText('SPECIAL BIRTHDAY JURISDICTION • CASE NO. BDAY-2026-SP', w / 2, 200);

      // Divider line with diamond
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(250, 240);
      ctx.lineTo(w - 250, 240);
      ctx.stroke();

      // Certificate Title
      ctx.font = 'bold 44px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#f0f0f5';
      ctx.fillText('CERTIFICATE OF FINAL VERDICT', w / 2, 330);

      ctx.font = 'italic 24px "Playfair Display", Georgia, serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.7)';
      ctx.fillText('THIS IS TO OFFICIALLY CERTIFY THAT', w / 2, 410);

      // Defendant Name in large Gold
      ctx.font = 'bold 72px "Playfair Display", Georgia, serif';
      const goldGrad = ctx.createLinearGradient(w / 2 - 300, 0, w / 2 + 300, 0);
      goldGrad.addColorStop(0, '#c9a227');
      goldGrad.addColorStop(0.5, '#fce588');
      goldGrad.addColorStop(1, '#c9a227');
      ctx.fillStyle = goldGrad;
      ctx.fillText('SALMAN PRINCE', w / 2, 510);

      // Designation
      ctx.font = '22px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#c9a227';
      ctx.fillText('COUNSELOR AT LAW • ROYAL BROTHER • CERTIFIED LEGEND', w / 2, 565);

      // Underline
      ctx.strokeStyle = '#c9a227';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(350, 595);
      ctx.lineTo(w - 350, 595);
      ctx.stroke();

      // Body Paragraph
      ctx.font = 'italic 26px "Playfair Display", Georgia, serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.85)';
      ctx.fillText('has been tried before the High Court of The People,', w / 2, 680);
      ctx.fillText('and after rigorous evaluation of all character exhibits,', w / 2, 725);
      ctx.fillText('has been unanimously and irreversibly declared:', w / 2, 770);

      // GUILTY Box
      ctx.fillStyle = 'rgba(201, 162, 39, 0.08)';
      ctx.strokeStyle = '#c9a227';
      ctx.lineWidth = 3;
      ctx.roundRect(w / 2 - 380, 830, 760, 220, 16);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 88px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#e8c84a';
      ctx.fillText('GUILTY', w / 2, 930);

      ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('OF BEING EXTREMELY AWESOME', w / 2, 1000);

      // Sub statement
      ctx.font = '22px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.65)';
      ctx.fillText('Penalty: Required to maintain unlimited happiness, pursue grand dreams,', w / 2, 1120);
      ctx.fillText('and remain the best brother in the universe forever.', w / 2, 1155);

      // Seal & Signature Footer
      // Left: Seal
      ctx.beginPath();
      ctx.arc(320, 1340, 70, 0, Math.PI * 2);
      ctx.strokeStyle = '#c9a227';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = 'bold 18px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#c9a227';
      ctx.fillText('OFFICIAL', 320, 1330);
      ctx.fillText('SEAL', 320, 1355);

      // Right: Signature
      ctx.strokeStyle = 'rgba(240, 240, 245, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w - 460, 1360);
      ctx.lineTo(w - 180, 1360);
      ctx.stroke();

      ctx.font = 'italic 28px "Playfair Display", serif';
      ctx.fillStyle = '#e8c84a';
      ctx.fillText('The Elder Brother', w - 320, 1335);

      ctx.font = '18px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(240, 240, 245, 0.6)';
      ctx.fillText('CHIEF JUSTICE • BIRTHDAY DIVISION', w - 320, 1395);

      // Date Bottom
      ctx.font = '16px "Space Grotesk", sans-serif';
      ctx.fillStyle = 'rgba(201, 162, 39, 0.7)';
      ctx.fillText(`ISSUED IN FULL LEGAL FORCE • YEAR ${new Date().getFullYear()}`, w / 2, 1510);
    }, 100);

    return () => clearTimeout(timer);
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
