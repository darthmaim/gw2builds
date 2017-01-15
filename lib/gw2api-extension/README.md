# Guild Wars 2 API Extension
Extends the official Guild Wars 2 API with customized locally defined data.
It works in conjuntion with the module [gw2api-client](https://www.npmjs.com/package/gw2api-client).

Do note that this module alone isn't going to do much, you need a data provider like
[gw2be-api-extension-data](https:/www.npmjs.com/package/gw2be-api-extension-data) to provide the data.

## Installation
**TODO:** This module is currently part of the main GW2BE repository and not yet available on npmjs.com. 
```
npm install gw2api-extension
```

## Usage
```javascript
import client from 'gw2api-client'; // This is what we are going to extend
import extendApi from 'gw2api-extension';

// We use the custom data defined in `gw2be-api-extension-data` here, 
// but it can be any custom data as long as the format is correct.
import data from 'gw2be-api-extension-data';

const api = extendApi(client(), data);

// You can use 'api' as how you would use the API client from gw2api-client
// For example:
api.professions().all().then(professions => {
    // Do stuff here
});
```

## Tests
```
npm test
npm run lint
npm run cover
```

## License
The **Guild Wars 2 API Extension** is licensed under the [MIT License](LICENSE).
