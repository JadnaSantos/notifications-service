import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../../repositories/notifications-repository";
import { NotificationNotFoundError } from "./errors/notification-not-found";

interface CountNotificationRequest {
  recepientId: string;
}

interface CountNotificationResponse {
  count: number;
}

@Injectable()
export class CountNotification {
  constructor(private notificationsRepository: NotificationsRepository) { }

  async execute(request: CountNotificationRequest): Promise<CountNotificationResponse> {
    const { recepientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(recepientId);

    return {
      count
    }
  }
}
