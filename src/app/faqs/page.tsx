export default function FAQsPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <ul className="list-disc space-y-2 pl-5 text-gray-700">
        <li><strong>Do you deliver nationwide?</strong> Yes, we deliver across Pakistan.</li>
        <li><strong>What are the delivery charges?</strong> Charges vary based on location and order quantity.</li>
        <li><strong>Which payment methods are accepted?</strong> We accept credit cards, bank transfers, and cash on delivery (COD in select areas).</li>
        <li><strong>Can I change or cancel my order?</strong> Yes, before dispatch. Contact us immediately.</li>
        <li><strong>How can I track my order?</strong> Use the <a href="/track-order" className="underline text-blue-600">Order Tracking</a> page.</li>
      </ul>
    </main>
  );
}
