import { Message } from './Message'

export interface Chat {
	originUID: string,
	destinationUID: string
	messages: Message[]
}