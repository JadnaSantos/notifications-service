import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@application/useCases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notifications-view-model';
import { CancelNotification } from '@application/useCases/cancel-notification';
import { ReadNotification } from '@application/useCases/read-notification';
import { UnreadNotification } from '@application/useCases/unread-notification';
import { CountNotification } from '@application/useCases/count-notification';
import { GetRecipientNotification } from '@application/useCases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountNotification,
    private getNotifications: GetRecipientNotification

  ) { }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recepientId } = body;

    const { notification } = await this.sendNotification.execute({
      content, category, recepientId
    })

    return {
      notification: NotificationViewModel.toHttp(notification)
    }
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(
    @Param('id') id: string
  ) {
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unread(
    @Param('id') id: string
  ) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recepientId: string,
  ) {
    const { count } = await this.countRecipientNotification.execute({
      recepientId,
    });

    return {
      count
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recepientId: string,
  ) {
    const { notifications } = await this.getNotifications.execute({
      recepientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHttp)
    }
  }

}
