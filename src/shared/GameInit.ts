import { Players, RunService } from "@rbxts/services";
import { CBaseUnit } from "./Class/CBaseUnit";
import { GameData } from "./Module/GameData";


export function GameInit() {
	if (RunService.IsServer()) {
		print("GameInit Server");
	} else if (RunService.IsClient()) {
		print("GameInit Client");
	}
	GameData.Init();
}
if (RunService.IsServer()) {
	const playerList: Record<number, CBaseUnit> = {};
	Players.PlayerAdded.Connect((player) => {
		player.CharacterAdded.Connect((character) => {
			const humanoid = character.WaitForChild("Humanoid") as Humanoid;
			if (humanoid) {
				const unit = new CBaseUnit(humanoid);
				playerList[player.UserId] = unit;
				unit.AddItemByName("Spring");
				const zhuzhu = unit.AddItemByName("ZhuZhu");
				zhuzhu.OnSpellStart();
			}
		});
	});
	Players.PlayerRemoving.Connect((player) => {
		playerList[player.UserId].dispose();
		delete playerList[player.UserId];
	});
} 