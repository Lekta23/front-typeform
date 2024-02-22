"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArrowUp from '@/assets/up.svg';
import ArrowDown from '@/assets/down.svg';

export default function FormCreator() {
    const router = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const [formFields, setFormFields] = useState([]);


    useEffect(() => {
        // Récupérer les données du formulaire depuis localStorage
        const savedFormData = localStorage.getItem('formData');
        if (savedFormData) {
            setFormFields(JSON.parse(savedFormData));
        }
    }, []);

    const handleAddClick = () => {
        setShowMenu(!showMenu);
    };

    const addFormField = (type) => {
        const newField = {
            id: Date.now(),
            type,
            label: '',
            options: (type === 'checkbox' || type === 'multiple-choice') ? [''] : []
        };
        setFormFields([...formFields, newField]);
        setShowMenu(false);
    };

    const removeFormField = (id) => {
        setFormFields(formFields.filter(field => field.id !== id));
    };

    const updateFieldLabel = (id, label) => {
        setFormFields(formFields.map(field =>
            field.id === id ? { ...field, label } : field
        ));
    };

    const addOption = (fieldId) => {
        setFormFields(formFields.map(field =>
            field.id === fieldId ? { ...field, options: [...field.options, ''] } : field
        ));
    };

    const updateOption = (fieldId, optionIndex, value) => {
        setFormFields(formFields.map(field =>
            field.id === fieldId ? {
                ...field,
                options: field.options.map((option, index) => index === optionIndex ? value : option)
            } : field
        ));
    };

    const moveField = (index, direction) => {
        const newPosition = index + direction;
        if (newPosition < 0 || newPosition >= formFields.length) return; // Vérifie les limites du tableau

        const newFormFields = [...formFields];
        const itemMoved = newFormFields.splice(index, 1)[0]; // Retire l'élément du tableau
        newFormFields.splice(newPosition, 0, itemMoved); // Insère l'élément à la nouvelle position

        setFormFields(newFormFields);
    };

    const buttons = (field, index) => {
        return (
            <div>
                <button
                    onClick={() => removeFormField(field.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded-full float-right"
                >
                    Supprimer
                </button>
                {index !== formFields.length - 1 && (
                    <button
                        onClick={() => moveField(index, 1)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-2 mb-4 rounded-full float-right"
                    >
                        <ArrowDown
                            alt="Down Arrow"
                            className="arrow"
                            width={24}
                            height={24}
                        />
                    </button>
                )}
                {index !== 0 && (
                    <button
                        onClick={() => moveField(index, -1)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-2 mb-4 rounded-full float-right"
                    >
                        <ArrowUp
                            alt="Up Arrow"
                            className="arrow"
                            width={24}
                            height={24}
                        />
                    </button>
                )}
            </div>
        );
    };

    const renderFormField = (field, index) => {
        switch (field.type) {
            case 'text':
            case 'paragraph':
                return (
                    <div key={field.id} className="mt-4">
                        <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                            placeholder="Nom du champ"
                        />
                        {field.type === 'text' && <input type="text" className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Texte" disabled />}
                        {field.type === 'paragraph' && <textarea className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Paragraphe" disabled></textarea>}
                        {field.id < formFields.length - 1 && <div className="divider"></div>}
                        {buttons(field, index)}
                    </div>
                );
            case 'checkbox':
            case 'multiple-choice':
                return (
                    <div key={field.id} className="mt-4">
                        <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full"
                            placeholder="Nom du champ"
                        />
                        {field.options.map((option, index) => (
                            <div key={index} className="flex items-center mt-1">
                                <input
                                    type={field.type === 'checkbox' ? 'checkbox' : 'radio'}
                                    className="mr-2"
                                    name={field.label}
                                />
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => updateOption(field.id, index, e.target.value)}
                                    className="p-2 border border-gray-300 rounded w-full"
                                    placeholder={`Option ${index + 1}`}
                                />
                            </div>
                        ))}
                        <button
                            onClick={() => addOption(field.id)}
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                        >
                            Ajouter une option
                        </button>
                        {field.id < formFields.length - 1 && <div className="divider"></div>}
                        {buttons(field, index)}
                    </div>
                );
            default:
                return null;
        }
    };

    const saveForm = () => {
        const formData = JSON.stringify(formFields);
        localStorage.setItem('formData', formData);

        // Rediriger vers la page d'affichage du formulaire
        router.push('/showForm');
    };

    return (
        <div className="container w-full mx-auto p-4">

            {/* Zone de formulaire */}
            <div id="form-area">
                {formFields.map(renderFormField)}
                <button onClick={saveForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                    Sauvegarder et Afficher le Formulaire
                </button>
            </div>

            {/* Bouton et menu déroulant */}
            <div className="fixed bottom-10 mx-auto right-20">
                <button
                    onClick={handleAddClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full float-right"
                >
                    +
                </button>

                {showMenu && (
                    <div>
                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="mt-2 py-2 w-full bg-white rounded-lg shadow-xl">
                                        <a href="#" onClick={() => addFormField('text')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Texte</a>
                                        <a href="#" onClick={() => addFormField('paragraph')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Paragraphe</a>
                                        <a href="#" onClick={() => addFormField('checkbox')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Checkbox</a>
                                        <a href="#" onClick={() => addFormField('multiple-choice')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Choix multiple</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
