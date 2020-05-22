import { Chat } from './Chat';

export interface User {
	name: string,
	email: string,
	password: string,
	chat: Chat[]
}