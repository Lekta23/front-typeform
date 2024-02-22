import React from 'react';
import ShowForm from '@/components/ShowForm';

const ShowFormPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Répondre au formulaire</h1>
            <div className="flex justify-center">
                <ShowForm />
            </div>
        </div>
    );
};

export default ShowFormPage;
