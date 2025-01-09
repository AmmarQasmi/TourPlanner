import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden h-full">
                <div className="px-6 py-8 sm:p-10 h-full flex flex-col justify-between">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 pb-2 border-b border-gray-200">Privacy Policy</h2>

                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        At TourPlanner, we value your privacy. This Privacy Policy outlines the types of personal information
                        we collect and how we use, disclose, and protect your information. By using our website, you agree to
                        the practices described in this policy.
                    </p>

                    <div className="space-y-8 flex-grow">
                        <section>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h3>
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                We collect various types of information when you interact with our website, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li>Personal Information: Name, email address, phone number, etc.</li>
                                <li>Usage Data: Information about how you access and use the website.</li>
                                <li>Cookies and Tracking Technologies: We use cookies to improve your experience on our website.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h3>
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                The information we collect is used to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li>Improve and personalize your user experience on our website.</li>
                                <li>Communicate with you regarding your inquiries, bookings, or updates.</li>
                                <li>Analyze website traffic and enhance site performance.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Protect Your Information</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We implement a variety of security measures to protect your personal information, including encryption,
                                secure servers, and access control protocols. However, please note that no security system is completely
                                infallible.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Sharing Your Information</h3>
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                We may share your personal information with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li>Service providers and business partners who help us operate the website.</li>
                                <li>Legal authorities, if required by law or to protect our rights.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                You have the right to access, update, or delete your personal information. If you would like to exercise
                                any of these rights, please contact us using the information provided below.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to this Privacy Policy</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We reserve the right to update or change this Privacy Policy at any time. We will notify you of any
                                material changes by updating the "Last Updated" date at the bottom of this page.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                If you have any questions or concerns about this Privacy Policy, please contact us at:
                            </p>
                            <p className="mt-2 text-lg font-medium text-gray-900">
                                Email: <a href="mailto:support@tourplanner.com" className="text-blue-600 hover:underline">support@tourplanner.com</a>
                            </p>
                        </section>
                    </div>
                </div>

                <footer className="bg-gray-100 px-6 py-4 mt-8">
                    <p className="text-sm text-gray-600 text-center">Last updated: January 2025</p>
                </footer>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
