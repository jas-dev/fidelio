import React, {Component} from 'react';

class AddStudent extends Component{
    state = {
        name: '',
        course: '',
        grade: ''
    };

    handleInputChange= (event)=>{
        const{name,value} = event.target;

        this.setState({
            [name]: value
        });

    };
    handleSubmit(event){
        event.preventDefault();

        this.props.add({...this.state});
        this.setState({
            name: '',
            course: '',
            grade: ''
        })
    }
    render(){
        const {size = 's12'} = this.props;
        const {name, course, grade} = this.state;

        return(
            <form onSubmit={this.handleSubmit.bind(this)} className={`col ${size}`}>
                <div className="input-field">
                    <input name="name" id="name" type="text" value={name} onChange={this.handleInputChange}/>
                    <label htmlFor="name">Student Name</label>
                </div>
                <div className="input-field">
                    <input name="course" id="course" type="text" value={course} onChange={this.handleInputChange}/>
                    <label htmlFor="course">Course</label>
                </div>
                <div className="input-field">
                    <input name="grade" id="grade" type="text" value={grade} onChange={this.handleInputChange}/>
                    <label htmlFor="grade">Grade</label>
                    <button className="btn green">Add Student</button>
                </div>
            </form>
        );
    }
}

export default AddStudent;