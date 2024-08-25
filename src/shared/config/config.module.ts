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
    DATABASE_URL: z.string()
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
        ]

        return super.forRoot({
            isGlobal: true,
            envFilePath: newEnvFilePath,
            validate: env => envSchema.parse(env),
            ...othersOptions
        });
    }
}