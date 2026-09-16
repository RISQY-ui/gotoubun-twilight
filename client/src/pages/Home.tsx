import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, ChevronRight, Heart, Menu, Play, Sparkles, X } from "lucide-react";

const heroImage = "/manus-storage/gotoubun-hero_6511c57a.jpg";
const memoryImage = "/manus-storage/gotoubun-memory_31fcffe9.jpg";
const portraitImage = "/manus-storage/gotoubun-portrait_fc6f99fd.jpg";

type Quint = {
  id: string;
  number: string;
  name: string;
  kanji: string;
  role: string;
  color: string;
  className: string;
  quote: string;
};

const quintuplets: Quint[] = [
  { id: "ichika", number: "01", name: "Ichika", kanji: "一花", role: "The Dreamer", color: "#d68b94", className: "ichika", quote: "Kadang, menjadi dewasa adalah belajar tersenyum di waktu yang tepat." },
  { id: "nino", number: "02", name: "Nino", kanji: "二乃", role: "The Heart", color: "#a879a7", className: "nino", quote: "Perasaan yang paling jujur sering datang dengan suara paling berani." },
  { id: "miku", number: "03", name: "Miku", kanji: "三玖", role: "The Quiet One", color: "#8198b9", className: "miku", quote: "Aku mungkin pelan, tapi aku selalu tahu apa yang ingin kuperjuangkan." },
  { id: "yotsuba", number: "04", name: "Yotsuba", kanji: "四葉", role: "The Spark", color: "#b4a45d", className: "yotsuba", quote: "Kalau kita berjalan bersama, jalan yang panjang pun terasa ringan." },
  { id: "itsuki", number: "05", name: "Itsuki", kanji: "五月", role: "The North Star", color: "#d96f75", className: "itsuki", quote: "Mimpi yang besar dimulai dari keberanian untuk tetap mencoba." },
];

const memories = [
  { index: "01", title: "The First Bell", caption: "Lima nama, satu kelas, dan awal dari segala kebetulan.", tag: "BEGINNING", position: "center 62%", image: memoryImage },
  { index: "02", title: "A Place to Return", caption: "Di antara senja, rahasia kecil selalu menemukan rumahnya.", tag: "SHELTER", position: "72% center", image: heroImage },
  { index: "03", title: "Five Petals", caption: "Bukan tentang siapa yang paling terang, tetapi bagaimana mereka bersinar bersama.", tag: "TOGETHER", position: "18% center", image: portraitImage },
];

