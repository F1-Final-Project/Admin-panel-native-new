//import to components/Orders/DishInOrder.js

export default (ingredients, additionalIngredients, order, dish, updateOrder, updateCurrentOrder)=>{

    const newIngredients=ingredients.map((item)=>item.id);
    const newAdditionalIngredients=additionalIngredients.map((item)=>item.id);

    const newItem = {
        title: dish.title,
        description: dish.description,
        ingredients: newIngredients,
        additionalIngredients: newAdditionalIngredients,
        price: dish.price,
        weight: dish.weight,
    };
    const {id, staff, table, orderItems, newOrderItems, orderPrice, created_at, onKitchen, completed} = order;

    if(newOrderItems.length>0){
        const index = newOrderItems.findIndex(i => i.title === dish.title);
        newOrderItems.splice(index, 1);
        newOrderItems.push(newItem);
    }else{
        const index = orderItems.findIndex(i => i.title === dish.title);
        orderItems.splice(index, 1);
        orderItems.push(newItem);
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

    try{
        updateOrder({variables: {
                id: id,
                staff: staff.id,
                table: table,
                orderItems: orderItems,
                newOrderItems: newOrderItems,
                orderPrice: orderPrice,
                created_at: created_at,
                onKitchen: onKitchen,
                completed: completed,
            }
        }).then((res)=> updateCurrentOrder());
    }
    catch (error) {
        console.log('ERROR gql in updateDishInOrder', error)
    }
}