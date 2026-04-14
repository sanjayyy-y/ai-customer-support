import React from 'react'
import { getSession } from '@/app/lib/getSession'
import { NextResponse } from 'next/server'
import DashboardClient from '@/app/components/DashboardClient'

async function DashboardPage() {
    const session = await getSession()
    
    return (
        <>
            <DashboardClient ownerId={session?.user?.id!}/>
        </>
    )
}

export default DashboardPage