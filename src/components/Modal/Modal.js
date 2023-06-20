import { React, useState, useEffect } from 'react'
import './Modal.css';


export default function Modal({ isOpen, setModalOpen, saveModal, payload, index }) {

  const [desafio, setDesafio] = useState('')
  const [descricao, setDescricao] = useState('')
  const [materia, setMateria] = useState('')
  const [periodo, setPeriodo] = useState('')

  useEffect(() => {
    if (payload && index != null) {
      setDesafio(payload.desafio)
      setDescricao(payload.descricao)
      setMateria(payload.materia)
      setPeriodo(payload.periodo)
    }else{
      setDesafio('')
      setDescricao('')
      setMateria('')
      setPeriodo('')
    }
  }, [isOpen]);

  function closeModal(){
    setDesafio(null)
    setDescricao(null)
    setMateria(null)
    setPeriodo(null)

    setModalOpen()
  }


  function save() {
    let mockData = {
      desafio: desafio,
      descricao: descricao,
      materia: materia,
      periodo: periodo,
    }

    setDesafio(null)
    setDescricao(null)
    setMateria(null)
    setPeriodo(null)

    saveModal(mockData)
  }

  if (isOpen) {
    return (
      <div className='container-modal'>
        <div className='modal-card'>
          <p onClick={() => closeModal()} className='exit-button'>X</p>
          <div className='modal-form'>
            <input onChange={(event) => setDesafio(event.target.value)} value={desafio} placeholder='Desafio' className='input-modal' type="text" />
            <input onChange={(event) => setDescricao(event.target.value)} value={descricao} placeholder=' Descrição' className='input-modal' type="text" />
            <input onChange={(event) => setMateria(event.target.value)} value={materia} placeholder='Matéria' className='input-modal' type="text" />
            <input onChange={(event) => setPeriodo(event.target.value)} value={periodo} placeholder='Período' className='input-modal' type="text" />
          </div>
          <div className='button-div'>
            <button onClick={() => closeModal()} className='button-cancel'>Cancelar</button>
            <button onClick={() => save()} className='button-save'>Salvar</button>
          </div>
        </div>
      </div>
    )
  }
  return null
}
