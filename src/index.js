import './styles.css';

import { Todo, TodoList } from './classes';                                 //? Como se almaceno todas las importaciones en el archivo index.js dentro de classes, ya no es necesario que se ponga /index.js ya que lo hace por default y dentro de las {} se coloca el nombre de las clases antes exportadas
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();                                     //? Se crea la intancia de la clase todoList que almacena todas las funciones: nuevo, eliminar una tarea, marcar tara como completada, eliminar tareas completadas. Se coloca el export para poder ocuparlo en la clase componentes y poder agregar nuevas tareas al arreglo que se encuentra en esta clase

// const tarea = new Todo('Aprender JavaScript');                              //? Se crea la intancia de la clase Todo su funcion es almacenar una tarea creada y le asigna sus valores: id, completado, creado
// todoList.nuevoTodo( tarea );                                                //? Se almacena en todoList en la funcion nuevoTodo la tarea creada de la clase Todo

// console.log( todoList );

// crearTodoHtml( tarea );                                                     //? Se manda a llamar la funcion crearTodoHtml de la clase componenes y se le pasa la tarea que se creo en la clase Todo y esto lo pintara en el html

// localStorage.setItem('mi-key', 'ABC1234');

// setTimeout( () => {
//     localStorage.removeItem('mi-key');
// }, 1500 );

//* todoList.todos.forEach( crearTodoHtml );                                //? Cuando solo se tiene un parametro que haga la iteración en el callback y es el mismo que recibe el metodo se puede obviar; pero si son mas de 1 ahi se tiene que poner el callback completo
todoList.todos.forEach( todo => crearTodoHtml( todo ) );                    //? Se itera con un forEach el arreglo todos, y se le pasa como parametro el metodo crearTodoHtml y se le pasa el todo que se itera, esto lo pintara en el html

console.log( 'todos', todoList.todos );