export default function Home() {
  const [activeProfile, setActiveProfile] = useState("ichika");
  const [activeSection, setActiveSection] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState(0);
  const selectedQuint = useMemo(() => quintuplets.find((quint) => quint.id === activeProfile) ?? quintuplets[0], [activeProfile]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
      setScrollY(window.scrollY);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
        <button className="brand-mark" onClick={() => jumpTo("top")} aria-label="Kembali ke awal">
          <span className="brand-mark__count">05</span><span className="brand-mark__name">GOTOUBUN</span>
        </button>
        <nav className={`site-nav__links ${menuOpen ? "site-nav__links--open" : ""}`} aria-label="Navigasi utama">
          <button className={activeSection === "top" ? "is-active" : ""} onClick={() => jumpTo("top")}><span>01</span> Intro</button>
          <button className={activeSection === "profile" ? "is-active" : ""} onClick={() => jumpTo("profile")}><span>02</span> Profil</button>
          <button className={activeSection === "memories" ? "is-active" : ""} onClick={() => jumpTo("memories")}><span>03</span> Kenangan</button>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Buka menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main>
        <section id="top" className="hero-section">
          <div className="hero-section__image" style={{ transform: `translate3d(0, ${scrollY * 0.14}px, 0) scale(1.08)` }} />
          <div className="hero-section__veil" /><div className="hero-section__grain" />
          <div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" />
          <div className="hero-section__content page-frame">
            <div className="hero-copy" style={{ transform: `translate3d(0, ${scrollY * -0.035}px, 0)` }}>
              <div className="eyebrow eyebrow--light"><Sparkles size={13} /><span>A story about five hearts</span></div>
              <p className="hero-copy__kicker">The Quintessential Quintuplets</p>
              <h1><span>Five hearts.</span><em>One story.</em></h1>
              <p className="hero-copy__lead">A quiet archive of laughter, rivalry, and the small moments that made five sisters feel like home.</p>
              <div className="hero-copy__actions">
                <button className="button button--light" onClick={() => jumpTo("profile")}>Explore profiles <ArrowUpRight size={16} /></button>
                <button className="text-link text-link--light" onClick={() => jumpTo("memories")}>Open memory lane <ArrowDown size={15} /></button>
              </div>
            </div>
            <div className="hero-meta"><div className="hero-meta__line" /><div><span>SCROLL TO DISCOVER</span><small>東京 · 2019 — 2024</small></div></div>
          </div>
          <aside className="chapter-rail" aria-label="Chapter navigation"><span className="chapter-rail__label">CHAPTERS</span><div className="chapter-rail__line" /><span className="chapter-rail__current">01</span></aside>
        </section>

        <section id="profile" className="profile-section section-light">
          <div className="page-frame profile-layout">
            <div className="profile-intro">
              <div className="eyebrow"><span className="eyebrow__dot" /><span>Meet the quintuplets</span></div>
              <p className="section-index">02 / PROFILE</p>
              <h2>Lima warna,<br /><i>satu frekuensi.</i></h2>
              <p className="section-lead">Mereka lahir bersamaan, tumbuh bersebelahan, lalu menemukan bahwa menjadi diri sendiri tidak pernah berarti berjalan sendirian.</p>
              <div className="profile-note"><Heart size={15} fill="currentColor" /><span>Tap a name to reveal her side of the story</span></div>
              <div className="profile-feature-image"><img src={portraitImage} alt="Siluet editorial perempuan di bawah cahaya senja" /><span>“For the moments<br />that stay.”</span></div>
            </div>
            <div className="profile-showcase">
              <div className="profile-showcase__topline"><span>THE FIVE OF THEM</span><span>01 — 05</span></div>
              <div className="profile-list">
                {quintuplets.map((quint) => (
                  <button key={quint.id} className={`profile-row ${activeProfile === quint.id ? "profile-row--active" : ""}`} onClick={() => setActiveProfile(quint.id)} style={{ "--profile-color": quint.color } as React.CSSProperties}>
                    <span className="profile-row__number">{quint.number}</span><span className="profile-row__name">{quint.name}</span><span className="profile-row__kanji">{quint.kanji}</span><span className="profile-row__role">{quint.role}</span><ChevronRight className="profile-row__arrow" size={18} />
                  </button>
                ))}
              </div>
              <div className={`profile-detail profile-detail--${selectedQuint.className}`}>
                <div className="profile-detail__halo" /><span className="profile-detail__number">{selectedQuint.number}</span>
                <div className="profile-detail__copy"><span>NOW REVEALING</span><h3>{selectedQuint.name}</h3><p>{selectedQuint.quote}</p></div>
                <div className="profile-detail__stamp">{selectedQuint.kanji}</div>
              </div>
            </div>
          </div>
        </section>

        <section id="memories" className="memories-section">
          <div className="memories-section__backdrop" />
          <div className="page-frame memories-content">
            <div className="memories-heading">
              <div><div className="eyebrow eyebrow--light"><span className="eyebrow__dot" /><span>Fragments worth keeping</span></div><p className="section-index section-index--light">03 / MEMORIES</p><h2>What remains<br /><i>after the bell.</i></h2></div>
              <p className="memories-heading__copy">Some memories arrive loudly. The best ones tend to stay in the details: a borrowed ribbon, a last train, a promise hidden inside a joke.</p>
            </div>
            <div className="memory-grid">
              {memories.map((memory, index) => (
                <button key={memory.index} className={`memory-card ${selectedMemory === index ? "memory-card--selected" : ""}`} onClick={() => setSelectedMemory(index)}>
                  <div className="memory-card__image" style={{ backgroundImage: `url(${memory.image})`, backgroundPosition: memory.position }} /><div className="memory-card__shade" />
                  <div className="memory-card__topline"><span>{memory.tag}</span><span>{memory.index}</span></div>
                  <div className="memory-card__copy"><h3>{memory.title}</h3><p>{memory.caption}</p><span className="memory-card__open">View fragment <ArrowUpRight size={15} /></span></div>
                </button>
              ))}
            </div>
            <div className="memories-quote"><Play size={16} fill="currentColor" /><span>Press play on a memory</span><div className="memories-quote__line" /><small>01:24 / 05:00</small></div>
          </div>
        </section>

        <section className="closing-section section-light"><div className="page-frame closing-layout"><span className="closing-section__mark">五</span><div><div className="eyebrow"><span className="eyebrow__dot" /><span>Until the next chapter</span></div><h2>Some stories feel<br /><i>like coming home.</i></h2></div><button className="button button--plum" onClick={() => jumpTo("top")}>Back to the beginning <ArrowUpRight size={16} /></button></div></section>
      </main>
      <footer className="site-footer"><div className="page-frame site-footer__inner"><span>GOTOUBUN / ARCHIVE 05</span><span>Made with a little nostalgia · 2026</span></div></footer>
    </div>
  );
}
