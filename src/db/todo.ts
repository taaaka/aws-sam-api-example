import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';

import {Tables} from '../types/todo_api';

const TABLE_NAME = 'tbl_todo';
const dynamoClient: DocumentClient = new AWS.DynamoDB.DocumentClient();

export const getTodo = async (id: string): Promise<Tables.TodoRecord> => {
  const param: DocumentClient.GetItemInput = {
    TableName: TABLE_NAME,
    Key: {id}
  };

  const record: DocumentClient.GetItemOutput = await dynamoClient.get(param).promise();
  return record.Item as Tables.TodoRecord;
};

export const insertTodo = async (record: Tables.TodoRecord): Promise<boolean> => {
  const param: DocumentClient.PutItemInput = {
    TableName: TABLE_NAME,
    Item: record
  };

  const res = await dynamoClient.put(param).promise();
  console.log(res);
  return true;
};
