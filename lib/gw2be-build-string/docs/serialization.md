# Build string serialization
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
        <td rowspan="4"><code>general</code></td>
        <td><code>build</code></td>
        <td>uint32</td>
        <td>The GW2 build id the build is made for</td>
    </tr>
    <tr>
        <td><code>gameMode</code></td>
        <td>enum</td>
        <td>
            The game mode:<br>
            <em>1 = pve</em><br>
            <em>2 = pvp</em><br>
            <em>3 = wvw</em>
        </td>
    </tr>
    <tr>
        <td><code>profession</code></td>
        <td>enum</td>
        <td>
            The profession:<br>
            <em>1 = guardian</em><br>
            <em>2 = revenant</em><br>
            <em>3 = warrior</em><br>
            <em>4 = engineer</em><br>
            <em>5 = ranger</em><br>
            <em>6 = thief</em><br>
            <em>7 = elementalist</em><br>
            <em>8 = mesmer</em><br>
            <em>9 = necromancer</em>
        </td>
    </tr>
    <tr>
        <td><code>race</code></td>
        <td>enum</td>
        <td>
            The race:<br>
            <em>1 = asura</em><br>
            <em>2 = charr</em><br>
            <em>3 = human</em><br>
            <em>4 = norn</em><br>
            <em>5 = sylvari</em>
        </td>
    </tr>
    <tr>
        <td rowspan="4"><code>specialization1</code></td>
        <td><code>specialization</code></td>
        <td>uint32</td>
        <td>The id for specialization 1</td>
    </tr>
    <tr>
        <td><code>majorTrait1</code></td>
        <td>uint32</td>
        <td>The id for major trait 1 of specialization 1</td>
    </tr>
    <tr>
        <td><code>majorTrait2</code></td>
        <td>uint32</td>
        <td>The id for major trait 2 of specialization 1</td>
    </tr>
    <tr>
        <td><code>majorTrait3</code></td>
        <td>uint32</td>
        <td>The id for major trait 3 of specialization 1</td>
    </tr>
    <tr>
        <td rowspan="4"><code>specialization2</code></td>
        <td><code>specialization</code></td>
        <td>uint32</td>
        <td>The id for specialization 2</td>
    </tr>
    <tr>
        <td><code>majorTrait1</code></td>
        <td>uint32</td>
        <td>The id for major trait 1 of specialization 2</td>
    </tr>
    <tr>
        <td><code>majorTrait2</code></td>
        <td>uint32</td>
        <td>The id for major trait 2 of specialization 2</td>
    </tr>
    <tr>
        <td><code>majorTrait3</code></td>
        <td>uint32</td>
        <td>The id for major trait 3 of specialization 2</td>
    </tr>
    <tr>
        <td rowspan="4"><code>specialization3</code></td>
        <td><code>specialization</code></td>
        <td>uint32</td>
        <td>The id for specialization 3</td>
    </tr>
    <tr>
        <td><code>majorTrait1</code></td>
        <td>uint32</td>
        <td>The id for major trait 1 of specialization 3</td>
    </tr>
    <tr>
        <td><code>majorTrait2</code></td>
        <td>uint32</td>
        <td>The id for major trait 2 of specialization 3</td>
    </tr>
    <tr>
        <td><code>majorTrait3</code></td>
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
        <th>Block (id)</th>
        <th>Index</th>
        <th>Value</th>
        <th>Storage Type</th>
    </tr>
    <tr>
        <td rowspan="4"><code>general</code> (1)</td>
        <td>0</td>
        <td><code>build</code></td>
        <td>build</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>gameMode</code></td>
        <td>enum</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>profession</code></td>
        <td>enum</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>race</code></td>
        <td>enum</td>
    </tr>
    <tr>
        <td rowspan="4"><code>specialization1</code> (11)</td>
        <td>0</td>
        <td><code>specialization</code></td>
        <td>specialization</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>majorTrait1</code></td>
        <td>trait</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>majorTrait2</code></td>
        <td>trait</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>majorTrait3</code></td>
        <td>trait</td>
    </tr>
    <tr>
        <td rowspan="4"><code>specialization2</code> (12)</td>
        <td>0</td>
        <td><code>specialization</code></td>
        <td>specialization</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>majorTrait1</code></td>
        <td>trait</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>majorTrait2</code></td>
        <td>trait</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>majorTrait3</code></td>
        <td>trait</td>
    </tr>
    <tr>
        <td rowspan="4"><code>specialization3</code> (13)</td>
        <td>0</td>
        <td><code>specialization</code></td>
        <td>specialization</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>majorTrait1</code></td>
        <td>trait</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>majorTrait2</code></td>
        <td>trait</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>majorTrait3</code></td>
        <td>trait</td>
    </tr>
</table>
