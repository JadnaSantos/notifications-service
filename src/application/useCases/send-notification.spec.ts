import { inMemorynotificationRepository } from "../../../test/repositories/in-memory-notifications-respository";
import { SendNotification } from "./send-notification"


describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new inMemorynotificationRepository()
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      recepientId: 'social-exemple',
      category: 'social',
      content: 'This is a notification'
    })

    expect(notificationRepository.notifications).toHaveLength(1)
    expect(notificationRepository.notifications[0]).toEqual(notification)
  })
})
