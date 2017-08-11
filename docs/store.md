# Store
The store from `redux` contains the app state that is used globally in various places like `./selectors` and `./containers`.

## General
- `selectedLanguage` (string)  
  Options: *en*, *de*, *fr*, *es*.
- `selectedGameMode` (string)  
  Options: *pve*, *pvp*, *wvw*.
- `selectedProfession` (string)  
  Options: *Guardian*, *Revenant*, *Warrior*, *Engineer*, *Ranger*, *Thief*, *Elementalist*, *Mesmer*, *Necromancer*.
- `selectedRace` (string)  
  Options: *none*, *Asura*, *Charr*, *Human*, *Norn*, *Sylvari*.

## Skills
### Skills
- `availableSkillIds` (array)  
  Contains all valid skill ids for the current `profession`.
- `availableSkillObjects` (object, indexed by `skill.id`)  
  Contains all valid skill objects for the current `profession`.  
  See GW2 API `/v2/skills` for the object format.

### Weapons
- `activeWeaponSet` (integer)  
  Contains the currently selected weapon set.
  Indexed from 0 to 3, where 0 is the first weapon set, 1 is the second weapon set, 2 is the first aquatic weapon set and 3 is the second aquatic weapon set.
- `availableWeaponObjects` (object, indexed by `weapon.id`)  
  Contains the available weapons for the current `profession`.  
  See GW2 API `/v2/profession.weapons` for the object format.
- `selectedMainhandWeaponIds` (array)  
  Contains the selected mainhand weapon ids (strings), indexed by weapon set.
- `selectedOffhandWeaponIds` (array)  
  Contains the selected offhand weapon ids (strings), indexed by weapon set.

### Mechanic
- `activeAttunements` (array)  
  Contains the active attunements, indexed by weapon set.
- `attunements` (object)  
  Contains the available attunements.

## Specializations
### Specializations
- `availableSpecializationIds` (array)  
  Contains all valid specialization ids for the current `profession`.
- `availableSpecializationObjects` (object, indexed by `specialization.id`)  
  Contains all valid specialization objects for the current `profession`.
  See GW2 API `/v2/specializations` for the object format.
- `selectedSpecializationIds` (array)  
  Contains all selected specialization ids for the current build.
  Indexed from 0 to 2, where 0 is the first selected specialization.

### Traits
- `availableTraitIds` (array)  
  Contains all valid trait ids for the current `profession` (both minor and major traits).
- `availableTraitsObjects` (object, indexed by `trait.id`)  
  Contains all valid trait objects for the current `profession` (both minor and major traits). See GW2 API `/v2/traits`
  for the object format.
- `selectedMinorTraitIds` (array)  
  Contains all selected *minor* trait ids for the current build.
  Indexed from 0 to 8, where 0 is the tier 1 trait from the first selected specialization,
  and 8 is the tier 3 trait from the last selected specialization.
  An element can be `null` or `undefined` if there is no selection for that slot.  
- `selectedMajorTraitIds` (array)  
  Contains all selected *major* trait ids for the current build.
  Indexed from 0 to 8, where 0 is the selected tier 1 trait from the first selected specialization,
  and 8 is the selected tier 3 trait from the last selected specialization.
  An element can be `null` or `undefined` if there is no selection for that slot.
