import { Component } from '@angular/core';
import { share } from 'rxjs';
import { SharedModule } from '../theme/shared/shared.module';
import { RouterLink } from '@angular/router';
import { Iunidadmedida } from '../Interfaces/iunidadmedida';
import { UnidadmedidaService } from '../Services/unidadmedida.service';

@Component({
  selector: 'app-unidadmedida',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './unidadmedida.component.html',
  styleUrl: './unidadmedida.component.scss'
})
export class UnidadmedidaComponent {
  title = 'Lista de Unidades de Medida';
  listaUnidadMedida: Iunidadmedida[] = [];
  constructor(private UnidadmedidaService: UnidadmedidaService) {}
  ngOnInit():void {
    this.UnidadmedidaService.todos().subscribe((data) => {
      this.listaUnidadMedida = data;
    });
  }
 eliminar(idUnidad_Medida: number) {
    this.UnidadmedidaService.eliminar(idUnidad_Medida).subscribe((data) => {
      this.ngOnInit();
    });
  }

}
