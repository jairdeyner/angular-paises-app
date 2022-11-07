import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
})
export class PorCapitalComponent {
  hayError: boolean = false;
  paises: Pais[] = [];
  termino: string = '';

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital(termino).subscribe({
      next: (paises) => {
        this.hayError = false;
        this.paises = paises;
      },
      error: () => {
        this.hayError = true;
        this.paises = [];
      },
    });
  }
}
