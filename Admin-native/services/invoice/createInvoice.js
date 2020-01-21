//import to components/Orders/Order/index

export default (staff, data, addInvoice, deleteOrderById, method)=>{

    const {orderItems, orderPrice, _id} = data.order;

    const invoiceItems= orderItems.map((item)=>{
       return {title: item.title, price: item.price}
    });

    try {
        if (staff) {
            addInvoice({
                variables: {
                    invoiceItems: invoiceItems,
                    invoicePrice: orderPrice,
                    staff: staff,
                    paymentMethod: method,
                    created_at: new Date()
                }
            })
                .then((res) => deleteOrderById());
        }
    }
    catch (error) {
        console.log('ERROR gql in createInvoice', error)
    }
}