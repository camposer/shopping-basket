# Shopping Basket

Shopping Basket example based on [React Redux Universal Hot Example](https://github.com/erikras/react-redux-universal-hot-example).

Isomorphic responsive Web app. Developed with React/Redux and Express. All API operations are managed in memory.

## Requirements

Items are presented one at a time, in a list, identified by name - for example "Apple" or "Banana".
* The basket can contain any item multiple times. Items are priced as follows:
	* Apples are 25 ct each
	* Oranges are 30 ct each
	* Bananas are 15 ct each
	* Papayas are 50 ct each, but are available as ‘three for the price of two’
* Given a shopping list with items, calculate the total cost of those items.
* The output shall be displayed similar to what you would expect to see on a receipt.

## Installation

```bash
npm install
```

## Testing

- API
```bash
npm run test-node
```

- Front (not implemented this time)
```bash
npm run test
```

## Running Dev Server

```bash
npm run dev
```

The first time it may take a little while to generate the first `webpack-assets.json` and complain with a few dozen `[webpack-isomorphic-tools] (waiting for the first Webpack build to finish)` printouts, but be patient. Give it 30 seconds.

### Using Redux DevTools

[Redux Devtools](https://github.com/gaearon/redux-devtools) are enabled by default in development.

- <kbd>CTRL</kbd>+<kbd>H</kbd> Toggle DevTools Dock
- <kbd>CTRL</kbd>+<kbd>Q</kbd> Move DevTools Dock Position
- see [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detailed information.

If you have the 
[Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) installed it will automatically be used on the client-side instead.

If you want to disable the dev tools during development, set `__DEVTOOLS__` to `false` in `/webpack/dev.config.js`.  
DevTools are not enabled during production.

## Building and Running Production Server

```bash
npm run build
npm run start
```

