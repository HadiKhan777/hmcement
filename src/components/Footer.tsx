'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Footer Section - Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:underline">FAQs</Link>
            </li>
            <li>
              <Link href="/return-refund-policy" className="hover:underline">Return / Refund Policy</Link>
            </li>
          </ul>
        </div>

        {/* Empty Column for future use or layout symmetry */}
        <div />

        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="mb-2">H&M Company</p>
          <p className="mb-2">Phone: <a href="tel:+923004013971" className="hover:underline">0300-4013971</a></p>
          <p className="mb-2">Email: <a href="mailto:orders@hmcement.com" className="hover:underline">orders@hmcement.com</a></p>
          <p>Address: 146-T, DHA Phase 7, Lahore, Pakistan</p>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} H&M Company. All rights reserved.
      </div>
    </footer>
  );
}
