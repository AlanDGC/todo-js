//! Archivo para crear componentes para la funcionalidad en el HTML

import { Todo } from "../classes";
import { todoList } from "../index";                                //? se importa todoList del index para que se pueda agregar al arreglo que se encuentra en la clase todo-list

//? Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltro = document.querySelectorAll('.filtro');



export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `                                              
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">    
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');                      //? Se crea una const llamada div para almacenar en un div toda la lista de tareas. SE CREA UN DIV PARA PODER INCERTARLO EN EL HTML SI LO CREAMOS COMO li QUE ES LO MAS CONVENIENTE NO SE PODRIA
    div.innerHTML = htmlTodo;                                       //? Con esta instruccion se va a cargar en el html la función htmlTodo en un div (antes creado)

    divTodoList.append( div.firstElementChild );                    //? Se incerta con el append la constante div.firstElementChild para que solo cargue el 1 elelemto que es el li y no tener el div antes creado

    return div.firstElementChild;                                   //? Como salida tenda el div.firstElementChild que es la tarea ya creada               
}



//? Eventos
txtInput.addEventListener('keyup', ( event ) => {                   //? se crea un evento addEventListener que como parametro se le pasa el keyup que funciona para saber que teclas puso el usuario y btener el valor total y el keyCode y como segundo parametro se le pasa una función de flecha que le pasan como argumento el evento
    
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {      //? el event es el que recibe como argumento el callback que es el addEventListener. Hara la comparación de cuando el usuario tecle enter que su keyCode es el 13. Y si no escribe nada y presiona enter no lo guarde por eso es el &&
        console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value );               //? Cuando se cumpla el if se creara una nueva instancia de la clase Todo y se guardara el value del txtInput
        todoList.nuevoTodo( nuevoTodo );                            //? todoList.nuevoTodo primero hace referencia al objeto que se importo (todoList) despues el metodo (.nuevoTodo) al igual esta en la clase TodoList que funciona para agregar un nuevo elelemto al arreglo y se le pasa como argumento la const antes creada (nuevoTodo) que guarda el elemento ingresado del usuario

        crearTodoHtml( nuevoTodo );                                 //? Funciona para ingresarlo al html y para eso solo se manda a llamar el metodo antes creado crearTodoHtml y se le pasa como argumento la const nuevoTodo que almacena el value ingresado por el usuario

        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', ( event ) => {                //? Se ocupa el divTodoList ya que este tiene el querySelector de todo-list y dentro esta el checkBox y el button para cerra y asi sera mas facil. Evento click, como parametro le especificamos que es un click y en el callback se le pasa el evento
    
    const nombreElemento = event.target.localName;                  //? Se crea una constante para saber el nombre de la etiqueta en concreto (label, input, button)
    const todoElemento = event.target.parentElement.parentElement;  //? const para seleccionar todo el li completo y poderlo eliminarlo del todoList y el html
    const todoId = todoElemento.getAttribute('data-id');            //? const para obtener el id de una tare; se ocupa la anterior const todoElemento, ya que en el li tiene el id y asi se puede obtener mas facil
    
    if ( nombreElemento.includes('input') ){                        //? Condición que evalua si cuando se haga clic en nombreElemento y este tiene un etiqueta llamado input significa que es el checkBoh ya hara lo siguiente
        todoList.marcarCompletado( todoId );                        //? Se va a llamar el metodo marcarCompletado y se le pasa el todoId para que haga toda la comparación con el arreglo del todos (donde se alojan las tareas), si si coincide hara la conversion de true a false y al contrario
        todoElemento.classList.toggle('completed');                 //? Intrucción para activar y desactivar el estilo de completado a una tarea. Se hace referencia a todoElemento que es el li completo y ahi se le aggrga el metodo classList.toggle que funciona para agregar la clase completed si no existe y si si existe ponersela, todo esto gracias al toggle
    } else if ( nombreElemento.includes('button') ){                //? Si al dar click retorna una etiqueta con button nos da a entender que se debe de eliminar
        todoList.eliminarTodo( todoId );                            //? hara referencia al objeto antes importado todoList y accedera al metodo eliminarTodo y se le pasara el todoId antes obtenido y hara la logica del todo-list.class
        divTodoList.removeChild( todoElemento );                    //? El removeChild funciona para remover cualquier elemento html y le estamos indicando que va a ser todoElemento que es el li. Pero estamos acceciendo todo esto con divTodoList que es cuando estemos haciendo click y que almacena igual el li general
    };

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    //! Este for tiene que iterar del ultimo para el primero, porque si se van eliminando del primero al ultimo, puede haber errores, ya que los indices van a cambiar y puede que haya errores
    for ( let i = divTodoList.children.length -1; i >= 0; i-- ) {   //? se crea el let i y se almacena el ultimo elemento del divTodoList, ya que este hace referencia a todo el li contenedor de las tareas; el children es para que tome los hijos (li) y se ira decrementando hasta que llegue al 0 que es la ultima posición

        const elemento = divTodoList.children[i];                   //? Se almacena las iteraciones en la constante elemento. De igual manera para obtener el li contenedor se ocupa el divTodoList.children
        
        if( elemento.classList.contains('completed') ){             //? Condición para saber si el li contenedor tiene la clase completed 
            divTodoList.removeChild( elemento );                    //? instrucción para elminar un elemento html y se le pasa los elementos que contengan la clase completed
        }

    }

});

ulFiltros.addEventListener('click', ( event ) => {
    
    const filtro = event.target.text;                               //? Sirve para identificar el boton para filtrar tareas mediante su texto de etiqueta, si no le da click en cualquier etiqueta retornara un undefined
    if ( !filtro ) { return; }                                      //? esta instrucción dice que si no existe hara un return

    anchorFiltro.forEach( elem => elem.classList.remove('selected') );//? Este forEach esta iterando en el arreglo anchorFiltro (querySelectorAll) y despues que seleccione un boton le quitara la clase selected y asi no estara seleccionado ningun boton
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ) {                 //? Ciclo para iterar todos los elementos del divTodoList
        
        elemento.classList.remove('hidden');                        //? Siempre que se vaya a cambiar de un filtro a otro debemos de quitar la clase hidden (css) dicha clase la asignaremos dinamicamente
        const completado = elemento.classList.contains('completed');//? Se almacena en una const la instruccion para saber si una tarea esta completada (completed)

        switch( filtro ) {                                          //? Se crea un switch con el filtro antes creado que aloja (Pendientes, Completados)

            case 'Pendientes':                                       //? Cuando se le de click al boton con la etiqueta Pendiente va a evaluar si son completados
                if ( completado ) {         
                    elemento.classList.add('hidden');               //? a estas tareas les colocara la clase hidden para ocultarlos
                }
            break;
            
            case 'Completados':                                     //? Cuando se le de click al boton con la etiqueta Completados va a evaluar las que no esten completadas
                if ( !completado ) {
                    elemento.classList.add('hidden');               //? a estas tareas les colocara la clase hidden para ocultarlos
                }
            break;

        }

    }

});



