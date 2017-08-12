# Build string serialization
The editor has the ability to compile and decompile a build to a base64 string that is used in URLs.
This allows people to share their builds easily with others.

## Global types
The global types are as follows:

 Type   | Description
--------|-------------
 uint8  | Unsigned 8-bit integer (also known as a byte)
 uint16 | Unsigned 16-bit integer
 uint32 | Unsigned 32-bit integer
 enum   | Enumerator (*0 = null or none*)

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

#### Enums
This version uses the following enums for serialization:
<table>
    <tr>
        <th>Enum</th>
        <th>Values</th>
    </tr>
    <tr>
        <td><code>gameMode</code></td>
        <td>
            1 = pve<br>
            2 = pvp<br>
            3 = wvw
        </td>
    </tr>
    <tr>
        <td><code>profession</code></td>
        <td>
            1 = Guardian<br>
            2 = Revenant<br>
            3 = Warrior<br>
            4 = Engineer<br>
            5 = Ranger<br>
            6 = Thief<br>
            7 = Elementalist<br>
            8 = Mesmer<br>
            9 = Necromancer
        </td>
    </tr>
    <tr>
        <td><code>race</code></td>
        <td>
            1 = Asura<br>
            2 = Charr<br>
            3 = Human<br>
            4 = Norn<br>
            5 = Sylvari
        </td>
    </tr>
    <tr>
        <td><code>weapon</code></td>
        <td>
            1 = Axe<br>
            2 = Dagger<br>
            3 = Mace<br>
            4 = Pistol<br>
            5 = Sword<br>
            6 = Scepter<br>
            7 = Focus<br>
            8 = Shield<br>
            9 = Torch<br>
            10 = Warhorn<br>
            11 = Greatsword<br>
            12 = Hammer<br>
            13 = Longbow<br>
            14 = Rifle<br>
            15 = Short bow<br>
            16 = Staff
        </td>
    </tr>
    <tr>
        <td><code>aquaticWeapon</code></td>
        <td>
            1 = Harpoon gun<br>
            2 = Spear<br>
            3 = Trident
        </td>
    </tr>
</table>


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
        <td>uint32<sup>1</sup></td>
        <td>
            GW2 build id<br>
            <em>Valid values<sup>1</sup>: 65536 – 196608</em>
        </td>
    </tr>
    <tr>
        <td><code>gameMode</code></td>
        <td>gameMode (enum)</td>
        <td>Game mode</td>
    </tr>
    <tr>
        <td><code>profession</code></td>
        <td>profession (enum)</td>
        <td>Profession</td>
    </tr>
    <tr>
        <td><code>race</code></td>
        <td>race (enum)</td>
        <td>Race</td>
    </tr>
    <tr>
        <td rowspan="4"><code>specialization1</code></td>
        <td><code>specialization</code></td>
        <td>uint32</td>
        <td>Specialization 1 id</td>
    </tr>
    <tr>
        <td><code>majorTrait1</code></td>
        <td rowspan="3">uint32</td>
        <td>Adept major trait id for specialization 1</td>
    </tr>
    <tr>
        <td><code>majorTrait2</code></td>
        <td>Master major trait id for specialization 1</td>
    </tr>
    <tr>
        <td><code>majorTrait3</code></td>
        <td>Grandmaster major trait id specialization 1</td>
    </tr>
    <tr>
        <td rowspan="4"><code>specialization2</code></td>
        <td><code>specialization</code></td>
        <td>uint32</td>
        <td>Specialization 2 id</td>
    </tr>
    <tr>
        <td><code>majorTrait1</code></td>
        <td rowspan="3">uint32</td>
        <td>Adept major trait id for specialization 2</td>
    </tr>
    <tr>
        <td><code>majorTrait2</code></td>
        <td>Master major trait id for specialization 2</td>
    </tr>
    <tr>
        <td><code>majorTrait3</code></td>
        <td>Grandmaster major trait id specialization 2</td>
    </tr>
    <tr>
        <td rowspan="4"><code>specialization3</code></td>
        <td><code>specialization</code></td>
        <td>uint32</td>
        <td>Specialization 3 id</td>
    </tr>
    <tr>
        <td><code>majorTrait1</code></td>
        <td rowspan="3">uint32</td>
        <td>Adept major trait id for specialization 3</td>
    </tr>
    <tr>
        <td><code>majorTrait2</code></td>
        <td>Master major trait id for specialization 3</td>
    </tr>
    <tr>
        <td><code>majorTrait3</code></td>
        <td>Grandmaster major trait id specialization 3</td>
    </tr>
    <tr>
        <td rowspan="6"><code>weapons</code></td>
        <td><code>weaponA1</code></td>
        <td rowspan="4">weapon (enum)</td>
        <td rowspan="4">
            Weapons, where:<br>
            A = first set, B = second set<br>
            1 = main-hand, 2 = off-hand
        </td>
    </tr>
    <tr>
        <td><code>weaponA2</code></td>
    </tr>
    <tr>
        <td><code>weaponB1</code></td>
    </tr>
    <tr>
        <td><code>weaponB2</code></td>
    </tr>
    <tr>
        <td><code>aquaticA</code></td>
        <td rowspan="2">aquaticWeapon (enum)</td>
        <td rowspan="2">
            Aquatic weapons, where:<br>
            A = first set, B = second set
        </td>
    </tr>
    <tr>
        <td><code>aquaticB</code></td>
    </tr>
</table>

<sup>1</sup> In order to save space, the serializer converts the build id to a 17-bit unsigned integer by subtracting the build id with the lower boundary.
Make sure that the build id is within the specified boundaries.
Because the build id slowly increments, at some point a new version might be needed to update the boundary.
But this probably won't happen before 2023.

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
        <td>build (unsigned 17-bit)</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>gameMode</code></td>
        <td>gameMode (enum)</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>profession</code></td>
        <td>profession (enum)</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>race</code></td>
        <td>race (enum)</td>
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
    <tr>
        <td rowspan="6"><code>weapons</code> (21)</td>
        <td>0</td>
        <td><code>weaponA1</code></td>
        <td>weapon (enum)</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>weaponA2</code></td>
        <td>weapon (enum)</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>weaponB1</code></td>
        <td>weapon (enum)</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>weaponB2</code></td>
        <td>weapon (enum)</td>
    </tr>
    <tr>
        <td>4</td>
        <td><code>aquaticA</code></td>
        <td>aquaticWeapon (enum)</td>
    </tr>
    <tr>
        <td>5</td>
        <td><code>aquaticB</code></td>
        <td>aquaticWeapon (enum)</td>
    </tr>
</table>
