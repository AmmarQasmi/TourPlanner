import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const ExpandableSection = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
                    {isOpen ? (
                        <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                    )}
                </div>
            </button>
            {isOpen && (
                <div className="px-6 py-4 bg-gray-50">
                    {children}
                </div>
            )}
        </div>
    );
};

const HelpCenter = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="px-6 py-8 sm:p-10">
                    <h2 className="text-3xl font-extrabold text-blue-800 mb-8 pb-2 border-b border-gray-200">Help Center</h2>

                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        Welcome to the TourPlanner Help Center! Here you'll find answers to common questions and helpful resources.
                        If you can't find what you need, feel free to contact our support team directly.
                    </p>

                    <div className="space-y-4">
                        <ExpandableSection title="1. Destinations Selection">
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                Learn how to choose the best destinations for your trip:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li>Use the filter options on the destination search page to narrow down choices based on your preferences (e.g., price range, climate, activities).</li>
                                <li>Click on a destination to view detailed information, including high-quality images, suggested itineraries, and traveler reviews.</li>
                                <li>Consider factors such as budget, travel time, local attractions, and seasonal events when selecting your destination.</li>
                            </ul>
                        </ExpandableSection>

                        <ExpandableSection title="2. Hotel Booking">
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                Discover how to book the perfect hotel for your trip:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li>Enter your destination and travel dates in the hotel search bar to view available options.</li>
                                <li>Use the filter sidebar to refine your search based on price, star rating, amenities, and guest reviews.</li>
                                <li>Select your preferred hotel, choose your room type, and follow the on-screen instructions to complete your booking. You'll receive a confirmation email once the process is complete.</li>
                            </ul>
                        </ExpandableSection>

                        <ExpandableSection title="3. Car Rentals">
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                Find out how to rent a car for your trip:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li>Navigate to the 'Car Rentals' section and enter your pickup location and dates to view available options.</li>
                                <li>Compare different car types, prices, and rental companies. Consider factors like fuel efficiency, size, and included insurance.</li>
                                <li>Ensure you have a valid driver's license and credit card. Some rentals may require additional documentation for international drivers.</li>
                            </ul>
                        </ExpandableSection>

                        <ExpandableSection title="4. Signing Up or Logging In as an Agent or Client">
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                Get assistance with creating or accessing your account:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li>Click the 'Sign Up' button in the top right corner. Choose between 'Agent' or 'Client' account types and fill in the required information.</li>
                                <li>To log in, click the 'Login' button and enter your email and password. Select the appropriate account type (Agent or Client).</li>
                                <li>If you forget your password, click the 'Forgot Password' link on the login page and follow the instructions sent to your email to reset it.</li>
                            </ul>
                        </ExpandableSection>

                        <ExpandableSection title="5. Chatbot Assistance">
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                Get quick help through our chatbot:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700">
                                <li>Look for the chat icon in the bottom right corner of any page. Click it to open the chatbot interface.</li>
                                <li>The chatbot can assist with basic inquiries about bookings, destinations, and account issues. Try asking questions in a clear, concise manner.</li>
                                <li>If the chatbot can't resolve your issue, it will provide an option to connect with a human support agent during business hours.</li>
                            </ul>
                        </ExpandableSection>

                        <ExpandableSection title="6. Contact Us">
                            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                                If you need further assistance, you can always reach out to our support team.
                            </p>
                            <p className="text-lg text-gray-700">
                                Email: <a href="mailto:support@tourplanner.com" className="text-blue-600 hover:underline">support@tourplanner.com</a>
                            </p>
                            <p className="text-lg text-gray-700 mt-2">
                                Phone: +1 (800) 123-4567 (Mon-Fri, 9am-5pm EST)
                            </p>
                        </ExpandableSection>
                    </div>
                </div>

                <footer className="bg-gray-100 px-6 py-4 mt-8">
                    <p className="text-sm text-gray-600 text-center">Last updated: January 2025</p>
                </footer>
            </div>
        </div>
    );
};

export default HelpCenter;

