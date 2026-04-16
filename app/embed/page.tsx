
import React from "react"
import { getSession } from "../lib/getSession"
import EmbedClient from "../components/EmbedClient"

async function Embedpage() {
    const session = await getSession()
    return (
        <>
        <EmbedClient ownerId={session?.user?.id!} />
        </>
    )
}

export default Embedpage