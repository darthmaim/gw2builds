# Store
The store from `redux` contains the app state that is used globally in various places like `./selectors` and `./containers`.

The types in the tables below are written with a specific format.
In case of an array, the element type is indicated between brackets.
In case of an object, the element type is indicated as the first item between the brackets, while the indexer property is indicated as the second item between the brackets.
Sometimes the type is represented as a GW2 API endpoint.

## General
<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>selectedLanguage</code></td>
        <td>string</td>
        <td>
            Selected language.<br>
            Options: <em>en</em>, <em>de</em>, <em>fr</em>, <em>es</em>
        </td>
    </tr>
    <tr>
        <td><code>selectedGameMode</code></td>
        <td>string</td>
        <td>
            Selected game mode.<br>
            Options: <em>pve</em>, <em>pvp</em>, <em>wvw</em>
        </td>
    </tr>
    <tr>
        <td><code>selectedProfession</code></td>
        <td>string</td>
        <td>
            Selected profession.<br>
            Options:
            <em>Guardian</em>,
            <em>Revenant</em>,
            <em>Warrior</em>,
            <em>Engineer</em>,
            <em>Ranger</em>,
            <em>Thief</em>,
            <em>Elementalist</em>,
            <em>Mesmer</em>,
            <em>Necromancer</em>
        </td>
    </tr>
    <tr>
        <td><code>selectedRace</code></td>
        <td>string</td>
        <td>
            Selected race.<br>
            Options:
            <em>none</em>,
            <em>Asura</em>,
            <em>Charr</em>,
            <em>Human</em>,
            <em>Norn</em>,
            <em>Sylvari</em>
        </td>
    </tr>
    <tr>
        <td><code>isLoading</code></td>
        <td>bool</td>
        <td>
            Shows/Hides the loading indicator at the top of the page.
        </td>
    </tr>
</table>

## Import Dialog
<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>importDialogVisible</code></td>
        <td>bool</td>
        <td>
            Import dialog visibility.<br>
        </td>
    </tr>
    <tr>
        <td><code>importApiKeys</code></td>
        <td>array (string)</td>
        <td>
            API keys in the import dialog.<br>
        </td>
    </tr>
</table>

## Gear
### Armor
This category contains the following local types:

<table>
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>armorArray</td>
        <td>
            Array for armor with indexers.<br>
            [0] = helm<br>
            [1] = shoulders<br>
            [2] = coat<br>
            [3] = gloves<br>
            [4] = leggings<br>
            [5] = boots<br>
            [6] = aquatic helm
        </td>
    </tr>
</table>

<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>selectedArmorIsAscended</code></td>
        <td>armorArray (bool)</td>
        <td>Selected armor ascended flags.</td>
    </tr>
    <tr>
        <td><code>selectedArmorItemstatIds</code></td>
        <td>armorArray (<code>/v2/itemstats.id</code>)</td>
        <td>Selected armor itemstat ids.</td>
    </tr>
    <tr>
        <td><code>selectedArmorUpgradeIds</code></td>
        <td>armorArray (<code>/v2/items.id</code>)</td>
        <td>Selected armor upgrade ids.</td>
    </tr>
    <tr>
        <td><code>selectedArmorInfusionIds</code></td>
        <td>armorArray (<code>/v2/items.id</code>)</td>
        <td>Selected armor infusion ids.</td>
    </tr>
    <tr>
        <td><code>selectedPvpAmuletId</code></td>
        <td><code>/v2/pvp/amulets.id</code></td>
        <td>Selected PvP amulet id.</td>
    </tr>
    <tr>
        <td><code>selectedPvpArmorUpgradeId</code></td>
        <td><code>/v2/items.id</code></td>
        <td>Selected PvP armor upgrade id.</td>
    </tr>
</table>

### Trinkets
This category contains the following local types:

<table>
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>trinketsArray</td>
        <td>
            Array for trinkets with indexers.<br>
            [0] = backpack<br>
            [1] = first accessory<br>
            [2] = second accessory<br>
            [3] = amulet<br>
            [4] = first ring<br>
            [5] = second ring
        </td>
    </tr>
</table>

