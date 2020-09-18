import { createCollection } from '../utils';
import { MessageModel } from './MessageModel';

export const MessagesCollection = createCollection(MessageModel, {});
