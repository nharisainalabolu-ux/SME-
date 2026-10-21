import React, { useState } from 'react';
import { 
  Gauge, 
  Zap, 
  Flame, 
  Volume2, 
  Share2, 
  ExternalLink, 
  Maximize2, 
  X,
  ChevronRight,
  Shield,
  Award
} from 'lucide-react';

export const PorscheShowcase: React.FC = () => {
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);
  const [isEngineRevving, setIsEngineRevving] = useState(false);

  // Synthesize realistic engine rev sound with Web Audio API
  const playEngineSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      setIsEngineRevving(true);

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);

      // Pitch sweep simulating flat-6 throttle acceleration
      osc.frequency.setValueAtTime(80, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.35);

      setTimeout(() => {
        setIsEngineRevving(false);
      }, 1400);
    } catch (e) {
      console.warn('Audio playback not supported or user gesture needed', e);
      setIsEngineRevving(false);
    }
  };

  const carImages = [
    {
      src: '/imgs/porsche1.jpg',
      title: 'Porsche 911 GT3 RS',
      subtitle: 'Track Precision & Naturally Aspirated Mastery',
      tag: 'Iconic Track Weapon',
      specs: '525 HP • 3.2s 0-100 • 296 km/h'
    },
    {
      src: '/imgs/porsche2.jpg',
      title: 'Porsche Taycan Turbo S',
      subtitle: 'Pure Electric Architecture & Launch Control',
      tag: 'Electric Performance',
      specs: '761 HP • 2.8s 0-100 • 260 km/h'
    },
    {
      src: '/imgs/porsche3.avif',
      title: 'Porsche 718 Cayman GT4',
      subtitle: 'Mid-Engine Balance & Pure Driving Dynamics',
      tag: 'Mid-Engine Purity',
      specs: '420 HP • 3.9s 0-100 • 304 km/h'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-neutral-100 font-['DM_Sans',sans-serif]">
      {/* Top Banner Navigation */}
      <nav className="border-b border-neutral-800 bg-[#141414]/90 backdrop-blur sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black tracking-widest text-[#d81e28] font-['Space_Grotesk']">
              PORSCHE
            </h1>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest px-2.5 py-0.5 rounded bg-neutral-900 text-neutral-400 border border-neutral-800 font-semibold">
              Stuttgart Heritage
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-neutral-300">
            <a href="#home" className="hover:text-red-500 transition">Home</a>
            <a href="#history" className="hover:text-red-500 transition">Heritage</a>
            <a href="#gallery" className="hover:text-red-500 transition">Vehicles</a>
            <a href="#contact" className="hover:text-red-500 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-12 pb-20 border-b border-neutral-800/80">
        <div className="absolute inset-0 bg-radial from-red-950/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 text-red-400 border border-red-800/40 text-xs font-bold tracking-wider uppercase mb-4">
              <Flame className="w-3.5 h-3.5" />
              <span>Motorsport DNA Since 1931</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-['Space_Grotesk'] leading-tight">
              Your Porsche journey starts now.
            </h2>
            <p className="text-xl sm:text-2xl font-medium text-red-500 mt-2 font-['Space_Grotesk']">
              Driven by the love for sports cars.
            </p>

            <p className="text-base text-neutral-300 mt-6 leading-relaxed">
              Founded in 1931 by Ferdinand Porsche and headquartered in Stuttgart, Germany, 
              Porsche AG has evolved from an automotive engineering firm into one of the world's 
              most iconic manufacturers of luxury high-performance sports cars.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={playEngineSound}
                disabled={isEngineRevving}
                className="px-6 py-3.5 rounded-xl bg-[#c51722] hover:bg-[#a5121b] text-white font-extrabold text-sm tracking-wide transition shadow-lg shadow-red-900/30 flex items-center gap-2.5 cursor-pointer disabled:opacity-60"
              >
                <Volume2 className={`w-4 h-4 ${isEngineRevving ? 'animate-ping' : ''}`} />
                <span>{isEngineRevving ? 'Flat-6 Roaring...' : 'Start Engine Sound'}</span>
              </button>

              <a
                href="https://www.porsche.com"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold text-sm transition flex items-center gap-2"
              >
                <span>Official International</span>
                <ExternalLink className="w-4 h-4 text-neutral-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Benchmark Specs */}
      <section id="history" className="py-16 bg-[#111111] border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs font-bold text-red-500 tracking-widest uppercase">
                ENGINEERING HERITAGE
              </p>
              <h3 className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
                From the 356 Roadster to the Legendary 911
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                The brand solidified its legendary reputation in 1948 with the lightweight <strong>356 "No. 1" Roadster</strong>, 
                developed under Ferry Porsche. This laid the unbreakable groundwork for the historic debut of the rear-engined 
                <strong> Porsche 911 in 1964</strong> — a car whose timeless silhouette and race-bred engineering continue to dominate 
                the world's most demanding circuits.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <div className="text-2xl font-black text-white font-['Space_Grotesk']">1931</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Founded in Stuttgart</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <div className="text-2xl font-black text-red-500 font-['Space_Grotesk']">1948</div>
                  <div className="text-xs text-neutral-400 mt-0.5">356 Roadster Debut</div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 col-span-2 sm:col-span-1">
                  <div className="text-2xl font-black text-white font-['Space_Grotesk']">1964</div>
                  <div className="text-xs text-neutral-400 mt-0.5">Iconic 911 Born</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#161616] border border-neutral-800">
                <Gauge className="w-6 h-6 text-red-500 mb-2" />
                <div className="text-2xl font-extrabold text-white">2.8s</div>
                <div className="text-xs text-neutral-400 mt-1">0-100 km/h (Taycan Turbo S)</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#161616] border border-neutral-800">
                <Zap className="w-6 h-6 text-amber-500 mb-2" />
                <div className="text-2xl font-extrabold text-white">761 HP</div>
                <div className="text-xs text-neutral-400 mt-1">Overboost Launch Power</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#161616] border border-neutral-800">
                <Shield className="w-6 h-6 text-emerald-500 mb-2" />
                <div className="text-2xl font-extrabold text-white">30,000+</div>
                <div className="text-xs text-neutral-400 mt-1">Race Victories Worldwide</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#161616] border border-neutral-800">
                <Award className="w-6 h-6 text-red-400 mb-2" />
                <div className="text-2xl font-extrabold text-white">19 Wins</div>
                <div className="text-xs text-neutral-400 mt-1">24 Hours of Le Mans Overall</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section id="gallery" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-xs font-bold text-red-500 tracking-widest uppercase">GALLERY</p>
            <h3 className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
              The Lineage of Pure Performance
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Click any showcase image to inspect high-resolution details and engineering specs.
            </p>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Original Project Assets Loaded
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {carImages.map((car, index) => (
            <div
              key={index}
              onClick={() => setActiveModalImage(car.src)}
              className="group bg-[#161616] rounded-2xl border border-neutral-800 overflow-hidden hover:border-red-900/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-red-950/20 flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-900">
                <img
                  src={car.src}
                  alt={car.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur text-red-400 border border-red-900/50">
                    {car.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-lg bg-black/80 text-white flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-lg text-white font-['Space_Grotesk'] group-hover:text-red-400 transition">
                    {car.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    {car.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] font-mono text-neutral-300 flex items-center justify-between">
                  <span>{car.specs}</span>
                  <ChevronRight className="w-4 h-4 text-red-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div 
          onClick={() => setActiveModalImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#161616] rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-red-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeModalImage}
              alt="Porsche High Res"
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4 bg-[#111111] flex items-center justify-between text-xs text-neutral-400">
              <span>Porsche Luxury High-Performance Sports Cars</span>
              <a
                href={activeModalImage}
                target="_blank"
                rel="noreferrer"
                className="text-red-400 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Open Raw Asset</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Contact & Social Footer */}
      <footer id="contact" className="bg-[#080808] border-t border-neutral-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-800">
            <div>
              <h4 className="text-xl font-black text-white font-['Space_Grotesk'] tracking-wider">
                PORSCHE INTERNATIONAL
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Headquarters: Dr. Ing. h.c. F. Porsche AG • Stuttgart-Zuffenhausen, Germany
              </p>
            </div>

            {/* Social channels using original assets */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img
                  src="/imgs/linkdein.png"
                  alt="LinkedIn"
                  className="w-7 h-7 rounded object-contain"
                />
                <span className="text-xs text-neutral-300 font-semibold">LinkedIn Official</span>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="/imgs/intagram.jpg"
                  alt="Instagram"
                  className="w-7 h-7 rounded object-cover"
                />
                <span className="text-xs text-neutral-300 font-semibold">Instagram @porsche</span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
            <span>© 2026 Porsche Internationals. All rights reserved.</span>
            <span>Refactored and elevated from the original SME web project archive.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
