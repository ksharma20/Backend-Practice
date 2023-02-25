import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TodoGateway {
  constructor(private readonly todoService: TodoService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connected')
  log(@ConnectedSocket() client: Socket) {
    console.log(`User Connected => ${client.id}`);
    return this.todoService.update(this.server);
  }

  @SubscribeMessage('msg')
  msg(@ConnectedSocket() client: Socket, @MessageBody() data: String) {
    return console.log(`User ${client.id} says ${data}`);
  }

  @SubscribeMessage('createTodo')
  create(
    @MessageBody() createTodoDto: CreateTodoDto,
    @ConnectedSocket() client: Socket,
  ) {
    return this.todoService.create(createTodoDto, client, this.server);
  }

  @SubscribeMessage('findAllTodo')
  findAll(@ConnectedSocket() client: Socket) {
    return this.todoService.findAll(client, this.server);
  }

  @SubscribeMessage('findOneTodo')
  findOne(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    return this.todoService.findOne(id, client, this.server);
  }

  @SubscribeMessage('updateTodo')
  update(
    @MessageBody() updateTodoDto: UpdateTodoDto,
    @ConnectedSocket() client: Socket,
  ) {
    return this.todoService.update(
      this.server,
      updateTodoDto.id,
      updateTodoDto,
      client,
    );
  }

  @SubscribeMessage('removeTodo')
  remove(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
    return this.todoService.remove(id, client, this.server);
  }
}
