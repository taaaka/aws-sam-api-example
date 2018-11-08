import * as AWS from 'aws-sdk';

/**
 * SAMローカル実行時の設定
 */
export default function localConfigure(): void {
  if (process.env.AWS_SAM_LOCAL) {
    AWS.config.update(
      {
        region: process.env.REGION,
        endpoint: process.env.LOCAL_URL
      },
      true
    );
  }
}
