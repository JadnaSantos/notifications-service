import { Module } from "@nestjs/common/decorators";
import { NotificationsRepository } from "src/repositories/notifications-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaNotificationsRepository } from "./prisma/repositories/prisma-notification-repositry";

@Module({
    providers: [
        PrismaService,
        {
            provide: NotificationsRepository,
            useClass: PrismaNotificationsRepository
        }
    ],
    exports: [NotificationsRepository]
})


export class DatabaseModule { }

