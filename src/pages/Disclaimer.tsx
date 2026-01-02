import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer | Interior Space</title>
        <meta name="description" content="Read the disclaimer for Interior Space interior design services in Pune." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Disclaimer</h1>
            
            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                <strong>Last Updated:</strong> January 2, 2026
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">General Information</h2>
              <p>
                The information provided on the Interior Space website is for general informational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Professional Disclaimer</h2>
              <p>
                The site cannot and does not contain interior design advice specific to your situation. The interior design information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Project Estimates</h2>
              <p>
                All estimates and quotations provided through our website or during consultations are approximate and subject to change based on actual site conditions, material availability, design modifications, and other factors. Final pricing will be confirmed in a detailed written proposal after site inspection and design finalization.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Images and Representations</h2>
              <p>
                Images, renderings, and photographs displayed on this website are for illustrative purposes only. Actual products, materials, and finished projects may vary in color, texture, and appearance due to photography, screen display variations, and manufacturing differences.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Third-Party Links</h2>
              <p>
                The site may contain links to third-party websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Limitation of Liability</h2>
              <p>
                Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
              </p>

              <h2 className="text-xl font-semibold text-foreground mt-8">Contact Us</h2>
              <p>
                If you have any questions about this Disclaimer, please contact us at:
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

export default Disclaimer;
