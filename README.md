# REST API

This rest api provides necessay backend support functionality create, read, update and delete.

Currently it is saving data inside a data folder and note folder. using "fs" node module which provides persistance.

Clone from [github repository](https://github.com/bhavyaab/08-vanilla_rest_api), install all Dependencies by type and enter "npm i -y" on terminal.

### Dependencies:

- [http](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_http)
- [url](https://nodejs.org/dist/latest-v6.x/docs/api/url.html#url_url)
- [querystring](https://nodejs.org/dist/latest-v6.x/docs/api/querystring.html#querystring_query_string)
- [node-uuid](https://www.npmjs.com/package/node-uuid)
- [superagent](https://github.com/visionmedia/superagent)
- [mocha](http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.WFeVsRsrKwU)
- [chai](http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.WFeVsRsrKwU)

This API is structured on a Model View Controller(MVC) architecture pattern. The base technologies are [node.js](https://nodejs.org/dist/latest-v6.x/docs/api/) server, http module.

Overview of core functionalities:

### POST:
parameters "name" and "content" are required.

example: http POST localhost:3000/api/schemaname
data: name='some name' content='some content'.

result:

~~~
http POST localhost:3000/api/note name='some name' content ='some content'

HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 18 Dec 2016 10:44:33 GMT
Transfer-Encoding: chunked

{"id":"f6430460-c50e-11e6-bf7b-83ba05acfa32","name":"some name","content":"some content"}
~~~

### GET:
parameter "id" is required and it should be a querystring.

~~~~~~
http GET localhost:3000/api/note id=="f6430460-c50e-11e6-b f7b-83ba05acfa32"
HTTP/1.1 200 OK
Connection: keep-alive
Content: application/json
Date: Sun, 18 Dec 2016 10:50:27 GMT
Transfer-Encoding: chunked

{"id":"f6430460-c50e-11e6-bf7b-83ba05acfa32","name":"some name","content":"some content"}

*****************************
http GET localhost:3000/api/note id=="f6430460-c50e-11e6-b f7b-83ba05acfa32"
HTTP/1.1 204 No Content
Connection: keep-alive
Content: text/plain
Date: Sun, 18 Dec 2016 10:54:54 GMT

~~~~~~

### DELETE:
parameter "id" is required and it should be a querystring.
~~~
http DELETE localhost:3000/api/note id=="f6430460-c50e-11e 6-bf7b-83ba05acfa32"

HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: text/plain
Date: Sun, 18 Dec 2016 10:54:07 GMT
Transfer-Encoding: chunked

item deleted!
~~~


### PUT:
parameters "name" "content" and "id" are required.
~~~
http PUT localhost:3000/api/note id="ceaf91a0-c510-11e6-bf 7b-83ba05acfa32" name='apple'
content='apple is a fruit.' place='seattle' favFood='some thing'
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 0
Date: Sun, 18 Dec 2016 10:59:24 GMT
~~~
