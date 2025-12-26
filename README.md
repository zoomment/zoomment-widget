# Zoomment.com

Comments and reactions for your website with less than 500kb. 💬👁️😀

<img width="688" alt="Screenshot 2024-03-13 at 19 26 33" src="/images/light.png">

## Features

- 💬 **Comments** - Threaded comments with replies
- 👍 **Voting** - Upvote and downvote comments
- 😀 **Reactions** - Customizable emoji reactions
- 👁️ **Page Views** - Track page view counts
- 🎨 **Themes** - Light, dark, and black themes
- 🌍 **i18n** - Multi-language support (EN, ES, RU, HY, HYW, ZH)
- 📱 **Responsive** - Works on all devices
- ⚡ **Lightweight** - Less than 500kb

## Usage

Place the following code where you'd like Zoomment to load:

```html
<!-- for the comment section -->
<div
  id="zoomment"
  data-theme="light"
  data-language="en"
  data-emotions="❤️,😀,🪄,🥸,💡,🤔,💩,😢"
  data-visitors="true"
></div>

<!-- the working script -->
<script src="https://cdn.zoomment.com/zoomment.min.js"></script>
```

## Options

Options can be passed via data attributes for comment section.

| Attribute Name | Possible values                                        | Default   |
| -------------- | ------------------------------------------------------ | --------- |
| data-theme     | light, dark, black                                     | light     |
| data-language  | en, hy, hyw, ru, zh, es                                | en        |
| data-emotions  | list comma separated emojis, leave empty if not needed | -         |
| data-gravatar  | Gravatar placeholder style (monsterid, identicon, etc) | monsterid |
| data-visitors  | true, false - show/hide page view counter              | false     |

## Development

1. Make sure you have Node.js installed.
2. Clone the repository, install dependencies and configure your .env file:

```bash
git clone https://github.com/zoomment/zoomment-widget.git
cd zoomment-widget
cp .env.example .env
npm install
```

3. Run it for development:

```bash
npm start
```

Open http://localhost:1234 to view it in the browser.

4. Build it for production:

```bash
npm run build
```

## API

The widget communicates with the Zoomment API. Set the `REACT_APP_API_URL` environment variable in your `.env` file:

```
API_URL=https://api.zoomment.com
```

## License

MIT
