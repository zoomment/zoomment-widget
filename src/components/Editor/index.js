import React, { useState } from 'react';
import lscache from 'lscache';
import { useCommentsDispatch } from '../../providers/Comments';
import { Container, Textarea, Button, Footer, Input } from './style';

export default function Editor() {
  const [body, setBody] = useState('');
  const [name, setName] = useState(lscache.get('name') || '');
  const [email, setEmail] = useState(lscache.get('email') || '');

  const actions = useCommentsDispatch();

  const onValideSubmit = (e) => {
    e.preventDefault();
    actions
      .addComment({
        body,
        owner: { name, email },
      })
      .then(() => setBody(''));
  };

  return (
    <Container>
      <form onSubmit={onValideSubmit}>
        <Textarea
          onChange={(e) => setBody(e.target.value)}
          placeholder="What do you think?"
          value={body}
          required
        />
        <Footer>
          <Input
            onChange={(e) => {
              setName(e.target.value);
              lscache.set('name', e.target.value);
            }}
            placeholder="Name*"
            value={name}
            type="text"
            required
          />
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
              lscache.set('email', e.target.value);
            }}
            placeholder="Email"
            value={email}
            type="email"
          />
          <Button>Post</Button>
        </Footer>
      </form>
    </Container>
  );
}
