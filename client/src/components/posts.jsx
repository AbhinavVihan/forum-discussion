import React from "react";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const { posts } = props;
  return (
    <div className="list-group">
      {posts.map((post) => (
        <Link
          className="list-group-item list-group-item-action flex-column align-items-start post-card"
          to={`/post/${post._id}`}
          key={post._id}
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="post-title">{post.title}</h5>
          </div>
          <small className="post-author">Created by {post.author.name}</small>
          <p className="post-description">{post.description}</p>
          <div className="tags mt-2">
            Related Topics:
            {post.tags.map((tag) => (
              <span className="badge badge-tag" key={tag._id}>
                {tag.name}
              </span>
            ))}
          </div>
          <div className="post-stats mt-3">
            <span className="post-likes">
              <i className="fas fa-thumbs-up"></i> {post.upvotes.length} Likes
            </span>
            <span className="post-views">
              <i className="fas fa-eye"></i> {post.views} Views
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
