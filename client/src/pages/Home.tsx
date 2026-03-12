/**
 * RevmaMax Landing Page — Dark Energy / Neo-Industrial
 * Design: Deep navy (#0D1B3E → #1A3A6B) + Electric Yellow (#FBBF24) + Bright Blue (#3B82F6)
 * Font: Montserrat (headings, bold) + Inter (body)
 * Sections: Navbar → Hero → Stats → Benefits → How It Works → Testimonials → FAQ → CTA → Footer
 */

import { useEffect, useRef, useState } from "react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427354064/4DAz8H2wtNq9Jq4Bftyda4/revmamax_logo_eb2f1154.jpg";
const HERO_BG_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427354064/4DAz8H2wtNq9Jq4Bftyda4/revmamax_hero_bg-fmHCPGJ3x5XPNSKqoSbHWt.webp";
const HOUSE_ENERGY_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427354064/4DAz8H2wtNq9Jq4Bftyda4/revmamax_house_energy-c6kS34Lf48gwUQDE5JkfYx.webp";
const FAMILY_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427354064/4DAz8H2wtNq9Jq4Bftyda4/revmamax_savings-ak5geFevLfnk2d6pNBEnZA.webp";

// Animated counter hook
function useCounter(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// Intersection observer hook
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(13, 27, 62, 0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-full overflow-hidden border-2"
            style={{ borderColor: "#FBBF24" }}
          >
            <img src={LOGO_URL} alt="RevmaMax" className="w-full h-full object-cover" />
          </div>
          <span
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800 }}
            className="text-xl"
          >
            <span className="text-white">Revma</span>
            <span style={{ color: "#3B82F6" }}>Max</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Πλεονεκτήματα", id: "benefits" },
            { label: "Πώς Λειτουργεί", id: "how" },
            { label: "Κριτικές", id: "testimonials" },
            { label: "FAQ", id: "faq" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="btn-cta px-5 py-2 rounded-full text-sm"
          >
            Ξεκίνα Τώρα
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1.5 transition-all" style={{ transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "" }} />
          <div className="w-6 h-0.5 bg-white mb-1.5 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
          <div className="w-6 h-0.5 bg-white transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(13, 27, 62, 0.98)" }}
        >
          {[
            { label: "Πλεονεκτήματα", id: "benefits" },
            { label: "Πώς Λειτουργεί", id: "how" },
            { label: "Κριτικές", id: "testimonials" },
            { label: "FAQ", id: "faq" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-white/80 hover:text-white text-left py-2 border-b border-white/10"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="btn-cta px-5 py-3 rounded-full text-sm mt-2"
          >
            Ξεκίνα Τώρα
          </button>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0D1B3E 0%, #0F2456 50%, #1A3A6B 100%)",
      }}
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${HERO_BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(59,130,246,0.15) 0%, transparent 60%), linear-gradient(to bottom, transparent 50%, rgba(13,27,62,0.8) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container text-center py-32">
        {/* Logo with glow */}
        <div
          className="mx-auto mb-8 animate-logo-glow"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid #FBBF24",
            boxShadow: "0 0 40px rgba(251,191,36,0.5), 0 0 80px rgba(59,130,246,0.3)",
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0.8)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <img src={LOGO_URL} alt="RevmaMax Logo" className="w-full h-full object-cover" />
        </div>

        {/* Brand name */}
        <div
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            lineHeight: 1.1,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}
        >
          <span className="text-white">Revma</span>
          <span style={{ color: "#3B82F6" }}>Max</span>
        </div>

        {/* Tagline */}
        <p
          className="mt-4 text-yellow glow-yellow"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.35s",
          }}
        >
          Όσο ρεύμα θες, χωρίς να καίγεσαι
        </p>

        {/* Headline */}
        <h1
          className="mt-6 text-white glow-white"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            maxWidth: 700,
            margin: "1.5rem auto 0",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.5s",
          }}
        >
          Εξοικονόμησε στο ρεύμα τώρα!
        </h1>

        {/* Sub-copy */}
        <p
          className="mt-4 text-white/70 max-w-xl mx-auto"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            lineHeight: 1.7,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.65s",
          }}
        >
          Σταμάτα να πληρώνεις παραπάνω από όσο χρειάζεσαι. Με τη RevmaMax έχεις
          χαμηλότερο λογαριασμό, ασφαλή παροχή και άμεση εξυπηρέτηση.
        </p>

        {/* CTA Buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.8s",
          }}
        >
          <button
            className="btn-cta px-8 py-4 rounded-full text-lg animate-pulse-glow"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            ΜΑΘΕ ΠΕΡΙΣΣΟΤΕΡΑ →
          </button>
          <button
            className="px-8 py-4 rounded-full text-white border border-white/30 hover:border-white/60 transition-all text-lg"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
            onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
          >
            Πώς Λειτουργεί
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="mt-16 flex flex-col items-center gap-2 text-white/40"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease 1.2s" }}
        >
          <span className="text-xs" style={{ fontFamily: "Inter, sans-serif" }}>Κύλησε κάτω</span>
          <div className="w-0.5 h-8 bg-white/20 rounded-full relative overflow-hidden">
            <div
              className="absolute top-0 w-full bg-yellow-400 rounded-full"
              style={{
                height: "40%",
                animation: "scroll-dot 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-dot {
          0% { top: -40%; }
          100% { top: 140%; }
        }
      `}</style>
    </section>
  );
}

// Stats Section
function Stats() {
  const { ref, inView } = useInView(0.3);
  const c1 = useCounter(40, 2000, inView);
  const c2 = useCounter(15000, 2500, inView);
  const c3 = useCounter(98, 2000, inView);
  const c4 = useCounter(24, 1500, inView);

  const stats = [
    { value: c1, suffix: "%", label: "Εξοικονόμηση στο λογαριασμό", icon: "💰" },
    { value: c2, suffix: "+", label: "Ικανοποιημένοι πελάτες", icon: "👥" },
    { value: c3, suffix: "%", label: "Ποσοστό ικανοποίησης", icon: "⭐" },
    { value: c4, suffix: "/7", label: "Ώρες εξυπηρέτησης", icon: "🕐" },
  ];

  return (
    <section
      ref={ref}
      className="py-16"
      style={{ background: "linear-gradient(135deg, #0F2456 0%, #1A3A6B 100%)" }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center card-dark rounded-2xl p-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className="text-yellow"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                }}
              >
                {stat.value.toLocaleString("el-GR")}{stat.suffix}
              </div>
              <div
                className="text-white/70 text-sm mt-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Benefits Section
function Benefits() {
  const { ref, inView } = useInView(0.2);

  const benefits = [
    {
      icon: "⚡",
      title: "Χαμηλότερος Λογαριασμός",
      desc: "Εξοικονόμησε έως και 40% στον μηνιαίο λογαριασμό ρεύματός σου με τα ανταγωνιστικά μας τιμολόγια.",
    },
    {
      icon: "🛡️",
      title: "Ασφαλής & Αξιόπιστη Παροχή",
      desc: "Απρόσκοπτη παροχή ρεύματος χωρίς διακοπές. Η ασφάλεια του σπιτιού σου είναι η προτεραιότητά μας.",
    },
    {
      icon: "📞",
      title: "Άμεση Εξυπηρέτηση",
      desc: "Ομάδα εξυπηρέτησης 24/7 για να λύσει κάθε πρόβλημα. Απαντάμε σε λιγότερο από 2 ώρες.",
    },
    {
      icon: "📱",
      title: "Εύκολη Διαχείριση",
      desc: "Παρακολούθησε την κατανάλωσή σου, πλήρωσε λογαριασμούς και διαχειρίσου τη σύνδεσή σου από το κινητό σου.",
    },
    {
      icon: "🌱",
      title: "Πράσινη Ενέργεια",
      desc: "Επιλογές ανανεώσιμης ενέργειας για ένα πιο βιώσιμο μέλλον. Μείωσε το αποτύπωμα άνθρακα της οικογένειάς σου.",
    },
    {
      icon: "📋",
      title: "Διαφανής Τιμολόγηση",
      desc: "Χωρίς κρυφές χρεώσεις, χωρίς εκπλήξεις. Ξέρεις πάντα ακριβώς τι πληρώνεις και γιατί.",
    },
  ];

  return (
    <section id="benefits" className="py-24 section-dark" ref={ref}>
      <div className="container">
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <span
            className="text-yellow text-sm font-semibold uppercase tracking-widest"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Γιατί RevmaMax
          </span>
          <h2
            className="text-white mt-3"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            }}
          >
            Τα Πλεονεκτήματά μας
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif" }}>
            Δεν είμαστε απλώς ένας πάροχος ρεύματος. Είμαστε ο συνεργάτης σου για χαμηλότερους
            λογαριασμούς και καλύτερη ζωή.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="card-dark rounded-2xl p-7 hover:border-yellow-400/30 transition-all duration-300 group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s ease ${0.1 + i * 0.1}s`,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block"
              >
                {b.icon}
              </div>
              <h3
                className="text-white mb-3"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                {b.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works
function HowItWorks() {
  const { ref, inView } = useInView(0.2);

  const steps = [
    {
      num: "01",
      title: "Επικοινώνησε μαζί μας",
      desc: "Συμπλήρωσε τη φόρμα ή κάλεσέ μας. Ένας εκπρόσωπός μας θα επικοινωνήσει μαζί σου εντός 24 ωρών.",
    },
    {
      num: "02",
      title: "Λάβε την καλύτερη προσφορά",
      desc: "Αναλύουμε την κατανάλωσή σου και σου παρουσιάζουμε το ιδανικό πρόγραμμα για τις ανάγκες σου.",
    },
    {
      num: "03",
      title: "Αλλαγή χωρίς ταλαιπωρία",
      desc: "Αναλαμβάνουμε εμείς όλη τη διαδικασία αλλαγής παρόχου. Εσύ δεν χρειάζεται να κάνεις τίποτα.",
    },
    {
      num: "04",
      title: "Απόλαυσε χαμηλότερους λογαριασμούς",
      desc: "Από τον πρώτο κιόλας μήνα βλέπεις τη διαφορά στον λογαριασμό σου. Εξοικονόμηση εγγυημένη.",
    },
  ];

  return (
    <section
      id="how"
      className="py-24"
      style={{ background: "linear-gradient(180deg, #0D1B3E 0%, #0F2456 100%)" }}
      ref={ref}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: image */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.8s ease",
            }}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 20px 60px rgba(59,130,246,0.3), 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={HOUSE_ENERGY_URL}
                alt="Σπίτι με ενέργεια"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
            </div>
          </div>

          {/* Right: steps */}
          <div>
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(40px)",
                transition: "all 0.8s ease 0.2s",
              }}
            >
              <span
                className="text-yellow text-sm font-semibold uppercase tracking-widest"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Απλή Διαδικασία
              </span>
              <h2
                className="text-white mt-3 mb-10"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                }}
              >
                Πώς Λειτουργεί
              </h2>
            </div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-5"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(40px)",
                    transition: `all 0.6s ease ${0.3 + i * 0.15}s`,
                  }}
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black"
                    style={{
                      background: "linear-gradient(135deg, #FBBF24, #F59E0B)",
                      color: "#0D1B3E",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3
                      className="text-white font-bold mb-1"
                      style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1rem" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  const { ref, inView } = useInView(0.2);

  const testimonials = [
    {
      name: "Μαρία Π.",
      location: "Αθήνα",
      text: "Από τότε που άλλαξα στη RevmaMax, ο λογαριασμός μου μειώθηκε κατά 35%! Η διαδικασία ήταν απλή και η εξυπηρέτηση εξαιρετική.",
      rating: 5,
      savings: "€45/μήνα",
    },
    {
      name: "Γιώργης Κ.",
      location: "Θεσσαλονίκη",
      text: "Επιτέλους ένας πάροχος που κάνει αυτό που υπόσχεται. Χωρίς κρυφές χρεώσεις, χωρίς εκπλήξεις. Συνιστώ ανεπιφύλακτα!",
      rating: 5,
      savings: "€60/μήνα",
    },
    {
      name: "Ελένη Σ.",
      location: "Πάτρα",
      text: "Η αλλαγή παρόχου ήταν πανεύκολη. Ανέλαβαν τα πάντα και σε 3 μέρες ήμουν ήδη πελάτης τους. Εξοικονόμηση από τον πρώτο μήνα!",
      rating: 5,
      savings: "€38/μήνα",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 section-dark"
      ref={ref}
    >
      <div className="container">
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <span
            className="text-yellow text-sm font-semibold uppercase tracking-widest"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Τι Λένε οι Πελάτες μας
          </span>
          <h2
            className="text-white mt-3"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            }}
          >
            Πραγματικές Κριτικές
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="card-dark rounded-2xl p-7 flex flex-col"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s ease ${0.1 + i * 0.15}s`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} style={{ color: "#FBBF24" }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 leading-relaxed flex-1 text-sm italic" style={{ fontFamily: "Inter, sans-serif" }}>
                "{t.text}"
              </p>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {t.name}
                  </div>
                  <div className="text-white/40 text-xs">{t.location}</div>
                </div>
                <div
                  className="text-yellow font-black text-sm"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  -{t.savings}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Family image */}
        <div
          className="mt-16 rounded-3xl overflow-hidden relative"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease 0.5s",
            maxHeight: 400,
          }}
        >
          <img
            src={FAMILY_URL}
            alt="Ευτυχισμένη οικογένεια με χαμηλό λογαριασμό"
            className="w-full object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: "linear-gradient(to right, rgba(13,27,62,0.85) 0%, rgba(13,27,62,0.4) 50%, rgba(13,27,62,0.85) 100%)",
            }}
          >
            <div className="text-center px-4">
              <p
                className="text-white"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                }}
              >
                Πάνω από{" "}
                <span className="text-yellow">15.000 οικογένειες</span>
              </p>
              <p className="text-white/80 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
                εξοικονομούν ήδη με τη RevmaMax
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQ() {
  const { ref, inView } = useInView(0.2);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Πόσο χρόνο παίρνει η αλλαγή παρόχου;",
      a: "Η αλλαγή παρόχου ολοκληρώνεται συνήθως σε 3-5 εργάσιμες ημέρες. Εμείς αναλαμβάνουμε όλη τη διαδικασία και δεν υπάρχει καμία διακοπή στην παροχή ρεύματος.",
    },
    {
      q: "Χρειάζεται να κάνω κάτι εγώ για την αλλαγή;",
      a: "Σχεδόν τίποτα! Χρειαζόμαστε μόνο τον αριθμό παροχής σου (HEDNO) και τα στοιχεία σου. Τα υπόλοιπα τα αναλαμβάνουμε εμείς.",
    },
    {
      q: "Υπάρχουν κρυφές χρεώσεις;",
      a: "Απολύτως όχι. Η τιμολόγησή μας είναι 100% διαφανής. Πριν υπογράψεις, θα γνωρίζεις ακριβώς τι πληρώνεις.",
    },
    {
      q: "Τι γίνεται αν έχω πρόβλημα με το ρεύμα;",
      a: "Η ομάδα εξυπηρέτησής μας είναι διαθέσιμη 24/7. Μπορείς να επικοινωνήσεις μαζί μας τηλεφωνικά, μέσω email ή chat και θα σε εξυπηρετήσουμε άμεσα.",
    },
    {
      q: "Μπορώ να ακυρώσω οποιαδήποτε στιγμή;",
      a: "Ναι, μπορείς να ακυρώσεις τη σύμβασή σου οποιαδήποτε στιγμή χωρίς ποινή. Δεν δεσμεύεσαι με μακροχρόνια συμβόλαια.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-24"
      style={{ background: "linear-gradient(180deg, #0D1B3E 0%, #0F2456 100%)" }}
      ref={ref}
    >
      <div className="container max-w-3xl mx-auto">
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s ease",
          }}
        >
          <span
            className="text-yellow text-sm font-semibold uppercase tracking-widest"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Συχνές Ερωτήσεις
          </span>
          <h2
            className="text-white mt-3"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            }}
          >
            FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="card-dark rounded-xl overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${0.1 + i * 0.1}s`,
              }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span
                  className="text-white font-semibold text-sm"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {faq.q}
                </span>
                <span
                  className="text-yellow flex-shrink-0 text-xl transition-transform duration-300"
                  style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact / CTA Section
function ContactCTA() {
  const { ref, inView } = useInView(0.2);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F2456 0%, #1A3A6B 50%, #0D1B3E 100%)",
      }}
      ref={ref}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(251,191,36,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.6s ease",
            }}
          >
            <span
              className="text-yellow text-sm font-semibold uppercase tracking-widest"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Ξεκίνα Σήμερα
            </span>
            <h2
              className="text-white mt-3 mb-4"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              }}
            >
              Εξοικονόμησε στο Ρεύμα Τώρα!
            </h2>
            <p className="text-white/60 mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
              Συμπλήρωσε τη φόρμα και ένας εκπρόσωπός μας θα επικοινωνήσει μαζί σου
              εντός 24 ωρών με την καλύτερη προσφορά για σένα.
            </p>
          </div>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="card-dark rounded-3xl p-8 text-left"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.7s ease 0.2s",
              }}
            >
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-white/80 text-sm mb-2 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Ονοματεπώνυμο *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="π.χ. Γιώργης Παπαδόπουλος"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 transition-all"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#FBBF24")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                </div>
                <div>
                  <label
                    className="block text-white/80 text-sm mb-2 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Τηλέφωνο *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="π.χ. 6912345678"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#FBBF24")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                </div>
                <div>
                  <label
                    className="block text-white/80 text-sm mb-2 font-medium"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Email (προαιρετικό)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="π.χ. email@example.com"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.95rem",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#FBBF24")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-cta w-full mt-6 py-4 rounded-xl text-lg animate-pulse-glow"
              >
                ΘΕΛΩ ΝΑ ΕΞΟΙΚΟΝΟΜΗΣΩ ΤΩΡΑ →
              </button>

              <p className="text-white/30 text-xs text-center mt-4" style={{ fontFamily: "Inter, sans-serif" }}>
                Τα στοιχεία σου είναι ασφαλή. Δεν τα μοιραζόμαστε με τρίτους.
              </p>
            </form>
          ) : (
            <div
              className="card-dark rounded-3xl p-12 text-center"
              style={{
                opacity: inView ? 1 : 0,
                animation: "float-up 0.6s ease forwards",
              }}
            >
              <div className="text-6xl mb-4">✅</div>
              <h3
                className="text-white text-2xl font-bold mb-3"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Λάβαμε το αίτημά σου!
              </h3>
              <p className="text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>
                Ένας εκπρόσωπός μας θα επικοινωνήσει μαζί σου εντός 24 ωρών.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer
      className="py-12 border-t"
      style={{
        background: "#0A1628",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-full overflow-hidden border-2"
                style={{ borderColor: "#FBBF24" }}
              >
                <img src={LOGO_URL} alt="RevmaMax" className="w-full h-full object-cover" />
              </div>
              <span
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1.2rem" }}
              >
                <span className="text-white">Revma</span>
                <span style={{ color: "#3B82F6" }}>Max</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Η πιο συμφέρουσα παροχή ηλεκτρικού ρεύματος στην Ελλάδα.
              Όσο ρεύμα θες, χωρίς να καίγεσαι.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-white font-bold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Σύνδεσμοι
            </h4>
            <ul className="space-y-2">
              {["Αρχική", "Πλεονεκτήματα", "Πώς Λειτουργεί", "Κριτικές", "FAQ"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/50 hover:text-yellow transition-colors text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white font-bold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Επικοινωνία
            </h4>
            <ul className="space-y-2 text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
              <li>📧 info@revmamax.gr</li>
              <li>📞 210 123 4567</li>
              <li>🕐 24/7 Εξυπηρέτηση</li>
              <li>📍 Αθήνα, Ελλάδα</li>
            </ul>
          </div>
        </div>

        <div
          className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/30 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            © 2026 RevmaMax. Όλα τα δικαιώματα διατηρούνται.
          </p>
          <div className="flex gap-6">
            {["Πολιτική Απορρήτου", "Όροι Χρήσης"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/30 hover:text-white/60 text-xs transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sticky CTA bar (mobile)
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300"
      style={{ transform: visible ? "translateY(0)" : "translateY(100%" }}
    >
      <div
        className="px-4 py-3"
        style={{ background: "rgba(13,27,62,0.97)", borderTop: "1px solid rgba(251,191,36,0.3)" }}
      >
        <button
          className="btn-cta w-full py-3 rounded-xl text-sm"
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        >
          ΕΞΟΙΚΟΝΟΜΗΣΕ ΤΩΡΑ →
        </button>
      </div>
    </div>
  );
}

// Main page
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#0D1B3E" }}>
      <Navbar />
      <Hero />
      <Stats />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <ContactCTA />
      <Footer />
      <StickyCTA />
    </div>
  );
}
