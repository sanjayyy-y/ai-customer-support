"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'


function DashboardClient({ ownerId }: { ownerId: string }) {
    const navigate = useRouter()
    const [businessName, setBusinessName] = useState("")
    const [supportEmail, setSupportEmail] = useState("")
    const [knowledgeBase, setKnowledgeBase] = useState("")
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSaveSettings = async () => {
        setLoading(true)
        try {
            const result = await axios.post("/api/auth/settings", {
                ownerId,
                businessName,
                supportEmail,
                knowledgeBase,
            })
            console.log(result.data)
            setLoading(false)
            setSaved(true)
            setTimeout(() => {
                setSaved(false)
            }, 2000)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        if(ownerId) {
            const fetchSettings = async () => {
            try {
                const result = await axios.post("/api/auth/settings/get", {
                    ownerId,
                })
                const s = result.data.settings
                if(s) {
                    setBusinessName(s.businessName || "")
                    setSupportEmail(s.supportEmail || "")
                    setKnowledgeBase(s.knowledgeBase || "")
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSettings()
        }
    }, [ownerId])
    return (

        <div className='min-h-screen bg-zinc-50 text-zinc-900'>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
            >
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='text-lg font-semibold tracking-tight cursor-pointer'
                        onClick={() => navigate.push("/")}>
                        Support
                        <span className='text-zinc-400'>
                            AI
                        </span>
                    </div>
                    <button className='px-4 py-2 rounded-lg border border-zinc-200 text-sm hover:bg-zinc-100 transition'>
                        Embed ChatBot
                    </button>

                </div>


            </motion.div>

            <div className='flex justify-center px-4 py-14 mt-16    '>
                <motion.div className='w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10'>
                    <div className='mb-10'>
                        <h1 className=' text-2xl font-semibold'>Chatbot Settings</h1>
                        <p className='mb-6 text-zinc-500 mt-1'>Manage your AI chatbot knowledge and business information</p>

                    </div>
                    <div className='mb-10'>
                        <h1 className='text-lg font-medium mb-4'>Business Information</h1>
                        <div className='space-y-4'>
                            <input type="text" placeholder='Business Name' className='w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500' value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                            <input type="email" placeholder='Support Email' className='w-full px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500' value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />

                        </div>

                    </div>
                    <div className='mb-10'>
                        <h1 className='text-lg font-medium mb-4'>Knowledge Base</h1>
                        <p className='text-sm text-zinc-500 mb-4'>Add FAQs, Policies, and other business information</p>
                        <div className='space-y-4'>
                            <textarea placeholder={`The AI will use this information to answer customer questions
Example:
Business Name: ABC Company
Support Email: [EMAIL_ADDRESS]
Refund Policy: 7 days return available
Delivery Time: 3–5 working days
Cash on Delivery: Available
Support Hours: 9 AM – 6 PM`
                            } className='w-full h-56 px-4 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500' value={knowledgeBase} onChange={(e) => setKnowledgeBase(e.target.value)} />


                        </div>

                    </div>
                    <div className='flex justify-end'>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading} onClick={handleSaveSettings}  className='w-full px-4 py-2 rounded-lg border border-zinc-200 text-sm hover:bg-zinc-100 transition'>
                            {loading ? "Saving..." : "Save Settings"}
                        </motion.button>
                        {saved && (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className='text-sm font-medium text-green-500 ml-4'>
                                ✔️ Settings saved successfully
                            </motion.span>
                        )}
                    </div>

                </motion.div>
            </div>

        </div>

    )
}

export default DashboardClient