export interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
  topics: Topic[];
  flashcards: Flashcard[];
  bookmarks: Bookmark[];
  createdAt: Date;
}

export interface Bookmark {
  id: string;
  flashCard: Flashcard;
  user: User;
  userId: string;
  flashcardId: string;
}

export interface Topic {
  id: string;
  name: string;
  flashcards: Flashcard[];
  createdAt: Date;
  User: User;
  userId: string;
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  isTopic: boolean;
  createdAt: Date;
  Topic?: Topic;
  topicId?: string;
  User: User;
  userId: string;
  isActive: boolean;
  Bookmark: Bookmark[];
}
