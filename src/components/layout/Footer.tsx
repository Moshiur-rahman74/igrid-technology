import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] border-t border-[#E8DCC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="text-2xl font-bold text-[#FFFFFF] mb-4 tracking-tight">
              IGrid<span className="text-[#00D4FF]">Technology</span>
            </div>
            <p className="text-[#EAF6FF]/70 text-sm leading-relaxed mb-6">
              Leading provider of industrial automation hardware configurators for factories, CNC machines, and production lines. Empowering industries with precision automation solutions.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-[#0A192F]/50 rounded-lg flex items-center justify-center hover:bg-[#00D4FF] transition-colors cursor-pointer">
                <svg className="w-5 h-5 text-white hover:text-[#0A192F]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-[#0A192F]/50 rounded-lg flex items-center justify-center hover:bg-[#00D4FF] transition-colors cursor-pointer">
                <svg className="w-5 h-5 text-white hover:text-[#0A192F]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#FFFFFF] font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/automation-solutions" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Automation Solutions
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Industries We Serve
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[#FFFFFF] font-semibold mb-6 text-lg">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Blog / Knowledge Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Pricing / Cost Estimation
                </Link>
              </li>
              <li>
                <Link href="/prototype-summary" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Prototype Summary
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#FFFFFF] font-semibold mb-6 text-lg">Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Expert Consultation
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] text-sm transition-colors flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E8DCC8]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-center text-[#EAF6FF]/70 text-sm">
              © {new Date().getFullYear()} IGrid Technology. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] transition-colors">Terms of Service</Link>
              <Link href="#" className="text-[#EAF6FF]/70 hover:text-[#00D4FF] transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
