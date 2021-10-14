const signupHandle = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim()
  const password = document.querySelector('#password').value.trim();
  console.log(email, password)

  if(email && password){
    const response = await fetch('/api/signup', {
      mehtod: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok){
      document.location.replace('/');
    } else{
      alert('signup failed');
    }
  }
}

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupHandle)