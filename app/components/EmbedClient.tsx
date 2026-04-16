'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

function EmbedClient({ ownerId }: { ownerId: string }) {
    const navigate = useRouter()
    const [copied, setCopied] = useState(false)
    const embedCode = `<script 
    src="${process.env.NEXT_PUBLIC_BASE_URL}/chatBot.js" 
    data-owner-id="${ownerId}">
</script>`
    const copyToClipboard = () => {
        navigator.clipboard.writeText(embedCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }
    return (
        <div className='min-h-screen bg-zinc-50 text-zinc-900'>
            <div className='sticky top-0 z-50 bg-white border-b border-zinc-200'>
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='font-semibold text-lg cursor-pointer' onClick={() => navigate.push("/")} >Support<span className='text-zinc-500'>AI</span></div>
                    <button className='px-4 py-2 text-sm border border-zinc-300 hover:bg-zinc-100 transition rounded-lg cursor-pointer' onClick={() => navigate.push("/dashboard")}>Back to Dashboard</button>
                </div>

            </div>
            <div className='flex justify-center px-4 py-14'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-4xl bg-white rounded-2xl shadow-xl  p-10">
                    <h1 className='text-2xl font-bold mb-2'>Embed Your Chat Widget</h1>
                    <p className='text-zinc-500 mb-8'>Copy and paste this code before the closing <code>&lt;/body&gt;</code> tag on your website</p>
                    <div className='relative bg-zinc-900 rounded-xl p-6 overflow-x-auto'>

                        <pre className=' overflow-x-auto text-white text-sm'>
                            {embedCode}
                        </pre>
                        <button className='absolute top-3 right-3 bg-white text-zinc-900 hover:bg-zinc-200 text-xs font-medium rounded-lg px-3 py-1.5 transition' onClick={copyToClipboard}>
                            {copied ? "Copied ✓" : "Copy"}
                        </button>
                    </div>
                    <div className='mt-8'>
                        <h3 className='text-lg font-semibold mb-4'>How it works</h3>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                            <div className='bg-zinc-50 rounded-xl p-6 border border-zinc-200'>
                                <div className='w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center mb-4'>1</div>
                                <h4 className='font-semibold mb-2'>Copy the code</h4>
                                <p className='text-zinc-500 text-sm'>Copy the JavaScript snippet above</p>
                            </div>
                            <div className='bg-zinc-50 rounded-xl p-6 border border-zinc-200'>
                                <div className='w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center mb-4'>2</div>
                                <h4 className='font-semibold mb-2'>Paste in your site</h4>
                                <p className='text-zinc-500 text-sm'>Add it before the closing <code>&lt;/body&gt;</code> tag</p>
                            </div>
                            <div className='bg-zinc-50 rounded-xl p-6 border border-zinc-200'>
                                <div className='w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center mb-4'>3</div>
                                <h4 className='font-semibold mb-2'>Done!</h4>
                                <p className='text-zinc-500 text-sm'>Your AI chatbot will appear on your site</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-13'>
                        <h1 className='text-2xl font-bold mb-2'>Live Preview</h1>
                        <p className='text-zinc-500 mb-8'>See how your chatbot will look on your website</p>

                        <div className='border border-zinc-300 rounded-xl bg-white shadow-md overflow-hidden'>
                            <div className='flex items-center gap-2 px-4 h-9 bg-zinc-100 border-b border-zinc-200'>
                                <span className='w-2.5 h-2.5 bg-red-400 rounded-full' />
                                <span className='w-2.5 h-2.5 bg-yellow-400 rounded-full' />
                                <span className='w-2.5 h-2.5 bg-green-400 rounded-full' />
                                <span className='ml-4 text-sm text-zinc-500'>Your-Website.com</span>

                            </div>
                            <div className='relative h-64 sm:h-75 p-6 text-zinc-500 text-sm'>
                                Your website content
                                <div className='absolute bottom-24 right-6 w-64 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden'>
                                    <div className='bg-black text-white text-xs px-3 py-2 flex justify-between items-center'>
                                        <span>Customer Support</span>
                                        <span>╳</span>
                                    </div>
                                    <div className='p-3 space-y-2 bg-zinc-50'>
                                        <div className='bg-zinc-200 text-zinc-800 text-xs px-3 py-2 rounded w-fit'>
                                            How can I help you?
                                        </div>
                                        <div className='bg-black text-white text-xs px-3 py-2 rounded-lg ml-auto w-fit'>
                                            I'm looking for a product
                                        </div>
                                    </div>
                                </div>
                                <motion.div 
                                    animate={{y: [0, -10, 0]}} 
                                    transition={{duration:2, repeat:Infinity}} 
                                    className="absolute bottom-6 right-6 w-14 h-14 bg-black text-white shadow-2xl rounded-full flex items-center justify-center cursor-pointer">
                                    💬
                                </motion.div>
                            </div>



                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default EmbedClient