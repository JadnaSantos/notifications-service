import { inMemorynotificationRepository } from "@test/repositories/in-memory-notifications-respository";
import { NotificationNotFoundError } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";
import { ReadNotification } from "./read-notification";


describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new inMemorynotificationRepository()
    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification()

    await notificationRepository.create(notification)

    await readNotification.execute({
      notificationId: notification.id
    })

    expect(notificationRepository.notifications[0].readAt).toEqual(expect.any(Date))
  })

  it('should be not able to red notification when it does not exist', async () => {
    const notificationRepository = new inMemorynotificationRepository()
    const readNotification = new ReadNotification(notificationRepository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFoundError)

  })
})
