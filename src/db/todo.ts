import * as AWS from 'aws-sdk';
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client';

import {Tables} from '../types/todo_api';

const TABLE_NAME = 'tbl_todo';

export const getTodo = async (id: string): Promise<Tables.TodoRecord> => {
  const dynamoClient: DocumentClient = new AWS.DynamoDB.DocumentClient();

  const param: DocumentClient.GetItemInput = {
    TableName: TABLE_NAME,
    Key: {id}
  };

  const record: DocumentClient.GetItemOutput = await dynamoClient.get(param).promise();
  return record.Item as Tables.TodoRecord;
};
