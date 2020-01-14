//import to components/Orders/Order/index
export default (data, addInvoice, deleteOrderById, method)=>{

    const {staff, orderItems, orderPrice, id} = data.order;

    const invoiceItems= orderItems.map((item)=>{
       return {title: item.title, price: item.price}
    });

    try {
        addInvoice({
            variables: {
                invoiceItems: invoiceItems,
                invoicePrice: orderPrice,
                staff: staff.id,
                paymentMethod: method,
                created_at: new Date()
            }
        })
            .then((res) => deleteOrderById());
    }
    catch (error) {
        console.log('ERROR gql in createInvoice', error)
    }
}