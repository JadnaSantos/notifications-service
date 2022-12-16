import { inMemorynotificationRepository } from "@test/repositories/in-memory-notifications-respository";
import { NotificationNotFoundError } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";
import { UnreadNotification } from "./unread-notification";


describe('Unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new inMemorynotificationRepository()
    const unreNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    })

    await notificationRepository.create(notification)

    await unreNotification.execute({
      notificationId: notification.id
    })

    expect(notificationRepository.notifications[0].readAt).toBeNull()
  })

  it('should be not able to unred notification when it does not exist', async () => {
    const notificationRepository = new inMemorynotificationRepository()
    const unreNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFoundError)

  })
})
