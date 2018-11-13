import {APIGatewayEvent, Context, Callback} from 'aws-lambda';

import localConfigure from '../../localConfigure';

localConfigure();

type UserJob = 'OfficeWorker' | 'Engineer';

interface UserRequest {
  name: string;
  age?: number;
  job: UserJob;
}

const handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const param: UserRequest = JSON.parse(event.body);
  if (!param.name || !param.job) {
    callback(null, {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 400,
        message: 'bad request!'
      })
    });
    return;
  }

  // TODO: db insert

  const result = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 200,
      message: 'user add succeeded!'
    })
  };

  callback(null, result);
};

export {handler};
