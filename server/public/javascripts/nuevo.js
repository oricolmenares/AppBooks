 
$('#add').on('click', function(){
    const search =  $('#loadedword').val()
    location.href = `/books?search=${search}`;  
})