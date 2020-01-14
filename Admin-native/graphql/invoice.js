import {gql} from 'apollo-boost';

export const ADD_INVOICE=gql`
mutation AddInvoice($invoiceItems: [InvoiceItemInput]!, $invoicePrice: Float!, $staff: String!, $paymentMethod: String!, $created_at: String!){
    addInvoice(invoiceItems: $invoiceItems, invoicePrice: $invoicePrice, staff: $staff, paymentMethod: $paymentMethod, created_at: $created_at){
            id
         }   
    }
 `;



