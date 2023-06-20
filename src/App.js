import './App.css';
import Modal from './components/Modal/Modal';
import { useState, useEffect } from 'react'
import pencil from './assets/imgs/pencil.svg'
import trash from './assets/imgs/trash.svg'

function App() {
  const [openModal, setOpenModal] = useState(false)
  const [tasks, setTasks] = useState()
  const [payload, setPayload] = useState()
  const [index, setIndex] = useState()

  useEffect(() => {
    let tasksHolder = JSON.parse(localStorage.getItem("tasks"))
    setTasks(tasksHolder)
    if (!tasksHolder) {
      setTasks([])
    }
  }, [tasks]);

  function saveTask(data) {
    if (index != null) {
      tasks[index] = data
    } else {
      tasks.push(data)
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setOpenModal(!openModal)
  }

  function newTask(){
    setIndex(null)
    setPayload(null)
    setOpenModal(true)
  }
  
  function deleteTask(index){
    tasks.splice(index,1)
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  return (
    <div className="container">
      <div className='card'>
        <div className='header'>
        <h1>Lista de desafios</h1>
        <button onClick={()=> newTask()}> + Novo desafio</button>
        </div>
        <table className='table'>
          <thead>
            <th>
              Desafios
            </th>
            <th>
              Descrição
            </th>
            <th>
              Matéria
            </th>
            <th>
              Período
            </th>
            <th>
              Ações
            </th>
          </thead>
          <tbody>
            {
              tasks && tasks.length ? tasks.map((el, index) => {
                return (
                  <tr>
                    <td>
                      {el.desafio}
                    </td>
                    <td>
                      {el.descricao}
                    </td>
                    <td>
                      {el.materia}
                    </td>
                    <td>
                      {el.periodo}
                    </td>
                    <td >
                      <div className='flex-td'>
                      <img onClick={() => { setPayload(el); setIndex(index); setOpenModal(true) }} src={pencil} alt="" />
                      <img onClick={() => { deleteTask(index); }} src={trash} alt="" />
                      </div>
                    </td>
                  </tr>
                )
              }) :
              <div>
                <p>Nenhuma tarefa encontrada!</p>
              </div>
            }
          </tbody>
        </table>
      </div>
      <Modal isOpen={openModal} index={index} payload={payload}  saveModal={(data) => { saveTask(data) }} setModalOpen={(res) => { setOpenModal(!openModal) }}> </Modal>
    </div>
  );
}

export default App;
