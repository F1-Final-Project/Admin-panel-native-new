import {initState} from './initStateDish'

export default function (state = initState, action) {
    switch (action.type) {
        case 'editItem':
            return {
                ...state,
                ...{
                    product: action.payload,
                    nameSection: action.nameSection,
                    saveOrClose: action.saveOrClose,
                    itemId: action.itemId
                },
            };
        case 'onChangeInput':
            return {
                ...state,
                ...{
                    product: action.payload,
                    saveOrClose: action.saveOrClose
                },
            };

        case 'onSelectItem':
            return {
                ...state,
                ...{
                    selectedItems: action.payload
                },
            };

        default:
            return state
    }
}
