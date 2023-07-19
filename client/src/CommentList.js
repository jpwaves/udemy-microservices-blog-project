import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;

    // would prob be better as a switch
    if (comment.status === 'approved') {
      content = comment.content;
    } else if (comment.status === 'rejected') {
      content = 'This comment has been rejected';
    } else if (comment.status === 'pending') {
      content = 'This comment is awaiting moderation';
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
