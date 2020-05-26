import { Chat } from './Chat';

export interface User {
	id: string,
	name: string,
	email: string,
	password: string,
	chats: Chat[]
}