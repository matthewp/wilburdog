COMPILE=../../node_modules/.bin/compile

main.js:
	$(COMPILE) --format cjs --external aws-sdk src/index.js
.PHONY: main.js

main.zip: main.js
	zip -r $@ $^

clean:
	@rm -f main.zip
.PHONY: clean

deploy: main.zip
	aws lambda update-function-code --function-name wilburdog_refresh-token --zip-file fileb://./$^
.PHONY: deploy