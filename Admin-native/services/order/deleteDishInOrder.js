//import to components/Orders/Order/index
export default (dish, data, updateCurrentOrder, updateOrder)=>{

    const {id, staff, table, orderItems, newOrderItems, orderPrice, created_at, onKitchen, completed} = data.order;

    const newPrice=orderPrice-dish.price;

    if(newOrderItems.length>0){
        const index = newOrderItems.findIndex(i => i.title === dish.title);
        newOrderItems.splice(index, 1)
    }else{
        const index = orderItems.findIndex(i => i.title === dish.title);
        orderItems.splice(index, 1)
    }

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

    try {
        updateOrder({
            variables: {
                id: id,
                staff: staff.id,
                table: table,
                orderItems: orderItems,
                newOrderItems: newOrderItems,
                orderPrice: newPrice,
                created_at: created_at,
                onKitchen: onKitchen,
                completed: completed,
            }
        }).then((res) => updateCurrentOrder());
    }
    catch (error) {
        console.log('ERROR gql in deleteDishInOrder', error)
    }
}