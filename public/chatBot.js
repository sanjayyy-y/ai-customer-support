(function () {    //--> this is called immediately invoked function
    const api_Url = "https://ai-customer-support-tawny.vercel.app/api/auth/chat"

    const scriptTag = document.querySelector("script[data-owner-id]")
    const ownerId = scriptTag?.getAttribute("data-owner-id")
    if (!ownerId) {
        console.error("data-owner-id is required")
        return
    }
    const button = document.createElement("div")
    button.innerHTML = "💬"
    Object.assign(button.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "24px",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.25)",
        zIndex: "999999",
    })

    document.body.appendChild(button)

    const box = document.createElement("div")
    Object.assign(box.style, {
        position: "fixed",
        bottom: "90px",
        right: "24px",
        width: "350px",
        height: "500px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.25)",
        display: "none",
        flexDirection: "column",
        overflow: "hidden",
        cursor: "pointer",
        zIndex: "999999",
        fontFamily: "Inter, system-ui, sans-serif",
    })

    box.innerHTML = `<div style="
    background: #000;
    color: #fff;
    padding: 12px 14px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    ">
    <span>Customer Support</span>
    <span id="close-btn" style="font-size: 16px; cursor: pointer;">╳</span>
    
    </div>
    <div id="chat-messages" style="flex: 1; width: 100%; padding: 12px; overflow-y: auto; display: flex; flex-direction: column; box-sizing: border-box;"></div>
    <div style="padding: 12px; border-top: 1px solid #eee; display: flex;">
        <input  id="chat-input" type="text" placeholder="Type your message..." style="flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; outline: none;">
        <button id="send-btn" style="padding: 8px 12px; margin-left: 8px; background: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Send</button>
    </div>
    `

    document.body.appendChild(box)

    button.onclick = () => {
        box.style.display = box.style.display === "none" ? "flex" : "none"
    }
    document.querySelector("#close-btn").onclick = () => {
        box.style.display="none"
    }

    
    const input = document.querySelector("#chat-input")
    const sendBtn = document.querySelector("#send-btn")
    const messagesContainer = document.querySelector("#chat-messages")

    function addMessage(text, sender) {
        const message = document.createElement("div")
        message.textContent = text
        Object.assign(message.style, {
            maxWidth:"78%",
            padding:"8px 12px",
            borderRadius:"14px",
            fontSize:"13px",
            lineHeight:"1.4",
            wordWrap:"break-word",
            marginBottom:"8px",
            alignSelf: sender === "user" ? "flex-end" : "flex-start",
            background: sender === "user" ? "#000" : "#f0f0f0",
            color: sender === "user" ? "#fff" : "#111",

            borderTopRightRadius: sender === "user" ? "4px" : "14px",
            borderTopLeftRadius: sender === "user" ? "14px" : "4px",
            
        })
        messagesContainer.appendChild(message)
        messagesContainer.scrollTop = messagesContainer.scrollHeight
    }

    sendBtn.onclick = async () => {
        const text = input.value.trim()
        if(!text) return
        addMessage(text, "user")
        input.value = ""
        const typing=document.createElement("div")
        typing.textContent="Typing..."
       Object.assign(typing.style, {
        
        fontSize:"12px",
        color:"#666",
        marginBottom: "8px",
        alignSelf: "flex-start",
        
       })
       messagesContainer.appendChild(typing)
       messagesContainer.scrollTop = messagesContainer.scrollHeight

       try{
       const res = await fetch(api_Url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ownerId, message: text })
        })
        const data = await res.json()
        messagesContainer.removeChild(typing)
        addMessage(data.text || "Sorry, I'm having trouble connecting right now. Please try again later.", "ai-bot")
    } catch(error) {
        console.error("Chat error:", error)
        addMessage("Sorry, I'm having trouble connecting right now. Please try again later.", "ai-bot")
    } finally {
        typing.remove()
    }
    } 

    
})()
