import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { Notification as RawNotification } from '@prisma/client'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recepientId: notification.recepientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt
    }
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification({
      category: raw.category,
      content: new Content(raw.content),
      recepientId: raw.recepientId,
      readAt: raw.readAt,
      canceledAt: raw.canceledAt,
      createdAt: raw.createdAt,
    }, raw.id)
  }
}
