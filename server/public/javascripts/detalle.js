const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");


$.ajax('/api/books/' + id)
  .done(function (data) {
    $('#thebook').append(`
      <img src="${data.cover}"/>
      <h1>${data.title}</h1>
      <p>${data.subtitle}</p>
      <p>${data.description}</p>
      <p>${data.authors}</p>
    `)
  })
 
