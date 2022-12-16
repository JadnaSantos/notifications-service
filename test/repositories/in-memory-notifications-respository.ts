import { Notification } from "../../src/application/entities/notification"
import { NotificationsRepository } from "src/repositories/notifications-repository"


export class inMemorynotificationRepository implements NotificationsRepository {

  public notifications: Notification[] = []

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.notifications.find(item => item.id === notificationId)

    if (!notification) {
      return null;
    }

    return notification;
  }

  async create(notification: Notification) {
    this.notifications.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = await this.notifications.findIndex(item => item.id === notification.id)

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async countManyByRecipientId(recepientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recepientId === recepientId,
    ).length;
  }

  async findManyRecipientById(recepientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recepientId === recepientId,
    )
  }

}
