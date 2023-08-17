import ts from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: ['./src/index.ts', './src/atoms/Button/index.ts'],
  output: {
    dir: './lib',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
  },
  plugins: [
    ts({
      tsconfig: './tsconfig.json',
    }),
  ],
  external: ['react', 'react-dom', nodeResolve()],
};
