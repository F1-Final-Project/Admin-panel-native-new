import React from "react";
import Info from './Info';
import Buy from './Buy';

export default ({dataInfo}) => {
    return dataInfo.typeModal === 'info' ? <Info dataInfo={dataInfo}/> : <Buy dataInfo={dataInfo}/>
}
