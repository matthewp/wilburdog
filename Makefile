ELEVENTY=node_modules/.bin/eleventy

deploy:
	aws s3 sync _site s3://wilbur.dog
.PHONY: deploy

generate:
	node $(ELEVENTY) --input=site --config=site/.eleventy.js
.PHONY: generate