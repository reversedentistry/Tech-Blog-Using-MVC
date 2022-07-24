const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#post-body').value.trim();
  
    if (title && post_text) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ title, post_text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log("Response okay"); 
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
  .querySelector('.post-creation').addEventListener('submit', newPostHandler);