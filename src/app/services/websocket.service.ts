import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { StompService } from '@stomp/ng2-stompjs';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private numberOfMessages: number = 0;
  private chatMessagesSubject: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  private chatMessages: { [key: string]: Message[] } = {};
  private chatComponent: any;

  constructor(private stompService: StompService, private ngZone: NgZone) {
    this.stompService.initAndConnect();
  }

  setChatComponent(chatComponent: any) {
    this.chatComponent = chatComponent;
  }

  sendMessage(message: Message) {
    this.stompService.publish('/app/send/message', JSON.stringify(message));
  }

  getChatMessages(loggedInUserId: number, selectedUserId: number): Observable<Message[]> {
    const chatId = this.generateChatId(loggedInUserId, selectedUserId);

    if (!this.chatMessages[chatId]) {
      this.chatMessages[chatId] = [];
    }

    return this.stompService.subscribe(`/app/chat/${loggedInUserId}/${selectedUserId}`).pipe(
      map((stompMessage) => {
        try {
          const parsedMessages = JSON.parse(stompMessage.body) as Message[];
          if (Array.isArray(parsedMessages)) {
            this.updateChatMessages(chatId, parsedMessages);
            this.incrementReceivedMessagesCount(parsedMessages.length);
            this.callMyFunction();
          }
        } catch (error) {
          console.error('Error parsing messages:', error);
        }
        return this.chatMessages[chatId];
      })
    );
  }

  getReceivedMessagesCount(): number {
    return this.numberOfMessages;
  }

  private incrementReceivedMessagesCount(increment: number = 1) {
    this.numberOfMessages += increment;
  }

  callMyFunction() {
    console.log("test");
  }

  handleNewMessage(message: Message) {
    if (this.chatComponent) {
      this.ngZone.run(() => {
        this.chatComponent.handleNewMessage(message);
      });
    }
  }

  getChatMessagesSubject(): BehaviorSubject<Message[]> {
    return this.chatMessagesSubject;
  }

  isConnected(): boolean {
    return this.stompService.connected();
  }

  generateChatId(userId1: number, userId2: number): string {
    const sortedUserIds = [userId1, userId2].sort((a, b) => a - b);
    return `chat_${sortedUserIds[0]}_${sortedUserIds[1]}`;
  }

  private updateChatMessages(chatId: string, messages: Message[]) {
    this.chatMessages[chatId] = messages;
    this.chatMessagesSubject.next(this.chatMessages[chatId]);
  }

  getInitialChatMessages(loggedInUserId: number, selectedUserId: number): Observable<Message[]> {
    const chatId = this.generateChatId(loggedInUserId, selectedUserId);
    return this.stompService.subscribe(`/app/chat/${loggedInUserId}/${selectedUserId}`).pipe(
      map((stompMessage) => {
        try {
          const parsedMessages = JSON.parse(stompMessage.body) as Message[];
          if (Array.isArray(parsedMessages)) {
            this.updateChatMessages(chatId, parsedMessages);
          }
        } catch (error) {
          console.error('Error parsing messages:', error);
        }
        return this.chatMessages[chatId];
      })
    );
  }
}