<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>selectedTrinketIsAscended</code></td>
        <td>trinketsArray (bool)</td>
        <td>Selected trinket ascended flags.</td>
    </tr>
    <tr>
        <td><code>selectedTrinketItemstatIds</code></td>
        <td>trinketsArray (<code>/v2/itemstats.id</code>)</td>
        <td>Selected trinket itemstat ids.</td>
    </tr>
    <tr>
        <td><code>selectedTrinketUpgradeIds</code></td>
        <td>trinketsArray (<code>/v2/items.id</code>)</td>
        <td>Selected trinket upgrade ids.</td>
    </tr>
    <tr>
        <td><code>selectedTrinketInfusionIds</code></td>
        <td>array (<code>/v2/items.id</code>)</td>
        <td>
            Selected trinket infusion ids.<br>
            [0] = backpack<br>
            [1] = first accessory<br>
            [2] = second accessory<br>
            [4] = first ring<br>
            [5] = second ring<br>
            [6] = backpack (2)<br>
            [7] = first ring (2)<br>
            [8] = first ring (3)<br>
            [9] = second ring (2)<br>
            [10] = second ring (3)
        </td>
    </tr>
</table>

### Weapons
This category contains the following local types:

<table>
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>mainhandWeaponArray</td>
        <td>
            Array for main-hand weapons with weapon set indexers.<br>
            [0] = first weapon set<br>
            [1] = second weapon set<br>
            [2] = first aquatic weapon set<br>
            [3] = second aquatic weapon set
        </td>
    </tr>
    <tr>
        <td>offhandWeaponArray</td>
        <td>
            Array for off-hand weapons with weapon set indexers.<br>
            [0] = first weapon set<br>
            [1] = second weapon set
        </td>
     </tr>
</table>

<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>activeWeaponSet</code>
        <td>integer</td>
        <td>
            Active weapon set.<br>
            0 = first weapon set<br>
            1 = second weapon set<br>
            2 = first aquatic weapon set<br>
            3 = second aquatic weapon set
        </td>
    </tr>
    <tr>
        <td><code>availableWeaponObjects</code>
        <td>object (<code>/v2/profession.weapons</code>, inherited)</td>
        <td>Available weapon objects for the selected profession.</td>
    </tr>
    <tr>
        <td><code>selectedMainhandWeaponIds</code>
        <td>mainhandWeaponArray (string)</td>
        <td>Selected main-hand weapon ids.</td>
    </tr>
    <tr>
        <td><code>selectedMainhandWeaponIsAscended</code></td>
        <td>mainhandWeaponArray (bool)</td>
        <td>Selected main-hand weapon ascended flags.</td>
    </tr>
    <tr>
        <td><code>selectedMainhandWeaponItemstatIds</code></td>
        <td>mainhandWeaponArray (<code>/v2/itemstats.id</code>)</td>
        <td>Selected main-hand weapon itemstat ids.</td>
    </tr>
    <tr>
        <td><code>selectedMainhandWeaponUpgradeIds</code></td>
        <td>mainhandWeaponArray (<code>/v2/items.id</code>)</td>
        <td>Selected main-hand weapon upgrade ids.</td>
    </tr>
    <tr>
        <td><code>selectedMainhandWeaponInfusionIds</code></td>
        <td>mainhandWeaponArray (<code>/v2/items.id</code>)</td>
        <td>Selected main-hand weapon infusion ids.</td>
    </tr>
    <tr>
        <td><code>selectedOffhandWeaponIds</code>
        <td>offhandWeaponArray (string)</td>
        <td>Selected off-hand weapon ids.</td>
    </tr>
    <tr>
        <td><code>selectedOffhandWeaponIsAscended</code></td>
        <td>offhandWeaponArray (bool)</td>
        <td>Selected off-hand weapon ascended flags.</td>
    </tr>
    <tr>
        <td><code>selectedOffhandWeaponItemstatIds</code></td>
        <td>offhandWeaponArray (<code>/v2/itemstats.id</code>)</td>
        <td>Selected off-hand weapon itemstat ids.</td>
    </tr>
    <tr>
        <td><code>selectedOffhandWeaponUpgradeIds</code></td>
        <td>offhandWeaponArray (<code>/v2/items.id</code>)</td>
        <td>Selected off-hand weapon upgrade ids.</td>
    </tr>
    <tr>
        <td><code>selectedOffhandWeaponInfusionIds</code></td>
        <td>offhandWeaponArray (<code>/v2/items.id</code>)</td>
        <td>Selected off-hand weapon infusion ids.</td>
    </tr>
</table>

## Food
<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>selectedFoodIds</code></td>
        <td>array (<code>/v2/items.id</code>)</td>
        <td>
            Selected food ids.<br>
            [0] = food<br>
            [1] = utility
        </td>
    </tr>
</table>
    

