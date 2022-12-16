import { inMemorynotificationRepository } from "@test/repositories/in-memory-notifications-respository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFoundError } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";


describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new inMemorynotificationRepository()
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification()

    await notificationRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id
    })

    expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
  })

  it('should be not able to cancel notification when it does not exist', async () => {
    const notificationRepository = new inMemorynotificationRepository()
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFoundError)

  })
})
