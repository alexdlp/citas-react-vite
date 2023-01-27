import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"
import Paciente from "./components/Paciente";

function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  // LOS EFFECTS SE EJECUTAN EN ORDEN DE DECLARACIÓN
  useEffect(() => {
    const obtenerLS = () => {

      // si no hay nada en localStorage, agrego un array vacío
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
    obtenerLS();
  },[])

  // en localStorage no puedes guardar arreglos, solo strings.
  // lo que vamos a hacer es escribir en localStorage cuando haya cambios en pacientes. Para eso -> useEffect
  //  cada vez que haya un cambio en pacientes, queremos ejecutar este código.
  useEffect(() => {
    console.log('Componenete Listo o cambió pacientes')

    // si tengo un paciente agregado y recargo, este desaparace del localStorage. Esto pasa porque 
    //la primera vez pacientes es un arreglo vacío. Entonces tenemos que escribir un código que primero revise
    // si hay algo en localStorage, y entonces lo coloque en el State. Y si no hay nada, que inicie con lo que 
    // hay en el State.
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  
  }, [pacientes])
  

  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id );  
    setPacientes(pacientesActualizados)
  }
  
  return (
    <div className="container mx-auto mt-20" >
      <Header
        
      />
      <div className="mt-12 md:flex">
        <Formulario
          pacientes = {pacientes}
          setPacientes = {setPacientes}   
          paciente = {paciente}     
          setPaciente = {setPaciente}  
        />
        <ListadoPacientes
          pacientes = {pacientes}
          setPaciente = {setPaciente}
          eliminarPaciente = {eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
