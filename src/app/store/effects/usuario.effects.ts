import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as usuarioActions from '../actions/usuario.actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {

  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) { }

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      mergeMap(
        (action) => this.usuarioService.getUserById(action.id)
          .pipe(
            map(user => usuarioActions.cargarUsuarioSuccess({ usuario: user })),
            catchError(err => of(usuarioActions.cargarUsuarioError({ payload: err })))
          )
      )
    )
  );

}
