import { getOrCreateSessionId } from "@/lib/session"
import { useEffect, useState } from "react"

export default function HealthcareChatInterface() {
    const [sessionId, setSessionId] = useState<string>("")

    useEffect(() => {
        const sid = getOrCreateSessionId()
        setSessionId(sid)
    }, [])
}
