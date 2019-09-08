import React from 'react';

const BlogForm = ({ handleChange, onSubmit, title, author, url }) => (
    <div>
        <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        title <input type="text" name="title" value={title} onChange={handleChange} />
        author <input type="text" name="author" value={author} onChange={handleChange} />
        url <input type="text" name="url" value={url} onChange={handleChange} />
        <button type="submit">create</button>
      </form>
    </div>
  );


export default BlogForm;