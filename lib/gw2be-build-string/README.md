# ![gw2efficiency Build Editor](docs/github-banner.png)
*This is a dependency module for the **gw2efficiency Build Editor**.
Please report all issues regarding the editor in the [main repository](https://github.com/darthmaim/gw2builds).*

If there is a specific issue with this module, you can create an issue here.

## Documentation
- [Build string serialization](docs/serialization.md)

## Installation
**TODO:** This module is currently part of the main repository and not yet available on npmjs.com. 
```
npm install gw2be-build-string
```

## Usage
### Serialize a build
The build is defined as an object that is structured as one of the versioned deserialized
data structures that can be found in the [serialization documentation](docs/serialization.md).

```javascript
import { serialize, deserialize } from 'gw2be-build-string';

// This is an example build object for version 0.
// Don't forget to use the latest version available.
const build = {
    general: {
        build: 70000, // GW2 client build 70000
        gameMode: 'pve',
        profession: 'revenant',
        race: 'charr'
    },
    specialization1: { // First specialization
        specialization: 14, // Corruption
        majorTrait1: 1793, // Replenishing Despair
        majorTrait2: 1727, // Bolstered Anguish
        majorTrait3: 1795 // Diabolic Inferno
    }
    // Blocks are allowed to be omitted if they are not used
};

// Serialize the build into a URL compatible base64 string
const serializedBuild = serialize(build); // "AAAAAUMBAABJAAvuA6_4GA"

// Deserialize the base64 string back into the build
const deserializedBuild = deserialize(serializedBuild); // Gives back the original build above
```

## Tests
```
npm test
npm run lint
npm run cover
```

## License
This module for **gw2efficiency Build Editor** is licensed under the [MIT License](LICENSE).
