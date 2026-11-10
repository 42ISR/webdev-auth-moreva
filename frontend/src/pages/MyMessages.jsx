import Feed from '../components/Feed'
import { useEffect, useState } from "react"
import { useMessageStore } from "../store/useMessageStore"

const MyMessages = () => {
        const [isLoading, setIsLoading] = useState(false)
        const [error, setError] = useState(null)
        const {messages, getMessages} = useMessageStore()
        useEffect(() => {
            const load = async () => {
                setError(null)
                setIsLoading(true)
                try {
                    await getMessages(true)
                    } catch (error) {
                        console.error(error)
                        setError(error.message)
                    } finally {
                        setIsLoading(false)
                    }
                }
                load()
        }, [])
    
    return(
        <>
            <h1>Мои сообщения</h1>
            {isLoading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {messages.length > 0 && (
                <Feed messages={messages} title="Последние сообщения" />
            )}
        </>

    )
}

export default MyMessages
