import React, { useState, useEffect, useRef } from 'react';
import Aviso from './Imagens/aviso.png';

function App() {
  // Variáveis de estado
  const [userInput, setUserInput] = useState(''); // Estado para a entrada do usuário
  const [selectedPost, setSelectedPost] = useState(null); // Estado para o post selecionado
  const [postData, setPostData] = useState(null); // Estado para os dados obtidos da API
  const [warningMessage, setWarningMessage] = useState(null); // Estado para a mensagem de aviso
  const buttonRef = useRef(null); // Referência para o botão

  // Hook useEffect para buscar dados quando selectedPost muda
  useEffect(() => {
    const PostLink = async () => {
      try {
        console.log('Chamando fetchPostLink com selectedPost:', selectedPost);
        setPostData(null); // Limpa os dados anteriores
        const response = await fetch(`http://127.0.0.1:5000/post/${selectedPost}`);
        console.log('Response:', response);
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error('Erro ao buscar link da API:', error);
      }
    };

    // Busca dados apenas se selectedPost não for nulo
    if (selectedPost !== null) {
      PostLink();
    }

  }, [selectedPost]); // Adiciona selectedPost como dependência do useEffect

  // Manipulador de evento para a mudança na entrada do usuário
  const InputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Manipulador de evento para o clique no botão
  const ButtonClick = () => {
    switch (userInput.toLowerCase()) {
      case '1':
        console.log('Post1 selecionado');
        setSelectedPost('1');
        setWarningMessage(null);
        break;
      case '2':
        console.log('Post2 selecionado');
        setSelectedPost('2');
        setWarningMessage(null);
        break;
      case '3':
        console.log('Post3 selecionado');
        setSelectedPost('3');
        setWarningMessage(null);
        break;
      case '4':
        console.log('Post4 selecionado');
        setSelectedPost('4');
        setWarningMessage(null);
        break;
      default:
        console.log('Opção inválida');
        setWarningMessage('Aviso!!!');
        setSelectedPost(null);
        setPostData(null);
    }
  };

  const KeyPress = (e) => {
    if (e.key === 'Enter') {// Verifica se a tecla pressionada é "Enter"
      ButtonClick();
    }
  };

  return (
    <div className='container'>
      <div className="container1">
        <div className="jumbotron">
          <p className="Text">Test Post Json</p>
        </div>
        <div className="card">
          <div className="card-header">
            Selecione o Post Desejado
          </div>
        </div>
        <div className="selec">
          <input
            type="text"
            placeholder="Digite algo..."
            value={userInput}
            onChange={InputChange}
            onKeyPress={KeyPress}
          />
          <button ref={buttonRef} onClick={ButtonClick}>Selecionar</button>
        </div>
      </div>

      <div className="container2">
        {postData && (<div className='Text1'>
          <p>
            <strong>Post</strong> {postData.Personagem.id}
          </p>
        </div>)}
        <div className="post">
          <div>
            {warningMessage && (
              <div className="warning">
                <h1>
                  <img src={Aviso} alt="Descrição da imagem" style={{ width: '20px', height: '20px' }} />
                </h1>
                <p>
                  <strong>{warningMessage}</strong>
                </p>
                <p>
                  Selecione entre 1, 2, 3 ou 4
                </p>
              </div>
            )}
            {postData && (<div className="link">
              <p>
                <strong>Classe:</strong> {postData.Personagem.classe}
              </p>
              <p>
                <strong>Arma:</strong> {postData.Personagem.arma}
              </p>
              <p>
                <strong>Coments do ID:</strong> {postData.Comentarios.id}
              </p>
              <p>
                <strong>Habilidade Inicial:</strong> {postData.Comentarios["Habilidade Inicial"]}
              </p>
              <p>
                <strong>Habilidade Avançada:</strong> {postData.Comentarios["Habilidade Avançada"]}
              </p>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App