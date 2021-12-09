// export const BASE_URL = 'https://auth.nomoreparties.co';
// export const MY_URL = 'https://silent-server.nomoredomains.work';
export const BASE_URL = 'https://silent-server.nomoredomains.work';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
}

/*export const signUp = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(checkResponse)
};*/

export const signUp = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
};

export const signIn = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse)
};

// export const getUserData = (token) => {
export const getUserData = () => {
  return fetch(`${BASE_URL}/users/me`, {
    credentials: 'include',
    method: 'GET',
    /* headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    } */
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then(checkResponse)
}

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    credentials: 'include',
    method: 'GET',
  })
    .then(checkResponse)
}
