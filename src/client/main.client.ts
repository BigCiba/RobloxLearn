import { StarterGui } from "@rbxts/services";
import { GameInit } from "shared/GameInit";

GameInit();

print(StarterGui.WaitForChild("ScreenGui").WaitForChild("Inventory"));