const urlParams = new URLSearchParams(window.location.search);
const elSearch = urlParams.get("search");


$.ajax('http://localhost:3000/api/books?search=' + elSearch)
    .done(function (data) {
        for (var i = 0; i < data.length; i++) {
            
            $('#books').append(`
            
            <li data-bookid=${data[i].id}>
                <img src= "${data[i].cover}">
                <p>${data[i].title}</p> 
                <p>${data[i].authors}</p>
            </li>
            
        `)
        }
    })

$(document).on('click', 'li', function () {
    const id = $(this).attr('data-bookid');
    console.log(id)
    location.href = '/books/detalle?id=' + id;
})


