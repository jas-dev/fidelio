import React, {Component} from 'react';
import StudentRow from './student_row'



class StudentTable extends Component {
    render(){
        const {size = 's12', list} = this.props;

        const studentElements = list.map((student)=>{

            return (

            <StudentRow delete={this.props.delete} key={student.id}{...student}/>)

        });
        return(
            <div className={`col ${size}`}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Grade</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {studentElements}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentTable;
