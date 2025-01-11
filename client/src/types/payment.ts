export type PaymentMethod = 'card' | 'apple';

export interface CardDetails {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

export interface PaymentFormData {
  paymentMethod: PaymentMethod;
  cardDetails?: CardDetails;
} 