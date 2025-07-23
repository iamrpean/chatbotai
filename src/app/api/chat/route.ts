
interface WebhookResponse {
    message?: string
    [key: string]: unknown
}

export async function POST(req: Request) {
    try {
        const { sessionId, message, action, timestamp } = await req.json()

        if (!sessionId || !message) {
            return Response.json({ message: "Invalid request", success: false }, { status: 400 })
        }


        const webhookUrl = process.env.N8N_WEBHOOK_URL
        if (!webhookUrl) throw new Error("N8N_WEBHOOK_URL is not set in env vars.")

        const externalResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, message, action: action, timestamp }),
        })

        if (!externalResponse.ok) {
            const errorText = await externalResponse.text()
            console.error("n8n webhook error:", externalResponse.status, errorText)
            return Response.json({ message: `Webhook error`, success: false }, { status: 500 })
        }

        let data: WebhookResponse = {}
        try {
            data = await externalResponse.json()
            console.log(data);
        } catch {
            console.warn("Webhook response is not JSON or empty body.")
        }

        const botReply = Array.isArray(data) && data[0]?.output
                        ? data[0].output.message
                        : "Mohon tunggu sebentar, saya sedang memproses permintaan Anda."

        
        return Response.json({
            message: botReply,
            timestamp: new Date().toISOString(),
            action: action,
            success: true,
        })
    } catch (error) {
        console.error("Chat API error:", error)
        return Response.json(
            { message: "System error occurred. Please try again later.", success: false },
            { status: 500 }
        )
    }
}
