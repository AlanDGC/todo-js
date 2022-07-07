//! Archivo para crear una Tarea y asignarle por defecto valores (id, completado, creado)

export class Todo {

    static fromJson ({ id, tarea, completado, creado }) {                           //? Metodo estatico que funciona para poder reconstruir intancias, ya cuando estan cargados las tareas en el localStorage, los transg¿forma en objetos y si queremos extrar una sola variable no se podra, es por eso que se hace este metodo
        const tempTodo = new Todo( tarea );

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;
    };

    constructor( tarea ){                                                           //? Cada vez que se solicite una nueva tarea le generara todos los datos (id, completado y creado)
        this.tarea      = tarea;
        this.id         = new Date().getTime();                                       //? Retornara algo asi 1561584811 que nos servira para ocuparlo como id
        this.completado = false;
        this.creado     = new Date();
    }

    imprimirClase() {
        console.log(`${ this.tarea } - ${ this.id }`);
    }

}