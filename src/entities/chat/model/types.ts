export type Chat = {
  chatId: string;
  phone: string;
};

export type MessageDirection = "incoming" | "outgoing";

export type MessageStatus = "pending" | "sent" | "error";

export type Message = {
  id: string;
  text: string;
  timestamp: number;
  direction: MessageDirection;
  status: MessageStatus;
};
