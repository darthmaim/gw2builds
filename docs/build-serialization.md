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
<table>
    <tr>
        <th>Block</th>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td rowspan="4">`general`</td>
        <td>`build`</td>
        <td>uint32</td>
        <td>The GW2 build id the build is made for</td>
    </tr>
    <tr>
        <td>`gameMode`</td>
        <td>enum</td>
        <td>
            The game mode:<br>
            *1 = pve*<br>
            *2 = pvp*<br>
            *3 = wvw*
        </td>
    </tr>
    <tr>
        <td>`profession`</td>
        <td>enum</td>
        <td>
            The profession:<br>
            *1 = guardian*<br>
            *2 = revenant*<br>
            *3 = warrior*<br>
            *4 = engineer*<br>
            *5 = ranger*<br>
            *6 = thief*<br>
            *7 = elementalist*<br>
            *8 = mesmer*<br>
            *9 = necromancer*
        </td>
    </tr>
    <tr>
        <td>`race`</td>
        <td>enum</td>
        <td>
            The race:<br>
            *1 = asura*<br>
            *2 = charr*<br>
            *3 = human*<br>
            *4 = norn*<br>
            *5 = sylvari*
        </td>
    </tr>
    <tr>
        <td rowspan="4">`specialization1`</td>
        <td>`specialization`</td>
        <td>uint32</td>
        <td>The id for specialization 1</td>
    </tr>
    <tr>
        <td>`majorTrait1`</td>
        <td>uint32</td>
        <td>The id for major trait 1 of specialization 1</td>
    </tr>
    <tr>
        <td>`majorTrait2`</td>
        <td>uint32</td>
        <td>The id for major trait 2 of specialization 1</td>
    </tr>
    <tr>
        <td>`majorTrait3`</td>
        <td>uint32</td>
        <td>The id for major trait 3 of specialization 1</td>
    </tr>
    <tr>
        <td rowspan="4">`specialization2`</td>
        <td>`specialization`</td>
        <td>uint32</td>
        <td>The id for specialization 2</td>
    </tr>
    <tr>
        <td>`majorTrait1`</td>
        <td>uint32</td>
        <td>The id for major trait 1 of specialization 2</td>
    </tr>
    <tr>
        <td>`majorTrait2`</td>
        <td>uint32</td>
        <td>The id for major trait 2 of specialization 2</td>
    </tr>
    <tr>
        <td>`majorTrait3`</td>
        <td>uint32</td>
        <td>The id for major trait 3 of specialization 2</td>
    </tr>
    <tr>
        <td rowspan="4">`specialization3`</td>
        <td>`specialization`</td>
        <td>uint32</td>
        <td>The id for specialization 3</td>
    </tr>
    <tr>
        <td>`majorTrait1`</td>
        <td>uint32</td>
        <td>The id for major trait 1 of specialization 3</td>
    </tr>
    <tr>
        <td>`majorTrait2`</td>
        <td>uint32</td>
        <td>The id for major trait 2 of specialization 3</td>
    </tr>
    <tr>
        <td>`majorTrait3`</td>
        <td>uint32</td>
        <td>The id for major trait 3 of specialization 3</td>
    </tr>
</table>

#### Serialized data structure
 Byte | Type   | Description
------|--------|-------------
 0    | uint32 | List of bits used for storage types, see below  
 4+   |        | Zero or more data blocks

The following table shows how the list of bits used for storage types are stored in the unsigned 32-bit integer: 
<table>
    <tr>
        <th>Bit</th>
        <td align="center">31-30</th>
        <td align="center">29-25</td>
        <td align="center">24-20</td>
        <td align="center">19-15</td>
        <td align="center">14-10</td>
        <td align="center">9-5</td>
        <td align="center">4-0</td>
    </tr>
    <tr>
        <th>Type</th>
        <td>empty</td>
        <td>reserved</td>
        <td>reserved</td>
        <td>reserved</td>
        <td>reserved</td>
        <td>trait</td>
        <td>specialization</td>
    </tr>
</table>

##### Blocks
Every block is encoded as follows:

 Byte | Type  | Description
------|-------|-------------
 0    | uint8 | Block id
 1+   |       | Block data

- If the block data contains only zeroes (and no actual data), it is skipped in the serialized result to save space
- The block contains values that are stored with the least amount of bits required, and are saved in the given order of the array
  - If the value is an enum, the amount of bits required is taken from the maximum enum value possible
  - Otherwise it's determined beforehand and available in the list of storage type bits above
- The values are stored right after another with the most significant bit first
- The blocks are aligned to byte-boundaries; it adds zero-padding at the end if the block isn't aligned

<table>
    <tr>
        <th>Block</th>
        <th>Index</th>
        <th>Value</th>
        <th>Storage Type</th>
    </tr>
    <tr>
        <td rowspan="4">`general` (1)</td>
        <td>0</td>
        <td>`build`</td>
        <td>build</td>
    </tr>
    <tr>
        <td>1</td>
        <td>`gameMode`</td>
        <td>enum</td>
    </tr>
    <tr>
        <td>2</td>
        <td>`profession`</td>
        <td>enum</td>
    </tr>
    <tr>
        <td>3</td>
        <td>`race`</td>
        <td>enum</td>
    </tr>
    <tr>
        <td rowspan="4">`specialization1` (11)</td>
        <td>0</td>
        <td>`specialization`</td>
        <td>specialization</td>
    </tr>
    <tr>
        <td>1</td>
        <td>`majorTrait1`</td>
        <td>trait</td>
    </tr>
    <tr>
        <td>2</td>
        <td>`majorTrait2`</td>
        <td>trait</td>
    </tr>
    <tr>
        <td>3</td>
        <td>`majorTrait3`</td>
        <td>trait</td>
    </tr>
    <tr>
        <td rowspan="4">`specialization2` (12)</td>
        <td>0</td>
        <td>`specialization`</td>
        <td>specialization</td>
    </tr>
    <tr>
        <td>1</td>
        <td>`majorTrait1`</td>
        <td>trait</td>
    </tr>
    <tr>
        <td>2</td>
        <td>`majorTrait2`</td>
        <td>trait</td>
    </tr>
    <tr>
        <td>3</td>
        <td>`majorTrait3`</td>
        <td>trait</td>
    </tr>
    <tr>
        <td rowspan="4">`specialization3` (13)</td>
        <td>0</td>
        <td>`specialization`</td>
        <td>specialization</td>
    </tr>
    <tr>
        <td>1</td>
        <td>`majorTrait1`</td>
        <td>trait</td>
    </tr>
    <tr>
        <td>2</td>
        <td>`majorTrait2`</td>
        <td>trait</td>
    </tr>
    <tr>
        <td>3</td>
        <td>`majorTrait3`</td>
        <td>trait</td>
    </tr>
</table>
