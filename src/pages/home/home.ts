import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from "../../data/data.animales";
import { Animal } from "../../interfaces/animal.interface";
import { Refresher, reorderArray } from "ionic-angular";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando:boolean = false;

  constructor() {

    this.animales = ANIMALES.slice(0);

  }

  //reproducir sonido
  reproducir( animal:Animal ){

    this.pausar_audio( animal );

    if ( animal.reproduciendo ){
      animal.reproduciendo = false;
      return;
    }

    console.log(animal);

    this.audio.src = animal.audio;

    //iniciamos el sonido
    this.audio.load();
    this.audio.play();

    //muestra que sonido esta reproduciendo
    animal.reproduciendo = true;

    //timeout para poder que audio termina un tiempo
    this.audioTiempo = setTimeout( ()=> animal.reproduciendo = false, animal.duracion * 1000);

  }

  //pausamos todos los audios para que solo se escucha seleccionado
  private pausar_audio( animalSel:Animal ){

    //limpia TimeOut
    clearTimeout( this.audioTiempo );


    this.audio.pause();

    //el audio que se ponga desde principio
    this.audio.currentTime = 0;

    for ( let animal of this.animales ){

      //el animal que no este seleccionado que no tenga sonido
      if ( animal.nombre !=animalSel.nombre){
        animal.reproduciendo = false;
      }

    }

  }

  borrar_animal( idx:number){

    this.animales.splice(idx, 1);

  }

  //recargamod nuestro Array con la classe Refresh
  recargar_animales( refresher:Refresher ){

    console.log("Inicio del refresh");

    setTimeout( ()=>{

      console.log("Termino el refresh");
      this.animales = ANIMALES.slice(0);

      refresher.complete();

    },1500)

  }

  //reordena nuestra lista
  reordenar_animales( indeces :any){

    console.log(indeces);
    this.animales = reorderArray(this.animales, indeces);

  }

}
