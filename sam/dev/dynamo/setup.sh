# !/bin/bash

set -e

# invoke local dynamodb
REF=$(docker ps -q --filter ancestor=tray/dynamodb-local)
if [ -z "$REF" ]; then
  docker run -it -d -p 7777:7777 tray/dynamodb-local -inMemory -port 7777 -sharedDb
fi

# create table
aws dynamodb create-table \
  --endpoint-url http://localhost:7777 \
  --cli-input-json file://$(pwd)/sam/dev/dynamo/tbl_todo.json

# insert dummy item
aws dynamodb batch-write-item \
   --endpoint-url http://localhost:7777 \
   --request-items file://$(pwd)/sam/dev/dynamo/put_items.json
