import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  accessKey: process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY!,
});
