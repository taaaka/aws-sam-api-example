import {APIGatewayEvent, Context, Callback} from 'aws-lambda';

import localConfigure from '../../localConfigure';
import {Tables} from '../../../types/todo_api';
import {insertTodo} from '../../../db/todo';

localConfigure();

const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const insertRecord: Tables.TodoRecord = {
    id: 'TODO0003',
    title: 'hoge',
    description: 'todo description',
    done: 0,
    priority: 3
  };

  await insertTodo(insertRecord);
};

export {handler};
