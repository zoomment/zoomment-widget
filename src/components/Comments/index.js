import React, { useEffect } from "react";
import moment from "moment";
import { useCommentsState, useCommentsDispatch } from "../../providers/Comments";
import {
  List,
  Item,
  Username,
  Body,
  Date,
  Head,
  Title,
  Container,
  NoResult,
  Delete,
  Avatar,
} from "./style";

export default function Comments() {
  const state = useCommentsState();
  const actions = useCommentsDispatch();

  useEffect(() => actions.getComments(), []);

  if (state.comments.length == 0) {
    return <NoResult>Be the first to comment.</NoResult>;
  }

  return (
    <Container>
      <Title>{state.comments.length} Comments</Title>
      <List>
        {state.comments.map((comment) => (
          <Item key={comment._id}>
            <Avatar src={`https://www.gravatar.com/avatar/${comment._id}?d=monsterid`} />
            <Head>
              <Username>{comment.owner?.name}</Username>•
              <Date>{moment(comment.createdAt).format("DD MMM YYYY - HH:mm")}</Date>
            </Head>
            <Body>
              {comment.body}
              {comment.secret && (
                <Delete twoToneColor="red" onClick={() => actions.removeComment(comment)} />
              )}
            </Body>
          </Item>
        ))}
      </List>
    </Container>
  );
}
