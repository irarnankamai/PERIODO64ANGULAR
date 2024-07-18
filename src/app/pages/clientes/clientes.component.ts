import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../domain/cliente';
import { ClientesService } from '../../services/clientes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit{
 /* clientes!: Observable<Cliente[]>; 
  client: Cliente = new Cliente();

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.clientes = this.clientesService.getClientes();
  }

  guardar() {
    this.clientesService.saveCliente(this.client).subscribe(
      data => {
        console.log(data);
        this.clientes = this.clientesService.getClientes(); // Actualiza la lista después de guardar
      },
      error => {
        console.error('Error al guardar cliente', error);
        // Manejo de errores según sea necesario
      }
    );
  } */
    clientes!: Observable<Cliente[]>; 
    client: Cliente = new Cliente();
    editing: boolean = false; 
  
    constructor(private clientesService: ClientesService) { }
  
    ngOnInit(): void {
      this.clientes = this.clientesService.getClientes();
    }
  
    guardar() {
      if (this.editing) {
        
        this.clientesService.updateCliente(this.client).subscribe(
          data => {
            console.log('Cliente actualizado:', data);
            this.clientes = this.clientesService.getClientes(); 
            this.cancelar(); 
          },
          error => {
            console.error('Error al actualizar cliente', error);
        
          }
        );
      } else {

        this.clientesService.saveCliente(this.client).subscribe(
          data => {
            console.log('Cliente guardado:', data);
            this.clientes = this.clientesService.getClientes();
            this.client = new Cliente(); 
          },
          error => {
            console.error('Error al guardar cliente', error);
            
          }
        );
      }
    }
  
    editar(cliente: Cliente) {
      
      this.client = { ...cliente };
      this.editing = true; 
    }
  
    cancelar() {
      this.client = new Cliente(); 
      this.editing = false; 
    }
}