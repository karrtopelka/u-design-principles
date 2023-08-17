import ReactDOM from 'react-dom';
import '@design-principles/scss/lib/atoms/Utilities.css';
import '@design-principles/scss/lib/atoms/Margin.css';
import '@design-principles/scss/lib/global.css';

import { Text, Margin } from '@design-principles/react';
import '@design-principles/scss/lib/atoms/Text.css';

ReactDOM.render(
  <div>
    <Margin space='none' left={true}>
      <Text size='lg'>Hello World</Text>
    </Margin>
  </div>,
  document.getElementById('root'),
);
