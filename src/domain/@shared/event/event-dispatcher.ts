import { EventDispatcherInterface } from './event-dispatcher.interface'
import { EventHandlerInterface } from './event-handler.interface'
import { EventInterface } from './event.interface'

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: {
    [eventName: string]: EventHandlerInterface<EventInterface>[]
  } = {}

  get getEventHandlers() {
    return this.eventHandlers
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name
    if (!this.eventHandlers[eventName]) {
      return
    }
    this.eventHandlers[eventName].forEach((eventHandler) =>
      eventHandler.handle(event),
    )
  }

  register(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>,
  ): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>,
  ): void {
    if (!this.eventHandlers[eventName]) {
      return
    }
    const index = this.eventHandlers[eventName].findIndex(
      (handler) => handler === eventHandler,
    )
    this.eventHandlers[eventName].splice(index, 1)
  }

  unregisterAll(): void {
    this.eventHandlers = {}
  }
}
