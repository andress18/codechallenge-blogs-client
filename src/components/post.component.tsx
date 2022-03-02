import React, { useEffect, useState } from 'react'
import Post from '../models/Post';
import * as Enums from '../enums';
import BaseRestService from '../service/base.rest.service';
import { Articulo } from './Articulos/articulo.component';
import { Accordion } from 'react-bootstrap';
import { Article } from '../models/Post';
import { EnumPermisosArticulo, EnumTipoServico } from '../enums';
import { useLocalStorage } from 'usehooks-ts';
import ModalArticulo from './Articulos/modalArticulo.component';
import '../fonts.css'
import CSS from 'csstype';
import config from '../config';

export const PostComponent: React.FC<{ tipoServicio: Enums.EnumTipoServico }> = ({ tipoServicio }) => {
    const [, setArticuloLocalStorage] = useLocalStorage<Article>('Articulo', new Article())
    const [accionArticulo, setAccionArticulo] = useLocalStorage('AccionArticulo', '')
    const [articulosLocalStorage, setArticulosLocalStorage] = useLocalStorage<Array<Article>>('ArticulosLocales', [])
    const [rutaPost, setRutaPost] = useState('')
    const [tituloPost, setTituloPost] = useState("")
    const [tituloModal, setTituloModal] = useState("")
    const [post, setPost] = useState<Post>(new Post(0, []));
    const [accionesPost, setAccionesPost] = useState<Array<EnumPermisosArticulo>>([])
    const [modalShow, setModalShow] = useState(false)
    const [postCambiado, setPostCambiado] = useState(false)

    const messageStyle: CSS.Properties = {
        fontFamily: 'Libre Baskerville, serif',
        fontSize: '25px'
    };

    const titleStyle: CSS.Properties = {
        fontFamily: 'DM Serif Display, serif',
        fontSize: '40px'
    };

    function ConfigurarEntorno() {
        switch (tipoServicio) {
            case Enums.EnumTipoServico.RemotePlus:
                setRutaPost(config.serverAPI)
                setTituloPost("Remote +")
                setAccionesPost([EnumPermisosArticulo.Leer])
                break;
            case Enums.EnumTipoServico.Remote:
                setRutaPost(config.gnewsAPI)
                setTituloPost("Remote")
                setAccionesPost([EnumPermisosArticulo.Leer])
                break;
            case Enums.EnumTipoServico.Local:
                setTituloPost("Locales")
                setAccionesPost([EnumPermisosArticulo.Leer, EnumPermisosArticulo.Crear,
                EnumPermisosArticulo.Editar, EnumPermisosArticulo.Eliminar])
                break;
            default: break;
        }
    }

    useEffect(() => {
        ConfigurarEntorno()
        if (tipoServicio === Enums.EnumTipoServico.Local)
            setPost(new Post(articulosLocalStorage.length, articulosLocalStorage));
        else {
            BaseRestService.get<Post>(rutaPost).then((rp) => {
                if (rp.Status) {
                    const data: Post = rp.Data;
                    setPost(new Post(data.totalArticles, data.articles))
                } else {
                    console.log("Messages: " + rp.Messages);
                    console.log("Exception: " + rp.Exception);
                    setPost(new Post(0, []))
                }
            })
        }
        return (() => {
            setArticuloLocalStorage(new Article())
        })
    }, [postCambiado, rutaPost])

    const AgregarArticuloLocal = () => {
        if (tipoServicio === Enums.EnumTipoServico.Local) {
            const art: Article = JSON.parse(localStorage.getItem('Articulo') ?? "")
            art.id = articulosLocalStorage.length;
            // setArticuloState(art)
            setArticuloLocalStorage(art)
            setArticulosLocalStorage([...articulosLocalStorage, art])
            setPostCambiado(!postCambiado)
        }
    }

    const onClickBtnArticulo = () => {
        if (tipoServicio === EnumTipoServico.Local) {
            const articuloLocalStorage: Article = JSON.parse(localStorage.getItem('Articulo') ?? '')
            if (articuloLocalStorage) {
                const accionArt: string = JSON.parse(localStorage.getItem('AccionArticulo') ?? '')
                setAccionArticulo(accionArt)
                const index = articulosLocalStorage.findIndex(a => a.id === articuloLocalStorage.id)
                if (accionArt === "Editar") {
                    setModalShow(true); setTituloModal("Editar")
                }
                else if (accionArt === "Eliminar") {
                    setModalShow(false)
                    articulosLocalStorage.splice(index, 1)
                    setArticulosLocalStorage(articulosLocalStorage)
                    setPostCambiado(!postCambiado)
                }
            }
        }
    }

    const onChangeArticulo = () => {
        if (tipoServicio === EnumTipoServico.Local) {
            const articuloLocalStorage: Article = JSON.parse(localStorage.getItem('Articulo') ?? '')
            if (articuloLocalStorage) {
                const index = articulosLocalStorage.findIndex(a => a.id === articuloLocalStorage.id)
                if (accionArticulo === "Editar") {
                    const nuevosArticulos = articulosLocalStorage
                    nuevosArticulos[index] = articuloLocalStorage
                    setArticulosLocalStorage(nuevosArticulos)
                } else { //crear articulo
                    AgregarArticuloLocal()
                }
                setPostCambiado(!postCambiado)
            }
        }
    }

    const OnClickCreateBtn = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        setArticuloLocalStorage(new Article())
        setAccionArticulo("Crear")
        setTituloModal("Crear")
        setModalShow(true)
    }


    return (<>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header style={titleStyle}>{tituloPost}
                    {accionesPost.some(e => e === EnumPermisosArticulo.Crear)
                        && <div onClick={OnClickCreateBtn} className="btn btn-outline-success mx-4" >Crear nuevo artículo</div>}
                </Accordion.Header>
                <Accordion.Body>
                    {post.articles && post.articles.length > 0
                        ? post.articles?.map((art, index) => <Articulo onChangeArticle={onClickBtnArticulo} id={index} articulo={art} key={art.url + new Date().toDateString()}
                            acciones={accionesPost} tipoServicio={tipoServicio} />)
                        : <p style={messageStyle}>No se han encontrado artículos</p>}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        {modalShow && <ModalArticulo key="ModalArticle" show={modalShow} onHide={() => { setModalShow(false) }} onSave={onChangeArticulo} titulo={tituloModal} />}
    </>
    )
}

export default PostComponent;