import {APIGatewayEvent, Context, Callback} from 'aws-lambda';

import localConfigure from '../../localConfigure';
import {Tables, StatusCode, ContentType} from '../../../types/todo_api';
import {insertTodo} from '../../../db/todo';

localConfigure();

const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const id = `${new Date().getTime()}`;
  const body = JSON.parse(event.body);

  const insertRecord: Tables.TodoRecord = {
    id,
    title: body.title,
    done: 0
  };

  if (body.description) {
    insertRecord.description = body.description;
  }
  if (body.priority) {
    insertRecord.priority = body.priority;
  }

  let ret = true;
  try {
    await insertTodo(insertRecord);
  } catch (error) {
    ret = false;
  }

  if (ret) {
    callback(null, {
      statusCode: StatusCode.OK,
      headers: {
        'Content-Type': ContentType.APPLICATION_JSON
      },
      body: JSON.stringify(insertRecord)
    });
  } else {
    callback(null, {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      headers: {
        'Content-Type': ContentType.APPLICATION_JSON
      },
      body: JSON.stringify({
        message: 'Error has occurred!!'
      })
    });
  }
};

export {handler};
