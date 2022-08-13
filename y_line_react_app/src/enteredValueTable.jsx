// 既出の正解値テーブル
const EnteredValueTable = (props) => {
    // console.log(props.value);
    // 親配列
    let entered_value_array_parent = [];
    // 子配列
    let entered_value_array_child = [];

    // 多重配列化。
    for(let i=0; i<props.value.length; i++){    
        entered_value_array_child.push(props.value[i]);
        if(entered_value_array_child.length === 2 || i === props.value.length-1){
            entered_value_array_parent.push(entered_value_array_child);
            entered_value_array_child = [];
        }
    }

    // console.log(entered_value_array_parent);

    if(entered_value_array_parent.length != 0){
        return (
            <div>
                <div>入力した正解値</div>
                <table className={'centering_item color_blue'} border="1">
                    <thead></thead>
                    <tbody>
                    { entered_value_array_parent.map((theme) =>
                    <tr className='entered_value_table'>
                        <td>{theme[0]}</td>
                        <td>{theme[1]}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>
        );    
    }
}

export default EnteredValueTable;
