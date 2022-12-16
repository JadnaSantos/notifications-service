import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../../repositories/notifications-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found";

interface UnreadNotificationRequest {
  notificationId: string
}

type UnReadNotificationResponse = void

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) { }

  async execute(request: UnreadNotificationRequest): Promise<UnReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundError
    }

    notification.unread()

    await this.notificationsRepository.save(notification)
  }
}
