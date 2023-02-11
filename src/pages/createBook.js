import { Layout } from "../components/Layout";
import { useForm } from "react-hook-form";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

import { useEffect } from "react";

export default function CreateBookPage({sessionInfo}) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    useEffect( () => {
        
         console.log('Front end:', sessionInfo)
            
    }, [])

    const onSubmit = async (data)=> {
        console.log('Data', data)
        
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="">Title</label>
                    <input {...register('title', {required: true } )} />
                </div>
                {errors.title && <p>The title is required</p>}

                <button className="primary-button">
                    Save
                </button>
                                
            </form>
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const session = await getServerSession(context.req, context.res, authOptions)
    
    if (session?.user.isAdmin) {
        return { props: { sessionInfo: JSON.parse(JSON.stringify(session)),},}
    } else if (session) {
        return { redirect: { destination: '/accessDenied', permanent: false, } }
    } else {
        return { redirect: { destination: '/login', permanent: false, } }
    } 
}