//import to components/MenuDetails/MenuDetailsList/ItemCard/index.js
export default (dish, data, updateData, updateOrder)=>{
    const ingredients=dish.ingredients.map((item)=>item.id);
    const additionalIngredients=dish.additionalIngredients.map((item)=>item.id);

    const newItem = {
        title: dish.title,
        description: dish.description,
        ingredients: ingredients,
        additionalIngredients: additionalIngredients,
        price: dish.price,
        weight: dish.weight,
    };

    const {id, staff, table, orderItems, newOrderItems, orderPrice, created_at, onKitchen, completed} = data.order;

    const newPrice=orderPrice+dish.price;

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

    if(!onKitchen&&!completed){
        orderItems.push(newItem);
    } else {
        newOrderItems.push(newItem);
    }

    try{
    updateOrder({variables: {
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
    }).then((res)=> updateData());
    }
    catch (error) {
        console.log('ERROR gql in addDishToOrder', error)
    }

}