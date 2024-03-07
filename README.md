# Zoomment.com

Comments and reactions for your website with less than 500kb.💬👁️😀

![screenshot comments](/images/light.png)

## Usage

1. Download [zoomment.min.js](/docs/zoomment.min.js?raw=true)
2. Clone and Run [zoomment-server](https://github.com/tigransimonyan/zoomment-server)
3. Place the following code where you'd like Zoomment to load:

```html
<!-- for the comment section -->
<div
  id="zoomment"
  data-theme="light"
  data-language="en"
  data-emotions="❤️,😀,🪄,🥸,💡,🤔,💩,😢"
></div>

<!-- the working script -->
<script src="{{YOUR_HOSTING_URL}}/zoomment.min.js"></script>
```

## Options

Options can be passed via data attributes for comment section.

| Attribute Name | Possible values                                        |
| -------------- | ------------------------------------------------------ |
| data-theme     | light, dark, black                                     |
| data-language  | en, hy, hyw, ru, zh                                    |
| data-emotions  | list comma separated emojis, leave empty if not needed |

## CDN

```html
<script src="https://cdn.zoomment.com/zoomment.min.js"></script>
```

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
