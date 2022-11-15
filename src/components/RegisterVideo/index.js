import React from "react";
import {StyledRegisterVideo} from "./styles";
import {createClient} from "@supabase/supabase-js";
//Whiteboarding - sentar o time e discutir a solução antes de fazer
//Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.value
            setValues({
                ...values,
                name: value,
            });
        },
        clearForm() {
            setValues({})
        }
    };
}

const PROJECT_URL = "https://fopcsuwtdbaxyryfnquv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvcGNzdXd0ZGJheHlyeWZucXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTI5MDYsImV4cCI6MTk4Mzc4ODkwNn0.UTE_UvzwSCWnmD8XYzyspT2-qZZOzvjgPh4wtnlSoMw";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

//get youtube thumbnail from video url
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=1")[1]}/hqdefault.jpg`
}

//get youtube video id
// function getVideoId(url) {
//     const videoId = url.split("v="[1]);
//     const ampersandPosition = videoId.indexOf("&");
//     if (ampersandPosition !== -1) {
//         return videoId.substring(0, ampersandPosition);
//     }
//     return videoId;
// }

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "Frost Punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk"}
    });
    const [formVisivel, setFormVisivel] = React.useState(true);

    console.log(); // ########## parei no minuto 37:20 - https://www.alura.com.br/imersao-react/aula05-useeffect-supabase
    /*
    ## O que precisamos para o form funcionar?
    - pegar os dados, que precisam vir do state
         - titulo
         - url do video
    - precismaos ter um onSubmit do nosso form
    - limpar o form após o submit
     */
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);

                        //contrato entre o nosso front e o back-end
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                        })
                            .then((oqueveio) => {
                                console.log(oqueveio);
                            })
                            .catch((err) => {
                                console.log(err);
                            })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                            <input
                                placeholder="TItulo do Vídeo"
                                name="titulo"
                                values={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input
                                placeholder="URL"
                                name="url"
                                values={formCadastro.values.url}
                                onChange={formCadastro.handleChange}

                            />
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                )
                : false}

        </StyledRegisterVideo>
    )
}

//[X] Falta o botão para add
//[X] modal
// [X]-> Precisamos controlar o state
// -> Formulário em si