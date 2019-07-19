import React from "react";

export default props =>{
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.course}</td>
            <td>{props.grade}</td>
            <td>
                <button onClick={()=>props.delete(props.id)} className='btn btn-floating red darken-3'><i className='material-icons'>delete</i></button>
            </td>
        </tr>
    );
}
