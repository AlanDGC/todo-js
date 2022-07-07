//! Archivo para crear la lista de las tareas creadas y su funcionamiento (nuevo, eliminar una tarea, marcar tara como completada, eliminar tareas completadas)

import { Todo } from "./todo.class";

export class TodoList {

    constructor() {
        // this.todos = [];                                            //? Se crea un arreglo (vacio) para almacenar la lista de las tareas

        this.cargarLocalStorage()                                           //? Se inicializa el metodo cargarLocalStorage() en el contructor para que vaya ingresando al arreglo valores
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ) {
        //! Se creara un nuevo arreglo excluyendo lo de la condición, el id que coincida lo eliminara
        this.todos = this.todos.filter( todo => todo.id != id);    //? Gracias al metodo filter que es especial para los arreglos, como parametro se le pasa un callback que se crea un variable que hace alusión a cada iteración del arreglo, este hara la condicion que si es diferente los id, retornara un "nuevo arrelgo" este arreglo no tendra el que es igual ya que eso se le especifico y regresara al arrelgo Todo modificado
        this.guardarLocalStorage();

    }

    marcarCompletado( id ) {                                        //? Metodo para marcar con el checkBox si ya se acompleto, se va hacer la busqeda por el id
        
        for ( const todo of this.todos ){                           //? Se crea un ciclo for para buscar en el arreglo todos y se almacena en el todo apenas creado
            
            if( todo.id == id ){                                    //? Se hace la comparación del id del todo que itero con el arreglo contra el id que se pasa por argumento de este metodo. Como un el id que se recibe por argumento no es un numero y el que se itera si por eso solo se hace con 2 ==

                todo.completado = !todo.completado;                 //? Si es false se cambiara a true y asi al contrario tambien
                this.guardarLocalStorage();
                break;                                              //? Como solo hay 1 id, cuando lo encuentre se salga y no siga buscando
            }

        }

    }

    eliminarCompletados() {

        this.todos = this.todos.filter( todo => !todo.completado);  //? Se va a filtrar por elementos que no esten completado, es decir, retornara un nuevo arreglo con elementos no completados
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){                                          //? Metodo para guardar las tareas en el localStorage

        localStorage.setItem('todo', JSON.stringify( this.todos )); //? lo que esta haciendo es almacenar los todos en el localStorage, el primer parametro es la llave (key) y el segundo es el valor, pero como el localStorage solo acepta string y nosotros la info la tenemos en un arreglo, se tiene que cambiar con por un JSON por eso la instruccion JSON.stringify y dentro el nombre del arreglo que se tiene que cambiar

    }

    cargarLocalStorage(){                                           //? Metodo para cargar información del localstorage al arreglo de todos

        // if ( localStorage.getItem('todo') ) {                       //? Siempre se debe de verificar si existe esta llave, ya que puede borrar el usuario el localStorage
        //     this.todos = JSON.parse( localStorage.getItem('todo') );//? Si si existe le ingresara la información al arreglo y cargara la informacion ya almacenada. SE TIENE QUE VOLVER A CONVERTIR AL OBJETO ORIGINAL (ARREGLO), YA QUE SI NO SE HACE NO SE PODRA AGREGAR NUEVOS ELEMENTOS PORQUE SE CONVIERTE A UN STRING
        //     console.log( 'cargarLocal:', this.todos );
        //     console.log( typeof this.todos );
        // } else {
        //     this.todos = [];                                        //? Si no existe inicializara el arreglo, esto se hara cuando no haya registros algunos
        // }
        //! Lo mismo que lo de arriba
        this.todos = ( localStorage.getItem('todo')) 
                        ? JSON.parse( localStorage.getItem('todo') ) 
                        : [];
        
        this.todos = this.todos.map( obj => Todo.fromJson( obj ) );    //? El metodo map es especial para los arreglos y funciona para barrer todas las posiciones del arreglo y retornara un nuevo arreglo 

    }

}