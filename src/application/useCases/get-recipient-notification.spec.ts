import { inMemorynotificationRepository } from "../../../test/repositories/in-memory-notifications-respository";
import { makeNotification } from "@test/factories/notification-factory";
import { GetRecipientNotification } from "./get-recipient-notifications";


describe('Get Recipient Notification', () => {
  it('should be able to get recipient a notifications', async () => {
    const notificationRepository = new inMemorynotificationRepository()
    const getRecipientNotification = new GetRecipientNotification(notificationRepository);

    await notificationRepository.create(
      makeNotification({ recepientId: 'recepient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recepientId: 'recepient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recepientId: 'recepient-2' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recepientId: 'recepient-1',
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recepientId: 'recepient-1' }),
      expect.objectContaining({ recepientId: 'recepient-1' })
    ]))
  })

})
