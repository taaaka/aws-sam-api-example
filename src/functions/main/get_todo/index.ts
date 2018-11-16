import {APIGatewayEvent, Context, Callback} from 'aws-lambda';

import localConfigure from '../../localConfigure';
import {TodoItem, APIResponse} from '../../../types/todo_api';

import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';

localConfigure();

const TABLE_NAME = 'tbl_todo';

const getTodo = async (id: string): Promise<{[id: string]: any}> => {
  const dynamoClient: DocumentClient = new AWS.DynamoDB.DocumentClient();

  const param: DocumentClient.GetItemInput = {
    TableName: TABLE_NAME,
    Key: {
      id
    }
  };

  const record: DocumentClient.GetItemOutput = await dynamoClient.get(param).promise();
  return record.Item;
};

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
