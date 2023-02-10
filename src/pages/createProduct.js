import { Layout } from "../components/Layout";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function CreateProductPage() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data)=> {
        //console.log('Data', data)
        await axios.post('/api/products', {
            data
        }).then(function (response) {
            console.log(response)
        }).catch(function(error){
            console.log(error)
        })
    }
    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">Title</label>
                <input {...register('title', {required: true } )} />
                
                <label htmlFor="">Slug</label>
                <input {...register('slug', {required: true } )} />
                
                <label htmlFor="">Description</label>
                <input {...register('description', {required: true } )} />
                
                <label htmlFor="">Price</label>
                <input {...register('price', {required: true } )} />
                
                <label htmlFor="">Rating</label>
                <input {...register('rating', {required: true } )} />
                {errors && <p>An error has ocurred</p>}
                
                <label htmlFor="">Brand</label>
                <input {...register('brand', {required: true } )} />
                
                <label htmlFor="">Category</label>
                <input {...register('category', {required: true } )} />
                
                <label htmlFor="">Thumbnail</label>
                <input {...register('thumbnail', {required: true } )} />
                
                <label htmlFor="">Image</label>
                <input {...register('image', {required: true } )} />
                
                <input type='submit' />
                
            </form>
        </Layout>
    )
}