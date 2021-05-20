import axios from "axios";
const BASE_URL = "http://localhost:8080/api/contacts";

export const addContact = (values) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(`${BASE_URL}/`, values, {
          headers: { "Content-Type": "application/json" },
          timeout: 300000,
        })
        .then((data) => {
          resolve({
            msg: "Contact Added to the list.",
            contacts: data.data.contacts,
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchAllContacts = (email) => {
  return new Promise((resolve, reject) => {
    try {
      let URL = email !== "" ? `${BASE_URL}/?email=${email}` : `${BASE_URL}/`;
      axios
        .get(URL, {
          headers: { "Content-Type": "application/json" },
          timeout: 300000,
        })
        .then((data) => {
          resolve({ contacts: data.data.contacts });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const findContactById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(`${BASE_URL}/${id}`, {
          headers: { "Content-Type": "application/json" },
          timeout: 300000,
        })
        .then((data) => {
          resolve({ contacts: data.data.contacts });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const updateContactById = (values) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .patch(`${BASE_URL}/${values.id}`, values, {
          headers: { "Content-Type": "application/json" },
          timeout: 300000,
        })
        .then((data) => {
          resolve({
            msg: "Contact Updated into the list.",
            contacts: data.data.contacts,
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const deteteContactById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(`${BASE_URL}/${id}`, {
          headers: { "Content-Type": "application/json" },
          timeout: 300000,
        })
        .then((data) => {
          resolve({
            msg: "Contact Deleted from the list.",
            contacts: data.data.contacts,
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      reject(error);
    }
  });
};
