# Build string serialization
The editor has the ability to compile and decompile a build to a base64 string that is used in URLs.
This allows people to share their builds easily with others.

## Global types
The global types are as follows:

 Type                   | Description
------------------------|-------------
 bool                   | 1-bit boolean
 uint8                  | Unsigned 8-bit integer (also known as a byte)
 uint16                 | Unsigned 16-bit integer
 uint32                 | Unsigned 32-bit integer
 duplicateFlag          | A boolean flag that - if true - signals that *all* next duplicateValues are the same as the first duplicateValue (and therefore skips every duplicateValue after the first to conserve space when serializing); if false, this flag does nothing special  
 duplicateValue(`type`) | A duplicateFlag is immediately followed by one or more duplicateValues; their type is the same as `type`
 enum                   | Enumerator (*0 = null or none*)

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
            1 = Speargun<br>
            2 = Spear<br>
            3 = Trident
        </td>
    </tr>
    <tr>
        <td><code>legend</code><sup>1</sup></td>
        <td>
            1 = Assassin<br>
            2 = Demon<br>
            3 = Dwarf<br>
            4 = Centaur<br>
            5 = Dragon<br>
            6 = Renegade
        </td>
    </tr>
    <tr>
        <td><code>attunement</code></td>
        <td>
            1 = Fire<br>
            2 = Water<br>
            3 = Air<br>
            4 = Earth
        </td>
    </tr>
</table>

