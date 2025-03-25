import { ReplicatedStorage, RunService } from "@rbxts/services";

interface EventCallback {
	OnUseItem: { slot: number; };
}

// BindableEvent是异步不需要回调的事件，可以绑定多个事件
// BindableFunction是同步有回调的事件，只能绑定一个事件
export class EventManager {
	static EventContainer: Record<string, Instance> = {};
	static Initialize() {
		this.InitializeEvent("OnUseItem", "RemoteEvent");
	}
	static InitializeEvent<T extends keyof CreatableInstances>(eventName: string, instanceType: T) {
		if (RunService.IsServer()) {
			this.EventContainer[eventName] = new Instance(instanceType);
			this.EventContainer[eventName].Parent = ReplicatedStorage;
			this.EventContainer[eventName].Name = eventName;
		}
		if (RunService.IsClient()) {
			this.EventContainer[eventName] = ReplicatedStorage.WaitForChild(eventName) as CreatableInstances[T];
		}
	}
	/** 注册客户端发过来的事件 */
	static RegisterEvent<T extends keyof EventCallback>(eventName: T, callback: (player: Player, data: EventCallback[T]) => void) {
		const event = EventManager.GetEvent(eventName);
		if (RunService.IsServer()) {
			if (event.ClassName === "RemoteEvent") {
				(event as RemoteEvent).OnServerEvent.Connect(callback as (player: Player, ...args: Array<unknown>) => void);
			} else if (event.ClassName === "RemoteFunction") {
				(event as RemoteFunction).OnServerInvoke = callback as (player: Player, ...args: Array<unknown>) => void;
			}
		}
		if (RunService.IsClient()) {
			// if (event.ClassName === "RemoteEvent") {
			// 	(event as RemoteEvent).OnClientEvent.Connect(callback);
			// } else if (event.ClassName === "RemoteFunction") {
			// 	(event as RemoteFunction).OnClientInvoke = callback;
			// }
		}
	}
	static GetEvent<T extends keyof CreatableInstances>(eventName: string): CreatableInstances[T] {
		return this.EventContainer[eventName] as CreatableInstances[T];
	}
	/** 发送事件，只有端到端 */
	static InvokeEvent<K extends keyof EventCallback>(eventName: K, eventData: EventCallback[K]) {
		EventManager.GetEvent<"BindableFunction">(eventName).Invoke(eventData);
	}
	static FireEvent<K extends keyof EventCallback>(eventName: K, eventData: EventCallback[K]) {
		EventManager.GetEvent<"BindableEvent">(eventName).Fire(eventData);
	}
	/** 发送远程事件（客户端到服务器） */
	static InvokeServer<K extends keyof EventCallback>(eventName: K, eventData: EventCallback[K]) {
		EventManager.GetEvent<"RemoteFunction">(eventName).InvokeServer(eventData);
	}
	/** 发送远程事件（服务器到客户端） */
	static InvokeClient<K extends keyof EventCallback>(eventName: K, eventData: EventCallback[K]) {
		// EventManager.GetEvent(eventName, "RemoteFunction").InvokeClient(eventData);
	}
	/** 发送远程事件（客户端到服务器） */
	static FireServer<K extends keyof EventCallback>(eventName: K, eventData: EventCallback[K]) {
		EventManager.GetEvent<"RemoteEvent">(eventName).FireServer(eventData);
	}
	/** 发送远程事件（服务器到客户端） */
	static FireClient<K extends keyof EventCallback>(eventName: K, eventData: EventCallback[K]) {
		// EventManager.GetEvent<"RemoteEvent">(eventName).FireClient(eventData);
	}
	/** 发送远程事件（客户端到服务器） */
	static FireAllClients<K extends keyof EventCallback>(eventName: K, eventData: EventCallback[K]) {
		EventManager.GetEvent<"RemoteEvent">(eventName).FireAllClients(eventData);
	}
}