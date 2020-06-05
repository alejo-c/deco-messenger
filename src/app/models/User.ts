import { Chat } from './Chat'

export interface User {
	uid: string,
	displayName: string,
	contacts: string[],
	chats: Chat[]
}