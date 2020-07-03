import { Message } from '@angular/compiler/src/i18n/i18n_ast';

import { Message as MessageF } from "./Message";

export interface PlainTextFile extends MessageF {
	URL: string
}