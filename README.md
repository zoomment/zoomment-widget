# FooComments

![screenshot](/images/light.png) 

## Usage

1. Download [foo-comments.min.js](/docs/foo-comments.min.js?raw=true)
2. Clone and Run [foo-comments-server](https://github.com/tigransimonyan/foo-comments-server)
4. Place the following code where you'd like FooComments to load:

```html
<div
  id="foo-comments"
  data-theme="light"
  data-language="en"
  data-api-url="{{YOUR_API_URL}}"
></div>
<script src="{{YOUR_HOSTING_URL}}/foo-comments.min.js"></script>
```



## Options

Options can be passed via data attributes.

| Attribute Name | Possible values    |
| -------------- | ------------------ |
| data-theme     | light, dark, black |
| data-language  | en, hy, hyw        |


## Development

1. Make sure you have node.js installed. 
2. Clone the repository and install dependencies:

```
npm install
```

3. Run it for development:

```
npm start
```

Open http://localhost:1234 to view it in the browser.

4. Build it for production:

```
npm run build
```
    
## API Reference


### Add comment
```
POST {{YOUR_API_URL}}/comments?pageId={{PAGE_URL}}
```
Request Body:
```
{
  "body": "Hello!",
  "owner": {
    "name": "Bob",
    "email": ""
  }
}
```
Response Body:
```
{
  "owner": {
    "name": "Bob",
    "email": ""
  },
  "_id": "5fa538f82378f23944454737",
  "secret": "61e68a4caea667b4a628e45a2ac3dc216e0b8327",
  "body": "Hello!",
  "pageId": "foocomments.github.io/foo-comments-widget/page-1",
  "createdAt": "2020-11-06T11:52:24.449Z",
}
```


### Get comments
```
GET {{YOUR_API_URL}}/comments?pageId={{PAGE_URL}}
```
Response Body:
```
[{
  "_id": "5fa3fa28c5eb4a2475dd0768",
  "body": "Hello!",
  "createdAt": "2020-11-05T13:12:08.513Z",
  "owner": {
    "name": "Bob"
  },
}]
```


### Delete comment

```
DELETE {{YOUR_API_URL}}/comments/{{COMMENT_ID}}?secret={{COMMENT_SECRET}}
```
Response Body:
```
Ok
```
