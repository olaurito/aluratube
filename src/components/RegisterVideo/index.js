import React from "react";
import {StyledRegisterVideo} from "./styles";
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

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "Frost Punk", url: "http://youtube..."}
    });
    const [formVisivel, setFormVisivel] = React.useState(true);
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
            <button  className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadores de Curto-circuito */}
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);
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