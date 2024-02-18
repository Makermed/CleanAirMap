import { createConfig } from '@gluestack-style/react';
import { config as defaultConfig } from '@gluestack-ui/config';

const config = createConfig({
  ...defaultConfig,
} as const);

export default config;