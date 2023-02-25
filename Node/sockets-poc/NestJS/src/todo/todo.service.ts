import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Server, Socket } from 'socket.io';
const todoArray: CreateTodoDto[] = require('../todo/entities/todo.entity');

@Injectable()
export class TodoService {
  create(createTodoDto: CreateTodoDto, client: Socket, server: Server) {
    console.log('CreateTodDO = ', createTodoDto);
    let create = true;
    if (todoArray.length) {
      for (let index = 0; index < todoArray.length; index++) {
        const element = todoArray[index];
        console.log('Element of todoArray = ', element);
        if (element.id == createTodoDto.id) {
          create = false;
          break;
        }
      }
    }
    if (create) {
      const todo = todoArray[todoArray.push(createTodoDto) - 1];
      console.log('TodoArray = ', todoArray);
      console.log('Todo to Emit = ', todo);
      return server.emit('createTodo', todo);
    } else {
      return client.emit('error', 'Id already in Use');
    }
  }

  findAll(client: Socket, server: Server) {
    return client.emit('findAllTodo', todoArray);
  }

  findOne(id: number, client: Socket, server: Server) {
    for (let index = 0; index < todoArray.length; index++) {
      if (id == todoArray[index].id) {
        const element = todoArray[index];
        console.log(element);

        return client.emit('findOneTodo', element);
      }
    }
    return client.emit('error', 'No todo with Id');
  }

  update(
    server: Server,
    id?: number,
    updateTodoDto?: UpdateTodoDto,
    client?: Socket,
  ) {
    if (id && updateTodoDto) {
      for (let index = 0; index < todoArray.length; index++) {
        if (id == todoArray[index].id) {
          if (updateTodoDto.title) {
            todoArray[index].title = updateTodoDto.title;
          }
          todoArray[index].completed = updateTodoDto.completed;
          if (client) {
            todoArray[index].createdBy = client.id;
          }
          console.log(todoArray[index]);
        }
      }
      server.emit('error', 'Id was not valid');
    }
    return server.emit('updateTodo', todoArray);
  }

  remove(id: number, client: Socket, server: Server) {
    let idx;
    let todo;
    for (let index = 0; index < todoArray.length; index++) {
      if (id == todoArray[index].id) {
        idx = index;
        todo = todoArray[index];
        break;
      }
    }
    if (idx != undefined) {
      console.log(todoArray);

      return server.emit('removeTodo', {
        removedBy: client.id,
        todo: todo,
      });
    }
    return server.emit('error', 'Id Invalid');
  }
}
