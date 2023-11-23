import { useState } from 'react';
import './App.css';
import { Formulario } from './componente/formulario';
import { Tarea } from "./componente/tarea"

function App() {

    const [tarea, setTarea] = useState("")
    const [listadoTareas, setListadoTareas] = useState([])


    function handleSubmit(e){
      e.preventDefault()

      if(tarea === ""){
        alert("TIENES QUE PONER UNA TAREA")
        return
      }
      
      const nuevaTarea = {
        id: Date.now(),
        tarea: tarea,
        completado: false
      }

      const temp = [nuevaTarea, ...listadoTareas]
      setListadoTareas(temp)

      setTarea("")

      console.log(listadoTareas)

    }

    function handleChange(e){
      setTarea(e.target.value)
      console.log(tarea)
    }

    function onActualizarTarea(objEditarTarea){
      const {id, tarea} = objEditarTarea

      const temp = [...listadoTareas]
      const elemento = temp.find(item => item.id === id)
      elemento.tarea = tarea

      setListadoTareas(temp)
    }

    function onBorrarTarea(id){
      
      const temp = listadoTareas.filter(item => item.id !== id)
      setListadoTareas(temp)

    }

  return (
    <>
      <div className="contenedorPrincipal" >
        <h1>To-Do List</h1>

        <div className="contenedorFormulario" >
          <Formulario
            tarea={tarea}
            handleSubmit={handleSubmit}
            handleChange={handleChange}/>
        </div>

        <div className="contenedorTareas">
          <h2>Agregue Tarea</h2>
          <div className="contenedorInfoTareas">
            {
              listadoTareas.map(tarea => (
                <Tarea
                  key={tarea.id}
                  id={tarea.id}
                  tarea={tarea}
                  onActualizarTarea={onActualizarTarea}
                  onBorrarTarea={onBorrarTarea}/>
                ))
            }
          </div>
        </div>
        <footer>
        <h3>Projecto en React para Argentina Programa 4.0</h3>
      </footer>
      </div>
    </>
  );
}

export default App;
