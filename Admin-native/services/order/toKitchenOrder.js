//import to components/Orders/Orders/index
export default (staff, data, updateOrder)=>{

    const {_id, table, orderItems, newOrderItems, orderPrice, created_at, completed} = data.order;

    orderItems.forEach((item)=>{
        if(item.__typename){delete item.__typename}
        item.ingredients=(item.ingredients).map((i)=>{if(i._id){return i._id}else{return i}});
        item.additionalIngredients=(item.additionalIngredients).map((i)=>{if(i._id){return i._id}else{return i}});
    });

    newOrderItems.forEach((item)=>{
        if(item.__typename){delete item.__typename}
        item.ingredients=(item.ingredients).map((i)=>{if(i._id){return i._id}else{return i}});
        item.additionalIngredients=(item.additionalIngredients).map((i)=>{if(i._id){return i._id}else{return i}});
    });

    if (newOrderItems.lenght>0) {
       orderItems.concat(newOrderItems);
    }

    try {
        if (staff) {
            updateOrder({
                variables: {
                    id: _id,
                    staff: staff,
                    table: table,
                    orderItems: orderItems,
                    newOrderItems: [],
                    orderPrice: orderPrice,
                    created_at: created_at,
                    onKitchen: true,
                    completed: completed,
                }
            });
        }
    }
    catch (error) {
        console.log('ERROR gql in toKitchenOrder', error)
    }
}