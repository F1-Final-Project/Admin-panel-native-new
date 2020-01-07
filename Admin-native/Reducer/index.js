import {initState} from './initStateDish'

export default function (state = initState, action) {
    switch (action.type) {
        case 'editItem':
            return {
                ...state,
                ...{
                    product: action.payload,
                },
            };
        case 'onChangeInput':
            return {
                ...{
                    product: action.payload,
                },
            };

        default:
            return state
    }
}
