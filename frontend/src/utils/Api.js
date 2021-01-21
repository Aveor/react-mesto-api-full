class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  getInfoUser(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); 
      });
  }

  updateInfo(name, about, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addNewCard(cardName, cardLink, token) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(id, token) {
    return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`error${res.status}`);
      });
  };

  setLike(id, token) {
    return fetch(`${this._url}/cards/${id}/likes`,
        {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            }                
        });
}

deleteLike(id, token) {
    return fetch(`${this._url}/cards/${id}/likes`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        });
}

  updateAvatar(link, token) {
        
    return fetch(`${this._url}/users/me/avatar`,
        {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else { 
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            }                
        });
}
}

const api = new Api({
  baseUrl: 'http://api.aveor.students.nomoredomains.icu',
});

export default api;