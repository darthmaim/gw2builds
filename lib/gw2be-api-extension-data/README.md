# ![gw2efficiency Build Editor](docs/github-banner.png)
*This is a dependency module for the **gw2efficiency Build Editor**.
Please report all issues regarding the editor in the [main repository](https://github.com/darthmaim/gw2builds).*

If there is a specific issue with this module, you can create an issue here.


## Documentation
- [Endpoints](docs/endpoints.md)


## Installation
**TODO:** This module is currently part of the main repository and not yet available on npmjs.com.

This module only contains the data that can be used by [gw2api-extension](https://www.npmjs.com/package/gw2api-extension).
It is therefore recommended to also install that package.

Install this module with your favorite package manager, e.g. `npm install gw2be-api-extension-data`.

### Usage
Please see [gw2api-extension](https://www.npmjs.com/package/gw2api-extension) on how to use the data.
```javascript
import data from 'gw2be-api-extension-data';
```


## Development
Note: This repository uses [Yarn](https://yarnpkg.com/) instead of NPM.
Make sure it's installed before continuing.

1. Clone this repository.
2. Install all dependencies (`yarn`).

### Tests
```
yarn lint
```


## License
This module for **gw2efficiency Build Editor** is licensed under the [MIT License](LICENSE).
