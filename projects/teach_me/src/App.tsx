import { useState } from "react";
import { ItemSuggestion } from "./components/ItemSuggestion";
import { getHistoric, setHistoric } from "./storage/historic";
import { sendMessage } from "./api/openai";
import { FadeLoader } from "react-spinners";

type ProgressType = 'pending' | 'started' | 'done';

type Message = {
    /* role: 'user' | 'assistant' */
    role: 'user' | 'system'
    content: string
    subject?: string
}

function App() {
    const [progress, setProgress] = useState<ProgressType>('pending');
    const [textArea, setTextArea] = useState<string>('');
    const [chat, setChat] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmitChat() {
        if(!textArea) {return};

        const message = textArea;
        setTextArea('');

        if(progress === 'pending') {
            setHistoric(message);
            setProgress('started');

            const prompt = `Gere uma pergunta onde simule uma entrevista de emprego sobre ${message}, após essa pergunta enviarei a resposta e você me dará um feedback. O feedback precisa ser simples, objetivo e corresponder fielmente a resposta enviada. Após o feedback não existirá mais interação.`

            const messageGPT: Message = {
                role: 'user',
                content: prompt,
                subject: message
            }

            setChat(text => [...text, messageGPT]);

            setLoading(true)
            
            const questionGPT = await sendMessage([messageGPT])
            
            setChat(text => [...text, {role: 'system', content: questionGPT.content}]);
            
            setLoading(false)

            return;
        }

        const responseUser: Message = {
            role: 'user',
            content: message
        }

        setChat(text => [...text, responseUser]);
        setLoading(true)
        const feedbackGPT = await sendMessage([...chat, responseUser])
        setChat(text => [...text, {role: 'system', content: feedbackGPT.content}]);
        setLoading(false)
        setProgress('done');

    }
    
    function resetChat() {
        setProgress('pending');
        setChat([]);
    }

    let Start = () => {
        return (
        <section className="content">
            <span>Olá, eu sou o</span>
            <h1>teach<span className="pinkText">.me</span></h1>
            <p>Estou aqui para te ajudar nos seus estudos.</p>
            <p>Selecione um dos tópicos sugeridos ao lado ou digite um tópico que deseja estudar para começarmos.</p>
        </section>
    )}

    let Started = () => {return (<>
    <section className="chat">
    {
        chat[0] && (<h1>Você está estudando sobre <span className="pinkText">{chat[0].subject /*&lt;/&gt;*/}</span></h1>)
    }
    {
        chat[1] && (
        <div className="question">
            <h2>Pergunta</h2>
            <p>
                {chat[1].content}
            </p>
        </div>
        )
    }
    
    {
        chat[2] && (
        <div className="answer">
            <h2>Sua resposta</h2>
            <p>
                {chat[2].content}
            </p>
        </div>
        )
    }

    {
        chat[3] && (
        <div className="feedback">
            <h2>Feedback teach<span className="pinkText">.me</span></h2>
            <p>
                {chat[3].content}
            </p>
            <div>
                <button type="reset" onClick={resetChat}>Estudar novo tópico</button>
            </div>
        </div>
        )
    }
    {
        loading &&
        <div className="loaderContainer">
            <FadeLoader color="#fff"/>
        </div>
    }
    </section>
    </>)}

  return (
    <main>
        <aside>
            <details open>
                <summary>Tópicos sugeridos</summary>
                <ItemSuggestion title="HTML" onClick={() => progress !== 'started' ? setTextArea("HTML") : false}/>
                <ItemSuggestion title="CSS" onClick={() => progress !== 'started' ? setTextArea("CSS") : false}/>
                <ItemSuggestion title="JS" onClick={() => progress !== 'started' ? setTextArea("JS") : false}/>
                <ItemSuggestion title="TS" onClick={() => progress !== 'started' ? setTextArea("TS") : false}/>
            </details>
            <details open>
                <summary>Histórico</summary>
                {
                    getHistoric().map(item => (

                        <ItemSuggestion title={item} onClick={() => progress !== 'started' ? setTextArea(item) : false}/>
                    ))
                }
            </details>
        </aside>
        <section>
        {progress === 'pending' ? Start() : Started()}

    {
        progress !== 'done' && (
        <div id="prompt">
            <textarea value={textArea}  onChange={element => setTextArea(element.target.value)} itemType="text" name="text" id="text" placeholder={progress === 'started' ? "Insira sua resposta..." : "Insira o tema que deseja estudar..."} wrap="soft" spellCheck="true"/>
            <button type="submit" onClick={handleSubmitChat}>enviar</button>
        </div>
        )
    }

            <footer>
                <p>teach<span className="pinkText">.me</span></p>
            </footer>
        </section>
    </main>
  )
}

export default App