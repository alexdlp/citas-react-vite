import {useState, useEffect} from 'react'
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
    
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false)

    useEffect(()=>{
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    },[paciente])
 

    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36)

        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // validación del formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            console.log('Hay al menos un campo vacío')
            setError(true)
            return;
        } 
        // pasamos la validación y eliminamos el error
        setError(false)

        // Creamos el objeto paciente para almacenar la información que viene del formulario via props
        //setPacientes(pacientes) esto no vale

        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
        }

        if(paciente.id){
            // Editando registro    
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id
                ? objetoPaciente : pacienteState)
            
            setPacientes(pacientesActualizados);
            setPaciente({});

        }else{
            // Nuevo registro

            //setPacientes([nombre, propietario, email, fecha, sintomas]) // lo puedo hacer así también

            //setPacientes(objetoPaciente) // haciéndolo de esta manera, delcaro el objetoPaciente en el state de App.
            // Pero si agregase otro usuario, no me machacaría el objetoPaciente previo. Por lo que solo habría un único 
            //usuario en el state siempre. Y lo que queremos es que haya un array de objetosPaciente. Para ello tenemos que 
            // tomar lo que ya hay, y añadir un nuevo elemento al arreglo.
            
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
            // limpiar el state
           
        }    

        // Reiniciar el formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }
    
  return (
    <div className='md:w-1/2 lg:w-3/5 mx-5'>
        <h2 className='font-black text-3xl text-center'>
            Seguimiento Pacientes
        </h2>

        <p className='text-lg mt-5 text-center mb-10'>
            Añade Pacientes y {''}
            <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>

        <form 
            onSubmit={handleSubmit}
            className='bg-white shadow-md rounded-lg py-10 px-5'
        >   
            {error && <Error/>}

            <div className='mb-5'>
                <label htmlFor ="mascota" className='block text-gray-700 uppercase font-bold'>
                    Nombre Mascota</label>

                <input
                    id = "mascota"
                    type = "text"
                    placeholder = "Nombre de la Mascota"
                    className='border-2 w-full p-2 mt-2 placeholder-violet-300 rounded-md'
                    // state y asignación del valor 
                    value = {nombre}
                    onChange = {(e)=> setNombre(e.target.value)}
            
                />

            </div>

            <div className='mb-5'>
                <label htmlFor ="propietario" className='block text-gray-700 uppercase font-bold'>
                    Nombre Propietario</label>

                <input
                    id = "propietario"
                    type = "text"
                    placeholder = "Nombre del propietario"
                    className='border-2 w-full p-2 mt-2 placeholder-violet-300 rounded-md'
                    // state y asignación del valor 
                    value = {propietario}
                    onChange = {(e)=> setPropietario(e.target.value)}
                />

            </div>

            <div className='mb-5'>
                <label htmlFor ="email" className='block text-gray-700 uppercase font-bold'>
                    Email
                </label>

                <input
                    id = "email"
                    type = "email"
                    placeholder = "Email del propietario"
                    className='border-2 w-full p-2 mt-2 placeholder-violet-300 rounded-md'
                    // state y asignación del valor 
                    value = {email}
                    onChange = {(e)=> setEmail(e.target.value)}
                />

            </div>

            <div className='mb-5'>
                <label htmlFor ="alta" className='block text-gray-700 uppercase font-bold'>
                    Alta
                </label>

                <input
                    id = "alta"
                    type = "date"             
                    className='border-2 w-full mt-2 p-2 placeholder-violet-300 rounded-md'
                    // state y asignación del valor 
                    value = {fecha}
                    onChange = {(e)=> setFecha(e.target.value)}
                />

            </div>

            <div className='mb-5'>
                <label htmlFor ="sintomas" className='block text-gray-700 uppercase font-bold'>
                    Sintomas
                </label>
                    
                <textarea
                    id = "Sintomas"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder = "Describe los síntomas"
                    // state y asignación del valor 
                    value = {sintomas}
                    onChange = {(e)=> setSintomas(e.target.value)}>
                        
                </textarea>

            </div>

            <input
                type = "submit"
                className='bg-indigo-600 w-full p-3 text-white uppercase font-bold
                hover:bg-indigo-700 cursor-pointer transition-all'
                value = {paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
            />
            
        </form>
    </div>
  )
}

export default Formulario