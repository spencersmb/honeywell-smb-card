import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import ignore from './rollup-plugins/ignore';
import { ignoreTextfieldFiles } from './elements/ignore/textfield';
import { ignoreSelectFiles } from './elements/ignore/select';
import { ignoreSwitchFiles } from './elements/ignore/switch';

export default {
  input: [
    'src/honeywell-smb-card.ts',
    'src/customButton.ts',
    'src/et-pop-up.ts',
    'src/modes-card.ts',
    'src/utils.ts',
    'src/components/controls.ts',
    'src/components/hvacModes.ts',
    'src/components/presetsDropDown.ts',
    'src/components/fanModes.ts',
    'src/components/auxHeat.ts',
    'src/components/humidity.ts',
  ],
  output: {
    dir: './dist',
    format: 'es',
  },
  plugins: [
    resolve(),
    typescript(),
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
    terser(),
    serve({
      contentBase: './dist',
      host: '0.0.0.0',
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
    ignore({
      files: [
        ...ignoreTextfieldFiles,
        ...ignoreSelectFiles,
        ...ignoreSwitchFiles].map((file) => require.resolve(file)),
    }),
  ],
};
