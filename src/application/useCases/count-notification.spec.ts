import { inMemorynotificationRepository } from "../../../test/repositories/in-memory-notifications-respository";
import { CountNotification } from "./count-notification";
import { makeNotification } from "@test/factories/notification-factory";


describe('Count Notification', () => {
  it('should be able to count a notifications', async () => {
    const notificationRepository = new inMemorynotificationRepository()
    const countNotification = new CountNotification(notificationRepository);

    await notificationRepository.create(
      makeNotification({ recepientId: 'recepient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recepientId: 'recepient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recepientId: 'recepient-2' }),
    );

    const { count } = await countNotification.execute({
      recepientId: 'recepient-1',
    })

    expect(count).toEqual(2)
  })

})
