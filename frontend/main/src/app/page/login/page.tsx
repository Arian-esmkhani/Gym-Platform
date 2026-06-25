'use client'

import { useState } from "react";
import { AppButton } from "../../ui/button";
import { AppInput } from "../../ui/inpute-lable";
import { AuthRequest } from "../../types/auch";
import { useAuth } from "../../hooks/use-auch";
import Link from "next/link";

export default function Login() {
    const [formData, setFormData] = useState<AuthRequest>({
        username: '',
        password: '',
        rememberMe: false
    });

    const { login, loading: hookLoading } = useAuth();

        const handleChange = (value: string, field: keyof AuthRequest): void => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (): Promise<void> => {
        if (formData.username && formData.password) {
            await login(formData);
        }
    };

    return(
        <div className="mx-auto w-[76vw] h-164
        flex justify-center p-3 rounded-4xl mt-20 shadow-xl/30 opacity-65
        hover:opacity-78 hover:rounded-[55px]
        bg-linear-to-r from-gray-800/40 to-amber-200/50
        dark:bg-linear-to-r dark:from-gray-600 dark:to-gray-950
        transition-all duration-500">
            <div className="p-14 flex flex-col">
                <div className="ml-13 sm:ml-19 text-black/50">
                    <span className="p-1 font-medium">login
                        <h6 className="text-3xl font-bold">BATIS</h6></span>
                </div>
                <div className="py-16">
                    <div className="pt-6">
                        <span className="text-sm/5 font-serif font-light p-1">Username</span>
                        <AppInput
                        onChange={(value) => handleChange(value, 'username')}
                        value={formData.username}/>
                    </div>
                    <div className="pt-9">
                        <span className="text-sm/5 font-serif font-light p-1">Password</span>
                        <AppInput
                        onChange={(value) => handleChange(value, 'password')}
                        value={formData.password}
                        type="password"/>
                    </div>
                </div>
                <AppButton className="mx-1" size="lg" onClick={handleSubmit}>SUBMIT</AppButton>                
                <span className="pt-8 pl-3">Have not accent?<Link href="/page/signup" className="text-cyan-900">  sign up!</Link></span>
            </div>
        </div>
    )
}