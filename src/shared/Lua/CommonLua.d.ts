import { CBaseAbility } from "shared/Class/CBaseAbility";
import { CBaseItem } from "shared/Class/CBaseItem";
import { CBaseUnit } from "shared/Class/CBaseUnit";

declare function AddAbility(humanoid: CBaseUnit, abilityName: string): CBaseAbility;
declare function AddItem(humanoid: CBaseUnit, itemName: string): CBaseItem;