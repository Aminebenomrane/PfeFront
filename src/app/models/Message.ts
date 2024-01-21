export interface Message {
    id : number
    chatId: string;
    sender: {
      id: number; 
    };
    recipient: {
      id: number;
    };
    content: string;
    dateSent: Date;
  
  }
  