import React from 'react';
import Console from './Console';
import Counter from './Counter';
import Form from './Form';
import MousePosition from './MousePosition';

export default function() {
  return (
    <div>
      <MousePosition />
      <Counter />
      <Form />
      <Console />
    </div>
  );
}
