import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 py-12 mt-auto border-t border-slate-100">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-extrabold text-primary">Solusi Cerai</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-sm mb-6">
            Layanan pendampingan hukum yang profesional, dapat diandalkan, dan selalu siap mendengarkan. Khususnya dalam menyelesaikan masalah perdata dan perceraian dengan proses yang jelas dan transparan.
          </p>
        </div>
        
        <div>
          <h3 className="text-slate-900 font-bold mb-4 text-lg">Tautan</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-primary transition-colors">Beranda</Link></li>
            <li><Link href="/layanan" className="hover:text-primary transition-colors">Layanan Kami</Link></li>
            <li><Link href="/pengacara" className="hover:text-primary transition-colors">Tim Pengacara</Link></li>
            <li><Link href="/artikel" className="hover:text-primary transition-colors">Edukasi Hukum</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-slate-900 font-bold mb-4 text-lg">Hubungi Kami</h3>
          <ul className="space-y-3 text-sm">
            <li>Jl. Keadilan No 1, Jakarta Selatan</li>
            <li>Email: halo@solusicerai.id</li>
            <li>WA: 0821-1177-1221</li>
          </ul>
          <a
            href="https://wa.me/6282111771221?text=Halo%20Solusi%20Cerai,%20saya%20ingin%20berkonsultasi."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-primary/10 hover:bg-primary/20 text-primary font-bold px-6 py-3 rounded-full transition-colors"
          >
            Chat WhatsApp
          </a>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-100 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Solusi Cerai. Seluruh hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
