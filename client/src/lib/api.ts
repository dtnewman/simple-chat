const BASE_URL = 'https://chai-chat-api-dev.foobar.dev/api/v1';

export interface ChatResponse {
    model_output: string;
}

export interface ChatMessage {
    sender: string;
    message: string;
}


export async function sendChat(messages: ChatMessage[]): Promise<ChatResponse> {
    try {
        const response = await fetch(
            `${BASE_URL}/chat/chat`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages })
            }
        );

        if (!response.ok) {
            throw new Error('Failed to send chat message');
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending chat:', error);
        throw error;
    }
}