import { Modern } from './Modern';
import { Classic } from './Classic';
import { Minimalist } from './Minimalist';
import { Creative } from './Creative';
import { Bento } from './Bento';
import { Premium } from './Premium';

export const themes = {
  modern: Modern,
  classic: Classic,
  minimalist: Minimalist,
  creative: Creative,
  bento: Bento,
  premium: Premium,
} as const;

export type ThemeName = keyof typeof themes;