## Mechanics
<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>availableElementalistAttunementObjects</code></td>
        <td>object (string, <code>attunement.id</code>)</td>
        <td>Available elementalist attunement objects.</td>
    </tr>
    <tr>
        <td><code>availableEngineerToolbeltSkillIds</code></td>
        <td>array (<code>/v2/skills.id</code>)</td>
        <td>Available skill ids for engineer toolbelt skills.</td>
    </tr>
    <tr>
        <td><code>selectedRevenantLegendIds</code></td>
        <td>array (string)</td>
        <td>
            Selected revenant legend ids.<br>
            [0] = first legend<br>
            [1] = second legend<br>
            Options: <em>Assassin</em>, <em>Demon</em>, <em>Dwarf</em>, <em>Centaur</em>, <em>Dragon</em>, <em>Renegade</em>
       </td>
    </tr>
    <tr>
        <td><code>selectedRangerPetIds</code></td>
        <td>array (<code>/v2/pets.id</code>)</td>
        <td>
            Selected ranger pet ids.<br>
            [0] = first terrestrial pet<br>
            [1] = second terrestial pet<br>
            [2] = first aquatic pet<br>
            [3] = second aquatic pet
        </td>
    </tr>
    <tr>
        <td><code>selectedElementalistAttunementId</code></td>
        <td>string</td>
        <td>
            Selected elementalist attunement id.<br>
            Options: <em>Fire</em>, <em>Water</em>, <em>Air</em>, <em>Earth</em>
        </td>
    </tr>
    <tr>
        <td><code>selectedWeaverPreviousAttunementId</code></td>
        <td>string</td>
        <td>
            Selected weaver previous attunement id.<br>
            Options: <em>Fire</em>, <em>Water</em>, <em>Air</em>, <em>Earth</em>
        </td>
    </tr>
</table>

## Skills
<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>availableProfessionSkillObjects</code></td>
        <td>array (<code>/v2/professions.skills</code>)</td>
        <td>Available profession skill objects for the selected profession.</td>
    </tr>
    <tr>
        <td><code>availableSkillIds</code></td>
        <td>array (<code>/v2/skills.id</code>)</td>
        <td>Available skill ids for the selected profession.</td>
    </tr>
    <tr>
        <td><code>availableSkillObjects</code></td>
        <td>object (<code>/v2/skills</code>, <code>id</code>)</td>
        <td>Available skill objects for the selected profession.</td>
    </tr>
    <tr>
        <td><code>selectedSkillIds</code></td>
        <td>array (<code>/v2/skills.id</code>)</td>
        <td>
            Selected skill ids.<br>
            [0] = healing<br>
            [1] = first utility<br>
            [2] = second utility<br>
            [3] = third utility<br>
            [4] = elite
        </td>
    </tr>
</table>

## Specializations
<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>availableSpecializationIds</code>
        <td>array (<code>/v2/specializations.id</code>)</td>
        <td>Available specialization ids for the selected profession.</td>
    </tr>
    <tr>
        <td><code>availableSpecializationObjects</code>
        <td>object (<code>/v2/specializations</code>, <code>id</code>)</td>
        <td>Available specialization objects for the selected profession.</td>
    </tr>
    <tr>
        <td><code>selectedSpecializationIds</code>
        <td>array (<code>/v2/specializations.id</code>)</td>
        <td>
            Selected specialization ids.<br>
            [0] = first specialization<br>
            [1] = second specialization<br>
            [2] = third specialization<br>
        </td>
    </tr>
</table>

## Traits
This category contains the following local types:

<table>
    <tr>
        <th>Name</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>traitArray</td>
        <td>
            Array for traits with indexers.<br>
            [0] = adept trait of first specialization<br>
            [1] = master trait of first specialization<br>
            [2] = grandmaster trait of first specialization<br>
            [3] = adept trait of second specialization<br>
            [4] = master trait of second specialization<br>
            [5] = grandmaster trait of second specialization<br>
            [6] = adept trait of third specialization<br>
            [7] = master trait of third specialization<br>
            [8] = grandmaster trait of third specialization
        </td>
    </tr>
</table>

<table>
    <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code>availableTraitIds</code>
        <td>array (<code>/v2/traits.id</code>)</td>
        <td>Available trait ids for the selected profession.</td>
    </tr>
    <tr>
        <td><code>availableTraitsObjects</code>
        <td>object (<code>/v2/traits</code>, <code>id</code>)</td>
        <td>Available trait objects for the selected profession.</td>
    </tr>
    <tr>
        <td><code>selectedMajorTraitIds</code>
        <td>traitArray (<code>/v2/traits.id</code>)</td>
        <td>Selected <strong>major</strong> trait ids.</td>
    </tr>
</table>
