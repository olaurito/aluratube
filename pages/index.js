import config from "../config.json";
import styled from "styled-components";
import Index from "../src/components/Menu";
import {StyledTimeline} from "../src/components/Timeline";
import React from "react";
import {videoService} from "../src/services/videoService";


function HomePage() {
    const service = videoService();
    // const mensagem = "Bem vindo ao AluraTube!";
    const estilosDaHomePage = {
        // backgroundColor: "red"
    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState(""); /* re-executar as funcções para mudar a pagina e salvar numa variavel valro da busca */

    /* const playlists = {
         "jogos": [],
     };*/

    //config.playlists
    const [playlists, setPlaylists] = React.useState({jogos: []});

    React.useEffect(() => {

        service.getAllVideos()
            .then((dados) => {
                console.log(dados.data);
                //Forma imutavel
                const novasPlaylists = {...playlists};
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist]?.push(video);
                })
                setPlaylists(novasPlaylists);
            });

    }, []); //efeito colateral, algum dado mudar, roda o useffect


    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                /* Prop Drilling */
                <Index valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header/>
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
                    Conteúdo
                </Timeline>
            </div>
        </>
    )
}

export default HomePage

/*function Menu() {
    return (
        <div>
            Menu
        </div>
    )
}*/

const StyleHeader = styled.div`

background-color:${(theme) => theme.backgroundLevel1} ;

img{
    width: 80px;
    height: 80px;
    border-radius
}

.user-info{
display: flex; align-items:center; width: 100%; padding: 16px 32px; gap:18px ;
}

`;
const StyleBanner = styled.div`
background-color: blue; height: 230px;
background-image: url(${({bg}) => bg});
`;

function Header() {
    return (
        <StyleHeader>
            <StyleBanner bg={config.bg}/>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`}/>
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyleHeader>
    )
}

function Timeline({searchValue, ...props}) {
    // console.log("Dentro do componente", props.playlists);
    const playlistNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map(playlistName => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb}/>
                                            <span>
                        {video.title}
                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}