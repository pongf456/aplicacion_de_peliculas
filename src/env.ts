import { EnvType, load } from 'ts-dotenv';

export type Env = EnvType<typeof schema>;

export const schema = {
    TMDB_API_KEY : String,
    TMDB_TOKEN_KEY : String
};

export let env: Env;

export function loadEnv(): void {
    env = load(schema);
}