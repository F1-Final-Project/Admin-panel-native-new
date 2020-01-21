
export default class Filter {
    static filterDrink (arr) {
        return arr ? arr.filter(item => item.title === 'Алкоголь') : [];
    }
    static filterCategoryMenu (arr) {
        return arr ? arr.filter(item => item.title !== 'Алкоголь') : [];
    }
    static filterDishByIdCategory(arr, id){
        return arr ? arr.filter(item => item.category._id === id) : [];
    }
    static filterCategoriesOrdering (arr) {
        return arr ? arr.filter(item => item.orderCategory.title === 'inProgress'): [];
    }
    static filterCategoriesArchived (arr) {
        return arr ? arr.filter(item => item.orderCategory.title === 'archive'): [];
    }
}

