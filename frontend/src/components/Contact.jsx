import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-8">
          Contact Us
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          Get in touch with us for inquiries and support
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-red-700 mb-6">
              Get In Touch
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <span className="text-red-700 mr-3">📍</span>
                <p className="text-gray-600">123 Industrial Street, Manufacturing District, City 12345</p>
              </div>
              <div className="flex items-center">
                <span className="text-red-700 mr-3">📞</span>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <span className="text-red-700 mr-3">✉️</span>
                <p className="text-gray-600">info@premierproducts.com</p>
              </div>
            </div>
            
            <h4 className="text-lg font-semibold text-red-700 mb-3">Business Hours</h4>
            <div className="text-gray-600">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-red-700 mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 text-white py-3 px-6 rounded-lg hover:bg-red-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
