import {APIGatewayEvent, Context, Callback} from 'aws-lambda';

import {TodoItem, APIResponse, StatusCode, ContentType} from '../../../types/todo_api';
import localConfigure from '../../localConfigure';

import {getTodo} from '../../../db/todo';

localConfigure();

const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const todoId = event.pathParameters.id;

  const todo = await getTodo(todoId);

  const items: TodoItem[] = [];

  if (todo) {
    items.push({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      done: todo.done === 1,
      priority: todo.priority
    });
  }

  const result: APIResponse<TodoItem> = {items};

  callback(null, {
    statusCode: StatusCode.OK,
    headers: {
      'Content-Type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify(result)
  });
};

export {handler};
