import { Module } from "@nestjs/common";
import { SendNotification } from "@application/useCases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";
import { CancelNotification } from "@application/useCases/cancel-notification";
import { ReadNotification } from "@application/useCases/read-notification";
import { UnreadNotification } from "@application/useCases/unread-notification";
import { CountNotification } from "@application/useCases/count-notification";
import { GetRecipientNotification } from "@application/useCases/get-recipient-notifications";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountNotification,
    GetRecipientNotification
  ]
})

export class HttpModule { }
