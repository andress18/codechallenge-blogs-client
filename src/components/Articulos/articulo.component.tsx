import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useLocalStorage } from 'usehooks-ts';
import { EnumPermisosArticulo, EnumTipoServico } from '../../enums';
import { Article } from '../../models/Post';
import CSS from 'csstype';
import '../../fonts.css'
import BaseLocalStorageService from '../../service/base.localStorage.service';

interface ArticuloProps {
    id: number, articulo: Article, acciones: Array<EnumPermisosArticulo>, tipoServicio: EnumTipoServico,
    onChangeArticle: () => void
}

export const Articulo: React.FC<ArticuloProps> = ({ acciones, articulo, id, tipoServicio, onChangeArticle }) => {
    const [, setArticuloLocalStorage] = useLocalStorage('Articulo', new Article())
    const [articulosLocales, setArticulosLocales] = useLocalStorage<Array<Article>>('ArticulosLocales', [])
    const [, setAccionArticulo] = useLocalStorage<string>('AccionArticulo', '')
    const [imageValid, setImageValid] = useState(false)

    const titleStyle: CSS.Properties = {
        fontFamily: 'DM Serif Display, serif',
        fontSize: '40px'
    };
    const descriptionStyle: CSS.Properties = {
        fontFamily: 'Libre Baskerville, serif',
        fontSize: '25px'
    };
    const contentStyle: CSS.Properties = {
        fontFamily: 'EB Garamond, serif',
        fontSize: '18px'
    };

    const sourceStyle: CSS.Properties = {
        fontFamily: 'Libre Baskerville, serif',
        fontSize: '15px'
    };



    useEffect(() => {
        if (articulosLocales.length > 0)
            setArticulosLocales(BaseLocalStorageService.get<Array<Article>>('ArticulosLocales'))
        setArticuloLocalStorage(BaseLocalStorageService.get<Article>('Articulo'))
        articulo.id = id
        setArticuloLocalStorage(articulo)
        ValidarImagen()
    }, [tipoServicio])


    const ValidarImagen = () =>
        fetch(articulo.image).then(res => {
            setImageValid(res.status === 200 && articulo.image.match(/^http[^?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);
        }).catch(() => setImageValid(false))


    const onClickDeleteBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if (tipoServicio === EnumTipoServico.Local) {
            setAccionArticulo('Eliminar')
            setArticuloLocalStorage(articulo)
            onChangeArticle()
        }
    }
    const onClickEditBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        if (tipoServicio === EnumTipoServico.Local) {
            setAccionArticulo('Editar')
            setArticuloLocalStorage(articulo)
            onChangeArticle()
        }
    }


    return (<>
        <div className='d-flex flex-row flex-wrap flex-sm-wrap flex-xl-nowrap flex-lg-wrap justify-content-center my-2 border border-bottom'>
            {imageValid ?
                <div key={articulo.image} className="col-md-12 col-sm-12 col-lg-12 col-xl-6 text-center mb-3">
                    <img src={articulo.image} alt={articulo.title} className="h-100 w-75" />
                </div> : <></>}
            <div key={articulo.title} className="mb-3 align-content-center col-xl-6">
                <h2 className="display-5" style={titleStyle} >{articulo.title}</h2>
                <p className="lead" style={descriptionStyle}>{articulo.description}</p>
                <p className="mx-2" style={sourceStyle}> by <a href={articulo.source.url} style={sourceStyle} className='mx-2 link'> {articulo.source.name}</a> at {new Date(articulo.publishedAt).toLocaleDateString()}</p>
                <p className="lead" style={contentStyle}>{articulo.content} <a href={articulo.url} className='link'>ver mas</a></p>
                {acciones.some(e => e === EnumPermisosArticulo.Editar)
                    && <Button onClick={onClickEditBtn} style={descriptionStyle} variant="outline-warning m-2" size="sm">Editar artículo</Button>}
                {acciones.some(e => e === EnumPermisosArticulo.Eliminar)
                    && <Button variant="outline-danger m-2" style={descriptionStyle} onClick={onClickDeleteBtn}>Eliminar artículo</Button>}
            </div>
        </div>
    </>
    )
}