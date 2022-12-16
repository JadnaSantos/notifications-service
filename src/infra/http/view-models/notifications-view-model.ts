import { Notification } from "@application/entities/notification";

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recepientId: notification.recepientId
    }
  }
}
