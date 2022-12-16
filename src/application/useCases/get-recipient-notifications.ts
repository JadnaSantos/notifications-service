import { Notification } from "@application/entities/notification";
import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../../repositories/notifications-repository";

interface GetRecipientficationRequest {
  recepientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) { }

  async execute(request: GetRecipientficationRequest): Promise<GetRecipientNotificationResponse> {
    const { recepientId } = request;

    const notifications = await this.notificationsRepository.findManyRecipientById(recepientId);

    return {
      notifications
    }
  }
}
