"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, Send, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";

export default function ContactUs() {
    const { toast } = useToast();
    const [pending, setPending] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                toast({
                    title: "Message Sent!",
                    description: "We've received your message and will get back to you soon.",
                    variant: "default",
                });
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Something went wrong. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred.",
                variant: "destructive",
            });
        } finally {
            setPending(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200">


            <main className="pt-32 pb-20">
                <section className="container mx-auto px-4 md:px-6 mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                            Get in <span className="text-indigo-500">Touch</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Have questions, suggestions, or just want to say hi?
                            We'd love to hear from you. Our team typically responds within 24 hours.
                        </p>
                    </motion.div>
                </section>

                <section className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/30 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold mb-8">Contact Information</h2>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 shrink-0">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Email Us</h3>
                                            <p className="text-zinc-400">asifalazad.fullstack@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 shrink-0">
                                            <MessageSquare className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Live Support</h3>
                                            <p className="text-zinc-400">Available Mon-Fri, 9am - 6pm EST</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 shrink-0">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">Our Headquarters</h3>
                                            <p className="text-zinc-400">Silicon Valley, CA, United States</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-12 border-t border-white/5">
                                    <h3 className="font-semibold text-white mb-6">Follow our journey</h3>
                                    <div className="flex gap-4">
                                        {[
                                            { icon: Github, href: "https://github.com/fl9mdasif" },
                                            { icon: Linkedin, href: "https://www.linkedin.com/in/fl9mdasif/" },
                                        ].map((social, i) => (
                                            <a
                                                key={i}
                                                href={social.href}
                                                className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-indigo-600 hover:text-white transition-all transform hover:-translate-y-1"
                                            >
                                                <social.icon className="h-5 w-5" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>



                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="p-8 md:p-10 rounded-3xl border border-white/10 bg-zinc-900/50 relative"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-zinc-400 ml-1">
                                            Your Name
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="bg-zinc-800/50 border-white/5 focus:border-indigo-500 h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-zinc-400 ml-1">
                                            Email Address
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john@example.com"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="bg-zinc-800/50 border-white/5 focus:border-indigo-500 h-12"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-zinc-400 ml-1">
                                        Subject
                                    </label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="How can we help?"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="bg-zinc-800/50 border-white/5 focus:border-indigo-500 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-zinc-400 ml-1">
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Tell us more about your inquiry..."
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="bg-zinc-800/50 border-white/5 focus:border-indigo-500 resize-none pt-4"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={pending}
                                    className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {pending ? (
                                        <span className="flex items-center gap-2">
                                            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Send className="h-5 w-5" />
                                            Send Message
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </motion.div>
                    </div>
                </section>
            </main>


        </div>
    );
}
