import { useNavigate } from 'react-router-dom'
import './Edukasi.css'
import logoImage from '../../assets/logo pojok kanan .png'
import bearImage from '../../assets/jempol.png'
import bearThinkImage from '../../assets/mikir.png'
import bearWhistleImage from '../../assets/niup peluit.png'
import bearSadImage from '../../assets/ngeluh.png'
import bearSmileImage from '../../assets/sapa.png'

function Edukasi() {
  const navigate = useNavigate()

  const playSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 600
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  const handleBackClick = () => {
    playSound()
    setTimeout(() => {
      navigate('/menu')
    }, 100)
  }

  const handleMenuClick = (menu) => {
    playSound()
    setTimeout(() => {
      navigate(menu)
    }, 100)
  }

  return (
    <div className="edukasi-page">
      {/* Header Navigation */}
      <header className="edukasi-header">
        <div className="header-left">
          <img src={logoImage} alt="Safe School Logo" className="header-logo" />
          <div className="header-brand">
            <div className="brand-title">Sahabat Digital</div>
            <div className="brand-subtitle">Anti Bullying</div>
          </div>
        </div>
        <nav className="header-nav">
          <button className="nav-btn" onClick={() => handleMenuClick('/admin')}>Admin</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/laporkan')}>Laporkan</button>
          <button className="nav-btn nav-btn-active" onClick={() => handleMenuClick('/edukasi')}>Edukasi</button>
          <button className="nav-btn" onClick={() => handleMenuClick('/chat')}>Chat</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="edukasi-content">
        <div className="content-text">
          <h2>Edukasi Mengenai Bullying</h2>
          <p>
            Yuk belajar bareng Nobi! Halaman ini berisi penjelasan
            seru dan mudah dipahami tentang bullying, supaya kita
            bisa saling jaga dan jadi teman yang baik
          </p>
        </div>
        <div className="content-image">
          <img src={bearImage} alt="Nobi Bear" className="nobi-character" />
        </div>
      </main>

      {/* Tentang Bullying Section */}
      <section className="tentang-bullying-section">
        <div className="tentang-container">
          <div className="tentang-left">
            <div className="bear-question">
              <img src={bearThinkImage} alt="Nobi Thinking" className="bear-think" />
              <div className="speech-bubble-question">
                <p>Apa itu bullying?</p>
              </div>
            </div>
          </div>
          <div className="tentang-right">
            <h3 className="tentang-title">Tentang Bullying</h3>
            <p className="tentang-text">
              Hai teman! Nobi mau cerita sedikit ya. Kadang, ada orang yang 
              suka berkata atau bertindak jahat ke orang lain, dan itu bisa 
              bikin orang lain sedih, takut, atau gak nyaman.
            </p>
            <p className="tentang-text">
              Bullying bisa terjadi kalau seseorang disakiti terus-menerus, 
              bukan cuma sekali aja. Bisa lewat kata-kata yang kasar, tindakan 
              fisik, atau bahkan perlakuan yang bikin seseorang dikucilkan.
            </p>
          </div>
        </div>
      </section>

      {/* Jenis-Jenis Bullying Section */}
      <section className="jenis-bullying-section">
        <h2 className="jenis-title">Jenis - Jenis Bullying</h2>
        <div className="jenis-cards-container">
          <div className="bullying-card">
            <h3 className="card-title">Bullying Verbal</h3>
            <p className="card-text">
              Kalau kamu pernah dengar ada yang suka mengejek nama orang, menghina, atau 
              memanggil dengan nama jelek, nah itu namanya bullying verbal. Kadang orang 
              pikir itu cuma bercanda, tapi kalau bikin hati temannya sakit, itu tetap bullying!
            </p>
          </div>

          <div className="bullying-card">
            <h3 className="card-title">Bullying Fisik</h3>
            <p className="card-text">
              Kalau yang ini lewat tindakan, teman. Misalnya mendorong, memukul, menendang, atau 
              bahkan merusak barang teman. Wah, itu gak boleh banget, karena bisa bikin orang 
              lain terluka. Tubuh teman kita harus dijaga, bukan disakiti!
            </p>
          </div>

          <div className="bullying-card">
            <h3 className="card-title">Cyberbullying</h3>
            <p className="card-text">
              Sekarang kan banyak yang main HP ya, main game, chat, atau sosmed. Tapi, ada juga 
              orang yang mengejek atau nyebarin hal buruk di internet. Jadi kita harus bijak 
              pakai HP, tulis yang baik-baik aja ya
            </p>
          </div>

          <div className="bullying-card">
            <h3 className="card-title">Bullying Sosial</h3>
            <p className="card-text">
              Kalau yang ini, bullying yang bikin orang lain merasa dikucilkan atau sendirian. 
              Misalnya: Gak diajak main bareng, disuruh orang lain gak berteman sama dia, atau 
              ngomongin di belakangnya
            </p>
          </div>
        </div>
      </section>

      {/* Dampak Bullying Section */}
      <section className="dampak-bullying-section">
        <div className="dampak-container">
          <div className="dampak-left">
            <h2 className="dampak-title">Dampak Bullying</h2>
            <p className="dampak-intro">
              Coba bayangin, gimana rasanya kalau ada teman yang terus 
              diejek, dijauhi, atau bahkan disakiti? Kelihatannya sepele, tapi 
              ternyata bullying bisa bikin hati seseorang terluka dalam banget! 💔
            </p>
            <p className="dampak-intro">
              Yuk, kita cari tahu bareng-bareng apa sih dampak dari 
              bullying biar kita bisa sama-sama mencegahnya
            </p>
            
            <div className="dampak-buttons">
              <button className="dampak-btn">Sedih banget dan gak percaya diri</button>
              <button className="dampak-btn">Takut untuk pergi ke sekolah</button>
              <button className="dampak-btn">Merasa sendirian, ga punya teman</button>
              <button className="dampak-btn">Tidak bisa fokus belajar</button>
            </div>
          </div>
          
          <div className="dampak-right">
            <img src={bearWhistleImage} alt="Nobi with Whistle" className="bear-whistle" />
          </div>
        </div>
      </section>

      {/* Pesan dari Cerita Section */}
      <section className="pesan-cerita-section">
        <div className="pesan-container">
          <div className="pesan-left">
            <div className="bear-story">
              <div className="speech-bubble-story">
                <p>
                  Kadang kita pikir bercanda itu seru, tapi kalau bikin teman sedih, 
                  itu udah bukan lucu lagi, Yang keren itu, anak yang berani minta maaf 
                  dan mau berubah!
                </p>
              </div>
              <img src={bearSadImage} alt="Nobi Sad" className="bear-sad" />
            </div>
          </div>
          
          <div className="pesan-right">
            <h2 className="pesan-title">Pesan dari Cerita</h2>
            <div className="pesan-box">
              <ul className="pesan-list">
                <li>Jangan bercanda soal keluarga atau orang tua teman.</li>
                <li>Kalau temanmu kelihatan gak suka, hentikan dan minta maaf.</li>
                <li>Hormati orang tua teman seperti kamu menghormati orang tuamu sendiri.</li>
                <li>Anak baik itu bukan yang bisa bikin orang ketawa, tapi yang bisa bikin orang merasa nyaman 🌟</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer with Back Button */}
        <div className="footer-section">
          <button className="back-button-footer" onClick={handleBackClick}>
            <span className="back-icon">↩</span>
            <span>BACK</span>
          </button>
          
          <p className="footer-center-text">Saling Jaga, Saling Sayang</p>
          
          <p className="footer-text">Mari bersama-sama mencegah bullying di sekolah dan lingkungan kita</p>
        </div>
      </section>
    </div>
  )
}

export default Edukasi
