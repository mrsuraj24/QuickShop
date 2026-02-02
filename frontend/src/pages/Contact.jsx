import PageTitle from '../components/PageTitle';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const res = await fetch("http://localhost:8000/api/v1/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
            toast.success("Message send successfully", { position: 'top-center', autoClose: 3000 });
        } else {
            toast.error("Failed to send message", { position: 'top-center', autoClose: 3000 });
        }
    };

    return (
        <>
            <Navbar />
            <PageTitle title="Reach Us" />
            <section className="pt-28 pb-20 bg-gray-900/90">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold text-white">
                            Get in <span className="text-indigo-600">Touch</span>
                        </h1>
                        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                            Have a project, idea, or opportunity in mind?
                            Feel free to reach out. I’d love to talk.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Let’s build something together
                            </h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Whether you’re looking for a developer, want to collaborate,
                                or just want to say hello, my inbox is always open.
                            </p>
                            <div className="space-y-5 text-white">
                                <p>
                                    <span className="font-bold">Email:</span>{" "}
                                    infinitytechnologies50@gmail.com
                                </p>
                                <p>
                                    <span className="font-bold">Location:</span>{" "}
                                  Noida, Uttar Pradesh, India
                                </p>
                                <p>
                                    <span className="font-bold">Availability:</span>{" "}
                                    Open for Internships & Feelancing
                                </p>
                            </div>
                        </div>
                        {/* Right Form */}
                        <div className="bg-gray-700/20 shodow-xl rounded-2xl p-8 shadow-sm">
                            <form className="space-y-6 text-white" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-sm font-medium  mb-1">
                                        Name
                                    </label>
                                    <input type="text" name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Email
                                    </label>
                                    <input type="email" name="email"
                                        value={formData.email}
                                        onChange={handleChange} placeholder="your@email.com" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Phone No.
                                    </label>
                                    <input type="number" name="phone"
                                        value={formData.phone}
                                        onChange={handleChange} placeholder="Your number" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Message
                                    </label>
                                    <textarea rows="5" name='message' value={formData.message} onChange={handleChange}
                                        placeholder="Tell me about your project..." className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-24 px-6 bg-gray-900/90 relative overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl" />
                <div className="container mx-auto relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl text-white font-bold mb-4">Visit Our Office</h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Noida, Uttar Pradesh, India
                    </p>
                    <div className="rounded-3xl overflow-hidden h-[500px] shadow-2xl border-4 border-blue-500/20">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28750.264542194356!2d82.65988140247265!3d25.744686545122704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39903a2c93994715%3A0xf9a9f10dc97322!2sJaunpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1768895346015!5m2!1sen!2sin"
                            width="100%" height="100%" style={{ border: 0 }} loading="lazy" title="Office Location" className="border-0" />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}