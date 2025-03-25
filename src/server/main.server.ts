import { Players } from "@rbxts/services";
import { CBaseUnit } from "shared/Class/CBaseUnit";
import { Initialize } from "shared/Game";
import { EventManager } from "shared/Module/EventManager";

Initialize();

const playerList: Record<number, CBaseUnit> = {};
Players.PlayerAdded.Connect((player) => {
	player.CharacterAdded.Connect((character) => {
		const humanoid = character.WaitForChild("Humanoid") as Humanoid;
		if (humanoid) {
			const unit = new CBaseUnit(humanoid);
			playerList[player.UserId] = unit;
			// unit.AddItemByName("Spring");
			const zhuzhu = unit.AddItemByName("ZhuZhu");
			zhuzhu?.OnSpellStart();
		}
	});
});
Players.PlayerRemoving.Connect((player) => {
	playerList[player.UserId].dispose();
	delete playerList[player.UserId];
});

EventManager.RegisterEvent("OnUseItem", (player, data) => {
	for (const [k, v] of pairs(data)) {
		print(player, k, v);
	}
});