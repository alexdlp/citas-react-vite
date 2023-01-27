import Paciente from "./Paciente";

const ListadoPacientes = ({pacientes, setPaciente, eliminarPaciente}) => {


    return (

    <div className="md:w-1/2 lg:w-2-5 md:h-screen overflow-scroll">

        {pacientes && pacientes.length ? (
            <>
                <h2 className="font-black text-3xl text-center">
                Listado Pacientes
                </h2>
    
                <p className="text-xl mt-5 mb-10 text-center">
                    Administra tus {''}
                    <span className="text-indigo-600 font-bold mb-10">Pacientes y citas</span>
                </p>
                
                {pacientes.map(paciente => (
                    <Paciente
                        key = {paciente.id}
                        paciente = {paciente}
                        setPaciente = {setPaciente}
                        eliminarPaciente = {eliminarPaciente}
                    />
                ))}
            </>
        ):(
            <>
            <h2 className="font-black text-3xl text-center">
                No hay pacientes
                </h2>
    
                <p className="text-xl mt-5 mb-10 text-center">
                    Comienza agregando pacientes {''}
                    <span className="text-indigo-600 font-bold mb-10">y aparecerán en este lugar</span>
                </p>
            </>
        )}


       


        
  

    </div>
  )
}

export default ListadoPacientes;