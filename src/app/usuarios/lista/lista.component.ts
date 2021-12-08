import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public loading: boolean = false;
  public error: any;

  constructor(
    private router: Router,
	private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('usuarios').subscribe(({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch(cargarUsuarios());
  }
  
  verDetalle(id: any){
	this.router.navigate(['/usuario', id]);
  }

}
