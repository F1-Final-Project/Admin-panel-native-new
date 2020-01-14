//import to components/Orders/Orders/index
export default (data, updateOrder)=>{

    const {id, staff, table, orderItems, newOrderItems, orderPrice, created_at, completed} = data.order;

    orderItems.forEach((item)=>{
        if(item.__typename){delete item.__typename}
        item.ingredients=(item.ingredients).map((i)=>{if(i.id){return i.id}else{return i}});
        item.additionalIngredients=(item.additionalIngredients).map((i)=>{if(i.id){return i.id}else{return i}});
    });

    newOrderItems.forEach((item)=>{
        if(item.__typename){delete item.__typename}
        item.ingredients=(item.ingredients).map((i)=>{if(i.id){return i.id}else{return i}});
        item.additionalIngredients=(item.additionalIngredients).map((i)=>{if(i.id){return i.id}else{return i}});
    });

    try{
        updateOrder({variables: {
                id: id,
                staff: staff.id,
                table: table,
                orderItems: orderItems,
                newOrderItems: newOrderItems,
                orderPrice: orderPrice,
                created_at: created_at,
                onKitchen: true,
                completed: completed,
            }
        });
    }
    catch (error) {
        console.log('ERROR gql in toKitchenOrder', error)
    }
}