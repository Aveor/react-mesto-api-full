// export const BASE_URL = "https://auth.nomoreparties.co";
export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "https://api.aveor.students.nomoredomains.icu";

export const register = (email, password) =>{
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  })
      .then((res) => {
          if (res.ok) {
              return res.json();
          } return Promise.reject(res.status);
      })       
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( email, password ),
  })
    .then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 400) {
          throw new Error("Не передано одно из полей");
        }
        if (res.status === 401) {
          throw new Error("Пользователь с email не найден");
        }
      } catch (e) {
        console.log(e);
        return e;
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
      return;
    })
    .catch((err) => console.log(err));
};

export const getUserInfo =(token) =>{
  return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
      }
  })
      .then((res) => {
          if (res.ok) {
              return res.json();
          } return Promise.reject(res.status); 
      })        
}