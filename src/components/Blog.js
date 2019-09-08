import React, { useState } from 'react'
const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  }

  const showDetails = { display: visible ? '' : 'none' }

  const blogStyle = {
    border: 1,
    paddingLeft:10,
    paddingTop:5,
    borderWidth: 1,
    marginBottom: 1
  }

  return (

    <div style={blogStyle}>
      <div onClick={() => toggleVisible()} >{blog.title}</div>

      <div style={showDetails}>
        {blog.title} <br/>Author: {blog.author} <br/> Url: {blog.url}
      </div>
    </div>
  )
}

export default Blog