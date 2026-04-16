"use client"
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

function HomeClient({ email }: { email: string | undefined }) {
    const[loading, setLoading] = useState(false)

    const handleLogin = () => {
        setLoading(true)
        window.location.href = "/api/auth/login"
    }
    const firstLetter = email?.charAt(0).toUpperCase()
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    const navigate = useRouter()
    const features = [
        {
            title: "Plug & Play",
            description: "Add the chatbot to your site with a single script tag.",
        },
        {
            title: "Admin Controlled",
            description: "You control exactly what your AI knows and how it responds.",
        },
        {
            title: "24/7 Availability",
            description: "Your AI assistant is always available to help your customers",
        },
    ]

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout")
            window.location.href = "/"
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='min-h-screen bg-linear-to-br from-white to-zinc-100 text-zinc-900 overflow-x-hidden'>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
            >
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='text-lg font-semibold tracking-tight'>Support <span className='text-zinc-400'>AI</span></div>
                    {email ? <div className='relative' ref={dropdownRef}>
                        <button className='cursor-pointer 
                            w-8 h-8 rounded-full 
                            bg-zinc-900 text-white 
                            font-semibold
                            flex items-center justify-center'

                            onClick={() => setOpen(!open)}

                        >{firstLetter}</button>
                        <AnimatePresence>
                            {open && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute top-20 right-0 w-48 bg-white rounded-lg shadow-lg border border-zinc-200'>
                                    <button className='w-full px-4 py-2 text-sm text-left hover:bg-zinc-100' onClick={() => navigate.push("/dashboard")}>
                                
                                        Dashboard
                                        
                                    </button>
                                    <button className='w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-zinc-100' onClick={handleLogout}>
                                        Logout
                                    </button>
                                </motion.div>

                            )}
                        </AnimatePresence>
                    </div> : <button className='px-5 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors flex items-center gap-2'
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        
                        {loading ? "Loading..." : "Login"}
                    </button>}
                </div>


            </motion.div>
            <section className='pt-36 pb-28 px-6'>
                <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className='text-4xl md:text-5xl font-semibold leading-tight'>
                            <span className='text-zinc-400'>AI</span> Customer Support
                            <br />
                            Built for Modern Websites
                        </h1>
                        <p className='mt-6 text-lg text-zinc-600 max-w-xl'>
                            Add a powerful AI chatbot to your website in minutes.
                            Let your customers get instant answers using your business knowledge.
                        </p>
                        <div className=' mt-8 flex gap-4'>

                            {email ? (
                                <button className='mt-6 px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer' onClick={() => navigate.push("/dashboard")}>
                                    Go to Dashboard
                                </button>
                            ) : (
                                <button className='mt-6 px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2 cursor-pointer
                                
                                ' onClick={handleLogin}>
                                    Get Started
                                </button>
                            )}
                            <a href="#features" className='mt-6 px-6 py-3 rounded-xl border border-zinc-300 text-black font-medium hover:bg-zinc-100 transition-colors flex items-center gap-2 cursor-pointer'>
                                Learn More
                            </a>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className='relative'
                    >
                        <div className='rounded-2xl bg-white shadow-2xl border-zinc-200 p-6'>
                            <div className='text-sm text-zinc-500 mb-4'>Live Chat Preview</div>
                            <div className='space-y-3'>
                                <div className='bg-black text-white rounded-lg p-4 py-2 text-sm ml-auto w-fit'>Do You offer cash on delivery?</div>
                                <div className='bg-zinc-100 rounded-lg p-4 py-2 text-sm w-fit'>Yes, we offer cash on delivery on selected items.</div>
                            </div>
                        </div>
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className='absolute -bottom-6 -right-2 w-14 h-14 bg-black text-white shadow-2xl rounded-full flex items-center justify-center cursor-pointer'
                        >
                            💬
                        </motion.div>

                    </motion.div>
                </div>
            </section>
            <section id="features" className='bg-zinc-50 py-28 px-6 border-t border-zinc-200'>
                <div className='max-w-7xl mx-auto'>
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                        className='text-3xl md:text-4xl font-semibold text-center'>Why Businesses Choose SupportAI
                    </motion.h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-9 mt-16'>
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.1 }}
                                className='bg-white rounded-2xl shadow-lg p-6 border border-zinc-200'
                            >
                                <h1 className='text-xl font-medium'>{feature.title}</h1>
                                <p className='text-zinc-600 mt-4 text-sm'>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>

            </section>
            <footer className='py-10 text-center text-zinc-500 text-sm'>
                &copy; {new Date().getFullYear()} SupportAI. All rights reserved.
            </footer>
        </div>
    )
}

export default HomeClient
