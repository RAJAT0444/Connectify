// lib/filter.ts

import bannedWords from './bannedWords';

export function isMessageClean(message: string): boolean {
  const lowerCaseMessage = message.toLowerCase();

  return !bannedWords.some((word) => lowerCaseMessage.includes(word));
}
