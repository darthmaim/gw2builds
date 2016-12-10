# URL
The editor has the ability to compile and decompile a build to a base64 string that is used in URLs.
This allows people to share their builds easily with others.

## Data structure
The data is encoded as follows:

 Byte | Type  | Description
------|-------|-------------
 0    | uint8 | Version
 1+   |       | Data

The structure is versioned in case the format will be changed later.
The data is dependent on the version and can be found below.

Furthermore, since this data has to be represented in a form that can be used in URLs, it's encoded as a URL safe base64 string.
This means that in the base64 string, the `+` and `/` are encoded as `-` and `_` respectively, and the padding `=` at the end is removed.


## Versions
### v0 (dev)
The current in-development version and will be replaced with version 1 once the first format is finalized.

Possible types:

 Type   | Description
--------|-------------
 uint8  | Unsigned 8-bit integer (also known as a byte)
 uint32 | Unsigned 32-bit integer
 enum   | Enumerator (*0 = null or none*)

#### Deserialized data structure
 Id                | Type   | Description
-------------------|--------|-------------
 `build`           | uint32 | The GW2 build id the build is made for
 `gameMode`        | enum   | The game mode (*1 = pve*, *2 = pvp*, *3 = wvw*)
 `profession`      | enum   | The profession (*1 = guardian*, *2 = revenant*, *3 = warrior*, *4 = engineer*, *5 = ranger*, *6 = thief*, *7 = elementalist*, *8 = mesmer*, *9 = necromancer*)
 `race`            | enum   | The race (*1 = asura*, *2 = charr*, *3 = human*, *4 = norn*, *5 = sylvari*)
 `specialization1` | uint32 | The id for specialization 1
 `majorTrait11`    | uint32 | The id for major trait 1 of specialization 1
 `majorTrait12`    | uint32 | The id for major trait 2 of specialization 1
 `majorTrait13`    | uint32 | The id for major trait 3 of specialization 1
 `specialization2` | uint32 | The id for specialization 2
 `majorTrait21`    | uint32 | The id for major trait 1 of specialization 2
 `majorTrait22`    | uint32 | The id for major trait 2 of specialization 2
 `majorTrait23`    | uint32 | The id for major trait 3 of specialization 2
 `specialization3` | uint32 | The id for specialization 3
 `majorTrait31`    | uint32 | The id for major trait 1 of specialization 3
 `majorTrait32`    | uint32 | The id for major trait 2 of specialization 3
 `majorTrait33`    | uint32 | The id for major trait 3 of specialization 3

#### Serialized data structure
 Byte | Type   | Description
------|--------|-------------
 0    | uint32 | List of bits used for storage types, see below  
 4+   |        | Data blocks
 
List of bits used for storage types (bits are numbered from least to most significance):
- Bit 0-4 - u:build
- Bit 5-9 - u:specialization
- Bit 10-14 - u:trait
- Bit 15-19 - reserved
- Bit 20-24 - reserved
- Bit 25-29 - reserved
- Bit 30-31 - empty

##### Blocks
Every block is encoded as follows:

 Byte | Type  | Description
------|-------|-------------
 0    | uint8 | Block id
 1+   |       | Block data

- If the block data contains only zeroes (and no actual data), it is skipped in the serialized result to save space
- The block contains values that are stored with the least amount of bits required, and are saved in the given order of the array
  - If the value is an enum, the amount of bits required is taken from the maximum enum value possible
  - Otherwise it's determined beforehand and available in the list of bits above
- The values are stored right after another with the most significant bit first
- The blocks are aligned to byte-boundaries; it adds zero-padding at the end if the block isn't aligned

###### General (1)
 Index | Type         | Value
-------|--------------|-------
 0     | u:build      | `build`
 1     | e:gameMode   | `gameMode`
 2     | e:profession | `profession`
 3     | e:race       | `race`

###### Specialization 1 (11)
 Index | Type             | Value
-------|------------------|-------
 0     | u:specialization | `specialization1`
 1     | u:trait          | `majorTrait11`
 2     | u:trait          | `majorTrait12`
 3     | u:trait          | `majorTrait13`

###### Specialization 2 (12)
 Index | Type             | Value
-------|------------------|-------
 0     | u:specialization | `specialization2`
 1     | u:trait          | `majorTrait21`
 2     | u:trait          | `majorTrait22`
 3     | u:trait          | `majorTrait23`

###### Specialization 3 (13)
 Index | Type             | Value
-------|------------------|-------
 0     | u:specialization | `specialization3`
 1     | u:trait          | `majorTrait31`
 2     | u:trait          | `majorTrait32`
 3     | u:trait          | `majorTrait33`