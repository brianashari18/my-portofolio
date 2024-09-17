import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        alert('Message sent!');
    };

    return (
        <main className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-32 pb-16">
            <div className="container mx-auto">
                <section className="py-16 bg-white dark:bg-gray-800 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Contact Me</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Feel free to reach out with any questions or comments!
                    </p>
                    <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-800 dark:text-white text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-800 dark:text-white text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-800 dark:text-white text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}  // Use a number here
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-dark transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default Contact;
