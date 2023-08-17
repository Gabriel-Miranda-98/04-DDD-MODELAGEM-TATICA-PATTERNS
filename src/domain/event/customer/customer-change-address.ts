import { EventInterface } from '../@shared/event.interface'

export class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccurred: Date
  eventData: any
  constructor(eventData: any) {
    this.dataTimeOccurred = new Date()
    this.eventData = eventData
  }
}