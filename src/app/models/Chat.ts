import { Message } from './Message';

export interface Chat {
	destinationUserId: string,
	messages: Message[]
}