<sup>1</sup> The `legend` enum is stored as 4 bits, instead of 3 bits.
This allows supporting new revenant legends in future expansions without being limited by only 7 legends in total.

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
        <td>Grandmaster major trait id for specialization 1</td>
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
        <td>Grandmaster major trait id for specialization 2</td>
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
        <td>Grandmaster major trait id for specialization 3</td>
    </tr>
    <tr>
        <td rowspan="6"><code>weapons</code></td>
        <td><code>weaponA1</code></td>
        <td rowspan="4">weapon (enum)</td>
        <td>Main-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponA2</code></td>
        <td>Off-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB1</code></td>
        <td>Main-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB2</code></td>
        <td>Off-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>aquaticA</code></td>
        <td rowspan="2">aquaticWeapon (enum)</td>
        <td>First aquatic weapon set</td>
    </tr>
    <tr>
        <td><code>aquaticB</code></td>
        <td>Second aquatic weapon set</td>
    </tr>
    <tr>
        <td rowspan="5"><code>skills</code></td>
        <td><code>healing</code></td>
        <td rowspan="5">uint32</td>
        <td>Healing skill id</td>
    </tr>
    <tr>
        <td><code>utility1</code></td>
        <td>Utility skill 1 id</code>
    </tr>
    <tr>
        <td><code>utility2</code></td>
        <td>Utility skill 2 id</code>
    </tr>
    <tr>
        <td><code>utility3</code></td>
        <td>Utility skill 3 id</td>
    </tr>
    <tr>
        <td><code>elite</code></td>
        <td>Elite skill id</td>
    </tr>
    <tr>
        <td><code>professionGuardian</code></td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td rowspan="2"><code>professionRevenant</code></td>
        <td><code>legendA</code></td>
        <td rowspan="2">legend (enum)</td>
        <td>First legend</td>
    </tr>
    <tr>
        <td><code>legendB</code></td>
        <td>Second legend</td>
    </tr>
    <tr>
        <td><code>professionWarrior</code></td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td><code>professionEngineer</code></td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td rowspan="4"><code>professionRanger</code></td>
        <td><code>petA</code></td>
        <td rowspan="4">uint32</td>
        <td>First pet id</td>
    </tr>
    <tr>
        <td><code>petB</code></td>
        <td>Second pet id</td>
    </tr>
    <tr>
        <td><code>petAquaticA</code></td>
        <td>First aquatic pet id</td>
    </tr>
    <tr>
        <td><code>petAquaticB</code></td>
        <td>Second aquatic pet id</td>
    </tr>
    <tr>
        <td><code>professionThief</code></td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td rowspan="2"><code>professionElementalist</code></td>
        <td><code>attunement</code></td>
        <td rowspan="2">attunement (enum)</td>
        <td>Active attunement</td>
    </tr>
    <tr>
        <td><code>prevAttunementWeaver</code></td>
        <td>Previous active attunement (Weaver specific)</td>
    </tr>
    <tr>
        <td><code>professionMesmer</code></td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td><code>professionNecromancer</code></td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td rowspan="38"><code>gearStats</code></td>
        <td><code>weaponA1</code></td>
        <td rowspan="19">uint32</td>
        <td>Itemstat id of main-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponA2</code></td>
        <td>Itemstat id of off-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB1</code></td>
        <td>Itemstat id of main-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB2</code></td>
        <td>Itemstat id of off-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>weaponAquaticA</code></td>
        <td>First aquatic weapon itemstat id</td>
    </tr>
    <tr>
        <td><code>weaponAquaticB</code></td>
        <td>Second aquatic weapon itemstat id</td>
    </tr>
    <tr>
        <td><code>helm</code></td>
        <td>Helm armor itemstat id</td>
    </tr>
    <tr>
        <td><code>shoulders</code></td>
        <td>Shoulder armor itemstat id</td>
    </tr>
    <tr>
        <td><code>coat</code></td>
        <td>Coat armor itemstat id</td>
    </tr>
    <tr>
        <td><code>gloves</code></td>
        <td>Gloves armor itemstat id</td>
    </tr>
    <tr>
        <td><code>leggings</code></td>
        <td>Leggings armor itemstat id</td>
    </tr>
    <tr>
        <td><code>boots</code></td>
        <td>Boots armor itemstat id</td>
    </tr>
    <tr>
        <td><code>helmAquatic</code></td>
        <td>Aquatic helm armor itemstat id</td>
    </tr>
    <tr>
        <td><code>backpack</code></td>
        <td>Backpack itemstat id</td>
    </tr>
    <tr>
        <td><code>accessory1</code></td>
        <td>First accessory itemstat id</td>
    </tr>
    <tr>
        <td><code>accessory2</code></td>
        <td>Second accessory itemstat id</td>
    </tr>
    <tr>
        <td><code>amulet</code></td>
        <td>Amulet itemstat id</td>
    </tr>
    <tr>
        <td><code>ring1</code></td>
        <td>First ring itemstat id</td>
    </tr>
    <tr>
        <td><code>ring2</code></td>
        <td>Second ring itemstat id</td>
    </tr>
    <tr>
        <td><code>weaponA1IsAscended</code></td>
        <td rowspan="19">bool</td>
        <td>Ascended flag for main-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponA2IsAscended</code></td>
        <td>Ascended flag for off-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB1IsAscended</code></td>
        <td>Ascended flag for main-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB2IsAscended</code></td>
        <td>Ascended flag for off-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>weaponAquaticAIsAscended</code></td>
        <td>First aquatic weapon ascended flag</td>
    </tr>
    <tr>
        <td><code>weaponAquaticBIsAscended</code></td>
        <td>Second aquatic weapon ascended flag</td>
    </tr>
    <tr>
        <td><code>helmIsAscended</code></td>
        <td>Helm armor ascended flag</td>
    </tr>
    <tr>
        <td><code>shouldersIsAscended</code></td>
        <td>Shoulder armor ascended flag</td>
    </tr>
    <tr>
        <td><code>coatIsAscended</code></td>
        <td>Coat armor ascended flag</td>
    </tr>
    <tr>
        <td><code>glovesIsAscended</code></td>
        <td>Gloves armor ascended flag</td>
    </tr>
    <tr>
        <td><code>leggingsIsAscended</code></td>
        <td>Leggings armor ascended flag</td>
    </tr>
    <tr>
        <td><code>bootsIsAscended</code></td>
        <td>Boots armor ascended flag</td>
    </tr>
    <tr>
        <td><code>helmAquaticIsAscended</code></td>
        <td>Aquatic helm armor ascended flag</td>
    </tr>
    <tr>
        <td><code>backpackIsAscended</code></td>
        <td>Backpack ascended flag</td>
    </tr>
    <tr>
        <td><code>accessory1IsAscended</code></td>
        <td>First accessory ascended flag</td>
    </tr>
    <tr>
        <td><code>accessory2IsAscended</code></td>
        <td>Second accessory ascended flag</td>
    </tr>
    <tr>
        <td><code>amuletIsAscended</code></td>
        <td>Amulet ascended flag</td>
    </tr>
    <tr>
        <td><code>ring1IsAscended</code></td>
        <td>First ring ascended flag</td>
    </tr>
    <tr>
        <td><code>ring2IsAscended</code></td>
        <td>Second ring ascended flag</td>
    </tr>
    <tr>
        <td rowspan="19"><code>gearUpgrades</code></td>
        <td><code>weaponA1</code></td>
        <td rowspan="19">uint32</td>
        <td>Upgrade item id of main-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponA2</code></td>
        <td>Upgrade item id of off-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB1</code></td>
        <td>Upgrade item id of main-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB2</code></td>
        <td>Upgrade item id of off-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>weaponAquaticA</code></td>
        <td>First aquatic weapon upgrade item id</td>
    </tr>
    <tr>
        <td><code>weaponAquaticB</code></td>
        <td>Second aquatic weapon upgrade item id</td>
    </tr>
    <tr>
        <td><code>helm</code></td>
        <td>Helm armor upgrade item id</td>
    </tr>
    <tr>
        <td><code>shoulders</code></td>
        <td>Shoulder armor upgrade item id</td>
    </tr>
    <tr>
        <td><code>coat</code></td>
        <td>Coat armor upgrade item id</td>
    </tr>
    <tr>
        <td><code>gloves</code></td>
        <td>Gloves armor upgrade item id</td>
    </tr>
    <tr>
        <td><code>leggings</code></td>
        <td>Leggings armor upgrade item id</td>
    </tr>
    <tr>
        <td><code>boots</code></td>
        <td>Boots armor upgrade item id</td>
    </tr>
    <tr>
        <td><code>helmAquatic</code></td>
        <td>Aquatic helm armor upgrade item id</td>
    </tr>
    <tr>
        <td><code>backpack</code></td>
        <td>Backpack upgrade item id</td>
    </tr>
    <tr>
        <td><code>accessory1</code></td>
        <td>First accessory upgrade item id</td>
    </tr>
    <tr>
        <td><code>accessory2</code></td>
        <td>Second accessory upgrade item id</td>
    </tr>
    <tr>
        <td><code>amulet</code></td>
        <td>Amulet upgrade item id</td>
    </tr>
    <tr>
        <td><code>ring1</code></td>
        <td>First ring upgrade item id</td>
    </tr>
    <tr>
        <td><code>ring2</code></td>
        <td>Second ring upgrade item id</td>
    </tr>
    <tr>
        <td rowspan="23"><code>gearInfusions</code></td>
        <td><code>weaponA1</code></td>
        <td rowspan="23">uint32</td>
        <td>Infusion item id of main-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponA2</code></td>
        <td>Infusion item id of off-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB1</code></td>
        <td>Infusion item id of main-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB2</code></td>
        <td>Infusion item id of off-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>weaponAquaticA</code></td>
        <td>First aquatic weapon infusion item id</td>
    </tr>
    <tr>
        <td><code>weaponAquaticB</code></td>
        <td>Second aquatic weapon infusion item id</td>
    </tr>
    <tr>
        <td><code>helm</code></td>
        <td>Helm armor infusion item id</td>
    </tr>
    <tr>
        <td><code>shoulders</code></td>
        <td>Shoulder armor infusion item id</td>
    </tr>
    <tr>
        <td><code>coat</code></td>
        <td>Coat armor infusion item id</td>
    </tr>
    <tr>
        <td><code>gloves</code></td>
        <td>Gloves armor infusion item id</td>
    </tr>
    <tr>
        <td><code>leggings</code></td>
        <td>Leggings armor infusion item id</td>
    </tr>
    <tr>
        <td><code>boots</code></td>
        <td>Boots armor infusion item id</td>
    </tr>
    <tr>
        <td><code>helmAquatic</code></td>
        <td>Aquatic helm armor infusion item id</td>
    </tr>
    <tr>
        <td><code>backpack</code></td>
        <td>Backpack infusion item id</td>
    </tr>
    <tr>
        <td><code>backpackInfused</code></td>
        <td>Second backpack infusion item id</td>
    </tr>
    <tr>
        <td><code>accessory1</code></td>
        <td>First accessory infusion item id</td>
    </tr>
    <tr>
        <td><code>accessory2</code></td>
        <td>Second accessory infusion item id</td>
    </tr>
    <tr>
        <td><code>ring1</code></td>
        <td>First ring infusion item id</td>
    </tr>
    <tr>
        <td><code>ring1Infused</code></td>
        <td>Second infusion item id of first ring</td>
    </tr>
    <tr>
        <td><code>ring1Attuned</code></td>
        <td>Third infusion item id of first ring</td>
    </tr>
    <tr>
        <td><code>ring2</code></td>
        <td>Second ring infusion item id</td>
    </tr>
    <tr>
        <td><code>ring2Infused</code></td>
        <td>Second infusion item id of second ring</td>
    </tr>
    <tr>
        <td><code>ring2Attuned</code></td>
        <td>Third infusion item id of second ring</td>
    </tr>
    <tr>
        <td rowspan="6"><code>gearPvp</code></td>
        <td><code>amulet</code></td>
        <td>uint32</td>
        <td>Amulet id</td>
    </tr>
    <tr>
        <td><code>weaponA1Upgrade</code></td>
        <td rowspan="5">uint32</td>
        <td>Upgrade item id of main-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponA2Upgrade</code></td>
        <td>Upgrade item id of off-hand weapon of first weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB1Upgrade</code></td>
        <td>Upgrade item id of main-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>weaponB2Upgrade</code></td>
        <td>Upgrade item id of off-hand weapon of second weapon set</td>
    </tr>
    <tr>
        <td><code>armorUpgrade</code></td>
        <td>Armor upgrade item id</td>
    </tr>
    <tr>
        <td rowspan="2"><code>food</code></td>
        <td><code>food</code></td>
        <td>uint32</td>
        <td>Food item id</td>
    </tr>
    <tr>
        <td><code>utility</code></td>
        <td>uint32</td>
        <td>Utility item id</td>
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
        <td>item</td>
        <td>itemstat / pvpAmulet<sup>1</sup></td>
        <td>pet</td>
        <td>skill</td>
        <td>trait</td>
        <td>specialization</td>
    </tr>
