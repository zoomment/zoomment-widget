# Zoomment.com

Comments and reactions for your website with less than 500kb.💬👁️😀

<img width="715" alt="Screenshot 2024-03-13 at 18 23 22" src="https://github.com/zoomment/zoomment-widget/assets/25534427/676af37c-4e69-4588-908e-331c0790db87">

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
| data-language  | en, hy, hyw, ru, zh                                    |
| data-emotions  | list comma separated emojis, leave empty if not needed |

## Development

1. Make sure you have node.js installed.
2. Clone the repository and install dependencies:

```
$ git clone https://github.com/zoomment/zoomment-widget.git
$ cd zoomment-widget
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
