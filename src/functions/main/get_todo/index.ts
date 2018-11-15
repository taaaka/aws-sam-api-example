import {APIGatewayEvent, Context, Callback} from 'aws-lambda';

import localConfigure from '../../localConfigure';
import {TodoItem, APIResponse} from '../../../types/todo_api';

localConfigure();

const handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const queryParam = event.queryStringParameters;

  const items: TodoItem[] = [
    {
      id: '1',
      title: 'Todo 01',
      done: false
    },
    {
      id: '2',
      title: 'Todo 02',
      done: false,
      description: 'Todo item second'
    }
  ];

  const result: APIResponse = {items};

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  });
};

export {handler};
