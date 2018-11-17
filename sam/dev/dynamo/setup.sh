# !/bin/bash

set -e

# invoke local dynamodb
REF=$(docker ps -q --filter ancestor=amazon/dynamodb-local)
if [ -z "$REF" ]; then
  docker run -d -p 8000:8000 amazon/dynamodb-local
fi

# create table
aws dynamodb create-table \
  --endpoint-url http://localhost:8000 \
  --cli-input-json file://$(pwd)/sam/dev/dynamo/tbl_todo.json

# insert dummy item
aws dynamodb batch-write-item \
   --endpoint-url http://localhost:8000 \
   --request-items file://$(pwd)/sam/dev/dynamo/put_items.json
