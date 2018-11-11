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
  const queryParam = event.queryStringParameters;
  if (!queryParam.name || !queryParam.job) {
    callback(null, {
      statusCode: 400,
      body: 'bad request!!'
    });
    return;
  }

  const result = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
    // body: JSON.stringify({
    //   status: 200,
    //   message: 'OK!!!!!',
    //   environment: process.env.NODE_ENV
    // })
    body: `
      <html>
      <body>
        <h1>it works!</h1>
      </body>
      </html>
    `
  };
  callback(null, result);
};

export {handler};
