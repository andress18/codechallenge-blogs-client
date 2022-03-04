import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { Article } from '../../models/Post'
import '../../fonts.css'
import CSS from 'csstype';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface Props {
    onSave: () => void,
    textBtnSave: string,
}

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/

const schema = yup.object().shape({
    title: yup.string().min(10, 'Debe contener al menos 10 caracteres').required('Este campo es obligatorio'),
    description: yup.string().min(10).required(),
    content: yup.string().min(50, 'Debe contener al menos 50 caracteres'),
    image: yup.string().required(),
    url: yup.string().matches(
        urlRegex,
        'Debe ingresar una URL válida'
    ).required(),
    source: yup.object().shape({
        name: yup.string().min(3, 'Debe contener al menos 3 caracteres'),
        url: yup.string().matches(
            urlRegex,
            'Debe ingresar una URL válida'
        ).required()
    }),
    publishedAt: yup.date().required(),
}).required();

const ArticuloForm: React.FC<Props> = (props: Props) => {
    const [articulo, setArticulo] = useLocalStorage<Article>('Articulo', new Article())
    const { handleSubmit, register, formState: { errors } } = useForm<Article>({
        resolver: yupResolver(schema), // yup, joi and even your own.
    });

    const id = articulo.id

    const titleStyle: CSS.Properties = {
        fontFamily: 'DM Serif Display, serif',
        fontSize: '20px'
    };

    const onSubmit = (data: Article) => {
        data.id = id
        setArticulo(data)
        props.onSave()
    };

    useEffect(() => {
        const articleLocalStorage = JSON.parse(localStorage.getItem('Articulo') ?? '')
        articleLocalStorage && setArticulo(articleLocalStorage)
    }, [])


    const mensajeError = "Este campo es requerido"

    return (
        <div className='container mt-3'>
            <Form className='row border border-2' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="m-2 col-md-12 col-sm-12" controlId="articuloForm.Title">
                    <Form.Label style={titleStyle}>Título</Form.Label>
                    <Form.Control type="text" placeholder="Título del artículo" defaultValue={articulo.title} {...register("title")} autoFocus={true} />
                    {errors.title && ErrorText(errors.title.message ?? "")}
                </Form.Group>
                <Form.Group className="m-2 col-md-12 col-sm-12" controlId="articuloForm.Description">
                    <Form.Label style={titleStyle}>Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Descripción del artículo" defaultValue={articulo.description} {...register("description")} />
                    {errors.description && ErrorText("Debe contener al menos 10 caracteres")}
                </Form.Group>
                <Form.Group className="m-2 col-md-12 col-sm-12" controlId="articuloForm.Url">
                    <Form.Label style={titleStyle}>Url fuente de la noticia original</Form.Label>
                    <Form.Control type="text" placeholder="URL del artículo" defaultValue={articulo.url} {...register("url")} />
                    {errors.url && ErrorText("Este campo debe contener una URL válida")}
                </Form.Group>
                <Form.Group className="m-2 col-md-12 col-sm-12" controlId="articuloForm.Url">
                    <Form.Label style={titleStyle}>Url de imagen del artículo</Form.Label>
                    <Form.Control type="text" placeholder="URL de la imagen del artículo" defaultValue={articulo.image} {...register("image")} />
                    {errors.image && ErrorText(mensajeError)}
                </Form.Group>
                <Form.Group className="m-2 col-lg-5 col-xl-5 col-sm-4" controlId="articuloForm.DatePublished">
                    <Form.Label style={titleStyle}>Fecha Publicación</Form.Label>
                    <Form.Control type="date" placeholder="Fecha de publicación" defaultValue={new Date(articulo?.publishedAt).toISOString().split('T')[0]}  {...register("publishedAt")} />
                    {/* <Form.Control type="text" placeholder="Fecha de publicación" defaultValue={articulo?.publishedAt?.toString()} {...register("publishedAt")} /> */}
                    {errors.publishedAt && ErrorText("Formato de fecha debe ser yyyy-mm-dd")}
                </Form.Group>
                <Form.Group className="m-2 col-md-6 col-sm-12" controlId="articuloForm.Source">
                    <Form.Label style={titleStyle}>Source Name</Form.Label>
                    <Form.Control type="text" placeholder="Quien provee esta información" defaultValue={articulo.source?.name} {...register("source.name")} />
                    {errors.source?.name && ErrorText(mensajeError)}
                </Form.Group>
                <Form.Group className="m-2 col-md-12 col-sm-12" controlId="articuloForm.UrlSource">
                    <Form.Label style={titleStyle}>Source URL</Form.Label>
                    <Form.Control type="text" placeholder="URL del proveedor" defaultValue={articulo.source?.url} {...register("source.url")} />
                    {errors.source?.url && ErrorText(errors?.source?.url?.message ?? "")}
                </Form.Group>
                <Form.Group className="m-2 col-md-12 col-sm-12" controlId="articuloForm.Content">
                    <Form.Label style={titleStyle}>Contenido</Form.Label>
                    <Form.Control as="textarea" rows={6} defaultValue={articulo.content} {...register("content")} />
                    {errors.content && ErrorText(mensajeError)}
                </Form.Group>
                <Button type='submit' style={titleStyle}>{props.textBtnSave} artículo</Button>
            </Form>
        </div>
    )
}

const ErrorText = (texto: string) => <span className="text-danger">{texto}</span>

export default ArticuloForm