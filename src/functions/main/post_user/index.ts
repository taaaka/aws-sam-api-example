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
        'Content-Type': 'text/plain'
      },
      body: 'bad request!!'
    });
    return;
  }

  const result = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html'
    },
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
