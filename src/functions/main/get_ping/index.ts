import {APIGatewayEvent, Context, Callback} from 'aws-lambda';

import localConfigure from '../../localConfigure';

localConfigure();

const handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const result = {
    statusCode: 200,
    body: JSON.stringify({
      status: 200,
      message: 'OK!!!!!',
      environment: process.env.NODE_ENV
    })
  };
  callback(null, result);
};

export {handler};
