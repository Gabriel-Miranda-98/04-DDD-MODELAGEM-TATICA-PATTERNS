import { Address } from '../../value-object/address'
import { EventDispatcher } from '../../../@shared/event/event-dispatcher'
import { CustomerChangeAddressEvent } from '../customer-change-address'
import { CustomerChangeAddressHandler } from './customer-change-address-handler'
import { Customer } from '../../entities/customer'

describe('CustomerChangeAddressHandler Tests', () => {
  it('should notify event change address handler', () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new CustomerChangeAddressHandler()
    const spyEventHandler = vi.spyOn(eventHandler, 'handle')
    eventDispatcher.register('CustomerChangeAddressEvent', eventHandler)
    expect(
      eventDispatcher.getEventHandlers.CustomerChangeAddressEvent[0],
    ).toMatchObject(eventHandler)
    const costumer = new Customer('customer 1', 'john doe')
    const address = new Address(
      'Street Address',
      123,
      '3028738',
      'Minas Gerais',
    )
    costumer.changeAddress(address)
    const costumerChangeAddress = new CustomerChangeAddressEvent({
      mensagem: `Endereço do cliente: ${costumer.id} foi alterado para ${costumer.address}`,
    })

    eventDispatcher.notify(costumerChangeAddress)
    expect(spyEventHandler).toHaveBeenCalledWith(costumerChangeAddress)
  })
})
