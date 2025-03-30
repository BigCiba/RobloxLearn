import { ServerStorage, StarterGui, UserInputService } from "@rbxts/services";
import { EventManager } from "shared/Module/EventManager";
import { GameData } from "shared/Module/GameData";

let startGui = script.Parent?.Parent as StarterGui;
const prefabSlot = startGui.ScreenGui.Inventory.PrefabSlot;
prefabSlot.Name = "Slot48";
prefabSlot.Activated.Connect(() => {
	OnActive(prefabSlot);
});
// 当前槽位
let currentSlot: typeof prefabSlot;
// 存背包组件方便后续使用
let slotTable: Record<number, typeof prefabSlot> = { [Enum.KeyCode.Zero.Value]: prefabSlot };

function OnActive(slot: typeof prefabSlot) {
	if (currentSlot === slot) {
		// 卸下
		// FireEvent("inventory_change", {slot});
		EventManager.FireServer("OnUseItem", { slot: slot.LayoutOrder });
	} else {
		for (const [k, v] of pairs(slotTable)) {
			v.UIStroke.Thickness = 0;
		}
		currentSlot = slot;
		currentSlot.UIStroke.Thickness = 4;
		EventManager.FireServer("OnEquipStateChange", { slot: slot.LayoutOrder, itemName: slot.Name, state: true });
	}
}

for (let i = 0; i < 9; i++) {
	const slot = prefabSlot.Clone();
	slot.Parent = prefabSlot.Parent;
	slot.LayoutOrder = i;
	slot.HotKey.Text = tostring(i + 1);
	slot.Name = "Slot" + i;
	slotTable[i] = slot;
	slot.Activated.Connect(() => {
		OnActive(slot);
	});
}

function GetSlotIndexWithKeyCode(KeyCodeValue: number) {
	if (KeyCodeValue === Enum.KeyCode.Zero.Value) {
		return 9;
	}
	return KeyCodeValue - Enum.KeyCode.One.Value;
}

// 监听玩家输入并更新背包选择状态
UserInputService.InputBegan.Connect((input) => {
	if (input.KeyCode.Value >= Enum.KeyCode.Zero.Value && input.KeyCode.Value <= Enum.KeyCode.Nine.Value) {
		OnActive((slotTable[GetSlotIndexWithKeyCode(input.KeyCode.Value)]));
	}
	if (input.UserInputType === Enum.UserInputType.MouseButton1 && currentSlot) {
		OnActive(currentSlot);
	}
});

EventManager.RegisterClientEvent("OnInventoryChange", (data) => {
	const slot = slotTable[data.slot];
	const itemData = GameData.GetItemData(data.itemName);
	slot.Image = itemData.Texture;
});
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.Backpack, false);