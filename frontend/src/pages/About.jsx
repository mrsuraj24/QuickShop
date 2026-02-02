import PageTitle from '../components/PageTitle';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
export default function About() {
    return (
        <>
            <Navbar />
            <PageTitle title="Who We Are" />
            <section className="pt-28 pb-20 bg-gray-300/40">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            About <span className="text-indigo-600">Me</span>
                        </h1>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            A brief introduction about who I am, what I do, and how I approach building software.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <img
                                src="./image.png"
                                alt="About"
                                className="w-[340px] rounded-3xl shadow-xl"
                            />
                        </div>
                        {/* Right Content */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                I’m Suraj Vishwakarma
                            </h2>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                I am a final year Computer Science Engineering student with a strong
                                interest in full stack development and modern web technologies.
                                I enjoy turning complex problems into simple, scalable solutions.
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                My main focus is building responsive web applications using
                                React, Node.js, Express, and MongoDB. I also have hands-on
                                experience with REST APIs, authentication, and clean UI design.
                            </p>
                            {/* Info Grid */}
                            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                                <p><span className="font-semibold">Name:</span> Suraj Vishwakarma</p>
                                <p><span className="font-semibold">Degree:</span> B.Tech (CSE)</p>
                                <p><span className="font-semibold">Role:</span> Full Stack Developer</p>
                                <p><span className="font-semibold">Location:</span>Uttar Pradesh,  India</p>
                            </div>
                            {/* Buttons */}
                            <div className="mt-8 flex gap-4">
                                <a href="/image.png" className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
                                    Download CV
                                </a>
                                <a href="/contact" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-50 transition">
                                    Contact Me
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Skills Section */}
                    <div className="mt-24">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Skills & Technologies
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {[
                                "HTML",
                                "CSS",
                                "JavaScript",
                                "React",
                                "Node.js",
                                "Express",
                                "MongoDB",
                                "Tailwind CSS",
                                "Cyber Security"
                            ].map((skill) => (
                                <div key={skill} className="border rounded-full py-3 shadow-sm hover:shadow-md transition">
                                    <p className="font-bold text-gray-800">{skill}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}