import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, KEYCLOAK_VALIDATION_SCHEMA } from './auth/auth.module';
import { CredentialsModule } from './credentials/credentials.module';
import { DB_VALIDATION_SCHEMA, DbModule } from './db/db.module';
import { KeysModule } from './keys/keys.module';
import { Oid4vcModule } from './oid4vc/oid4vc.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ...KEYCLOAK_VALIDATION_SCHEMA,
        ...DB_VALIDATION_SCHEMA,
      }),
    }),
    AuthModule,
    DbModule,
    KeysModule,
    CredentialsModule,
    Oid4vcModule,
  ],
})
export class AppModule {}