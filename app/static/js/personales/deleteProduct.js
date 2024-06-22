window.addEventListener('load',()=>{
    deleteForms=document.querySelectorAll('.delete-prod')
    deleteForms.forEach(form => {
        form.addEventListener('submit',(e)=>deleteProd(e))
    });
})


function deleteProd(e){
    
   e.preventDefault()
Swal.fire({
  title: "¿Deseas eliminar permanentemente el producto?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Eliminar",
  denyButtonText: `No eliminar`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    e.target.submit()
    Swal.fire("Producto eliminado", "", "info");
  } else if (result.isDenied) {
    Swal.fire("No se ha eliminado el producto", "", "info");
  }
});
}