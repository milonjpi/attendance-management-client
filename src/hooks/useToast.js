import { useState } from 'react';

const useToast = () => {
    const [toast, setToast] = useState({
        open: false,
        variant: 'success',
        placement: { vertical: 'top', horizontal: 'right' },
        message: 'Success Message',
        duration: 3000
    });
    const myToast = (data) => {
        setToast({ ...toast, ...data });
    };
    return { toast, myToast };
};

export default useToast;
