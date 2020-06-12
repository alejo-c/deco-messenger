import { Message } from './Message'

export interface Chat {
	id: string,
	usersUid: string[],
	messages?: Message[]
}