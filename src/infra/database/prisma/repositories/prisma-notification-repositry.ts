import { Injectable } from "@nestjs/common/decorators";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "../../../../repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "../mappers/prisma-notification-mapper";


@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) { }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    })

    if (!notification) { return null; }

    return PrismaNotificationMapper.toDomain(notification)
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prisma.notification.create({
      data: raw
    })
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },

      data: raw
    })
  }


  async countManyByRecipientId(recepientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recepientId }
    })

    return count
  }


  async findManyRecipientById(recepientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recepientId },
    })

    return notifications.map(PrismaNotificationMapper.toDomain)
  }


}
