"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ShowForm = () => {
    const router = useRouter();
    const [formFields, setFormFields] = useState([]);

    useEffect(() => {
        // Récupérer les données du formulaire depuis localStorage
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            setFormFields(JSON.parse(savedFormData));
        }
    }, []);

    const handleEditForm = () => {
        // Redirige l'utilisateur vers la page CreateForm
        router.push('/createForm');
    };

    // Fonction pour rendre les champs du formulaire
    const renderFormField = (field) => {
        switch (field.type) {
            case 'text':
                return (
                    <div key={field.id} className="mb-4">
                        <label className="block label text-lg font-bold mb-2">
                            {field.label}
                        </label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                );
            case 'paragraph':
                return (
                    <div key={field.id} className="mb-4">
                        <label className="block label text-lg font-bold mb-2">
                            {field.label}
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                );
            case 'checkbox':
                return (
                    <div key={field.id} className="mb-4">
                        <label className="block label text-lg font-bold mb-2">
                            {field.label}
                        </label>
                        {field.options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input type="checkbox" id={`checkbox-${field.id}-${index}`} className="mr-2" />
                                <label htmlFor={`checkbox-${field.id}-${index}`} className="label text-sm">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            case 'multiple-choice':
                return (
                    <div key={field.id} className="mb-4">
                        <label className="block label text-lg font-bold mb-2">
                            {field.label}
                        </label>
                        {field.options.map((option, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input type="radio" name={`radio-${field.id}`} id={`radio-${field.id}-${index}`} className="mr-2" />
                                <label htmlFor={`radio-${field.id}-${index}`} className="label text-sm">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4">
            <form>
                {formFields.map(renderFormField)}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Soumettre
                </button>
                <Link href="/createForm" className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 ml-4">
                    Modifier
                </Link>
            </form>
        </div>
    );
};

export default ShowForm;
