# Creating a new function

```
aws lambda create-function \
  --function-name wilburdog_function-name \
  --runtime nodejs12.x \
  --role arn:aws:iam::891517687447:role/wilburdog_lambda_function \
  --handler main.handle \
  --zip-file fileb://./main.zip
```