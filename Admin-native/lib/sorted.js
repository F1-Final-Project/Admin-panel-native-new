

export const changeObjectItems = (array) => {
    return array.map(item => {
        const newObj = {};
        newObj.name = item.title;
        newObj._id = item._id;
        return newObj
    });
};

export const filterArrayItems = (a, b) => {
    return b.filter(function (v) {
        return a.some(function (v2) {
            return v._id === v2._id
        })
    });
};
