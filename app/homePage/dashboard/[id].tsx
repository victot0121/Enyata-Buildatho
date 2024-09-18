

import React from 'react';
import { useRouter } from 'next/router';

const ProposalDetail = () => {
    const router = useRouter();
    const { id } = router.query; // Extract the dynamic route parameter

    console.log(id); // Log the dynamic ID


    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Proposal Details</h1>
            <p>Displaying details for proposal ID: {id}</p>
        </div>
    );
};

export default ProposalDetail;
