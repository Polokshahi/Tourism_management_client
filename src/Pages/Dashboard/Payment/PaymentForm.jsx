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
    const [processing, setProcessing] = useState(false);

    // Fetch booking
    const { isPending, data: bookingInfo = {} } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${bookingId}`);
            return res.data;
        }
    });

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-40">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    const amount = bookingInfo?.price || 0;
    const amountInCents = Math.round(amount * 100);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setProcessing(true);
        setError('');

        try {
            // 1. Create Payment Method
            const { error: stripeError } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (stripeError) {
                setError(stripeError.message);
                setProcessing(false);
                return;
            }

            // 2. Create Payment Intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                bookingId,
            });

            const clientSecret = res.data.clientSecret;

            // 3. Confirm Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                setProcessing(false);
                return;
            }

            // 4. Success
            if (result.paymentIntent.status === 'succeeded') {
                const transactionId = result.paymentIntent.id;

                const paymentData = {
                    bookingId,
                    email: user.email,
                    amount,
                    transactionId,
                    paymentMethod: 'card',
                };

                const paymentRes = await axiosSecure.post('/payments', paymentData);

                if (paymentRes.data.insertedId) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `<strong>Transaction ID:</strong><br/><code>${transactionId}</code>`,
                        confirmButtonText: 'Go to My Bookings',
                    });

                    navigate('/dashboard/my-bookings');
                }
            }

        } catch (err) {
            setError('Something went wrong!');
            console.error(err);
        }

        setProcessing(false);
    };

    // Stripe not ready guard
    if (!stripe || !elements) {
        return (
            <div className="flex justify-center items-center h-40">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-white p-6 rounded-xl shadow-md w-full max-w-md"
            >

                <h2 className="text-xl font-semibold text-center">
                    Complete Payment
                </h2>

                {/* Amount */}
                <p className="text-center text-gray-600">
                    Pay <span className="font-bold">${amount}</span>
                </p>

                {/* Stripe Card */}
                <div className="p-3 border rounded bg-white">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#111',
                                    '::placeholder': {
                                        color: '#aaa',
                                    },
                                },
                                invalid: {
                                    color: '#fa755a',
                                },
                            },
                        }}
                    />
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}

                {/* Button */}
                <button
                    type="submit"
                    disabled={processing}
                    className="btn btn-primary w-full text-black"
                >
                    {processing ? 'Processing...' : `Pay $${amount}`}
                </button>

            </form>

        </div>
    );
};

export default PaymentForm;