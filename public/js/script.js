import * as DOM from './dom.js';

// GET

const refresh = () => {
  DOM.GETproductList.innerHTML = ``;
  axios
    .get(`/product/read`)
    .then((response) => {
      console.log(response.data);
      if (!Array.isArray(response.data) ) {
        readFunction(response.data);
      } else {
        for (let singleRecord of response.data) {
          readFunction(singleRecord);
        }
      }
    }).catch((err) => {
      console.error(err);
    })
}

const readFunction = resource => {

  const record = document.createElement(`li`)
  record.id = resource._id;
  record.innerHTML = `<b>id:</b> ${resource._id}<ul><li><b>name:</b> ${resource.name}</<li><li><b>description:</b> ${resource.description}</li><li><b>price:</b> £${resource.price}</li></ul>`

  DOM.GETproductList.appendChild(record);
}

// POST 

const createFunction = () => {
  axios
    .post(`/product/create`, {
      name : DOM.POSTproductNameInput.value,
      description : DOM.POSTproductDescriptionInput.value,
      price : DOM.POSTproductPriceInput.value
    })
    .then((response) => {
      console.log(response);
      refresh();
    }).catch((err) => {
      console.error(err);
    })
}

DOM.POSTproductSubmitButton.onclick = () => createFunction();

// PUT

const updateFunction = (id) => {
  axios
    .put(`/product/update/${id}`, {
      name : DOM.PUTproductNameInput.value,
      description : DOM.PUTproductDescriptionInput.value,
      price : DOM.PUTproductPriceInput.value
    })
    .then((response) => {
      console.log(response);
      refresh();
    }).catch((err) => {
      console.error(err);
    })
}

DOM.PUTproductSubmitButton.onclick = () => updateFunction(DOM.PUTproductIdInput.value);

// DELETE

const deleteFunction = (id) => {
  console.log(DOM.DELETEproductIdInput.value);
  axios
    .delete(`/product/delete/${id}`)
    .then((response) => {
      console.log(response);
      refresh();
    }).catch((err) => {
      console.error(err);
    })
}

DOM.DELETEproductSubmitButton.onclick = () => deleteFunction(DOM.DELETEproductIdInput.value);

// on load
refresh();