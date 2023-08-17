import ReactDOM from 'react-dom';
import '@design-principles/scss/lib/atoms/Utilities.css';
import '@design-principles/scss/lib/atoms/Margin.css';
import '@design-principles/scss/lib/molecules/Select.css';
import '@design-principles/scss/lib/global.css';

import { Text, Margin, Select } from '@design-principles/react';
import '@design-principles/scss/lib/atoms/Text.css';

const options = [
  {
    label: 'Strict Black',
    value: 'strict-black',
  },
  {
    label: 'Heavenly Green',
    value: 'heavenly-green',
  },
  {
    label: 'Sweet Pink',
    value: 'pink',
  },
];

ReactDOM.render(<Select options={options} />, document.getElementById('root'));
