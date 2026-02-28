import z from 'zod';

const envSchema = z.object({
  MONGO_URI: z.string().nonempty('MONGO_URI environment variable is required'),
});

export const ENV = envSchema.parse(process.env);
