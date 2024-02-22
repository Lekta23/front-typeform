import React from 'react';
import FormCreator from '@/components/FormCreator'; // Assurez-vous que le chemin est correct

const CreateFormPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Créer un nouveau formulaire</h1>
            <div className="flex justify-center">
                <FormCreator />
            </div>
        </div>
    );
};

export default CreateFormPage;
