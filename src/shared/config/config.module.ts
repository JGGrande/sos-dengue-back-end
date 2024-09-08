import { Module } from "@nestjs/common";
import {
  ConfigModule as NestConfigModule,
  ConfigModuleOptions
} from "@nestjs/config";
import { join } from "path";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum([
      "production",
      "homologacao",
      "dev",
      "test"
    ])
    .default("dev"),
  TZ: z.string().default("UTC"),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  PASSWORD_SALT: z.coerce.number(),
  VERIFY_EMAIL_TOKEN_SECRET: z.string(),
  VERIFY_EMAIL_TOKEN_EXPIRES_IN: z.string(),
  EMAIL_PROVIDER_PORT: z.coerce.number(),
  EMAIL_PROVIDER_HOST: z.string(),
  EMAIL_PROVIDER_USER: z.string(),
  EMAIL_PROVIDER_PASSWORD: z.string(),
  AUTH_TOKEN_SECRET: z.string(),
  AUTH_TOKEN_EXPIRES_IN: z.string(),
});

export type Env = z.infer<typeof envSchema>;

@Module({ })
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}) {
    const { envFilePath, ...othersOptions } = options;

    const newEnvFilePath = [
      ...(Array.isArray(envFilePath) ? envFilePath! : [envFilePath]),
      join(__dirname, `../../../.env.${process.env.NODE_ENV}`),
      join(__dirname, "../../../.env")
    ];

    return super.forRoot({
      isGlobal: true,
      envFilePath: newEnvFilePath,
      validate: env => envSchema.parse(env),
      ...othersOptions
    });
  }
}