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
- `specializationIds` (array)  
  Contains all valid specialization ids for the current `profession`.
- `specializations` (array)  
  Contains all valid specialization objects for the current `profession`.
  See GW2 API `/v2/specializations` for the object format.
- `activeSpecializations` (array)  
  Contains all selected specialization ids for the current build.
  Indexed from 0 to 2, where 0 is the first selected specialization.
