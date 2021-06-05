import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export class SweetAlert{
    constructor(private router:Router){}
    sweetAlert(api,path) {
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            api.subscribe((d) => {
              Swal.fire(
                'Operation successfull!',      
              ).then(()=>{
                this.router.navigate([path])
              })
              
            } , error => {
              console.log('e', error.error)
              Swal.fire(
                'Operation failed!',
              )
            })
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled', 
            )
          }
        })
      }
}
