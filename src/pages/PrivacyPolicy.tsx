import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Interior Space</title>
        <meta name="description" content="Read the privacy policy for Interior Space interior design services in Pune." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                <strong>Last Updated:</strong> January 2, 2026
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Introduction</h2>
              <p>
                Interior Space ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Information We Collect</h2>
              <p>We may collect information about you in a variety of ways:</p>
              
              <h3 className="text-lg font-medium text-foreground mt-4">Personal Data</h3>
              <p>
                When you fill out our estimate forms or contact us, we collect personally identifiable information such as:
              </p>
              <ul className="list-disc pl-6">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Property details (floor plan type, budget range, possession timeline)</li>
                <li>Project requirements and preferences</li>
              </ul>

              <h3 className="text-lg font-medium text-foreground mt-4">Usage Data</h3>
              <p>
                We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Use of Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6">
                <li>Provide and maintain our services</li>
                <li>Respond to your inquiries and fulfill your requests</li>
                <li>Send you project estimates and quotations</li>
                <li>Communicate with you about our services, promotions, and updates</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">Disclosure of Your Information</h2>
              <p>We may share information we have collected about you in certain situations:</p>
              <ul className="list-disc pl-6">
                <li><strong>Business Partners:</strong> We may share your information with our trusted vendors, suppliers, and contractors who assist us in providing our services.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information where required by law or if we believe such action is necessary to comply with legal processes.</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with a merger, acquisition, or sale of assets.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to protect your personal information. While we have taken reasonable steps to secure the information you provide to us, please be aware that no security measures are perfect or impenetrable.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate personal data</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Withdraw consent at any time</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mt-8">Cookies</h2>
              <p>
                We may use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
