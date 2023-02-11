import { Layout } from "../components/Layout";
import { useForm } from "react-hook-form";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

import { useEffect } from "react";

export default function CreateBookPage({sessionInfo}) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    //console.log(data)
    useEffect( () => {
        
                console.log('Front end:', sessionInfo)
            
        }, [])

    const onSubmit = async (data)=> {
        //console.log('Data', data)
        
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">Title</label>
                <input {...register('title', {required: true } )} />                
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