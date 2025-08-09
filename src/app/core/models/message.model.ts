export interface Message {
  id?: number;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: string; // ISO string, типу "2025-08-08T18:21:00"
}
