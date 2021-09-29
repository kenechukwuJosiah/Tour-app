/* eslint-disable */
const login = async (email, password) => {
  try {
    console.log(email, password);
    const res = await axios({
      method: 'post',
      url: 'http://127.0.0.1:3300/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    console.log(res);
  } catch (error) {
    console.log(error.response.data);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  login(email, password);
});
