import { EventDispatcher } from '../../../@shared/event/event-dispatcher'
import { CustomerEvent } from '../customer.event'
import { CustomerCreatedHandler } from './customer-created-handler'

describe('CustomerCreatedHandler Tests', () => {
  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new CustomerCreatedHandler()
    const spyEventHandler = vi.spyOn(eventHandler, 'handle')
    eventDispatcher.register('CustomerEvent', eventHandler)
    expect(eventDispatcher.getEventHandlers.CustomerEvent[0]).toMatchObject(
      eventHandler,
    )
    const costumerCreatedEvent1 = new CustomerEvent({
      message: 'Esse é o primeiro console log do evento: CustomerCreated',
    })

    eventDispatcher.notify(costumerCreatedEvent1)

    expect(spyEventHandler).toHaveBeenCalledWith(costumerCreatedEvent1)
    const costumerCreatedEvent2 = new CustomerEvent({
      message: 'Esse é o segundo console.log do evento: CustomerCreated',
    })
    eventDispatcher.notify(costumerCreatedEvent2)

    expect(spyEventHandler).toHaveBeenCalledWith(costumerCreatedEvent2)
  })
})
