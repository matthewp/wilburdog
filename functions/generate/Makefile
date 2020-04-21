main.zip: src node_modules site
	zip -r $@ $^

clean:
	@rm -f main.zip
.PHONY: clean

deploy: main.zip
	aws lambda update-function-code --function-name wilburdog_generate --zip-file fileb://./$^
.PHONY: deploy