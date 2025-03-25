import { EventManager } from "./Module/EventManager";
import { GameData } from "./Module/GameData";

export function Initialize() {
	GameData.Initialize();
	EventManager.Initialize();
}