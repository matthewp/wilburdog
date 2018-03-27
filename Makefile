deploy:
	aws s3 sync public s3://wilbur.dog
.PHONY: deploy

serve:
	http-server -p 1888
.PHONY: serve
