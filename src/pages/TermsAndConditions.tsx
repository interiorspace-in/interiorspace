import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Interior Space</title>
        <meta name="description" content="Read the terms and conditions for Interior Space interior design services in Pune." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms & Conditions</h1>
            
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                <strong>Last Updated:</strong> January 2, 2026
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Agreement to Terms</h2>
              <p>
                By accessing or using the Interior Space website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our website or use our services.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Services</h2>
              <p>
                Interior Space provides interior design consultation, planning, execution, and related services. The specific scope of services, deliverables, timelines, and costs will be detailed in individual project proposals and agreements.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Quotations and Pricing</h2>
              <ul className="list-disc pl-6">
                <li>All quotations are valid for 15 days from the date of issue unless otherwise specified.</li>
                <li>Prices are subject to change based on material costs, design modifications, and market conditions.</li>
                <li>Additional work beyond the agreed scope will be quoted separately.</li>
                <li>All prices are exclusive of applicable taxes unless stated otherwise.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">Payment Terms</h2>
              <ul className="list-disc pl-6">
                <li>An advance payment is required to commence work, as specified in the project agreement.</li>
                <li>Payment schedules will be outlined in the project proposal.</li>
                <li>Delays in payment may result in project delays.</li>
                <li>All payments are non-refundable once work has commenced unless otherwise agreed in writing.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">Project Timeline</h2>
              <ul className="list-disc pl-6">
                <li>Project timelines are estimates and may vary based on various factors including material availability, site conditions, and client approvals.</li>
                <li>Interior Space is not liable for delays caused by factors beyond our control, including but not limited to client delays, third-party delays, force majeure events, or supply chain disruptions.</li>
                <li>Timely client decisions and approvals are essential for project completion.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">Client Responsibilities</h2>
              <p>The client agrees to:</p>
              <ul className="list-disc pl-6">
                <li>Provide accurate information about the project requirements</li>
                <li>Ensure clear access to the project site for our team</li>
                <li>Make timely payments as per the agreed schedule</li>
                <li>Provide necessary approvals within reasonable timeframes</li>
                <li>Inform us of any existing structural or electrical issues</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">Intellectual Property</h2>
              <p>
                All designs, drawings, concepts, and creative work produced by Interior Space remain our intellectual property until full payment is received. Unauthorized use, reproduction, or distribution of our designs is prohibited.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Warranty</h2>
              <ul className="list-disc pl-6">
                <li>Warranty periods for products and workmanship will be specified in the project agreement.</li>
                <li>Warranty does not cover damage due to misuse, negligence, or natural wear and tear.</li>
                <li>Third-party products are covered by their respective manufacturer warranties.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">Limitation of Liability</h2>
              <p>
                Interior Space shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of our services.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Cancellation</h2>
              <ul className="list-disc pl-6">
                <li>Cancellation requests must be made in writing.</li>
                <li>Cancellation charges may apply based on the work completed at the time of cancellation.</li>
                <li>Custom-ordered materials are non-refundable.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <ul className="list-disc pl-6">
                <li>Phone: +91 9175956905</li>
                <li>Address: Ravet, Pune, Maharashtra, India</li>
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TermsAndConditions;
