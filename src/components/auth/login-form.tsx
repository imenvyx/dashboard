"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth";
import { useState } from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { AuthStoreType } from "@/types";

// Validation schema with Zod
const formSchema = z.object({
    email: z.string().email({
        message: "Por favor ingresa un email válido",
    }),
    password: z.string().min(1, {
        message: "La contraseña es requerida",
    }),
});

export function LoginForm() {
    const router = useRouter();
    const { login } = useAuthStore() as AuthStoreType;
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form configuration with react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Form submit function
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        setError(null);

        try {
            // Authentication attempt
            const success = login(values.email, values.password);

            if (success) {
                // Redirect to dashboard after successful login
                router.push("/");
            } else {
                setError("Credenciales incorrectas. Por favor intenta de nuevo.");
            }
        } catch {
            setError("Ocurrió un error inesperado. Por favor intenta más tarde.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-center">Inicio de Sesión</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="technology@kameleonlabs.ai"
                                            {...field}
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="#4nrsHSre1#@uPC$3ZR8"
                                            {...field}
                                            autoComplete="current-password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between">
                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Iniciando sesión...
                                    </span>
                                ) : (
                                    "Iniciar sesión"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <p>Credenciales de prueba:</p>
                    <p className="font-medium">Email: technology@kameleonlabs.ai</p>
                    <p className="font-medium">Contraseña: #4nrsHSre1#@uPC$3ZR8</p>
                </div>
            </CardContent>
        </Card>
    );
}
