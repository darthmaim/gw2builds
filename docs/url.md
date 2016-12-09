# URL
The editor has the ability to compile and decompile a build to a base64 string that is used in URLs.
This allows people to share their builds easily with others.

## Data structure
The base64 string is basically a file on its own.
It represents binary data that is versioned in case a breaking change will be introduced later.
Since this string is used in URLs, the `+` and `/` are encoded as `-` and `_` respectively.
The extra `=` at the end are trimmed away.

The structure is versioned in case the format will be changed later.

The data is encoded as follows:
- Byte 0 (uint8) - Version
- Byte 1+ - The data itself

## Versions
### v0 (dev)
The current in-development version and will be replaced with version 1 once the first format is finalized.

Possible types:
- uint8 - Unsigned 8-bit integer (also known as a byte)
- uint32 - Unsigned 32-bit integer
- enum - Enumerator (0 = null or none)

#### Deserialized data structure
- `build` (uint32)  
  The GW2 build id the build is made for.
- `gameMode` (enum)  
  Options: *1 = pve*, *2 = pvp*, *3 = wvw*.  
  The game mode.
- `profession` (enum)  
  Options: *1 = guardian*, *2 = revenant*, *3 = warrior*, *4 = engineer*, *5 = ranger*, *6 = thief*, *7 = elementalist*, *8 = mesmer*, *9 = necromancer*.  
  The profession.
- `race` (enum)  
  Options: *1 = asura*, *2 = charr*, *3 = human*, *4 = norn*, *5 = sylvari*.  
  The race.
- `specialization1` (uint32)  
  The id for specialization 1.
- `majorTrait11` (uint32)  
  The id for major trait 1 of specialization 1.
- `majorTrait12` (uint32)  
  The id for major trait 2 of specialization 1.
- `majorTrait13` (uint32)  
  The id for major trait 3 of specialization 1.
- `specialization2` (uint32)  
  The id for specialization 2.
- `majorTrait21` (uint32)  
  The id for major trait 1 of specialization 2.
- `majorTrait22` (uint32)  
  The id for major trait 2 of specialization 2.
- `majorTrait23` (uint32)  
  The id for major trait 3 of specialization 2.
- `specialization3` (uint32)  
  The id for specialization 3.
- `majorTrait31` (uint32)  
  The id for major trait 1 of specialization 3.
- `majorTrait32` (uint32)  
  The id for major trait 2 of specialization 3.
- `majorTrait33` (uint32)  
  The id for major trait 3 of specialization 3.

#### Serialized data structure
- Byte 0 (uint32) - Lits of bits used for storage types (bits are numbered from least to most significance):
  - Bit 0-4 - u:build
  - Bit 5-9 - u:specialization
  - Bit 10-14 - u:trait
  - Bit 15-19 - reserved
  - Bit 20-24 - reserved
  - Bit 25-29 - reserved
  - Bit 30-31 - empty
- Byte 4+ - Multiple blocks

##### Blocks
Every block is encoded as follows:
- Byte 0 (uint8) - Block id
- Byte 1+ - Block data

The block data contains condensed sequential values.
Every value inside a block is marked with a special data type that uses the maximum amount of bits needed in order to encode all values that use this data type.
The amount of bits for these data types are stored at the start that can be seen above.

Because the values are condensed and sequential, they are stored right after another with the most significant bit first.
It is very likely that bit shifting is required in order to get the full value.
There is zero-padding after all the values in order to align the blocks at byte-boundaries.

###### General (1)
- Value 0 (u:build) - `build`
- Value 1 (e:gameMode) - `gameMode`
- Value 2 (e:profession) - `profession`
- Value 3 (e:race) - `race`

###### Specialization 1 (11)
- Value 0 (u:specialization) - `specialization1`
- Value 1 (u:trait) - `majorTrait11`
- Value 2 (u:trait) - `majorTrait12`
- Value 3 (u:trait) - `majorTrait13`

###### Specialization 2 (12)
- Value 0 (u:specialization) - `specialization2`
- Value 1 (u:trait) - `majorTrait21`
- Value 2 (u:trait) - `majorTrait22`
- Value 3 (u:trait) - `majorTrait23`

###### Specialization 3 (13)
- Value 0 (u:specialization) - `specialization3`
- Value 1 (u:trait) - `majorTrait31`
- Value 2 (u:trait) - `majorTrait32`
- Value 3 (u:trait) - `majorTrait33`