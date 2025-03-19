export class EventManager {
	static Initialize() {

	}
	static RegisterEvent(eventName: string, callback: (...args: any[]) => void) {
		const event = new Instance("BindableEvent");
		event.Name = eventName;
		event.Event.Connect(callback);
		return event;
	}
}