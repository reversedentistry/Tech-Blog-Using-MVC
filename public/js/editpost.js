const editPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value;
    const post_text = document.querySelector('#post-body').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (title && post_text) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, post_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } else {
        alert('Failed to edit post');
      }
    }
  };

  document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editPostHandler);