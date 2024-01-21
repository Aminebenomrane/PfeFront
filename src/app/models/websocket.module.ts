import { NgModule } from '@angular/core';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';

const stompConfig: StompConfig = {
  url: 'ws://localhost:8080/ws',
  headers: {},
  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 5000,
  debug: true,
};

@NgModule({
  providers: [
    {
      provide: StompService,
      useFactory: (stompConfig: StompConfig) => new StompService(stompConfig),
      deps: [stompConfig],
    },
  ],
})
export class WebSocketModule {}
