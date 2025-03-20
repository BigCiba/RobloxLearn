interface EventCallback {

}
export class EventManager {
	static EventInstance: Record<string, BindableFunction> = {};
	static Initialize() {

	}
	static RegisterEvent(eventName: string, callback: (...args: any[]) => void) {
		const event = new Instance("BindableEvent");
		event.Name = eventName;
		event.Event.Connect(callback);
		return event;
	}
	static FireServerEvent<K extends keyof EventCallback>(eventName: K, eventData: EventCallback[K]) {
		const event = this.EventInstance[eventName] ?? new Instance("BindableFunction");
		if (event) {
			event.Invoke(eventData);
		}
	}
	static FireClientEvent<K extends keyof EventCallback>(eventName: K, eventData: EventCallback[K]) {
		const event = this.EventInstance[eventName] ?? new Instance("BindableFunction");
		if (event) {
			event.Invoke(eventData);
		}
	}
	static FireEvent<K extends keyof EventCallback>(eventName: K, eventData: EventCallback[K]) {
		const event = this.EventInstance[eventName] ?? new Instance("RemoteFunction");
		if (event) {
			event.Invoke(eventData);
		}
	}
}