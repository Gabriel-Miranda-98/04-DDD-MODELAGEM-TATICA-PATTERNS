import { EventHandlerInterface } from '../../@shared/event-handler.interface'
import { CustomerEvent } from '../customer.event'

export class CustomerCreatedHandler
  implements EventHandlerInterface<CustomerEvent>
{
  handle(event: CustomerEvent): void {
    console.log(event.eventData)
  }
}
