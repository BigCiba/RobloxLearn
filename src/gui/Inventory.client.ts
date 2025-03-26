import { UserInputService } from "@rbxts/services";
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

for (let i = 1; i < 9; i++) {
	const slot = prefabSlot.Clone();
	slot.Parent = prefabSlot.Parent;
	slot.LayoutOrder = i;
	slot.HotKey.Text = tostring(i);
	slot.Name = "Slot" + (i + 48);
	slotTable[Enum.KeyCode.Zero.Value + i] = slot;
	slot.Activated.Connect(() => {
		OnActive(slot);
	});
}

// 监听玩家输入并更新背包选择状态
UserInputService.InputBegan.Connect((input) => {
	if (input.KeyCode.Value >= Enum.KeyCode.Zero.Value && input.KeyCode.Value <= Enum.KeyCode.Nine.Value) {
		OnActive(slotTable[input.KeyCode.Value]);
	}
	if (input.UserInputType === Enum.UserInputType.MouseButton1 && currentSlot) {
		OnActive(currentSlot);
	}
});

// 临时代码，添加一个猪猪道具
// slotTable[Enum.KeyCode.One.Value].Image = "rbxassetid://133804548680200";
// slotTable[Enum.KeyCode.Two.Value].Image = "rbxassetid://11068929649";
// slotTable[Enum.KeyCode.Three.Value].Image = "rbxassetid://12298739827";

EventManager.RegisterClientEvent("OnInventoryChange", (data) => {
	const slot = slotTable[Enum.KeyCode.One.Value + data.slot];
	const itemData = GameData.GetItemData(data.itemName);
	slot.Image = itemData.Texture;
});