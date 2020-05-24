import React, {useState,useContext,useRef,useEffect} from "react"
import { Button, Descriptions, Table, Form,Input, InputNumber } from "antd"
import { useSelector } from "react-redux";
import { IRace, ITimedRace, IModifyStintParam } from "../stores/race/types";
import { ColumnProps } from "antd/es/table";
import { Stint } from "../stores/stint/types";
import { secAsString } from "../utils/output";
import { sprintf } from "sprintf-js";
import _ from 'lodash';
import { IDriver } from "../stores/driver/types";



export interface IDispatchToProps {
	
	updateStint: (param:IModifyStintParam) => any; // das passt noch nicht. Ich wüsste noch gern, was hier wirklich statt any stehen sollte.
}
interface IStateToProps {
    raceData: ITimedRace    
}

type MyProps = IDispatchToProps & IStateToProps;



interface IDisplayStint extends  Stint {
    no : number;
}

interface EditableRowProps {
    index: number;
}

interface IIndexable {
    [key: string]: any;
}

const EditableContext = React.createContext<any>(null);

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
    <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
        <tr {...props} />
        </EditableContext.Provider>
    </Form>
    );
}

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: string|string[];
    record: IDisplayStint;
    inputElementProvider : (props:any) => React.ReactNode;
    handleSave: (record: IDisplayStint) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    inputElementProvider,
    ...restProps
}) => {
    const [editing,setEditing] = useState(false);
    const inputRef = useRef<Input>(null);
   
    
    
    const form = useContext(EditableContext);
    useEffect(() => {
        if(editing) {
            if (inputRef && inputRef.current) {
                inputRef.current.focus()
            }
            // console.log("Jetzt focus aufrufen auf ", {inputRef})
        } 
    }, [editing])
    const toggleEdit = () => {
        setEditing(!editing);
        // console.log("blödes problem lösen")
        console.log("the join:", dataIndex instanceof Array ? _.join(dataIndex, '.') : dataIndex)
        const x = _.pick(record, dataIndex instanceof Array ? _.join(dataIndex, '.') : dataIndex)
        console.log(dataIndex, {x})
        form.setFieldsValue(x)
        if (x === 0) {

            if (dataIndex instanceof Array) {
                const v = _.get(record, dataIndex);
                console.log("from struct: ", v)
                form.setFieldsValue({driver: {baseLaptime:v}})
                // dataIndex.forEach(v => value )
                
            } else {
                console.log(dataIndex)
                console.log((record as IIndexable)[dataIndex])
                // form.setFieldsValue({[dataIndex]: record[dataIndex]});
                form.setFieldsValue({[dataIndex]:(record as IIndexable)[dataIndex]})
            }
        }
    }
    const save = async (e:any)  => {
        const values = await form.validateFields();
        console.log({values})
        toggleEdit();
        const x = _.merge(record, values);
        console.log({x})
        handleSave(x);
    } 

    let childNode = children; 
    if (editable) {
        
       
        const inp = <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
        const inpt = inputElementProvider ? inputElementProvider({ref:inputRef}): inp;
        childNode = editing ? (
            <Form.Item
                style={{ margin:0}}
                name={dataIndex}
                
            >
                
               {inpt}
                
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        )
    }
    return <td {...restProps}>{childNode}</td>;
}

const RaceStints: React.FC<MyProps> = (props: MyProps) => {
    // race.stints[].
    const components  = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    }
    const columns  = [
        {title:'#', dataIndex: 'no'},
        {title:'Driver', dataIndex: ['driver', 'name']},
        {title:'Laps', dataIndex: 'numLaps', editable: true},
        {title:'Avg', dataIndex: ['driver', 'baseLaptime'], render: (t:number) => secAsString(t), editable:true},
        {title:'l/Lap', dataIndex: ['driver', 'fuelPerLap'], render: (f:number) => sprintf("%0.2f", f), editable:true},
        {title:'Start', dataIndex: ['simTime', 'start'], render: (d:Date) => d.toLocaleTimeString()},
        {title:'Duration', dataIndex: 'duration', render: (t:number) => secAsString(t)},
        {title:'End', dataIndex: ['simTime', 'end'], render: (d:Date) => d.toLocaleTimeString()},
        {title:'Fuel', dataIndex: 'fuel', render: (f:number) => sprintf("%0.2f", f)},
    ]
    const cellColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        } 
        return {
            ...col,
            onCell: (record:IDisplayStint) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: (record: IDisplayStint) => {
                    console.log("inner save", {record});
                    const param = {no: record.no, driver: record.driver, numLaps: record.numLaps}
                    props.updateStint(param);
                }
            })
        }
    })
    const myRowKey = (item : IDisplayStint) => item.no;
    const enhancedStints : IDisplayStint[]= props.raceData.stints.map((v,i) => ({...v, no: i+1}));
    return (        
        <>        
        <Table components={components} columns={cellColumns} dataSource={enhancedStints} rowKey={myRowKey}/>
        </>
    );
}

export default RaceStints


// 22:24