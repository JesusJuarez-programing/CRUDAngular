import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  
  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe( resp => {
      this.heroes = resp;
    });
  }

  borrarHeroe ( heroe: HeroeModel, id: number ){
    Swal.fire({
      title: 'Estas seguro?',
      text: `Estas Seguro de eliminar a: ${heroe.nombre}`,
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Aceptar',
      cancelButtonText:
        'Cancelar'
    }).then(resp => {
    
      if ( resp.value ) {
        this.heroes.splice(id, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });

 
  }
}
