import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { bookingId } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { isPending, data: bookingInfo = {} } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: async () => {
           const res = await axiosSecure.get(`/bookings/${bookingId}`);
            return res.data;
        }
    });

    if (isPending) {
        return <span className="loading loading-bars loading-lg"></span>;
    }
    // console.log(bookingInfo)

    const amount = bookingInfo.price;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });

        if (error) {
            console.error(error);
            setError(error.message);
        } else {
            console.log('PaymentMethod created:', paymentMethod);
            setError('');
        }
        if (error) {
            setError(error.message);
        } else {
            setError('');

            // Step 2: Create Payment Intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                bookingId
            });

            const clientSecret = res.data.clientSecret;

            // Step 3: Confirm Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    const transactionId = result.paymentIntent.id;

                    // Step 4: Save Payment History + Mark Booking as Paid
                    const paymentData = {
                        bookingId,
                        email: user.email,
                        amount,
                        transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    };

                   const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if (paymentRes.data.insertedId) {
                        await Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Bookings'
                        });

                        navigate('/dashboard/my-bookings');
                    }
                }
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-2 border rounded" />
                <button type="submit" className="btn btn-primary text-black w-full" disabled={!stripe}>
                    Pay ${amount}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
