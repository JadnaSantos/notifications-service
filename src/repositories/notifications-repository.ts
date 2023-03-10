import { Notification } from '@application/entities/notification'

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>
  abstract save(notification: Notification): Promise<void>
  abstract countManyByRecipientId(recepientId: string): Promise<number>
  abstract findManyRecipientById(recepientId: string): Promise<Notification[]>
}
