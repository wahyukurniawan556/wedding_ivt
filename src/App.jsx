import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // --- STATE UNTUK FORM RSVP ---
  const [nama, setNama] = useState('');
  const [kehadiran, setKehadiran] = useState('');
  const [pesan, setPesan] = useState('');

  // State daftar ucapan (diberi data dummy (contoh) awal)
  const [ucapanList, setUcapanList] = useState([
    {
      id: 1,
      nama: "Budi & Keluarga",
      kehadiran: "hadir",
      pesan: "Selamat menempuh hidup baru Puji! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
      waktu: "1 jam yang lalu"
    },
    {
      id: 2,
      nama: "Andi (Teman Kampus)",
      kehadiran: "tidak",
      pesan: "Maaf ya bro belum bisa hadir ke acara. Doa terbaik dari jauh untuk kalian berdua!",
      waktu: "2 jam yang lalu"
    }
  ]);

  // Fungsi untuk menangani saat tombol Kirim ditekan
  const handleKirimUcapan = (e) => {
    e.preventDefault(); // Mencegah halaman reload
    
    // Pastikan semua form terisi
    if (!nama || !kehadiran || !pesan) return;

    // Membuat objek ucapan baru
    const ucapanBaru = {
      id: Date.now(), // ID unik dari timestamp
      nama: nama,
      kehadiran: kehadiran,
      pesan: pesan,
      waktu: "Baru saja" // Karena belum pakai database asli
    };

    // Memasukkan ucapan baru ke baris paling atas dari daftar yang sudah ada
    setUcapanList([ucapanBaru, ...ucapanList]);

    // Mengosongkan form kembali setelah terkirim
    setNama('');
    setKehadiran('');
    setPesan('');
  };

  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpened]);

  const handleBukaUndangan = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="app-container">
      
      <audio ref={audioRef} loop>
        <source src="/lagu-romantis.mp3" type="audio/mpeg" />
      </audio>

      {isOpened && (
        <button className={`music-toggle ${isPlaying ? 'spin' : ''}`} onClick={toggleMusic}>
          {isPlaying ? '🎵' : '🔇'}
        </button>
      )}

      {/* --- BACKGROUND AESTHETIC BLUR --- */}
      <div className="bg-aesthetic">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* --- COVER SCREEN --- */}
      <motion.div 
        className="cover-screen"
        initial={{ y: 0 }}
        animate={{ y: isOpened ? '-100vh' : 0 }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="cover-bg-image"></div>
        <div className="cover-content">
          <h2 className="subtitle">The Wedding Of</h2>
          <div className="cover-photo-container">
            <img 
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop" 
              alt="Puji & Pasangan" 
              className="cover-photo"
            />
          </div>
          <h1 className="title">[Youre Name] & [Nama Istri]</h1>
          <p className="to-text">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <button className="btn-buka" onClick={handleBukaUndangan}>
            Buka Undangan
          </button>
        </div>
      </motion.div>

      {/* --- ISI UNDANGAN --- */}
      <div className="main-content">
        
        {/* Halaman 1: Kutipan */}
        <motion.section className="section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <div className="glass-card quote-section">
            <p className="quote-text">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya..."
            </p>
            <p className="quote-source">(QS. Ar-Rum: 21)</p>
          </div>
        </motion.section>

        {/* Halaman 2: Mempelai */}
        <motion.section className="section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="section-title">Mempelai</h2>
          <div className="couple-info glass-card">
            <h3>[Nama Calon Suami]</h3>
            <p className="parents-text">Putra dari Bapak [...] & Ibu [...]</p>
            <p className="and-symbol">&</p>
            <h3>[Nama Calon Istri]</h3>
            <p className="parents-text">Putri dari Bapak [...] & Ibu [...]</p>
          </div>
        </motion.section>

        {/* ... (Kode Halaman 1 & 2 sebelumnya) ... */}

        {/* Halaman 3: Kisah Kita (BARU DENGAN FOTO) */}
        <motion.section className="section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="section-title">Kisah Kita</h2>
          <div className="glass-card story-card">
            
            {/* Foto Momen Berdua */}
            <div className="story-photo-container">
              <img 
                src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400&auto=format&fit=crop" 
                alt="Kisah Perjalanan" 
                className="story-photo" 
              />
            </div>
            
            {/* Teks Cerita */}
            <div className="story-text">
              <p><strong>Awal Bertemu</strong><br/>
              Semuanya berawal dari perjumpaan sederhana di lorong kampus UNISNU Jepara. 
              Sapaan singkat yang berlanjut menjadi perbincangan panjang tentang mimpi dan masa depan.</p>
              
              <hr className="story-divider" />
              
              <p><strong>Merajut Kasih</strong><br/>
              Kebersamaan kami semakin erat saat menjalankan program pengabdian bersama di wilayah Mlonggo. 
              Di sela-sela kesibukan dan kegiatan, 
              kami menemukan kenyamanan dan visi yang sama.</p>
              
              <hr className="story-divider" />
              
              <p><strong>Melangkah Bersama</strong><br/>
              Setelah melewati berbagai fase pendewasaan bersama, 
              dengan penuh keyakinan dan restu dari kedua keluarga, 
              kami memutuskan untuk mengikat janji suci dan menua bersama.</p>
            </div>
          </div>
        </motion.section>

        {/* Halaman 4: Acara & Maps */}
        {/* ... (Kode Halaman Acara dst tetap sama) ... */}

        {/* Halaman 4: Acara & Maps */}
        <motion.section className="section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="section-title">Waktu & Tempat</h2>
          <div className="glass-card event-card">
            <h3>Akad Nikah & Resepsi</h3>
            <p className="gold-text"><strong>Minggu, [Tanggal Bulan Tahun]</strong></p>
            <p>Pukul 09.00 WIB - Selesai</p>
            <hr className="divider" />
            <p><strong>Lokasi Acara:</strong></p>
            <p>Gedung Serbaguna Mlonggo<br/>Kec. Mlonggo, Kabupaten Jepara</p>
            
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63428.87895015259!2d110.66981880562624!3d-6.529891823902347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e711ec4300305f5%3A0x4027a76e352eba0!2sMlonggo%2C%20Jepara%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                width="100%" height="200" style={{ border: 0, borderRadius: '8px', marginTop: '15px' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </motion.section>

        {/* Halaman 5: Galeri */}
        <motion.section className="section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="section-title">Galeri Bahagia</h2>
          <div className="gallery-grid">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300&auto=format&fit=crop" alt="Galeri 1" />
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=300&auto=format&fit=crop" alt="Galeri 2" />
            <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300&auto=format&fit=crop" alt="Galeri 3" />
            <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=300&auto=format&fit=crop" alt="Galeri 4" />
          </div>
        </motion.section>

        {/* Halaman 6: RSVP */}
        <motion.section className="section rsvp-section" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.2 }}>
          <h2 className="section-title">RSVP & Ucapan</h2>
          
          {/* Kotak Form Input */}
          <div className="glass-card rsvp-card">
            <p className="rsvp-desc">Kehadiran dan doa restu Anda sangat berarti bagi kami.</p>
            <form className="rsvp-form" onSubmit={handleKirimUcapan}>
              <input 
                type="text" 
                placeholder="Nama Anda" 
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required 
              />
              <select 
                value={kehadiran}
                onChange={(e) => setKehadiran(e.target.value)}
                required
              >
                <option value="" disabled>Konfirmasi Kehadiran</option>
                <option value="hadir">Ya, Saya Akan Hadir</option>
                <option value="tidak">Maaf, Saya Tidak Bisa Hadir</option>
              </select>
              <textarea 
                placeholder="Tuliskan doa & ucapan..." 
                rows="3" 
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                required
              ></textarea>
              <button type="submit" className="btn-gold">Kirim Ucapan</button>
            </form>
          </div>

          {/* Kotak Daftar Ucapan (Buku Tamu) */}
          <div className="glass-card guestbook-card">
            <h3 className="guestbook-title">Buku Tamu ({ucapanList.length} Pesan)</h3>
            <div className="guestbook-list">
              {ucapanList.map((item) => (
                <div key={item.id} className="guestbook-item">
                  <div className="guestbook-header">
                    <h4 className="guest-name">{item.nama}</h4>
                    {/* Badge warna hijau jika hadir, merah/abu jika tidak */}
                    <span className={`guest-badge ${item.kehadiran === 'hadir' ? 'badge-hadir' : 'badge-tidak'}`}>
                      {item.kehadiran === 'hadir' ? '✓ Hadir' : '✗ Tidak Hadir'}
                    </span>
                  </div>
                  <p className="guest-message">{item.pesan}</p>
                  <span className="guest-time">{item.waktu}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Halaman 7: Amplop */}
        <motion.section className="section" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <h2 className="section-title">Amplop Digital</h2>
          <div className="bank-cards">
            <div className="glass-card bank-card">
              <h4>BCA</h4>
              <p className="account-number">123 456 7890</p>
              <p>a.n [Your rekening]</p>
            </div>
          </div>
          <p></p>
          <div className="bank-cards">
            <div className="glass-card bank-card">
              <h4>BCA</h4>
              <p className="account-number">123 456 7890</p>
              <p>a.n [Your rekening]</p>
            </div>
          </div>
        </motion.section>

        <footer className="footer">
          <p>Terima kasih atas doa dan restunya.</p>
          <p className="footer-names">[Nama Calon Suami] & [Nama Istri]</p>
        </footer>
      </div>
    </div>
  );
}

export default App;