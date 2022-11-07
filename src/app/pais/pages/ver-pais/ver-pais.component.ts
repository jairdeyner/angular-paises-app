import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
})
export class VerPaisComponent implements OnInit {
  pais!: Pais;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.paisService.getPaisPorAlpha(id)))
      .subscribe({
        next: (pais) => {
          this.pais = pais;
        },
      });

    /*
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const { id } = params;

        this.paisService.getPaisPorAlpha(id).subscribe({
          next: (paises) => {
            console.log(paises);
          },
        });
      },
    });
    */
  }
}
