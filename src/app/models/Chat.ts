import { Message } from './Message';

export interface Chat {
	title: string,
	destinationUserId: string,
	messages: Message[]
}