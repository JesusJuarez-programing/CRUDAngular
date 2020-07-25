import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'nuevo'){
      this.heroesService.getHeroe(id).subscribe((resp:HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    console.log(form);

  if (form.invalid){
    console.log("Error");
    return;
  }

   Swal.fire(
     "Espere",
     "Guardando info",
     "info"
   );
  Swal.showLoading();

  let peticion: Observable<any>;

    if (this.heroe.id) {
      console.log("formulario");
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    }
    else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe( rep => {
      Swal.fire( 
        this.heroe.nombre,
        "Se actualizo correctamente",
        "success"
      ).then(resp => {
    
        if ( resp.value ) {
          this.router.navigate(['/heroes'])
        }
      });


      
    });
  }

}
