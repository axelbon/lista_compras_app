import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-form-lista',
  templateUrl: './form-lista.component.html',
  styleUrls: ['./form-lista.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormListaComponent implements OnInit {

  /* 
    Variables para el formulario de `informacion de la tienda`
  */
  //formgroup para formulario
  tiendaForm: FormGroup;
  //array de tiendas para el autocomplete
  tiendas: string[] = ['Walmart', 'Chedraui', 'Bodega', 'Cotsco', 'Sams', 'Coppel', 'Oxxo', '7Eleven'];
  //observable para el autocomplete filtrado
  filteredTiendas: Observable<string[]>;

  /* 
    Variables para el formulario de `listado de producos`
  */
  productsForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.tiendaForm = this._formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required]
    });

    this.productsForm = this._formBuilder.group({
      productos: this._formBuilder.array([this._formBuilder.group({
        nombre: ['', Validators.required],
        categoria: ['falta'],
        cantidad: [1, Validators.required],
        precio: [0, Validators.required]
      })])
    });
  }

  ngOnInit() {
    //para saber cuando cambia el value en el input nombre de formulario `tiendaForm`
    this.filteredTiendas = this.tiendaForm.controls['nombre'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterTiendas(value))
      );
  }

  //function para el filtrado de tiendas
  private _filterTiendas(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tiendas.filter(tienda => tienda.toLowerCase().includes(filterValue));
  }

  //function get para los productos en el formulario
  get productsControls() {
    return this.productsForm.get('productos') as FormArray;
  }

  //function para anadir input de producto al formulario

  addProduct() {
    this.productsControls.push(this._formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['falta'],
      cantidad: [1, Validators.required],
      precio: [0, Validators.required]
    }));
  }

  //function para eliminar input de producto del formulario
  deleteProduct(index) {
    const inputValues = this.productsControls.controls[index].value;
    let borrar = true;
    if (inputValues.nombre) { borrar = confirm('HAY NOMBRE') };
    if (borrar) this.productsControls.removeAt(index);
  }

  guardarCompra() {
    if (this.tiendaForm.valid && this.tiendaForm.value) {
      console.log('si');
    } else {
      alert('no se procesa');
    }
  }

}