</table>

<sup>1</sup> This entry is used for both PvE/WvW itemstat and PvP amulets.
Because these types are mutually exclusive, they do not conflict with each other.

##### Blocks
Every block is encoded as follows:

 Byte | Type  | Description
------|-------|-------------
 0    | uint8 | Block id
 1+   |       | Block data

- If the block data contains only zeroes (and no actual data), it is skipped in the serialized result to save space
- The block contains values that are stored with the least amount of bits required, and are saved in the given order of the array
  - If the value is an enum, the amount of bits required is taken from the maximum enum value possible (unless noted otherwise in the enums section above)
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
    <tr>
        <td rowspan="5"><code>skills</code> (22)</td>
        <td>0</td>
        <td><code>healing</code></td>
        <td>skill</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>utility1</code></td>
        <td>skill</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>utility2</code></td>
        <td>skill</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>utility3</code></td>
        <td>skill</td>
    </tr>
    <tr>
        <td>4</td>
        <td><code>elite</code></td>
        <td>skill</td>
    </tr>
    <tr>
        <td><code>professionGuardian</code> (31)</td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td rowspan="2"><code>professionRevenant</code> (32)</td>
        <td>0</td>
        <td><code>legendA</code></td>
        <td>legend (enum)</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>legendB</code></td>
        <td>legend (enum)</td>
    </tr>
    <tr>
        <td><code>professionWarrior</code> (33)</td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td><code>professionEngineer</code> (34)</td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td rowspan="4"><code>professionRanger</code> (35)</td>
        <td>0</td>
        <td><code>petA</code></td>
        <td>pet</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>petB</code></td>
        <td>pet</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>petAquaticA</code></td>
        <td>pet</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>petAquaticB</code></td>
        <td>pet</td>
    </tr>
    <tr>
        <td><code>professionThief</code> (36)</td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td rowspan="2"><code>professionElementalist</code> (37)</td>
        <td>0</td>
        <td><code>attunement</code></td>
        <td>attunement (enum)</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>prevAttunementWeaver</code></td>
        <td>attunement (enum)</td>
    </tr>
    <tr>
        <td><code>professionMesmer</code> (38)</td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td><code>professionNecromancer</code> (39)</td>
        <td colspan="3">Reserved</td>
    </tr>
    <tr>
        <td rowspan="39"><code>gearStats</code>(41)</td>
        <td>0</td>
        <td><code>weaponA1</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>weaponA2</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>weaponB1</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>weaponB2</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>4</td>
        <td><code>weaponAquaticA</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>5</td>
        <td><code>weaponAquaticB</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>6</td>
        <td><code>helm</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>7</td>
        <td><code>shoulders</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>8</td>
        <td><code>coat</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>9</td>
        <td><code>gloves</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>10</td>
        <td><code>leggings</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>11</td>
        <td><code>boots</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>12</td>
        <td><code>helmAquatic</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>13</td>
        <td><code>backpack</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>14</td>
        <td><code>accessory1</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>15</td>
        <td><code>accessory2</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>16</td>
        <td><code>amulet</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>17</td>
        <td><code>ring1</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td>18</td>
        <td><code>ring2</code></td>
        <td>itemstat</td>
    </tr>
    <tr>
        <td rowspan>19</td>
        <td><code>isAscendedDuplicatedFlag</code></td>
        <td>duplicateFlag</td>
    </tr>
    <tr>
        <td>20</td>
        <td><code>weaponA1IsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>21</td>
        <td><code>weaponA2IsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>22</td>
        <td><code>weaponB1IsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>23</td>
        <td><code>weaponB2IsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>24</td>
        <td><code>weaponAquaticAIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>25</td>
        <td><code>weaponAquaticBIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>26</td>
        <td><code>helmIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>27</td>
        <td><code>shouldersIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>28</td>
        <td><code>coatIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>29</td>
        <td><code>glovesIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>30</td>
        <td><code>leggingsIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>31</td>
        <td><code>bootsIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>32</td>
        <td><code>helmAquaticIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>33</td>
        <td><code>backpackIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>34</td>
        <td><code>accessory1IsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>35</td>
        <td><code>accessory2IsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>36</td>
        <td><code>amuletIsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>37</td>
        <td><code>ring1IsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td>38</td>
        <td><code>ring2IsAscended</code></td>
        <td>duplicateValue(bool)</td>
    </tr>
    <tr>
        <td rowspan="21"><code>gearUpgrades</code> (42)</td>
        <td>0</td>
        <td><code>weaponA1</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>weaponA2</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>weaponB1</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>weaponB2</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>4</td>
        <td><code>weaponAquaticA</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>5</td>
        <td><code>weaponAquaticB</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>6</td>
        <td><code>isArmorDuplicated</code></td>
        <td>duplicateFlag</td>
    </tr>
    <tr>
        <td>7</td>
        <td><code>helm</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>8</td>
        <td><code>shoulders</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>9</td>
        <td><code>coat</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>10</td>
        <td><code>gloves</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>11</td>
        <td><code>leggings</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>12</td>
        <td><code>boots</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>13</td>
        <td><code>helmAquatic</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>14</td>
        <td><code>isTrinketsDuplicated</code></td>
        <td>duplicateFlag</td>
    </tr>
    <tr>
        <td>15</td>
        <td><code>backpack</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>16</td>
        <td><code>accessory1</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>17</td>
        <td><code>accessory2</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>18</td>
        <td><code>amulet</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>19</td>
        <td><code>ring1</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>20</td>
        <td><code>ring2</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td rowspan="24"><code>gearInfusions</code> (43)</td>
        <td>0</td>
        <td><code>isInfusionsDuplicated</code></td>
        <td>duplicateFlag</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>weaponA1</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>weaponA2</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>weaponB1</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>4</td>
        <td><code>weaponB2</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>5</td>
        <td><code>weaponAquaticA</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>6</td>
        <td><code>weaponAquaticB</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>7</td>
        <td><code>helm</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>8</td>
        <td><code>shoulders</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>9</td>
        <td><code>coat</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>10</td>
        <td><code>gloves</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>11</td>
        <td><code>leggings</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>12</td>
        <td><code>boots</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>13</td>
        <td><code>helmAquatic</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>14</td>
        <td><code>backpack</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>14</td>
        <td><code>backpackInfused</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>16</td>
        <td><code>accessory1</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>17</td>
        <td><code>accessory2</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>18</td>
        <td><code>ring1</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>19</td>
        <td><code>ring1Infused</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>20</td>
        <td><code>ring1Attuned</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>21</td>
        <td><code>ring2</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>22</td>
        <td><code>ring2Infused</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td>23</td>
        <td><code>ring2Attuned</code></td>
        <td>duplicateValue(item)</td>
    </tr>
    <tr>
        <td rowspan="6"><code>gearPvp</code> (44)</td>
        <td>0</td>
        <td><code>amulet</code></td>
        <td>pvpAmulet</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>weaponA1Upgrade</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>2</td>
        <td><code>weaponA2Upgrade</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>3</td>
        <td><code>weaponB1Upgrade</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>4</td>
        <td><code>weaponB2Upgrade</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>5</td>
        <td><code>armorUpgrade</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td rowspan="2"><code>food</code></td> (45)
        <td>0</td>
        <td><code>food</code></td>
        <td>item</td>
    </tr>
    <tr>
        <td>1</td>
        <td><code>utility</code></td>
        <td>item</td>
    </tr>
</table>
