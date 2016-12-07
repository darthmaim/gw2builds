# Store
The store from `redux` contains the app state that is used globally in various places like `./selectors` and `./containers`.

## General
- `language` (string)  
  Options: *en*, *de*, *fr*, *es*.
- `gameMode` (string)  
  Options: *pve*, *pvp*, *wvw*.
- `profession` (string)  
  Options: *guardian*, *revenant*, *warrior*, *engineer*, *ranger*, *thief*, *elementalist*, *mesmer*, *necromancer*.
- `race` (string)  
  Options: *none*, *asura*, *charr*, *human*, *norn*, *sylvari*.

## Specializations
### Specializations
- `specializationIds` (array)  
  Contains all valid specialization ids for the current `profession`.
- `specializations` (object, indexed by specialization id)  
  Contains all valid specialization objects for the current `profession`.
  See GW2 API `/v2/specializations` for the object format.
- `activeSpecializations` (array)  
  Contains all selected specialization ids for the current build.
  Indexed from 0 to 2, where 0 is the first selected specialization.

### Traits
- `traitIds` (array)  
  Contains all valid trait ids for the current `profession` (both minor and major traits).
- `traits` (object, indexed by trait id)  
  Contains all valid trait objects for the current `profession` (both minor and major traits). See GW2 API `/v2/traits`
  for the object format.
- `activeMinorTraits` (array)  
  Contains all selected *minor* trait ids for the current build.
  Indexed from 0 to 8, where 0 is the tier 1 trait from the first selected specialization,
  and 8 is the tier 3 trait from the last selected specialization.
  An element can be `null` or `undefined` if there is no selection for that slot.  
- `activeMajorTraits` (array)  
  Contains all selected *major* trait ids for the current build.
  Indexed from 0 to 8, where 0 is the selected tier 1 trait from the first selected specialization,
  and 8 is the selected tier 3 trait from the last selected specialization.
  An element can be `null` or `undefined` if there is no selection for that slot.
