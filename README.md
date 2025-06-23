# Zoomment.com

Comments and reactions for your website with less than 500kb.💬👁️😀

<img width="688" alt="Screenshot 2024-03-13 at 19 26 33" src="https://github.com/zoomment/zoomment-widget/assets/25534427/923a6ece-1516-4157-8224-3f7873934925">

## Usage

Place the following code where you'd like Zoomment to load:

```html
<!-- for the comment section -->
<div
  id="zoomment"
  data-theme="light"
  data-language="en"
  data-emotions="❤️,😀,🪄,🥸,💡,🤔,💩,😢"
></div>

<!-- the working script -->
<script src="https://cdn.zoomment.com/zoomment.min.js"></script>
```

## Options

Options can be passed via data attributes for comment section.

| Attribute Name | Possible values                                        |
| -------------- | ------------------------------------------------------ |
| data-theme     | light, dark, black                                     |
| data-language  | en, hy, hyw, ru, zh, es                                |
| data-emotions  | list comma separated emojis, leave empty if not needed |

## Development

1. Make sure you have node.js installed.
2. Clone the repository, install dependencies and configure your .env file:

```
$ git clone https://github.com/zoomment/zoomment-widget.git
$ cd zoomment-widget
$ cp .env.example .env
$ npm install
```

3. Run it for development:

```
$ npm start
```

Open http://localhost:1234 to view it in the browser.

4. Build it for production:

```
$ npm run build
```
